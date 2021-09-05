import type { Page } from 'playwright'
import Select from '@demo/htms/core/select'
import Switch from '@demo/htms/core/switch'
import assert from 'assert'
import { getParametersTable } from '@utils/data-handle'

export default class HTMS {
    protected readonly page: Page

    addButtonSelector = ':is(button:has-text("新建"), button:has-text("新 建"))'

    saveButtonSelector = ':is(button:has-text("保存"), button:has-text("保 存"))'

    resetButtonSelector = ':is(button:has-text("重置"), button:has-text("重 置"))'

    searchButtonSelector = ':is(button:has-text("查询"), button:has-text("查 询"))'

    moreButtonSelector = ':is(button:has-text("更多"), button:has-text("更多查询"))'

    constructor(page: Page) {
        this.page = page
    }

    async 登录(loginUrl?: string, username?: string, password?: string) {
        const url = loginUrl || (process.env.TEST_DEV_LOGIN_URL as string)
        const name = username || (process.env.TEST_DEV_USERNAME as string)
        const pwd = password || (process.env.TEST_DEV_PASSWORD as string)
        await this.page.goto(url)
        await this.page.fill('#username', name)
        await this.page.fill('#password', pwd)
        // 选择符合条件之一的元素
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

    async 关闭账号安全提示() {
        await this.page.click('.ant-modal-close-x')
        await this.page.isHidden('.ant-modal-content')
        return this
    }

    async noticeMessage() {
        const msg = await this.page.innerText('.ant-notification-notice-message')
        await this.page.isHidden('.ant-notification-notice-content')
        return msg
    }

    async 关闭宏执行提示() {
        await this.page.click('.c7n-pro-modal-content .icon-close')
        await this.page.isHidden('.c7n-pro-modal-content')
        return this
    }

    async 宏执行提示信息() {
        const msg = await this.page.innerText('.macroContainer .message')
        await this.page.isHidden('.c7n-pro-modal-content')
        return msg
    }

    async 确认() {
        await this.page.click('.ant-confirm-btns button:has-text("确认")')
        await this.page.isHidden('.ant-modal-content')
        return this
    }

    async 取消() {
        await this.page.click('.ant-confirm-btns button:has-text("取消")')
        await this.page.isHidden('.ant-modal-content')
        return this
    }

    /**
     * 系统内置LOV值集选择方法
     * @param value 选项名称
     */
    async 选择下拉列表值(name: string, value: string) {
        const c7n = new Select(this.page)
        await c7n.c7nProSelect(name, value)
        return this
    }

    async 选择下拉列表查询值(name: string, value: { 代码: string; 名称: string }, inner = false) {
        const c7n = new Select(this.page)
        await c7n.c7nProSelectSearch(name, value, inner)
        return this
    }

    async getListRowContent(index: number = 1) {
        return getParametersTable(
            await this.page.innerText('.c7n-pro-table-thead tr'),
            await this.page.innerText(`.c7n-pro-table-tbody tr >> nth=${index - 1}`)
        )
    }

    async 关闭启用开关(name: string) {
        const switchElement = new Switch(this.page)
        await switchElement.active(name)
    }

    async 输入参数(name: string, value: string) {
        const input = this.page.locator(
            `:nth-match(input:right-of(td span:text("${name}")), 1) >> nth=-1`
        )
        await input.fill('')
        await input.fill(value)
        assert.equal(await input.inputValue(), value)
        return this
    }

    async 选择时间(name: string, date: string) {
        const c7n = new Select(this.page)
        await c7n.dateSelect(name, date)
        return this
    }

    async 切换主题(number = 1) {
        await this.page.click(`.config-content img >> nth=${number}`)
        return this
    }
}
