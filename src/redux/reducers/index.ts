import { combineReducers } from 'redux'
import {
    useSelector as useReduxSelector,
    TypedUseSelectorHook,
} from 'react-redux'

import userReducer from './userReducer'

export type AppState = {
    user: any
}

const rootReducer = combineReducers<AppState>({
    user: userReducer
})
export const useSelector: TypedUseSelectorHook<ReturnType<typeof rootReducer>> = useReduxSelector
export default rootReducer;