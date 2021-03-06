import { useRouter } from 'next/router'
import React, { Fragment, useCallback, useState } from 'react'
import { Footer, Header, Notification, Wrapper } from '../../components'
import { AllCountries, AllManufacturers } from '../../data'
import {
  MutationCreateCompanyArgs,
  useCreateCompanyMutation,
  useGetAllAdminsQuery,
} from '../../src/generated/graphql'
import { withRouter } from '../../hoc'
import { MinusCircleIcon, PlusCircleIcon } from '@heroicons/react/outline'

const Index = () => {
  const [notificationOpen, setNotificationOpen] = useState<boolean>(false)
  const [confirmPassword, setConfirmPassword] = useState<string>('')
  const [company, setCompany] = useState<MutationCreateCompanyArgs>({
    admin: {
      email: '',
      fname: '',
      lname: '',
      password: '',
    },
    company: {
      contactPerson: {
        customerAccount: '',
        email: '',
        phoneNumber: '',
        fullName: '',
      },
      canDownload: false,
      manufacturers: [],
      country: '',
      postCode: '',
      street: '',
      title: '',
      assigned: [],
      contact_emails: [],
    },
  })

  const isDisabled = Boolean(
    company.admin.fname === '' ||
      company.admin.lname === '' ||
      company.admin.email === '' ||
      company.admin.password === '' ||
      company.admin.password !== confirmPassword ||
      company.company.contactPerson.fullName === '' ||
      company.company.contactPerson.email === '' ||
      company.company.contactPerson.phoneNumber === '' ||
      company.company.contactPerson.customerAccount === '' ||
      company.company.country === '' ||
      company.company.postCode === '' ||
      company.company.street === '' ||
      company.company.title === ''
  )
  const { data: AllAdminsData } = useGetAllAdminsQuery({
    variables: {
      page: 0,
      limit: 999,
    },
  })
  const AllAdmins = AllAdminsData?.getAllAdmins?.admins

  const router = useRouter()
  const [submit, { loading, data }] = useCreateCompanyMutation({
    variables: {
      admin: {
        ...company.admin,
      },
      company: {
        ...company.company,
      },
    },
  })
  const handleAdminsChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.checked) {
        setCompany((prevState) => ({
          ...prevState,
          company: {
            ...prevState.company,
            assigned: [...prevState.company.assigned, event.target.value],
          },
        }))
      } else {
        setCompany((prevState) => ({
          ...prevState,
          company: {
            ...prevState.company,
            assigned: prevState.company.assigned.filter(
              (item) => item !== event.target.value
            ),
          },
        }))
      }
    },
    []
  )

  const handleCanDownloadChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.checked) {
        setCompany((prevState) => ({
          ...prevState,
          company: {
            ...prevState.company,
            canDownload: true,
          },
        }))
      } else {
        setCompany((prevState) => ({
          ...prevState,
          company: {
            ...prevState.company,
            canDownload: false,
          },
        }))
      }
    },
    []
  )

  const handleSubmit = useCallback(
    (event: React.FormEvent) => {
      event.preventDefault()
      submit()
        .then((res) => {
          setNotificationOpen(true)
          router.push('/all-companies')
        })
        .catch((err) => {
          if (err?.response) console.log(err?.response?.data)
          else console.log(err)
        })
    },
    [router, submit]
  )

  const handleChangeConfirmPassword = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setConfirmPassword(event.target.value)
    },
    []
  )

  const handleCompanyChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setCompany((prevState) => ({
        ...prevState,
        company: {
          ...prevState.company,
          [event.target.id]: event.target.value,
        },
      }))
    },
    []
  )

  const handleManufacturersChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.checked) {
        setCompany((prevState) => ({
          ...prevState,
          company: {
            ...prevState.company,
            manufacturers: [
              ...prevState.company.manufacturers,
              event.target.value,
            ],
          },
        }))
      } else {
        setCompany((prevState) => ({
          ...prevState,
          company: {
            ...prevState.company,
            manufacturers: prevState.company.manufacturers.filter(
              (item) => item !== event.target.value
            ),
          },
        }))
      }
    },
    []
  )

  const handleAdminChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setCompany((prevState) => ({
        ...prevState,
        admin: {
          ...prevState.admin,
          [event.target.id]: event.target.value,
        },
      }))
    },
    []
  )

  const handleContactPersonChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setCompany((prevState) => ({
        ...prevState,
        company: {
          ...prevState.company,
          contactPerson: {
            ...prevState.company.contactPerson,
            [event.target.id]: event.target.value,
          },
        },
      }))
    },
    []
  )

  const handleCountryChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      setCompany((prevState) => ({
        ...prevState,
        company: {
          ...prevState.company,
          country: event.target.value,
        },
      }))
    },
    []
  )

  const [emails, setEmails] = useState('')

  const addOption = useCallback(() => {
    setCompany((prevState) => ({
      ...prevState,
      company: {
        ...prevState.company,
        contact_emails: [...prevState?.company?.contact_emails, emails],
      },
    }))
    setEmails('')
  }, [emails])

  const handleChangeEmailList = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
      setCompany((prevState) => ({
        ...prevState,
        company: {
          ...prevState.company,
          contact_emails: prevState?.company?.contact_emails.map(
            (item, itemIndx) => {
              if (index === itemIndx) {
                return event.target.value
              }
              return item
            }
          ),
        },
      }))
    },
    []
  )

  const deleteEmail = useCallback((indexPlaceholder: number) => {
    setCompany((prevState) => ({
      ...prevState,
      company: {
        ...prevState.company,
        contact_emails: prevState?.company?.contact_emails.filter(
          (_, index) => index !== indexPlaceholder
        ),
      },
    }))
  }, [])

  const handleEmailsChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setEmails(event?.target?.value)
    },
    []
  )

  return (
    <Fragment>
      <Header />
      <Wrapper
        loading={loading}
        classes="mt-8 sm:mx-auto sm:w-full sm:max-w-4xl pb-20 lg:max-w-7xl"
      >
        <div className="space-y-6">
          <form onSubmit={handleSubmit}>
            <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
              <div className="md:grid md:grid-cols-3 md:gap-6">
                <div className="md:col-span-1">
                  <h3 className="text-lg font-medium leading-6 text-gray-900">
                    Company Information
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Use a permanent address where you can receive mail.
                  </p>
                </div>
                <div className="mt-5 md:mt-0 md:col-span-2">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-6">
                      <label
                        htmlFor="title"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Company Title
                      </label>
                      <input
                        type="text"
                        name="title"
                        id="title"
                        autoComplete="nope"
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        required
                        value={company?.company?.title}
                        onChange={handleCompanyChange}
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-2">
                      <label
                        htmlFor="country"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Country
                      </label>
                      <select
                        id="country"
                        name="country"
                        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        required
                        value={company?.company?.country}
                        onChange={handleCountryChange}
                      >
                        <option selected hidden>
                          Kindly select a country
                        </option>

                        {AllCountries.map((item, index) => {
                          return (
                            <option key={index} value={item.code}>
                              {item.label}
                            </option>
                          )
                        })}
                      </select>
                    </div>

                    <div className="col-span-6 sm:col-span-2 lg:col-span-2">
                      <label
                        htmlFor="postCode"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Post Code
                      </label>
                      <input
                        type="text"
                        autoComplete="nope"
                        name="postCode"
                        id="postCode"
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        required
                        value={company?.company?.postCode}
                        onChange={handleCompanyChange}
                      />
                    </div>
                    <div className="col-span-6 sm:col-span-2">
                      <label
                        htmlFor="street-address"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Street
                      </label>
                      <input
                        autoComplete="nope"
                        type="text"
                        name="street"
                        id="street"
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        required
                        value={company?.company?.street}
                        onChange={handleCompanyChange}
                      />
                    </div>
                    <div className="col-span-6 sm:col-span-6">
                      <label
                        htmlFor="street-address"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Manufacturers
                      </label>
                      <div className="flex flex-wrap items-center">
                        {AllManufacturers?.map((item, index) => {
                          return (
                            <div key={index} className="p-2 flex items-center">
                              <input
                                name={item}
                                className="rounded-sm"
                                type={'checkbox'}
                                id={item}
                                onChange={handleManufacturersChange}
                                defaultChecked={false}
                                value={item}
                              />
                              <label className="ml-2" htmlFor={item}>
                                {item}
                              </label>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                    <div className="col-span-6 sm:col-span-6">
                      <label
                        htmlFor="street-address"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Administrators
                      </label>
                      <div className="flex flex-wrap items-center">
                        {AllAdmins?.map((item, index) => {
                          return (
                            <div key={index} className="p-2 flex items-center">
                              <input
                                name={item._id}
                                className="rounded-sm"
                                type={'checkbox'}
                                id={item._id}
                                onChange={handleAdminsChange}
                                defaultChecked={false}
                                value={item._id}
                              />
                              <label className="ml-2" htmlFor={item._id}>
                                {item.fullName}
                              </label>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                    <div className="col-span-6 sm:col-span-6">
                      <label
                        htmlFor="street-address"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Download eligible
                      </label>
                      <div className="flex flex-wrap items-center">
                        <div className="p-2 flex items-center">
                          <input
                            name={'canDownload'}
                            className="rounded-sm"
                            type={'checkbox'}
                            id={'canDownload'}
                            onChange={handleCanDownloadChange}
                            defaultChecked={company?.company?.canDownload}
                          />
                          <label className="ml-2" htmlFor="canDownload">
                            Can download modal file
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="col-span-6 sm:col-span-6">
                      <hr />
                    </div>
                    <div className="col-span-6 sm:col-span-6">
                      <h3 className="text-lg font-medium leading-6 text-gray-900 border-b w-fit">
                        Contact Details
                      </h3>
                    </div>

                    <div className="col-span-2 sm:col-span-2">
                      <label
                        htmlFor="customerAccount"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Customer Account
                      </label>
                      <input
                        type="text"
                        name="customerAccount"
                        id="customerAccount"
                        autoComplete="nope"
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        required
                        value={company?.company?.contactPerson?.customerAccount}
                        onChange={handleContactPersonChange}
                      />
                    </div>
                    <div className="col-span-4 sm:col-span-4">
                      <label
                        htmlFor="fullName"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        id="fullName"
                        autoComplete="nope"
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        required
                        value={company?.company?.contactPerson?.fullName}
                        onChange={handleContactPersonChange}
                      />
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="email-address"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email-address"
                        autoComplete="nope"
                        id="email"
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        required
                        value={company?.company?.contactPerson?.email}
                        onChange={handleContactPersonChange}
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="phoneNumber"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Phone Number
                      </label>
                      <input
                        type="text"
                        name="phoneNumber"
                        autoComplete="nope"
                        id="phoneNumber"
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        required
                        value={company?.company?.contactPerson?.phoneNumber}
                        onChange={handleContactPersonChange}
                      />
                    </div>
                    <div className="col-span-6">
                      <div className="flex items-center justify-between w-full">
                        <div className="w-full">
                          <label
                            htmlFor="contact_emails"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Contact Emails
                          </label>
                          <input
                            type="email"
                            name="name"
                            id="name"
                            autoComplete="option-variant"
                            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                            value={emails}
                            onChange={handleEmailsChange}
                          />
                        </div>
                        {emails && (
                          <div
                            className="mt-5 cursor-pointer w-fit "
                            onClick={addOption}
                          >
                            <PlusCircleIcon className="text-indigo-500 h-5 w-5 " />
                          </div>
                        )}
                      </div>

                      {company?.company?.contact_emails?.map((item, index) => {
                        return (
                          <React.Fragment key={index}>
                            <div className="flex w-full items-center justify-between">
                              <div className="w-full">
                                <label
                                  htmlFor="name"
                                  className="block text-sm font-medium text-gray-700"
                                >
                                  Email #{index}
                                </label>
                                <div className="mt-1">
                                  <input
                                    type="email"
                                    name="name"
                                    id="name"
                                    required
                                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                    value={item}
                                    onChange={(event) =>
                                      handleChangeEmailList(event, index)
                                    }
                                  />
                                </div>
                              </div>

                              <div className="mt-1 flex w-full justify-between items-center space-x-1">
                                <div
                                  className="mt-5 cursor-pointer w-fit "
                                  onClick={() => deleteEmail(index)}
                                >
                                  <MinusCircleIcon className="text-red-500 h-5 w-5 " />
                                </div>
                              </div>
                            </div>
                          </React.Fragment>
                        )
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6 mt-6">
              <div className="md:grid md:grid-cols-3 md:gap-6">
                <div className="md:col-span-1">
                  <h3 className="text-lg font-medium leading-6 text-gray-900">
                    Admin Account
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    The following account will be the admin account for the
                    company
                  </p>
                </div>
                <div className="mt-5 md:mt-0 md:col-span-2">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="fname"
                        className="block text-sm font-medium text-gray-700"
                      >
                        First name
                      </label>
                      <input
                        type="text"
                        name="fname"
                        autoComplete="nope"
                        id="fname"
                        required
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        value={company?.admin?.fname}
                        onChange={handleAdminChange}
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="lname"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Last name
                      </label>
                      <input
                        type="text"
                        name="lname"
                        id="lname"
                        autoComplete="nope"
                        required
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        value={company?.admin?.lname}
                        onChange={handleAdminChange}
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-4">
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Email address
                      </label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        autoComplete="nope"
                        required
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        value={company?.admin?.email}
                        onChange={handleAdminChange}
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="password"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Password
                      </label>
                      <input
                        type="password"
                        name="password"
                        id="password"
                        autoComplete="nope"
                        required
                        minLength={6}
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        value={company?.admin?.password}
                        onChange={handleAdminChange}
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="password"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Confirm Password
                      </label>
                      <input
                        type="password"
                        name="confirm-password"
                        id="confirmPassword"
                        required
                        autoComplete="nope"
                        minLength={6}
                        value={confirmPassword}
                        onChange={handleChangeConfirmPassword}
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end mt-10">
                    <button
                      type="submit"
                      className={
                        isDisabled
                          ? 'inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 cursor-not-allowed'
                          : 'inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                      }
                      disabled={isDisabled}
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>

        <Notification
          open={notificationOpen}
          setOpen={setNotificationOpen}
          message="Company Created Successfully"
          title="Success"
        />
      </Wrapper>
      <Footer />
    </Fragment>
  )
}

export default withRouter(Index)
