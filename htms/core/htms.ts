import SelectProps from '@htms/types/select'

interface ParameterTable {
    [key: string]:
        | string
        | boolean
        | undefined
        | ReadonlyArray<ReadonlyMap<string, unknown>>
        | SelectProps
}

interface Add {
    add(parameters?: ParameterTable): unknown
}

interface Search {
    search(parameters?: ParameterTable): unknown
}

interface Batch {
    batch(parameters?: ParameterTable): unknown
}

interface Operate {
    operate(parameters?: ParameterTable): unknown
}

export { ParameterTable, Add, Search, Batch, Operate }
