import { BigNumber, type BigNumberish } from 'ethers'
import { ChainId, ListingType, type Marketplace, ThirdwebSDK } from '@thirdweb-dev/sdk'
import { noConnectedWalletErrorAlert } from '../utils/errors/noConnectedWalletErrorAlert'
import swal from 'sweetalert'
import { defaultErrorModal } from '../utils/errors/defaultErrorAlert'
import { type SwitchChainError } from 'wagmi-core'
import { type Chain, useBuyNow } from '@thirdweb-dev/react'
import Stripe from 'stripe'
import { type creditCard } from '../models/interfaces/createNFTFormData'
import { MutateFunction } from '@tanstack/query-core'
import { buyNft } from './buyNFTicket'

export async function BuyWithStripe({
	nftId,
	connectedAddress,
	amount,
	creditCard,
	isMismatched,
	switchNetwork,
}: {
	nftId: BigNumberish
	connectedAddress: string
	amount: number
	creditCard: creditCard
	isMismatched: boolean
	switchNetwork:
		| ((
				chainId: number
		  ) => Promise<{ data: undefined; error: SwitchChainError } | { data: Chain | undefined; error: undefined }>)
		| undefined
}) {
	try {
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
		if (listing != null) {
			const collection = await sdkAdmin.getContract(listing.assetContractAddress, 'nft-collection')
			console.log(listing.assetContractAddress)
			console.log(collection.getAddress())
			// await marketplace?.direct.cancelListing(listing.id)
			console.log('3')
			void collection.erc721.transfer(connectedAddress, '3')
			console.log('4')

			// await collection.erc721.transfer(connectedAddress, listing.id)
			const paymentIntent = await stripe.paymentIntents.create({
				amount: amount,
				currency: 'eur',
				payment_method: paymentMethod.id,
				confirm: true,
			})
			console.log('5')
		}
		// sdkAdmin.wallet
	} catch (error) {
		console.log(error)
	}
}
