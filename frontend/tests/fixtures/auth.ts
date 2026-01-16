import { expect, type Page } from '@playwright/test'

export type TestAccount = {
  email: string
  password: string
  name: string
}

// Helper function to generate unique test user credentials
export function generateTestUser(): TestAccount {
  const timestamp = Date.now()
  return {
    email: `test-${timestamp}@example.com`,
    password: 'TestPass123!',
    name: 'Test User',
  }
}

// Helper function to create an account
export async function createAccount(page: Page, account: TestAccount) {
  await page.goto('/create-account', { waitUntil: 'domcontentloaded' })
  await page.waitForSelector('input[type="email"]', { timeout: 15000 })
  await page.fill('input[type="email"]', account.email)
  await page.fill('input[type="password"]', account.password)
  await page.fill('input[placeholder="Full Name"]', account.name)
  await page.click('button:has-text("Create account")')

  // Wait for account creation and database population
  await page.waitForTimeout(8000)
  await expect(page).toHaveURL(/\/app/, { timeout: 10000 })
  await page.waitForSelector('button[name="intent"][value="logout"]', {
    timeout: 20000,
    state: 'visible',
  })
}

// Helper function to delete an account
export async function deleteAccount(page: Page) {
  await page.goto('/app/settings', { waitUntil: 'domcontentloaded' })
  await page.waitForSelector('button:has-text("delete account")', {
    timeout: 10000,
    state: 'visible',
  })
  await page.click('button:has-text("delete account")')
  await page.waitForSelector('button[type="submit"]:has-text("Delete")', {
    timeout: 5000,
    state: 'visible',
  })
  
  // Click delete button - the form submission will trigger the deletion
  await page.click('button[type="submit"]:has-text("Delete")')
  
  // Wait for the navigation to complete (redirect happens after deleteUser completes)
  await page.waitForURL(/\/create-account/, { timeout: 15000 })
}

// Helper function to log in
export async function login(page: Page, account: TestAccount) {
  await page.goto('/login', { waitUntil: 'domcontentloaded' })
  await page.waitForSelector('input[type="email"]', { timeout: 15000 })
  await page.fill('input[type="email"]', account.email)
  await page.fill('input[type="password"]', account.password)
  await page.click('button:has-text("Log in")')
  await expect(page).toHaveURL(/\/app/, { timeout: 15000 })
  await page.waitForSelector('button[name="intent"][value="logout"]', {
    timeout: 10000,
    state: 'visible',
  })
}

// Helper function to log out
export async function logout(page: Page) {
  await page.click('button[name="intent"][value="logout"]')
  await expect(page).toHaveURL(/\/login/, { timeout: 5000 })
}
