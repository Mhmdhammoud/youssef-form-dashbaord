import {AuthActions, authState} from '../types'

const initState: authState = {
    isAuthenticated: false,
    user: {
        token: '',
    },
}

const authReducer = (state: authState = initState, action: AuthActions) => {
    switch (action.type) {
        case 'LOGIN_USER':
            return {
                ...state,
                isAuthenticated: true,
                user: {token: action.token},
            }
        case 'LOGOUT_USER':
            return initState
        default:
            return state
    }
}

export default authReducer
