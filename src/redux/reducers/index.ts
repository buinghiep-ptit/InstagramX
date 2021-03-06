import { combineReducers } from 'redux'
import {
    useSelector as useReduxSelector,
    TypedUseSelectorHook,
} from 'react-redux'

import userReducer from './userReducer'
import { UserPayload } from '../../helpers/interfaces/user'
import { AuthSate } from '../initialStates/authState'

export type AppState = {
    user: AuthSate
}

const rootReducer = combineReducers<AppState>({
    user: userReducer
})
export const useSelector: TypedUseSelectorHook<ReturnType<typeof rootReducer>> = useReduxSelector
export default rootReducer;