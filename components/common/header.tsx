import React, { Fragment, useCallback, useState } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { BellIcon, MenuIcon, XIcon } from '@heroicons/react/outline'
import Image from 'next/image'
import { useDispatch, useSelector } from 'react-redux'

import Link from 'next/link'
import { logout } from '../../actions'
import { useRouter } from 'next/router'
import Cookies from 'universal-cookie'
import { AdminRole, useMeQuery, UserRole } from '../../src/generated/graphql'
import { AppState } from '../../reducers'
import moment from 'moment'

//@ts-ignore
function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const Index = () => {
  const { lastLogin } = useSelector((state: AppState) => state.auth)

  let formattedFutureTime = moment(lastLogin).add(1, 'hour')

  let nextLogoutTime = moment
    .duration(formattedFutureTime.diff(moment()))
    .asMinutes()
    .toFixed(0)

  const [navigation, setNavigation] = useState([
    { name: 'Dashboard', href: '/', current: true },
    { name: 'All Users', href: 'all-users', current: false },
    { name: 'All Companies', href: 'all-companies', current: false },
    { name: 'All Orders', href: 'all-orders?page=1', current: false },
    { name: 'All Admins', href: 'all-admins', current: false },
    { name: 'Create Admin', href: 'create-admin', current: false },
    { name: 'Print Jobs', href: 'print-jobs', current: false },
    { name: 'Notifications', href: 'notifications', current: false },
  ])
  const [technicianNav, setTechnicianNav] = useState([
    { name: 'Dashboard', href: '/', current: true },
    { name: 'All Companies', href: 'all-companies', current: false },
    { name: 'All Orders', href: 'all-orders?page=1', current: false },
    { name: 'Print Jobs', href: 'print-jobs', current: false },
  ])

  const router = useRouter()
  const dispatch = useDispatch()

  const handleLogout = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault()
      const cookies = new Cookies()
      cookies.remove('token')
      cookies.remove('isAuthenticated')
      cookies.set('isAuthenticated', false, { path: '/' })
      dispatch(logout())
      router.push('/sign-in')
    },
    [dispatch, router]
  )

  // const handleClick = useCallback((item) => {
  //   setNavigation((prevState) => ({
  //     ...prevState,
  //     [item]: {
  //       ...prevState[item],
  //       current: true,
  //     },
  //   }));
  // }, []);
  const data = useMeQuery()
  const role = data?.data?.me?.admin?.role

  return (
    <Disclosure as="nav" className="bg-gray-800 print:hidden">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-between h-16">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex-shrink-0 flex items-center">
                  <Image
                    className="block lg:hidden h-8 w-auto cursor-pointer"
                    src="https://hassans.s3.eu-central-1.amazonaws.com/youssef/assets/logo.png"
                    alt="Workflow"
                    width={32}
                    height={32}
                    onClick={() => router.push('/')}
                  />
                </div>
                <div className="hidden sm:block sm:ml-6">
                  <div className="flex space-x-4 align-middle">
                    {role === AdminRole.Admin
                      ? navigation?.map((item) => (
                          <Link href={item.href} key={item.name!}>
                            <a
                              className={classNames(
                                item.current
                                  ? 'bg-gray-900 text-white'
                                  : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                'px-3 py-2 rounded-md text-sm font-medium'
                              )}
                            >
                              {item.name}
                            </a>
                          </Link>
                        ))
                      : technicianNav?.map((item) => (
                          <Link href={item.href} key={item.name!}>
                            <a
                              className={classNames(
                                item.current
                                  ? 'bg-gray-900 text-white'
                                  : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                'px-3 py-2 rounded-md text-sm font-medium'
                              )}
                            >
                              {item.name}
                            </a>
                          </Link>
                        ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <button
                  type="button"
                  className="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                >
                  <span className="text-white">Logout in {nextLogoutTime}</span>
                </button>

                {/* Profile dropdown */}
                <Menu as="div" className="ml-3 relative z-10">
                  <div className="flex justify-between items-center space-x-4">
                    <Menu.Button className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                      <span className="sr-only">Open user menu</span>
                      <Image
                        className="h-8 w-8 rounded-full"
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt=""
                        width={32}
                        height={32}
                      />
                    </Menu.Button>
                    <div
                      className="cursor-pointer"
                      onClick={() => router.push('/notifications')}
                    >
                      <BellIcon className="text-white h-6 w-6" />
                    </div>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active ? 'bg-gray-100' : '',
                              'block px-4 py-2 text-sm text-gray-700'
                            )}
                          >
                            Your Profile
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <Link href="/change-password">
                            <a
                              className={classNames(
                                active ? 'bg-gray-100' : '',
                                'block px-4 py-2 text-sm text-gray-700'
                              )}
                            >
                              Change password
                            </a>
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            onClick={handleLogout}
                            className={classNames(
                              active ? 'bg-gray-100' : '',
                              'block px-4 py-2 text-sm text-gray-700'
                            )}
                          >
                            Sign out
                          </a>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {role === AdminRole.Admin
                ? navigation.map((item) => (
                    <Disclosure.Button
                      key={item.name}
                      as="a"
                      href={item.href}
                      className={classNames(
                        item.current
                          ? 'bg-gray-900 text-white'
                          : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                        'block px-3 py-2 rounded-md text-base font-medium'
                      )}
                      aria-current={item.current ? 'page' : undefined}
                    >
                      {item.name}
                    </Disclosure.Button>
                  ))
                : technicianNav.map((item) => (
                    <Disclosure.Button
                      key={item.name}
                      as="a"
                      href={item.href}
                      className={classNames(
                        item.current
                          ? 'bg-gray-900 text-white'
                          : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                        'block px-3 py-2 rounded-md text-base font-medium'
                      )}
                      aria-current={item.current ? 'page' : undefined}
                    >
                      {item.name}
                    </Disclosure.Button>
                  ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}
export default Index
