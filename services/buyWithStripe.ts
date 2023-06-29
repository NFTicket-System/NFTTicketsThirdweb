import { BigNumber, type BigNumberish } from 'ethers'
import { ChainId, ListingType, type Marketplace, ThirdwebSDK } from '@thirdweb-dev/sdk'
import { noConnectedWalletErrorAlert } from '../utils/errors/noConnectedWalletErrorAlert'
import swal from 'sweetalert'
import { defaultErrorModal } from '../utils/errors/defaultErrorAlert'
import { type SwitchChainError } from 'wagmi-core'
import { type Chain, useBuyNow } from '@thirdweb-dev/react'
import Stripe from 'stripe'
import { type creditCard, type maticData } from '../models/interfaces/createNFTFormData'
import { MutateFunction } from '@tanstack/query-core'
import { buyNft } from './buyNFTicket'
import axios from 'axios'

export async function BuyWithStripe({
	nftId,
	connectedAddress,
	creditCard,
	price,
}: {
	nftId: BigNumberish
	connectedAddress: string
	creditCard: creditCard
	price: number
}) {
	try {
		const response = await axios.get('https://api.coingecko.com/api/v3/coins/matic-network')
		const data: maticData = response.data
		const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY ?? '', {
			apiVersion: '2022-11-15',
		})
		const paymentMethod = await stripe.paymentMethods.create({
			type: 'card',
			card: {
				number: creditCard.number,
				exp_month: creditCard.expMonth,
				exp_year: creditCard.expYear,
				cvc: creditCard.cvc,
			},
		})
		const sdkAdmin = ThirdwebSDK.fromPrivateKey(process.env.NEXT_PUBLIC_SDK_PK ?? '', 'mumbai')
		const marketplaceAddress = process.env.NEXT_PUBLIC_MARKETPLACE_ADRESS
		const marketplace = await sdkAdmin?.getContract(marketplaceAddress ?? '', 'marketplace')
		const listing = await marketplace?.getListing(nftId)

		console.log(price)
		if (listing != null) {
			const collection = await sdkAdmin.getContract(listing.assetContractAddress, 'nft-collection')
			console.log(listing.assetContractAddress)
			console.log(collection.getAddress())
			void collection.erc721.transfer(connectedAddress, listing.asset.id)

			await stripe.paymentIntents.create({
				amount: price * 100,
				currency: 'eur',
				payment_method: paymentMethod.id,
				confirm: true,
			})
		}
	} catch (error) {
		console.log(error)
	}
}
