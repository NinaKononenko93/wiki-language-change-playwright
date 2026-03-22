import { Page } from "@playwright/test";

export class LoginPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async login(username: string, password: string) {
        await this.page.goto('https://uk.wikipedia.org/');
        await this.page.locator('#pt-login-2').click();
        await this.page.fill('#wpName1', username);
        await this.page.fill('#wpPassword1', password);

        await Promise.all([
            this.page.waitForURL(url => !url.toString().includes('Special:UserLogin')),
            this.page.click('#wpLoginAttempt')
        ]);
    }
}