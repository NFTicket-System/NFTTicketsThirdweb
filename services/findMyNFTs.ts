import { NFT, ThirdwebSDK } from '@thirdweb-dev/sdk'
import { nftInfo } from '@/models/interfaces/createNFTFormData'

export async function findMyNFTs({ connectedAddress }: { connectedAddress: string }) {
	const nfts: NFT[] = []
	const sdkAdmin = ThirdwebSDK.fromPrivateKey(process.env.NEXT_PUBLIC_SDK_PK ?? '', 'mumbai')
	const collection = await sdkAdmin.getContract('0x1ceC0853f059B24F66E4E421c076cdDb778C92b0', 'nft-collection')
	const number = await collection.erc721.getOwned(connectedAddress)
	console.log(connectedAddress)
	console.log(number)
	number.forEach((nft) => {
		nfts.push(nft)
	})
	console.log(nfts)
	return nfts
}
