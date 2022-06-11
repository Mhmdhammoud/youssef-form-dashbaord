import React, { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { PencilAltIcon } from '@heroicons/react/solid'
import { Footer, Header, Notification, Wrapper } from '../../components'
import {
  OrderStatus,
  useEditCompanyMutation,
  useGetAllAdminsQuery,
  useGetAllOrdersQuery,
  useGetSingleCompanyQuery,
} from '../../src/generated/graphql'
import { AllCountries, AllManufacturers } from '../../data'
import moment from 'moment'
import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js'
import Link from 'next/link'
import { Bar } from 'react-chartjs-2'
import { withRouter } from '../../hoc'
import { PlusCircleIcon, XCircleIcon } from '@heroicons/react/outline'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  BarElement,
  Title,
  Tooltip,
  Legend
)
const Index = () => {
  const [editMode, setEditMode] = useState<boolean>(false)
  const [emails, setEmails] = useState('')
  const [notificationOpen, setNotificationOpen] = useState<boolean>(false)
  const [companyData, setCompanyData] = useState({
    canDownload: false,
    contactPerson: {
      fullName: '',
      email: '',
      phoneNumber: '',
      customerAccount: '',
    },
    manufacturers: [] as string[],
    country: '',
    postCode: '',
    street: '',
    title: '',
    assigned: [] as string[],
    contact_emails: [] as string[],
  })
  const labels = [
    'Checked',
    'Impression Evaluation',
    'Modeled',
    'Modelling',
    'Mounting',
    'Placed',
    'Printed',
    'Printing',
    'Shipped',
  ]
  const router = useRouter()
  const { id } = router.query

  const { data, loading, refetch, error } = useGetSingleCompanyQuery({
    variables: {
      companyId: id as string,
    },
  })
  const { data: AllAdminsData } = useGetAllAdminsQuery({
    variables: {
      page: 0,
      limit: 999,
    },
  })
  const AllAdmins = AllAdminsData?.getAllAdmins?.admins
  const company = data?.getCompany?.company

  const { data: ordersData } = useGetAllOrdersQuery({
    variables: {
      limit: 9999999,
      page: 0,
    },
  })

  const allOrders = ordersData?.getAllOrders?.orders?.filter(
    (item) => item?.company?.companyId === id
  )
  const CheckedOrders = allOrders?.filter(
    (item) => item?.status === OrderStatus.Checked
  ).length

  const ImpressionEvaluationOrders = allOrders?.filter(
    (item) => item?.status === OrderStatus.ImpressionEvaluation
  ).length

  const ModeledOrders = allOrders?.filter(
    (item) => item?.status === OrderStatus.Modeled
  ).length

  const ModellingOrders = allOrders?.filter(
    (item) => item?.status === OrderStatus.Modelling
  ).length

  const MountingOrders = allOrders?.filter(
    (item) => item?.status === OrderStatus.Mounted
  ).length

  const PlacedOrders = allOrders?.filter(
    (item) => item?.status === OrderStatus.Placed
  ).length

  const PrintedOrders = allOrders?.filter(
    (item) => item?.status === OrderStatus.Printed
  ).length

  const PrintingOrders = allOrders?.filter(
    (item) => item?.status === OrderStatus.Printing
  ).length
  const ShippedOrders = allOrders?.filter(
    (item) => item?.status === OrderStatus.Shipped
  ).length

  const barData = {
    labels,
    datasets: [
      {
        data: [
          CheckedOrders,
          ImpressionEvaluationOrders,
          ModeledOrders,
          ModellingOrders,
          MountingOrders,
          PlacedOrders,
          PrintedOrders,
          PrintingOrders,
          ShippedOrders,
        ],
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
          'rgb(255, 205, 86)',
          'rgb(65,105,225)',
          'rgb(144,238,144)',
          'rgb(238,130,238)',
          'rgb(255,127,80)',
          'rgb(139,0,139)',
          'rgb(244,164,96)',
        ],
        hoverOffset: 4,
      },
    ],
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        // position: 'bottom' as const,
        display: false,
      },
      title: {
        display: false,
        text: 'Orders Per Status',
      },
    },
  }

  const [submit, { data: DATA, loading: LOADING }] = useEditCompanyMutation()

  useEffect(() => {
    if (company) {
      setCompanyData({
        contactPerson: {
          fullName: company?.contactPerson?.fullName,
          email: company?.contactPerson?.email,
          phoneNumber: company?.contactPerson?.phoneNumber,
          customerAccount: company?.contactPerson?.customerAccount,
        },
        country: company?.country,
        postCode: company?.postCode,
        street: company?.street,
        canDownload: company?.canDownload!,
        title: company?.title,
        manufacturers: company?.manufacturers,
        contact_emails: company?.contact_emails!,
        assigned: company.assigned
          ? company?.assigned.map((item) => item._id)
          : [],
      })
    }
  }, [data, id, company])

  const handleChange = useCallback(
    (
      event:
        | React.ChangeEvent<HTMLInputElement>
        | React.ChangeEvent<HTMLSelectElement>
    ) => {
      setCompanyData((prevState) => ({
        ...prevState,
        [event.target.id]: event.target.value,
      }))
    },
    []
  )
  const handleManufacturersChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.checked) {
        setCompanyData((prevState) => ({
          ...prevState,
          manufacturers: [...prevState.manufacturers, event.target.value],
        }))
      } else {
        setCompanyData((prevState) => ({
          ...prevState,
          manufacturers: prevState.manufacturers.filter(
            (item) => item !== event.target.value
          ),
        }))
      }
    },
    []
  )
  const handleAssignedChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.checked) {
        setCompanyData((prevState) => ({
          ...prevState,
          assigned: [...prevState.assigned, event.target.value],
        }))
      } else {
        setCompanyData((prevState) => ({
          ...prevState,
          assigned: prevState.assigned.filter(
            (item) => item !== event.target.value
          ),
        }))
      }
    },
    []
  )

  const handleContactPersonChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setCompanyData((prevState) => ({
        ...prevState,
        contactPerson: {
          ...prevState.contactPerson,
          [event.target.id]: event.target.value,
        },
      }))
    },
    []
  )
  const handleCanDownloadChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.checked) {
        setCompanyData((prevState) => ({
          ...prevState,

          canDownload: true,
        }))
      } else {
        setCompanyData((prevState) => ({
          ...prevState,
          canDownload: false,
        }))
      }
    },
    []
  )
  const handleSubmit = useCallback(() => {
    setNotificationOpen(true)
    submit({
      variables: {
        _id: company?._id!,
        input: companyData,
      },
    })
      .then((res) => {
        setEditMode(false)
        refetch()
      })
      .finally(() => {
        setTimeout(() => {
          setNotificationOpen(false)
        }, 2000)
      })
  }, [companyData, submit, refetch, company?._id])

  const handleChangeContactEmails = useCallback(
    (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
      setCompanyData((prevState) => ({
        ...prevState,
        contact_emails: prevState?.contact_emails?.map((item, indx) => {
          if (index === indx) {
            return event?.target.value
          }
          return item
        }),
      }))
    },
    []
  )

  const addOption = useCallback(() => {
    setCompanyData((prevState) => ({
      ...prevState,
      contact_emails: [...prevState?.contact_emails, emails],
    }))
    setEmails('')
  }, [emails])

  const deleteEmail = useCallback((indexPlaceholder: number) => {
    setCompanyData((prevState) => ({
      ...prevState,
      contact_emails: prevState?.contact_emails.filter(
        (_, index) => index !== indexPlaceholder
      ),
    }))
  }, [])
  console.log(companyData)

  return (
    <React.Fragment>
      <Header />
      <Wrapper
        loading={loading}
        classes="my-8 sm:mx-auto sm:w-full sm:max-w-6xl"
      >
        <div className="sm:grid sm:grid-cols-2 sm:gap-4">
          <div className="col-span-1">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Company Information
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Detailed Information.
            </p>
          </div>
          <div
            className="flex col-span-1 justify-end cursor-pointer"
            onClick={() => setEditMode(!editMode)}
          >
            Edit
            <PencilAltIcon className="ml-2 h-6 w-6 text-indigo-500 cursor-pointer" />
          </div>
        </div>
        <div className="mt-5 border-t border-gray-200">
          <dl className="divide-y divide-gray-200">
            <div className="flex items-center py-4 sm:grid sm:py-5 sm:grid-cols-3 sm:gap-4">
              <dt className="text-sm font-medium text-gray-500">
                Company Name
              </dt>
              <dd className="mt-1 flex items-center text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                <span className="flex-grow">{company?.title}</span>
                {editMode && (
                  <span className="ml-4 flex-shrink-0">
                    <input
                      type="text"
                      autoComplete="nope"
                      name="title"
                      id="title"
                      value={companyData?.title}
                      onChange={handleChange}
                      className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                    />
                  </span>
                )}
              </dd>
            </div>

            <div className="flex items-center py-4 sm:grid sm:py-5 sm:grid-cols-3 sm:gap-4">
              <dt className="text-sm font-medium text-gray-500">
                Customer Account
              </dt>
              <dd className="mt-1 flex items-center text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                <span className="flex-grow">
                  {company?.contactPerson?.customerAccount}
                </span>
                {editMode && (
                  <span className="ml-4 flex-shrink-0">
                    <input
                      type="text"
                      name="customerAccount"
                      id="customerAccount"
                      autoComplete="nope"
                      value={companyData?.contactPerson?.customerAccount}
                      onChange={handleContactPersonChange}
                      className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                    />
                  </span>
                )}
              </dd>
            </div>
            <div className="flex items-center py-4 sm:grid sm:py-5 sm:grid-cols-3 sm:gap-4">
              <dt className="text-sm font-medium text-gray-500">
                Can Download
              </dt>
              <dd className="mt-1 flex items-center text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                <span className="flex-grow">
                  {company?.canDownload ? 'Yes' : 'No'}
                </span>
                {editMode && (
                  <span className="flex items-center">
                    <input
                      type="checkbox"
                      name="canDownload"
                      id="canDownload"
                      autoComplete="nope"
                      checked={companyData?.canDownload}
                      onChange={handleCanDownloadChange}
                      className="rounded-sm"
                    />
                    <label htmlFor="canDownload" className="ml-2">
                      Can Download
                    </label>
                  </span>
                )}
              </dd>
            </div>

            <div className="flex items-center py-4 sm:grid sm:py-5 sm:grid-cols-3 sm:gap-4">
              <dt className="text-sm font-medium text-gray-500">
                Manufacturers
              </dt>
              <dd className="mt-1 flex items-center text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {editMode ? (
                  <span className="flex flex-wrap">
                    {AllManufacturers?.map((item, index) => {
                      return (
                        <div
                          key={index}
                          className="py-2 pr-2 flex items-center flex-wrap"
                        >
                          <input
                            name={item}
                            className="rounded-sm"
                            type={'checkbox'}
                            id={item}
                            onChange={handleManufacturersChange}
                            defaultChecked={Boolean(
                              companyData?.manufacturers?.includes(item)
                            )}
                            value={item}
                          />
                          <label className="ml-2" htmlFor={item}>
                            {item}
                          </label>
                        </div>
                      )
                    })}
                  </span>
                ) : (
                  <span className="flex-grow">
                    {company?.manufacturers?.map((item, index) => {
                      return (
                        <span className="pr-2" key={index}>
                          {item}
                          {index !== company?.manufacturers?.length - 1 && ','}
                        </span>
                      )
                    })}
                  </span>
                )}
              </dd>
            </div>

            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
              <dt className="text-sm font-medium text-gray-500">Owner Name</dt>
              <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                <span className="flex-grow">
                  {company?.contactPerson?.fullName}
                </span>
                {editMode && (
                  <span className="ml-4 flex-shrink-0">
                    <input
                      type="text"
                      name="fullName"
                      id="fullName"
                      autoComplete="nope"
                      value={companyData?.contactPerson?.fullName}
                      onChange={handleContactPersonChange}
                      className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                    />
                  </span>
                )}
              </dd>
            </div>

            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
              <dt className="text-sm font-medium text-gray-500">Assigned to</dt>
              <dd className="mt-1 flex items-center text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {editMode ? (
                  <span className="flex flex-wrap">
                    {AllAdmins?.map((item, index) => {
                      return (
                        <div
                          key={index}
                          className="py-2 pr-2 flex items-center flex-wrap"
                        >
                          <input
                            name={item._id}
                            className="rounded-sm"
                            type={'checkbox'}
                            id={item._id}
                            onChange={handleAssignedChange}
                            defaultChecked={Boolean(
                              //@ts-ignore
                              companyData?.assigned?.includes(item._id)
                            )}
                            value={item._id}
                          />
                          <label className="ml-2" htmlFor={item._id}>
                            {item.fullName}
                          </label>
                        </div>
                      )
                    })}
                  </span>
                ) : (
                  <span className="flex-grow">
                    {company?.assigned?.map((item, index) => {
                      return (
                        <Link href={`/admin?id=${item.adminId}`} key={index}>
                          <a className="pr-2 text-blue-400">
                            {item.fullName}
                            {company?.assigned &&
                              index !== company?.assigned?.length - 1 &&
                              ','}
                          </a>
                        </Link>
                      )
                    })}
                  </span>
                )}
              </dd>
            </div>

            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
              <dt className="text-sm font-medium text-gray-500">
                Contact Emails
              </dt>
              <dd className="mt-1 flex items-center text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {editMode ? (
                  <div className="flex flex-wrap">
                    {companyData?.contact_emails?.map((item, index) => {
                      return (
                        <div
                          key={index}
                          className="py-2 pr-2 flex items-center flex-wrap"
                        >
                          <div className="relative">
                            <input
                              name={item}
                              type={'email'}
                              id={item}
                              className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                              onChange={(event) =>
                                handleChangeContactEmails(index, event)
                              }
                              // defaultChecked={Boolean(
                              //   //@ts-ignore
                              //   companyData?.assigned?.includes(item._id)
                              // )}
                              value={item}
                            />
                            <div
                              className="absolute cursor-pointer top-0 right-0"
                              onClick={() => deleteEmail(index)}
                            >
                              <div>
                                <XCircleIcon className="text-red-500 h-4 w-4" />
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                    <div
                      className="mt-5 cursor-pointer w-fit "
                      onClick={addOption}
                    >
                      <PlusCircleIcon className="text-indigo-500 h-5 w-5 " />
                    </div>
                  </div>
                ) : (
                  <span className="flex-grow">
                    {company?.contact_emails?.map((item, index) => {
                      return (
                        // <Link href={`/admin?id=${item.adminId}`} key={index}>
                        //   <a className="pr-2 text-blue-400">
                        //     {item.fullName}
                        //     {company?.assigned &&
                        //       index !== company?.assigned?.length - 1 &&
                        //       ','}
                        //   </a>
                        // </Link>
                        <React.Fragment key={index}>
                          <span className="pr-2">{item}</span>
                          <br />
                        </React.Fragment>
                      )
                    })}
                  </span>
                )}
              </dd>
            </div>

            <div className="py-4 sm:grid sm:py-5 sm:grid-cols-3 sm:gap-4">
              <dt className="text-sm font-medium text-gray-500">
                Phone Number
              </dt>
              <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                <span className="flex-grow">
                  {company?.contactPerson?.phoneNumber}
                </span>
                {editMode && (
                  <span className="ml-4 flex-shrink-0">
                    <input
                      type="text"
                      name="phoneNumber"
                      id="phoneNumber"
                      autoComplete="nope"
                      value={companyData?.contactPerson?.phoneNumber}
                      onChange={handleContactPersonChange}
                      className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                    />
                  </span>
                )}
              </dd>
            </div>
            <div className="py-4 sm:grid sm:py-5 sm:grid-cols-3 sm:gap-4">
              <dt className="text-sm font-medium text-gray-500">
                Email address
              </dt>
              <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                <span className="flex-grow">
                  {company?.contactPerson?.email}
                </span>
                {editMode && (
                  <span className="ml-4 flex-shrink-0">
                    <input
                      type="email"
                      name="email"
                      id="email"
                      autoComplete="nope"
                      value={companyData?.contactPerson?.email}
                      onChange={handleContactPersonChange}
                      className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                    />
                  </span>
                )}
              </dd>
            </div>
            <div className="py-4 sm:grid sm:py-5 sm:grid-cols-3 sm:gap-4">
              <dt className="text-sm font-medium text-gray-500">Country</dt>
              <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                <span className="flex-grow">
                  {
                    AllCountries.find((item) => item.code === company?.country)
                      ?.label
                  }
                </span>
                {editMode && (
                  <span className="ml-4 flex-shrink-0">
                    <select
                      id="country"
                      name="country"
                      autoComplete="nope"
                      className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      required
                      value={companyData?.country}
                      onChange={handleChange}
                    >
                      {AllCountries.map((item, index) => {
                        return (
                          <option key={index} value={item.code}>
                            {item.label}
                          </option>
                        )
                      })}
                    </select>
                  </span>
                )}
              </dd>
            </div>

            <div className="py-4 sm:grid sm:py-5 sm:grid-cols-3 sm:gap-4">
              <dt className="text-sm font-medium text-gray-500">Street</dt>
              <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                <span className="flex-grow">{company?.street}</span>
                {editMode && (
                  <span className="ml-4 flex-shrink-0">
                    <input
                      type="text"
                      name="street"
                      id="street"
                      autoComplete="nope"
                      value={companyData?.street}
                      onChange={handleChange}
                      className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                    />
                  </span>
                )}
              </dd>
            </div>

            <div className="py-4 sm:grid sm:py-5 sm:grid-cols-3 sm:gap-4">
              <dt className="text-sm font-medium text-gray-500">Postal Code</dt>
              <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                <span className="flex-grow">{company?.postCode}</span>
                {editMode && (
                  <span className="ml-4 flex-shrink-0">
                    <input
                      type="text"
                      name="postCode"
                      id="postCode"
                      autoComplete="nope"
                      value={companyData?.postCode}
                      onChange={handleChange}
                      className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                    />
                  </span>
                )}
              </dd>
            </div>

            <div className="py-4 sm:grid sm:py-5 sm:grid-cols-3 sm:gap-4">
              <dt className="text-sm font-medium text-gray-500">Created At</dt>
              <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                <span className="flex-grow">
                  {moment(company?.createdAt).format('DD/MM/YYYY')}
                </span>
              </dd>
            </div>
          </dl>
          {editMode && (
            <div className="flex justify-end my-5">
              <button
                onClick={handleSubmit}
                className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Save
              </button>
            </div>
          )}
        </div>

        <div className="flex flex-col py-2">
          <div className="">
            <h2 className="text-2xl text-gray-600 text-center pb-2">
              Company orders per status
            </h2>
            <Bar
              options={options}
              data={barData}
              className={'rounded-lg max-h-80 '}
            />
          </div>
        </div>

        <div className="flex flex-col">
          <h2 className="my-4 text-lg leading-6 font-medium text-gray-900">
            Company Users
          </h2>
          <h2 className="border-b border-gray-200 mb-2"></h2>
          {company?.employees && company?.employees?.length > 0 ? (
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
                          Email
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
                          Created At
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {company?.employees?.map((person, index) => (
                        <tr key={index}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {person.fullName}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {person.email}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {person.role}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {moment(person.createdAt).format('DD/MM/YYYY')}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center">
              <p className="text-gray-500">
                No users for ths company at the moment
              </p>
            </div>
          )}
        </div>
        <Notification
          message="Company updated successfully"
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
