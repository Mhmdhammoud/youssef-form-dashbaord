import {Dispatch} from 'redux'
import {AppActions} from '../types'
import {AppState} from '../reducers'
import Cookies from 'universal-cookie'

const cookies = new Cookies()

export const login = (token: string): AppActions => ({
    type: 'LOGIN_USER',
    token,
})

export const logout = (): AppActions => ({
    type: 'LOGOUT_USER',
})

export const startLogout = () => {
    return (dispatch: Dispatch<AppActions> | any, getState: () => AppState) => {
        cookies.remove('token')
        cookies.remove('isAuthenticated')
        dispatch(logout())
    }
}
