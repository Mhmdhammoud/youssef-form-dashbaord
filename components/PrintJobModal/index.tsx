/* This example requires Tailwind CSS v2.0+ */
import { Dialog, Transition } from '@headlessui/react'
import moment from 'moment'
import React, {
  Fragment,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'
import {
  Ear,
  useCreatePrintJobMutation,
  useGetPrintableOrdersLazyQuery,
} from '../../src/generated/graphql'
import { handleError } from '../../utils'
import Select from '../common/Select'
import { useUpload } from '../../hooks'
import Uploader from '../common/uploader'
import STLViewer from 'stl-viewer'

interface IProps {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  companyId: string
  refetchJobs: (page: number) => void
  setNotificationData: React.Dispatch<
    React.SetStateAction<{
      message: string
      title: string
    }>
  >
  page: number
  setNotificationOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const Index: React.FC<IProps> = ({
  open,
  setOpen,
  companyId,
  setNotificationOpen,
  setNotificationData,
  refetchJobs,
  page,
}) => {
  const cancelButtonRef = useRef(null)
  const [allColors, setAllColors] = useState({})
  const [getPrintableOrders, {}] = useGetPrintableOrdersLazyQuery()
  const [selectedColor, setSelectedColor] = useState<string>('')
  const [stlFile, setStlFile] = useState<string>('')

  const [selectedOrders, setSelectedOrders] = useState<any[]>([])

  const [createPrintJob, { loading }] = useCreatePrintJobMutation()

  const { handleUpload } = useUpload()

  useEffect(() => {
    if (companyId) {
      getPrintableOrders({
        variables: {
          company_id: companyId,
        },
      })
        .then((res) => {
          const orders = res?.data?.getPrintableOrders?.orders
          let colors = {}
          if (orders) {
            orders.map((item) => {
              const { product, _id, orderId, createdAt } = item
              const { left, right } = product
              if (item.material === 'fototec') {
                if (!colors[left.color]) {
                  colors = {
                    ...colors,
                    [left.color]: [{ ...left, _id, orderId, createdAt }],
                  }
                } else {
                  colors[left.color] = [
                    ...colors[left.color],
                    { ...left, _id, orderId, createdAt },
                  ]
                }
                if (!colors[right.color]) {
                  colors = {
                    ...colors,
                    [right.color]: [{ ...right, _id, orderId, createdAt }],
                  }
                } else {
                  colors[right.color] = [
                    ...colors[right.color],
                    { ...right, _id, orderId, createdAt },
                  ]
                }
              } else {
                const { left: castLeft, right: castRight } = product
                if (colors['cast']) {
                  colors = {
                    ...colors,
                    cast: [
                      ...colors['cast'],
                      { ...castLeft, _id, orderId, createdAt },
                    ],
                  }
                  colors = {
                    ...colors,
                    cast: [
                      ...colors['cast'],
                      { ...castRight, _id, orderId, createdAt },
                    ],
                  }
                } else {
                  colors = {
                    ...colors,
                    cast: [
                      { ...castLeft, _id, orderId, createdAt },
                      { ...castRight, _id, orderId, createdAt },
                    ],
                  }
                }
              }
            })
          }
          setAllColors(colors)
        })
        .catch(handleError)
    }
  }, [companyId, getPrintableOrders])

  const handleColorsChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      const { value } = event.target
      setSelectedColor(value)
    },
    []
  )

  const handleChangeSelectedOrder = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>, item) => {
      setSelectedOrders((prevState) =>
        !event.target.checked
          ? prevState.filter((order) => order.shellId !== item.shellId)
          : [
              ...prevState,
              {
                ...item,
                ear:
                  item?.shellId.charAt(item?.shellId?.length - 1) === 'L'
                    ? Ear.Left
                    : Ear.Right,
              },
            ]
      )
    },
    []
  )

  const handleSubmit = useCallback(() => {
    createPrintJob({
      variables: {
        input: {
          company_id: companyId,
          print_file: stlFile,
          orders: selectedOrders?.map((item) => ({
            _id: item?._id,
            ear: item?.ear,
          })),
        },
      },
    })
      .then((res) => {
        refetchJobs(page)
        setNotificationData({
          title: 'Success',
          message: 'Print job created successfully',
        })
        setNotificationOpen(true)
        setOpen(false)

        if (
          res?.data?.createJob?.errors &&
          res?.data?.createJob?.errors?.length > 0
        ) {
          setNotificationData({
            title: 'Error',
            message: 'Error creating print job',
          })
          setNotificationOpen(true)
        }
      })
      .catch((err) => {
        setNotificationData({
          title: 'Error',
          message: 'Error creating print job',
        })
        setNotificationOpen(true)
        handleError(err)
      })
  }, [
    createPrintJob,
    companyId,
    selectedOrders,
    refetchJobs,
    page,
    setNotificationData,
    setNotificationOpen,
    setOpen,
    stlFile,
  ])

  const selectAllOrders = useCallback(() => {
    setSelectedOrders(
      allColors[selectedColor].map((item) => ({
        ...item,
        ear:
          item?.shellId.charAt(item?.shellId?.length - 1) === 'L'
            ? Ear.Left
            : Ear.Right,
      }))
    )
  }, [allColors, selectedColor])

  const clearAllOrders = useCallback(() => {
    setSelectedOrders([])
  }, [])

  const disabledSubmit = Boolean(selectedOrders?.length === 0)

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
            <div className="relative inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-5xl sm:w-full sm:p-6">
              <div className="grid grid-cols-6">
                <div className="col-span-4">
                  <div>
                    <Select
                      id="order-select"
                      options={Object.keys(allColors)}
                      onChange={handleColorsChange}
                      value={selectedColor}
                    />
                  </div>
                  <div className="max-h-[60vh] overflow-y-auto p-3 mt-3">
                    <fieldset className="border-t border-b border-gray-200">
                      <legend className="sr-only">Orders</legend>
                      <div className="divide-y divide-gray-200">
                        {allColors[selectedColor]?.map((item, index) => {
                          return (
                            <div
                              className="relative flex py-4 items-center"
                              key={index}
                            >
                              <div className="min-w-0 flex-1 text-sm">
                                <label
                                  htmlFor={`order-${index}`}
                                  className="font-medium text-gray-700 cursor-pointer"
                                >
                                  Order #{item?.orderId}
                                </label>
                                <p
                                  id="comments-description"
                                  className="text-gray-500"
                                >
                                  Shell ID: {item?.shellId}
                                  <br />
                                  Style: {item?.style}
                                  <br />
                                  Surface: {item?.surface}
                                  <br />
                                  Quantity: {item?.quantity}
                                  <br />
                                  Created At:{' '}
                                  {moment(item?.createdAt).format(
                                    'DD/MM/YYYY HH:mm A'
                                  )}
                                  <br />
                                </p>
                              </div>
                              <div className="ml-3 flex items-center h-5">
                                <input
                                  id={`order-${index}`}
                                  aria-describedby="comments-description"
                                  name={`order-${index}`}
                                  type="checkbox"
                                  className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded cursor-pointer"
                                  onChange={(event) =>
                                    handleChangeSelectedOrder(event, item)
                                  }
                                  checked={selectedOrders?.find(
                                    (el) => el.shellId === item?.shellId
                                  )}
                                />
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </fieldset>
                  </div>
                </div>

                <div className="col-span-2 text-center space-y-3 flex flex-col justify-between ml-4">
                  <div className="flex flex-col space-y-3 ">
                    {stlFile === '' ? (
                      <Uploader
                        variant="svg"
                        id="uploader"
                        accept="all"
                        onChange={(e) =>
                          //@ts-ignore
                          handleUpload(e).then((file) => {
                            setStlFile(file!)
                          })
                        }
                        text="Upload STL"
                      />
                    ) : (
                      <STLViewer
                        url={stlFile}
                        modelColor="rgb(115, 194, 251)"
                        backgroundColor={'#fff'}
                        rotate={true}
                        orbitControls={true}
                        model={stlFile}
                      />
                    )}
                  </div>
                  <div className="flex flex-col space-y-3">
                    <div>
                      {' '}
                      <button
                        type="button"
                        className=" items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 w-[100px] text-center"
                        onClick={selectAllOrders}
                      >
                        Select all
                      </button>
                    </div>
                    <div>
                      {' '}
                      <button
                        type="button"
                        className=" items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 w-[100px] text-center"
                        onClick={clearAllOrders}
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
                        className={
                          disabledSubmit
                            ? ' items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 cursor-not-allowed w-[100px] text-center'
                            : ' items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 w-[100px] text-center'
                        }
                        onClick={handleSubmit}
                        disabled={disabledSubmit}
                      >
                        Submit
                      </button>
                    </div>
                    <div>
                      {' '}
                      <button
                        type="button"
                        className=" items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 w-[100px] text-center"
                        onClick={() => setOpen(false)}
                      >
                        Exit
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
