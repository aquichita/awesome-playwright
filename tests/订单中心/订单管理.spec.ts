import { expect, Page, test } from '@playwright/test'
import { ItemProps, OrderManagePage, OrderProps } from '@pages/订单中心/orderManagePage'
import { xid } from '@utils/dataProvider'

test.use({ storageState: 'state.json' })

test.describe.serial.only('订单管理', async () => {
    let page: Page
    let orderManagePage: OrderManagePage
    let orderProps: OrderProps

    test.beforeAll(async ({ browser }) => {
        page = await browser.newPage()
        orderManagePage = new OrderManagePage(page)
        await orderManagePage.navigate()
        orderProps = {
            外部订单号: xid(),
            订单类型: { 代码: 'admin' },
            要求提货时间: '2021-09-04 00:00:00',
            运输模式: { 代码: 'DL' },
            物料属性: ItemProps.危险品,
            发货方代码: { 代码: 'SZDC', 名称: '苏州仓库' },
            收货方代码: { 代码: 'FFTYF002', 名称: '重庆仓库' },
            物料明细: { 代码: 'ITEM002' }
        }
    })

    test('新建订单-默认', async () => {
        await test.step('新建', async () => {
            await orderManagePage.add(orderProps)
            const message = await orderManagePage.noticeMessage()
            expect(message).toEqual('共选取1条记录。成功1条。')
        })
        await test.step('查询', async () => {
            await orderManagePage.search(orderProps)
            const content = await orderManagePage.getListRowContent()
            expect(content['外部订单号']).toEqual(orderProps.外部订单号)
            expect(content['订单类型']).toEqual(orderProps.订单类型)
        })
    })
})
