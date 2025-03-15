import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

// Custom Base32 encoding (RFC 4648) without padding
const BASE32_ALPHABET = 'abcdefghijklmnopqrstuvwxyz234567'

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs))

export const encodeHexLowerCase = (bytes: Uint8Array): string =>
  Array.from(bytes)
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('')

export const encodeBase32LowerCaseNoPadding = (bytes: Uint8Array): string => {
  let bits = 0
  let value = 0
  let output = ''

  for (const byte of bytes) {
    value = (value << 8) | byte
    bits += 8

    while (bits >= 5) {
      output += BASE32_ALPHABET[(value >>> (bits - 5)) & 0x1f]
      bits -= 5
    }
  }

  if (bits > 0) {
    output += BASE32_ALPHABET[(value << (5 - bits)) & 0x1f]
  }

  return output
}
