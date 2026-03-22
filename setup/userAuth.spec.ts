import { test, expect } from '@playwright/test';
import { LoginPage } from '../pom/LoginPage';

test('Log in and save storage state', async ({ page, context }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login(process.env.USER_NAME!, process.env.PASSWORD!);
    await expect(page.locator('#pt-userpage-2')).toBeVisible();
    await context.storageState({ path: 'auth.json' });
})