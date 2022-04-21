/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useCallback, useEffect, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { CheckIcon } from '@heroicons/react/outline'
import {
  Order,
  useGetPrintableOrdersLazyQuery,
} from '../../src/generated/graphql'
import Select from '../common/Select'

interface IProps {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  companyId: string
}

const Index: React.FC<IProps> = ({ open, setOpen, companyId }) => {
  const cancelButtonRef = useRef(null)
  const [printableOrders, setPrintableOrders] = useState<Order[]>([])
  const [allColors, setAllColors] = useState({})
  const [getPrintableOrders, {}] = useGetPrintableOrdersLazyQuery()

  useEffect(() => {
    if (companyId) {
      getPrintableOrders({
        variables: {
          company_id: companyId,
        },
      })
        .then((res) => {
          const orders = res?.data?.getPrintableOrders?.orders
          setPrintableOrders(orders as Order[])
          let colors = {}
          if (orders) {
            orders.map((item) => {
              const { product } = item
              const { left, right } = product
              console.log(item)
              if (item.material === 'fototec') {
                if (!colors[left.color]) {
                  colors = {
                    ...colors,
                    [left.color]: [left],
                  }
                } else {
                  colors[left.color] = [...colors[left.color], left]
                }
                if (!colors[right.color]) {
                  colors = {
                    ...colors,
                    [right.color]: [right],
                  }
                } else {
                  colors[right.color] = [...colors[right.color], right]
                }
              } else {
                const { left: castLeft, right: castRight } = product
                if (colors['cast']) {
                  colors = {
                    ...colors,
                    cast: [...colors['cast'], castLeft],
                  }
                  colors = {
                    ...colors,
                    cast: [...colors['cast'], castRight],
                  }
                } else {
                  colors = {
                    ...colors,
                    cast: [castLeft, castRight],
                  }
                }
              }
            })
          }
          setAllColors(colors)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }, [companyId, getPrintableOrders])

  const handleColorsChange = useCallback(() => {
    console.log('sdsdd')
  }, [])

  console.log(printableOrders)
  console.log('all colors', allColors)
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        initialFocus={cancelButtonRef}
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
            <div className="relative inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-3xl sm:w-full sm:p-6">
              <div className="grid grid-cols-4">
                <div className="col-span-3 ">
                  <Select
                    id="order-select"
                    options={Object.keys(allColors)}
                    onChange={handleColorsChange}
                  />
                </div>
                <div className="col-span-1  text-center space-y-3">
                  <div className="flex flex-col space-y-3">
                    <div>
                      {' '}
                      <button
                        type="button"
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Select all
                      </button>
                    </div>
                    <div>
                      {' '}
                      <button
                        type="button"
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Clear all
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-col space-y-3">
                    <div>
                      {' '}
                      <button
                        type="button"
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Button text
                      </button>
                    </div>
                    <div>
                      {' '}
                      <button
                        type="button"
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Button text
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
export default Index
