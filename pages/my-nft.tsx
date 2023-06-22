import React, { useEffect, useState } from 'react'
import { MediaRenderer, useActiveListings, useAddress, useContract } from '@thirdweb-dev/react'
import { Link, Loading, Row } from '@nextui-org/react'
import Header from '../components/header/Header'
import ScrollToTop from 'react-scroll-to-top'
import { findMyNFTs } from '@/services/findMyNFTs'
import { type NFT } from '@thirdweb-dev/sdk'

const MyNFT = () => {
	const connectedAddress = useAddress()
	let nfts: NFT[] = []
	const [isLoading, setIsLoading] = useState(true)
	useEffect(() => {
		void (async () => {
			nfts = await findMyNFTs({
				connectedAddress: connectedAddress != null ? connectedAddress : '',
			})
			setIsLoading(false)
			console.log(isLoading)
		})()
	})

	return (
		<>
			<Header></Header>
			AFIoebAVIUbvaiub
			<div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: '15rem' }}>
				{true &&
					nfts?.map((nft) => (
						<div key={nft.metadata.id}>
							<MediaRenderer
								src={nft.metadata.image}
								height={'250rem'}
							/>
						</div>
					))}
			</div>
		</>
	)
}

export default MyNFT
