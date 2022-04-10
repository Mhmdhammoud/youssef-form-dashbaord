import {useRouter} from 'next/router'
import {PageConstants} from '../constants'
import {useCallback, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {AppState} from '../reducers'
import {startLogout} from "../actions";
import {ApolloClient} from "../lib";
import meQuery from "./meQuery";

const withRouter = (
    //@ts-ignore
    WrappedComponent,
) => {
    //@ts-ignore
    // eslint-disable-next-line react/display-name
    return (props) => {
        const isClient = typeof window !== 'undefined'
        if (isClient) {
            const Router = useRouter()
            const {isAuthenticated, user: {token}} = useSelector((state: AppState) => state.auth)
            const path = Router.asPath
            const ROUTE = PageConstants.find((item) => path.includes(item.route))
            const dispatch = useDispatch()
            const validateAuth = useCallback(() => {
                ApolloClient().query({
                    query: meQuery
                }).catch(err => {
                    dispatch(startLogout())
                })
            }, [dispatch])
            useEffect(() => {
                if (isAuthenticated) {
                    validateAuth()
                }
                if (isAuthenticated && path === '/sign-in') {
                    Router.push('/', '/', {shallow: true})
                }
                if (!isAuthenticated && path === '/sign-in') {
                    return
                } else if (!isAuthenticated) {
                    Router.push('/sign-in', '/sign-in', {shallow: true})
                    return
                }
            }, [dispatch, path, Router, ROUTE, token, isAuthenticated, validateAuth])
            return (
                <WrappedComponent {...props} />
            )
        } else {
            return (
                <WrappedComponent {...props} />
            )
        }
    }
}
export default withRouter
