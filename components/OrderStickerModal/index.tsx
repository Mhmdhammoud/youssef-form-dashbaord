/* This example requires Tailwind CSS v2.0+ */
import { Dialog, Transition } from '@headlessui/react'
import html2canvas from 'html2canvas'
import { jsPDF } from 'jspdf'
import { Fragment, useCallback } from 'react'
import Barcode from 'react-jsbarcode'
import { Order } from '../../src/generated/graphql'
import { ToUpperFirst } from '../../utils'

interface IProps {
  id: string | string[] | undefined
  order: Order
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const Index: React.FC<IProps> = ({ order, open, setOpen }) => {
  const options = {
    format: 'code128',
    fontSize: 12,
    lineColor: '#000',
    width: 1.5,
    height: 40,
    displayValue: false,
  }

  const downloadPdf = useCallback(() => {
    if (typeof window !== 'undefined') {
      html2canvas(document.querySelector('#downloadPDF')!)
        .then((canvas) => {
          const imgData = canvas.toDataURL('image/jpeg', 1)
          const pdf = new jsPDF('p', 'mm', 'a4')
          const pageWidth = pdf.internal.pageSize.getWidth()
          const pageHeight = pdf.internal.pageSize.getHeight()
          const imageWidth = canvas.width * 2
          const imageHeight = canvas.height * 2

          const ratio =
            imageWidth / imageHeight >= pageWidth / pageHeight
              ? pageWidth / imageWidth
              : pageHeight / imageHeight

          pdf.addImage(
            imgData,
            'JPEG',
            10,
            10,
            (imageWidth - 50) * ratio * 1.1,
            (imageHeight - 50) * ratio * 4.5
          )
          pdf.save(`${order?.orderId}.pdf`)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }, [order?.orderId])
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
                  <div className="mt-2 px-4 sm:max-h-[550px] overflow-y-auto">
                    <div className="flow-root">
                      <div
                        className="col-span-1 rounded-lg pb-2 flex flex-col justify-center items-center"
                        id="downloadPDF"
                      >
                        <p className="text-lg leading-6 font-medium text-gray-900">
                          Product Type:{' '}
                          {order?.orderType.length !== undefined &&
                            ToUpperFirst(order?.orderType)}
                        </p>

                        <div className="flex items-center w-full justify-between mt-3">
                          <div className="text-sm leading-5 font-medium text-gray-500 flex justify-center items-center w-full">
                            <div className="grid grid-cols-2">
                              <div className="col-span-1">
                                Order ID:{' '}
                                <span className={' text-black'}>
                                  {order?.orderId?.split('order_')[1]}
                                </span>
                              </div>
                              <div className="col-span-1">
                                Company:{' '}
                                <span className="text-black">
                                  {order?.company?.title}
                                </span>
                              </div>
                              <div className="col-span-1">
                                {' '}
                                Created By:{' '}
                                <span className="text-black">
                                  {order?.creator?.fullName}
                                </span>
                              </div>
                              <div className="col-span-1">
                                {' '}
                                Patient Name:{' '}
                                <span className="text-black">
                                  {order?.patient_name}
                                </span>
                              </div>

                              <div className="col-span-2 flex justify-center mt-3">
                                <Barcode
                                  value={order?.orderId?.split('order_')[1]!}
                                  options={options}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-6 flex justify-center  w-full">
                <button
                  type="button"
                  className="rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
                  onClick={() => {
                    downloadPdf(), setOpen(false)
                  }}
                >
                  Download as PDF
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
