// import { test } from '@playwright/test'
// import { id } from '@utils/data-provider'
// import { IssueType, Tab, WorkListPage } from '@pages/coordination/work-list-page'

// type WorkListFixtures = {
//     workListPage: WorkListPage
//     sprint: string
//     bug: string
// }

// const sprintParameters = { 冲刺名称: id }
// const bugParameters = { 问题概要: id, 问题类型: IssueType.缺陷 }

// const testWorkList = test.extend<WorkListFixtures>({
//     workListPage: async ({ page }, use) => {
//         const workListPage = new WorkListPage(page)
//         await workListPage.navigate(Tab.BACKLOG)
//         await use(workListPage)
//     },

//     sprint: async ({ workListPage }, use) => {
//         await workListPage.addSprint(sprintParameters)
//         await use(sprintParameters.冲刺名称)
//         await workListPage.delSprint(sprintParameters.冲刺名称)
//     },

//     bug: async ({ workListPage }, use) => {
//         await workListPage.addIssue2BackLog(bugParameters)
//         await use(bugParameters.问题概要)
//     }
// })

// export default testWorkList
