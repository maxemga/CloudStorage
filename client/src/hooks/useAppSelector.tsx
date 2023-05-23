import { TypedUseSelectorHook, useSelector } from 'react-redux'
import { RootStateType } from 'src/store'

export const useAppSelector: TypedUseSelectorHook<RootStateType> = useSelector
