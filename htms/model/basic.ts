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
        if (
            await this.page.isVisible(':is(button:has-text("更多"), button:has-text("更多查询"))')
        ) {
            await this.page.click(':is(button:has-text("更多"), button:has-text("更多查询"))')
        }
        await this.page.click(':is(button:has-text("重置"), button:has-text("重 置"))')
        await this.setSearchParameterTable(parameters)
        await this.page.click(':is(button:has-text("查询"), button:has-text("查 询"))')
        return this
    }

    protected abstract setSearchParameterTable(parameters: ParameterTable): Promise<this>
}
