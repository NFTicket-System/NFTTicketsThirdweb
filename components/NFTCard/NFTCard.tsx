import { Button, Card, Image, Loading, Text } from '@nextui-org/react'
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
				maxHeight: '50rem',
			}}
			variant={'shadow'}>
			{!displayQrCode && (
				<Image
					alt={'nft image'}
					src={props.nft.image}
					width={'100%'}
					objectFit="cover"
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
			<Text h4>{props.nft.name}</Text>

			<Button
				css={{ minHeight: '3rem' }}
				onClick={() => {
					setDisplayQrCode(!displayQrCode)
				}}>
				{!displayQrCode ? 'Afficher le QRCode' : 'Masquer le QRCode'}
			</Button>
			<Button
				disabled
				onClick={async () => {
					await props.listNFT(props.nft)
				}}>
				{!isListing && 'Lister le NFT  '}
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
