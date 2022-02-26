import React, { useCallback, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { Header, Footer, Wrapper, Notification } from '../../components';
import {
  AllOrdersResponse,
  GetAllOrdersQuery,
  OrderCategory,
  useGetAllOrdersQuery,
  useMeQuery,
  UserRole,
} from '../../src/generated/graphql';
import Link from 'next/link';

import moment from 'moment';

const Index = () => {
  const refScanner = useRef();
  const router = useRouter();
  const [value, setValue] = useState();
  const [page, setPage] = useState<number>(0);
  const [notificationOpen, setNotificationOpen] = useState<boolean>(false);
  const [ConfirmationModalOpen, setConfirmationModalOpen] =
    useState<boolean>(false);

  const [selectedOrderId, setSelectedOrderId] = useState<string>('');

  const { data: meData, loading: meLoading } = useMeQuery();

  const { data, refetch, loading, error } = useGetAllOrdersQuery({
    variables: {
      orderCategory: OrderCategory.All,
      limit: 10,
      page: page,
    },
  });

  const hasMore = data?.getAllOrders?.hasMore;
  const allOrders = data?.getAllOrders;
  const me = meData?.me?.user;

  return (
    <React.Fragment>
      <Header />
      <Wrapper loading={loading}>
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-4xl pb-20 lg:max-w-7xl">
          <div
            className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8 "
            style={{
              minHeight: '70vh',
            }}
          >
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <button
                onClick={() => {
                  //@ts-ignore
                  refScanner.current.focus();
                }}
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Scan
              </button>
              <input
                //@ts-ignore
                ref={refScanner}
                autoComplete="nope"
                onChange={(e) => {
                  //@ts-ignore
                  setValue(e.target.value);
                }}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    router.push(`/order?id=${value}`);
                  }
                }}
                className="p-2 shadow-sm text-base focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md ml-6"
                placeholder={'Search for order'}
              />
            </div>

            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <Wrapper loading={loading}>
                <div
                  className="shadow border-b border-gray-200 sm:rounded-lg"
                  style={{ minHeight: '70vh' }}
                >
                  <table className="min-w-full mdivide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Order ID
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Status
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Remake
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Type
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Creator
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Created At
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Due Date
                        </th>

                        <th scope="col" className="relative px-6 py-3" />
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {allOrders?.orders?.map((order, index) => (
                        <tr key={index}>
                          <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium text-gray-900">
                            {order?.orderId?.split('order_')[1]!}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">
                            <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-200 text-green-800">
                              {order?.status.charAt(0).toUpperCase() +
                                order?.status
                                  .slice(1)
                                  .toLocaleLowerCase()
                                  .replace(/_/g, ' ')}
                            </span>
                          </td>

                          <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">
                            {order?.remake && 'R'}
                          </td>

                          <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">
                            {order?.orderType}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">
                            {order?.creator?.fullName}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">
                            {moment(order?.createdAt).format('DD/MM/YYYY')}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">
                            {order?.deliveryDetails?.urgent
                              ? moment(order?.createdAt)
                                  .add(1, 'days')
                                  .format('DD-MM-YYYY')
                              : moment(order?.createdAt)
                                  .add(3, 'days')
                                  .format('DD-MM-YYYY')}
                          </td>

                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button
                              onClick={() =>
                                router.push(
                                  `/order?id=${order?.orderId?.split(
                                    'order_'
                                  )[1]!}`
                                )
                              }
                            >
                              <a className="text-indigo-600 hover:text-indigo-900">
                                View
                              </a>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Wrapper>

              <nav
                className="bg-white py-3 flex items-center justify-between border-t border-gray-200"
                aria-label="Pagination"
              >
                <div className="hidden sm:block">
                  <p className="text-sm text-gray-700">
                    Showing{' '}
                    <span className="font-medium">
                      {allOrders?.orders?.length}
                    </span>{' '}
                    of <span className="font-medium">{allOrders?.length}</span>{' '}
                    results
                  </p>
                </div>
                <div className="flex-1 flex justify-between sm:justify-end">
                  {page > 0 && (
                    <a
                      onClick={() =>
                        setPage((prevState) => {
                          return prevState - 1;
                        })
                      }
                      className="cursor-pointer relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                    >
                      Previous
                    </a>
                  )}

                  {hasMore && (
                    <a
                      onClick={() =>
                        setPage((prevState) => {
                          return prevState + 1;
                        })
                      }
                      className="cursor-pointer ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                    >
                      Next
                    </a>
                  )}
                </div>
              </nav>
            </div>
          </div>
        </div>
        <Notification
          message="Order successfully placed"
          title="Success"
          open={notificationOpen}
          setOpen={setNotificationOpen}
        />
      </Wrapper>

      <Footer />
    </React.Fragment>
  );
};

export default Index;
