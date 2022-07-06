import { useRouter } from 'next/router'
import React, { Fragment, useCallback, useState } from 'react'
import { Footer, Header, Notification, Wrapper } from '../../components'
import {
  AdminRole,
  CreateAdminInput,
  useCreateAdminMutation,
} from '../../src/generated/graphql'
import { withRouter } from '../../hoc'
import { ToUpperFirst } from '../../utils'

const Index = () => {
  const [notificationOpen, setNotificationOpen] = useState<boolean>(false)
  const [confirmPassword, setConfirmPassword] = useState<string>('')
  const [adminData, setAdminData] = useState<CreateAdminInput>({
    fname: '',
    lname: '',
    email: '',
    password: '',
    role: AdminRole.Technician,
  })

  const isDisabled = Boolean(
    adminData.fname === '' ||
      adminData.lname === '' ||
      adminData.email === '' ||
      adminData.password === '' ||
      adminData.password !== confirmPassword ||
      adminData.role === ('' as AdminRole)
  )

  const router = useRouter()
  const [submit, { loading, data }] = useCreateAdminMutation({
    variables: {
      input: adminData,
    },
  })

  const handleSubmit = useCallback(
    (event: React.FormEvent) => {
      event.preventDefault()
      submit()
        .then((res) => {
          // console.log(res);
          setNotificationOpen(true)
          router.push('/all-admins')
        })
        .catch((err) => {
          if (err?.response) console.log(err?.response?.data)
          else console.log(err)
        })
    },
    [router, submit]
  )
  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setAdminData((prevState) => ({
        ...prevState,
        [event.target.id]: event.target.value,
      }))
    },
    []
  )

  const handleChangeConfirmPassword = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setConfirmPassword(event.target.value)
    },
    []
  )
  const handleChangeRole = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      setAdminData((prevState) => ({
        ...prevState,
        role: event.target.value as AdminRole,
      }))
    },
    []
  )
  const [passwordShown, setPasswordShown] = useState<boolean>(false)
  const [confirmPasswordShown, setConfirmPasswordShown] =
    useState<boolean>(false)
  const handleTogglePasswordShown = useCallback(() => {
    setPasswordShown((prevState) => !prevState)
  }, [])
  const handleToggleConfirmShown = useCallback(() => {
    setConfirmPasswordShown((prevState) => !prevState)
  }, [])

  return (
    <Fragment>
      <Header />
      <Wrapper
        loading={loading}
        classes="mt-8 sm:mx-auto sm:w-full sm:max-w-4xl pb-20 lg:max-w-7xl"
      >
        <div className="mt-10 sm:mt-0">
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
              <div className="px-4 sm:px-0">
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  Personal Information
                </h3>
                <p className="mt-1 text-sm text-gray-600">
                  Use a valid email address so you can receive e-mail.
                </p>
              </div>
            </div>
            <div className="mt-5 md:mt-0 md:col-span-2">
              <form onSubmit={handleSubmit}>
                <div className="shadow overflow-hidden sm:rounded-md">
                  <div className="px-4 py-5 bg-white sm:p-6">
                    <div className="col-span-6 sm:col-span-4">
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Email address
                      </label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        autoComplete="nope"
                        required
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        value={adminData.email}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="grid grid-cols-6 gap-6">
                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="fname"
                          className="block text-sm font-medium text-gray-700"
                        >
                          First name
                        </label>
                        <input
                          type="text"
                          name="fname"
                          id="fname"
                          autoComplete="nope"
                          required
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          value={adminData.fname}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="lname"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Last name
                        </label>
                        <input
                          type="text"
                          name="lname"
                          id="lname"
                          autoComplete="nope"
                          required
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          value={adminData.lname}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="password"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Password
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
                            value={adminData.password}
                            onChange={handleChange}
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

                      <div className="col-span-12 sm:col-span-6">
                        <label
                          htmlFor="role"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Role
                        </label>
                        <select
                          id="role"
                          name="role"
                          autoComplete="nope"
                          required
                          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          // value={user?.role}
                          onChange={handleChangeRole}
                        >
                          <option selected hidden>
                            Select an option
                          </option>
                          <option value={AdminRole?.Admin}>
                            {ToUpperFirst(AdminRole?.Admin)}
                          </option>
                          <option value={AdminRole?.Technician}>
                            {ToUpperFirst(AdminRole?.Technician)}
                          </option>
                          <option value={AdminRole?.Modeler}>
                            {ToUpperFirst(AdminRole?.Modeler)}
                          </option>
                          <option value={AdminRole?.Registrar}>
                            {ToUpperFirst(AdminRole?.Registrar)}
                          </option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                    <button
                      type="submit"
                      className={
                        isDisabled
                          ? 'inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 cursor-not-allowed'
                          : 'inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                      }
                      disabled={isDisabled}
                    >
                      Save
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <Notification
          open={notificationOpen}
          setOpen={setNotificationOpen}
          title={'Success'}
          message={'User Created Successfully'}
        />
      </Wrapper>
      <Footer />
    </Fragment>
  )
}

export default withRouter(Index)
