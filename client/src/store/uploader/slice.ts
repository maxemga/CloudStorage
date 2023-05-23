import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Statuses } from 'src/enums'
import { FileUpload } from 'src/types'

interface State {
  files: FileUpload[]
  errors: FileUpload[]
  isRolled: boolean
}

const initialState: State = {
  files: [],
  errors: [],
  isRolled: false,
}

const uploaderSlice = createSlice({
  name: 'uploader',
  initialState,
  reducers: {
    setRolled(state, { payload }: PayloadAction<boolean>) {
      state.isRolled = payload
    },
    addErrorsFile(state, { payload }: PayloadAction<FileUpload>) {
      state.errors = [...state.errors, payload]
    },
    removeErrorsFile(state) {
      state.errors = state.errors.splice(1)
    },
    addUploader(state, { payload }: PayloadAction<FileUpload[]>) {
      state.files = [...payload, ...state.files]
    },

    updateUploader(state, { payload }: PayloadAction<Partial<FileUpload>>) {
      state.files = state.files.map((file) => {
        if (file.id === payload.id) {
          return Object.assign(file, {
            loaded: payload.loaded ?? file.loaded,
            total: payload.total ?? file.total,
            error: payload.error ?? file.error,
            status: payload.status ?? file.status,
            path: payload.path ?? file.path,
            folder: payload.folder ?? file.folder,
          })
        }

        return file
      })
    },
    removeUploader(state, { payload }) {
      state.files = state.files.filter((file) => file.id !== payload)
    },
  },
})

export const {
  addUploader,
  updateUploader,
  setRolled,
  addErrorsFile,
  removeErrorsFile,
  removeUploader,
} = uploaderSlice.actions

export default uploaderSlice.reducer
