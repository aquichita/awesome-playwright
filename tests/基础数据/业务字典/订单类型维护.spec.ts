// import { OrderTypePage, OrderTypeProps } from '@pages/基础数据/业务字典/orderTypesPage'
// import { xid } from '@utils/dataProvider'
// import { expect, Page, test } from '@playwright/test'

// test.use({ storageState: 'state.json' })

// test.describe.serial.only('订单类型维护', async () => {
//     let page: Page
//     let orderTypePage: OrderTypePage
//     let orderTypeActiveProps: OrderTypeProps
//     let orderTypeDeactivateProps: OrderTypeProps

//     test.beforeAll(async ({ browser }) => {
//         page = await browser.newPage()
//         orderTypePage = new OrderTypePage(page)
//         await orderTypePage.navigate()
//         orderTypeActiveProps = {
//             订单类型代码: xid(),
//             订单类型名称: '销售订单',
//             是否启用: true
//         }
//         orderTypeDeactivateProps = {
//             订单类型代码: xid(),
//             订单类型名称: '退货订单',
//             是否启用: false
//         }
//     })

//     test('新建订单类型-默认启用', async () => {
//         await test.step('新建', async () => {
//             await orderTypePage.add(orderTypeActiveProps)
//             const noticeMessage = await orderTypePage.noticeMessage()
//             expect(noticeMessage).toEqual('更新成功')
//         })
//         await test.step('查询', async () => {
//             await orderTypePage.search(orderTypeActiveProps)
//             const content = await orderTypePage.getListRowContent()
//             expect(content['订单类型代码']).toEqual(orderTypeActiveProps.订单类型代码)
//             expect(content['订单类型名称']).toEqual(orderTypeActiveProps.订单类型名称)
//             expect(content['是否启用']).toEqual(orderTypeActiveProps.是否启用 ? '是' : '否')
//         })
//     })

//     test('新建订单类型-禁用', async () => {
//         await test.step('新建', async () => {
//             await orderTypePage.add(orderTypeDeactivateProps)
//             const noticeMessage = await orderTypePage.noticeMessage()
//             expect(noticeMessage).toEqual('更新成功')
//         })
//         await test.step('查询', async () => {
//             await orderTypePage.search(orderTypeDeactivateProps)
//             const content = await orderTypePage.getListRowContent()
//             expect(content['订单类型代码']).toEqual(orderTypeDeactivateProps.订单类型代码)
//             expect(content['订单类型名称']).toEqual(orderTypeDeactivateProps.订单类型名称)
//             expect(content['是否启用']).toEqual(orderTypeDeactivateProps.是否启用 ? '是' : '否')
//         })
//     })
// })
