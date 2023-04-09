import { test, expect } from '@playwright/test'
// import AxeBuilder from '@axe-core/playwright' // 1

test.describe('landing page', () => {
  test('should have a title', async ({ page }) => {
    await page.goto('/')

    await expect(page).toHaveTitle(/CookBook/)
  })

  test('should have logo', async ({ page }) => {
    await page.goto('/')

    await expect(page.getByTestId('logo').first()).toBeVisible()
  })

  // test('should not have any detectable accessibility issues', async ({
  //   page,
  // }) => {
  //   await page.goto('/')

  //   const accessibilityScanResults = await new AxeBuilder({ page }).analyze()

  //   expect(accessibilityScanResults.violations).toEqual([])
  // })
})
