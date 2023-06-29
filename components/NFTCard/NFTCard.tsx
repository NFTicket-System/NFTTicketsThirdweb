import { MediaRenderer } from '@thirdweb-dev/react'
import { Button, Card, Loading } from '@nextui-org/react'
import QRCode from 'react-qr-code'
import React, { useState } from 'react'
import { type nftData } from '@/models/interfaces/createNFTFormData'

export function NFTCard(props: { nft: nftData; listNFT: Function }) {
	const [displayQrCode, setDisplayQrCode] = useState(false)
	const [isListing, setIsListing] = useState(false)
	return (
		<Card
			key={parseInt(props.nft.id.toString())}
			style={{
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'center',
				gap: '10px',
				minWidth: '25rem',
				minHeight: '20rem',
				paddingBottom: '10px',
			}}
			variant={'bordered'}>
			{!displayQrCode && (
				<MediaRenderer
					src={props.nft.image}
					height={'250rem'}
				/>
			)}
			{displayQrCode && (
				<QRCode
					size={200}
					bgColor="black"
					fgColor="white"
					value={`${props.nft.id};${props.nft.collectionId}`}
				/>
			)}
			{props.nft.name}

			<Button
				onClick={() => {
					setDisplayQrCode(!displayQrCode)
				}}>
				Display QR code
			</Button>
			<Button
				onClick={async () => {
					await props.listNFT(props.nft)
				}}>
				{!isListing && 'List nft'}
				{isListing && (
					<Loading
						type={'points'}
						size={'sm'}
					/>
				)}
			</Button>
		</Card>
	)
}
