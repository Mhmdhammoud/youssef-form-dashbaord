import { BriefcaseIcon, PrinterIcon } from '@heroicons/react/outline'
import moment from 'moment'
import Link from 'next/link'
import React, { useContext, useEffect } from 'react'
import { Wrapper, Footer, Header } from '../../components'
import { NotificationsContext } from '../../context'
import { withRouter } from '../../hoc'
import notificationsService from '../../services/store.service'
const Index = () => {
  const { notifications, loading } = useContext(NotificationsContext)
  useEffect(() => {
    notificationsService.clearNotifications(notifications)
    return () => {
      notificationsService.clearNotifications(notifications)
    }
  }, [notifications])

  return (
    <React.Fragment>
      <Header />
      <Wrapper
        classes="mt-8 sm:mx-auto sm:w-full sm:max-w-4xl pb-20 lg:max-w-6xl"
        loading={loading}
      >
        <div className="h-[500px] overflow-auto">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-1">
              <h2 className="text-2xl text-center mb-6">Print Jobs</h2>
              <ul role="list" className="divide-y divide-gray-200 px-4">
                {notifications?.map((item, index) => {
                  return (
                    <React.Fragment key={index}>
                      {item?.type === 'PRINT_JOB' && (
                        <li className="py-4">
                          <div className="flex space-x-3">
                            <PrinterIcon className="w-6 h-6 text-gray-700" />
                            <div className="flex-1 space-y-1">
                              <div className="flex items-center justify-between">
                                <h3 className="text-sm font-medium">
                                  {item.message} by{' '}
                                  <Link href={`company?id=${item?.company_id}`}>
                                    <a className="text-indigo-500">
                                      {item?.company_title}
                                    </a>
                                  </Link>
                                </h3>
                                <p className="text-sm text-gray-500">
                                  {/* @ts-ignore */}
                                  {moment(item?.createdAt?.toDate()).format(
                                    'DD/MM/YYYY hh:mm a'
                                  )}
                                </p>
                              </div>
                              <div>
                                <p>
                                  <Link
                                    href={`print-job?print_id=${item?.print_id}`}
                                  >
                                    <a className="text-indigo-500 font-medium">
                                      View print job
                                    </a>
                                  </Link>
                                </p>
                              </div>
                            </div>
                          </div>
                        </li>
                      )}
                    </React.Fragment>
                  )
                })}
              </ul>
            </div>
            <div className="col-span-1">
              <ul role="list" className="divide-y divide-gray-200 px-4">
                <h2 className="text-2xl text-center mb-6">Orders</h2>
                {notifications?.map((item, index) => {
                  return (
                    <React.Fragment key={index}>
                      {item?.type === 'ORDER' && (
                        <li className="py-4">
                          <div className="flex space-x-3">
                            <BriefcaseIcon className="w-6 h-6 text-gray-700" />
                            <div className="flex-1 space-y-1">
                              <div className="flex items-center justify-between">
                                <h3 className="text-sm font-medium">
                                  {item.message} by{' '}
                                  <Link href={`company?id=${item?.company_id}`}>
                                    <a className="text-indigo-500">
                                      {item?.company_title}
                                    </a>
                                  </Link>
                                </h3>
                                <p className="text-sm text-gray-500">
                                  {/* @ts-ignore */}
                                  {moment(item?.createdAt?.toDate()).format(
                                    'DD/MM/YYYY hh:mm a'
                                  )}
                                </p>
                              </div>
                              <div>
                                <p>
                                  <Link
                                    href={`order?id=${
                                      item?.order_id?.split('_')[1]
                                    }`}
                                  >
                                    <a className="text-indigo-500 font-medium">
                                      View order
                                    </a>
                                  </Link>
                                </p>
                              </div>
                            </div>
                          </div>
                        </li>
                      )}
                    </React.Fragment>
                  )
                })}
              </ul>
            </div>
          </div>
        </div>
      </Wrapper>
      <Footer />
    </React.Fragment>
  )
}

export default withRouter(Index)
