import * as provider from 'faker'
import format from 'date-fns/format'

export const dataPrefix: string = 'TEST-AUTO-'

export const xid = () => dataPrefix + format(new Date(), 'yyyyMMddHHmmssSSS')
