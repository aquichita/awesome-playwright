import { Page } from 'playwright'

export default class Button {
    protected readonly page: Page

    protected constructor(page: Page) {
        this.page = page
    }

    async click(name: string, selector?: string) {
        let elementSelector: string | Array<string>
        if (name.includes('|')) {
            elementSelector = name.split('|').map((elementName) => elementName.trim())
            const locator = elementSelector.find(async (elementName) => {
                const selecor = selector || `button:has-text("${elementName}")`
                if (await this.page.locator(selecor).isVisible()) {
                    return selector
                }
                return selector
            })
        }
        return this
    }
}
