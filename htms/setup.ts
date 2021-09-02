import HTMS from '@htms'
import { chromium } from '@playwright/test'
import { dataPrefix } from '@utils/data-provider'
import connection from '@utils/sql-connection'
import fs from 'fs'

import readline from 'readline'

async function saveAuthentication() {
    const browser = await chromium.launch({ channel: 'chrome', headless: false })
    const page = await browser.newPage()
    const htms = new HTMS(page)
    await htms.登录()
    await page.context().storageState({ path: 'state.json' })
    await browser.close()
}

async function clearTestData() {
    connection.connect()
    const 清理地点 = `DELETE FROM basic_location_b WHERE XID LIKE "${dataPrefix}%"`
    connection.query(清理地点, (error: any) => {
        if (error) throw error
    })
    connection.commit()
    connection.end()
}

async function globalSetup() {
    await clearTestData()
    await saveAuthentication()
}

export default globalSetup
