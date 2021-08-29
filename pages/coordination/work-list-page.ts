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

    async addIssue2BackLog(params: StoryProps) {
        await this.page.click('button:has-text("创建问题") >> nth=-1')
        await this.page.click('.c7n-typeTag >> nth=-1', { strict: true })
        if (params.问题类型) {
            await this.page.click(`.c7n-dropdown-menu > li:has-text("${params.问题类型}")`)
        }
        await this.page.fill(
            '.c7n-backlog-content > :has-text("待办事项") input',
            params.问题概要,
            { strict: true }
        )
        await this.page.click(`button:has-text("确定")`)
        await this.page.waitForTimeout(3000)
        return this
    }

    async moveIssueFromBackLog2Sprint(issueName: string, sprintName: string) {
        await this.page.dragAndDrop(
            `.c7n-backlog-content > :has-text("待办事项") .c7n-backlog-issue-left:has-text("${issueName}")`,
            `.c7n-backlog-content > :has-text("${sprintName}") .c7n-noissue-wapper`
        )
        return this
    }
}
