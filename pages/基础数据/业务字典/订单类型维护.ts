import HTMS from '@htms'

export interface 订单类型 {
    订单类型代码: string
    订单类型名称: string
    是否启用?: boolean
}

export class BasicOrderType extends HTMS {
    async 导航(url: string = '/htms/basic/ordertype/query') {
        await super.goto(url)
        return this
    }

    async 新建(参数列表: 订单类型) {
        await this.page.click(this.新建按钮)
        if (参数列表.订单类型代码) {
            await this.page.fill('input[name=xid] >> nth=-1', 参数列表.订单类型代码)
        }
        if (参数列表.订单类型名称) {
            await this.page.fill('input[name=name] >> nth=-1', 参数列表.订单类型名称)
        }
        await this.page.click(this.确定按钮)
        return this
    }
}
