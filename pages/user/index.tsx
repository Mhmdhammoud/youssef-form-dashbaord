import { useRouter } from 'next/router';
import React from 'react';
import { Header, Footer, Wrapper } from '../../components';
import { useGetUserQuery, UserRole } from '../../src/generated/graphql';
import moment from 'moment';
import { AllCountries } from '../../data';
const Index = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data, loading, error } = useGetUserQuery({
    variables: {
      userId: id as string,
    },
  });

  const user = data?.getUser?.user;

  console.log(user);
  return (
    <React.Fragment>
      <Header />
      <Wrapper
        loading={loading}
        classes="mt-8 sm:mx-auto sm:w-full sm:max-w-4xl pb-20 lg:max-w-5xl"
      >
        <div className="space-y-8 divide-y divide-gray-200">
          <div className="space-y-8 divide-y divide-gray-200">
            <div className="pt-8">
              <div>
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Personal Information
                </h3>
                <div className="flex justify-between">
                  <div>
                    <p className="text-gray-400 text-sm font-semibold">
                      {user?.userId}
                    </p>

                    <p
                      className={
                        user?.role === UserRole?.Admin
                          ? 'px-2 mt-2 inline-flex text-sm leading-5 font-semibold rounded-full bg-fuchsia-100 text-fuchsia-800'
                          : user?.role === UserRole?.Normal
                          ? 'px-2 mt-2 inline-flex text-sm leading-5 font-semibold rounded-full bg-indigo-100 text-indigo-800'
                          : 'px-2 mt-2 inline-flex text-sm leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800'
                      }
                    >
                      {user?.role}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-600 text-sm font-semibold">
                      Joined At {moment(user?.createdAt).format('DD/MM/YYYY')}
                    </p>
                    <p
                      className={
                        user?.isActive
                          ? 'px-2 inline-flex text-sm leading-5 font-semibold rounded-full bg-green-100 text-green-800'
                          : 'px-2 inline-flex text-sm leading-5 font-semibold rounded-full bg-red-100 text-red-800'
                      }
                    >
                      {user?.isActive ? 'Active' : 'Inactive'}
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <label
                    htmlFor="first-name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    First name
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="first-name"
                      id="first-name"
                      autoComplete="nope"
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      disabled
                      value={user?.fname}
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="last-name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Last name
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="last-name"
                      id="last-name"
                      autoComplete="nope"
                      disabled
                      value={user?.lname}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>

                <div className="sm:col-span-4">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email address
                  </label>
                  <div className="mt-1">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="nope"
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      disabled
                      value={user?.email}
                    />
                  </div>
                </div>

                <div className="sm:col-span-6">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Company Information
                  </h3>
                  <div className="flex justify-between">
                    <p className="text-gray-400 text-sm font-semibold">
                      {user?.company?.companyId}
                    </p>

                    <p className="text-gray-600 text-sm font-semibold">
                      Created At:{' '}
                      {moment(user?.company?.createdAt).format('DD/MM/YYYY')}
                    </p>
                  </div>
                </div>
                <div className="sm:col-span-4">
                  <label
                    htmlFor="region"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Title
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="region"
                      id="region"
                      autoComplete="nope"
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      disabled
                      value={user?.company?.title}
                    />
                  </div>
                </div>
                <div className="sm:col-span-3">
                  <label
                    htmlFor="country"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Country
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="street-address"
                      id="street-address"
                      autoComplete="nope"
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      value={
                        AllCountries.find(
                          (item) => item.code === user?.company?.country
                        )?.label
                      }
                      disabled
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="street-address"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Street address
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="street-address"
                      id="street-address"
                      autoComplete="nope"
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      value={user?.company?.street}
                      disabled
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="postal-code"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Postal code
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="postal-code"
                      id="postal-code"
                      autoComplete="nope"
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      disabled
                      value={user?.company?.postCode}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Wrapper>
      <Footer />
    </React.Fragment>
  );
};
export default Index;
