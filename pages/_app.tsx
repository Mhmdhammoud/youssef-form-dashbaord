import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ApolloClient, persistor, store } from '../lib'
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux'
import { Wrapper } from '../components'
import { ApolloProvider } from '@apollo/client'

function MyApp({ Component, pageProps }: AppProps) {
  const isClient = typeof window !== 'undefined'

  if (isClient) {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor} loading={<Wrapper loading />}>
          <ApolloProvider client={ApolloClient()}>
            <Component {...pageProps} />
          </ApolloProvider>
        </PersistGate>
      </Provider>
    )
  } else {
    return (
      <Provider store={store}>
        <ApolloProvider client={ApolloClient()}>
          <Component {...pageProps} />
        </ApolloProvider>
      </Provider>
    )
  }
}

export default MyApp
