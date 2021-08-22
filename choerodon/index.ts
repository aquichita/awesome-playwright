import type { Page } from 'playwright'

export default class Choerodon {
    readonly page: Page

    constructor(page: Page) {
        this.page = page
    }

    get url(): string {
        return [
            `&type=${process.env.TEST_TYPE as string}`,
            `id=${process.env.TEST_PRO_ID as string}`,
            `name=${process.env.TEST_PRO_NAME as string}`,
            `organizationId=${process.env.TEST_ORG_ID as string}`,
            `category=${process.env.TEST_PRO_CATEGORY as string}`
        ].join('&')
    }

    async goto(path: string, otherBaseUrl?: string) {
        const requestUrl = otherBaseUrl ? path.concat(otherBaseUrl) : path.concat(this.url)
        await this.page.goto(requestUrl)
    }
}
