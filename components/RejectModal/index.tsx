/* This example requires Tailwind CSS v2.0+ */
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useRef } from 'react'
import { AllRejectionReasons } from '../../data'
import Select from '../common/Select'
import OrderLayout from '../Layout/OrderLayout'
interface IProps {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  action: () => any
  rejectionType: string
  setRejectionType: React.Dispatch<React.SetStateAction<string>>
  handleRejectionReason: (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => void
  rejectionReason: string
}

const Index: React.FC<IProps> = ({
  open,
  setOpen,
  action,
  setRejectionType,
  rejectionType,
  rejectionReason,
  handleRejectionReason,
}) => {
  const cancelButtonRef = useRef(null)

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
              <div>
                <OrderLayout title={'Reject'} cols={2}>
                  <OrderLayout.Item className={'text-center'}>
                    <Select
                      id="rejectionType"
                      direction="binaural"
                      options={['Impression', 'Modeling']}
                      onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
                        setRejectionType(event.target.value)
                      }
                      value={rejectionType}
                    />
                  </OrderLayout.Item>

                  <OrderLayout.Item className={'text-center'}>
                    {rejectionType === 'Impression' ? (
                      <Select
                        direction="binaural"
                        id="rejectionReason"
                        onChange={handleRejectionReason}
                        options={AllRejectionReasons?.impression}
                        value={rejectionReason}
                      />
                    ) : (
                      <Select
                        direction="binaural"
                        id="rejectionReason"
                        onChange={handleRejectionReason}
                        options={AllRejectionReasons?.modeling}
                        value={rejectionReason}
                      />
                    )}
                  </OrderLayout.Item>
                </OrderLayout>
              </div>
              <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:col-start-2 sm:text-sm"
                  onClick={() => {
                    action(), setOpen(false)
                  }}
                >
                  Confirm
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