import { test } from '@playwright/test'
import { WorkListPage, Tab, StoryProps, SprintProps } from '@pages/coordination/work-list-page'
import { id } from '@utils/data-provider'

test.use({ storageState: 'state.json' })

const testScript = test.extend<{ workListPage: WorkListPage }>({
    workListPage: async ({ page }, use) => {
        const workListPage = new WorkListPage(page)
        await workListPage.navigate(Tab.BACKLOG)
        await use(workListPage)
    }
})

let storyParameters: StoryProps
let sprintParameters: SprintProps

test.beforeAll(async () => {
    sprintParameters = { 冲刺名称: id }
    storyParameters = { 问题概要: id }
})

testScript('创建冲刺', async ({ workListPage }) => {
    await workListPage.addSprint(sprintParameters)
})

testScript('冲刺中快捷添加故事', async ({ workListPage }) => {
    await workListPage.delSprint(sprintParameters.冲刺名称)
})

testScript('删除冲刺', async ({ workListPage }) => {
    await workListPage.addIssueItemQuick(storyParameters)
})
