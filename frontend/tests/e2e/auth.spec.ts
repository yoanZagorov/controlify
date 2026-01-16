import { test, expect } from '@playwright/test'

import {
  generateTestUser,
  createAccount,
  deleteAccount,
  login,
  logout,
} from '../fixtures/auth'

// Track accounts created during tests for safety cleanup
const createdAccounts: Array<{ email: string; password: string }> = []

test.describe('Authentication', () => {
  // Safety net: Cleanup any accounts that weren't deleted during tests
  test.afterAll(async ({ browser }) => {
    if (createdAccounts.length === 0) return

    const context = await browser.newContext()
    const page = await context.newPage()

    for (const account of createdAccounts) {
      try {
        // Try to log in - if this fails, account is already deleted
        await page.goto('/login', { waitUntil: 'domcontentloaded' })
        await page.waitForSelector('input[type="email"]', { timeout: 15000 })
        await page.fill('input[type="email"]', account.email)
        await page.fill('input[type="password"]', account.password)
        await page.click('button:has-text("Log in")')

        // Wait to see if login succeeds
        await page.waitForTimeout(3000)
        const currentUrl = page.url()

        // If still on login page, account was already deleted - skip
        if (currentUrl.includes('/login')) {
          continue
        }

        // If we're on /app, account still exists - delete it
        await expect(page).toHaveURL(/\/app/, { timeout: 5000 })
        await deleteAccount(page)
      } catch {
        // Account may have already been deleted or login failed - that's okay
        console.log(
          `Cleanup: Account ${account.email} may have already been deleted`,
        )
      }
    }

    await context.close()
  })

  test('account creation - creates account and redirects to app', async ({
    page,
  }) => {
    const account = generateTestUser()
    createdAccounts.push(account)

    // Test account creation
    await createAccount(page, account)
  })

  test('login - logs in with existing account', async ({ page }) => {
    const account = generateTestUser()
    createdAccounts.push(account)

    // Setup: Create account and logout
    await createAccount(page, account)
    await logout(page)

    // Test login
    await login(page, account)
  })

  test('logout - logs out and redirects to login', async ({ page }) => {
    const account = generateTestUser()
    createdAccounts.push(account)

    // Setup: Create account (already logged in after creation)
    await createAccount(page, account)

    // Test logout
    await logout(page)
  })

  test('account deletion - deletes account from Auth and Firestore', async ({
    page,
  }) => {
    const account = generateTestUser()
    createdAccounts.push(account)

    // Setup: Create account
    await createAccount(page, account)

    // Test account deletion
    await deleteAccount(page)

    // Verify deletion by attempting to log in with the deleted account
    await page.goto('/login', { waitUntil: 'domcontentloaded' })
    await page.waitForSelector('input[type="email"]', { timeout: 15000 })
    await page.fill('input[type="email"]', account.email)
    await page.fill('input[type="password"]', account.password)
    await page.click('button:has-text("Log in")')

    // Should stay on login page (account doesn't exist)
    await page.waitForTimeout(3000)
    const currentUrl = page.url()
    expect(currentUrl).toMatch(/\/login/)

    // Remove from cleanup list since we've already deleted it
    const index = createdAccounts.findIndex((a) => a.email === account.email)
    if (index > -1) {
      createdAccounts.splice(index, 1)
    }
  })
})
