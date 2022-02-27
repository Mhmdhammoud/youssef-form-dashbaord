import React, { useCallback } from 'react';
import { Wrapper, Footer, Header } from '../../components';
import {
  useGetAllAdminsQuery,
  useToggleActivateMutation,
} from '../../src/generated/graphql';
import moment from 'moment';

const Index = () => {
  const [page, setPage] = React.useState<number>(0);
  const [selectedAdmin, setSelectedAdmin] = React.useState<string>('');
  const { data, loading, error, refetch } = useGetAllAdminsQuery({
    variables: {
      limit: 10,
      page: page,
    },
  });

  const [submit, { loading: loadingSubmit }] = useToggleActivateMutation();

  const allAdmins = data?.getAllAdmins?.admins;
  const hasMore = data?.getAllAdmins?.hasMore;
  console.log(data?.getAllAdmins?.admins);

  const fixString = (str: string) => {
    return (
      str.charAt(0).toUpperCase() +
      str.slice(1).toLocaleLowerCase().replace(/_/g, ' ')
    );
  };

  const handleToggle = useCallback(
    (id: string) => {
      submit({
        variables: {
          adminId: id,
        },
      }).then(() => {
        refetch();
      });
    },
    [refetch, submit]
  );

  return (
    <div>
      <Header />
      <Wrapper
        loading={loading}
        classes="mt-8 sm:mx-auto sm:w-full sm:max-w-4xl pb-20 lg:max-w-7xl"
      >
        <div className="flex flex-col">
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
                        Role
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
                        ID
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Created At
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      ></th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {allAdmins?.map((person, index) => (
                      <tr key={person.email}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div>
                              <div className="text-sm font-medium text-gray-900">
                                {person.fullName}
                              </div>
                              <div className="text-sm text-gray-500">
                                {person.email}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {fixString(person.role)}
                          </div>
                          <div className="text-sm text-gray-500">
                            {person.isActive}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={
                              person?.isActive
                                ? 'px-2 inline-flex text-sm leading-5 font-semibold rounded-full bg-green-100 text-green-800'
                                : 'px-2 inline-flex text-sm leading-5 font-semibold rounded-full bg-red-100 text-red-800'
                            }
                          >
                            {person?.isActive ? 'Active' : 'Inactive'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {person.adminId.split('_')[1]}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {moment(person.createdAt).format('DD/MM/YYYY')}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <span
                            onClick={() => handleToggle(person._id)}
                            className="text-indigo-600 hover:text-indigo-900 cursor-pointer"
                          >
                            {person.isActive ? 'Deactivate' : 'Activate'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <nav
            className="bg-white py-3 flex items-center justify-between border-t border-gray-200"
            aria-label="Pagination"
          >
            <div className="hidden sm:block">
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">{allAdmins?.length}</span>{' '}
                of{' '}
                <span className="font-medium">
                  {data?.getAllAdmins?.length}
                </span>{' '}
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
      </Wrapper>
      <Footer />
    </div>
  );
};

export default Index;
