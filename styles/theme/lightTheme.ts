import { createTheme } from '@nextui-org/react'

export const LightTheme = createTheme({
	type: 'light',
	theme: {
		colors: {
			// PRIMARY COLOR
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
            secondaryLight: '#555555',
            secondaryLightHover: '#606060',
            secondaryLightActive: '#606060',
            secondaryLightContrast: '#707070',
            secondary: '#424242',
            secondaryBorder: '#505050',
            secondaryBorderHover: '#606060',
            secondarySolidHover: '#707070',
            secondarySolidContrast: '$white',
            secondaryShadow: '#909090',

			gradient: 'linear-gradient(to right, #f7971e, #ffd200)',
			link: '#gray800',
		},
	},
})
