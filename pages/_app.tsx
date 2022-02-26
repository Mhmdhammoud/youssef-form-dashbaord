import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { WithRouter } from '../hoc';
import { store, persistor } from '../lib';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { Wrapper } from '../components';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={<Wrapper loading />}>
        <Component {...pageProps} />
      </PersistGate>
    </Provider>
  );
}

//@ts-ignore
export default WithRouter(MyApp);
