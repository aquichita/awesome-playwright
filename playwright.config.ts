import 'module-alias/register'
import { PlaywrightTestConfig } from '@playwright/test'
import './main.ts'

const config: PlaywrightTestConfig = {
    use: {
        baseURL: process.env.TEST_URL_BASE,
        channel: 'chrome',
        headless: false,
        viewport: { width: 1366, height: 768 },
        ignoreHTTPSErrors: true,
        screenshot: 'on',
        video: 'on',
        trace: 'on',
        storageState: 'state.json'
    },
    timeout: 60,
    testDir: 'tests',
    globalSetup: require.resolve('./htms/setup.ts'),
    globalTeardown: require.resolve('./htms/teardown.ts'),
    preserveOutput: 'always',
    retries: 2,
    workers: process.env.CI ? 2 : undefined,
    reporter: 'allure-playwright'
}
export default config
