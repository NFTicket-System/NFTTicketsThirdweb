import { createTheme } from '@nextui-org/react'

export const DarkTheme = createTheme({
	type: 'dark',
	theme: {
		colors: {
			// PRIMARY
			primaryLight: '#FEF098',
			primaryLightHover: '#FEE665',
			primaryLightActive: '#FEDC3F',
			primaryLightContrast: '#DAAA00',
			primary: '#fecb00',
			primaryBorder: '#FECB00',
			primaryBorderHover: '#DAAA00',
			primarySolidHover: '#B68A00',
			primarySolidContrast: '$white',
			primaryShadow: '#FECB00',

			// SECONDARY COLOR
			secondaryLight: '#757575',
			secondaryLightHover: '#808080',
			secondaryLightActive: '#808080',
			secondaryLightContrast: '#909090',
			secondary: '#626262',
			secondaryBorder: '#707070',
			secondaryBorderHover: '#808080',
			secondarySolidHover: '#909090',
			secondarySolidContrast: '$white',
			secondaryShadow: '#909090',

			gradient: 'linear-gradient(to right, #f7971e, #ffd200)',
			link: '#gray900',
		},
	},
})
