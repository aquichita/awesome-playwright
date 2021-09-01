import type { Page } from 'playwright'

export default class HTMS {
    protected readonly page: Page

    protected readonly 新建按钮: string = 'button:has-text("新建")'

    protected readonly 保存按钮: string = 'button:has-text("保存")'

    protected readonly 确定按钮: string = 'button:has-text("确定")'

    protected readonly 提交按钮: string = 'button:has-text("提交")'

    protected readonly 取消按钮: string = 'button:has-text("取消")'

    protected readonly 删除按钮: string = 'button:has-text("删除")'

    protected readonly 重置按钮: string = 'button:has-text("重置")'

    protected readonly 查询按钮: string = 'button:has-text("查询")'

    constructor(page: Page) {
        this.page = page
    }

    async 登录(loginUrl?: string, username?: string, password?: string) {
        const url = loginUrl || (process.env.TEST_URL_LOGIN as string)
        const name = username || (process.env.TEST_USERNAME as string)
        const pwd = password || (process.env.TEST_PASSWORD as string)
        await this.page.goto(url)
        await this.page.fill('#username', name)
        await this.page.fill('#password', pwd)
        await this.page.click('button:has-text("登录")')
        return this
    }

    async goto(path: string, otherBaseUrl?: string) {
        const requestUrl = otherBaseUrl
            ? otherBaseUrl.concat(path)
            : (process.env.TEST_URL_BASE as string).concat(path)
        await this.page.goto(requestUrl)
        return this
    }

    async 关闭账号安全提示() {
        await this.page.click('.ant-modal-close-x')
        await this.page.isHidden('.ant-modal-content')
        return this
    }

    async 系统提示信息() {
        const msg = await this.page.innerText('.ant-notification-notice-message')
        await this.page.isHidden('.ant-notification-bottomRight')
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
    async 选择下拉列表值(value: string) {
        await this.page.click(`.c7n-pro-select-dropdown-menu li:has-text("${value}")`)
        return this
    }

    async 选择滑动下拉列表值() {
        await this.page.click('.ant-confirm-btns button:has-text("取消")')
        await this.page.isHidden('.ant-modal-content')
        return this
    }
}
