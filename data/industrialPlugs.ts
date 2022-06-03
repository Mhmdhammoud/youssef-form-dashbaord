import {ColorModel} from './colors'

interface StyleModel {
	name: string
	image: string
	styleNumber: string
	stl: string
	cymba: boolean
	serialNumber: string
}

interface IFilter {
	title: string
	value: string
}

interface FilterType {
	hasCord: boolean
	filters: IFilter[]
}

interface FilterModel {
	fototec: FilterType
	bioporeXtreme: FilterType
}

interface IManufacturer {
	title: string
	styles: StyleModel[]
	colors: ColorModel[]
	filters: FilterModel
	filterGraph: string
}

export const manufacturerSelect = [
	{
		title: 'Dynamic Ear',
		clickable: false,
	},
	{
		title: 'Dynamic Ear Filter (DM)',
		clickable: true,
	},
]
const industrialPlugs: IManufacturer[] = [
	{
		title: 'Dynamic Ear Filter (DM)',
		styles: [
			{
				name: 'Full shell grooved',
				image:
					'https://hassans.s3.eu-central-1.amazonaws.com/Formatty/assets/6859a18c-b8b7-43d1-9014-c9a9851669f3.png',
				styleNumber: 'IN25',
				stl: 'https://hassans.s3.eu-central-1.amazonaws.com/Formatty/assets/bte-10.stl',
				cymba: true,
				serialNumber: 'XYZ-123456789',
			},
		],
		filters: {
			fototec: {
				hasCord: false,
				filters: [
					{
						title: 'DM filter red',
						value: 'SNR: 31, H: 32, M: 28, L: 24',
					},
					{
						title: 'DM filter yellow ',
						value: 'SNR: 26, H: 27, M: 23, L: 19',
					},
				],
			},
			bioporeXtreme: {
				hasCord: true,
				filters: [
					{
						title: 'DM filter red',
						value: 'SNR: 27, H: 27, M: 25, L: 23',
					},
					{
						title: 'DM filter yellow ',
						value: 'SNR: 24, H: 26, M: 20, L: 17',
					},
				],
			},
		},
		filterGraph:
			'https://hassans.s3.eu-central-1.amazonaws.com/youssef/assets/eindustrial.png',
		colors: [
			{
				label: '28860 Clear transparent',
				color: '#fff',
			},
			{
				label: '28861 Reddish transparent',
				color: '#fce4db',
			},
			{
				label: '288613 Medium brown transparent',
				color: '#dabfa3',
			},
			{
				label: '288617 Red opaque',
				color: '#e30613',
			},
			{
				label: '288618 Pink opaque',
				color: '#ed6ea7',
			},
			{
				label: '288622 Blue opaque',
				color: '#3a58a4',
			},
			{
				label: '288632 Yellow opaque',
				color: '#ffdd00',
			},
			{
				label: '288634 Orange opaque',
				color: '#f07d00',
			},
			{
				label: '288642 Green opaque',
				color: '#23a638',
			},
			{
				label: '288652 Black opaque',
				color: '#000',
			},
			{
				label: '288662 White opaque',
				color: '#fff',
			},
		],
	},
]
export default industrialPlugs
