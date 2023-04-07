import React, { type SetStateAction, useState } from 'react'
import { Button, Container, Grid, Input, Loading, Modal, Progress, Row, Spacer, Textarea } from '@nextui-org/react'
import { useForm } from 'react-hook-form'
import { useAddress, useConnect, useNetwork, useNetworkMismatch, useStorageUpload } from '@thirdweb-dev/react'
import { ChainId, ThirdwebSDK } from '@thirdweb-dev/sdk'
import { type formDataType } from '../../models/interfaces/createNFTFormData'
import swal from 'sweetalert'
import { createNFTicket } from '../../services/createNFTicket'
import { noConnectedWalletErrorAlert } from '../../utils/errors/noConnectedWalletErrorAlert'
import { defaultErrorModal } from '../../utils/errors/defaultErrorAlert'
import { useMultiStepForm } from '../../hooks/useMultiStepForm'
import FormWrapper from '../forms/FormWrapper'
import { InputName } from '../../models/enum/createNFTInputs'

const NftDrop = () => {
	const {
		register,
		handleSubmit,
		formState: { isSubmitting },
	} = useForm<formDataType>()
	const [file, setFile] = useState<File>()
	const [imageUrl, setImageUrl] = useState<string>()
	const { mutateAsync: upload } = useStorageUpload()
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

	const uploadToIpfs = async () => {
		const uploadUrl = await upload({
			data: [file],
			options: { uploadWithGatewayUrl: true, uploadWithoutDirectory: true },
		})
		setImageUrl(uploadUrl[0])
		console.log(uploadUrl)
	}

	const onSubmit = async (formData: formDataType) => {
		if (!isLastStep) {
			nextStep()
		} else {
			if (!userWallet.connected) {
				noConnectedWalletErrorAlert()
			} else {
				if (isMismatched) {
					closeHandler()
					await switchNetwork?.(ChainId.Mumbai)
					return
				}
				handler()
				await createNFTicket(formData, sdkAdmin, connectedAddress, imageUrl)
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
	}

	const [searchTerm, setSearchTerm] = useState<string>('')

	const handleChange = (e: { target: { value: SetStateAction<string> } }) => {
		setSearchTerm(e.target.value)
	}

	const { steps, currentStepIndex, step, isFirstStep, previousStep, nextStep, isLastStep } = useMultiStepForm([
		<FormWrapper
			title={"Décription de l'évènement"}
			key={'first-step'}>
			<Input
				clearable
				underlined
				labelPlaceholder="Nom de l'évènement *"
				{...register(InputName.NAME, { required: true })}
				color="primary"
				onChange={handleChange}
				helperText={searchTerm === '' ? 'Champ requis' : ''}
			/>
			<Spacer y={4} />
			<Textarea
				bordered
				color="primary"
				labelPlaceholder="Description de l'évènement"
				helperText={'Décrivez votre évènement en quelques mots'}
				{...register(InputName.DESCRIPTION)}
			/>
		</FormWrapper>,
		<FormWrapper
			title={'Two'}
			key={'two'}>
			TWO CONTENT
		</FormWrapper>,
		<FormWrapper
			title={'three'}
			key={'three'}>
			TWO CONTENT
		</FormWrapper>,
	])

	return (
		<>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Container
					sm
					display={'flex'}
					direction={'column'}
					alignItems={'center'}>
					<Progress
						value={((currentStepIndex + 1) * 100) / steps.length}
						color="primary"
						status="primary"
					/>
					<Spacer y={4} />
					{step}
					<Spacer y={2} />
					<Row justify={'flex-end'}>
						<Button.Group
							rounded
							flat>
							{!isFirstStep ? <Button onClick={previousStep}>Précédent</Button> : null}
							<Button type={'submit'}>{isLastStep ? 'Mettre en vente' : 'Suivant'}</Button>
						</Button.Group>
					</Row>
				</Container>
				{/*			<Input
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
				/> */}
				{/* <Button type="submit">{isSubmitting ? 'Loading' : 'Submit'}</Button> */}
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
			{/* <Map /> */}
			{/*			<input
				type="file"
				onChange={(e) => {
					if (e.target.files?.item(0) == null) return
					setFile(e.target.files.item(0)!)
				}}
			/>
			<button onClick={uploadToIpfs}>Upload</button> */}
		</>
	)
}

export default NftDrop
