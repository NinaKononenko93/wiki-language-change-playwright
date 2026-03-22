import { Page, Locator, expect } from "@playwright/test";

export class PreferencesPage {
    page: Page;
    readonly userPreferencesSetting: Locator;
    readonly languageDropdown: Locator;
    readonly saveButton: Locator
    readonly tabUserProfile: Locator
    readonly settingSuccessNotification: Locator


    constructor(page: Page) {
        this.page = page
        this.userPreferencesSetting = this.page.locator('#firstHeading')
        this.languageDropdown = this.page.locator('select[name="wplanguage"]')
        this.saveButton = this.page.locator('#prefcontrol')
        this.tabUserProfile = this.page.getByRole('tab', { name: 'User profile' })
        this.settingSuccessNotification = this.page.locator('#mw-aria-live-region')
    }

    async languageChange(language: string) {
        await this.languageDropdown.selectOption(language)
        await this.saveButton.click()
        await expect(this.settingSuccessNotification).toBeVisible();
    }
}