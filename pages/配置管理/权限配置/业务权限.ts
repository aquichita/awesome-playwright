import HTMS from '@htms'

export const enum 用户大类 {
    承运商 = '承运商',
    客户 = '客户',
    内部用户 = '内部用户'
}

export interface 业务授权 {
    账号: string
    用户大类: 用户大类
    业务单元: string
}

export interface 查询 {
    账号?: string
    用户名?: string
    用户大类?: 用户大类
    授权类型?: Array<string>
}

export class 业务权限 extends HTMS {
    async 导航(url: string = '/htms/business/permission/query') {
        await super.goto(url)
    }

    async 查询(参数列表: 查询) {
        await this.page.click(this.重置按钮)
        if (参数列表.账号) {
            await this.page.fill('input[name=loginName]', 参数列表.账号)
        }
        await this.page.click(this.查询按钮)
    }

    async 业务授权(参数列表: 业务授权) {
        await this.查询({ 账号: 参数列表.账号 })
        await this.page.click('a:has-text("业务授权")')
        if (参数列表.用户大类) {
            await this.page.fill('input[name=xid]', 参数列表.用户大类)
        }
        await this.page.click(this.保存按钮)
        return this
    }
}
