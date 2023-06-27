import { type NFT, ThirdwebSDK } from '@thirdweb-dev/sdk'
import { type nftData, nftInfo } from '@/models/interfaces/createNFTFormData'
import { BigNumber } from 'ethers'
import axios from 'axios'
import { LightEvent } from '@/models/LightEvent'
import { type Ticket } from '@/models/Event'

export async function findMyNFTs({ connectedAddress }: { connectedAddress: string }) {
	const collections: string[] = []
	await axios.get(process.env.NEXT_PUBLIC_API_HOSTNAME + '/api/tickets/all').then((response) => {
		const result: Ticket[] = []
		response.data.map((item: Ticket) => result.push(item))
		result.map((ticket) => collections.push(ticket.addressContract))
	})
	const nfts: nftData[] = []
	const sdkAdmin = ThirdwebSDK.fromPrivateKey(process.env.NEXT_PUBLIC_SDK_PK ?? '', 'mumbai')
	for (const collectionId of collections) {
		if (collectionId.startsWith('0x')) {
			try {
				const collection = await sdkAdmin.getContract(collectionId, 'nft-collection')
				const number = await collection.erc721.getOwned(connectedAddress)

				number.forEach((nft) => {
					nfts.push({
						id: BigNumber.from(nft.metadata.id),
						image: nft.metadata.image ?? '',
						collectionId: collection.erc721.getAddress(),
						name: nft.metadata.name?.toString() ?? '',
					})
				})
			} catch (e) {
				console.log(e)
			}
		}
	}

	return nfts
}
