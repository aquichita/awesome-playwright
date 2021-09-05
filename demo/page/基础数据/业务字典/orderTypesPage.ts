import { ParameterTable } from '@demo/htms/dao/common'
import BasicModel from '@demo/htms/model/basic'

export interface OrderTypeProps extends ParameterTable {
    订单类型代码: string
    订单类型名称: string
    是否启用?: string
}

export class OrderTypePage extends BasicModel {
    async navigate(path: string = '/htms/basic/ordertype/query') {
        await super.navigate(path)
        return this
    }

    async setAddParameterTable(parameters: OrderTypeProps) {
        if (parameters.订单类型代码) {
            await this.page.fill('input[name=xid] >> nth=-1', parameters.订单类型代码)
        }
        if (parameters.订单类型名称) {
            await this.page.fill('input[name=name] >> nth=-1', parameters.订单类型名称)
        }
        if (parameters.是否启用 === '否') {
            await this.关闭启用开关(parameters.是否启用)
        }
        return this
    }

    async setSearchParameterTable(parameters: Partial<OrderTypeProps>) {
        if (parameters.订单类型代码) {
            await this.page.fill('input[name=xid] >> nth=-1', parameters.订单类型代码)
        }
        if (parameters.订单类型名称) {
            await this.page.fill('input[name=name] >> nth=-1', parameters.订单类型名称)
        }
        if (parameters.是否启用) {
            await this.选择下拉列表值('是否启用', parameters.是否启用)
        }
        return this
    }
}
