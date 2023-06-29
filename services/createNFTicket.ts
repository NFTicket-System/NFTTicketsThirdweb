import { NATIVE_TOKEN_ADDRESS, type ThirdwebSDK } from '@thirdweb-dev/sdk'
import { type CreateEventCategories, type CreateTicket } from '@/models/interfaces/createNFTFormData'
import axios from 'axios'
import { convertEuroToMATIC, convertToTimestamp } from '@/utils/tools'
import { type Category } from '@/models/Category'
import { type FormDataTypeClass } from '@/models/formDataTypeClass'
import { ConversionSens } from '@/models/enum/createNFTInputs'

export function createMetadatas(formData: FormDataTypeClass, imageUrl: string | undefined) {
	console.log('form', formData)
	const metaData = {
		name: formData.name,
		description: formData.description,
		image: imageUrl,
		properties: {
			hourEnd: formData.hourEnd,
			location: formData.location,
			hourStart: formData.hourStart,
			date: formData.date,
			ticketType: formData.ticketType,
		},
	}
	const metaDatas = []

	for (let i = 0; i < formData.count; i++) {
		metaDatas.push(metaData)
	}
	return metaDatas
}

export async function createNFTicket(
	formData: FormDataTypeClass,
	sdkAdmin: ThirdwebSDK,
	connectedAddress: string | undefined,
	imageUrl: string | undefined,
	// eslint-disable-next-line @typescript-eslint/ban-types
	setCreationStep: Function,
	insertId: number
) {
	console.log('TOTAL', formData)

	setCreationStep(`Création de la collection des billets : ${formData.ticketType}`)

	const collectionContractAddress = await sdkAdmin?.deployer.deployNFTCollection({
		name: formData.ticketType,
		primary_sale_recipient: connectedAddress ?? '',
	})

	const tickets2Add: CreateTicket[] = []

	console.log('COLLECTION')
	const contract = await sdkAdmin?.getContract(collectionContractAddress ?? '', 'nft-collection')

	console.log('CONTRACT')

	setCreationStep(`Création des NFT: ${formData.ticketType}`)
	const metaDatas = createMetadatas(formData, imageUrl)

	const mintTransaction = await contract.mintBatchTo(process.env.NEXT_PUBLIC_MADD ?? '', metaDatas)
	console.log('MINT')

	setCreationStep(`Mise en vente des NFT : ${formData.ticketType}`)

	console.log('FORMDATA', formData)

	const priceInMatic = await convertEuroToMATIC(Number(formData.price), ConversionSens.MATIC)

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
			buyoutPricePerToken: priceInMatic,
		}

		console.log('LISTING', listing)

		await marketplace?.direct.createListing(listing).then(() => {
			const ticket: CreateTicket = {
				addressContract: listing.assetContractAddress,
				idEvent: insertId,
				prix: formData.price,
				type: formData.ticketType,
				date: convertToTimestamp(formData.date, formData.hourStart),
				solded: 0,
			}
			tickets2Add.push(ticket)
		})

		console.log('MARKETPLACE')
	}

	console.log('TICKETS', tickets2Add)

	axios
		.post(process.env.NEXT_PUBLIC_API_HOSTNAME + '/api/events/ticket', tickets2Add)
		.then((response) => {
			console.log('POST request successful:', response.data)
		})
		.catch((error) => {
			console.error('Error making POST request:', error)
		})
}

let categories: Category[] = []
export const getAllEventsObjCategories = async (): Promise<Category[]> => {
	await axios
		.get(process.env.NEXT_PUBLIC_API_HOSTNAME + '/api/events/all/category')
		.then((res) => {
			categories = res.data
		})
		.catch((error) => {
			console.error('Error making POST request:', error)
		})
	return categories
}

export const matchCategories = (selectedItems: string[]): Array<Category | null> => {
	const objects: Category[] = categories
	return selectedItems.map((category) => {
		const matchedObject = objects.find((obj) => obj.libelle === category)
		return matchedObject != null ? matchedObject : null
	})
}

export const createEventCategories = async (categories: CreateEventCategories) => {
	await axios.post(process.env.NEXT_PUBLIC_API_HOSTNAME + '/api/events/categories', categories).catch((error) => {
		console.error('Error making PUT request:', error)
	})
}
