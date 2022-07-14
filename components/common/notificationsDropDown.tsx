import { Menu, Transition } from '@headlessui/react'
import { BellIcon, BriefcaseIcon, ClockIcon } from '@heroicons/react/outline'
import moment from 'moment'
import Link from 'next/link'
import React, { Fragment, useCallback, useContext } from 'react'
import { NotificationsContext } from '../../context'
import { NotificationsService } from '../../services'
import Wrapper from './wrapper'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Example() {
  const { notifications, loading, length } = useContext(NotificationsContext)

  const handleClearNotifications = useCallback(() => {
    NotificationsService.clearNotifications(notifications)
  }, [notifications])

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div onClick={handleClearNotifications}>
        <Menu.Button className="inline-flex justify-center rounded-md shadow-sm px-4 py-2 text-sm font-medium text-gray-700 ">
          <Wrapper loading={loading} classes="relative">
            <BellIcon className="text-white h-8 w-8" />
            <div className="bg-red-500 rounded-full absolute top-0 right-0 w-4 text-center">
              <p className="text-white font-bold text-sm">{length}</p>
            </div>
          </Wrapper>
        </Menu.Button>
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
        <Menu.Items className="pb-2 overflow-y-scroll max-h-[300px] origin-top-right absolute right-0 mt-2 w-64 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {notifications.map((item, index) => {
              return (
                <Menu.Item key={item.id}>
                  {({ active }) => {
                    const message = item.message.split(' ')
                    return (
                      <React.Fragment key={index}>
                        {item?.type === 'ORDER' ? (
                          <div className="flex space-x-3 p-2 items-center border border-b-1 border-y-black border-opacity-40">
                            <BriefcaseIcon className="w-6 h-6 text-gray-700" />
                            <div className="flex-1 space-y-1">
                              <p className="text-sm font-medium flex items-center ">
                                {message[0]} {message[1]}
                                <Link
                                  href={`order?id=${
                                    item?.order_id?.split('_')[1]
                                  }`}
                                >
                                  <a className="ml-2 text-indigo-500 font-medium text-sm underline">
                                    View
                                  </a>
                                </Link>
                              </p>
                              <Link href={`company?id=${item?.company_id}`}>
                                <a className="text-indigo-500 text-sm">
                                  {item?.company_title}
                                </a>
                              </Link>
                              <div className="flex items-center space-x-1">
                                <ClockIcon className="w-4 h-4 text-gray-700" />
                                <p className="text-sm text-gray-500">
                                  {/* @ts-ignore */}
                                  {moment(item?.createdAt?.toDate()).format(
                                    'DD/MM/YYYY hh:mm a'
                                  )}
                                </p>
                              </div>
                              <div></div>
                            </div>
                          </div>
                        ) : (
                          <div className="flex space-x-3 p-2 items-center border border-b-1 border-y-black border-opacity-40">
                            <BriefcaseIcon className="w-6 h-6 text-gray-700" />
                            <div className="flex-1 space-y-1">
                              <p className="text-sm font-medium flex items-center ">
                                {message[0]} {message[1]}
                                <Link
                                  href={`print-job?print_id=${item?.print_id}`}
                                >
                                  <a className="ml-2 text-indigo-500 font-medium text-sm underline">
                                    View
                                  </a>
                                </Link>
                              </p>
                              <Link href={`company?id=${item?.company_id}`}>
                                <a className="text-indigo-500 text-sm">
                                  {item?.company_title}
                                </a>
                              </Link>
                              <div className="flex items-center space-x-1">
                                <ClockIcon className="w-4 h-4 text-gray-700" />
                                <p className="text-sm text-gray-500">
                                  {/* @ts-ignore */}
                                  {moment(item?.createdAt?.toDate()).format(
                                    'DD/MM/YYYY hh:mm a'
                                  )}
                                </p>
                              </div>
                              <div></div>
                            </div>
                          </div>
                        )}
                      </React.Fragment>
                    )
                  }}
                </Menu.Item>
              )
            })}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}
