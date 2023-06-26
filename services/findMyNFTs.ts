import { type NFT, ThirdwebSDK } from '@thirdweb-dev/sdk'
import { type nftData, nftInfo } from '@/models/interfaces/createNFTFormData'
import { BigNumber } from 'ethers'

export async function findMyNFTs({ connectedAddress }: { connectedAddress: string }) {
	const nfts: nftData[] = []
	const sdkAdmin = ThirdwebSDK.fromPrivateKey(process.env.NEXT_PUBLIC_SDK_PK ?? '', 'mumbai')
	const collection = await sdkAdmin.getContract('0x1ceC0853f059B24F66E4E421c076cdDb778C92b0', 'nft-collection')
	const number = await collection.erc721.getOwned(connectedAddress)
	console.log(connectedAddress)
	console.log(number)
	number.forEach((nft) => {
		nfts.push({
			id: BigNumber.from(nft.metadata.id),
			image: nft.metadata.image ?? '',
			collectionId: collection.erc721.getAddress(),
			name: nft.metadata.name?.toString() ?? '',
		})
	})
	console.log(nfts)
	return nfts
}
