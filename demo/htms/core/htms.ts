import type { Page } from 'playwright'
import assert from 'assert'
import { getParametersTable } from '@utils/data-handle'
import SelectProps from '@demo/htms/types/select'

export default class HTMS {
    protected readonly page: Page

    newButtonSelector = ':is(button:has-text("新建"), button:has-text("新 建"))'

    addButtonSelector = ':is(button:has-text("新增"), button:has-text("新 增"))'

    saveButtonSelector = `:is(button:has-text("保存"),button:has-text("确定"),button:has-text("保 存"),button:has-text("确 定"))`

    ensureButtonSelector = `button:has-text("确定"),button:has-text("确 定"))`

    resetButtonSelector = ':is(button:has-text("重置"), button:has-text("重 置"))'

    searchButtonSelector = ':is(button:has-text("查询"), button:has-text("查 询"))'

    moreButtonSelector = ':is(button:has-text("更多"), button:has-text("更多查询"))'

    constructor(page: Page) {
        this.page = page
    }

    async login(loginUrl?: string, username?: string, password?: string) {
        const url = loginUrl || (process.env.TEST_DEV_LOGIN_URL as string)
        const name = username || (process.env.TEST_DEV_USERNAME as string)
        const pwd = password || (process.env.TEST_DEV_PASSWORD as string)
        await this.page.goto(url)
        await this.page.fill('#username', name)
        await this.page.fill('#password', pwd)
        await this.page.click(':is(button:has-text("登录"), #login-btn)')
        await this.page.waitForNavigation({ timeout: 60000 })
        return this
    }

    async navigate(path: string, otherBaseUrl?: string) {
        const requestUrl = otherBaseUrl
            ? otherBaseUrl.concat(path)
            : (process.env.TEST_DEV_BASE_URL as string).concat(path)
        await this.page.goto(requestUrl)
        return this
    }

    async closeAccountSecurityTips() {
        await this.page.click('.ant-modal-close-x')
        await this.page.isHidden('.ant-modal-content')
        return this
    }

    async closeMacroExecTips() {
        await this.page.click('.c7n-pro-modal-content .icon-close')
        await this.page.isHidden('.c7n-pro-modal-content')
        return this
    }

    async noticeMessage() {
        const msg = await this.page.innerText('.ant-notification-notice-message')
        await this.page.isHidden('.ant-notification-notice-content')
        return msg.trim()
    }

    async macroExecResultMessage() {
        const msg = await this.page.innerText('.macroContainer .message')
        await this.page.isHidden('.c7n-pro-modal-content')
        return msg
    }

    async input(name: string, value: string, locator?: string) {
        const commonLocator = `:nth-match(input[type=text]:right-of(td span:text("${name}")), 1) >> nth=-1`
        const input = this.page.locator(locator || commonLocator)
        await input.fill('')
        await input.fill(value)
        assert.equal(await this.page.inputValue(locator || commonLocator), value)
        return this
    }

    async checkbox(name: string, isChecked: boolean, locator?: string) {
        const commonLocator = `:nth-match(input[type=checkbox]:right-of(td span:text("${name}")), 1) >> nth=-1`
        const checkbox = this.page.locator(locator || commonLocator)
        const status = await checkbox.isChecked()
        if (status !== isChecked) {
            await checkbox.check()
        }
        assert.equal(await this.page.isChecked(commonLocator), isChecked)
        return this
    }

    async select(name: string, value: string, options?: { isSigle?: boolean }) {
        let input: string
        if (options?.isSigle) {
            input = `td:has-text("${name}") .c7n-pro-select`
        } else {
            input = `input:right-of(td:has-text("${name}"))`
        }
        await this.page.click(input)
        await this.page.click(`li:has-text("${value}")`)
        assert.equal(await this.page.inputValue(input), value)
        return this
    }

    async selectBySearch(name: string, value: SelectProps, options?: { inner?: false }) {
        if (options?.inner) {
            const iconSearch = `.icon-search:right-of(td:has-text("${name}"))`
            await this.page.click(iconSearch)
        }
        await this.page.isVisible('.c7n-pro-modal-content')
        await this.page.click(this.resetButtonSelector)
        if (value.代码) {
            await this.page.fill('[name="xid"]', value.代码)
        }
        if (value.名称) {
            await this.page.fill('[name="name"]', value.名称)
        }
        await this.page.click(this.searchButtonSelector)
        await this.page.click(`span:has-text("${value.代码}")`)
        await this.page.click(this.ensureButtonSelector)
        return this
    }

    async SelectBySearch(name: string, value: SelectProps, options?: { inner?: boolean }) {
        let input: string
        if (options?.inner) {
            input = `td:has-text("${name}") .c7n-pro-select`
        } else {
            input = `input:right-of(td:has-text("${name}"))`
        }
        await this.page.click(input)
        await this.page.click(`li:has-text("${value}")`)
        assert.equal(await this.page.inputValue(input), value)
        return this
    }

    async SelectDate(name: string, date: string) {
        const input = `.c7n-pro-calendar-picker:right-of(td:has-text("${name}"))`
        await this.page.fill(input, date, { force: true })
        assert.equal(await this.page.inputValue(input), date)
        return this
    }

    async getListRowContent(index: number = 1) {
        return getParametersTable(
            await this.page.innerText('.c7n-pro-table-thead tr'),
            await this.page.innerText(`.c7n-pro-table-tbody tr >> nth=${index - 1}`)
        )
    }
}
