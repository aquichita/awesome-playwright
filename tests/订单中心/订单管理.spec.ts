import { xid } from '@utils/data-provider'
import { expect, Page, test } from '@playwright/test'
import { 新建订单参数声明, 物料属性, 订单管理 } from '@pages/订单中心/订单管理'

test.use({ storageState: 'state.json' })

test.describe.serial.only('订单管理', async () => {
    let page: Page
    let 订单管理页: 订单管理
    let 订单管理新建参数: 新建订单参数声明

    test.beforeAll(async ({ browser }) => {
        page = await browser.newPage()
        订单管理页 = new 订单管理(page)
        await 订单管理页.导航()
        订单管理新建参数 = {
            外部订单号: xid,
            订单类型: { 代码: 'admin', 名称: '销售订单' },
            要求提货时间: '2021-09-04 00:00:00',
            运输模式: { 代码: 'DL', 名称: '公路运输' },
            物料属性: 物料属性.危险品,
            发货方代码: { 代码: 'SZDC', 名称: '苏州仓库' },
            收货方代码: { 代码: 'FFTYF002', 名称: '重庆仓库' },
            物料明细: { 代码: 'ITEM002', 名称: '服装' }
        }
    })

    test('新建订单', async () => {
        await test.step('新建', async () => {
            await 订单管理页.新建(订单管理新建参数)
            const message = await 订单管理页.系统提示信息()
            expect(message).toEqual('共选取1条记录。成功1条。')
        })
    })
})
