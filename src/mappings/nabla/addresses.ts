import { codec, decode } from '@subsquid/ss58'

import { config } from '../../config'

export function ss58ToHex(ss58Address: string): string {
    return decode(ss58Address).bytes
}

export function hexToSs58(hexAddress: string): string {
    return codec(config.prefix).encode(hexAddress)
}

export function maybeHexToSs58(maybeHexAddress: string): string {
    //only if string begins with 0x
    return maybeHexAddress.startsWith('0x')
        ? hexToSs58(maybeHexAddress)
        : maybeHexAddress
}
