// import { ParameterTable } from '@htms/core/htms'
// import BasicModel from '@htms/model/common'

// export interface OrderTypeProps extends ParameterTable {
//     订单类型代码: string
//     订单类型名称: string
//     是否启用?: boolean
// }

// export class OrderTypePage extends BasicModel {
//     async navigate(path: string = '/htms/basic/ordertype/query') {
//         await super.navigate(path)
//         return this
//     }

//     async setAddParameterTable(parameters: OrderTypeProps) {
//         if (parameters.订单类型代码) {
//             await this.input('订单类型代码', parameters.订单类型代码)
//         }
//         if (parameters.订单类型名称) {
//             await this.input('订单类型名称', parameters.订单类型名称)
//         }
//         if (parameters.是否启用 !== undefined) {
//             await this.checkbox('是否启用', parameters.是否启用)
//         }
//         return this
//     }

//     async setSearchParameterTable(parameters: Partial<OrderTypeProps>) {
//         if (parameters.订单类型代码) {
//             await this.input('订单类型代码', parameters.订单类型代码)
//         }
//         if (parameters.订单类型名称) {
//             await this.input('订单类型名称', parameters.订单类型名称)
//         }
//         if (parameters.是否启用 !== undefined) {
//             await this.select('是否启用', parameters.是否启用 ? '是' : '否')
//         }
//         return this
//     }
// }
