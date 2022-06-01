import {
  CheckCircleIcon,
  CheckIcon,
  CubeIcon,
  CubeTransparentIcon,
  EyeIcon,
  PaperClipIcon,
  PrinterIcon,
  PuzzleIcon,
  TruckIcon,
  XIcon,
} from '@heroicons/react/outline'
import React, { useCallback, useEffect, useState } from 'react'
import {
  AdminRole,
  OrderStatus,
  useChangeOrderStatusMutation,
  useMeQuery,
  useRejectOrderMutation,
} from '../../src/generated/graphql'
import { ToUpperFirst } from '../../utils'
import ErrorToast from '../common/ErrorToast'
import Notification from '../common/Notification'
import ConfirmationModal from '../ConfirmationModal'
import RejectModal from '../RejectModal'
interface IProps {
  orderStatus: OrderStatus
  order_id: string
  refetch: () => void
}

interface IStep {
  id: string
  name: OrderStatus
  disabled: boolean
  status: string
  icon: (props: React.SVGProps<SVGSVGElement>) => JSX.Element
}

const Index: React.FC<IProps> = (props) => {
  const { orderStatus, order_id, refetch } = props
  const { data, loading, error } = useMeQuery()
  const meData = data?.me?.admin
  const [changeStatus, {}] = useChangeOrderStatusMutation()
  const [accessDeniedShow, setAccessDeniedShow] = useState<boolean>(false)
  const [rejectModalOpen, setRejectModalOpen] = useState<boolean>(false)
  const [rejectionReason, setRejectionReason] = useState<string>('')
  const [rejectionType, setRejectionType] = useState<string>('')
  const [notificationOpen, setNotificationOpen] = useState<boolean>(false)
  const [orderStatusToChange, setOrderStatusToChange] = useState<OrderStatus>(
    OrderStatus.Placed
  )
  const [notificationToast, setNotificationToast] = useState({
    message: '',
    title: 'Success',
  })
  const [steps, setSteps] = useState<IStep[]>([
    {
      id: 'Step 1',
      name: OrderStatus.Placed,
      status: 'current',
      disabled: false,
      icon: CheckIcon,
    },
    {
      id: 'Step 2',
      name: OrderStatus.ImpressionEvaluation,
      status: 'upcoming',
      disabled: false,
      icon: EyeIcon,
    },
    {
      id: 'Step 3',
      name: OrderStatus.Modelling,
      status: 'upcoming',
      disabled: false,
      icon: CubeTransparentIcon,
    },
    {
      id: 'Step 4',
      name: OrderStatus.Modeled,
      status: 'upcoming',
      disabled: false,
      icon: CubeIcon,
    },
    {
      id: 'Step 5',
      name: OrderStatus.Printing,
      status: 'upcoming',
      disabled: true,
      icon: PrinterIcon,
    },
    {
      id: 'Step 6',
      name: OrderStatus.Printed,
      status: 'upcoming',
      disabled: true,
      icon: PuzzleIcon,
    },
    {
      id: 'Step 7',
      name: OrderStatus.Mounted,
      status: 'upcoming',
      disabled: true,
      icon: PaperClipIcon,
    },
    {
      id: 'Step 8',
      name: OrderStatus.Checked,
      status: 'upcoming',
      disabled: true,
      icon: CheckCircleIcon,
    },
    {
      id: 'Step 9',
      name: OrderStatus.Shipped,
      status: 'upcoming',
      disabled: true,
      icon: TruckIcon,
    },
  ])

  const updateOrderStepper = useCallback(() => {
    switch (orderStatus) {
      case OrderStatus.Placed:
        setSteps((prevState) => {
          const [first, ...rest] = prevState
          return [
            { ...first, status: 'current' },
            ...rest.map((item) => {
              return {
                ...item,
                status: 'upcoming',
              }
            }),
          ]
        })
        break

      case OrderStatus.ImpressionEvaluation:
        setSteps((prevState) => {
          const [first, second, ...rest] = prevState
          return [
            { ...first, status: 'complete' },
            { ...second, status: 'current' },
            ...rest.map((item) => {
              return {
                ...item,
                status: 'upcoming',
              }
            }),
          ]
        })
        break

      case OrderStatus.Modelling:
        setSteps((prevState) => {
          const [first, second, third, ...rest] = prevState
          return [
            { ...first, status: 'complete' },
            { ...second, status: 'complete' },
            { ...third, status: 'current' },
            ...rest.map((item) => {
              return {
                ...item,
                status: 'upcoming',
              }
            }),
          ]
        })
        break

      case OrderStatus.Modeled:
        setSteps((prevState) => {
          const [first, second, third, fourth, ...rest] = prevState
          return [
            { ...first, status: 'complete' },
            { ...second, status: 'complete' },
            { ...third, status: 'complete' },
            { ...fourth, status: 'current' },
            ...rest.map((item) => {
              return {
                ...item,
                status: 'upcoming',
              }
            }),
          ]
        })
        break

      case OrderStatus.Printing:
        setSteps((prevState) => {
          const [first, second, third, fourth, fifth, ...rest] = prevState
          return [
            { ...first, status: 'complete' },
            { ...second, status: 'complete' },
            { ...third, status: 'complete' },
            { ...fourth, status: 'complete' },
            { ...fifth, status: 'current' },
            ...rest.map((item) => {
              return {
                ...item,
                status: 'upcoming',
              }
            }),
          ]
        })
        break

      case OrderStatus.Printed:
        setSteps((prevState) => {
          const [first, second, third, fourth, fifth, sixth, ...rest] =
            prevState
          return [
            { ...first, status: 'complete' },
            { ...second, status: 'complete' },
            { ...third, status: 'complete' },
            { ...fourth, status: 'complete' },
            { ...fifth, status: 'complete' },
            { ...sixth, status: 'current' },
            ...rest.map((item) => {
              return {
                ...item,
                status: 'upcoming',
              }
            }),
          ]
        })
        break
      case OrderStatus.Mounted:
        setSteps((prevState) => {
          const [first, second, third, fourth, fifth, sixth, seventh, ...rest] =
            prevState
          return [
            { ...first, status: 'complete' },
            { ...second, status: 'complete' },
            { ...third, status: 'complete' },
            { ...fourth, status: 'complete' },
            { ...fifth, status: 'complete' },
            { ...sixth, status: 'complete' },
            { ...seventh, status: 'current' },
            ...rest.map((item) => {
              return {
                ...item,
                status: 'upcoming',
              }
            }),
          ]
        })
        break

      case OrderStatus.Checked:
        setSteps((prevState) => {
          const [
            first,
            second,
            third,
            fourth,
            fifth,
            sixth,
            seventh,
            eighth,
            ...rest
          ] = prevState
          return [
            { ...first, status: 'complete' },
            { ...second, status: 'complete' },
            { ...third, status: 'complete' },
            { ...fourth, status: 'complete' },
            { ...fifth, status: 'complete' },
            { ...sixth, status: 'complete' },
            { ...seventh, status: 'complete' },
            { ...eighth, status: 'current' },
            ...rest.map((item) => {
              return {
                ...item,
                status: 'upcoming',
              }
            }),
          ]
        })
        break

      case OrderStatus.Shipped:
        setSteps((prevState) => {
          const [
            first,
            second,
            third,
            fourth,
            fifth,
            sixth,
            seventh,
            eighth,
            ninth,
            ...rest
          ] = prevState
          return [
            { ...first, status: 'complete' },
            { ...second, status: 'complete' },
            { ...third, status: 'complete' },
            { ...fourth, status: 'complete' },
            { ...fifth, status: 'complete' },
            { ...sixth, status: 'complete' },
            { ...seventh, status: 'complete' },
            { ...eighth, status: 'complete' },
            { ...ninth, status: 'complete' },
            ...rest.map((item) => {
              return {
                ...item,
                status: 'upcoming',
              }
            }),
          ]
        })
        break

      default:
        break
    }
  }, [orderStatus])

  useEffect(() => {
    updateOrderStepper()
    return () => {
      updateOrderStepper()
    }
  }, [orderStatus, updateOrderStepper])

  const [showConfirmationModal, setShowConfirmationModal] =
    useState<boolean>(false)
  const [showConfirmationPrintFailModal, setShowConfirmationPrintFailModal] =
    useState<boolean>(false)
  const [confirmationStep, setConfirmationStep] = useState<OrderStatus>(
    OrderStatus.Placed
  )

  const [submitRejection, { data: rejectionDataResponse }] =
    useRejectOrderMutation({
      variables: {
        _id: order_id as string,
        rejectionReason: rejectionReason,
      },
    })

  const handleReject = useCallback(() => {
    submitRejection()
      .then((res) => {
        setRejectionReason('')
        setNotificationOpen(true)
        setNotificationToast({
          message: 'Order has been rejected successfully',
          title: 'Success',
        })
        refetch()
      })
      .catch((err) => {
        if (err?.response) console.log(err?.response?.data)
        else console.log(err)
      })
  }, [submitRejection, refetch])

  const handleRejectionReason = useCallback(
    (
      event:
        | React.ChangeEvent<HTMLInputElement>
        | React.ChangeEvent<HTMLSelectElement>
    ) => {
      setRejectionReason(event.target.value)
    },
    []
  )

  const handleChangeStatus = (step: IStep) => {
    const indexOfStep = steps.indexOf(step)
    const orderStep = steps.find((item) => item.name === orderStatus)
    const indexOfOrderStatus = steps.indexOf(orderStep!)

    if (step.disabled) {
      setAccessDeniedShow(true)
    } else {
      if (indexOfStep - indexOfOrderStatus === 0) {
        return
      }

      if (indexOfStep - indexOfOrderStatus > 1) {
        setAccessDeniedShow(true)
        return
      }
      if (
        meData?.role !== AdminRole?.Admin &&
        meData?.role !== AdminRole?.Technician
      ) {
        setAccessDeniedShow(true)
        return
      }
      setConfirmationStep(step.name)
      setShowConfirmationModal(true)
    }
  }

  const changeOrderStatus = () => {
    setShowConfirmationModal(false)
    changeStatus({
      variables: {
        _id: order_id,
        status: confirmationStep,
      },
    }).then(() => {
      refetch()
    })
  }

  const handleFailPrint = useCallback(
    (orderStatus: OrderStatus) => {
      setRejectModalOpen(false)
      changeStatus({
        variables: {
          _id: order_id,
          status: orderStatus,
        },
      }).then(() => {
        refetch()
      })
    },
    [changeStatus, order_id, refetch]
  )

  return (
    <nav aria-label="Progress" className="mb-5 print:hidden">
      <ol role="list" className="space-y-4 md:flex md:space-y-0 md:space-x-8">
        {steps.length > 0 &&
          steps?.map((step) => (
            <li key={step.name} className="md:flex-1">
              {step?.status === 'complete' ? (
                <a
                  className="group pl-4 py-2 flex flex-col border-l-4 border-indigo-600 hover:border-indigo-800 md:pl-0 md:pt-4 md:pb-0 md:border-l-0 md:border-t-4 hover:border-t-[1.5rem] duration-700 ease-in-out cursor-pointer"
                  onClick={() => handleChangeStatus(step)}
                >
                  <span className="text-xs text-indigo-600 font-semibold tracking-wide uppercase group-hover:text-indigo-800">
                    {step?.id}
                  </span>
                  <span className="text-sm font-medium flex items-center justify-between">
                    {ToUpperFirst(step?.name)} <step.icon className="h-6 w-6" />
                  </span>
                </a>
              ) : step.status === 'current' ? (
                step.name === OrderStatus.ImpressionEvaluation ||
                step.name === OrderStatus.Modelling ? (
                  <div>
                    <a
                      className="pl-4 py-2 flex flex-col border-l-4 border-indigo-600 md:pl-0 md:pt-4 md:pb-0 md:border-l-0 md:border-t-4 hover:border-t-[1.5rem] duration-700 ease-in-out cursor-pointer"
                      aria-current="step"
                      onClick={() => handleChangeStatus(step)}
                    >
                      <span className="text-xs text-indigo-600 font-semibold tracking-wide uppercase flex items-center justify-between">
                        {step?.id}
                        <div
                          className={'mr-2'}
                          onClick={() => setRejectModalOpen(true)}
                        >
                          <XIcon
                            className={
                              'w-6 h-6 cursor-pointer rounded-md border-2 border-red-200 text-gray-600'
                            }
                          />
                        </div>
                      </span>
                      <span className="text-sm font-medium flex items-center justify-between">
                        {ToUpperFirst(step?.name)}{' '}
                        <step.icon className="h-6 w-6" />
                      </span>
                    </a>
                  </div>
                ) : (
                  <a
                    className="pl-4 py-2 flex flex-col border-l-4 border-indigo-600 md:pl-0 md:pt-4 md:pb-0 md:border-l-0 md:border-t-4 hover:border-t-[1.5rem] duration-700 ease-in-out cursor-pointer"
                    aria-current="step"
                    onClick={() => handleChangeStatus(step)}
                  >
                    <span className="text-xs text-indigo-600 font-semibold tracking-wide uppercase">
                      {step?.id}
                    </span>
                    <span className="text-sm font-medium flex items-center justify-between">
                      {ToUpperFirst(step?.name)}{' '}
                      <step.icon className="h-6 w-6" />
                    </span>
                  </a>
                )
              ) : (
                <a
                  className="group pl-4 py-2 flex flex-col border-l-4 border-gray-200 hover:border-gray-300 md:pl-0 md:pt-4 md:pb-0 md:border-l-0 md:border-t-4 hover:border-t-[1.5rem] duration-700 ease-in-out cursor-pointer"
                  onClick={() => handleChangeStatus(step)}
                >
                  <span className="text-xs text-gray-500 font-semibold tracking-wide uppercase group-hover:text-gray-700">
                    {step?.id}
                  </span>
                  <span className="text-sm font-medium flex items-center justify-between">
                    {ToUpperFirst(step?.name)} <step.icon className="h-6 w-6" />
                  </span>
                </a>
              )}
            </li>
          ))}
      </ol>
      <ConfirmationModal
        title={'Order Status'}
        text={'Are you sure you want to change the orders status'}
        variant={'Info'}
        open={showConfirmationModal}
        buttonText={'Change'}
        action={changeOrderStatus}
        setOpen={setShowConfirmationModal}
      />
      <ConfirmationModal
        title={'Print fail'}
        text={
          'Confirming this operation will lead to sending back the order to the stage before. Are you sure you want to proceed?'
        }
        variant={'Info'}
        open={showConfirmationPrintFailModal}
        buttonText={'Proceed'}
        action={() => handleFailPrint(orderStatusToChange)}
        setOpen={setShowConfirmationPrintFailModal}
      />
      <ErrorToast
        show={accessDeniedShow}
        setShow={setAccessDeniedShow}
        message={
          'You are not allowed to change the order status to the following step'
        }
        title={'Access denied'}
      />
      <RejectModal
        orderStatus={orderStatus}
        setOpen={setRejectModalOpen}
        open={rejectModalOpen}
        action={handleReject}
        handleRejectionReason={handleRejectionReason}
        rejectionReason={rejectionReason}
        rejectionType={rejectionType}
        setRejectionType={setRejectionType}
      />
      <Notification
        message={notificationToast.message}
        title={notificationToast.title}
        open={notificationOpen}
        setOpen={setNotificationOpen}
      />
    </nav>
  )
}
export default Index
