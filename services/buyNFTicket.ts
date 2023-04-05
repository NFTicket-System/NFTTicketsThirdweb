import { BigNumber, type BigNumberish } from 'ethers'
import { ChainId, type Marketplace } from '@thirdweb-dev/sdk'
import { noConnectedWalletErrorAlert } from '../utils/errors/noConnectedWalletErrorAlert'
import swal from 'sweetalert'
import { defaultErrorModal } from '../utils/errors/defaultErrorAlert'
import { type SwitchChainError } from 'wagmi-core'
import { type Chain } from '@thirdweb-dev/react'

export async function buyNft({
	nftId,
	isMismatched,
	switchNetwork,
	marketplace,
}: {
	nftId: BigNumberish
	isMismatched: boolean
	switchNetwork:
		| ((
				chainId: number
		  ) => Promise<{ data: undefined; error: SwitchChainError } | { data: Chain | undefined; error: undefined }>)
		| undefined
	marketplace: Marketplace | undefined
}) {
	try {
		// Ensure user is on the correct network
		if (isMismatched) {
			await switchNetwork?.(ChainId.Mumbai)
			return
		}

		// Simple one-liner for buying the NFT
		await marketplace
			?.buyoutListing(BigNumber.from(nftId), 1)
			.then(() => {
				void swal('Transaction confirmer !', 'Ticket ajouté à votre wallet.', 'success')
			})
			.catch((e) => {
				defaultErrorModal()
				console.error(e)
			})
	} catch (error) {
		noConnectedWalletErrorAlert()
	}
}
