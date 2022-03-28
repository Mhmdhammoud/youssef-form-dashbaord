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
interface FilterType{
	hasCord: boolean,
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

const musicPlugs: IManufacturer[] = [
	{
		title: 'Apple',
		styles: [
			{
				name: 'H10',
				image: 'https://hassans.s3.eu-central-1.amazonaws.com/Formatty/assets/6859a18c-b8b7-43d1-9014-c9a9851669f3.png',
				styleNumber: 'H10',
				stl: 'https://hassans.s3.eu-central-1.amazonaws.com/Formatty/assets/bte-10.stl',
				cymba: true,
			},
			{
				name: 'H10',
				image:
					'https://hassans.s3.eu-central-1.amazonaws.com/Formatty/assets/7a5b90df-8527-4628-9e87-ca19eff9acd0.png',
				styleNumber: 'H11',
				stl: 'https://hassans.s3.eu-central-1.amazonaws.com/Formatty/assets/bte-11.stl',
				cymba: false,
			},
		],
		filters: {
			fototec: {
				hasCord: false,
				filters: [
					{
						title: 'DM filter blue foto',
						value: 'SNR: 18, H: 19, M: 15, L: 13',
					},
					{
						title: 'DM filter red foto',
						value: 'SNR: 18, H: 19, M: 15, L: 12',
					},
					{
						title: 'DM filter green foto',
						value: 'SNR: 18, H: 19, M: 15, L: 14',
					},
				],
			},
			bioporeXtreme: {
				hasCord: true,
				filters: [
					{
						title: 'DM filter blue bio',
						value: 'SNR: 18, H: 19, M: 15, L: 16',
					},
					{
						title: 'DM filter red',
						value: 'SNR: 18, H: 19, M: 15, L: 17',
					},
					{
						title: 'DM filter green',
						value: 'SNR: 18, H: 19, M: 15, L: 18',
					},
				],
			},
		},
		filterGraph: 'https://hassans.s3.eu-central-1.amazonaws.com/youssef/assets/en.png',
		colors: [
			{
				label: '60 Clear transparent',
				color: '#fff',
			},
			{
				label: '61 Reddish transparent',
				color: '#fcc4af',
			},
		],
	},
]
export default musicPlugs
