/*export const Logo = () => (
    <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
         width="50.000000pt" height="50.000000pt" viewBox="0 0 50.000000 50.000000"
         preserveAspectRatio="xMidYMid meet">

        <g transform="translate(0.000000,50.000000) scale(0.100000,-0.100000)"
           fill="#000000" stroke="none">
            <path d="M155 456 c-60 -28 -87 -56 -114 -116 -36 -79 -19 -183 42 -249 33
    -36 115 -71 167 -71 52 0 134 35 167 71 34 37 63 110 63 159 0 52 -35 134 -71
167 -37 34 -110 63 -159 63 -27 0 -65 -10 -95 -24z m163 -16 c17 -11 32 -21
32 -23 0 -2 -16 -1 -35 1 -28 3 -40 -1 -65 -26 -41 -41 -41 -83 0 -124 25 -25
37 -29 67 -26 36 4 36 4 14 -14 -52 -41 -144 -30 -183 23 -84 112 51 262 170
189z m-203 -50 c-46 -90 30 -210 135 -210 106 0 180 118 134 213 l-15 32 35
-37 c96 -100 61 -271 -69 -329 -200 -91 -388 161 -243 326 37 43 43 44 23 5z
m242 -12 c29 -27 29 -65 1 -95 -27 -29 -65 -29 -95 -1 -29 27 -29 65 -1 95 27
29 65 29 95 1z"/>
        </g>
    </svg>

);*/

import React from 'react'

interface Props {
    color: string
    height: number
    width: number
}

const Logo: React.FC<Props> = ( { height, width, color } ) => {
    return (
            <svg
                    height={ height }
                    width={ width }
                    viewBox="0 0 50 50"
                    fill={ color }
                    xmlns="http://www.w3.org/2000/svg"
            >
                <g transform="translate(0.000000,50.000000) scale(0.100000,-0.100000)"
                   fill="#000000" stroke="none">
                    <path d="M155 456 c-60 -28 -87 -56 -114 -116 -36 -79 -19 -183 42 -249 33
-36 115 -71 167 -71 52 0 134 35 167 71 34 37 63 110 63 159 0 52 -35 134 -71
167 -37 34 -110 63 -159 63 -27 0 -65 -10 -95 -24z m163 -16 c17 -11 32 -21
32 -23 0 -2 -16 -1 -35 1 -28 3 -40 -1 -65 -26 -41 -41 -41 -83 0 -124 25 -25
37 -29 67 -26 36 4 36 4 14 -14 -52 -41 -144 -30 -183 23 -84 112 51 262 170
189z m-203 -50 c-46 -90 30 -210 135 -210 106 0 180 118 134 213 l-15 32 35
-37 c96 -100 61 -271 -69 -329 -200 -91 -388 161 -243 326 37 43 43 44 23 5z
m242 -12 c29 -27 29 -65 1 -95 -27 -29 -65 -29 -95 -1 -29 27 -29 65 -1 95 27
29 65 29 95 1z"/>
                </g>
            </svg>
    )
}

export default Logo
