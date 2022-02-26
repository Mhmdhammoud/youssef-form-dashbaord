import { Router } from 'next/router';
import React, { Fragment, useCallback, useEffect, useState } from 'react';
import { Header, Wrapper, Footer } from '../../components';
import { useRouter } from 'next/router';
import { useGetAllUsersQuery } from '../../src/generated/graphql';
const Index = () => {
  const [page, setPage] = useState<number>(0);

  const router = useRouter();

  const { data, loading, error, refetch } = useGetAllUsersQuery({
    variables: {
      limit: 10,
      page: page,
    },
  });

  const allUsers = data?.getAllUsers?.users;
  const usersData = data?.getAllUsers;
  const hasMore = data?.getAllUsers?.hasMore;

  return (
    <Fragment>
      <Header />
      <Wrapper
        loading={loading}
        classes="mt-8 sm:mx-auto sm:w-full sm:max-w-4xl pb-20 lg:max-w-7xl"
      >
        <div className="flex flex-col">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              {allUsers?.length! > 0 ? (
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
                          User ID
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Email
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Status
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Role
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {allUsers?.map((person, index) => (
                        <tr key={index}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {person.fullName}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {person.userId}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {person.email}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <span
                              className={`${
                                person.isActive
                                  ? 'px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-200 text-green-600'
                                  : 'px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-200 text-red-600'
                              }`}
                            >
                              {person.isActive ? 'Active' : 'Disabled'}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {person.role}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <h2 className="text-2xl text-center">No Users Available</h2>
              )}
              <nav
                className="bg-white py-3 flex items-center justify-between border-t border-gray-200"
                aria-label="Pagination"
              >
                <div className="hidden sm:block">
                  <p className="text-sm text-gray-700">
                    Showing{' '}
                    <span className="font-medium">{allUsers?.length}</span> of{' '}
                    <span className="font-medium">{usersData?.length}</span>{' '}
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
      </Wrapper>
      <Footer />
    </Fragment>
  );
};

export default Index;
