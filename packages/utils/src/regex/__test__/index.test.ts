import { expect, it } from 'vitest'
import { moreThanZeroAndHasDecimal } from '../index'

it('1. 大于等于0的数字，且支持小数点后两位', () => {
  expect(moreThanZeroAndHasDecimal.test('1')).toEqual(true)
  expect(moreThanZeroAndHasDecimal.test('1.2')).toEqual(true)
  expect(moreThanZeroAndHasDecimal.test('1.22')).toEqual(true)
  expect(moreThanZeroAndHasDecimal.test('1.232')).toEqual(false)
  expect(moreThanZeroAndHasDecimal.test('1.-1')).toEqual(false)
  expect(moreThanZeroAndHasDecimal.test('1-2')).toEqual(false)
  expect(moreThanZeroAndHasDecimal.test('-12')).toEqual(false)
  expect(moreThanZeroAndHasDecimal.test('0')).toEqual(true)
})
