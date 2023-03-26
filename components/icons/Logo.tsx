import React from 'react'

interface Props {
	color: string
	height: number
	width: number
}

const Logo: React.FC<Props> = ({ height, width, color }) => {
	return (
		<svg
			height={height}
			width={width}
			viewBox="0 0 50 50"
			fill={color}
			xmlns="http://www.w3.org/2000/svg">
			<path
				fill="#ffd54f"
				d="M42,24V6H6v18l0,18l13.5-9L6,24H42z"
			/>
		</svg>
	)
}

export default Logo
