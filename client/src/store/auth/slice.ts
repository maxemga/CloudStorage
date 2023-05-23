import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { UserType } from 'src/types'
import { getMe } from './actions'

interface State {
  loading: boolean
  user: UserType | undefined
}

const initialState: State = {
  loading: false,
  user: undefined,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (
      state: State,
      { payload }: PayloadAction<UserType | undefined>,
    ) => {
      state.user = payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getMe.pending, (state) => {
      state.loading = true
    })
    builder.addCase(getMe.fulfilled, (state, { payload }) => {
      state.user = payload
      state.loading = false
    }),
      builder.addCase(getMe.rejected, (state, action) => {
        if (action.error.message === 'Request failed with status code 401') {
          state.user = undefined
        }
        state.loading = false
      })
  },
})

export const { setUser } = authSlice.actions

export default authSlice.reducer
