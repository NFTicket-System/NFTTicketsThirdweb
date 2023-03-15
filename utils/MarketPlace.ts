import { useContract } from '@thirdweb-dev/react'

export const GetMarketplaceContract = async () => {
    const { contract } = await useContract( process.env.NEXT_PUBLIC_MARKETPLACE_ADRESS, "marketplace" );
    return contract
}
