import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';
//@ts-ignore
import STLViewer from 'stl-viewer';
import {
  ConfirmationModal,
  Footer,
  Header,
  Notification,
  OrderLayout,
  Select,
  Uploader,
  Wrapper,
} from '../../components';
import { AllImages, AllRejectionReasons } from '../../data';
import { useUpload } from '../../hooks';
import {
  OrderStatus,
  OrderType,
  CreateOrderInput,
  useChangeOrderStatusMutation,
  useGetOrderQuery,
  useMeQuery,
  useRejectOrderMutation,
  useUpdateOrderMutation,
  OrderDirection,
} from '../../src/generated/graphql';
import {withRouter} from "../../hoc";

const Index = () => {
  const [showReject, setShowReject] = useState<boolean>(false);
  const [showStatus, setShowStatus] = useState<boolean>(false);
  const [showModel, setShowModel] = useState<boolean>(false);
  const [showConfirmationModal, setShowConfirmationModal] =
    useState<boolean>(false);
  const [rejectionReason, setRejectionReason] = useState<string>('');
  const [notificationOpen, setNotificationOpen] = useState<boolean>(false);
  const [rejectionType, setRejectionType] = useState<string>('');
  const [orderStatus, setOrderStatus] = useState<OrderStatus>(
    OrderStatus.Placed
  );
  const [modalFiles, setModalFiles] = useState({
    left: '',
    right: '',
  });
  const [cannelImagePlaceholderLeft, setCannelImagePlaceHolderLeft] = useState(
    AllImages.cannel.left[AllImages.cannel.left.length - 1].img
  );
  const [cannelImagePlaceholderRight, setCannelImagePlaceHolderRight] =
    useState(AllImages.cannel.right[AllImages.cannel.right.length - 1].img);

  const [cymbaImagePlaceholderLeft, setCymbaImagePlaceHolderLeft] = useState(
    AllImages.cymba.left[AllImages.cymba.left.length - 1].img
  );
  const [cymbaImagePlaceholderRight, setCymbaImagePlaceHolderRight] = useState(
    AllImages.cymba.right[AllImages.cymba.right.length - 1].img
  );

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
  });
  const { data: meData } = useMeQuery();
  const router = useRouter();
  const { id } = router.query;

  const { data, loading, refetch } = useGetOrderQuery({
    variables: {
      //@ts-ignore
      orderId: id,
    },
  });
  const order = data?.getOrder;

  const userData = meData?.me?.admin;
  const [submitRejection, { data: rejectionDataResponse }] =
    useRejectOrderMutation({
      variables: {
        _id: order?._id!,
        rejectionReason: rejectionReason,
      },
    });

  const [submitUpdateOrder, { error: updateError, data: updateData }] =
    useUpdateOrderMutation({
      variables: {
        _id: order?._id!,
        input: BTEOrder,
      },
    });

  const [
    submitOrderStatus,
    { data: orderStatusData, error: orderStatusError },
  ] = useChangeOrderStatusMutation({
    variables: {
      _id: order?._id!,
      status: orderStatus,
    },
  });

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
    });
    const cannelImageLeft = AllImages?.cannel?.left?.find(
      (item) => item.value === order?.product?.left?.canalLength
    )?.img;
    const cannelImageRight = AllImages?.cannel?.right?.find(
      (item) => item.value === order?.product?.right?.canalLength
    )?.img;
    const cymbaImageLeft = AllImages?.cymba?.left?.find(
      (item) => item.value === order?.product?.left?.cymbaLength
    )?.img;
    const cymbaImageRight = AllImages?.cymba?.right?.find(
      (item) => item.value === order?.product?.right?.cymbaLength
    )?.img;
    if (cannelImageLeft) {
      setCannelImagePlaceHolderLeft(cannelImageLeft);
      setCannelImagePlaceHolderRight(cannelImageRight);
      setCymbaImagePlaceHolderLeft(cymbaImageLeft);
      setCymbaImagePlaceHolderRight(cymbaImageRight);
    }
  }, [id, order]);

  const handleReject = useCallback(() => {
    submitRejection()
      .then((res) => {
        setNotificationOpen(true);
        setShowReject(false);
        setRejectionReason('');
        router.push(
          '/order?id=' + res?.data?.rejectOrder?.order?.orderId!.split('_')[1]
        );
      })
      .catch((err) => {
        if (err?.response) console.log(err?.response?.data);
        else console.log(err);
      });
  }, [router, submitRejection]);

  const handleRejectionReason = useCallback(
    (
      event:
        | React.ChangeEvent<HTMLInputElement>
        | React.ChangeEvent<HTMLSelectElement>
    ) => {
      setRejectionReason(event.target.value);
    },
    []
  );

  const { handleUpload } = useUpload();

  const handleSubmitModel = useCallback(() => {
    submitUpdateOrder().then((res) => {
      router.push('/order?id=' + order?.orderId?.split('_')[1]);
    });
  }, [submitUpdateOrder, order?.orderId, router]);

  const fixString = (str: string) => {
    return (
      str.charAt(0).toUpperCase() +
      str.slice(1).toLocaleLowerCase().replace(/_/g, ' ')
    );
  };

  console.log(BTEOrder);

  const handleOrderStatusChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      event.target.value === fixString(OrderStatus.ImpressionEvaluation)
        ? setOrderStatus(OrderStatus.ImpressionEvaluation)
        : event.target.value === fixString(OrderStatus.Modeled)
        ? setOrderStatus(OrderStatus.Modeled)
        : event.target.value === fixString(OrderStatus.Modelling)
        ? setOrderStatus(OrderStatus.Modelling)
        : setOrderStatus(OrderStatus.Placed);
    },
    []
  );

  const handleChangeOrderStatus = useCallback(() => {
    submitOrderStatus()
      .then((res) => {
        router.push('/order?id=' + order?.orderId?.split('_')[1]);
      })
      .catch((err) => {
        if (err?.response) console.log(err.response.data);
        else console.log(err);
      });
  }, [submitOrderStatus, router, order?.orderId]);

  return (
    <React.Fragment>
      <Header />
      <Wrapper
        loading={loading}
        classes="my-8 sm:mx-auto sm:w-full sm:max-w-6xl min-h-[70vh]"
      >
        <div className="space-y-6">
          <h2 className="text-center text-2xl py-2 my-2">BTE Order</h2>

          <div className="flex justify-around align-middle">
            <button
              onClick={() => {
                setShowReject(!showReject),
                  setShowModel(false),
                  setShowModel(false);
              }}
              className="inline-flex w-64 justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Reject Order
            </button>

            <button
              onClick={() => {
                setShowModel(!showModel),
                  setShowReject(false),
                  setShowStatus(false);
              }}
              className="inline-flex w-64 justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Upload Model
            </button>

            <button
              onClick={() => {
                setShowStatus(!showStatus),
                  setShowReject(false),
                  setShowModel(false);
              }}
              className="inline-flex w-64 justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Change Order Status
            </button>
          </div>

          {/*reject starts here*/}
          {showReject && (
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

                <button
                  onClick={() => setShowConfirmationModal(true)}
                  className="inline-flex justify-center mt-2 py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Submit
                </button>
              </OrderLayout.Item>
            </OrderLayout>
          )}
          {/*reject ends here*/}

          {showModel && (
            <div>
              <OrderLayout title="Upload Modal" cols={2}>
                <OrderLayout.Item className={'text-center'}>
                  {BTEOrder?.product?.left?.model === '' ? (
                    <Uploader
                      onChange={(e) =>
                        //@ts-ignore
                        handleUpload(e)
                          .then((file) => {
                            setModalFiles((prevState) => ({
                              ...prevState,
                              left: file!,
                            }));

                            console.log({ file });
                            setBTEOrder((prevState) => ({
                              ...prevState,
                              product: {
                                ...prevState.product,
                                left: {
                                  ...prevState.product.left,
                                  model: file!,
                                },
                              },
                            }));
                          })
                          .catch((err) => {
                            if (err.response) console.log(err.response.data);
                            else console.log(err);
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
                            }));
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
                  )}
                </OrderLayout.Item>
                <OrderLayout.Item className={'text-center'}>
                  {BTEOrder?.product?.right?.model === '' ? (
                    <Uploader
                      onChange={(e) =>
                        //@ts-ignore
                        handleUpload(e).then((file) => {
                          setModalFiles((prevState) => ({
                            ...prevState,
                            right: file!,
                          }));

                          setBTEOrder((prevState) => ({
                            ...prevState,
                            product: {
                              ...prevState.product,
                              right: {
                                ...prevState.product.right,
                                model: file!,
                              },
                            },
                          }));
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
                            }));
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
                  )}
                </OrderLayout.Item>
              </OrderLayout>
              <div className="flex justify-end">
                <button
                  onClick={handleSubmitModel}
                  className="justify-center self-end mt-2 py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Submit
                </button>
              </div>
            </div>
          )}

          {showStatus && (
            <OrderLayout title={'Change Order Status'} cols={1}>
              <OrderLayout.Item className={'text-center'}>
                <Select
                  id="rejectionType"
                  direction="binaural"
                  options={[
                    fixString(OrderStatus.ImpressionEvaluation),
                    fixString(OrderStatus.Modelling),
                    fixString(OrderStatus.Modeled),
                  ]}
                  onChange={handleOrderStatusChange}
                />
                <button
                  onClick={handleChangeOrderStatus}
                  className="inline-flex justify-center mt-2 py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Submit
                </button>
              </OrderLayout.Item>
            </OrderLayout>
          )}

          <ConfirmationModal
            buttonText="Reject"
            action={handleReject}
            open={showConfirmationModal}
            setOpen={setShowConfirmationModal}
            text="Are you sure you want to reject this order?"
            title="Reject Order"
            variant="Warning"
          />

          <Notification
            message="Order Rejected Successfully"
            open={notificationOpen}
            setOpen={setNotificationOpen}
            title="Success"
          />
        </div>
      </Wrapper>
      <Footer />
    </React.Fragment>
  );
};

export default withRouter(Index);
