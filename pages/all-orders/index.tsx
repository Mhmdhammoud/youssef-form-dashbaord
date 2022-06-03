import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import { Footer, Header, Notification, Wrapper } from '../../components'
import {
  Order,
  OrderStatus,
  OrderType,
  Sorting,
  useGetAllCompaniesQuery,
  useGetAllOrdersLazyQuery,
} from '../../src/generated/graphql'
import moment from 'moment'
import toUpperFirst from '../../utils/ToUpperFirst'
import { withRouter } from '../../hoc'
import { handleError } from '../../utils'
import {
  ArrowNarrowLeftIcon,
  ArrowNarrowRightIcon,
  TrashIcon,
} from '@heroicons/react/outline'

const Index = () => {
  const refScanner = useRef()
  const router = useRouter()
  const [value, setValue] = useState()
  const [newPage, setNewPage] = useState<number>(0)
  const [notificationOpen, setNotificationOpen] = useState<boolean>(false)
  const [hasMore, setHasMore] = useState<boolean>(false)
  const [allOrders, setAllOrders] = useState<Order[]>([])
  const [selectedCompany, setSelectedCompany] = useState<string>('All')
  const { page } = router.query
  const [selectedOrderType, setSelectedOrderType] = useState<string>('All')
  const [pageNumbers, setPageNumbers] = useState<number[]>([])
  const [productsPerPage, setProductsPerPage] = useState(10)
  const [filteredProducts, setFilteredProducts] = useState<Order[]>([])

  const indexOfLastProduct = newPage * productsPerPage
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage

  useEffect(() => {
    setFilteredProducts(
      allOrders?.slice(indexOfFirstProduct, indexOfLastProduct)!
    )
    const pageNumbers: number[] = []
    for (
      let i: number = 1;
      i <= Math.ceil(allOrders?.length! / productsPerPage);
      i++
    ) {
      pageNumbers.push(i)
    }
    setPageNumbers(pageNumbers)
  }, [allOrders, indexOfFirstProduct, indexOfLastProduct, productsPerPage])

  useEffect(() => {
    setNewPage(Number(page))

    return () => {
      setNewPage(Number(page))
    }
  }, [page])

  const [fetchOrders, { data, loading, refetch }] = useGetAllOrdersLazyQuery({})

  const fetchOrdersHelper = useCallback(() => {
    fetchOrders({
      variables: {
        limit: 999999,
        page: 0,
      },
    })
      .then(({ data }) => {
        const hasMoreHolder = data?.getAllOrders?.hasMore
        setHasMore(!hasMoreHolder ? false : true)
        const allOrdersHolder = data?.getAllOrders.orders
        setAllOrders(!allOrdersHolder ? [] : (allOrdersHolder as Order[]))
      })
      .catch(handleError)
  }, [fetchOrders])

  useEffect(() => {
    fetchOrdersHelper()
    return () => fetchOrdersHelper()
  }, [fetchOrders, fetchOrdersHelper, newPage])

  const { data: AllCompaniesData } = useGetAllCompaniesQuery({
    variables: {
      limit: 9999,
      page: 0,
      sort: Sorting.Desc,
    },
  })
  const allCompanies = AllCompaniesData?.getAllCompanies.companies

  const handleFilterOrders = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      setSelectedCompany(event.target.value)
      if (event.target.value === 'All') {
        refetch()
          .then(({ data }) => {
            const hasMoreHolder = data?.getAllOrders?.hasMore
            setHasMore(!hasMoreHolder ? false : true)
            const allOrdersHolder = data?.getAllOrders.orders
            setAllOrders(!allOrdersHolder ? [] : (allOrdersHolder as Order[]))
          })
          .catch(handleError)
      } else {
        refetch()
          .then(({ data }) => {
            const hasMoreHolder = data?.getAllOrders?.hasMore
            setHasMore(!hasMoreHolder ? false : true)
            const allOrdersHolder = data?.getAllOrders.orders
            setAllOrders(
              !allOrdersHolder
                ? []
                : (allOrdersHolder.filter(
                    (item) => item?.company?._id === event.target.value
                  ) as Order[])
            )
            console.log(allOrdersHolder)
          })
          .catch(handleError)
      }
    },
    [refetch]
  )
  const handleFilterOrdersType = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      setSelectedOrderType(event.target.value)
      if (event.target.value === 'All') {
        refetch()
          .then(({ data }) => {
            const hasMoreHolder = data?.getAllOrders?.hasMore
            setHasMore(!hasMoreHolder ? false : true)
            const allOrdersHolder = data?.getAllOrders.orders
            setAllOrders(
              !allOrdersHolder
                ? []
                : selectedCompany === 'All'
                ? (allOrdersHolder as Order[])
                : (allOrdersHolder.filter(
                    (item) => item?.company?._id === selectedCompany
                  ) as Order[])
            )
          })
          .catch(handleError)
      } else {
        refetch()
          .then(({ data }) => {
            const hasMoreHolder = data?.getAllOrders?.hasMore
            setHasMore(!hasMoreHolder ? false : true)
            const allOrdersHolder = data?.getAllOrders.orders
            console.log('handleFilterOrdersType', allOrdersHolder)
            setAllOrders(
              !allOrdersHolder
                ? []
                : selectedCompany === 'All'
                ? (allOrdersHolder.filter(
                    (item) => item?.orderType === OrderType[event.target.value]
                  ) as Order[])
                : (allOrdersHolder.filter(
                    (item) =>
                      item?.orderType === OrderType[event.target.value] &&
                      item?.company?._id === selectedCompany
                  ) as Order[])
            )
          })
          .catch(handleError)
      }
    },
    [refetch, selectedCompany]
  )

  const handleClearOption = useCallback(() => {
    setSelectedCompany('All')
    setSelectedOrderType('All')

    fetchOrdersHelper()
  }, [fetchOrdersHelper])

  return (
    <React.Fragment>
      <Header />
      <Wrapper loading={loading}>
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-4xl pb-20 lg:max-w-[1600px]">
          <div
            className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8 "
            style={{
              minHeight: '70vh',
            }}
          >
            <div className="py-2 align-middle flex items-center min-w-full sm:px-6 lg:px-8 space-x-2 justify-between">
              <div>
                <button
                  onClick={() => {
                    //@ts-ignore
                    refScanner.current.focus()
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
                    setValue(e.target.value)
                  }}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      router.push(`/order?id=${value}`)
                    }
                  }}
                  className="p-2 shadow-sm text-base focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md ml-6"
                  placeholder={'Search for order'}
                />
              </div>
              <div className="flex items-center justify-between space-x-2">
                <select
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                  defaultValue="All"
                  onChange={handleFilterOrdersType}
                  value={selectedOrderType}
                >
                  <option value="All">All</option>
                  {Object.keys(OrderType).map((item) => {
                    return (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    )
                  })}
                </select>
                <select
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                  value={selectedCompany}
                  onChange={handleFilterOrders}
                >
                  <option value="All">All</option>
                  {allCompanies?.map((item) => {
                    return (
                      <option key={item._id} value={item._id}>
                        {item.title}
                      </option>
                    )
                  })}
                </select>
                <button
                  type="submit"
                  className={
                    'group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white  hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 bg-indigo-600'
                  }
                  onClick={handleClearOption}
                >
                  <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                    <TrashIcon
                      className="h-5 w-5 text-white group-hover:text-indigo-400"
                      aria-hidden="true"
                    />
                  </span>
                  Clear
                </button>
              </div>
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
                          Company
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
                        <th scope="col" className="relative px-6 py-3" />
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredProducts?.map((order, index) => (
                        <tr key={index}>
                          <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium text-gray-900">
                            {order?.orderId?.split('order_')[1]!}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">
                            <span
                              className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                order?.status === OrderStatus.Canceled
                                  ? 'bg-red-200 text-red-800'
                                  : 'bg-green-200 text-green-800'
                              }`}
                            >
                              {order?.status.toUpperFirst()}
                            </span>
                          </td>

                          <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">
                            {order?.remake && 'R'}
                          </td>

                          <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">
                            {toUpperFirst(order?.orderType)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">
                            {order?.creator?.fullName}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">
                            {order?.company?.title}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">
                            {moment(order?.createdAt).format(
                              'DD/MM/YYYY hh:mm A'
                            )}
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

              {filteredProducts && filteredProducts?.length > 0 && (
                <nav className="border-t border-gray-200 px-4 flex items-center justify-between sm:px-0 mt-12">
                  <div className="-mt-px w-0 flex-1 flex">
                    {parseInt(page as string) > 1 && (
                      <button
                        onClick={() =>
                          router.push(`/all-orders?page=${newPage - 1}`)
                        }
                        className="border-t-2 border-transparent pt-4 pr-1 inline-flex items-center text-sm font-medium text-indigo-500 hover:text-indigo-700 hover:border-indigo-300 cursor-pointer"
                      >
                        <ArrowNarrowLeftIcon
                          className="mr-3 h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                        Previous
                      </button>
                    )}
                  </div>
                  <div className="hidden md:-mt-px md:flex">
                    {pageNumbers.map((page, index) => {
                      return (
                        <a
                          role="button"
                          key={index}
                          className={
                            newPage === index + 1
                              ? 'border-transparent text-indigo-500 hover:text-indigo-700 hover:border-indigo-300 border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium cursor-pointer'
                              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium cursor-pointer'
                          }
                          onClick={() =>
                            router.push(`/all-orders?page=${index + 1}`)
                          }
                        >
                          {index + 1}
                        </a>
                      )
                    })}
                  </div>
                  <div className="-mt-px w-0 flex-1 flex justify-end">
                    {parseInt(page as string) < pageNumbers.length && (
                      <button
                        onClick={() =>
                          router.push(`/all-orders?page=${newPage + 1}`)
                        }
                        className="border-t-2 border-transparent pt-4 pl-1 inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-700 hover:border-indigo-500 cursor-pointer"
                      >
                        Next
                        <ArrowNarrowRightIcon
                          className="ml-3 h-5 w-5 text-indigo-500"
                          aria-hidden="true"
                        />
                      </button>
                    )}
                  </div>
                </nav>
              )}
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
  )
}

export default withRouter(Index)
