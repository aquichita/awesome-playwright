import { test } from '@playwright/test'
import { id } from '@utils/data-provider'
import { IssueType, Tab, WorkListPage } from '@pages/coordination/work-list-page'

type WorkListFixtures = {
    workListPage: WorkListPage
    sprint: string
    issue: string
}

const sprintParameters = { 冲刺名称: id }
const issueParameters = { 问题概要: id, 问题类型: IssueType.缺陷 }

const testWorkList = test.extend<WorkListFixtures>({
    workListPage: async ({ page }, use) => {
        const workListPage = new WorkListPage(page)
        await workListPage.navigate(Tab.BACKLOG)
        await use(workListPage)
    },

    sprint: async ({ workListPage }, use) => {
        await workListPage.addSprint(sprintParameters)
        await use(sprintParameters.冲刺名称)
    },

    issue: async ({ workListPage }, use) => {
        await workListPage.addIssue2BackLog(issueParameters)
        await use(issueParameters.问题概要)
    }
})

export default testWorkList
