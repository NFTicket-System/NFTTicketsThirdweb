import { BigNumber, type BigNumberish } from 'ethers'
import { ChainId, ListingType, type Marketplace, ThirdwebSDK } from '@thirdweb-dev/sdk'
import { noConnectedWalletErrorAlert } from '../utils/errors/noConnectedWalletErrorAlert'
import swal from 'sweetalert'
import { defaultErrorModal } from '../utils/errors/defaultErrorAlert'
import { type SwitchChainError } from 'wagmi-core'
import { type Chain, useBuyNow } from '@thirdweb-dev/react'
import Stripe from 'stripe'

export async function BuyWithStripe({
	nftId,
	marketplace,
	connectedAddress,
}: {
	nftId: BigNumberish
	marketplace: Marketplace | undefined
	connectedAddress: string
}) {
	const { mutateAsync: buyNow } = useBuyNow(marketplace)
	try {
		const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? '', {
			apiVersion: '2022-11-15',
		})
		await buyNow({
			id: nftId, // ID of the listing to buy
			type: ListingType.Direct, // Direct (0) or Auction (1)
			buyAmount: 1, // Amount to buy
			buyForWallet: process.env.NEXT_PUBLIC_SDK_PK, // Wallet to buy for, defaults to current wallet
		})
	} catch (error) {
		console.log(error)
	}
}
