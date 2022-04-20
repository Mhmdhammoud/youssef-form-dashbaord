import React, { useCallback, useState } from 'react'
import { Footer, Header, OrderLayout, Select, Wrapper } from '../../components'
import { withRouter } from '../../hoc'
import {
  Sorting,
  useGetAllCompaniesQuery,
  Company,
  useGetPrintJobsLazyQuery,
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
  const [fetchPrintJobs] = useGetPrintJobsLazyQuery()
  const [printOrders, setPrintOrders] = useState({})
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
        },
      })
        .then(({ data }) => {
          const orders = data?.getPrintJobs?.orders
          let colors = {}
          if (orders) {
            orders.map((item) => {
              const { product } = item
              const { left, right } = product
              console.log(item)
              if (item.material === 'fototec') {
                if (!colors[left.color]) {
                  colors = {
                    ...colors,
                    [left.color]: [left],
                  }
                } else {
                  colors[left.color] = [...colors[left.color], left]
                }
                if (!colors[right.color]) {
                  colors = {
                    ...colors,
                    [right.color]: [right],
                  }
                } else {
                  colors[right.color] = [...colors[right.color], right]
                }
              } else {
                const { left: castLeft, right: castRight } = product
                if (colors['cast']) {
                  colors = {
                    ...colors,
                    cast: [...colors['cast'], castLeft],
                  }
                  colors = {
                    ...colors,
                    cast: [...colors['cast'], castRight],
                  }
                } else {
                  colors = {
                    ...colors,
                    cast: [castLeft, castRight],
                  }
                }
              }
            })
          }
          setPrintOrders(colors)
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
          <OrderLayout item cols={4} title="">
            {selectedCompanyId &&
              Object.keys(printOrders).map((key) => {
                return (
                  <OrderLayout.Item key={key}>
                    <OrderLayout title={key} cols={4}>
                      {printOrders[key].map((item) => {
                        return (
                          <OrderLayout.Item key={item.shellId}>
                            {item.shellId}
                          </OrderLayout.Item>
                        )
                      })}
                    </OrderLayout>
                  </OrderLayout.Item>
                )
              })}
          </OrderLayout>
        </div>
      </Wrapper>
      <Footer />
    </React.Fragment>
  )
}

export default withRouter(Index)
