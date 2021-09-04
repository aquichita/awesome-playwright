import HTMS from '@htms'
import { 选择数据参数类型 } from '@htms/typing'

export const enum 物料属性 {
    危险品 = '危险品',
    普货 = '普货',
    温控 = '温控',
    温控危险品 = '温控+危险品'
}

export interface 新建订单参数声明 {
    业务单元?: string
    外部订单号: string
    订单类型: 选择数据参数类型
    客户?: string
    计划单号?: string
    允许超量?: string
    要求提货时间: string
    要求送达时间?: string
    运输模式: 选择数据参数类型
    物料属性: 物料属性
    订单备注?: string
    发货方代码: 选择数据参数类型
    收货方代码: 选择数据参数类型
    物料明细?: 选择数据参数类型
}

export class 新建页面 extends HTMS {
    async 导航(path: string = '/htms/order/orderManage/create/new') {
        await super.goto(path)
        return this
    }

    async 新建(参数列表: 新建订单参数声明) {
        if (参数列表.外部订单号) {
            await this.输入参数('外部订单号', 参数列表.外部订单号)
        }
        if (参数列表.订单类型) {
            await this.选择下拉列表查询值('订单类型', 参数列表.订单类型)
        }
        if (参数列表.要求提货时间) {
            await this.选择时间('要求提货时间', 参数列表.要求提货时间)
        }
        if (参数列表.运输模式) {
            await this.选择下拉列表查询值('运输模式', 参数列表.运输模式)
        }
        if (参数列表.物料属性) {
            await this.选择下拉列表值('物料属性', 参数列表.物料属性)
        }
        if (参数列表.发货方代码) {
            await this.选择下拉列表查询值('运输模式', 参数列表.发货方代码)
        }
        if (参数列表.收货方代码) {
            await this.选择下拉列表查询值('运输模式', 参数列表.收货方代码)
        }
        if (参数列表.物料明细) {
            await this.page.click('button:has-text("新增")')
            await this.page.click('.c7n-pro-table-last-row-bordered img')
            await this.选择下拉列表查询值('物料明细', 参数列表.物料明细)
        }
        await this.page.click(this.Button.保存)
        return this
    }
}
