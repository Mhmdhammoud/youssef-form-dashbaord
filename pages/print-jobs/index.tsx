import React, { useCallback, useState } from 'react'
import { Footer, Header, OrderLayout, Select, Wrapper } from '../../components'
import { withRouter } from '../../hoc'
import {
  Sorting,
  useGetAllCompaniesQuery,
  Company,
  useGetPrintJobsLazyQuery,
  PrintJob,
  useGetAllPrintJobsLazyQuery,
} from '../../src/generated/graphql'
import { handleError } from '../../utils'
import { PlusIcon } from '@heroicons/react/solid'
const Index = () => {
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
  const handleChangeCompany = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      setSelectedCompanyId(event.target.value)
      const companyId = allCompanies?.find(
        (item) => item.title === event.target.value
      )?._id
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
        </div>
      </Wrapper>
      <Footer />
    </React.Fragment>
  )
}

export default withRouter(Index)
