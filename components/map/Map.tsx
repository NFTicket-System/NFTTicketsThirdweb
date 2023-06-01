import React from 'react'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

const position: [number, number] = [51.505, -0.09]

const icon = L.icon({
	iconUrl: '../assets/markerMapCustom.png',
	iconSize: [25, 35],
})

const LeafMap = () => {
	return (
		<>
			<MapContainer
				style={{ height: '100%', width: '100%' }}
				center={[51.505, -0.09]}
				zoom={13}
				scrollWheelZoom={false}>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url="https://api.maptiler.com/maps/streets-v2/256/{z}/{x}/{y}.png?key=t0GGpRzYEUqVOPxv1cHk"
				/>
				<Marker
					position={position}
					icon={icon}>
					<Popup>
						A pretty CSS3 popup. <br /> Easily customizable.
					</Popup>
				</Marker>
			</MapContainer>
		</>
	)
}

export default LeafMap
