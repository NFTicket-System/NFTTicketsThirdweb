import { NATIVE_TOKEN_ADDRESS, type ThirdwebSDK } from '@thirdweb-dev/sdk'
import { type formDataType } from '../models/interfaces/createNFTFormData'

export async function createNFTicket(
	formData: formDataType,
	sdkAdmin: ThirdwebSDK,
	connectedAddress: string | undefined
) {
	const collectionContractAddress = await sdkAdmin?.deployer.deployNFTCollection({
		name: formData.name,
		primary_sale_recipient: connectedAddress ?? '',
	})

	console.log('COLLECTION')
	const contract = await sdkAdmin?.getContract(collectionContractAddress ?? '', 'nft-collection')

	console.log('CONTRACT')

	const metaData = {
		name: formData.name,
		description: formData.description,
		image: formData.image,
		properties: {
			hourEnd: formData.hourEnd,
			location: formData.location,
			hourStart: formData.hourStart,
			date: formData.date,
		},
	}
	const metaDatas = []

	for (let i = 0; i < formData.count; i++) {
		metaDatas.push(metaData)
	}

	const mintTransaction = await contract?.mintBatchTo(process.env.NEXT_PUBLIC_MADD ?? '', metaDatas)

	console.log('mint')
	for (const nftObject of mintTransaction) {
		const marketplaceAddress = process.env.NEXT_PUBLIC_MARKETPLACE_ADRESS

		const marketplace = await sdkAdmin?.getContract(marketplaceAddress ?? '', 'marketplace')

		const listing = {
			// address of the contract the asset you want to list is on
			assetContractAddress: collectionContractAddress ?? '',
			// token ID of the asset you want to list
			tokenId: nftObject !== null ? nftObject.id : 0,
			// when should the listing open up for offers
			startTimestamp: new Date(),
			// how long the listing will be open for
			listingDurationInSeconds: 86400,
			// how many of the asset you want to list
			quantity: 1,
			// address of the currency contract that will be used to pay for the listing
			currencyContractAddress: NATIVE_TOKEN_ADDRESS,
			// how much the asset will be sold for
			buyoutPricePerToken: formData.price,
		}

		await marketplace?.direct.createListing(listing)
		console.log('market')
	}
}
