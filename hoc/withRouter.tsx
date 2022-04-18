import { useRouter } from 'next/router'
import { PageConstants } from '../constants'
import { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppState } from '../reducers'
import { startLogout } from '../actions'
import { ApolloClient } from '../lib'
import meQuery from './meQuery'

const withRouter = (
  //@ts-ignore
  WrappedComponent
) => {
  //@ts-ignore
  // eslint-disable-next-line react/display-name
  return (props) => {
    const isClient = typeof window !== 'undefined'
    if (isClient) {
      const Router = useRouter()
      const {
        isAuthenticated,
        user: { token },
      } = useSelector((state: AppState) => state.auth)
      const path = Router.pathname
      const ROUTE = PageConstants.find((item) => {
        if (path.split('/')[1] === '' && item.route.split('/')[1] === '') {
          return item
        } else {
          return item.route.split('/')[1] === ''
            ? false
            : path.split('/')[1].includes(item.route.split('/')[1])
        }
      })
      const dispatch = useDispatch()
      const validateAuth = useCallback(() => {
        ApolloClient()
          .query({
            query: meQuery,
          })
          .catch((err) => {
            dispatch(startLogout())
          })
      }, [dispatch])
      useEffect(() => {
        if (ROUTE) {
          if (isAuthenticated) {
            validateAuth()
          }
          if (isAuthenticated && path === '/sign-in') {
            Router.push('/', '/', { shallow: true })
          }
          if (!isAuthenticated && path === '/sign-in') {
            return
          } else if (!isAuthenticated && ROUTE?.isPrivate) {
            Router.push('/sign-in', '/sign-in', { shallow: true })
            return
          }
        }
      }, [dispatch, path, Router, ROUTE, token, isAuthenticated, validateAuth])
      return <WrappedComponent {...props} />
    } else {
      return <WrappedComponent {...props} />
    }
  }
}
export default withRouter
