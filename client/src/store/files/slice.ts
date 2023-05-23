import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { FilesSource, Statuses } from 'src/enums'
import { FileListType, FileType } from 'src/types'
import {
  createFolder,
  deleteFiles,
  getDeletedFiles,
  getFiles,
  upload,
} from './actions'

interface State {
  files: FileListType
  currentFolder: string | null
  source: FilesSource | string
}

const initialState: State = {
  source: localStorage.getItem('filePath') ?? FilesSource.FILES,
  files: {
    [FilesSource.FILES]: {
      data: [],
      status: Statuses.INIT,
    },
    [FilesSource.TRASH]: {
      data: [],
      status: Statuses.INIT,
    },
  },
  currentFolder: null,
}
const filesSlice = createSlice({
  name: 'files',
  initialState,
  reducers: {
    setFolder(state, { payload }: PayloadAction<string | null>) {
      state.currentFolder = payload
    },
    setSource(state, { payload }: PayloadAction<FilesSource | string>) {
      state.source = payload

      localStorage.setItem('filePath', payload)
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(
        createFolder.fulfilled,
        (state, { payload }: PayloadAction<FileType>) => {
          state.files[FilesSource.FILES].data = [
            ...state.files[FilesSource.FILES].data,
            payload,
          ]
        },
      )

      .addCase(
        upload.fulfilled,
        (state, { payload }: PayloadAction<FileType>) => {
          state.files[FilesSource.FILES].data = [
            ...state.files[FilesSource.FILES].data,
            payload,
          ]
        },
      )

      .addCase(
        deleteFiles.fulfilled,
        (state, { payload }: PayloadAction<any>) => {
          for (let i = 0; i < payload.length; i++) {
            state.files[FilesSource.FILES].data = [
              ...state.files[FilesSource.FILES].data.filter(
                (el) => el.id !== payload[i].id,
              ),
            ]
          }

          state.files[FilesSource.TRASH].data = [
            ...state.files[FilesSource.TRASH].data,
            ...payload,
          ]
        },
      )

      .addCase(getFiles.pending, (state) => {
        state.files[state.source].status = Statuses.LOADING
      })
      .addCase(getFiles.fulfilled, (state, { payload }) => {
        state.files[state.source].data = payload
        state.files[state.source].status = Statuses.SUCCESS
      })
      .addCase(getFiles.rejected, (state) => {
        state.files[state.source].status = Statuses.ERROR
      })

      .addCase(getDeletedFiles.pending, (state) => {
        state.files[state.source].status = Statuses.LOADING
      })
      .addCase(getDeletedFiles.fulfilled, (state, { payload }) => {
        state.files[state.source].data = payload
        state.files[state.source].status = Statuses.SUCCESS
      })
      .addCase(getDeletedFiles.rejected, (state) => {
        state.files[state.source].status = Statuses.ERROR
      }),
})

export const { setFolder, setSource } = filesSlice.actions

export default filesSlice.reducer
