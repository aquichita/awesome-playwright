import { chromium } from '@playwright/test'
import '@root/main.ts'

async function saveAuthentication() {
    const browser = await chromium.launch({ channel: 'chrome', headless: false })
    const page = await browser.newPage()
    await page.goto(process.env.TEST_URL_LOGIN as string)
    await page.fill('#username', process.env.TEST_USERNAME as string)
    await page.fill('#password', process.env.TEST_PASSWORD as string)
    await page.click('button:has-text("登录")')

    await page.click('.icon.icon-expand_more')
    await page.click(`li:has-text("${process.env.TEST_ORG_NAME}")`)
    await page.click('[placeholder=请选择项目]')
    await page.click(
        `.c7ncd-dropDownPro-popContent-option:has-text("${process.env.TEST_PRO_NAME}")`
    )
    await page.context().storageState({ path: 'state.json' })
    await browser.close()
}

async function globalSetup() {
    await saveAuthentication()
}

export default globalSetup
