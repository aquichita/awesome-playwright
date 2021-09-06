import { Page } from 'playwright'

export interface LoginProps {
    readonly loginUrl: string
    readonly username: string
    readonly password: string
}
export class LoginPage {
    protected readonly page: Page

    constructor(page: Page) {
        this.page = page
    }

    async login(params?: LoginProps) {
        const url = params?.loginUrl || (process.env.TEST_DEV_LOGIN_URL as string)
        const name = params?.username || (process.env.TEST_DEV_USERNAME as string)
        const pwd = params?.password || (process.env.TEST_DEV_PASSWORD as string)
        await this.page.goto(url)
        await this.page.fill('[placeholder="登录名/邮箱"]', name)
        await this.page.fill('[placeholder="密码"]', pwd)
        await this.page.click(':is(button:has-text("登录"), button:has-text("登 录"))', {
            noWaitAfter: true
        })
        await this.page.waitForNavigation({ timeout: 180000 })
        return this
    }
}
