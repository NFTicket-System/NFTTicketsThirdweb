import React from 'react'
import { Button, Grid, Input, Loading, Modal, Spacer } from '@nextui-org/react'
import { useForm } from 'react-hook-form'
import { useAddress, useConnect } from '@thirdweb-dev/react'
import { NATIVE_TOKEN_ADDRESS, ThirdwebSDK } from '@thirdweb-dev/sdk'

interface formDataType {
  count: number
  name: string
  description: string
  date: string
  price: string
  hourStart: string
  hourEnd: string
  location: string
  image: string
}

export enum InputEvent {
  NAME = 'name',
  DESCRIPTION = 'description',
  DATE = 'date',
  COUNT = 'count',
  PRICE = 'price',
  HOUR_START = 'hourStart',
  HOUR_END = 'hourEnd',
  LOCATION = 'location',
  IMAGE = 'image'
}

const NftDrop = () => {
  const { register, handleSubmit, formState: { isSubmitting } } = useForm<formDataType>()
  const sdkAdmin = ThirdwebSDK.fromPrivateKey((process.env.NEXT_PUBLIC_SDK_PK ?? ''), 'goerli')
  const [{ data }] = useConnect()
  const connectedAddress = useAddress()
  const [visible, setVisible] = React.useState(false)
  const handler = () => { setVisible(true) }

  const closeHandler = () => {
    setVisible(false)
    console.log('closed')
  }
  // const changeIsLoading = () => { useEffect(() => { isLoading? setIsLoading(false) : setIsLoading(true) }, [])}

  /*    async function saveFormData( data: formDataType ) {
            return await fetch( "http://localhost:5000/create-drop", {
                body: JSON.stringify( data ),
                headers: { "Content-Type": "application/json" },
                method: "POST"
            } )
        } */

  const onSubmit = async (formData: formDataType) => {
    handler()

    if (data.connected) {
      const collectionContractAddress = await sdkAdmin?.deployer.deployNFTCollection({
        name: formData.name,
        primary_sale_recipient: connectedAddress ?? ''
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
          date: formData.date
        }
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
          tokenId: (nftObject !== null) ? nftObject.id : 0,
          // when should the listing open up for offers
          startTimestamp: new Date(),
          // how long the listing will be open for
          listingDurationInSeconds: 86400,
          // how many of the asset you want to list
          quantity: 1,
          // address of the currency contract that will be used to pay for the listing
          currencyContractAddress: NATIVE_TOKEN_ADDRESS,
          // how much the asset will be sold for
          buyoutPricePerToken: formData.price
        }

        await marketplace?.direct.createListing(listing)
        console.log('market')
      }
    } else {
      console.log('no connected wallet')
    }
    closeHandler()
  }

  return (
    <>
      <Grid.Container justify={ 'center' }>
        <form onSubmit={
          handleSubmit(onSubmit)
        }>
          <Input size={ 'md' }
                 clearable
                 bordered
                 color={ 'primary' }
                 labelPlaceholder="Nom de l'évènement"
                 { ...register(InputEvent.NAME, { required: true }) }
          />
          <Input size={ 'md' }
                 clearable
                 bordered
                 color={ 'primary' }
                 labelPlaceholder="Description de l'évènement"
                 { ...register(InputEvent.DESCRIPTION, { required: true }) }
          />
          <Input size={ 'md' }
                 clearable
                 bordered
                 color={ 'primary' }
                 labelPlaceholder="Date"
                 { ...register(InputEvent.DATE, { required: true }) }
          />
          <Input size={ 'md' }
                 clearable
                 bordered
                 color={ 'primary' }
                 labelPlaceholder="Count"
                 { ...register(InputEvent.COUNT, { required: true }) }
          />
          <Input size={ 'md' }
                 clearable
                 bordered
                 color={ 'primary' }
                 labelPlaceholder="Price"
                 { ...register(InputEvent.PRICE, { required: true }) }
          />
          <Input size={ 'md' }
                 clearable
                 bordered
                 color={ 'primary' }
                 labelPlaceholder="Hour start"
                 { ...register(InputEvent.HOUR_START, { required: true }) }
          />
          <Input size={ 'md' }
                 clearable
                 bordered
                 color={ 'primary' }
                 labelPlaceholder="Hour end"
                 { ...register(InputEvent.HOUR_END, { required: true }) }
          />
          <Input size={ 'md' }
                 clearable
                 bordered
                 color={ 'primary' }
                 labelPlaceholder="Location"
                 { ...register(InputEvent.LOCATION, { required: true }) }
          />
          <Input size={ 'md' }
                 clearable
                 bordered
                 color={ 'primary' }
                 labelPlaceholder="Image"
                 { ...register(InputEvent.IMAGE, { required: true }) }
          />
          <Spacer y={ 2 }/>
          <Button type="submit">{ isSubmitting ? 'Loading' : 'Submit' }</Button>
        </form>
        <Modal open={visible} fullScreen >
          <Modal.Body>
            <Grid.Container justify={'center'} alignItems={'center'} css={{ height: '100%' }} >
              <Loading size={'xl'} />
            </Grid.Container>
          </Modal.Body>
        </Modal>
      </Grid.Container>
    </>
  )
}

export default NftDrop
