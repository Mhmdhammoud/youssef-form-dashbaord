import {applyMiddleware, compose, createStore} from 'redux'
import thunk, {ThunkMiddleware} from 'redux-thunk'
import {AppActions} from '../types'
import rootReducer, {AppState} from '../reducers'
import {persistStore} from 'redux-persist'
import {composeWithDevTools} from 'redux-devtools-extension'

const middlewares = [thunk as ThunkMiddleware<AppState, AppActions>]
const middlewareEnhancers = applyMiddleware(...middlewares)
const enhancers = [middlewareEnhancers]

const composedEnhancers: any = compose(...enhancers)

export const store = createStore(
    rootReducer,
    composeWithDevTools(composedEnhancers)
)

if (process.env.NODE_ENV !== 'production' && (module as any).hot) {
    (module as any).hot.accept('../reducers', () =>
        store.replaceReducer(rootReducer)
    )
}
export const persistor = persistStore(store)
