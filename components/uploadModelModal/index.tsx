import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useCallback, useRef } from 'react'
import STLViewer from 'meritt-stl-viewer'
import { useUpload } from '../../hooks'
import { CreateOrderInput, OrderDirection } from '../../src/generated/graphql'
import Uploader from '../common/uploader'
import OrderLayout from '../Layout/OrderLayout'
interface IProps {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  BTEOrder: CreateOrderInput
  setBTEOrder: React.Dispatch<React.SetStateAction<CreateOrderInput>>
  setModalFiles: React.Dispatch<React.SetStateAction<any>>
  action: () => any
}

const Index: React.FC<IProps> = ({
  open,
  setOpen,
  BTEOrder,
  setBTEOrder,
  setModalFiles,
  action,
}) => {
  const cancelButtonRef = useRef(null)
  const { handleUpload } = useUpload()

  const handleRenderSides = useCallback(() => {
    const isLeftDirectionOrBinaural = Boolean(
      BTEOrder?.direction === OrderDirection?.Left ||
        BTEOrder?.direction === OrderDirection.Binaural
    )

    const isRightDirectionOrBinaural = Boolean(
      BTEOrder?.direction === OrderDirection?.Right ||
        BTEOrder?.direction === OrderDirection.Binaural
    )

    return (
      <OrderLayout title="Upload Modal" cols={2}>
        <OrderLayout.Item className={'text-center'}>
          {isLeftDirectionOrBinaural &&
            (BTEOrder?.product?.left?.model === '' ? (
              <Uploader
                onChange={(e) =>
                  //@ts-ignore
                  handleUpload(e)
                    .then((file) => {
                      setModalFiles((prevState) => ({
                        ...prevState,
                        left: file!,
                      }))
                      setBTEOrder((prevState) => ({
                        ...prevState,
                        product: {
                          ...prevState.product,
                          left: {
                            ...prevState.product.left,
                            model: file!,
                          },
                        },
                      }))
                    })
                    .catch((err) => {
                      if (err.response) console.log(err.response.data)
                      else console.log(err)
                    })
                }
                id="left"
                variant="svg"
                accept="all"
                text="Upload Left Modal File"
              />
            ) : (
              <div className="relative">
                <STLViewer
                  url={BTEOrder?.product?.left?.model}
                  modelColor="rgb(115, 194, 251)"
                  backgroundColor={'#fff'}
                  rotate={true}
                  orbitControls={true}
                  model={BTEOrder?.product?.left?.model}
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 absolute cursor-pointer"
                  style={{
                    top: 0,
                    right: 0,
                  }}
                  onClick={() => {
                    setModalFiles((prevState) => ({
                      ...prevState,
                      left: '',
                    })),
                      setBTEOrder((prevState) => ({
                        ...prevState,
                        product: {
                          ...prevState.product,
                          left: {
                            ...prevState.product.left,
                            model: '',
                          },
                        },
                      }))
                  }}
                  fill="white"
                  viewBox="0 0 24 24"
                  stroke="red"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            ))}
        </OrderLayout.Item>
        <OrderLayout.Item className={'text-center'}>
          {isRightDirectionOrBinaural &&
            (BTEOrder?.product?.right?.model === '' ? (
              <Uploader
                onChange={(e) =>
                  //@ts-ignore
                  handleUpload(e).then((file) => {
                    setModalFiles((prevState) => ({
                      ...prevState,
                      right: file!,
                    }))

                    setBTEOrder((prevState) => ({
                      ...prevState,
                      product: {
                        ...prevState.product,
                        right: {
                          ...prevState.product.right,
                          model: file!,
                        },
                      },
                    }))
                  })
                }
                id="right"
                variant="svg"
                accept="all"
                text="Upload right Modal File"
              />
            ) : (
              <div className="relative">
                <STLViewer
                  url={BTEOrder?.product?.right?.model}
                  modelColor="rgb(255, 0, 48)"
                  backgroundColor={'#fff'}
                  rotate={true}
                  orbitControls={true}
                  model={BTEOrder?.product?.right?.model}
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 absolute cursor-pointer"
                  style={{
                    top: 0,
                    right: 0,
                  }}
                  onClick={() => {
                    setModalFiles((prevState) => ({
                      ...prevState,
                      right: '',
                    })),
                      setBTEOrder((prevState) => ({
                        ...prevState,
                        product: {
                          ...prevState.product,
                          right: {
                            ...prevState.product.right,
                            model: '',
                          },
                        },
                      }))
                  }}
                  fill="white"
                  viewBox="0 0 24 24"
                  stroke="red"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            ))}
        </OrderLayout.Item>
      </OrderLayout>
    )
  }, [
    BTEOrder?.direction,
    BTEOrder?.product?.left?.model,
    BTEOrder?.product?.right?.model,
    handleUpload,
    setBTEOrder,
    setModalFiles,
  ])

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
              <div>{handleRenderSides()}</div>
              <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:col-start-2 sm:text-sm"
                  onClick={() => {
                    action(), setOpen(false)
                  }}
                >
                  Submit
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:col-start-1 sm:text-sm"
                  onClick={() => setOpen(false)}
                  ref={cancelButtonRef}
                >
                  Cancel
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
