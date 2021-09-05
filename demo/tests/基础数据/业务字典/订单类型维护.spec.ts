import { OrderTypePage, OrderTypeProps } from '@demo/page/基础数据/业务字典/orderTypesPage'
import { xid } from '@utils/data-provider'
import { expect, Page, test } from '@playwright/test'

test.use({ storageState: 'state.json' })

test.describe.serial.only('订单类型维护', async () => {
    let page: Page
    let orderTypePage: OrderTypePage
    let orderTypeProps: OrderTypeProps

    test.beforeAll(async ({ browser }) => {
        page = await browser.newPage()
        orderTypePage = new OrderTypePage(page)
        await orderTypePage.navigate()
        orderTypeProps = {
            订单类型代码: xid,
            订单类型名称: '销售订单',
            是否启用: '是'
        }
    })

    test('新建订单类型', async () => {
        await test.step('新建', async () => {
            await orderTypePage.add(orderTypeProps)
            const noticeMessage = await orderTypePage.noticeMessage()
            expect(noticeMessage).toEqual('更新成功')
        })
        await test.step('查询', async () => {
            await orderTypePage.search(orderTypeProps)
            const content = await orderTypePage.getListRowContent()
            expect(content['订单类型代码']).toEqual(orderTypeProps.订单类型代码)
            expect(content['订单类型名称']).toEqual(orderTypeProps.订单类型名称)
        })
    })
})
