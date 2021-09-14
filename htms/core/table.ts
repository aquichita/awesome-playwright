import HTMSPage from '@htms/core/page'
import { rowObjectContent } from '@utils/dataHandle'
import { ElementHandle } from 'playwright'

/**
 * .c7n-pro-table-toolbar span
 * .c7n-pro-table-thead tr input[type=checkbox]
 *
 * .c7n-pro-table-tbody tr
 * .c7n-pro-table-tbody tr input[type=checkbox]
 * .c7n-pro-table-tbody tr a
 *
 * .c7n-pro-table-toolbar span
 * .c7n-performance-table-row-header input[type=checkbox]
 *
 * .c7n-performance-table-body-wheel-area .c7n-performance-table-row
 * .c7n-performance-table-cell-first
 * .c7n-performance-table-row a
 */
export default abstract class Table extends HTMSPage {
    abstract batchSelector?: string

    abstract headSelector: string

    abstract headCheckboxSelector: string

    abstract rowSelector: string

    abstract rowCheckboxSelector: string

    abstract rowOperateSelector: string

    async selectRow(index: number = 0, isTrue: boolean = true, selector?: string) {
        const rowCheckouts = await this.page.$$(selector || this.rowCheckboxSelector)
        isTrue ? await rowCheckouts[index].check() : await rowCheckouts[index].uncheck()
        return this
    }

    async selectAll(isTrue: boolean = true, selector?: string) {
        const checkbox = await this.page.$(selector || this.headCheckboxSelector)
        isTrue ? await checkbox?.check() : await checkbox?.uncheck()
        return this
    }

    /**
     *
     * await this.page.innerText(`${this.root} .c7n-pro-table-thead tr`),
     * await this.page.innerText(`${this.root} .c7n-pro-table-tbody tr`)
     *
     * const feedHandle = await page.$('.feed');
     * expect(await feedHandle.$$eval('.tweet', nodes => nodes.map(n => n.innerText))).toEqual(['Hello!', 'Hi!']);
     * @returns
     */
    async list(headSelector?: string, rowSelector?: string) {
        const headsSelector = headSelector || `${this.root} ${this.rowSelector}`
        const rowsSelector = rowSelector || `${this.root} ${this.rowSelector}`
        const rows = await this.page.$$eval(rowsSelector, async (trs) => {
            const content = await Promise.all(
                trs.map(async (tr) =>
                    rowObjectContent(
                        await this.page.innerText(`${this.root} ${headsSelector}`),
                        // eslint-disable-next-line no-undef
                        (<HTMLElement>tr).innerText
                    )
                )
            )
            return content
        })
        return rows
    }
}
