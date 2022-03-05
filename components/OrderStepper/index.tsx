import React, {useEffect, useState} from 'react'
import {OrderStatus} from '../../src/generated/graphql'

interface IProps {
    orderStatus: OrderStatus
}

const Index: React.FC<IProps> = (props) => {
    const {orderStatus} = props

    const [steps, setSteps] = useState([
        {id: 'Step 1', name: 'Placed', status: 'current'},
        {id: 'Step 2', name: 'Evaluating Impression', status: 'upcoming'},
        {id: 'Step 3', name: 'Modeling', status: 'upcoming'},
        {id: 'Step 4', name: 'Modeled', status: 'upcoming'},
        {id: 'Step 5', name: 'Printing', status: 'upcoming'},
        {id: 'Step 6', name: 'Printed', status: 'upcoming'},
        {id: 'Step 7', name: 'Mounted', status: 'upcoming'},
        {id: 'Step 8', name: 'Checked', status: 'upcoming'},
        {id: 'Step 9', name: 'Shipped', status: 'upcoming'},
    ])

    const updateOrderStepper = () => {
        switch (orderStatus) {
            case OrderStatus.Placed:
                setSteps((prevState) => {
                    const [first, ...rest] = prevState
                    return [{...first, status: 'current'}, ...rest]
                })
                break

            case OrderStatus.ImpressionEvaluation:
                setSteps((prevState) => {
                    const [first, second, ...rest] = prevState
                    return [
                        {...first, status: 'complete'},
                        {...second, status: 'current'},
                        ...rest,
                    ]
                })
                break

            case OrderStatus.Modelling:
                setSteps((prevState) => {
                    const [first, second, third, ...rest] = prevState
                    return [
                        {...first, status: 'complete'},
                        {...second, status: 'complete'},
                        {...third, status: 'current'},
                        ...rest,
                    ]
                })
                break

            case OrderStatus.Modeled:
                setSteps((prevState) => {
                    const [first, second, third, fourth, ...rest] = prevState
                    return [
                        {...first, status: 'complete'},
                        {...second, status: 'complete'},
                        {...third, status: 'complete'},
                        {...fourth, status: 'current'},
                        ...rest,
                    ]
                })
                break

            case OrderStatus.Printing:
                setSteps((prevState) => {
                    const [first, second, third, fourth, fifth, ...rest] = prevState
                    return [
                        {...first, status: 'complete'},
                        {...second, status: 'complete'},
                        {...third, status: 'complete'},
                        {...fourth, status: 'complete'},
                        {...fifth, status: 'current'},
                        ...rest,
                    ]
                })
                break

            case OrderStatus.Mounted:
                setSteps((prevState) => {
                    const [first, second, third, fourth, fifth, sixth, ...rest] =
                        prevState
                    return [
                        {...first, status: 'complete'},
                        {...second, status: 'complete'},
                        {...third, status: 'complete'},
                        {...fourth, status: 'complete'},
                        {...fifth, status: 'complete'},
                        {...sixth, status: 'current'},
                        ...rest,
                    ]
                })
                break

            case OrderStatus.Checked:
                setSteps((prevState) => {
                    const [first, second, third, fourth, fifth, sixth, seventh, ...rest] =
                        prevState
                    return [
                        {...first, status: 'complete'},
                        {...second, status: 'complete'},
                        {...third, status: 'complete'},
                        {...fourth, status: 'complete'},
                        {...fifth, status: 'complete'},
                        {...sixth, status: 'complete'},
                        {...seventh, status: 'current'},
                        ...rest,
                    ]
                })
                break

            case OrderStatus.Shipped:
                setSteps((prevState) => {
                    const [
                        first,
                        second,
                        third,
                        fourth,
                        fifth,
                        sixth,
                        seventh,
                        eighth,
                        ...rest
                    ] = prevState
                    return [
                        {...first, status: 'complete'},
                        {...second, status: 'complete'},
                        {...third, status: 'complete'},
                        {...fourth, status: 'complete'},
                        {...fifth, status: 'complete'},
                        {...sixth, status: 'complete'},
                        {...seventh, status: 'complete'},
                        {...eighth, status: 'complete'},
                        ...rest,
                    ]
                })
                break

            default:
                break
        }
    }

    useEffect(() => {
        updateOrderStepper()

        return () => {
            updateOrderStepper()
        }
    }, [orderStatus])

    return (
        <nav aria-label="Progress" className="mb-5 print:hidden">
            <ol role="list" className="space-y-4 md:flex md:space-y-0 md:space-x-8">
                {steps.length > 0 &&
                    steps?.map((step) => (
                        <li key={step.name} className="md:flex-1">
                            {step?.status === 'complete' ? (
                                <a className="group pl-4 py-2 flex flex-col border-l-4 border-indigo-600 hover:border-indigo-800 md:pl-0 md:pt-4 md:pb-0 md:border-l-0 md:border-t-4">
									<span
                                        className="text-xs text-indigo-600 font-semibold tracking-wide uppercase group-hover:text-indigo-800">
										{step?.id}
									</span>
                                    <span className="text-sm font-medium">{step?.name}</span>
                                </a>
                            ) : step.status === 'current' ? (
                                <a
                                    className="pl-4 py-2 flex flex-col border-l-4 border-indigo-600 md:pl-0 md:pt-4 md:pb-0 md:border-l-0 md:border-t-4"
                                    aria-current="step"
                                >
									<span className="text-xs text-indigo-600 font-semibold tracking-wide uppercase">
										{step?.id}
									</span>
                                    <span className="text-sm font-medium">{step?.name}</span>
                                </a>
                            ) : (
                                <a className="group pl-4 py-2 flex flex-col border-l-4 border-gray-200 hover:border-gray-300 md:pl-0 md:pt-4 md:pb-0 md:border-l-0 md:border-t-4">
									<span
                                        className="text-xs text-gray-500 font-semibold tracking-wide uppercase group-hover:text-gray-700">
										{step?.id}
									</span>
                                    <span className="text-sm font-medium">{step?.name}</span>
                                </a>
                            )}
                        </li>
                    ))}
            </ol>
        </nav>
    )
}
export default Index
