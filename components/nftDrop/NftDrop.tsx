import React, { type SetStateAction, useState } from 'react'
import {
	Button,
	Card,
	Col,
	Container,
	Grid,
	Input,
	Loading,
	Modal,
	Progress,
	Row,
	Spacer,
	Text,
	Textarea,
	useTheme,
} from '@nextui-org/react'
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
import { FileUploader } from 'react-drag-drop-files'
import { ImUpload } from '@react-icons/all-files/im/ImUpload'

const NftDrop = () => {
	const { isDark } = useTheme()
	const {
		register,
		handleSubmit,
		formState: { isSubmitting },
	} = useForm<formDataType>()
	// const [file, setFile] = useState<File>()
	const [imageUrl, setImageUrl] = useState<string>()
	const [triedToSubmit, setTriedToSubmit] = useState<boolean>(false)
	const [inputValue, setinputValue] = useState<string>('')

	const { mutateAsync: upload } = useStorageUpload()
	const sdkAdmin = ThirdwebSDK.fromPrivateKey(process.env.NEXT_PUBLIC_SDK_PK ?? '', 'mumbai')
	const [{ data: userWallet }] = useConnect()
	const connectedAddress = useAddress()
	const [visible, setVisible] = useState(false)
	const isMismatched = useNetworkMismatch()
	const [, switchNetwork] = useNetwork()

	const [file, setFile] = useState<File | null>()
	const handleImageChange = (file: File) => {
		setFile(file)
	}

	const handleInputChange = (e: { target: { value: SetStateAction<string> } }) => {
		setinputValue(e.target.value)
	}

	const handler = () => {
		setVisible(true)
	}

	const closeHandler = () => {
		setVisible(false)
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
			await nextStep()
				.then(() => {
					setTriedToSubmit(false)
					setinputValue('')
				})
				.catch((e) => {
					defaultErrorModal()
					console.error(e)
				})
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

	const { steps, currentStepIndex, step, isFirstStep, previousStep, nextStep, isLastStep } = useMultiStepForm([
		<FormWrapper
			title={"Description de l'évènement"}
			key={'description-step'}>
			<Input
				underlined
				clearable
				type={'text'}
				required
				{...register(InputName.NAME)}
				onChange={(e) => {
					inputValue === '' ? setTriedToSubmit(true) : setTriedToSubmit(false)
					handleInputChange(e)
				}}
				label={"Nom de l'évènement *"}
				status={inputValue === '' && triedToSubmit ? 'error' : 'default'}
				color={inputValue === '' && triedToSubmit ? 'error' : 'default'}
				helperText={inputValue === '' && triedToSubmit ? 'Champ requis' : ''}
				onClearClick={() => {
					setTriedToSubmit(false)
				}}
				helperColor="error"
			/>
			<Spacer y={4} />
			<Text>Description de l&apos;évènement</Text>
			<Textarea
				bordered
				color="default"
				helperText={'Décrivez votre évènement en quelques mots'}
				{...register(InputName.DESCRIPTION)}
			/>
		</FormWrapper>,
		<FormWrapper
			title={"Affiche de l'évènement"}
			key={'image-step'}>
			{file != null ? (
				<Card>
					<Card.Image
						src={URL.createObjectURL(file)}
						objectFit="cover"
						width="100%"
						height={340}
						alt="Card image background"
					/>
					<Card.Footer
						isBlurred
						css={
							isDark === true
								? {
										position: 'absolute',
										bgBlur: '#0f111466',
										borderTop: '$borderWeights$light solid $gray800',
										bottom: 0,
										zIndex: 1,
								  }
								: {
										position: 'absolute',
										bgBlur: '#ffffff66',
										borderTop: '$borderWeights$light solid rgba(255, 255, 255, 0.2)',
										bottom: 0,
										zIndex: 1,
								  }
						}>
						<Row>
							<Col>
								<Text
									color={isDark === true ? '#d1d1d1' : '#000'}
									size={'$xl2'}>
									${file.name}
								</Text>
							</Col>
							<Col>
								<Row justify="flex-end">
									<Button
										onClick={() => {
											setFile(null)
										}}
										auto
										rounded
										shadow
										color={'error'}>
										<Text
											css={{ color: 'inherit' }}
											size={12}
											weight="bold"
											transform="uppercase">
											Supprimer
										</Text>
									</Button>
								</Row>
							</Col>
						</Row>
					</Card.Footer>
				</Card>
			) : (
				<>
					<FileUploader
						multiple={false}
						/* label={'Cliquez ou déposez une image ici'}
                                    hoverTitle={'Déposez ici'} */
						required={true}
						handleChange={handleImageChange}
						name="file"
						types={['JPG', 'PNG']}
						onTypeError={defaultErrorModal}>
						<Card
							isPressable
							isHoverable
							variant="bordered">
							<Card.Body>
								<Container
									display={'flex'}
									direction={'row'}
									alignItems={'center'}
									justify={'center'}>
									<Text size={'$3xl'}>
										<ImUpload />
									</Text>
									<Spacer x={1} />
									<Text>Cliquez ou déposez l&apos;affiche de l&apos;évènement ici</Text>
								</Container>
							</Card.Body>
						</Card>
					</FileUploader>

					{file === null && triedToSubmit ? (
						<>
							<Spacer y={1} />
							<Button
								flat
								color="error">
								Veuillez choisir votre
							</Button>

							{/* <Card variant="flat">
								<Card.Body>
									<Container
										display={'flex'}
										direction={'row'}
										alignItems={'center'}
										justify={'center'}>
										<Text>Cliquez ou déposez l&apos;affiche de l&apos;évènement ici</Text>
									</Container>
								</Card.Body>
							</Card> */}
						</>
					) : null}
				</>
			)}
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
							<Button
								onClick={() => {
									setTriedToSubmit(true)
								}}
								type={'submit'}>
								{isLastStep ? 'Mettre en vente' : 'Suivant'}
							</Button>
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
