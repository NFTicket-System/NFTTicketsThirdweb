import React, { useState } from 'react'
import { Button, Grid, Input, Loading, Modal, Spacer } from '@nextui-org/react'
import { useForm } from 'react-hook-form'
import { useAddress, useConnect } from '@thirdweb-dev/react'
import { ThirdwebSDK } from '@thirdweb-dev/sdk'
import { type formDataType } from '../../models/interfaces/createNFTFormData'
import { InputName } from '../../models/enum/createNFTInputs'
import { createNFTicket } from '../../services/createNFTicket'
import swal from 'sweetalert'

const NftDrop = () => {
	const {
		register,
		handleSubmit,
		formState: { isSubmitting },
	} = useForm<formDataType>()
	const sdkAdmin = ThirdwebSDK.fromPrivateKey(process.env.NEXT_PUBLIC_SDK_PK ?? '', 'goerli')
	const [{ data: userWallet }] = useConnect()
	const connectedAddress = useAddress()
	const [visible, setVisible] = useState(false)
	const handler = () => {
		setVisible(true)
	}

	const closeHandler = () => {
		setVisible(false)
		console.log('closed')
	}

	const onSubmit = async (formData: formDataType) => {
		handler()

		if (userWallet.connected) {
			await createNFTicket(formData, sdkAdmin, connectedAddress)
				.then(() => {
					swal(
						'Bravo !',
						formData.count > 1
							? 'Vos tickets aux étés ajoutés a la blockchain et sont disponibles en vente !'
							: 'Votre ticket a été ajouté a la blockchain et est disponible en vente !',
						'success'
					).catch((e) => {
						console.error(e)
					})
				})
				.catch((e) => {
					console.error(e)
				})
		} else {
			swal('', 'Veuillez connecter votre wallet grâce au button du menu principal !', 'error').catch((e) => {
				console.error(e)
			})
			console.log('no connected wallet')
		}
		closeHandler()
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
		</>
	)
}

export default NftDrop
