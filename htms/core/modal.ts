import HTMSPage, { Root } from '@htms/core/page'
import { Page } from 'playwright'

export default abstract class ModalContent extends HTMSPage {
    constructor(page: Page) {
        super(page)
        this.root = Root.C7NPM
    }

    async close(selector?: string) {
        const closeButton = selector || `${this.root} .icon-close`
        const element = await this.page.waitForSelector(closeButton)
        await element.click()
        await element.waitForElementState('hidden')
        return this
    }
}
