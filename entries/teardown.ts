import * as os from 'os'
import * as shell from 'shelljs'

async function openAllureReport() {
    if (os.platform().includes('win')) {
        shell.exec('allure generate ./allure-results --clean && allure open ./allure-report')
    }
}

async function globalTeardown() {
    await openAllureReport()
}

export default globalTeardown
