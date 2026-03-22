import { test, expect } from '@playwright/test';
import { PreferencesPage } from '../pom/PreferencesPage';
import { HeaderPage } from '../pom/Header';
import { languageTranslation } from '../test-data/test-data';

test.describe('Language change tests', () => {
  test.use({ storageState: 'auth.json' });

  test('authorized user can change interface language and switch it back', async ({ page }) => {
    const preferencesPage = new PreferencesPage(page);
    const header = new HeaderPage(page);

    await page.goto('');

    await test.step('Open user preferences page', async () => {
      await header.navigateToUserProfileSetting();
      await expect(preferencesPage.userPreferencesSetting).toHaveText(languageTranslation.settingHeadingUa);
    });

    await test.step('Change language to English and verify it is applied', async () => {
      await preferencesPage.languageChange(languageTranslation.languageEn);
      await expect(preferencesPage.userPreferencesSetting).toHaveText(languageTranslation.settingHeadingEn);
      await page.reload();
      await expect(preferencesPage.userPreferencesSetting).toHaveText(languageTranslation.settingHeadingEn);
      await expect(preferencesPage.tabUserProfile).toBeVisible();
    });

    await test.step('Change language back to Ukrainian and verify it is applied', async () => {
      await header.navigateToUserProfileSetting();
      await expect(preferencesPage.languageDropdown).toBeVisible();
      await preferencesPage.languageChange(languageTranslation.languageUa);
      await expect(preferencesPage.userPreferencesSetting).toHaveText(languageTranslation.settingHeadingUa);
      await page.reload();
      await expect(preferencesPage.userPreferencesSetting).toHaveText(languageTranslation.settingHeadingUa);
    });
  });
});