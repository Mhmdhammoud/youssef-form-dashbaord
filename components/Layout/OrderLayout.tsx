import React, { useEffect, useState } from 'react'
import classnames from 'classnames'

interface IContainerProps {
  children: React.ReactNode
  title: string
  cols: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
  item?: boolean
}

interface IItemProps {
  children: React.ReactNode
  shadow?: boolean
  style?: any
  className?: string
  onClick?: (event: React.MouseEvent) => void
}

const Container = (props: IContainerProps) => {
  const { children, title, cols, item = false } = props
  const [titleClasses, setTitleClasses] = useState<string>(
    classnames('text-center text-white py-2', !item && 'bg-indigo-600')
  )
  const [containerClasses, setContainerClasses] = useState<string>(
    classnames(
      `w-full grid grid-cols-${cols}`,
      !item && 'border-indigo-600 border-2'
    )
  )
  // useEffect(() => {
  // 	setTitleClasses(
  // 		classnames('text-center text-white py-2', !item && 'bg-indigo-600')
  // 	)
  // 	setContainerClasses(
  // 		classnames(`w-full columns-${cols}`, !item && 'border-indigo-600 border-2')
  // 	)
  // }, [])

  return (
    <div className="py-2">
      <h2 className={titleClasses}>{title}</h2>
      <div className={containerClasses}>{children}</div>
    </div>
  )
}
const Item = function (props: IItemProps) {
  const { children, shadow = false, style, className, ...restProps } = props
  const classes = classnames(`rounded-lg p-2`, className, shadow && 'shadow')
  return (
    <div className={classes} style={style} {...restProps}>
      {children}
    </div>
  )
}
Container.Item = Item
export default Container
