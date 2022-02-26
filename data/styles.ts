interface StyleModel {
	name: string
	image: string
	styleNumber: string
	stl: string
}

interface IStyle {
	hard: StyleModel[]
	soft: StyleModel[]
}

const styles: IStyle = {
	hard: [
		{
			name: 'Full Mould',
			image:
				'https://hassans.s3.eu-central-1.amazonaws.com/Formatty/assets/6859a18c-b8b7-43d1-9014-c9a9851669f3.png',
			styleNumber: 'H10',
			stl: 'https://hassans.s3.eu-central-1.amazonaws.com/Formatty/assets/bte-10.stl',
		},
		{
			name: 'Canal Flat',
			image:
				'https://hassans.s3.eu-central-1.amazonaws.com/Formatty/assets/7a5b90df-8527-4628-9e87-ca19eff9acd0.png',
			styleNumber: 'H11',
			stl: 'https://hassans.s3.eu-central-1.amazonaws.com/Formatty/assets/bte-11.stl',
		},
		{
			name: 'Half Skeleton',
			image:
				'https://hassans.s3.eu-central-1.amazonaws.com/Formatty/assets/1e4dfbb6-fb2d-4d3d-84fa-8f9691abaac3.png',
			styleNumber: 'H12',
			stl: 'https://hassans.s3.eu-central-1.amazonaws.com/Formatty/assets/bte-12.stl',
		},
		{
			name: 'SKELETON',
			image:
				'https://hassans.s3.eu-central-1.amazonaws.com/Formatty/assets/767a6888-69b3-4493-ba2b-cb52c69f2014.png',
			styleNumber: 'H20',
			stl: 'https://hassans.s3.eu-central-1.amazonaws.com/Formatty/assets/bte-20.stl',
		},
		{
			name: 'DOUBLE CANAL LOCK',
			image:
				'https://hassans.s3.eu-central-1.amazonaws.com/Formatty/assets/a0ddf0b0-6c52-4fc5-8752-17734ad321d5.png',
			styleNumber: 'H22',
			stl: 'https://hassans.s3.eu-central-1.amazonaws.com/Formatty/assets/bte-22.stl',
		},
		{
			name: 'CANAL LOCK',
			image:
				'https://hassans.s3.eu-central-1.amazonaws.com/Formatty/assets/65bbbd3b-faef-44c0-9582-5f032a09dbc0.png',
			styleNumber: 'H24',
			stl: 'https://hassans.s3.eu-central-1.amazonaws.com/Formatty/assets/bte-24.stl',
		},
		{
			name: 'Full Shell Grooved',
			image:
				'https://hassans.s3.eu-central-1.amazonaws.com/Formatty/assets/ac25c7a0-d01b-4cdd-b8ad-4fbea45993a3.png',
			styleNumber: 'H25',
			stl: 'https://hassans.s3.eu-central-1.amazonaws.com/Formatty/assets/bte-25.stl',
		},
		{
			name: 'CANAL HELIX LOCK',
			image:
				'https://hassans.s3.eu-central-1.amazonaws.com/Formatty/assets/ceb04332-ec39-4a85-bc8f-8712e55ad89a.png',
			styleNumber: 'H27',
			stl: '',
		},
		{
			name: 'HALF SHELL',
			image:
				'https://hassans.s3.eu-central-1.amazonaws.com/Formatty/assets/9dbddde1-4ad6-4724-810d-9615ded36f2f.png',
			styleNumber: 'H30',
			stl: 'https://hassans.s3.eu-central-1.amazonaws.com/Formatty/assets/bte-30.stl',
		},
	],
	soft: [
		{
			name: 'Full Mould',
			image:
				'https://hassans.s3.eu-central-1.amazonaws.com/Formatty/assets/f5922fd7-d59e-45e5-833d-1e832fd46d1d.png',
			styleNumber: 'S10',
			stl: 'https://hassans.s3.eu-central-1.amazonaws.com/Formatty/assets/bte-10.stl',
		},
		{
			name: 'Canal Flat',
			image:
				'https://hassans.s3.eu-central-1.amazonaws.com/Formatty/assets/3a597a8c-60a8-471f-bb06-57b1c0913d7f.png',
			styleNumber: 'S11',
			stl: 'https://hassans.s3.eu-central-1.amazonaws.com/Formatty/assets/bte-11.stl',
		},
		{
			name: 'Half Skeleton',
			image:
				'https://hassans.s3.eu-central-1.amazonaws.com/Formatty/assets/8deef0a3-8616-4ebf-b0f0-c488110eabfb.png',
			styleNumber: 'S12',
			stl: 'https://hassans.s3.eu-central-1.amazonaws.com/Formatty/assets/bte-12.stl',
		},
		{
			name: 'SKELETON',
			image:
				'https://hassans.s3.eu-central-1.amazonaws.com/Formatty/assets/ab51583c-3654-4aaa-b70f-7acd5f6a38b2.png',
			styleNumber: 'S20',
			stl: 'https://hassans.s3.eu-central-1.amazonaws.com/Formatty/assets/bte-20.stl',
		},
		{
			name: 'DOUBLE CANAL LOCK',
			image:
				'https://hassans.s3.eu-central-1.amazonaws.com/Formatty/assets/60420650-d9a2-4f46-82b5-2993c21fa301.png',
			styleNumber: 'S22',
			stl: 'https://hassans.s3.eu-central-1.amazonaws.com/Formatty/assets/bte-22.stl',
		},
		{
			name: 'CANAL LOCK',
			image:
				'https://hassans.s3.eu-central-1.amazonaws.com/Formatty/assets/fccdc5df-97d5-49db-9070-21257cc6172c.png',
			styleNumber: 'S24',
			stl: 'https://hassans.s3.eu-central-1.amazonaws.com/Formatty/assets/bte-24.stl',
		},
		{
			name: 'Full Shell Grooved',
			image:
				'https://hassans.s3.eu-central-1.amazonaws.com/Formatty/assets/609dda42-f932-4440-b0d9-97b59a2076b1.png',
			styleNumber: 'S25',
			stl: 'https://hassans.s3.eu-central-1.amazonaws.com/Formatty/assets/bte-25.stl',
		},
		{
			name: 'CANAL HELIX LOCK',
			image:
				'https://hassans.s3.eu-central-1.amazonaws.com/Formatty/assets/b322437d-31a7-4d62-9e37-79f8838f7fbd.png',
			styleNumber: 'S27',
			stl: '',
		},
		{
			name: 'HALF SHELL',
			image:
				'https://hassans.s3.eu-central-1.amazonaws.com/Formatty/assets/96a5936f-d7eb-4eaa-b729-06ab0b72dede.png',
			styleNumber: 'S30',
			stl: 'https://hassans.s3.eu-central-1.amazonaws.com/Formatty/assets/bte-30.stl',
		},
	],
}
export default styles
