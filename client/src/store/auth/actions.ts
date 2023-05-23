import { createAsyncThunk } from '@reduxjs/toolkit'
import { AuthService } from 'src/api'

export const getMe = createAsyncThunk('getMe', async () => {
  const { data } = await AuthService.getMe()

  return data
})
