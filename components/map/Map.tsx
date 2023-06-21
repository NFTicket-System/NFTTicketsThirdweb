import React, { useEffect } from 'react'
import { MapContainer, Marker, TileLayer, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

const icon = L.icon({
	iconUrl: '../assets/markerMapCustom.png',
	iconSize: [25, 35],
})

function ResetCenterView({ lat, lon }: { lat: number; lon: number }) {
	const map = useMap()

	useEffect(() => {
		map.setView(L.latLng(lat, lon), 19, { animate: true })
	}, [lat, lon, map])

	return null
}

const LeafMap = ({ lat, lon }: { lat: number; lon: number }) => {
	return (
		<>
			<MapContainer
				style={{ height: '100%', width: '100%' }}
				center={[lat, lon]}
				zoom={12}
				scrollWheelZoom={false}>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url="https://api.maptiler.com/maps/streets-v2/256/{z}/{x}/{y}.png?key=t0GGpRzYEUqVOPxv1cHk"
				/>
				<Marker
					position={[lat, lon]}
					icon={icon}></Marker>
				<ResetCenterView
					lat={lat}
					lon={lon}
				/>
			</MapContainer>
		</>
	)
}

export default LeafMap
