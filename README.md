# awesome-playwright

🚀 基于Nodejs、Typescript、Playwright的最小可运行的WEB UI自动化测试演示项目。

#### 使用

```bash
git clone https://gitee.com/aquichita/awesome-playwright.git
cd awesome-playwright
yarn install

set PLAYWRIGHT_BROWSERS_PATH=%USERPROFILE%\pw-browsers
npx playwright install

npx playwright test --browser=all
npx playwright test tests\multiple-fixture\work-list-multiple-fixture.spec.ts

```

#### 目录结构

```
awesome-playwright
├─ choerodon
│  ├─ index.ts
│  ├─ setup.ts
│  └─ teardown.ts
├─ commitlint.config.js
├─ main.ts
├─ package.json
├─ pages
│  └─ coordination
│     └─ work-list-page.ts
├─ playwright.config.ts
├─ README.md
├─ tests
│  ├─ multiple-fixture
│  │  ├─ work-list-multiple-fixture.spec.ts
│  │  └─ work-list.ts
│  ├─ serial
│  │  └─ work-list-serial.spec.ts
│  └─ sigle-fixture
│     └─ work-list-sigle-fixture.spec.ts
├─ tsconfig.json
├─ utils
│  └─ data-provider.ts
```

### 辅助功能

#### 手动录制脚本

```bash
npx playwright codegen https://api.choerodon.com.cn/oauth/choerodon/login
```

![image-20210822093712378](https://gitee.com/aquichita/picgo/raw/master/img/202108221013715.png)

#### 观察者模式

```
# Windows with cmd.exe
set PWDEBUG=1
npx playwright test xx.spec.ts
```

![image-20210822153129923](https://gitee.com/aquichita/picgo/raw/master/img/202108221531987.png)

#### 集成报告

![image-20210822150914991](https://gitee.com/aquichita/picgo/raw/master/img/202108221509100.png)

### 具体实现

#### 元素定位

> 选择器的选择决定了自动化脚本维护成本，建议优先考虑面向用户的属性和明确的合同。

###### 优先考虑面向用户的属性

```typescript
// 文本内容、输入占位符、辅助功能角色和标签等属性是面向用户的属性
await page.click('button:has-text("登录")')
await page.click('[placeholder=请选择项目]')
await page.click(`li:has-text("应用产品中心")`)
await page.click('text=删除sprint')
```

###### 自定义属性/非DOM属性

```typescript
await page.click('.c7n-spin-container > role=menuitem')
```

###### 避免引用DOM 结构或实现

```typescript
await page.click('/html/body/div[3]/div/div[2]/div/ul/li[2]')
```

#### 页面封装规范

-   系统通用页面及跨多页面逻辑设计为接口/基类，定义默认实现；

```typescript
// index.ts
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
```

-   页面类名以 Page 结尾，接口/共用逻辑非 Page 结尾；
-   Page 类只负责该 Page 的业务逻辑；
-   页面封装业务逻辑为主，通过参数控制调用不同的业务流；
-   页面逻辑皆返回特定页面对象，支持测试用例链式调用；
-   页面逻辑参数均使用 Bean/枚举封装规范入参，按照业务逻辑设计默认值;
-   页面上所有逻辑禁止包含断言操作，把断言留给脚本设计；

```typescript
// work-list-page.ts
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
        await this.page.waitForTimeout(3000)
        return this
    }
}

```

##### 原则

- 易读
  - 很容易通过测试脚本理解被测软件的功能;
  - 通过测试脚本能够快速定位缺陷的位置；
- 易维护：测试脚本应该是容易编写和维护；
- 可扩展：测试脚本应该是很容易扩展自身以适应产品变化；

#### 测试数据管理-Fixture模式

##### 使用方式分类
- 共享数据
  - 全局共享数据：globalSetup
  - 模块共享数据：mixed-fixture
  - 场景共享数据：multiple-fixture
- 隔离数据
  - 用例隔离数据：fixture

##### 业务属性分类
- 必填数据：faker
- 非必填数据
  - 业务关联数据: faker+fixture
  - 非业务关联数据 : faker+fixture

```typescript
// work-list.ts
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
```

#### 脚本结构组织

流程性场景用例经常测试步骤之间数据存在强耦合关系，常见的解决方法如下：

##### 串行模式

使用 test.describe.serial对相关测试进行分组，以确保它们始终按串行顺序一起运行。
如果其中一项测试失败，则跳过所有后续测试。组中的所有测试一起重试。这对于不能单独运行的依赖测试很有用。
在不重试的情况下运行时，将跳过失败后的所有测试。使用 retries 运行时，所有测试一起重试。

```typescript
import { Page, test } from '@playwright/test'
import { id } from '@utils/data-provider'
import { WorkListPage, Tab, StoryProps, SprintProps } from '@pages/coordination/work-list-page'

test.use({ storageState: 'state.json' })

test.describe.serial('删除冲刺-问题移至待办事项 @场景测试', async () => {
    let page: Page
    let workListPage: WorkListPage
    let storyParameters: StoryProps
    let sprintParameters: SprintProps

    test.beforeAll(async ({ browser }) => {
        page = await browser.newPage()
        workListPage = new WorkListPage(page)
        sprintParameters = { 冲刺名称: id }
        storyParameters = { 问题概要: id }
    })

    test.beforeEach(async () => {
        await workListPage.navigate(Tab.BACKLOG)
    })

    test('创建冲刺', async () => {
        await workListPage.addSprint(sprintParameters)
    })

    test('冲刺中快捷添加故事', async () => {
        await workListPage.addIssueItemQuick(storyParameters)
    })

    test('删除冲刺', async () => {
        await workListPage.delSprint(sprintParameters.冲刺名称)
    })
})
```

##### 固定装置

使用 fixture 以最小数据模块来组成用例结构，通常这是更好的组织形式，使测试隔离方便独立运行和重试。

```typescript
// work-list-multiple-fixture.spec.ts
import testWorkList from '@tests/multiple-fixture/work-list'

testWorkList.use({ storageState: 'state.json' })

testWorkList('删除冲刺-问题移至待办事项 @模块测试', async ({ workListPage, sprint }) => {
    await workListPage.delSprint(sprint)
})
```

### 一些建议

- 选择成熟工具链不等于选择生产力低下的工具链；
- 相对于先进的工具更应该选择适合项目的技术方案；
- E2E自动化覆盖率应该在CI/CD中占相对较小；
- 自动化测试项目质量取决于功能测试用例质量；
- 一般来说自动化测试脚本可读性和维护成本成反比；
- 初期自动化测试项目应避免陷入过度设计和细节实现的无底洞；

