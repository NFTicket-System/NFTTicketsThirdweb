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
	marketplace,
	connectedAddress,
	amount,
	creditCard,
	isMismatched,
	switchNetwork,
}: {
	nftId: BigNumberish
	marketplace: Marketplace | undefined
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
		await buyNft({
			nftId: BigNumber.from(nftId),
			isMismatched,
			switchNetwork,
			marketplace,
		})
		const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? '', {
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
		const paymentIntent = await stripe.paymentIntents.create({
			amount: amount,
			currency: 'eur',
			payment_method: paymentMethod.id,
			confirm: true,
		})
		const sdkAdmin = ThirdwebSDK.fromPrivateKey(process.env.NEXT_PUBLIC_SDK_PK ?? '', 'mumbai')
		const listing = await marketplace?.getListing(nftId)
		if (listing != null) {
			const collection = await sdkAdmin.getContract(listing.assetContractAddress, 'nft-collection')
			await collection.erc721.transfer(connectedAddress, listing.id)
		}
		// sdkAdmin.wallet
	} catch (error) {
		console.log(error)
	}
}
