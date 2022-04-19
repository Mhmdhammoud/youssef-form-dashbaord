import {
  DownloadIcon,
  InformationCircleIcon,
  PencilIcon,
  PrinterIcon,
} from '@heroicons/react/solid'
import JsBarcode from 'jsbarcode'
import moment from 'moment'
import { useRouter } from 'next/router'
import React, { useCallback, useEffect, useState } from 'react'
//@ts-ignore
import STLViewer from 'stl-viewer'
import {
  BTEOrderTable,
  Footer,
  Header,
  IndustrialOrderTable,
  LogModal,
  MonitoringOrderTable,
  MusicPlugsTable,
  NightOrderTable,
  Notification,
  OrderStepper,
  RejectModal,
  SkyOrderTable,
  SwimmingOrderTable,
  UploadModelModal,
  StatusModal,
  Wrapper,
} from '../../components'
import { AllImages, CordColors } from '../../data'
import { withRouter } from '../../hoc'
import {
  CreateOrderInput,
  Order,
  OrderDirection,
  OrderStatus,
  OrderType,
  useChangeOrderStatusMutation,
  useGetOrderQuery,
  useMeQuery,
  useRejectOrderMutation,
  UserRole,
  useUpdateOrderMutation,
} from '../../src/generated/graphql'
import { ToUpperFirst } from '../../utils'

const Index = () => {
  const router = useRouter()
  const { id } = router.query
  const [logModalOpen, setLogModalOpen] = useState<boolean>(false)
  const [editOrderOpen, setEditOrderOpen] = useState<boolean>(false)
  const [rejectModalOpen, setRejectModalOpen] = useState<boolean>(false)
  const [uploadModalOpen, setUploadModalOpen] = useState<boolean>(false)
  const [statusModalOpen, setStatusModalOpen] = useState<boolean>(false)
  const [notificationOpen, setNotificationOpen] = useState<boolean>(false)
  const [notificationToast, setNotificationToast] = useState({
    message: '',
    title: 'Success',
  })
  const [orderStatus, setOrderStatus] = useState<OrderStatus>(
    OrderStatus.Placed
  )
  const [BTEOrder, setBTEOrder] = useState<CreateOrderInput>({
    product: {
      left: {
        haModel: '',
        serialNumber: '',
        style: '',
        canalLength: '',
        cymbaLength: '',
        ventSize: 'No Vent',
        quantity: 0,
        color: '',
        surface: '',
        soundTube: '',
        canal: '',
        manufacturer: '',
        markingDots: false,
        model: '',
        hasEngraving: false,
        engraving: '',
      },
      right: {
        haModel: '',
        serialNumber: '',
        style: '',
        canalLength: '',
        cymbaLength: '',
        ventSize: 'No Vent',
        quantity: 0,
        color: '',
        surface: '',
        soundTube: '',
        canal: '',
        manufacturer: '',
        markingDots: false,
        model: '',
        hasEngraving: false,
        engraving: '',
      },
    },
    deliveryDetails: {
      standard: false,
      urgent: false,
      invoiceNumber: '',
    },
    extraDetails: {
      accessories: '',
      comment: '',
    },
    impressions: {
      left: '',
      right: '',
    },
    material: '',
    bioporShore: '',
    orderType: OrderType.Bte,
    remake: false,
    reason: '',
    cordColor: '',
    manufacturer: '',
    hasCord: false,
    filter: '',
    direction: OrderDirection.Binaural,
  })

  const { data, loading, refetch } = useGetOrderQuery({
    variables: {
      orderId: `order_${id as string}`,
    },
  })
  const { data: meData } = useMeQuery()
  const order = data?.getOrder

  const [rejectionReason, setRejectionReason] = useState<string>('')
  const [rejectionType, setRejectionType] = useState<string>('')

  const [submitRejection, { data: rejectionDataResponse }] =
    useRejectOrderMutation({
      variables: {
        _id: order?._id as string,
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

  const renderTableBasedOnOrderType = useCallback(() => {
    switch (order?.orderType) {
      case OrderType.SwimmingPlugs:
        return <SwimmingOrderTable order={order as Order} />
      case OrderType.Bte:
        return <BTEOrderTable order={order as Order} />
      case OrderType.MusicPlugs:
        return <MusicPlugsTable order={order as Order} />
      case OrderType.InEarMonitoring:
        return <MonitoringOrderTable order={order as Order} />
      case OrderType.IndustrialPlugs:
        return <IndustrialOrderTable order={order as Order} />
      case OrderType.SkyPlugs:
        return <SkyOrderTable order={order as Order} />
      case OrderType.SleepPlugs:
        return <NightOrderTable order={order as Order} />
      default:
        return
    }
  }, [order])

  const [cannelImagePlaceholderLeft, setCannelImagePlaceHolderLeft] = useState(
    AllImages.cannel.left[AllImages.cannel.left.length - 1].img
  )
  const [cannelImagePlaceholderRight, setCannelImagePlaceHolderRight] =
    useState(AllImages.cannel.right[AllImages.cannel.right.length - 1].img)

  const [cymbaImagePlaceholderLeft, setCymbaImagePlaceHolderLeft] = useState(
    AllImages.cymba.left[AllImages.cymba.left.length - 1].img
  )
  const [cymbaImagePlaceholderRight, setCymbaImagePlaceHolderRight] = useState(
    AllImages.cymba.right[AllImages.cymba.right.length - 1].img
  )

  const [
    submitOrderStatus,
    { data: orderStatusData, error: orderStatusError },
  ] = useChangeOrderStatusMutation({
    variables: {
      _id: order?._id!,
      status: orderStatus,
    },
  })

  const [submitUpdateOrder, { error: updateError, data: updateData }] =
    useUpdateOrderMutation({
      variables: {
        _id: order?._id!,
        input: BTEOrder,
      },
    })

  const handleChangeOrderStatus = useCallback(() => {
    submitOrderStatus()
      .then((res) => {
        router.push('/order?id=' + order?.orderId?.split('_')[1])
      })
      .catch((err) => {
        if (err?.response) console.log(err.response.data)
        else console.log(err)
      })
  }, [submitOrderStatus, router, order?.orderId])

  const fixString = (str: string) => {
    return (
      str.charAt(0).toUpperCase() +
      str.slice(1).toLocaleLowerCase().replace(/_/g, ' ')
    )
  }
  const handleOrderStatusChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      event.target.value === fixString(OrderStatus.ImpressionEvaluation)
        ? setOrderStatus(OrderStatus.ImpressionEvaluation)
        : event.target.value === fixString(OrderStatus.Modeled)
        ? setOrderStatus(OrderStatus.Modeled)
        : event.target.value === fixString(OrderStatus.Modelling)
        ? setOrderStatus(OrderStatus.Modelling)
        : setOrderStatus(OrderStatus.Placed)
    },
    []
  )

  const handleSubmitModel = useCallback(() => {
    submitUpdateOrder().then((res) => {
      // router.push('/order?id=' + order?.orderId?.split('_')[1])
      setNotificationToast({
        message: 'Models updated successfully',
        title: 'Success',
      })
      setNotificationOpen(true)
      refetch()
    })
  }, [submitUpdateOrder, refetch])

  const [modalFiles, setModalFiles] = useState({
    left: '',
    right: '',
  })

  useEffect(() => {
    setBTEOrder({
      product: {
        left: {
          haModel: order?.product?.left?.haModel!,
          serialNumber: order?.product?.left?.serialNumber!,
          style: order?.product?.left?.style!,
          canalLength: order?.product?.left?.canalLength!,
          cymbaLength: order?.product?.left?.cymbaLength!,
          ventSize: order?.product?.left?.ventSize!,
          quantity: order?.product?.left?.quantity!,
          color: order?.product?.left?.color!,
          surface: order?.product?.left?.surface!,
          soundTube: order?.product?.left?.soundTube!,
          canal: order?.product?.left?.canal!,
          manufacturer: order?.product?.left?.manufacturer!,
          markingDots: order?.product?.left?.markingDots!,
          model: order?.product?.left?.model!,
          hasEngraving: order?.product?.left?.hasEngraving!,
          engraving: order?.product?.left?.engraving!,
        },
        right: {
          haModel: order?.product?.right?.haModel!,
          serialNumber: order?.product?.right?.serialNumber!,
          style: order?.product?.right?.style!,
          canalLength: order?.product?.right?.canalLength!,
          cymbaLength: order?.product?.right?.cymbaLength!,
          ventSize: order?.product?.right?.ventSize!,
          quantity: order?.product?.right?.quantity!,
          color: order?.product?.right?.color!,
          surface: order?.product?.right?.surface!,
          soundTube: order?.product?.right?.soundTube!,
          canal: order?.product?.right?.canal!,
          manufacturer: order?.product?.right?.manufacturer!,
          markingDots: order?.product?.right?.markingDots!,
          model: order?.product?.right?.model!,
          hasEngraving: order?.product?.right?.hasEngraving!,
          engraving: order?.product?.right?.engraving!,
        },
      },
      deliveryDetails: {
        standard: order?.deliveryDetails?.standard!,
        urgent: order?.deliveryDetails?.urgent!,
        invoiceNumber: order?.deliveryDetails?.invoiceNumber!,
      },

      extraDetails: {
        accessories: order?.extraDetails?.accessories!,
        comment: order?.extraDetails?.comment!,
      },

      impressions: {
        left: order?.impressions?.left!,
        right: order?.impressions?.right!,
      },
      material: order?.material!,
      bioporShore: order?.bioporShore!,
      orderType: order?.orderType!,

      remake: order?.remake!,
      reason: order?.reason!,
      manufacturer: order?.manufacturer!,
      hasCord: order?.hasCord!,
      filter: order?.filter!,
      direction: order?.direction!,
      cordColor: order?.cordColor!,
    })
    const cannelImageLeft = AllImages?.cannel?.left?.find(
      (item) => item.value === order?.product?.left?.canalLength
    )?.img
    const cannelImageRight = AllImages?.cannel?.right?.find(
      (item) => item.value === order?.product?.right?.canalLength
    )?.img
    const cymbaImageLeft = AllImages?.cymba?.left?.find(
      (item) => item.value === order?.product?.left?.cymbaLength
    )?.img
    const cymbaImageRight = AllImages?.cymba?.right?.find(
      (item) => item.value === order?.product?.right?.cymbaLength
    )?.img
    if (cannelImageLeft) {
      setCannelImagePlaceHolderLeft(cannelImageLeft)
      setCannelImagePlaceHolderRight(cannelImageRight)
      setCymbaImagePlaceHolderLeft(cymbaImageLeft)
      setCymbaImagePlaceHolderRight(cymbaImageRight)
    }
  }, [id, order])

  useEffect(() => {
    JsBarcode('#barcode', order?.orderId?.split('order_')[1]!, {
      format: 'code128',
      fontSize: 12,
      lineColor: '#000',
      width: 1.5,
      height: 40,
      displayValue: false,
    })
  }, [id, order])
  return (
    <React.Fragment>
      <Header />
      <Wrapper loading={loading} classes="mb-4 print:portrait:my-[-52px]">
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-6xl">
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6 print:portrait:py-2">
              <OrderStepper
                orderStatus={order?.status!}
                order_id={order?._id as string}
                refetch={refetch}
              />
              <div className="grid gap-6 grid-cols-2 p-2 print:grid-cols-3">
                <div className="col-span-1 rounded-lg pb-2 print:col-span-2">
                  <p className="text-lg leading-6 font-medium text-gray-900">
                    Product Type:{' '}
                    {order?.orderType.length !== undefined &&
                      ToUpperFirst(order?.orderType)}
                  </p>
                  <p>
                    <span className="text-sm leading-5 font-medium text-gray-500 print:hidden">
                      Company:{' '}
                      <span className="text-black">
                        {' '}
                        {order?.company?.title}{' '}
                      </span>
                      <br />
                      Created By:{' '}
                      <span className="text-black">
                        {order?.creator?.fullName}
                      </span>
                    </span>
                  </p>
                  <p className="mt-1 text-sm text-gray-500 font-medium leading-5">
                    Order ID:
                    <span className={'font-medium text-black'}>
                      {' '}
                      {order?.orderId?.split('order_')[1]}
                    </span>
                  </p>
                  <div className="flex items-center w-full justify-between ">
                    <div className="text-sm leading-5 font-medium text-gray-500 w-full hidden print:block">
                      Company:{' '}
                      <span className="text-black">
                        {order?.company?.title}
                      </span>
                      <br />
                      Created By:{' '}
                      <span className="text-black">
                        {order?.creator?.fullName}
                      </span>
                    </div>
                    <svg
                      id={'barcode'}
                      style={{ maxWidth: '250px' }}
                      className="print:hidden"
                    />
                  </div>
                </div>
                <div className="col-span-1 rounded-lg pb-2">
                  <div
                    className="flex flex-col justify-end"
                    style={{
                      alignItems: 'flex-end',
                    }}
                  >
                    <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-200 text-green-800">
                      {order?.status.length !== undefined &&
                        order?.status.charAt(0).toUpperCase() +
                          order?.status
                            .slice(1)
                            .toLocaleLowerCase()
                            .replace(/_/g, ' ')}
                    </span>
                    <p className="mt-1 text-sm text-gray-500">
                      Created At:{' '}
                      {moment(order?.createdAt).format('DD-MM-YYYY HH:MM')}
                    </p>
                    <svg
                      id={'barcode'}
                      style={{ maxWidth: '250px' }}
                      className="hidden print:block"
                    />
                  </div>

                  {order?.logs && order?.logs.length > 0 && (
                    <div className="flex justify-end mt-3 print:hidden">
                      <button
                        onClick={() => window.print()}
                        className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-white-700 mx-3"
                      >
                        Print
                        <PrinterIcon className="ml-2 h-4 w-4" />
                      </button>
                      <button
                        onClick={() => setLogModalOpen(true)}
                        className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-white-700"
                      >
                        Logs
                        <InformationCircleIcon className="ml-2 h-4 w-4" />
                      </button>
                      {(order?.status === OrderStatus?.Placed ||
                        order?.status === OrderStatus?.ImpressionEvaluation ||
                        order?.status === OrderStatus?.Modelling ||
                        order?.status === OrderStatus?.Modeled) && (
                        <div className="flex flex-wrap">
                          <button
                            onClick={() => setEditOrderOpen(!editOrderOpen)}
                            className="inline-flex items-center ml-4 px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-white-700"
                          >
                            Edit
                            <PencilIcon className="ml-2 h-4 w-4" />
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                  <div className="flex justify-end mt-3 print:hidden">
                    {editOrderOpen && (
                      <React.Fragment>
                        {(order?.status === OrderStatus?.ImpressionEvaluation ||
                          order?.status === OrderStatus?.Modelling) && (
                          <button
                            onClick={() => setRejectModalOpen(true)}
                            className="inline-flex items-center ml-4 px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
                          >
                            Reject
                          </button>
                        )}

                        <button
                          onClick={() => setUploadModalOpen(true)}
                          className="inline-flex items-center ml-4 px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-white-700"
                        >
                          Upload Model
                        </button>
                        <button
                          onClick={() => setStatusModalOpen(true)}
                          className="inline-flex items-center ml-4 px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-white-700"
                        >
                          Change Status
                        </button>
                      </React.Fragment>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="border-t border-gray-200 px-4 py-5 print:py-0 sm:p-0 print:mt-[-10px] print:border-t-0">
              <dl className="sm:divide-y sm:divide-gray-200">
                {order?.remake && (
                  <div className="py-4 sm:py-5 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-6 print:portrait:py-1 print:block">
                    <dt className="text-sm font-medium text-gray-900">
                      <span className="print:hidden">Remake reason</span>
                      <div className="hidden print:grid print:grid-cols-2">
                        <div
                          className={
                            'text-sm font-medium text-gray-900 print:col-span-1'
                          }
                        >
                          Remake reason:
                        </div>
                        <div className="mt-1 text-sm text-gray-500 sm:mt-0 sm:col-span-1">
                          {order?.reason}
                        </div>
                      </div>
                    </dt>
                    <dd className="mt-1 text-sm text-gray-500 sm:mt-0 sm:col-span-1 print:hidden">
                      {order?.reason}
                    </dd>
                  </div>
                )}

                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-6 print:portrait:py-1 print:block">
                  <dt className="text-sm font-medium text-gray-900">
                    <span className="print:hidden">Due date</span>
                    <div className="hidden print:grid print:grid-cols-2">
                      <div
                        className={
                          'text-sm font-medium text-gray-900 print:col-span-1'
                        }
                      >
                        {' '}
                        Due date :
                      </div>
                      <div className="mt-1 text-sm text-gray-500 sm:mt-0 sm:col-span-1">
                        {order?.deliveryDetails?.urgent
                          ? moment(order?.createdAt)
                              .add(1, 'days')
                              .format('DD-MM-YYYY')
                          : moment(order?.createdAt)
                              .add(3, 'days')
                              .format('DD-MM-YYYY')}
                      </div>
                    </div>
                  </dt>
                  <dd className="mt-1 text-sm text-gray-500 sm:mt-0 sm:col-span-1 print:hidden">
                    {order?.deliveryDetails?.urgent
                      ? moment(order?.createdAt)
                          .add(1, 'days')
                          .format('DD-MM-YYYY')
                      : moment(order?.createdAt)
                          .add(3, 'days')
                          .format('DD-MM-YYYY')}
                  </dd>
                </div>
                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-6 print:portrait:py-1 print:block">
                  <dt className="text-sm font-medium text-gray-900">
                    <span className="print:hidden">Delivery type</span>
                    <div className="hidden print:grid print:grid-cols-2">
                      <div
                        className={
                          'text-sm font-medium text-gray-900 print:col-span-1'
                        }
                      >
                        Delivery type
                      </div>
                      <div className="mt-1 text-sm text-gray-500 sm:mt-0 sm:col-span-1">
                        {order?.deliveryDetails?.urgent ? 'Urgent' : 'Standard'}
                      </div>
                    </div>
                  </dt>
                  <dd className="mt-1 text-sm text-gray-500 sm:mt-0 sm:col-span-1 print:hidden">
                    {order?.deliveryDetails?.urgent ? 'Urgent' : 'Standard'}
                  </dd>
                </div>
                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-6 print:portrait:py-1 print:block">
                  <dt className="text-sm font-medium text-gray-900">
                    <span className="print:hidden">Material</span>
                    <div className="hidden print:grid print:grid-cols-2">
                      <div
                        className={
                          'text-sm font-medium text-gray-900 print:col-span-1'
                        }
                      >
                        Material
                      </div>
                      <div className="mt-1 text-sm text-gray-500 sm:mt-0 sm:col-span-1">
                        {order?.material}
                      </div>
                    </div>
                  </dt>
                  <dd className="mt-1 text-sm text-gray-500 sm:mt-0 sm:col-span-1 print:hidden">
                    {order?.material}
                  </dd>
                </div>

                {order?.orderType !== OrderType.Bte &&
                  order?.orderType !== OrderType.Custom &&
                  order?.orderType !== OrderType.Ric &&
                  order?.orderType !== OrderType.SwimmingPlugs && (
                    <React.Fragment>
                      <div className="py-4 sm:py-5 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-6 print:portrait:py-1 print:block">
                        <dt className="text-sm font-medium text-gray-900">
                          <span className="print:hidden">Manufacturer</span>
                          <div className="hidden print:grid print:grid-cols-2">
                            <div
                              className={
                                'text-sm font-medium text-gray-900 print:col-span-1'
                              }
                            >
                              Manufacturer
                            </div>
                            <div className="mt-1 text-sm text-gray-500 sm:mt-0 sm:col-span-1">
                              {order?.manufacturer}
                            </div>
                          </div>
                        </dt>
                        <dd className="mt-1 text-sm text-gray-500 sm:mt-0 sm:col-span-1 print:hidden">
                          {order?.manufacturer}
                        </dd>
                      </div>

                      <div className="py-4 sm:py-5 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-6 print:portrait:py-1 print:block">
                        <dt className="text-sm font-medium text-gray-900">
                          <span className="print:hidden">Filter</span>
                          <div className="hidden print:grid print:grid-cols-2">
                            <div
                              className={
                                'text-sm font-medium text-gray-900 print:col-span-1'
                              }
                            >
                              Filter
                            </div>
                            <div className="mt-1 text-sm text-gray-500 sm:mt-0 sm:col-span-1">
                              {order?.filter}
                            </div>
                          </div>
                        </dt>
                        <dd className="mt-1 text-sm text-gray-500 sm:mt-0 sm:col-span-1 print:hidden">
                          {order?.filter}
                        </dd>
                      </div>
                      <div className="py-4 sm:py-5 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-6 print:portrait:py-1 print:block">
                        <dt className="text-sm font-medium text-gray-900">
                          <span className="print:hidden">Cord color</span>
                          <div className="hidden print:grid print:grid-cols-2">
                            <div
                              className={
                                'text-sm font-medium text-gray-900 print:col-span-1'
                              }
                            >
                              Cord color
                            </div>
                            <div className="mt-1 text-sm text-gray-500 sm:mt-0 sm:col-span-1">
                              <span className={'p-1 flex items-center'}>
                                {order?.cordColor === '' ? (
                                  <td className="whitespace-nowrap text-sm text-gray-500">
                                    Has no cord
                                  </td>
                                ) : (
                                  <React.Fragment>
                                    <td className="whitespace-nowrap text-sm text-gray-500">
                                      {order?.cordColor}
                                    </td>
                                    <span
                                      style={{
                                        backgroundColor: CordColors?.find(
                                          (item) =>
                                            item.label === order?.cordColor
                                        )?.color,
                                      }}
                                      className={
                                        'ml-4 p-1 w-6 h-6 rounded-full block border-[2px] border-black'
                                      }
                                    />
                                  </React.Fragment>
                                )}
                              </span>
                            </div>
                          </div>
                        </dt>
                        <dd className="mt-1 text-sm text-gray-500 sm:mt-0 sm:col-span-1 print:hidden">
                          <span className={'p-1 flex items-center'}>
                            {order?.cordColor === '' ? (
                              <td className="whitespace-nowrap text-sm text-gray-500">
                                Has no cord
                              </td>
                            ) : (
                              <React.Fragment>
                                <td className="whitespace-nowrap text-sm text-gray-500">
                                  {order?.cordColor}
                                </td>
                                <span
                                  style={{
                                    backgroundColor: CordColors?.find(
                                      (item) => item.label === order?.cordColor
                                    )?.color,
                                  }}
                                  className={
                                    'ml-4 p-1 w-6 h-6 rounded-full block border-[2px] border-black'
                                  }
                                />
                              </React.Fragment>
                            )}
                          </span>
                        </dd>
                      </div>
                    </React.Fragment>
                  )}

                <div className="py-4 sm:py-5 grid grid-cols-1 sm:gap-4 sm:px-6 print:portrait:py-1 print:portrait:mt-0">
                  <dt className="text-sm font-medium text-gray-900">
                    Product Info
                  </dt>
                  <dd className="mt-2 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {renderTableBasedOnOrderType()}
                  </dd>
                </div>
                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-6 ">
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    <h2 className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      Comment
                    </h2>
                    <p
                      className={
                        'px-6 py-4 whitespace-nowrap text-sm text-gray-500'
                      }
                    >
                      {order?.extraDetails?.comment}
                    </p>
                  </dd>
                </div>
                {order?.extraDetails?.accessories && (
                  <div className="py-4 sm:py-5 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-6 ">
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      <h2 className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        Accessories
                      </h2>
                      <p
                        className={
                          'px-6 py-4 whitespace-nowrap text-sm text-gray-500'
                        }
                      >
                        {order?.extraDetails?.accessories}
                      </p>
                    </dd>
                  </div>
                )}
                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-6 print:portrait:hidden print:landscape:hidden ">
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    <h2 className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      Impressions
                    </h2>

                    <div className="grid grid-cols-2">
                      {(order?.direction === OrderDirection.Left ||
                        order?.direction === OrderDirection?.Binaural) && (
                        <div className="col-span-1 relative">
                          <a download href={order?.impressions?.left}>
                            <DownloadIcon
                              className={
                                'w-6 h-6 text-black cursor-pointer absolute top-0 right-10'
                              }
                            />
                          </a>
                          {order?.impressions?.left !== '' ? (
                            <STLViewer
                              url={order?.impressions?.left}
                              modelColor="rgb(115, 194, 251)"
                              backgroundColor={'#fff'}
                              rotate={true}
                              orbitControls={true}
                              model={order?.impressions?.left}
                            />
                          ) : (
                            'N/A'
                          )}
                        </div>
                      )}
                      {(order?.direction === OrderDirection.Right ||
                        order?.direction === OrderDirection?.Binaural) && (
                        <div className="col-span-1 relative">
                          <a download href={order?.impressions?.right}>
                            <DownloadIcon
                              className={
                                'w-6 h-6 text-black cursor-pointer absolute top-0 right-10'
                              }
                            />
                          </a>
                          {order?.impressions?.right !== '' ? (
                            <STLViewer
                              url={order?.impressions?.right}
                              modelColor="rgb(255, 0, 48)"
                              backgroundColor={'#fff'}
                              rotate={true}
                              orbitControls={true}
                              model={order?.impressions?.right}
                            />
                          ) : (
                            'N/A'
                          )}
                        </div>
                      )}
                    </div>
                  </dd>
                </div>
                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-6 print:landscape:hidden print:portrait:hidden ">
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    <h2 className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      Model Files
                    </h2>
                    <div className="grid grid-cols-2">
                      {(order?.direction === OrderDirection.Left ||
                        order?.direction === OrderDirection?.Binaural) && (
                        <div className="col-span-1 relative">
                          {order?.product?.left?.model! !== '' &&
                          order?.product?.left?.model ? (
                            <div>
                              {
                                //@ts-ignore
                                (meData?.me.admin.role ===
                                  UserRole.Technician ||
                                  //@ts-ignore

                                  meData?.me.admin.role === UserRole.Admin) && (
                                  <a
                                    download
                                    href={order?.product?.left?.model!}
                                  >
                                    <DownloadIcon
                                      className={
                                        'w-6 h-6 text-black cursor-pointer absolute top-0 right-10'
                                      }
                                    />
                                  </a>
                                )
                              }

                              <STLViewer
                                url={order?.product?.left?.model!}
                                modelColor="rgb(115, 194, 251)"
                                backgroundColor={'#fff'}
                                rotate={true}
                                orbitControls={true}
                                model={order?.product?.left?.model!}
                              />
                            </div>
                          ) : (
                            <div className="ml-6">N/A</div>
                          )}
                        </div>
                      )}
                      {(order?.direction === OrderDirection.Right ||
                        order?.direction === OrderDirection?.Binaural) && (
                        <div className="col-span-1 relative">
                          {order?.product?.right?.model! !== '' &&
                          order?.product?.right?.model ? (
                            <div>
                              {
                                //@ts-ignore
                                (meData?.me.admin.role ===
                                  UserRole.Technician ||
                                  //@ts-ignore
                                  meData?.me.admin.role === UserRole.Admin) && (
                                  <a
                                    download
                                    href={order?.product?.right?.model!}
                                  >
                                    <DownloadIcon
                                      className={
                                        'w-6 h-6 text-black cursor-pointer absolute top-0 right-10'
                                      }
                                    />
                                  </a>
                                )
                              }
                              <STLViewer
                                url={order?.product?.right?.model!}
                                modelColor="rgb(255, 0, 48)"
                                backgroundColor={'#fff'}
                                rotate={true}
                                orbitControls={true}
                                model={order?.product?.right?.model!}
                              />
                            </div>
                          ) : (
                            <div className="ml-6">N/A</div>
                          )}
                        </div>
                      )}
                    </div>
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>

        <Notification
          message={notificationToast.message}
          title={notificationToast.title}
          open={notificationOpen}
          setOpen={setNotificationOpen}
        />
        <RejectModal
          open={rejectModalOpen}
          setOpen={setRejectModalOpen}
          action={handleReject}
          handleRejectionReason={handleRejectionReason}
          rejectionReason={rejectionReason}
          rejectionType={rejectionType}
          setRejectionType={setRejectionType}
          orderStatus={order?.status!}
        />
        <UploadModelModal
          BTEOrder={BTEOrder}
          open={uploadModalOpen}
          setOpen={setUploadModalOpen}
          action={handleSubmitModel}
          setBTEOrder={setBTEOrder}
          setModalFiles={setModalFiles}
        />

        <StatusModal
          open={statusModalOpen}
          setOpen={setStatusModalOpen}
          action={handleChangeOrderStatus}
          handleOrderStatusChange={handleOrderStatusChange}
        />

        {order && order?.logs && (
          <LogModal
            logs={order?.logs}
            open={logModalOpen}
            setOpen={setLogModalOpen}
          />
        )}
      </Wrapper>
      <Footer />
    </React.Fragment>
  )
}

export default withRouter(Index)
