import {IUser} from "./IUser";

export interface authState {
    isAuthenticated: boolean
    user: IUser
}

export const LOGIN_USER = 'LOGIN_USER'
export const LOGOUT_USER = 'LOGOUT_USER'

interface Login {
    type: typeof LOGIN_USER
    token: string
}

interface Logout {
    type: typeof LOGOUT_USER
}

export type AuthActions = Logout | Login
