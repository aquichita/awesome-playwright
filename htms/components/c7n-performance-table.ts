import Table from '@htms/core/table'

export default class PerformanceTableModel extends Table {
    headSelector = '.c7n-performance-table-row-header'

    headCheckboxSelector = `${this.headSelector} input[type=checkbox]`

    rowSelector = '.c7n-performance-table-body-wheel-area .c7n-performance-table-row'

    rowCheckboxSelector = `${this.rowSelector} input[type=checkbox]`

    // .c7n-pro-table-toolbar button
    batchSelector: string | undefined

    rowOperateSelector = '.c7n-performance-table-row a'
}
