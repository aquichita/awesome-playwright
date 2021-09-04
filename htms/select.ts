import { Page } from '@playwright/test'
import assert from 'assert'

export default class Select {
    protected readonly page: Page

    constructor(page: Page) {
        this.page = page
    }

    async c7nProSelect(name: string, value: string, isSigle = false) {
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

    async c7nProSelectSearch(name: string, value: { 代码: string; 名称: string }, inner = false) {
        if (!inner) {
            const iconSearch = `.icon-search:right-of(td:has-text("${name}"))`
            await this.page.click(iconSearch)
        }
        await this.page.isVisible('.c7n-pro-modal-content')
        await this.page.click('button:has-text("重置")')
        await this.page.fill('[name="xid"]', value.代码)
        await this.page.fill('[name="name"]', value.名称)
        await this.page.click('button:has-text("查询")')
        await this.page.click(`span:has-text("${value.代码}")`)
        await this.page.click('button:has-text("确定")')
        return this
    }

    async dateSelect(name: string, date: string) {
        const input = `.c7n-pro-calendar-picker:right-of(td:has-text("${name}"))`
        await this.page.fill(input, date, { force: true })
        assert.equal(await this.page.inputValue(input), date)
        return this
    }
}
