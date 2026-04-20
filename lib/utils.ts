import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/** Merges Tailwind classes without conflicts */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/** Format a price in MAD or any currency */
export function formatPrice(amount: number, currency = 'MAD'): string {
  return new Intl.NumberFormat('fr-MA', {
    style:    'decimal',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount) + ' ' + currency
}

/** Truncate a string to a max length */
export function truncate(str: string, maxLen: number): string {
  return str.length <= maxLen ? str : str.slice(0, maxLen).trimEnd() + '…'
}

/** Generate a simple unique ID */
export function uid(): string {
  return Math.random().toString(36).slice(2, 10)
}
