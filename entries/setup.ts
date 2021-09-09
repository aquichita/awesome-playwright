import { chromium } from '@playwright/test'
import clearTestData from '@entries/dataClearHandler'
import { LoginPage } from '@pages/common/loginPage'

async function saveAuthentication() {
    const browser = await chromium.launch({ headless: false, channel: 'chrome' })
    // 创建一个新的浏览器上下文。它不会与其他浏览器上下文共享 cookie/缓存。
    // https://playwright.dev/docs/api/class-browser#browser-new-context
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
