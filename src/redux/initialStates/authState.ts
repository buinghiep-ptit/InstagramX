import { UserPayload } from "../../helpers/interfaces/user";
import { userState } from "./userState";

export type AuthSate = {
    isLoggedIn: boolean,
    data: UserPayload,
    error: string,
    loading: boolean,
}  

export const initialAuthState: AuthSate = {
    isLoggedIn: false,
    data: userState,
    error: null,
    loading: false,
};