import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';
//@ts-ignore
import STLViewer from 'stl-viewer';
import {
  Footer,
  Header,
  Notification,
  OrderLayout,
  Select,
  StlModal,
  Uploader,
  Wrapper,
} from '../../components';
import {
  AllColors,
  AllImages,
  AllManufacturers,
  AllStyles,
  AllVents,
  soundTubeColor,
  AllRejectionReasons,
} from '../../data';
import {
  CreateOrderInput,
  OrderType,
  useGetOrderQuery,
  useRejectOrderMutation,
  useMeQuery,
  UserRole,
} from '../../src/generated/graphql';
import { useUpload } from '../../hooks';

const Index = () => {
  const [side, setSide] = useState<string>('both');
  const [mainStl, setMainStl] = useState<string>('');
  const [stlModalOpen, setStlModalOpen] = useState<boolean>(false);
  const [showReject, setShowReject] = useState<boolean>(false);
  const [rejectionReason, setRejectionReason] = useState<string>('');
  const [notificationOpen, setNotificationOpen] = useState<boolean>(false);
  const [rejectionType, setRejectionType] = useState<string>('');
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

  const userData = meData?.me?.user;
  const [submitRejection, { data: rejectionDataResponse }] =
    useRejectOrderMutation({
      variables: {
        _id: order?._id!,
        rejectionReason: rejectionReason,
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
        router.push('/order?id=' + res?.data?.rejectOrder?.order?.orderId);
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

  return (
    <React.Fragment>
      <Header />
      <Wrapper
        loading={loading}
        classes="my-8 sm:mx-auto sm:w-full sm:max-w-6xl"
      >
        <div className="space-y-6">
          <h2 className="text-center text-2xl py-2 my-2">BTE Order</h2>

          {userData?.role === UserRole?.Super && (
            <div className="flex">
              <button
                onClick={() => setShowReject(!showReject)}
                className="inline-flex w-64 justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Reject
              </button>
            </div>
          )}
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
                  onClick={handleReject}
                  className="inline-flex justify-center mt-2 py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Submit
                </button>
              </OrderLayout.Item>
            </OrderLayout>
          )}
          {/*reject ends here*/}

          <StlModal
            modalOpen={stlModalOpen}
            setModalOpen={setStlModalOpen}
            stl={mainStl}
          />

          <Notification
            message="Order Rejected Successfully"
            open={notificationOpen}
            setOpen={setNotificationOpen}
            title="Success"
          />
          {/*   <div>
             <button
              onClick={handleSubmit}
              type="button"
              className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Save
            </button>
          </div>*/}
        </div>
      </Wrapper>
      <Footer />
    </React.Fragment>
  );
};

export default Index;
