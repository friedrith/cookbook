import { useCallback, useMemo } from 'react'
import { RootState } from '@/store'
import { AnyAction, ThunkAction } from '@reduxjs/toolkit'

import { useAppSelector, useAppDispatch } from '@/hooks/redux'

const useSetting = function <T>(
  selector: (state: RootState) => T,
  action: (
    payload: T,
  ) => AnyAction | ThunkAction<unknown, RootState, undefined, AnyAction>,
): [T, (d: T) => void] {
  const value = useAppSelector(selector)

  const dispatch = useAppDispatch()

  const setValue = useCallback(
    (v: T) => dispatch(action(v)),
    [dispatch, action],
  )

  return useMemo(() => [value, setValue], [value, setValue])
}

export default useSetting
