import { createAsyncThunk, createSlice, createSelector } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid'

import type { RootState } from '@/store'
import Timer, {
  timerToDuration,
  durationLeft,
} from '@/features/timers/models/Timer'
import Duration, {
  durationLessThan,
  secondsToDuration,
} from '@/features/timers/models/Duration'

export const recipesTimersState = {
  list: [] as Timer[],
}

type TimerCreatorPayload = {
  recipeId: string
  duration: Duration
}

export const startTimer = createAsyncThunk<Timer, TimerCreatorPayload>(
  'timers/start',
  async ({ recipeId, duration }: TimerCreatorPayload) => {
    const startedAt = new Date()

    return JSON.parse(
      JSON.stringify({
        recipeId,
        id: uuidv4(),
        startedAt,
        duration,
        endAt: new Date(startedAt.getTime() + duration),
      }),
    )
  },
)

export const stopTimer = createAsyncThunk<null, string>(
  'timers/stop',
  async (timerId: string) => {
    return null
  },
)

const timersSlice = createSlice({
  name: 'timers',
  initialState: recipesTimersState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(startTimer.fulfilled, (state, action) => {
      state.list = [...state.list, action.payload]
        .sort((tA, tB) => timerToDuration(tA) - timerToDuration(tB))
        .filter(t => !durationLessThan(durationLeft(t), 0))
    })

    builder.addCase(stopTimer.fulfilled, (state, action) => {
      state.list = state.list.filter(t => t.id !== action.meta.arg)

      return state
    })
  },
})

export default timersSlice

export const getActiveTimer = createSelector(
  (state: RootState) => state.timers.list,
  list => {
    const timer = list[0]
    if (list.length > 1) {
      if (durationLessThan(durationLeft(timer), -1 * secondsToDuration(10))) {
        return timer
      }
      return list[1]
    }

    return list[0]
  },
)

export const getActiveTimers = createSelector(
  (state: RootState) => state.timers.list,
  list => list,
)
