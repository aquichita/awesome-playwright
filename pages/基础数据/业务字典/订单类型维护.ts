import HTMS from '@htms'

export interface 订单类型 {
    订单类型代码: string
    订单类型名称: string
    是否启用?: string
}

export class 订单类型维护 extends HTMS {
    async 导航(path: string = '/htms/basic/ordertype/query') {
        await super.goto(path)
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
        if (参数列表.是否启用 === '否') {
            await this.关闭启用开关(参数列表.是否启用)
        }
        await this.page.click(this.确定按钮)
        return this
    }

    async 查询(参数列表: Partial<订单类型>) {
        await this.page.click(this.重置按钮)
        if (参数列表.订单类型代码) {
            await this.page.fill('input[name=xid] >> nth=-1', 参数列表.订单类型代码)
        }
        if (参数列表.订单类型名称) {
            await this.page.fill('input[name=name] >> nth=-1', 参数列表.订单类型名称)
        }
        if (参数列表.是否启用) {
            await this.选择下拉列表值('是否启用', 参数列表.是否启用)
        }
        await this.page.click(this.查询按钮)
        return this
    }
}
