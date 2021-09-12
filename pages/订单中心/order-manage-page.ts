import { ParameterTable } from '@htms/core/htms'
import HTMSPage from '@htms/core/page'
import SelectProps from '@htms/types/select'
import OrderManagePageLogic from '@pages/订单中心/order-manage-page-logic'

export const enum ItemProps {
    危险品 = '危险品',
    普货 = '普货',
    温控 = '温控',
    温控危险品 = '温控+危险品'
}

export interface OrderProps {
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

export class OrderManagePage extends HTMSPage {
    async navigate(path: string = '/htms/order/orderManage/query') {
        await super.navigate(path)
        return this
    }

    logic = new OrderManagePageLogic(this.page)

    async add(parameters: OrderProps) {
        await this.logic.add(parameters)
        return this
    }

    async search(parameters: OrderProps) {
        const results = await this.logic.search(parameters)
        return results
    }
}
