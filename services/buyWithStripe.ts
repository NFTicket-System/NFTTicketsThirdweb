import { BigNumber, type BigNumberish } from 'ethers'
import { ChainId, ListingType, type Marketplace, ThirdwebSDK } from '@thirdweb-dev/sdk'
import { noConnectedWalletErrorAlert } from '../utils/errors/noConnectedWalletErrorAlert'
import swal from 'sweetalert'
import { defaultErrorModal } from '../utils/errors/defaultErrorAlert'
import { type SwitchChainError } from 'wagmi-core'
import { type Chain, useBuyNow } from '@thirdweb-dev/react'

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
		// Ensure user is on the correct network

		// Simple one-liner for buying the NFT
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
