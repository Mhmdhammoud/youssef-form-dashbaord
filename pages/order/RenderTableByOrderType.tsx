import React from 'react';
import {AllColors, soundTubeColor} from '../../data';
import {OrderType, Product} from '../../src/generated/graphql';

interface IProps {
    orderType: OrderType;
    orderProduct: Product;
    orderMaterial: string;
    bioporShore: string;
}

const RenderTableByOrderType: React.FC<IProps> = (props) => {
    const {orderType, orderProduct, orderMaterial, bioporShore} = props

    if (orderType === OrderType.Bte) {
        return (
            <div className="flex flex-col">
                <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                        <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                <tr>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Details
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Left
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Right
                                    </th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr className={'bg-white'}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        Shell ID
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {orderProduct?.left?.shellId}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {orderProduct?.right?.shellId}
                                    </td>
                                </tr>
                                <tr className={'bg-white'}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        Manufacturer
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {orderProduct?.left?.manufacturer}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {orderProduct?.right?.manufacturer}
                                    </td>
                                </tr>
                                <tr className={'bg-white'}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        Canal
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {orderProduct?.left?.canal}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {orderProduct?.right?.canal}
                                    </td>
                                </tr>
                                <tr className={'bg-white'}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        Canal Length
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {orderProduct?.left?.canalLength}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {orderProduct?.right?.canalLength}
                                    </td>
                                </tr>

                                <tr className={'bg-white'}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        HA Model
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {orderProduct?.left?.haModel}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {/*@ts-ignore*/}
                                        {orderProduct?.right?.haModel}
                                    </td>
                                </tr>

                                <tr className={'bg-white'}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        Serial Number
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {/*@ts-ignore*/}
                                        {orderProduct?.left?.serialNumber}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {/*@ts-ignore*/}
                                        {orderProduct?.right?.serialNumber}
                                    </td>
                                </tr>
                                <tr className={'bg-white'}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        Style
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {/*@ts-ignore*/}
                                        {orderProduct?.left?.style}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {/*@ts-ignore*/}
                                        {orderProduct?.right?.style}
                                    </td>
                                </tr>

                                <tr className={'bg-white'}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        Vent Size
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {/*@ts-ignore*/}
                                        {orderProduct?.left?.ventSize}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {/*@ts-ignore*/}
                                        {orderProduct?.right?.ventSize}
                                    </td>
                                </tr>

                                <tr className={'bg-white'}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        Color
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {orderMaterial === 'biopor' &&
                                            bioporShore === '25 Shore A' && (
                                                <span
                                                    style={{
                                                        backgroundColor: AllColors?.biopor[0][
                                                            '25shore'
                                                            ].find(
                                                            (item) =>
                                                                item.label === orderProduct?.left?.color
                                                        )?.color,
                                                    }}
                                                    className={'p-1 rounded-md'}
                                                >
                            {orderProduct?.left?.color}
                          </span>
                                            )}

                                        {orderMaterial === 'biopor' &&
                                            bioporShore === '40 Shore A' && (
                                                <span
                                                    style={{
                                                        backgroundColor: AllColors?.biopor[1][
                                                            '40shore'
                                                            ].find(
                                                            (item) =>
                                                                item.label === orderProduct?.left?.color
                                                        )?.color,
                                                    }}
                                                    className={'p-1 rounded-md'}
                                                >
                            {orderProduct?.left?.color}
                          </span>
                                            )}

                                        {orderMaterial === 'biopor' &&
                                            bioporShore === '60 Shore A' && (
                                                <span
                                                    style={{
                                                        backgroundColor: AllColors?.biopor[2][
                                                            '60shore'
                                                            ].find(
                                                            (item) =>
                                                                item.label === orderProduct?.left?.color
                                                        )?.color,
                                                    }}
                                                    className={'p-1 rounded-md'}
                                                >
                            {orderProduct?.left?.color}
                          </span>
                                            )}

                                        {orderMaterial === 'fototec' && bioporShore === '' && (
                                            <span
                                                style={{
                                                    backgroundColor: AllColors?.fototec.find(
                                                        (item) => item.label === orderProduct?.left?.color
                                                    )?.color,
                                                }}
                                                className={'p-1 rounded-md'}
                                            >
                          {orderProduct?.left?.color}
                        </span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {orderMaterial === 'biopor' &&
                                            bioporShore === '25 Shore A' && (
                                                <span
                                                    style={{
                                                        backgroundColor: AllColors?.biopor[0][
                                                            '25shore'
                                                            ].find(
                                                            (item) =>
                                                                item.label === orderProduct?.right?.color
                                                        )?.color,
                                                    }}
                                                    className={'p-1 rounded-md'}
                                                >
                            {orderProduct?.right?.color}
                          </span>
                                            )}

                                        {orderMaterial === 'biopor' &&
                                            bioporShore === '40 Shore A' && (
                                                <span
                                                    style={{
                                                        backgroundColor: AllColors?.biopor[1][
                                                            '40shore'
                                                            ].find(
                                                            (item) =>
                                                                item.label === orderProduct?.right?.color
                                                        )?.color,
                                                    }}
                                                    className={'p-1 rounded-md'}
                                                >
                            {orderProduct?.right?.color}
                          </span>
                                            )}

                                        {orderMaterial === 'biopor' &&
                                            bioporShore === '60 Shore A' && (
                                                <span
                                                    style={{
                                                        backgroundColor: AllColors?.biopor[2][
                                                            '60shore'
                                                            ].find(
                                                            (item) =>
                                                                item.label === orderProduct?.right?.color
                                                        )?.color,
                                                    }}
                                                    className={'p-1 rounded-md'}
                                                >
                            {orderProduct?.right?.color}
                          </span>
                                            )}

                                        {orderMaterial === 'fototec' && bioporShore === '' && (
                                            <span
                                                style={{
                                                    backgroundColor: AllColors?.fototec.find(
                                                        (item) =>
                                                            item.label === orderProduct?.right?.color
                                                    )?.color,
                                                }}
                                                className={'p-1 rounded-md'}
                                            >
                          {orderProduct?.right?.color}
                        </span>
                                        )}
                                    </td>
                                </tr>
                                <tr className={'bg-white'}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        Sound Tube
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <span
                          style={{
                              backgroundColor: soundTubeColor?.find(
                                  (item) =>
                                      item.label === orderProduct?.left?.soundTube
                              )?.color,
                          }}
                          className={'p-1 rounded-md'}
                      >
                        {orderProduct?.left?.soundTube}
                      </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <span
                          style={{
                              backgroundColor: soundTubeColor?.find(
                                  (item) =>
                                      item.label === orderProduct?.right?.soundTube
                              )?.color,
                          }}
                          className={'p-1 rounded-md'}
                      >
                        {orderProduct?.right?.soundTube}
                      </span>
                                    </td>
                                </tr>
                                <tr className={'bg-white'}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        Marking Dots
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {/*@ts-ignore*/}
                                        {orderProduct?.left?.markingDots ? 'Yes' : 'No'}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {/*@ts-ignore*/}
                                        {orderProduct?.right?.markingDots ? 'Yes' : 'No'}
                                    </td>
                                </tr>
                                <tr className={'bg-white'}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        Surface
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {/*@ts-ignore*/}
                                        {orderProduct?.left?.surface}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {/*@ts-ignore*/}
                                        {orderProduct?.right?.surface}
                                    </td>
                                </tr>

                                <tr className={'bg-white'}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        Cymba Length
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {/*@ts-ignore*/}
                                        {orderProduct?.left?.cymbaLength}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {/*@ts-ignore*/}
                                        {orderProduct?.right?.cymbaLength}
                                    </td>
                                </tr>
                                <tr className={'bg-white'}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        Quantity
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {/*@ts-ignore*/}
                                        {orderProduct?.left?.quantity}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {/*@ts-ignore*/}
                                        {orderProduct?.right?.quantity}
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        );
    } else return null;
};

export default RenderTableByOrderType;
