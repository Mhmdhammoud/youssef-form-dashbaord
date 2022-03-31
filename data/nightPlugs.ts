import {ColorModel} from './colors'

interface StyleModel {
	name: string
	image: string
	styleNumber: string
	stl: string
	cymba: boolean
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
	biopor25: FilterType
	biopor60: FilterType
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

export const NightColors = {
	biopor25: [
		{
			label: '25 Clear transparent',
			color: '#fff',
		},
		{
			label: '251 White opaque',
			color: '#fff',
		},
		{
			label: '254 Blue opaque',
			color: '#312f80',
		},
		{
			label: '256 Red opaque',
			color: '#e51e26',
		},
		{
			label: '257 Yellow opaque',
			color: '#fcdd07',
		},
		{
			label: '258 Orange opaque',
			color: '#ef7e23',
		},
		{
			label: '26 Reddish transparent',
			color: '#fcc4af',
		},
	],

	biopor60: [
		{
			label: '60 Clear transparent',
			color: '#fff',
		},
		{
			label: '61 Reddish transparent',
			color: '#fcc4af',
		},
		{
			label: '613 Medium brown transparent',
			color: '#d9bfa2',
		},
		{
			label: '617 Red opaque',
			color: '#e51e26',
		},
		{
			label: '618 Pink opaque',
			color: '#ed6ea7',
		},
		{
			label: '622 Blue opaque',
			color: '#312f80',
		},
		{
			label: '632 Yellow opaque',
			color: '#fcdd07',
		},
		{
			label: '634 Orange opaque',
			color: '#ef7e23',
		},
		{
			label: '642 Green opaque',
			color: '#1aa749',
		},
		{
			label: '652 Black opaque',
			color: '#050708',
		},
		{
			label: '662 White opaque',
			color: '#fff',
		},
	],
}

const nightPlugs: IManufacturer[] = [
	{
		title: 'Dynamic Ear Filter (DM)',
		styles: [
			{
				name: 'Full shell grooved with grip',
				image:
					'https://hassans.s3.eu-central-1.amazonaws.com/Formatty/assets/6859a18c-b8b7-43d1-9014-c9a9851669f3.png',
				styleNumber: 'MN25',
				stl: 'https://hassans.s3.eu-central-1.amazonaws.com/Formatty/assets/bte-10.stl',
				cymba: true,
			},
		],
		filters: {
			biopor25: {
				hasCord: false,
				filters: [
					{
						title: 'DM filter white',
						value: 'SNR: 19, H: 14, M: 14, L: 14',
					},
				],
			},
			biopor60: {
				hasCord: false,

				filters: [
					{
						title: 'DM filter white',
						value: 'SNR: 19, H: 14, M: 14, L: 14',
					},
				],
			},
		},
		filterGraph:
			'https://hassans.s3.eu-central-1.amazonaws.com/youssef/assets/en.png',
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
export default nightPlugs
