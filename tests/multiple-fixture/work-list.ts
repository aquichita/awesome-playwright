import { test } from '@playwright/test'
import { id } from '@utils/data-provider'
import { Tab, WorkListPage } from '@pages/coordination/work-list-page'

type WorkListFixtures = {
    workListPage: WorkListPage
    sprint: string
    story: string
}

const sprintParameters = { 冲刺名称: id }
const storyParameters = { 问题概要: id }

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

    story: async ({ workListPage }, use) => {
        await workListPage.addIssueItemQuick(storyParameters)
        await use(storyParameters.问题概要)
    }
})

export default testWorkList
