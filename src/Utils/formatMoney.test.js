import {it, expect, describe} from 'vitest'
import { formatMoney } from './formatMoney'

describe('formatMoney', () => {
  it('formats 1999 cents as $19.99', () => {
    expect(formatMoney(1999)).toBe('$19.99')
  });

  it('display two decimals', () => {
    expect(formatMoney(1090)).toBe('$10.90')
    expect(formatMoney(100)).toBe('$1.00')
  });

  it('works with the number zero', () => {
    expect(formatMoney(0)).toBe('$0.00')
  });

  it('works with the negative numbers', () => {
    expect(formatMoney(-999)).toBe('-$9.99')
    expect(formatMoney(-100)).toBe('-$1.00')
  });
})



