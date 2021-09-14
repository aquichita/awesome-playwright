import PerformanceTableModel from '@htms/components/c7n-performance-table'
import { Logic } from '@htms/core/htms'
import HTMSPage from '@htms/core/page'
import SelectProps from '@htms/types/select'

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

export class OrderManagePage extends HTMSPage implements Logic {
    async navigate(path: string = '/htms/order/orderManage/query') {
        await super.navigate(path)
        return this
    }

    async add(parameters: OrderProps) {
        await this.clickButton('新 建')
        if (parameters.外部订单号) {
            await this.input('外部订单号', parameters.外部订单号)
        }
        if (parameters.订单类型) {
            await this.selectBySearch('订单类型', parameters.订单类型)
        }
        if (parameters.要求提货时间) {
            await this.selectDate('要求提货时间', parameters.要求提货时间)
        }
        if (parameters.运输模式) {
            await this.selectBySearch('运输模式', parameters.运输模式)
        }
        if (parameters.物料属性) {
            await this.select('物料属性', parameters.物料属性)
        }
        if (parameters.发货方代码) {
            await this.selectBySearch('发货方代码', parameters.发货方代码)
        }
        if (parameters.收货方代码) {
            await this.selectBySearch('收货方代码', parameters.收货方代码)
        }
        if (parameters.物料明细) {
            await this.clickButton('新增')
            await this.selectBySearch(
                '物料明细',
                parameters.物料明细,
                '.c7n-pro-table-last-row-bordered img'
            )
        }
        await this.clickButton('保 存')
        return this
    }

    async search(parameters: Partial<OrderProps>) {
        await this.clickButton('更多')
        await this.clickButton('重置')
        if (parameters.外部订单号) {
            await this.input('外部订单号', parameters.外部订单号)
        }
        if (parameters.订单类型) {
            await this.selectBySearch('订单类型', parameters.订单类型)
        }
        if (parameters.要求提货时间) {
            await this.selectDate('要求提货时间', parameters.要求提货时间)
        }
        await this.clickButton('查询')
        const results = await new PerformanceTableModel(this.page).list()
        return results
    }
}
