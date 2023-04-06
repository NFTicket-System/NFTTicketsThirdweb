import React, { useState } from 'react'
import { Button, Grid, Input, Loading, Modal, Spacer } from '@nextui-org/react'
import { useForm } from 'react-hook-form'
import { useAddress, useConnect, useNetwork, useNetworkMismatch } from '@thirdweb-dev/react'
import { ChainId, ThirdwebSDK } from '@thirdweb-dev/sdk'
import { type formDataType } from '../../models/interfaces/createNFTFormData'
import { InputName } from '../../models/enum/createNFTInputs'
import swal from 'sweetalert'
import { createNFTicket } from '../../services/createNFTicket'
import { noConnectedWalletErrorAlert } from '../../utils/errors/noConnectedWalletErrorAlert'
import { defaultErrorModal } from '../../utils/errors/defaultErrorAlert'

const NftDrop = () => {
	const {
		register,
		handleSubmit,
		formState: { isSubmitting },
	} = useForm<formDataType>()
	const sdkAdmin = ThirdwebSDK.fromPrivateKey(process.env.NEXT_PUBLIC_SDK_PK ?? '', 'mumbai')
	const [{ data: userWallet }] = useConnect()
	const connectedAddress = useAddress()
	const [visible, setVisible] = useState(false)
	const isMismatched = useNetworkMismatch()
	const [, switchNetwork] = useNetwork()
	const handler = () => {
		setVisible(true)
	}

	const closeHandler = () => {
		setVisible(false)
		console.log('closed')
	}

	const onSubmit = async (formData: formDataType) => {
		handler()

		if (!userWallet.connected) {
			noConnectedWalletErrorAlert()
		} else {
			if (isMismatched) {
				closeHandler()
				await switchNetwork?.(ChainId.Mumbai)
				return
			}

			await createNFTicket(formData, sdkAdmin, connectedAddress)
				.then(() => {
					void swal(
						'Bravo !',
						formData.count > 1
							? 'Vos tickets aux étés ajoutés à la blockchain et sont disponibles à la vente !'
							: 'Votre ticket a été ajouté à la blockchain et est disponible à la vente !',
						'success'
					)
				})
				.catch((e) => {
					defaultErrorModal()
					console.error(e)
				})
			closeHandler()
		}
	}

	return (
		<>
			<Grid.Container justify={'center'}>
				<form onSubmit={handleSubmit(onSubmit)}>
					<Input
						size={'md'}
						clearable
						bordered
						color={'primary'}
						labelPlaceholder="Nom de l'évènement"
						{...register(InputName.NAME, { required: true })}
					/>
					<Input
						size={'md'}
						clearable
						bordered
						color={'primary'}
						labelPlaceholder="Description de l'évènement"
						{...register(InputName.DESCRIPTION, { required: true })}
					/>
					<Input
						size={'md'}
						clearable
						bordered
						color={'primary'}
						labelPlaceholder="Date"
						{...register(InputName.DATE, { required: true })}
					/>
					<Input
						size={'md'}
						clearable
						bordered
						color={'primary'}
						labelPlaceholder="Count"
						{...register(InputName.COUNT, { required: true })}
					/>
					<Input
						size={'md'}
						clearable
						bordered
						color={'primary'}
						labelPlaceholder="Price"
						{...register(InputName.PRICE, { required: true })}
					/>
					<Input
						size={'md'}
						clearable
						bordered
						color={'primary'}
						labelPlaceholder="Hour start"
						{...register(InputName.HOUR_START, { required: true })}
					/>
					<Input
						size={'md'}
						clearable
						bordered
						color={'primary'}
						labelPlaceholder="Hour end"
						{...register(InputName.HOUR_END, { required: true })}
					/>
					<Input
						size={'md'}
						clearable
						bordered
						color={'primary'}
						labelPlaceholder="Location"
						{...register(InputName.LOCATION, { required: true })}
					/>
					<Input
						size={'md'}
						clearable
						bordered
						color={'primary'}
						labelPlaceholder="Image"
						{...register(InputName.IMAGE, { required: true })}
					/>
					<Spacer y={2} />
					<Button type="submit">{isSubmitting ? 'Loading' : 'Submit'}</Button>
				</form>
				<Modal
					open={visible}
					fullScreen>
					<Modal.Body>
						<Grid.Container
							justify={'center'}
							alignItems={'center'}
							css={{ height: '100%' }}>
							<Loading size={'xl'} />
						</Grid.Container>
					</Modal.Body>
				</Modal>
			</Grid.Container>
			{/* <Map /> */}
		</>
	)
}

export default NftDrop
