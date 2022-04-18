import React from 'react'
import classnames from 'classnames'

interface IProps {
  loading?: boolean
  children?: React.ReactNode
  classes?: string
  full?: boolean
  [x: string]: any
}

const Wrapper: React.FC<IProps> = (props) => {
  const { loading, children, classes, full = true, ...restProp } = props
  if (loading) {
    return (
      <div
        className={classnames(
          'flex justify-center items-center',
          full ? ' h-screen' : ''
        )}
      >
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500 my-5" />
      </div>
    )
  }

  return (
    <div {...restProp} className={classnames('min-h-full p-0 m-0', classes)}>
      {children}
    </div>
  )
}

export default Wrapper
