import React from 'react'
import classnames from 'classnames'
import {ColorModel} from '../../data/colors'

interface IProps {
	direction: 'left' | 'right' | 'binaural'
	id: string
	value?: string | number
	options: string[]
	hasNoDefaultOption?: boolean
	onChange: React.ChangeEventHandler<HTMLSelectElement>
	className?: string
	optionBackgrounds?: ColorModel[]
	selectStyles?: any
}

const Select: React.FC<IProps> = ({
	direction,
	id,
	value,
	options,
	onChange,
	className,
	optionBackgrounds,
	selectStyles,
	hasNoDefaultOption,
}) => {
	const classes = classnames(
		className,
		direction === 'left'
			? 'mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
			: direction === 'right'
			? 'mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm'
			: 'mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
	)

	return (
		<select
			id={id}
			onChange={onChange}
			className={classes}
			value={value}
			style={selectStyles}
		>
			{!hasNoDefaultOption && (
				<option selected hidden>
					Select an Option
				</option>
			)}
			{options?.map((option, index) => (
				<option
					key={index}
					value={option}
					style={{
						backgroundColor:
							optionBackgrounds &&
							//@ts-ignore
							optionBackgrounds?.find((item) => item?.label === option).color,
					}}
				>
					{option}
				</option>
			))}
		</select>
	)
}

export default Select
