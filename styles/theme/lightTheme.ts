import { createTheme } from '@nextui-org/react';

export const LightTheme = createTheme( {
    type: 'light',
    theme: {
        colors: {
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

            gradient: 'linear-gradient(to right, #f7971e, #ffd200)',
            link: '#d64933',

            // brand colors
            /*            background: '#f0f0f4',
                        text: '#000402',*/

            /*            // you can also create your own color
                        myDarkColor: '#ff4ecd'
                        // ...  more colors*/
        },
    }
} )
