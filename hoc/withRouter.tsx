import { useRouter } from 'next/router';
import { PageConstants } from '../constants';
import SigninPage from '../pages/sign-in';
import { useEffect, useState } from 'react';
import { Wrapper } from '../components';
import Cookies from 'universal-cookie';
import { ApolloProvider } from '@apollo/client';
import { ApolloClient } from '../lib';

const withAuth = (
  //@ts-ignore
  WrappedComponent: ({ Component, pageProps }) => JSX.Element
) => {
  //@ts-ignore
  // eslint-disable-next-line react/display-name
  return (props) => {
    const Router = useRouter();
    const cookies = new Cookies();
    const token = cookies.get('token');
    const isAuthenticated = cookies.get('isAuthenticated');
    const [loading, setLoading] = useState<boolean>(true);
    const path = Router.asPath;

    //@ts-ignore
    useEffect(() => {
      const ROUTE = PageConstants.find((item) => item.route === path);
      if (!ROUTE) {
        setLoading(false);
        return (
          <ApolloProvider client={ApolloClient(token)}>
            <WrappedComponent {...props} />
          </ApolloProvider>
        );
      }
      const { isPrivate } = ROUTE;
      if (!isPrivate) {
        setLoading(false);
        return (
          <ApolloProvider client={ApolloClient(token)}>
            <WrappedComponent {...props} />
          </ApolloProvider>
        );
      } else {
        if (!isAuthenticated) {
          setLoading(false);
          Router.push('/sign-in', '/sign-in', { shallow: true });
        } else {
          setLoading(false);
          return (
            <ApolloProvider client={ApolloClient(token)}>
              <WrappedComponent {...props} />
            </ApolloProvider>
          );
        }
      }
    }, [path, isAuthenticated, token, props, Router]);
    if (loading) {
      return (
        <ApolloProvider client={ApolloClient(token)}>
          <Wrapper loading />
        </ApolloProvider>
      );
    } else {
      return (
        <ApolloProvider client={ApolloClient(token)}>
          <WrappedComponent {...props} />
        </ApolloProvider>
      );
    }
  };
};
export default withAuth;
