import SelectProps from '@htms/types/select'
import { Page } from 'playwright'

export const enum Root {
    PAGE = '.ant-tabs-tabpane-active',
    C7NPM = '.c7n-pro-modal-content'
}
export default abstract class HTMSPage {
    protected readonly page: Page

    constructor(page: Page) {
        this.page = page
    }

    protected _pageRoot: Root = Root.PAGE

    get root(): Root {
        return this._pageRoot
    }

    set root(selector: Root) {
        this._pageRoot = selector
    }

    async navigate(path: string, baseUrl?: string) {
        const requestUrl = (baseUrl || (process.env.TEST_DEV_BASE_URL as string)).concat(path)
        await this.page.goto(requestUrl)
        return this
    }

    async message(selector?: string) {
        const noticeSelector = selector || `.ant-notification-notice-message`
        const element = await this.page.waitForSelector(noticeSelector, { state: 'visible' })
        const msg = await element.innerText()
        await element.waitForElementState('hidden')
        return msg.trim()
    }

    async clickButton(menuName: string) {
        await this.page.waitForLoadState('domcontentloaded')
        if (menuName.includes('|')) {
            const btns = menuName.split('|')
            await Promise.all(
                btns.map(async (btn) => {
                    const selector = `${this.root} button:has-text("${btn.trim()}")`
                    if (await this.page.isVisible(selector)) {
                        await this.page.click(selector)
                    }
                })
            )
        } else {
            await this.page.click(`${this.root} button:has-text("${menuName.trim()}")`)
        }
        return this
    }

    async input(name: string, value: string, selector?: string) {
        const inputSelector =
            selector ||
            `${this.root} :nth-match(input[type=text]:right-of(:has-text("${name}")), 1)`
        await this.page.fill(inputSelector, '')
        await this.page.fill(inputSelector, value)
        return this
    }

    async checkbox(name: string, value: boolean, selector?: string) {
        const checkboxSelector =
            selector ||
            `${this.root} :nth-match(input[type=checkbox]:right-of(td span:text("${name}")), 1)`
        const checkbox = this.page.locator(checkboxSelector)
        value ? await checkbox.check() : await checkbox.uncheck()
        return this
    }

    async select(name: string, value: string, sigle?: boolean) {
        let input: string
        if (sigle) {
            input = `${this.root} td:has-text("${name}") .c7n-pro-select`
        } else {
            input = `${this.root} :nth-match(input:right-of(td:has-text("${name}")), 1)`
        }
        await this.page.click(input)
        await this.page.click(`.c7n-pro-select-dropdown-menu li:has-text("${value}")`)
        return this
    }

    async selectBySearch(name: string, value: SelectProps, selector?: string) {
        await this.page.click(
            selector || `${this.root} .icon-search:right-of(td:has-text("${name}"))`
        )
        const dialogSelector = '.c7n-pro-modal-content'
        await this.page.waitForSelector(dialogSelector, { state: 'visible' })
        await this.page.click(`${dialogSelector} button:has-text("重置")`)
        if (value.代码) {
            await this.input(
                '代码',
                value.代码,
                `:nth-match(${dialogSelector} input[type=text]:right-of(:has-text("代码")), 1)`
            )
        }
        if (value.名称) {
            await this.input(
                '名称',
                value.名称,
                `:nth-match(${dialogSelector} input[type=text]:right-of(:has-text("代码")), 1)`
            )
        }
        await this.page.click(`${dialogSelector} button:has-text("查询")`)
        await this.page.click(`${dialogSelector} button:has-text("确定")`)
        await this.page.waitForSelector(dialogSelector, { state: 'hidden' })
        return this
    }

    async selectDate(name: string, date: string) {
        const input = `${this.root} .c7n-pro-calendar-picker:right-of(td:has-text("${name}"))`
        await this.page.fill(input, date, { force: true })
        return this
    }
}
