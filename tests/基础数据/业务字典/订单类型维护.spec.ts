// import { 订单类型维护, 订单类型 } from '@pages/基础数据/业务字典/订单类型维护'
// import { xid } from '@utils/data-provider'
// import { expect, Page, test } from '@playwright/test'

// test.use({ storageState: 'state.json' })

// test.describe.serial.only('订单类型维护', async () => {
//     let page: Page
//     let 订单类型维护页: 订单类型维护
//     let 订单类型维护参数: 订单类型

//     test.beforeAll(async ({ browser }) => {
//         page = await browser.newPage()
//         订单类型维护页 = new 订单类型维护(page)
//         await 订单类型维护页.导航()
//         订单类型维护参数 = { 订单类型代码: xid, 订单类型名称: '销售订单', 是否启用: '是' }
//     })

//     test('新建订单类型', async () => {
//         await test.step('新建', async () => {
//             await 订单类型维护页.新建(订单类型维护参数)
//             const message = await 订单类型维护页.系统提示信息()
//             expect(message).toEqual('更新成功')
//         })
//         await test.step('查询', async () => {
//             await 订单类型维护页.查询(订单类型维护参数)
//             const content = await 订单类型维护页.获取列表内容()
//             expect(content['订单类型代码']).toEqual(订单类型维护参数.订单类型代码)
//             expect(content['订单类型名称']).toEqual(订单类型维护参数.订单类型名称)
//         })
//     })
// })
