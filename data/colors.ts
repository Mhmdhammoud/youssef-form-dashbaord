export interface ColorModel {
	color: string
	label: string
}

export interface IColorModel {
	biopor: [
		{'25shore': ColorModel[]},
		{'40shore': ColorModel[]},
		{'60shore': ColorModel[]}
	]
	fototec: ColorModel[]
}

export interface ISwimmingColorModel {
	light: ColorModel[]
	fluoreszent: ColorModel[]
}

export const SwimmingPlugsColors: ISwimmingColorModel = {
	light: [
		{
			label: '28516 purple opaque',
			color: '#7f5da4',
		},
		{
			label: '28524 light blue opaque',
			color: '#97b9e2',
		},
		{
			label: '28525 dark blue opaque',
			color: '#271d67',
		},
		{
			label: '28526 dark red opaque',
			color: '#ae0f0a',
		},
		{
			label: '28527 neon yellow opaque',
			color: '#ffdd00',
		},
		{
			label: '28513 neon pink opaque',
			color: '#ed6ea7',
		},
		{
			label: '28593 neon orange opaque',
			color: '#f07d00',
		},
		{
			label: '28543 neon green opaque',
			color: '#60bea3',
		},
		{
			label: '28552 black opaque',
			color: '#1d1d1b',
		},
		{
			label: '28562 white opaque',
			color: '#fff',
		},
		{
			label: '28571 beige opaque',
			color: '#d6b78f',
		}],
	fluoreszent: [
		{
			label: '28700 Yellow Fluoreszent',
			color: '#ffdd00',
		},
		{
			label: '28701 Green Fluoreszent',
			color: '#23a638',
		},
		{
			label: '28702 Blue Fluoreszent',
			color: '#1c86c8',
		},
		{
			label: '28703 Magenta Fluoreszent',
			color: '#ed6ea7',
		},
		{
			label: '28704 Red Fluoreszent',
			color: '#e30613',
		},
		{
			label: '28705 Orange Fluoreszent',
			color: '#f07d00',
		}
		],
}


export const soundTubeColor: ColorModel[] = [
	{
		color: '#fff',
		label: '13N21 PH#13',
	},
	{
		color: '#fff',
		label: '13T21 PH#13 Thick wall',
	},
	{
		color: '#fff',
		label: '13TD21 DR#DRY Tube thick wall',
	},
	{
		color: '#574141',
		label: '13NL7 PH#13',
	},
	{
		color: '#574141',
		label: '13TL7 PH#13 Thick wall',
	},
	{
		color: '#574141',
		label: '13NDL7 PH#13 Dry tube',
	},
	{
		color: '#574141',
		label: '13TDL7 PH#13 Tube Thick wall',
	},
	{
		color: '#ff0000',
		label: 'B1 #13HW',
	},
	{
		color: '#0000ff',
		label: 'B2 #13HW',
	},
	{
		color: '#db5cff',
		label: 'B3 #13HW',
	},
	{
		color: '#00ff00',
		label: 'B4 #13HW',
	},
	{
		color: '#ff8522',
		label: 'B5 #13HW',
	},
	{
		color: '#ffdf34',
		label: 'B6 #13HW',
	},
	{
		color: '#402a2a',
		label: 'B7 #13HW',
	},
	{
		color: '#6600ff',
		label: 'B8 #13HW',
	},
]
const colors: IColorModel = {
	biopor: [
		{
			'25shore': [
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
		},
		{
			'40shore': [
				{label: '40 Clear transparent', color: 'transparent'},
				{label: '41 Reddish transparent', color: '#fcc4af'},
				{label: '410 Yellow transparent', color: '#F4ECC2'},
				{label: '411 Purple transparent', color: '#d7cee6'},
				{label: '412 Light brown transparent', color: '#e8d4c0'},
				{label: '413 Medium brown transparent', color: '#d9bfa2'},
				{label: '414 Champagne transparent', color: '#fcf8f2'},
				{label: '415 Onyx black opaque', color: '#565756'},
				{label: '416 Slate transparent', color: '#9c9c9e'},
				{label: '417 Sterling transparent', color: '#eeefef'},
				{label: '418 Tan transparent', color: '#f4eade'},
				{label: '42 Blue transparent', color: '#a59bcb'},
				{label: '420 White opaque', color: '#ffffff'},
				{label: '421 Pink transparent', color: '#fce6f0'},
				{label: '422 Neon yellow opaque', color: '#fcdd07'},
				{label: '423 Neon green opaque', color: '#1aa749'},
				{label: '424 Neon pink opaque', color: '#ed6ea7'},
				{label: '425 Neon orange opaque', color: '#ef7e23'},
				{label: '426 Blue opaque', color: '#312f80'},
				{label: '427 Purple opaque', color: '#7f5da5'},
				{label: '428 Red opaque', color: '#e51e26'},
				{label: '44 Red transparent', color: '#eb4e34'},
			],
		},
		{
			'60shore': [
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
		},
	],
	fototec: [
		{
			label: '14 TAN',
			color: '#e49d67',
		},
		{
			label: '21 Clear',
			color: '#dddbe1',
		},
		{
			label: '22 Cocoa Brown',
			color: '#a7703b',
		},
		{
			label: '26 Pink',
			color: '#efbb9c',
		},
		{
			label: '28 Brown',
			color: '#743016',
		},
		{
			label: 'RO Red',
			color: '#aa2b23',
		},
		{
			label: 'BO Blue',
			color: '#1b367b',
		},
		{
			label: '06 Black',
			color: '#000',
		},
	],
}
export const CordColors: ColorModel[] = [
	{
		label: '102 Clear',
		color: '#ffffff',
	},
	{
		label: '110 Light Red',
		color: '#ff355e',
	},
	{
		label: '113 Neon',
		color: '#38f814',
	},
	{
		label: '111 Light Blue',
		color: '#2f2fff',
	},
	{
		label: '112 Light Green',
		color: '#00ff7f',
	},

	{
		label: '114 Light Purple',
		color: '#7752BD',
	},
	{
		label: '115 Light Orange',
		color: '#ff7b19',
	},
	{
		label: '116 Light Pink',
		color: '#ff389c',
	},
]


export default colors
