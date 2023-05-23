import { createAsyncThunk } from '@reduxjs/toolkit'
import { FilesService } from 'src/api'
import {
  CreateFolderype,
  DeleteFiles,
  FileType,
  FileUpload,
  RenameFile,
} from 'src/types'

export const createFolder = createAsyncThunk(
  'files-folder',

  async ({ parentId, name }: CreateFolderype, { rejectWithValue }) => {
    try {
      const { data } = await FilesService.create({
        parentId,
        name,
      })

      return data
    } catch (e) {
      return rejectWithValue(e)
    }
  },
)

export const upload = createAsyncThunk(
  'files/upload',

  async (
    {
      file,
      id,
      onUpdateUploader,
    }: {
      file: FileUpload
      id: string | null
      onUpdateUploader: (value: FileUpload) => void
    },
    { rejectWithValue },
  ) => {
    try {
      const { data } = await FilesService.upload(file, id, onUpdateUploader)

      return data
    } catch (e) {
      return rejectWithValue(e)
    }
  },
)

export const renameFile = createAsyncThunk(
  'files-rename',
  async ({ id, name }: RenameFile, { rejectWithValue }) => {
    try {
      const { data } = await FilesService.rename({ id, name })

      return data
    } catch (e) {
      return rejectWithValue(e)
    }
  },
)

export const deleteFiles = createAsyncThunk(
  'files-delete',

  async ({ ids }: DeleteFiles, { rejectWithValue }) => {
    try {
      const { data } = await FilesService.delete({ ids })

      return data
    } catch (e) {
      return rejectWithValue(e)
    }
  },
)

export const getFiles = createAsyncThunk(
  'files',
  async (id: string | null = null) => {
    const { data } = await FilesService.getAll(id)

    return data
  },
)

export const getDeletedFiles = createAsyncThunk('files/deleted', async () => {
  const { data } = await FilesService.getDeletedAll()

  return data
})
