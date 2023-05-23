import { combineReducers, configureStore } from '@reduxjs/toolkit'
import authSlice from './auth/slice'
import filesSlice from './files/slice'
import uploaderSlice from './uploader/slice'

const rootReducer = combineReducers({
  auth: authSlice,
  files: filesSlice,
  uploader: uploaderSlice,
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
})

export type RootStateType = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
