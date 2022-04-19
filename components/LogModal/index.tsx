/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { LoginInput, Logs } from '../../src/generated/graphql'
import moment from 'moment'
import { CheckIcon, ThumbUpIcon, UserIcon, XIcon } from '@heroicons/react/solid'
import classNames from 'classnames'
interface IProps {
  logs: Array<Logs>
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const Index: React.FC<IProps> = ({ logs, open, setOpen }) => {
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        onClose={setOpen}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-screen-md sm:w-full sm:p-6">
              <div>
                <div className="mt-3 text-center sm:mt-5">
                  {/* <Dialog.Title
                    as="h3"
                    className="text-lg leading-6 font-medium text-gray-900"
                  >
                    Order Logs
                  </Dialog.Title> */}
                  <div className="mt-2 px-4 sm:max-h-[550px] overflow-y-auto">
                    <div className="flow-root">
                      <ul role="list" className="-mb-8">
                        {logs?.map((log, logIdx) => (
                          <li key={logIdx}>
                            <div className="relative pb-8">
                              {logIdx !== logs.length - 1 ? (
                                <span
                                  className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                                  aria-hidden="true"
                                />
                              ) : null}
                              <div className="relative flex space-x-3">
                                <div>
                                  <span
                                    className={classNames(
                                      log.message.includes('Order was reject')
                                        ? 'bg-red-600'
                                        : log.message.includes(
                                            'Order was updated'
                                          )
                                        ? 'bg-green-600'
                                        : 'bg-indigo-500',

                                      'h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white'
                                    )}
                                  >
                                    {log.message.includes(
                                      'Order was reject'
                                    ) ? (
                                      <XIcon
                                        className="h-5 w-5 text-white"
                                        aria-hidden="true"
                                      />
                                    ) : log.message.includes(
                                        'Order was updated'
                                      ) ? (
                                      <ThumbUpIcon
                                        className="h-5 w-5 text-white"
                                        aria-hidden="true"
                                      />
                                    ) : (
                                      <CheckIcon
                                        className="h-5 w-5 text-white"
                                        aria-hidden="true"
                                      />
                                    )}
                                  </span>
                                </div>
                                <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                                  <div>
                                    <p className="text-sm text-gray-500">
                                      {log?.message}{' '}
                                    </p>
                                  </div>
                                  <div className="text-right text-sm whitespace-nowrap text-gray-500">
                                    <time dateTime={log.createdAt}>
                                      {moment(log.createdAt).format(
                                        'DD/MM/YYYY hh:mm A'
                                      )}
                                    </time>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* {logs &&
                      logs?.map((item, index) => {
                        return (
                          <div
                            key={index}
                            className="flex justify-between py-2  border-b-2 border-opacity-20 border-gray-500"
                          >
                            <p>{item?.message}</p>
                            <p className="text-sm text-gray-500">
                              {moment(item?.createdAt).format('DD/MM/YYYY')}
                            </p>
                          </div>
                        )
                      })} */}
                  </div>
                </div>
              </div>
              {/* <div className="mt-5 sm:mt-6 flex justify-center  w-full">
                <button
                  type="button"
                  className="rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
                  onClick={() => setOpen(false)}
                >
                  Close
                </button>
              </div> */}
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
export default Index
