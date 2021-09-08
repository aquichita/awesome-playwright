import { Add, Search, ParameterTable } from '@htms/core/htms'
import HTMSPage from '@htms/core/page'

export default abstract class BasicModel extends HTMSPage implements Add, Search {
    async add(parameters: ParameterTable) {
        await this.page.click(':is(button:has-text("新建"), button:has-text("新 建"))', {
            noWaitAfter: true
        })
        await this.setAddParameterTable(parameters)
        await this.page.click(
            ':is(button:has-text("保存"),button:has-text("保 存"), button:has-text("确定"),button:has-text("确 定"))'
        )
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
