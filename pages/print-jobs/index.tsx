import { PlusIcon } from '@heroicons/react/solid'
import moment from 'moment'
import Link from 'next/link'
import React, { useCallback, useState } from 'react'
import {
  Footer,
  Header,
  PrintJobModal,
  Select,
  Wrapper,
} from '../../components'
import { withRouter } from '../../hoc'
import {
  PrintJob,
  Sorting,
  useGetAllCompaniesQuery,
  useGetAllPrintJobsLazyQuery,
} from '../../src/generated/graphql'
import { handleError } from '../../utils'

const Index = () => {
  const [page, setPage] = useState<number>(0)
  const [hasMore, setHasMore] = useState<boolean>(false)
  const [length, setLength] = useState<number>(0)
  const { data, loading, error } = useGetAllCompaniesQuery({
    variables: {
      page: 0,
      limit: 9999,
      sort: Sorting.Desc,
    },
  })

  const allCompanies = data?.getAllCompanies?.companies
  const [selectedCompanyId, setSelectedCompanyId] = useState<string>('')
  const [fetchPrintJobs] = useGetAllPrintJobsLazyQuery()
  const [allPrintJobs, setAllPrintJobs] = useState<PrintJob[]>([])
  const [printJobModalOpen, setPrintJobModalOpen] = useState<boolean>(false)

  const handleChangeCompany = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      const companyId = allCompanies?.find(
        (item) => item.title === event.target.value
      )?._id
      setSelectedCompanyId(companyId as string)
      if (!companyId) {
        return
      }
      fetchPrintJobs({
        variables: {
          company_id: companyId,
          page: 0,
          limit: 999,
          sort: Sorting.Desc,
        },
      })
        .then(({ data }) => {
          const printJobs = data?.getAllPrintJobs?.print_jobs
          setAllPrintJobs(printJobs as PrintJob[])
          setHasMore(data?.getAllPrintJobs?.hasMore ? true : false)
          setLength(data?.getAllPrintJobs?.length as number)
        })
        .catch(handleError)
    },
    [allCompanies, fetchPrintJobs]
  )
  const newPrintDisabled = Boolean(selectedCompanyId === '')

  return (
    <React.Fragment>
      <Header />
      <Wrapper loading={loading}>
        <div className="h-screen max-w-6xl m-auto mt-6">
          <div className="flex items-center justify-evenly space-x-2">
            <Select
              options={allCompanies?.map((item) => item.title) || []}
              value={selectedCompanyId}
              onChange={handleChangeCompany}
              id="company-select"
            />
            <button
              disabled={newPrintDisabled}
              type="submit"
              className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium
              rounded-md text-white  hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2
              focus:ring-indigo-500 ${
                newPrintDisabled ? 'bg-gray-600' : 'bg-indigo-600'
              }`}
              onClick={() => setPrintJobModalOpen(true)}
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <PlusIcon
                  className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                  aria-hidden="true"
                />
              </span>
              Print Job
            </button>
          </div>
          {/* Insert print jobs table here */}

          {allPrintJobs && allPrintJobs.length > 0 && (
            <div className="px-4 sm:px-6 lg:px-8 mt-8">
              <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                  <h1 className="text-xl font-semibold text-gray-900">
                    Print Jobs
                  </h1>
                  <p className="mt-2 text-sm text-gray-700">
                    A list of all print jobs in certain company including their
                    title, company name, creator and creation time.
                  </p>
                </div>
              </div>
              <div className="mt-8 flex flex-col">
                <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                  <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                    <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                      <table className="min-w-full divide-y divide-gray-300">
                        <thead className="bg-gray-50">
                          <tr>
                            <th
                              scope="col"
                              className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                            >
                              Print ID
                            </th>
                            <th
                              scope="col"
                              className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                            >
                              Title
                            </th>
                            <th
                              scope="col"
                              className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                            >
                              Company Name
                            </th>
                            <th
                              scope="col"
                              className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                            >
                              Creator
                            </th>

                            <th
                              scope="col"
                              className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                            >
                              Created At
                            </th>
                            <th
                              scope="col"
                              className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                            >
                              <span className="sr-only">Edit</span>
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white">
                          {allPrintJobs?.map((printJob, index) => (
                            <tr key={index}>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                {printJob?.printId}
                              </td>
                              <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                {printJob?.title}
                              </td>
                              <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                <Link
                                  href={`/company?id=${printJob?.company?.companyId}`}
                                >
                                  <a className="cursor-pointer text-indigo-500">
                                    {printJob?.company?.title}
                                  </a>
                                </Link>
                              </td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                <Link
                                  href={`/admin?id=${printJob?.creator?.adminId}`}
                                >
                                  <a className="cursor-pointer text-indigo-500">
                                    {printJob?.creator?.fullName}
                                  </a>
                                </Link>
                              </td>

                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                {moment(printJob?.createdAt).format(
                                  'DD/MM/YYYY hh:mm A'
                                )}
                              </td>
                              <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                <Link
                                  href={`/print-job?print_id=${printJob?.printId}`}
                                >
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
                  </div>
                </div>
              </div>
              <nav
                className="bg-white py-3 flex items-center justify-between border-t border-gray-200"
                aria-label="Pagination"
              >
                <div className="hidden sm:block">
                  <p className="text-sm text-gray-700">
                    Showing{' '}
                    <span className="font-medium">{allPrintJobs?.length}</span>{' '}
                    of <span className="font-medium">{length}</span> results
                  </p>
                </div>
                <div className="flex-1 flex justify-between sm:justify-end">
                  {page > 0 && (
                    <a
                      onClick={() =>
                        setPage((prevState) => {
                          return prevState - 1
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
                          return prevState + 1
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
          )}
        </div>
        <PrintJobModal
          open={printJobModalOpen}
          setOpen={setPrintJobModalOpen}
          companyId={selectedCompanyId}
        />
      </Wrapper>

      <Footer />
    </React.Fragment>
  )
}

export default withRouter(Index)
