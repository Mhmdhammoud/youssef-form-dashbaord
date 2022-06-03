import React from 'react'
import { Order, OrderDirection } from '../../src/generated/graphql'
import { SwimmingPlugsColors } from '../../data'
import { SwimmingMaterial } from '../../types'

interface IProps {
  order: Order
}

const SwimmingPlugsTable: React.FC<IProps> = ({ order }) => {
  return (
    <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50 print:hidden">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Details
                  </th>
                  {(order?.direction === OrderDirection.Left ||
                    order?.direction === OrderDirection.Binaural) && (
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Left
                    </th>
                  )}
                  {(order?.direction === OrderDirection.Right ||
                    order?.direction === OrderDirection.Binaural) && (
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Right
                    </th>
                  )}
                </tr>
              </thead>
              <tbody>
                <tr className={'bg-white'}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    Ear Mold Serial Number
                  </td>
                  {(order?.direction === OrderDirection.Left ||
                    order?.direction === OrderDirection.Binaural) && (
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {order?.product?.left?.ear_mould_sn}
                    </td>
                  )}

                  {(order?.direction === OrderDirection.Right ||
                    order?.direction === OrderDirection.Binaural) && (
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {order?.product?.right?.ear_mould_sn}
                    </td>
                  )}
                </tr>
                <tr className={'bg-white'}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    Shell ID
                  </td>
                  {(order?.direction === OrderDirection.Left ||
                    order?.direction === OrderDirection.Binaural) && (
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {order?.product?.left?.shellId}
                    </td>
                  )}

                  {(order?.direction === OrderDirection.Right ||
                    order?.direction === OrderDirection.Binaural) && (
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {order?.product?.right?.shellId}
                    </td>
                  )}
                </tr>
                <tr className={'bg-white'}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    Style
                  </td>
                  {(order?.direction === OrderDirection.Left ||
                    order?.direction === OrderDirection.Binaural) && (
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {order?.product?.left?.style}
                    </td>
                  )}
                  {(order?.direction === OrderDirection.Right ||
                    order?.direction === OrderDirection.Binaural) && (
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {order?.product?.right?.style}
                    </td>
                  )}
                </tr>

                <tr className={'bg-white'}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    Canal Length
                  </td>
                  {(order?.direction === OrderDirection.Left ||
                    order?.direction === OrderDirection.Binaural) && (
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {order?.product?.left?.canalLength}
                    </td>
                  )}

                  {(order?.direction === OrderDirection.Right ||
                    order?.direction === OrderDirection.Binaural) && (
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {order?.product?.right?.canalLength}
                    </td>
                  )}
                </tr>
                <tr className={'bg-white'}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    Cymba Length
                  </td>
                  {(order?.direction === OrderDirection.Left ||
                    order?.direction === OrderDirection.Binaural) && (
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {order?.product?.left?.cymbaLength}
                    </td>
                  )}
                  {(order?.direction === OrderDirection.Right ||
                    order?.direction === OrderDirection.Binaural) && (
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {order?.product?.right?.cymbaLength}
                    </td>
                  )}
                </tr>
                <tr className={'bg-white'}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    Canal
                  </td>
                  {(order?.direction === OrderDirection.Left ||
                    order?.direction === OrderDirection.Binaural) && (
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {order?.product?.left?.canal}
                    </td>
                  )}

                  {(order?.direction === OrderDirection.Right ||
                    order?.direction === OrderDirection.Binaural) && (
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {order?.product?.right?.canal}
                    </td>
                  )}
                </tr>
                {/* <tr className={'bg-white'}>
									<td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
										Serial Number
									</td>
									{(order?.direction === OrderDirection.Left ||
										order?.direction === OrderDirection.Binaural) && (
										<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
											{order?.product?.left?.serialNumber}
										</td>
									)}
									{(order?.direction === OrderDirection.Right ||
										order?.direction === OrderDirection.Binaural) && (
										<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
											{order?.product?.right?.serialNumber}
										</td>
									)}
								</tr> */}

                <tr className={'bg-white'}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    Color
                  </td>
                  {(order?.direction === OrderDirection.Left ||
                    order?.direction === OrderDirection.Binaural) && (
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <span className={'p-1 flex items-center'}>
                        {order?.product?.left?.color}
                        <span
                          style={{
                            backgroundColor: SwimmingPlugsColors[
                              order.material === SwimmingMaterial.LIGHT
                                ? 'light'
                                : 'fluoreszent'
                            ].find(
                              (item) =>
                                item.label === order?.product?.left?.color
                            )?.color,
                          }}
                          className={
                            'ml-4 p-1 w-6 h-6 rounded-full block border-[2px] border-black'
                          }
                        />
                      </span>
                    </td>
                  )}

                  {(order?.direction === OrderDirection.Right ||
                    order?.direction === OrderDirection.Binaural) && (
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <span className={'p-1 flex items-center'}>
                        {order?.product?.right?.color}
                        <span
                          style={{
                            backgroundColor: SwimmingPlugsColors[
                              order.material === SwimmingMaterial.LIGHT
                                ? 'light'
                                : 'fluoreszent'
                            ].find(
                              (item) =>
                                item.label === order?.product?.right?.color
                            )?.color,
                          }}
                          className={
                            'ml-4 p-1 w-6 h-6 rounded-full block border-[2px] border-black'
                          }
                        />
                      </span>
                    </td>
                  )}
                </tr>
                <tr className={'bg-white'}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    Marking Dots
                  </td>
                  {(order?.direction === OrderDirection.Left ||
                    order?.direction === OrderDirection.Binaural) && (
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {order?.product?.left?.markingDots ? 'Yes' : 'No'}
                    </td>
                  )}
                  {(order?.direction === OrderDirection.Right ||
                    order?.direction === OrderDirection.Binaural) && (
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {order?.product?.right?.markingDots ? 'Yes' : 'No'}
                    </td>
                  )}
                </tr>
                {(order?.product?.left?.engraving !== '' ||
                  order?.product?.right?.engraving !== '') && (
                  <tr className={'bg-white'}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      Engraving Text
                    </td>
                    {(order?.direction === OrderDirection.Left ||
                      order?.direction === OrderDirection.Binaural) && (
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {order?.product?.left?.engraving !== ''
                          ? order?.product?.left?.engraving
                          : ''}
                      </td>
                    )}
                    {(order?.direction === OrderDirection.Right ||
                      order?.direction === OrderDirection.Binaural) && (
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {order?.product?.right?.engraving !== ''
                          ? order?.product?.right?.engraving
                          : ''}
                      </td>
                    )}
                  </tr>
                )}
                <tr className={'bg-white'}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    Surface
                  </td>
                  {(order?.direction === OrderDirection.Left ||
                    order?.direction === OrderDirection.Binaural) && (
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {order?.product?.left?.surface}
                    </td>
                  )}
                  {(order?.direction === OrderDirection.Right ||
                    order?.direction === OrderDirection.Binaural) && (
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {order?.product?.right?.surface}
                    </td>
                  )}
                </tr>
                <tr className={'bg-white'}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    Quantity
                  </td>
                  {(order?.direction === OrderDirection.Left ||
                    order?.direction === OrderDirection.Binaural) && (
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {order?.product?.left?.quantity}
                    </td>
                  )}
                  {(order?.direction === OrderDirection.Right ||
                    order?.direction === OrderDirection.Binaural) && (
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {order?.product?.right?.quantity}
                    </td>
                  )}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SwimmingPlugsTable
