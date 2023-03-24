import { createTheme } from '@nextui-org/react';

export const DarkTheme = createTheme(
    {
        type: 'dark',
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

                /*    background: '#000402',
                    text: '#FFF',*/

                /*            // you can also create your own color
                            myDarkColor: '#ff4ecd'
                            // ...  more colors*/
            },
        }
    } )
