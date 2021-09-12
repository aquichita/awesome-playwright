const isFalsy = (value: string) =>
    value === undefined || value === null || value === '' || value === '\n' || value === '\t'

export const clearTableRowParamsFalsy = (param: string) => {
    const values: Array<string> = param.split('\n')
    values.map((value, index) => (isFalsy(value.trim()) ? values.splice(index, 1) : null))
    return values
}

export const rowObjectContent = (names: string, values: string) => {
    const parameterKeys = clearTableRowParamsFalsy(names)
    const parameterVals = clearTableRowParamsFalsy(values)
    return parameterKeys.reduce((p, c, i) => {
        // eslint-disable-next-line no-param-reassign
        p[c] = parameterVals[i]
        return p
    }, {})
}
