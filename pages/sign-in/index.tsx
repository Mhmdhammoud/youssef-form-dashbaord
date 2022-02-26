import { LockClosedIcon } from '@heroicons/react/solid';

import React, { useCallback, useEffect, useState } from 'react';
import { ErrorToast } from '../../components';
import { Signinpayload } from '../../types';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../actions';
import { useRouter } from 'next/router';
import { AppState } from '../../reducers';
import { useLoginMutation } from '../../src/generated/graphql';
import Cookies from 'universal-cookie';
const Index = () => {
  const [userData, setUserData] = useState<Signinpayload>({
    email: '',
    password: '',
  });

  const [showError, setShowError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const router = useRouter();
  const isAuthenticated = useSelector(
    (state: AppState) => state.auth.isAuthenticated
  );
  useEffect(() => {
    if (isAuthenticated) {
      router.push('/');
    }
  }, [router, isAuthenticated]);
  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setUserData((prevState) => ({
        ...prevState,
        [event.target.id]: event.target.value,
      }));
    },
    []
  );

  const dispatch = useDispatch();
  const cookies = new Cookies();
  const isDisabled = Boolean(userData.email === '' || userData.password === '');

  const [signInFunction, { loading }] = useLoginMutation({
    variables: {
      input: {
        email: userData.email,
        password: userData.password,
      },
    },
  });

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const { data: DATA } = await signInFunction();
    if (DATA) {
      if (DATA?.login.errors)
        if (DATA?.login.errors?.length > 0) {
          setShowError(true);
          setErrorMessage(DATA?.login.errors[0].message);
        }
      const loginData = DATA.login;
      if (loginData?.token) {
        cookies.set('token', loginData.token, { path: '/' });
        cookies.set('isAuthenticated', true, { path: '/' });
        dispatch(login(loginData.token));
      }
    }
  };

  return (
    <>
      <div className="h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Sign in to your account
            </h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="nope"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="email address"
                  onChange={handleChange}
                  value={userData?.email}
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="nope"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                  value={userData?.password}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                disabled={isDisabled}
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <LockClosedIcon
                    className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                    aria-hidden="true"
                  />
                </span>
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
      <ErrorToast
        message={errorMessage}
        setShow={setShowError}
        show={showError}
        title={'Wrong credentials'}
      />
    </>
  );
};
export default Index;
