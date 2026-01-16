import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: false, // Allow .only() for local debugging
  retries: 0, // No retries for faster local feedback
  workers: undefined, // Use default (parallel execution based on CPU cores)
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:5173',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  webServer: {
    command: 'npm run dev:test',
    url: 'http://localhost:5173',
    reuseExistingServer: false, // Always manage server lifecycle - shut down after tests
    timeout: 120000,
  },
})
