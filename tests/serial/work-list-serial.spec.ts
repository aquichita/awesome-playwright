// import { Page, test } from '@playwright/test'
// import { id } from '@utils/data-provider'
// import { WorkListPage, Tab, StoryProps, SprintProps } from '@pages/coordination/work-list-page'

// test.use({ storageState: 'state.json' })

// test.describe.serial('删除冲刺-问题移至待办事项 @场景测试', async () => {
//     let page: Page
//     let workListPage: WorkListPage
//     let storyParameters: StoryProps
//     let sprintParameters: SprintProps

//     test.beforeAll(async ({ browser }) => {
//         page = await browser.newPage()
//         workListPage = new WorkListPage(page)
//         sprintParameters = { 冲刺名称: id }
//         storyParameters = { 问题概要: id }
//     })

//     test.beforeEach(async () => {
//         await workListPage.navigate(Tab.BACKLOG)
//     })

//     test('创建冲刺', async () => {
//         await workListPage.addSprint(sprintParameters)
//     })

//     test('冲刺中快捷添加故事', async () => {
//         await workListPage.addIssueItemQuick(storyParameters)
//     })

//     test('删除冲刺', async () => {
//         await workListPage.delSprint(sprintParameters.冲刺名称)
//     })
// })
