import HTMS from '@htms'

export interface 业务单元参数列表 {
    业务单元代码: string
    业务单元名称: string
    排序: string
}

export class 业务单元 extends HTMS {
    async 导航(url: string = '/htms/business/unit') {
        await super.goto(url)
    }

    async 新建(参数列表: 业务单元参数列表) {
        await this.page.click(this.新建按钮)
        if (参数列表.业务单元代码) {
            await this.page.fill('input[name=xid]', 参数列表.业务单元代码)
        }
        if (参数列表.业务单元名称) {
            await this.page.fill('input[name=name]', 参数列表.业务单元名称)
        }
        if (参数列表.排序) {
            await this.page.fill('input[name=sort]', 参数列表.排序)
        }
        await this.page.click(this.保存按钮)
        return this
    }
}
