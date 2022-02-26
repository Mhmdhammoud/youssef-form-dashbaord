import React, { Fragment, useCallback, useEffect, useState } from 'react';
import { Header, Footer, Wrapper } from '../../components/';
import {
  useGetAllCompaniesQuery,
  useMeQuery,
  UserRole,
} from '../../src/generated/graphql';
import { AllCountries } from '../../data';
import moment from 'moment';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Index = () => {
  const [hidden, setHidden] = useState<boolean>(true);
  const [notificationOpen, setNotificationOpen] = useState<boolean>(false);
  const [page, setPage] = useState<number>(0);
  const [paginationPages, setPaginationPages] = useState({
    totalItems: 0,
    currentPage: 0,
    pageSize: 0,
    totalPages: 0,
    startPage: 0,
    endPage: 0,
    startIndex: 0,
    endIndex: 0,
    pages: [0],
  });
  const { data, loading, error, refetch } = useGetAllCompaniesQuery({
    variables: {
      limit: 10,
      page: page,
    },
  });
  const { data: meData } = useMeQuery();
  const userRole = meData?.me?.user?.role;
  const companies = data?.getAllCompanies;
  const hasMore = companies?.hasMore;
  const router = useRouter();

  return (
    <Fragment>
      <Header />
      <Wrapper
        loading={loading}
        classes="mt-8 sm:mx-auto sm:w-full sm:max-w-4xl pb-20 lg:max-w-7xl"
      >
        <div className="flex flex-col">
          {userRole === UserRole.Super && (
            <div className="flex justify-end my-3">
              <button
                onClick={() => router.push('/create-company')}
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Add Company
              </button>
            </div>
          )}

          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Name
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Contact Name
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Contact Email
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Contact Phone Number
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Created At
                      </th>
                      <th scope="col" className="relative px-6 py-3">
                        <span className="sr-only">Edit</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {companies?.companies?.map((item, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {item?.title}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {item?.contactPerson?.fullName}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {item?.contactPerson?.email}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {item?.contactPerson?.phoneNumber}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {moment(item?.createdAt).format('DD/MM/YYYY')}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <Link href={`/company/?id=${item?.companyId}`}>
                            <a className="text-indigo-600 hover:text-indigo-900">
                              View
                            </a>
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <nav
                className="bg-white py-3 flex items-center justify-between border-t border-gray-200 "
                aria-label="Pagination"
              >
                <div className="hidden sm:block">
                  <p className="text-sm text-gray-700">
                    Showing{' '}
                    {/* <span className="font-medium">1</span> to{' '} */}
                    <span className="font-medium">
                      {companies?.companies?.length}
                    </span>{' '}
                    of <span className="font-medium">{companies?.length}</span>{' '}
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
        {/* <Notification
          open={notificationOpen}
          setOpen={setNotificationOpen}
          message="Company Created Successfully"
          title="Success"
        /> */}
      </Wrapper>

      <Footer />
    </Fragment>
  );
};
export default Index;
