import React, { useEffect, useState } from 'react';
import JsBarcode from 'jsbarcode';
import moment from 'moment';
import { useRouter } from 'next/router';
import {
  Footer,
  Header,
  Wrapper,
  LogModal,
  OrderStepper,
} from '../../components';
import {
  OrderStatus,
  OrderType,
  useGetOrderQuery,
} from '../../src/generated/graphql';
import RenderTableByOrderType from './RenderTableByOrderType';
import {
  InformationCircleIcon,
  PencilIcon,
  DownloadIcon,
} from '@heroicons/react/solid';
//@ts-ignore
import STLViewer from 'stl-viewer';

const Index = () => {
  const router = useRouter();
  const { id } = router.query;
  const [logModalOpen, setLogModalOpen] = useState<boolean>(false);

  const { data, loading } = useGetOrderQuery({
    variables: {
      orderId: `order_${id as string}`,
    },
  });

  const order = data?.getOrder;
  console.log(order);

  useEffect(() => {
    JsBarcode('#barcode', order?.orderId?.split('order_')[1]!, {
      format: 'code128',
      fontSize: 12,
      lineColor: '#000',
      width: 1.5,
      height: 40,
      displayValue: false,
    });
  }, [id, order]);

  return (
    <React.Fragment>
      <Header />
      <Wrapper loading={loading} classes="mb-4">
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-6xl">
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <OrderStepper orderStatus={order?.status!} />
              <div className="grid gap-6 grid-cols-2 p-2">
                <div className="col-span-1 rounded-lg pb-2">
                  <p className="text-lg leading-6 font-medium text-gray-900">
                    Product Type:{' '}
                    {order?.orderType.length !== undefined && order?.orderType}
                  </p>
                  <p className="mt-1 text-sm text-gray-500">
                    Order ID: {order?.orderId?.split('order_')[1]}
                  </p>
                  <svg id={'barcode'} style={{ maxWidth: '250px' }} />
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
                      {moment(order?.createdAt).format('DD-MM-YYYY')}
                    </p>
                  </div>

                  {order?.logs && order?.logs.length > 0 && (
                    <div className="flex justify-end mt-3">
                      <button
                        onClick={() => setLogModalOpen(true)}
                        className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-white-700"
                      >
                        Logs
                        <InformationCircleIcon className="ml-2 h-4 w-4" />
                      </button>
                      {order?.status === OrderStatus?.Placed && (
                        <button
                          onClick={() =>
                            router.push(`/edit-order?id=${order?.orderId}`)
                          }
                          className="inline-flex items-center ml-4 px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-white-700"
                        >
                          Edit
                          <PencilIcon className="ml-2 h-4 w-4" />
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
              <dl className="sm:divide-y sm:divide-gray-200">
                {order?.remake && (
                  <div className="py-4 sm:py-5 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                      Remake reason
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-1">
                      {order?.reason}
                    </dd>
                  </div>
                )}

                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Due date
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-1">
                    {order?.deliveryDetails?.urgent
                      ? moment(order?.createdAt)
                          .add(1, 'days')
                          .format('DD-MM-YYYY')
                      : moment(order?.createdAt)
                          .add(3, 'days')
                          .format('DD-MM-YYYY')}
                  </dd>
                </div>

                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Delivery Type
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-1">
                    {order?.deliveryDetails?.urgent ? 'Urgent' : 'Standard'}
                  </dd>
                </div>

                <div className="py-4 sm:py-5 grid grid-cols-1 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Product Info
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    <RenderTableByOrderType
                      //@ts-ignore
                      orderProduct={order?.product as string}
                      orderType={order?.orderType as OrderType}
                      orderMaterial={order?.material as string}
                      bioporShore={order?.bioporShore as string}
                    />
                  </dd>
                </div>
                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-6 print:landscape:hidden ">
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    <div className="grid grid-cols-2">
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
                    </div>
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
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
  );
};

export default Index;
