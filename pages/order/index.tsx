import React, {useEffect, useState} from 'react';
import JsBarcode from 'jsbarcode';
import moment from 'moment';
import {useRouter} from 'next/router';
import {Footer, Header, LogModal, OrderStepper, Wrapper,} from '../../components';
import {
    OrderDirection,
    OrderStatus,
    OrderType,
    useGetOrderQuery,
    useMeQuery,
    UserRole,
} from '../../src/generated/graphql';
import RenderTableByOrderType from './RenderTableByOrderType';
import {DownloadIcon, InformationCircleIcon, PencilIcon, PrinterIcon,} from '@heroicons/react/solid';
//@ts-ignore
import STLViewer from 'stl-viewer';
import toUpperFirst from "../../utils/ToUpperFirst";

const Index = () => {
    const router = useRouter();
    const {id} = router.query;
    const [logModalOpen, setLogModalOpen] = useState<boolean>(false);

    const {data, loading, refetch} = useGetOrderQuery({
        variables: {
            orderId: `order_${id as string}`,
        },
    });
    const {data: meData} = useMeQuery();
    const order = data?.getOrder;
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
    console.log(order?.status)
    return (
        <React.Fragment>
            <Header/>
            <Wrapper loading={loading} classes="mb-4 print:portrait:my-[-52px]">
                <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-6xl">
                    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                        <div className="px-4 py-5 sm:px-6 print:portrait:py-2">
                            <OrderStepper orderStatus={order?.status!}/>
                            <div className="grid gap-6 grid-cols-2 p-2 print:grid-cols-3">
                                <div className="col-span-1 rounded-lg pb-2 print:col-span-2">
                                    <p className="text-lg leading-6 font-medium text-gray-900">
                                        Product Type:{' '}
                                        {order?.orderType.length !== undefined && toUpperFirst(order?.orderType)}
                                    </p>
                                    <p>
                    <span className="text-sm leading-5 font-medium text-gray-500 print:hidden">
                      Company:{' '}
                        <span className="text-black">
                        {' '}
                            {order?.company?.title}{' '}
                      </span>
                      <br/>
                      Created By:{' '}
                        <span className="text-black">
                        {order?.creator?.fullName}
                      </span>
                    </span>
                                    </p>
                                    <p className="mt-1 text-sm text-gray-500">
                                        Order ID: {order?.orderId?.split('order_')[1]}
                                    </p>
                                    <div className="flex items-center w-full justify-between ">
                                        <div
                                            className="text-sm leading-5 font-medium text-gray-500 w-full hidden print:block">
                                            Company:{' '}
                                            <span className="text-black">
                        {order?.company?.title}
                      </span>
                                            <br/>
                                            Created By:{' '}
                                            <span className="text-black">
                        {order?.creator?.fullName}
                      </span>
                                        </div>
                                        <svg
                                            id={'barcode'}
                                            style={{maxWidth: '250px'}}
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
                    <span
                        className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-200 text-green-800">
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
                                            style={{maxWidth: '250px'}}
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
                                                <PrinterIcon className="ml-2 h-4 w-4"/>
                                            </button>
                                            <button
                                                onClick={() => setLogModalOpen(true)}
                                                className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-white-700"
                                            >
                                                Logs
                                                <InformationCircleIcon className="ml-2 h-4 w-4"/>
                                            </button>
                                            {(order?.status === OrderStatus.ImpressionEvaluation || order?.status === OrderStatus.Modelling || order?.status === OrderStatus?.Placed) && (
                                                <button
                                                    onClick={() =>
                                                        router.push(`/edit-order?id=${order?.orderId}`)
                                                    }
                                                    className="inline-flex items-center ml-4 px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-white-700"
                                                >
                                                    Edit
                                                    <PencilIcon className="ml-2 h-4 w-4"/>
                                                </button>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="border-t border-gray-200 px-4 py-5 print:py-0 sm:p-0 print:mt-[-10px]">
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

                                <div
                                    className="py-4 sm:py-5 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-6 print:portrait:py-2">
                                    <dt className="text-sm font-medium text-gray-500">
                                        <span className="print:hidden">Due date</span>
                                        <span className="hidden print:block">
                      Due date :
                                            {order?.deliveryDetails?.urgent
                                                ? moment(order?.createdAt)
                                                    .add(1, 'days')
                                                    .format('DD-MM-YYYY')
                                                : moment(order?.createdAt)
                                                    .add(3, 'days')
                                                    .format('DD-MM-YYYY')}
                    </span>
                                    </dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-1 print:hidden">
                                        {order?.deliveryDetails?.urgent
                                            ? moment(order?.createdAt)
                                                .add(1, 'days')
                                                .format('DD-MM-YYYY')
                                            : moment(order?.createdAt)
                                                .add(3, 'days')
                                                .format('DD-MM-YYYY')}
                                    </dd>
                                </div>

                                <div
                                    className="py-4 sm:py-5 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-6 print:portrait:py-2">
                                    <dt className="text-sm font-medium text-gray-500">
                                        <span className="print:hidden"> Delivery Type</span>
                                        <span className="hidden print:block">
                      Delivery Type :{' '}
                                            {order?.deliveryDetails?.urgent ? 'Urgent' : 'Standard'}
                    </span>
                                    </dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-1 print:hidden">
                                        {order?.deliveryDetails?.urgent ? 'Urgent' : 'Standard'}
                                    </dd>
                                </div>

                                <div
                                    className="py-4 sm:py-5 grid grid-cols-1 sm:gap-4 sm:px-6 print:portrait:py-1 print:portrait:mt-[-8px]">
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
                                            orderDirection={order?.direction!}
                                        />
                                    </dd>
                                </div>
                                <div
                                    className="py-4 sm:py-5 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-6 print:portrait:hidden print:landscape:hidden ">
                                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                        <h2 className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                            Impressions
                                        </h2>

                                        <div className="grid grid-cols-2">
                                            {(order?.direction === OrderDirection.Left ||
                                                order?.direction === OrderDirection.Binaural) && (
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
                                                order?.direction === OrderDirection.Binaural) && (
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
                                <div
                                    className="py-4 sm:py-5 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-6 print:landscape:hidden print:portrait:hidden ">
                                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                        <h2 className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                            Model Files
                                        </h2>
                                        <div className="grid grid-cols-2">
                                            {(order?.direction === OrderDirection.Left ||
                                                order?.direction === OrderDirection.Binaural) && (
                                                <div className="col-span-1 relative">
                                                    {order?.product?.left?.model! !== '' &&
                                                    order?.product?.left?.model ? (
                                                        <div>
                                                            {
                                                                //@ts-ignore
                                                                (meData?.me.user.role === UserRole.Technician ||
                                                                    //@ts-ignore

                                                                    meData?.me.user.role === UserRole.Admin) && (
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
                                                order?.direction === OrderDirection.Binaural) && (
                                                <div className="col-span-1 relative">
                                                    {order?.product?.right?.model! !== '' &&
                                                    order?.product?.right?.model ? (
                                                        <div>
                                                            {
                                                                //@ts-ignore
                                                                (meData?.me.user.role === UserRole.Technician ||
                                                                    //@ts-ignore
                                                                    meData?.me.user.role === UserRole.Admin) && (
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
                {order && order?.logs && (
                    <LogModal
                        logs={order?.logs}
                        open={logModalOpen}
                        setOpen={setLogModalOpen}
                    />
                )}
            </Wrapper>
            <Footer/>
        </React.Fragment>
    );
};

export default Index;
