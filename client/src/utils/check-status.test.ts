import { Statuses } from './../enums'
import { checkStatus } from './check-status'

describe('check-status', () => {
  test('with loading', () => {
    expect(
      checkStatus([
        { status: Statuses.SUCCESS },
        { status: Statuses.LOADING },
        { status: Statuses.ERROR },
      ] as any),
    ).toEqual(Statuses.LOADING)
  })

  test('with error', () => {
    expect(
      checkStatus([
        { status: Statuses.SUCCESS },
        { status: Statuses.ERROR },
        { status: Statuses.LOADING },
      ] as any),
    ).toEqual(Statuses.ERROR)
  })

  test('with SUCCES', () => {
    expect(
      checkStatus([
        { status: Statuses.SUCCESS },
        { status: Statuses.SUCCESS },
        { status: Statuses.SUCCESS },
      ] as any),
    ).toEqual(Statuses.SUCCESS)
  })
})
