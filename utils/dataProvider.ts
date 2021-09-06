import * as provider from 'faker'

export const dataPrefix: string = 'TEST-AUTO-'
export function xid(prefix: string = dataPrefix) {
    return prefix.concat(Date.now().toString())
}
