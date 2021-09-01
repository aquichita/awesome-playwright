import HTMS from '@htms'
import { chromium } from '@playwright/test'

async function saveAuthentication() {
    const browser = await chromium.launch({ channel: 'chrome', headless: false })
    const page = await browser.newPage()
    const htms = new HTMS(page)
    await htms.login(process.env.TEST_USERNAME as string, process.env.TEST_PASSWORD as string)
    await page.context().storageState({ path: 'state.json' })
    await browser.close()
}

async function globalSetup() {
    await saveAuthentication()
}

export default globalSetup
