import Choerodon from '@choerodon/index'

export enum Tab {
    BACKLOG = 'backlog',
    ISSUE = 'issue'
}

export interface SprintProps {
    冲刺名称: string
    周期?: string
    开始日期?: string
    结束日期?: string
    冲刺目标?: string
}

export enum IssueType {
    任务 = '任务',
    故事 = '故事',
    缺陷 = '缺陷'
}

export interface StoryProps {
    问题类型?: IssueType
    经办人?: string
    问题概要: string
}

export class WorkListPage extends Choerodon {
    async navigate(tabName: Tab, url: string = `/#/agile/work-list?activeKey=`) {
        await super.goto(url + tabName)
    }

    async addSprint(params: SprintProps) {
        await this.page.click('button:has-text("创建冲刺")')
        if (params.冲刺名称) {
            await this.page.fill('[name=sprintName]', params.冲刺名称)
        }
        await this.page.click('button:has-text("确定")')
        return this
    }

    async delSprint(sprintName: string) {
        await this.page.click(
            `.c7n-backlog-SprintHeader-top:has-text('${sprintName}') > .c7n-dropdown-trigger`
        )
        await this.page.click('text=删除sprint')
        await this.page.click('button:has-text("删除")')
        return this
    }

    async addIssueItemQuick(params: StoryProps, sprintName?: string) {
        if (!sprintName) {
            await this.page.click(`:nth-match(.c7nagile-QuickCreateIssue > button, 1)`)
        }
        await this.page.fill(`.c7n-input.hidden-label`, params.问题概要)
        await this.page.click(`button:has-text("确定")`)
        // page.waitForTimeout()应该仅用于调试。在生产中使用计时器的测试将是不稳定的。改用网络事件、选择器变得可见等信号。
        await this.page.waitForTimeout(3000)
        return this
    }
}
