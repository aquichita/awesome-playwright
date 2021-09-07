import type { Page } from 'playwright'
import assert from 'assert'
import { getParametersTable } from '@utils/dataHandle'
import SelectProps from '@htms/types/select'
import { el } from 'date-fns/locale'

export default class HTMSPage {
    protected readonly page: Page

    constructor(page: Page) {
        this.page = page
    }

    protected readonly button = {
        NEW: ':is(button:has-text("新建"), button:has-text("新 建"))',
        ADD: ':is(button:has-text("新增"), button:has-text("新 增"))',
        SAVE: ':is(button:has-text("保存"),button:has-text("保 存"), button:has-text("确定"),button:has-text("确 定"))',
        ENSURE: ':is(button:has-text("确定"),button:has-text("确 定"))',
        RESET: ':is(button:has-text("重置"), button:has-text("重 置"))',
        SEARCH: ':is(button:has-text("查询"), button:has-text("查 询"))',
        MORE: ':is(button:has-text("更多"), button:has-text("更多查询"))'
    }

    async navigate(path: string, otherBaseUrl?: string) {
        const requestUrl = (otherBaseUrl || (process.env.TEST_DEV_BASE_URL as string)).concat(path)
        await this.page.goto(requestUrl)
        return this
    }

    async closeC7nProModalContent(selector?: string) {
        // TODO: 模态对话框通用操作
        const closeButtonSelector =
            selector || '.c7n-pro-modal-content .c7n-pro-modal-header-buttons .icon-close'
        const element = await this.page.waitForSelector(closeButtonSelector)
        await element.waitForElementState('visible')
        this.page.click(closeButtonSelector)
        await element.waitForElementState('hidden')
        return this
    }

    async closeMacroExecTips() {
        await this.page.click('.c7n-pro-modal-content .icon-close')
        await this.page.isHidden('.c7n-pro-modal-content')
        return this
    }

    async noticeMessage(selector?: string) {
        const noticeSelector = selector || '.ant-notification-notice-message'
        const element = await this.page.waitForSelector(noticeSelector)
        await element.waitForElementState('visible')
        const msg = await element.innerText()
        await element.waitForElementState('hidden')
        return msg.trim()
    }

    async macroExecResultMessage() {
        const msg = await this.page.innerText('.macroContainer .message')
        await this.page.isHidden('.c7n-pro-modal-content')
        return msg
    }

    async input(name: string, value: string, selector?: string) {
        const inputSelector = `:nth-match(input[type=text]:right-of(td span:text("${name}")), 1)`
        const input = this.page.locator(selector || inputSelector)
        await input.fill('')
        await input.fill(value)
        assert.equal(await this.page.inputValue(selector || inputSelector), value)
        return this
    }

    async checkbox(name: string, value: boolean, selector?: string) {
        const checkboxSelector = `:nth-match(input[type=checkbox]:right-of(td span:text("${name}")), 1)`
        const checkbox = this.page.locator(selector || checkboxSelector)
        if (value) {
            await checkbox.check()
        } else {
            await checkbox.uncheck()
        }
        assert.equal(await this.page.isChecked(checkboxSelector), value)
        return this
    }

    async select(name: string, value: string, isSigle?: boolean) {
        let input: string
        if (isSigle) {
            input = `td:has-text("${name}") .c7n-pro-select`
        } else {
            input = `input:right-of(td:has-text("${name}"))`
        }
        await this.page.click(input)
        await this.page.click(`li:has-text("${value}")`)
        assert.equal(await this.page.inputValue(input), value)
        return this
    }

    async selectBySearch(name: string, value: SelectProps, selector?: string) {
        await this.page.click(selector || `.icon-search:right-of(td:has-text("${name}"))`, {
            noWaitAfter: true
        })
        await this.page.isVisible('.c7n-pro-modal-content')
        await this.page.click(this.button.RESET)
        if (value.代码) {
            await this.page.fill('[name="xid"]', value.代码)
        }
        if (value.名称) {
            await this.page.fill('[name="name"]', value.名称)
        }
        await this.page.click(this.button.SEARCH)
        await this.page.click(`span:has-text("${value.代码}")`)
        await this.page.click(this.button.ENSURE)
        return this
    }

    async selectDate(name: string, date: string) {
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
