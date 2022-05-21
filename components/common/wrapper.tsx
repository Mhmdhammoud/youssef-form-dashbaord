import React from 'react'
import classnames from 'classnames'

interface IProps {
  loading?: boolean
  children?: React.ReactNode
  classes?: string
  full?: boolean
  [x: string]: any
  color?: 'white' | 'indigo'
}

const Wrapper: React.FC<IProps> = (props) => {
  const {
    loading,
    children,
    classes,
    full = true,
    color = 'indigo',
    ...restProp
  } = props
  if (loading) {
    return (
      <div
        className={classnames(
          'flex justify-center items-center',
          full ? ' h-screen' : ''
        )}
      >
        <div
          className={`animate-spin rounded-full h-8 w-8 border-b-2 ${
            color === 'indigo' ? 'border-indigo-500' : 'border-white'
          } ${classes}  my-5`}
        />
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
