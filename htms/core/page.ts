import { Page } from 'playwright'
import { getParametersTable } from '@utils/dataHandle'
import SelectProps from '@htms/types/select'
import assert from 'assert'
import C7PModalContent from '@htms/components/c7n-pro-modal-content'

export default abstract class HTMSPage {
    protected readonly page: Page

    constructor(page: Page) {
        this.page = page
    }

    async navigate(path: string, baseUrl?: string) {
        const requestUrl = (baseUrl || (process.env.TEST_DEV_BASE_URL as string)).concat(path)
        await this.page.goto(requestUrl)
        return this
    }

    async closeModalContent(selector?: string) {
        const closeButton = selector || '.c7n-pro-modal-header-button .icon-close'
        const element = await this.page.waitForSelector(closeButton)
        await element.click()
        await element.waitForElementState('hidden')
        return this
    }

    async macroExecMsgInModalContent(
        msgSelector: string = '.c7n-pro-modal-body .message',
        closeSelector: string = '.c7n-pro-modal-header-button .icon-close'
    ) {
        const msg = await this.page.innerText(msgSelector)
        await this.closeModalContent(closeSelector)
        return msg
    }

    async noticeMessage(selector?: string) {
        const noticeSelector = selector || '.ant-notification-notice-message'
        const element = await this.page.waitForSelector(noticeSelector)
        const msg = await element.innerText()
        await element.waitForElementState('hidden')
        return msg.trim()
    }

    /**
     * Note that locator always implies visibility, so it will always be locating visible elements.
     * @param name
     * @param value
     * @param selector
     * @returns
     */
    async input(name: string, value: string, selector?: string) {
        const inputSelector =
            selector || `:nth-match(input[type=text]:right-of(td span:text("${name}")), 1)`
        const input = this.page.locator(inputSelector)
        await input.fill('')
        assert.equal(await this.page.inputValue(inputSelector), '')
        await input.fill(value)
        assert.equal(await this.page.inputValue(inputSelector), value)
        return this
    }

    async checkbox(name: string, value: boolean, selector?: string) {
        const checkboxSelector =
            selector || `:nth-match(input[type=checkbox]:right-of(td span:text("${name}")), 1)`
        const checkbox = this.page.locator(checkboxSelector)
        if (value) {
            await checkbox.check()
        } else {
            await checkbox.uncheck()
        }
        assert.equal(await this.page.isChecked(checkboxSelector), value)
        return this
    }

    async select(name: string, value: string, sigle?: boolean) {
        let input: string
        if (sigle) {
            input = `td:has-text("${name}") .c7n-pro-select`
        } else {
            input = `:nth-match(input:right-of(td:has-text("${name}")), 1)`
        }
        await this.page.click(input)
        await this.page.click(`.c7n-pro-select-dropdown-menu li:has-text("${value}")`)
        assert.equal(await this.page.inputValue(input), value)
        return this
    }

    async selectBySearch(name: string, value: SelectProps, selector?: string) {
        await this.page.click(selector || `.icon-search:right-of(td:has-text("${name}"))`, {
            noWaitAfter: true
        })
        const modalContent = await this.page.waitForSelector('.c7n-pro-modal-content', {
            state: 'visible'
        })
        const modal = new C7PModalContent(this.page)
        await this.page.click('button:has-text("重置") >> nth=-1')
        if (value.代码) {
            await this.input('代码', value.代码)
        }
        if (value.名称) {
            await this.input('名称', value.名称)
        }
        await this.page.click('button:has-text("查询") >> nth=-1')
        await this.page.click(`span:has-text("${value.代码}")`)
        await this.page.click('button:has-text("确定") >> nth=-1')
        await modalContent.waitForElementState('hidden')
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
