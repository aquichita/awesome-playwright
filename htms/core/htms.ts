import SelectProps from '@htms/types/select'

export interface ParameterTable {
    [key: string]:
        | string
        | boolean
        | undefined
        | ReadonlyArray<ReadonlyMap<string, unknown>>
        | ParameterTable
}

export interface Logic {
    add?: (parameters: any) => any
    search?: (parameters: any) => any
    operate?: (parameters: any) => any
    batch?: (parameters: any) => any
}
