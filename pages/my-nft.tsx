import React, { useEffect, useState } from 'react'
import {
	MediaRenderer,
	useActiveListings,
	useAddress,
	useConnectedWallet,
	useContract,
	useSigner,
	useWalletConnect,
} from '@thirdweb-dev/react'
import { Col, Container, Grid, Link, Loading, Row } from '@nextui-org/react'
import Header from '../components/header/Header'
import ScrollToTop from 'react-scroll-to-top'
import { findMyNFTs } from '@/services/findMyNFTs'
import { NATIVE_TOKEN_ADDRESS, type NFT, ThirdwebSDK } from '@thirdweb-dev/sdk'
import { type nftData } from '@/models/interfaces/createNFTFormData'
import QRCode from 'react-qr-code'
import { NFTCard } from '@/components/NFTCard/NFTCard'

const MyNFT = () => {
	const connectedAddress = useAddress()
	const userWallet = useWalletConnect()
	const marketplace = useContract(process.env.NEXT_PUBLIC_MARKETPLACE_ADRESS, 'marketplace')
	const [isLoading, setIsLoading] = useState(true)
	const [nfts, setNfts] = useState<nftData[]>([])

	useEffect(() => {
		setIsLoading(true)
		if (connectedAddress != null) {
			void findMyNFTs({
				connectedAddress: connectedAddress,
			})
				.then((res) => {
					setNfts(res)
				})
				.finally(() => {
					setIsLoading(false)
				})
		}
	}, [connectedAddress])

	const listNFT = async (nft: nftData, setIsListing: Function) => {
		return
		setIsListing(true)
		console.log(nft)
		console.log(process.env.NEXT_PUBLIC_SDK_PK)
		console.log(process.env.NEXT_PUBLIC_MARKETPLACE_ADRESS)
		const sdkAdmin = ThirdwebSDK.fromPrivateKey(process.env.NEXT_PUBLIC_SDK_PK ?? '', 'mumbai')
		// const wallet = await ThirdwebSDK.fromWallet(userWallet, 'mumbai')
		// const marketplace = await wallet.getContract(process.env.NEXT_PUBLIC_MARKETPLACE_ADRESS ?? '', 'marketplace')
		console.log('sdkAdmin')

		// const marketplace = await sdkAdmin?.getContract(process.env.NEXT_PUBLIC_MARKETPLACE_ADRESS ?? '',
		// 'marketplace')
		console.log('marketplace')

		console.log(sdkAdmin)
		console.log(marketplace)

		const listing = {
			// address of the contract the asset you want to list is on
			assetContractAddress: nft.collectionId ?? '',
			// token ID of the asset you want to list
			tokenId: nft.id,
			// when should the listing open up for offers
			startTimestamp: new Date(),

			// how long the listing will be open for
			listingDurationInSeconds: 86400,
			// how many of the asset you want to list
			quantity: 1,
			// address of the currency contract that will be used to pay for the listing
			currencyContractAddress: NATIVE_TOKEN_ADDRESS,
			// how much the asset will be sold for
			buyoutPricePerToken: '20',
		}
		// marketplace.contract?.direct.createListing(listing)
		setIsListing(false)
	}

	return (
		<>
			<Header></Header>
			<Grid.Container
				xl
				gap={4}
				direction={'row'}
				alignItems={'center'}
				justify={'center'}>
				<h1>Vos NFTs</h1>
				<div>
					{isLoading && (
						<Grid xs={2}>
							<Loading
								type="points"
								size={'lg'}
							/>
						</Grid>
					)}

					{!isLoading &&
						nfts?.map((nft) => {
							return (
								<Grid xs={2}>
									<NFTCard
										nft={nft}
										listNFT={listNFT}
									/>
								</Grid>
							)
						})}
				</div>
			</Grid.Container>
		</>
	)
}

export default MyNFT
