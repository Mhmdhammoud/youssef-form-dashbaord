import { LockClosedIcon } from '@heroicons/react/solid';
import { Footer, Header, Notification, Wrapper } from '../../components';
import React, { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { useResetPasswordMutation } from '../../src/generated/graphql';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { AppState } from '../../reducers';
import classnames from 'classnames';
import Image from 'next/image';

const Index = () => {
  const router = useRouter();
  const { isAuthenticated } = useSelector((state: AppState) => state.auth);
  useEffect(() => {
    if (isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, router]);
  const { token } = router.query;
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const isDisabled = Boolean(
    password.length < 6 || confirmPassword !== password
  );
  const handleChangePassword = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setPassword(event.target.value);
    },
    []
  );
  const handleChangeConfirmPassword = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setConfirmPassword(event.target.value);
    },
    []
  );
  const [showToast, setShowToast] = useState<boolean>(false);
  const [submitReset, { loading }] = useResetPasswordMutation();

  const handleSubmit = useCallback(
    (event: React.FormEvent) => {
      event.preventDefault();
      submitReset({
        variables: {
          password,
          token: token as string,
        },
      })
        .then(() => {
          setShowToast(true);
          setTimeout(() => {
            router.push('/sign-in');
          }, 2000);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    [submitReset, password, token, router]
  );
  const [passwordShown, setPasswordShown] = useState<boolean>(false);
  const [confirmPasswordShown, setConfirmPasswordShown] =
    useState<boolean>(false);
  const handleTogglePasswordShown = useCallback(() => {
    setPasswordShown((prevState) => !prevState);
  }, []);
  const handleToggleConfirmShown = useCallback(() => {
    setConfirmPasswordShown((prevState) => !prevState);
  }, []);
  return (
    <>
      <Header />
      <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <Image
              height={48}
              width={140}
              layout="responsive"
              className="mx-auto h-12 w-auto"
              src="https://hassans.s3.eu-central-1.amazonaws.com/youssef/assets/logo.png"
              alt="Remote digital"
            />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Reset your password
            </h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type={passwordShown ? 'text' : 'password'}
                  autoComplete="nope"
                  required
                  onChange={handleChangePassword}
                  value={password}
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                />
                {!passwordShown ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 cursor-pointer text-indigo-600"
                    fill="none"
                    onClick={handleTogglePasswordShown}
                    style={{
                      position: 'absolute',
                      right: 5,
                    }}
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    style={{
                      position: 'absolute',
                      right: 5,
                    }}
                    className="h-6 w-6 cursor-pointer text-indigo-600"
                    fill="none"
                    onClick={handleToggleConfirmShown}
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                    />
                  </svg>
                )}
              </div>
              <div>
                <label htmlFor="confirmPassword" className="sr-only">
                  Confirm password
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={confirmPasswordShown ? 'text' : 'password'}
                  autoComplete="nope"
                  required
                  onChange={handleChangeConfirmPassword}
                  value={confirmPassword}
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                />
                {!confirmPasswordShown ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 cursor-pointer text-indigo-600"
                    fill="none"
                    onClick={handleTogglePasswordShown}
                    style={{
                      position: 'absolute',
                      right: 5,
                    }}
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    style={{
                      position: 'absolute',
                      right: 5,
                    }}
                    className="h-6 w-6 cursor-pointer text-indigo-600"
                    fill="none"
                    onClick={handleTogglePasswordShown}
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                    />
                  </svg>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Link href="/sign-in">
                  <a className="font-medium text-indigo-600 hover:text-indigo-500">
                    Sign in instead.
                  </a>
                </Link>
              </div>

              <div className="text-sm">
                <Link href="/about-us">
                  <a className="font-medium text-indigo-600 hover:text-indigo-500">
                    Learn more about us here.
                  </a>
                </Link>
              </div>
            </div>

            <div>
              <Wrapper loading={loading} full={false}>
                <button
                  type="submit"
                  disabled={isDisabled}
                  className={classnames(
                    'group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md focus:outline-none text-white focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500',
                    isDisabled
                      ? 'bg-gray-600 hover:bg-gray-700 cursor-not-allowed'
                      : 'bg-indigo-600 hover:bg-indigo-700 cursor-pointer'
                  )}
                >
                  <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                    <LockClosedIcon
                      className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                      aria-hidden="true"
                    />
                  </span>
                  Reset password
                </button>
              </Wrapper>
            </div>
          </form>
        </div>
        <Notification
          setOpen={setShowToast}
          open={showToast}
          title={'Email sent!'}
          message={`Your password has been reset successfully.You will be redirected to the sign in page automatically.`}
        />
      </div>
      <Footer />
    </>
  );
};

export default Index;
