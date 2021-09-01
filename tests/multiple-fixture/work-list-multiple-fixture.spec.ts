// import { expect } from '@playwright/test'
// import testWorkList from '@tests/multiple-fixture/work-list'

// testWorkList.use({ storageState: 'state.json' })

// testWorkList('删除冲刺-问题移至待办事项 @模块测试', async ({ workListPage, sprint, bug }) => {
//     await testWorkList.step('缺陷移动至冲刺', async () => {
//         const backLogIssueNames = await workListPage.getIssueList(true)
//         await expect(backLogIssueNames).toContain(bug)
//         await workListPage.moveIssueFromBackLog2Sprint(bug, sprint)
//         const sprintIssueNames = await workListPage.getIssueList(true)
//         await expect(sprintIssueNames).toContain(bug)
//     })
//     await testWorkList.step('刪除冲刺', async () => {
//         await workListPage.delSprint(sprint)
//         const backLogIssueNames = await workListPage.getIssueList(true)
//         await expect(backLogIssueNames).toContain(bug)
//     })
// })
