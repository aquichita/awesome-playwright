import testWorkList from '@tests/multiple-fixture/work-list'

testWorkList.use({ storageState: 'state.json' })

testWorkList('删除冲刺-问题移至待办事项 @模块测试', async ({ workListPage, sprint, issue }) => {
    await testWorkList.step('刪除衝刺', async () => {
        await workListPage.moveIssueFromBackLog2Sprint(issue, sprint)
        await workListPage.delSprint(sprint)
    })
})
