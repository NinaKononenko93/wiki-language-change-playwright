import { Page, Locator } from "@playwright/test";

export class HeaderPage {
    readonly page: Page;
    readonly personalSettings: Locator;
    readonly userProfileSetting: Locator;

    constructor(page: Page) {
        this.page = page
        this.personalSettings = page.locator('#vector-user-links-dropdown');
        this.userProfileSetting = this.page.locator('#pt-preferences')
    }

    async navigateToUserProfileSetting() {
        await this.personalSettings.click({ force: true });
        await this.userProfileSetting.click();
    }
}