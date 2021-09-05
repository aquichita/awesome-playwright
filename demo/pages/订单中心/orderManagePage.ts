import HTMS from '@demo/htms/core/htms'
import { ParameterTable } from '@demo/htms/dao/common'
import BasicModel from '@demo/htms/model/basic'
import SelectProps from '@demo/htms/types/select'

export const enum ItemProps {
    危险品 = '危险品',
    普货 = '普货',
    温控 = '温控',
    温控危险品 = '温控+危险品'
}

export interface OrderProps extends ParameterTable {
    业务单元?: string
    外部订单号: string
    订单类型: SelectProps
    客户?: string
    计划单号?: string
    允许超量?: string
    要求提货时间: string
    要求送达时间?: string
    运输模式: SelectProps
    物料属性: ItemProps
    订单备注?: string
    发货方代码: SelectProps
    收货方代码: SelectProps
    物料明细?: SelectProps
}

export class OrderManagePage extends BasicModel {
    async navigate(path: string = '/htms/order/orderManage/query') {
        await super.navigate(path)
        return this
    }

    async setAddParameterTable(parameters: OrderProps) {
        if (parameters.外部订单号) {
            await this.input('外部订单号', parameters.外部订单号)
        }
        if (parameters.订单类型) {
            await this.SelectBySearch('订单类型', parameters.订单类型)
        }
        if (parameters.要求提货时间) {
            await this.SelectDate('要求提货时间', parameters.要求提货时间)
        }
        if (parameters.运输模式) {
            await this.SelectBySearch('运输模式', parameters.运输模式)
        }
        if (parameters.物料属性) {
            await this.select('物料属性', parameters.物料属性)
        }
        if (parameters.发货方代码) {
            await this.SelectBySearch('发货方代码', parameters.发货方代码)
        }
        if (parameters.收货方代码) {
            await this.SelectBySearch('收货方代码', parameters.收货方代码)
        }
        if (parameters.物料明细) {
            await this.page.click(this.addButtonSelector)
            await this.page.click('.c7n-pro-table-last-row-bordered img')
            await this.SelectBySearch('物料明细', parameters.物料明细, { inner: true })
        }
    }

    async setSearchParameterTable(parameters: Partial<OrderProps>) {
        if (parameters.外部订单号) {
            await this.input('外部订单号', parameters.外部订单号)
        }
        if (parameters.订单类型) {
            await this.SelectBySearch('订单类型', parameters.订单类型)
        }
        if (parameters.要求提货时间) {
            await this.SelectDate('要求提货时间', parameters.要求提货时间)
        }
    }
}
