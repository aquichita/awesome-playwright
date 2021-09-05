import SelectProps from '@demo/htms/types/select'

interface ParameterTable {
    [key: string]: string | boolean | undefined | SelectProps
}

interface Add {
    readonly addButtonSelector: string
    readonly saveButtonSelector: string
    add(parameters?: ParameterTable): unknown
}

interface Search {
    readonly moreButtonSelector?: string
    readonly resetButtonSelector: string
    readonly searchButtonSelector: string
    search(parameters?: ParameterTable): unknown
}

export { Add, Search, ParameterTable }
