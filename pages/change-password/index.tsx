import { LockClosedIcon } from '@heroicons/react/outline'
import React, { useCallback, useState } from 'react'
import {
  ErrorToast,
  Footer,
  Header,
  Notification,
  Wrapper,
} from '../../components'
import {
  useChangePasswordMutation,
  useMeQuery,
} from '../../src/generated/graphql'

const Index = () => {
  const [oldPassword, setOldPassword] = useState<string>('')
  const [newPassword, setNewPassword] = useState<string>('')
  const [showError, setShowError] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [notificationOpen, setNotificationOpen] = useState(false)
  const [confirmPassword, setConfirmPassword] = useState<string>('')
  const handleChangeConfirmPassword = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setConfirmPassword(event.target.value)
    },
    []
  )

  const [passwordShown, setPasswordShown] = useState<boolean>(false)
  const [newPasswordShown, setNewPasswordShown] = useState<boolean>(false)
  const [confirmPasswordShown, setConfirmPasswordShown] =
    useState<boolean>(false)
  const handleTogglePasswordShown = useCallback(() => {
    setPasswordShown((prevState) => !prevState)
  }, [])
  const handleToggleConfirmShown = useCallback(() => {
    setConfirmPasswordShown((prevState) => !prevState)
  }, [])
  const handleToggleNewPasswordShown = useCallback(() => {
    setNewPasswordShown((prevState) => !prevState)
  }, [])
  const isDisabled = Boolean(
    oldPassword === '' ||
      newPassword === '' ||
      confirmPassword === '' ||
      newPassword !== confirmPassword
  )

  const [submit, { loading }] = useChangePasswordMutation()

  const { data } = useMeQuery()
  const userId = data?.me?.admin?._id
  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault()
      submit({
        variables: {
          user_id: userId as string,
          new_password: newPassword,
          old_password: oldPassword,
        },
        notifyOnNetworkStatusChange: true,
      })
        .then((res) => {
          if (res.data?.changePassword.errors.length === 0) {
            setNotificationOpen(true)
          } else {
            setErrorMessage(
              res.data?.changePassword.errors[0].message as string
            )
            setShowError(true)
          }
          setOldPassword('')
          setNewPassword('')
          setConfirmPassword('')
        })
        .catch((err) => {})
    },
    [newPassword, oldPassword, submit, userId]
  )

  return (
    <React.Fragment>
      <Header />
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
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Old Password
                </label>
                <div className={'flex items-center relative'}>
                  <input
                    type={passwordShown ? 'text' : 'password'}
                    name="password"
                    id="password"
                    minLength={6}
                    autoComplete="nope"
                    required
                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                  />
                  {!passwordShown ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 cursor-pointer text-indigo-600 absolute right-5"
                      fill="none"
                      onClick={handleTogglePasswordShown}
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
                      className="h-6 w-6 cursor-pointer text-indigo-600 absolute right-5"
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
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  New Password
                </label>
                <div className={'flex items-center relative'}>
                  <input
                    type={newPasswordShown ? 'text' : 'password'}
                    name="password"
                    id="password"
                    minLength={6}
                    autoComplete="nope"
                    required
                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                  {!newPasswordShown ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 cursor-pointer text-indigo-600 absolute right-5"
                      fill="none"
                      onClick={handleToggleNewPasswordShown}
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
                      className="h-6 w-6 cursor-pointer text-indigo-600 absolute right-5"
                      fill="none"
                      onClick={handleToggleNewPasswordShown}
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
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="repeatPassword"
                  className="block text-sm font-medium text-gray-700"
                >
                  Repeat Password
                </label>
                <div className={'flex items-center relative'}>
                  <input
                    type={confirmPasswordShown ? 'text' : 'password'}
                    name="repeatPassword"
                    id="repeatPassword"
                    minLength={6}
                    required
                    autoComplete="nope"
                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    value={confirmPassword}
                    onChange={handleChangeConfirmPassword}
                  />
                  {!confirmPasswordShown ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 cursor-pointer text-indigo-600 absolute right-5"
                      fill="none"
                      onClick={handleToggleConfirmShown}
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
                      className="h-6 w-6 cursor-pointer text-indigo-600 absolute right-5"
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
              </div>
            </div>

            <div>
              <button
                type="submit"
                className={`group relative w-full flex justify-center py-2 px-4 border
                border-transparent text-sm font-medium rounded-md text-white
                ${
                  isDisabled ? 'bg-slate-600' : 'bg-indigo-600'
                } hover:bg-indigo-700 focus:outline-none focus:ring-2
                focus:ring-offset-2 focus:ring-indigo-500`}
                disabled={isDisabled}
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <LockClosedIcon
                    className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                    aria-hidden="true"
                  />
                </span>
                {loading ? (
                  <Wrapper
                    loadingClasses="h-4 w-4 my-2"
                    color="white"
                    loading
                    full={false}
                  />
                ) : (
                  'Change password'
                )}
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
      <Notification
        open={notificationOpen}
        setOpen={setNotificationOpen}
        title={'Success'}
        message={'Password changed successfully'}
      />
      <Footer />
    </React.Fragment>
  )
}

export default Index
