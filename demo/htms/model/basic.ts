import { Add, ParameterTable, Search } from '@demo/htms/dao/common'
import HTMS from '@demo/htms/core/htms'

export default abstract class BasicModel extends HTMS implements Add, Search {
    async add(parameters: ParameterTable) {
        await this.page.click(this.newButtonSelector, {
            noWaitAfter: true
        })
        this.setAddParameterTable(parameters)
        await this.page.click(this.saveButtonSelector)
        return this
    }

    protected abstract setAddParameterTable(parameters: ParameterTable): unknown

    async search(parameters: ParameterTable) {
        if (await this.page.isVisible(this.moreButtonSelector)) {
            await this.page.click(this.moreButtonSelector)
        }
        await this.page.click(this.resetButtonSelector)
        this.setSearchParameterTable(parameters)
        await this.page.click(this.searchButtonSelector)
        return this
    }

    protected abstract setSearchParameterTable(parameters: ParameterTable): unknown
}
