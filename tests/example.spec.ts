import { chromium } from 'playwright'
import { expect, Page, test } from '@playwright/test'

test('订单类型维护', async () => {
    const browser = await chromium.launch({ channel: 'chrome', headless: false })
    const page = await browser.newPage()
    await page.goto('http://172.23.16.13:8888/oauth/login')
    await page.fill('[placeholder="请输入用户名"]', '18886885')
    await page.fill('[placeholder="请输入密码"]', 'Admin@123')
    await page.click('#login-btn')
    await page.waitForNavigation()
    await page.goto('http://172.23.16.13:9200/htms/order/orderManage/query')
    await page.click('button:has-text("新 建")')
    // const name = page.mainFrame().name()\
    const frames = page.mainFrame().childFrames()
    const title = await page.mainFrame().title()
    expect(frames.map((frame) => frame.name())).toEqual(title)
})
