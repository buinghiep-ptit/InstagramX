import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { auth, firestore } from '../../config';

import { userActionTypes } from "../../constant/actionTypes"
import { HOME, LOGIN } from '../../constant/routerNames';
import { IUserLoginWithEmail, UserPayload } from "../../helpers/interfaces/user"
import { RegisterParams, SignUpUser } from '../../helpers/services/auth.service';
import { navigate } from '../../navigations/rootNavigation';
import { userState } from '../initialStates/userState';
import { UserAction, UserErrorAction, UserRequestAction, UserSuccessAction } from "../reducers/userReducer"


export const LoginRequest = (): UserRequestAction => ({
    type: userActionTypes.LOGIN_REQUEST,
    payload: null
})
export const LoginSuccess = (payload: UserPayload): UserSuccessAction<UserPayload> => ({
    type: userActionTypes.LOGIN_SUCCESS,
    payload: payload
})
export const LoginFailure = (error: string): UserErrorAction => ({
    type: userActionTypes.LOGIN_FAILURE,
    payload: {
        message: error
    }
})
export const Login = (user: IUserLoginWithEmail):
    ThunkAction<Promise<void>, {}, {}, UserAction> => {
    return async (dispatch: ThunkDispatch<{}, {}, UserAction>) => {
        dispatch(LoginRequest());
        return auth().signInWithEmailAndPassword(user.email, user.password).then(ss => {
            if (ss.user) {
                let userx = ss.user
                firestore().collection('users')
                    .where('email', '==', user.email).get().then(qs => {
                        if (qs.size > 0) {
                            const {
                                avatarURL,
                                bio,
                                birthday,
                                email,
                                followings,
                                fullname,
                                gender,
                                phone,
                                searchRecent,
                                username,
                                website,
                                requestedList,
                                notificationSetting,
                                privacySetting,
                                postNotificationList,
                                storyNotificationList,
                                unSuggestList
                            } = qs.docs[0].data()
                            const result: UserPayload = {
                                user: {
                                    logined: true,
                                    firebaseUser: userx,
                                    userInfo: {
                                        avatarURL,
                                        bio,
                                        birthday,
                                        email,
                                        followings,
                                        fullname,
                                        gender,
                                        phone,
                                        searchRecent: searchRecent || [],
                                        username,
                                        website,
                                        storyNotificationList,
                                        postNotificationList,
                                        requestedList,
                                        unSuggestList
                                    }
                                },
                                setting: {
                                    notification: notificationSetting || userState.setting?.notification,
                                    privacy: privacySetting || userState.setting?.privacy
                                }
                            }
                            console.log('result login: ', result)
                            dispatch(LoginSuccess(result))
                        } else dispatch(LoginFailure('Login Failed!'))
                    })
            } else dispatch(LoginFailure('Login Failed!'))
        }).catch(error => {
            alert(`${error}`)
            dispatch(LoginFailure(`${error}`))
        })
    }
}

export const RegisterRequest = (): UserRequestAction => ({
    type: userActionTypes.REGISTER_REQUEST,
    payload: null
})
export const RegisterSuccess = (payload: UserPayload): UserSuccessAction<UserPayload> => ({
    type: userActionTypes.REGISTER_SUCCESS,
    payload: payload
})
export const RegisterFailure = (error: string): UserErrorAction => ({
    type: userActionTypes.REGISTER_FAILURE,
    payload: {
        message: error
    }
})

export const Register = (params: RegisterParams): 
    ThunkAction<Promise<void>, {}, {}, UserAction> => {
    return async (dispatch: ThunkDispatch<{}, {}, UserAction>) => {
        try {
            dispatch(RegisterRequest());
            await SignUpUser(params); 
            dispatch(Login({email: params.email, password: params.password}));
        } catch (error) {
            dispatch(RegisterFailure(`Register Failed: ${error}`));
        }
    }  
}

