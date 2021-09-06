import { chromium } from '@playwright/test'
import clearTestData from '@entries/dataClearHandler'
import { LoginPage } from '@pages/common/loginPage'

async function saveAuthentication() {
    const browser = await chromium.launch({ channel: 'chrome', headless: false })
    const page = await browser.newPage()
    await new LoginPage(page).login()
    await page.context().storageState({ path: 'state.json' })
    await browser.close()
}

async function globalSetup() {
    await clearTestData()
    await saveAuthentication()
}

export default globalSetup
