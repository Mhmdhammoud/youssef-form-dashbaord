interface StyleModel {
	name: string
	image: string
	styleNumber: string
	stl: string
	cymba: boolean
}

interface IStyle {
	light: StyleModel[]
	fluoreszent: StyleModel[]
}

const swimmingPlugsStyles: IStyle = {
	light: [
		{
			name: 'Full Mould With Grip',
			image: 'https://hassans.s3.eu-central-1.amazonaws.com/Formatty/assets/6859a18c-b8b7-43d1-9014-c9a9851669f3.png',
			styleNumber: 'SP10',
			stl: 'https://hassans.s3.eu-central-1.amazonaws.com/youssef/assets/SP10.stl',
			cymba: true,
		},
		{
			name: 'Full Shell Grooved With Grip',
			image:
				'https://hassans.s3.eu-central-1.amazonaws.com/Formatty/assets/7a5b90df-8527-4628-9e87-ca19eff9acd0.png',
			styleNumber: 'SP25',
			stl: 'https://hassans.s3.eu-central-1.amazonaws.com/youssef/assets/SP25.stl',
			cymba: true,
		},
	],
	fluoreszent: [
		{
			name: 'Full Mould With Grip',
			image:
				'https://hassans.s3.eu-central-1.amazonaws.com/Formatty/assets/60420650-d9a2-4f46-82b5-2993c21fa301.png',
			styleNumber: 'SP10',
			stl: 'https://hassans.s3.eu-central-1.amazonaws.com/youssef/assets/SP10.stl',
			cymba: true,
		},
		{
			name: 'Full Shell Grooved With Grip',
			image:
				'https://hassans.s3.eu-central-1.amazonaws.com/Formatty/assets/fccdc5df-97d5-49db-9070-21257cc6172c.png',
			styleNumber: 'SP25',
			stl: 'https://hassans.s3.eu-central-1.amazonaws.com/youssef/assets/SP25.stl',
			cymba: false,
		},
	],

}


export default swimmingPlugsStyles
