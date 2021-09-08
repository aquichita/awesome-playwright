// import { Page } from 'playwright'

// export default class Button {
//     protected readonly page: Page

//     protected constructor(page: Page) {
//         this.page = page
//     }

//     async click(name: string, selector?: string) {
//         if (name.includes('|')) {
//             const selectors = name.split('|').map((elementName) => elementName.trim())
//             // this.page.$(selector[, options]).waitForElementState(state [, options] )
//             const element = selectors.find(async (elementName) => {
//                 const selecor = selector || `button:has-text("${elementName}")`
//                 if (await this.page.locator(selecor).isVisible()) {
//                     return selector
//                 }
//             })
//         }
//         return this
//     }
// }
