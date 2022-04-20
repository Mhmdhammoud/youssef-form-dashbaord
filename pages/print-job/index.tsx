import { useRouter } from 'next/router'
import React from 'react'
import { withRouter } from '../../hoc'

const Index = () => {
  const router = useRouter()
  const { query } = router
  const print_id = query.print_id

  return <div>Index</div>
}

export default withRouter(Index)
