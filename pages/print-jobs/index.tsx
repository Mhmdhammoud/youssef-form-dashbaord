import React, { useCallback, useState } from 'react'
import { Footer, Header, Select, Wrapper } from '../../components'
import { withRouter } from '../../hoc'
import {
  Sorting,
  useGetAllCompaniesQuery,
  Company,
} from '../../src/generated/graphql'

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
  const handleChangeCompany = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      setSelectedCompanyId(event.target.value)
    },
    []
  )

  return (
    <React.Fragment>
      <Header />
      <Wrapper loading={loading}>
        <div className="h-screen max-w-6xl m-auto">
          <Select
            options={allCompanies?.map((item) => item.title) || []}
            value={selectedCompanyId}
            onChange={handleChangeCompany}
            id="company-select"
          />
        </div>
      </Wrapper>
      <Footer />
    </React.Fragment>
  )
}

export default withRouter(Index)
