import {useRouter} from 'next/router'
import {AdminRole, useGetSingleAdminLazyQuery} from "../../src/generated/graphql";
import React, {useEffect} from "react";
import {Footer, Header, Wrapper} from "../../components";
import moment from "moment";
import {ToUpperFirst} from "../../utils";

const Index = () => {
    const router = useRouter()
    const {id} = router.query
    const [fetchAdmin, {data, loading, refetch}] = useGetSingleAdminLazyQuery()

    const admin = data?.getSingleAdmin?.admin;
    useEffect(() => {
        if (id) {
            fetchAdmin({
                variables: {
                    adminId: id as string
                },
            })
        }

    }, [fetchAdmin, id])
    return (
        <React.Fragment>
            <Header/>
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
                                            {admin?.adminId}
                                        </p>

                                        <p
                                            className={
                                                admin?.role === AdminRole?.Admin
                                                    ? 'px-2 mt-2 inline-flex text-sm leading-5 font-semibold rounded-full bg-fuchsia-100 text-fuchsia-800'
                                                    : admin?.role === AdminRole?.Technician
                                                        ? 'px-2 mt-2 inline-flex text-sm leading-5 font-semibold rounded-full bg-indigo-100 text-indigo-800'
                                                        : 'px-2 mt-2 inline-flex text-sm leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800'
                                            }
                                        >
                                            {ToUpperFirst(admin?.role)}
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-gray-600 text-sm font-semibold">
                                            Joined At {moment(admin?.createdAt).format('DD/MM/YYYY')}
                                        </p>
                                        <p
                                            className={
                                                admin?.isActive
                                                    ? 'px-2 inline-flex text-sm leading-5 font-semibold rounded-full bg-green-100 text-green-800'
                                                    : 'px-2 inline-flex text-sm leading-5 font-semibold rounded-full bg-red-100 text-red-800'
                                            }
                                        >
                                            {admin?.isActive ? 'Active' : 'Inactive'}
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
                                            value={admin?.fname}
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
                                            value={admin?.lname}
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
                                            value={admin?.email}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Wrapper>
            <Footer/>
        </React.Fragment>
    )
}
export default Index
