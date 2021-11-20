import { Alert } from 'react-native';
import { userActionTypes } from '../../constant/actionTypes';
import {UserPayload} from '../../helpers/interfaces/user';
import { AuthSate, initialAuthState } from '../initialStates/authState';

export interface UserRequestAction {
  type: string,
  payload: null,
}
export interface UserSuccessAction<T> {
  type: string,
  payload: T,
}
export interface UserErrorAction {
  type: string,
  payload: { 
    message: string 
  },
}

export type UserAction = 
  UserSuccessAction<UserPayload> 
  | UserRequestAction
  | UserErrorAction

const userReducer = (state: AuthSate = initialAuthState, action: UserAction): AuthSate => {
  switch (action.type) {
    case userActionTypes.REGISTER_REQUEST:
      action = <UserRequestAction>action;
      state = {...state, loading: true }
      return state;  
    case userActionTypes.REGISTER_SUCCESS:
      action = <UserSuccessAction<UserPayload>>action;
      state = { ...state, data: {...action.payload}, loading: false }
      return state; 
    case userActionTypes.REGISTER_FAILURE:
      action = <UserErrorAction>action;
      const messageRegis = action.payload.message;
      state = { ...state, error: messageRegis, loading: false }
      Alert.alert('Error Register', messageRegis)
      return state; 

    case userActionTypes.LOGIN_REQUEST:
      action = <UserRequestAction>action;
      state = {...state, loading: true }
      return state;  
    case userActionTypes.LOGIN_SUCCESS:
      action = <UserSuccessAction<UserPayload>>action;
      state = { ...state, data: {...action.payload}, loading: false, isLoggedIn: true }
      return state; 
    case userActionTypes.LOGIN_FAILURE:
      action = <UserErrorAction>action;
      const messageLogin = action.payload.message;
      state = { ...state, error: messageLogin, loading: false }
      Alert.alert('Error Login', messageLogin)
      return state; 

    default:
      return state;
  }
};

export default userReducer;
