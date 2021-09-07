import { Add, ParameterTable, Search } from '@htms/core/HTMS'
import HTMSPage from '@htms/core/HTMSPage'

export default abstract class BasicModel extends HTMSPage implements Add, Search {
    async add(parameters: ParameterTable) {
        await this.page.click(this.button.NEW, {
            noWaitAfter: true
        })
        await this.setAddParameterTable(parameters)
        await this.page.click(this.button.SAVE)
        return this
    }

    protected abstract setAddParameterTable(parameters: ParameterTable): Promise<this>

    async search(parameters: ParameterTable) {
        if (await this.page.isVisible(this.button.MORE)) {
            await this.page.click(this.button.MORE)
        }
        await this.page.click(this.button.RESET)
        await this.setSearchParameterTable(parameters)
        await this.page.click(this.button.SEARCH)
        return this
    }

    protected abstract setSearchParameterTable(parameters: ParameterTable): Promise<this>
}
