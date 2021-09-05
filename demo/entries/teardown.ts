import * as os from 'os'
import * as shell from 'shelljs'

async function openAllureReport() {
    if (os.platform().includes('win')) {
        shell.exec('allure generate allure-results --clean')
        shell.exec('allure open allure-report')
    }
    return shell.exec('')
}

async function globalTeardown() {
    openAllureReport()
}

export default globalTeardown
