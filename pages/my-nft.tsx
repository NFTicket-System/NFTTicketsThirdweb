import React, { useEffect, useState } from 'react'
import { MediaRenderer, useActiveListings, useAddress, useContract } from '@thirdweb-dev/react'
import { Link, Loading, Row } from '@nextui-org/react'
import Header from '../components/header/Header'
import ScrollToTop from 'react-scroll-to-top'
import { findMyNFTs } from '@/services/findMyNFTs'
import { NATIVE_TOKEN_ADDRESS, type NFT, ThirdwebSDK } from '@thirdweb-dev/sdk'

const MyNFT = () => {
	const connectedAddress = useAddress()
	const [isLoading, setIsLoading] = useState(true)
	const [nfts, setNfts] = useState<NFT[]>([])
	useEffect(() => {
		void (async () => {
			const response = await findMyNFTs({
				connectedAddress: connectedAddress != null ? connectedAddress : '',
			})
			setNfts(response)
			setIsLoading(false)
			console.log(isLoading)
		})()
	})
	const listNtf = async (collectionAddress: string, nft: NFT) => {
		console.log(nft)
		return
		const sdkAdmin = ThirdwebSDK.fromPrivateKey(process.env.NEXT_PUBLIC_SDK_PK ?? '', 'mumbai')
		const marketplace = await sdkAdmin?.getContract(process.env.NEXT_PUBLIC_MARKETPLACE_ADRESS ?? '', 'marketplace')

		const listing = {
			// address of the contract the asset you want to list is on
			assetContractAddress: collectionAddress ?? '',
			// token ID of the asset you want to list
			tokenId: nft !== null ? nft.metadata.id : 0,
			// when should the listing open up for offers
			startTimestamp: new Date(),

			// how long the listing will be open for
			listingDurationInSeconds: 86400,
			// how many of the asset you want to list
			quantity: 1,
			// address of the currency contract that will be used to pay for the listing
			currencyContractAddress: NATIVE_TOKEN_ADDRESS,
			// how much the asset will be sold for
			buyoutPricePerToken: 20,
		}
		await marketplace?.direct.createListing(listing)
	}

	return (
		<>
			<Header></Header>
			<h1>Vos NFTs</h1>
			<div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: '15rem' }}>
				{!isLoading &&
					nfts?.map((nft) => (
						<div
							key={nft.metadata.id}
							style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
							<MediaRenderer
								src={nft.metadata.image}
								height={'250rem'}
							/>
							{nft.metadata.name}
							<button
								onClick={async () => {
									await listNtf('', nft)
								}}
							/>
						</div>
					))}
			</div>
		</>
	)
}

export default MyNFT
