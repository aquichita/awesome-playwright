import { Page } from '@playwright/test'

export default class Switch {
    protected readonly page: Page

    constructor(page: Page) {
        this.page = page
    }

    async active(name: string) {
        this.page.click(`.c7n-pro-switch:right-of(td:has-text("${name}"))`)
    }

    async deactivate(name: string) {
        this.page.click(`.c7n-pro-switch:right-of(td:has-text("${name}"))`)
    }
}
