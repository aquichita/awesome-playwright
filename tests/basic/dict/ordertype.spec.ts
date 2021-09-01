import { BasicOrderType, 订单类型 } from '@pages/基础数据/业务字典/订单类型维护'
import id from '@utils/data-provider'
import { Page, test } from '@playwright/test'

test.use({ storageState: 'state.json' })

test.describe.serial('新建订单类型 @模块测试', async () => {
    let page: Page
    let 订单类型维护: BasicOrderType
    let 订单类型维护参数: 订单类型

    test.beforeAll(async ({ browser }) => {
        page = await browser.newPage()
        订单类型维护 = new BasicOrderType(page)
        订单类型维护.导航()
        订单类型维护参数 = { 订单类型代码: id, 订单类型名称: '销售订单' }
    })

    test('新建', async () => {
        await 订单类型维护.新建(订单类型维护参数)
    })
})
