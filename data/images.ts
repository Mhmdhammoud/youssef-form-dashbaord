import CymbaLeftOne from '../public/cymbaleft1.png'
import CymbaLeftTwo from '../public/cymbaleft2.png'
import CymbaLeftThree from '../public/cymbaleft3.png'
import CymbaLeftFour from '../public/cymbaleft4.png'
import CymbaRightOne from '../public/cymbaright1.png'
import CymbaRightTwo from '../public/cymbaright2.png'
import CymbaRightThree from '../public/cymbaright3.png'
import CymbaRightFour from '../public/cymbaright4.png'

import CanalLeftOne from '../public/cannelleft1.png'
import CanalLeftTwo from '../public/cannelleft2.png'
import CanalLeftThree from '../public/cannelleft3.png'
import CanalLeftFour from '../public/cannelleft4.png'
import CanalRightOne from '../public/cannelright1.png'
import CanalRightTwo from '../public/cannelright2.png'
import CanalRightThree from '../public/cannelright3.png'
import CanalRightFour from '../public/cannelright4.png'

interface basicImage {
	img: any
	value: string
	label?: string
}

interface images {
	cannel: {
		left: basicImage[]
		right: basicImage[]
	}

	cymba: {
		left: basicImage[]
		right: basicImage[]
	}
}

const earImages: images = {
	cannel: {
		left: [
			{
				img: CanalLeftTwo,
				value: '1st bend',
			},
			{
				img: CanalLeftFour,
				value: '2nd bend',
			},
			{
				img: CanalLeftThree,
				value: 'Before first bend',
			},
			{
				img: CanalLeftOne,
				value: 'Canal as impression',
			},
		],
		right: [
			{
				img: CanalRightTwo,
				value: '1st bend',
			},
			{
				img: CanalRightThree,
				value: '2nd bend',
			},
			{
				img: CanalRightFour,
				value: 'Before first bend',
			},
			{
				img: CanalRightOne,
				value: 'Canal as impression',
			},
		],
	},
	cymba: {
		left: [
			{
				img: CymbaLeftOne,
				value: 'A',
				label: 'A',
			},
			{
				img: CymbaLeftTwo,
				value: 'B',
				label: 'B',
			},
			{
				img: CymbaLeftThree,
				value: 'C',
				label: 'C',
			},
			{
				img: CymbaLeftFour,
				value: 'Cymba-helix as impression',
				label: 'D',
			},
		],
		right: [
			{
				img: CymbaRightOne,
				value: 'A',
				label: 'A',
			},
			{
				img: CymbaRightTwo,
				value: 'B',
				label: 'B',
			},
			{
				img: CymbaRightThree,
				value: 'C',
				label: 'C',
			},
			{
				img: CymbaRightFour,
				value: 'Cymba-helix as impression',
				label: 'D',
			},
		],
	},
}

export default earImages
