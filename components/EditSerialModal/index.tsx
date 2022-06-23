/* This example requires Tailwind CSS v2.0+ */
import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { Order, OrderDirection } from '../../src/generated/graphql'
interface IProps {
  order: Order
  handleChange: (
    event: React.ChangeEvent<HTMLInputElement>,
    direction: 'left' | 'right'
  ) => void
  handleSubmit: () => void
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const Index: React.FC<IProps> = ({
  order,
  open,
  setOpen,
  handleChange,
  handleSubmit,
}) => {
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
                      <div className="grid grid-cols-2 gap-x-7">
                        {(order?.direction === OrderDirection.Binaural ||
                          order?.direction === OrderDirection.Left) && (
                          <div className="col-span-1">
                            <label
                              htmlFor="serialNumber"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Left Serial Number
                            </label>
                            <div className="mt-1">
                              <input
                                type="text"
                                name="serialNumber"
                                id="serialNumber"
                                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                onChange={(event) =>
                                  handleChange(event, 'left')
                                }
                                value={order?.product?.left?.serialNumber}
                              />
                            </div>
                          </div>
                        )}

                        {(order?.direction === OrderDirection?.Binaural ||
                          order?.direction === OrderDirection.Right) && (
                          <div className="col-span-1">
                            <label
                              htmlFor="serialNumber"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Right Serial Number
                            </label>
                            <div className="mt-1">
                              <input
                                type="text"
                                name="serialNumber"
                                id="serialNumber"
                                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                onChange={(event) =>
                                  handleChange(event, 'right')
                                }
                                value={order?.product?.right?.serialNumber}
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-6 flex justify-center w-full space-x-10">
                <button
                  type="button"
                  className="rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
                  onClick={() => setOpen(false)}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
                  onClick={handleSubmit}
                >
                  Submit
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
export default Index
