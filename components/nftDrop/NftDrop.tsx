import React, { type ReactNode, type SetStateAction, useState } from 'react'
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
import { type formDataType } from '@/models/interfaces/createNFTFormData'
import { noConnectedWalletErrorAlert } from '@/utils/errors/noConnectedWalletErrorAlert'
import { defaultErrorModal } from '@/utils/errors/defaultErrorAlert'
import { useMultiStepForm } from '@/hooks/useMultiStepForm'
import FormWrapper from '../forms/FormWrapper'
import { InputName } from '@/models/enum/createNFTInputs'
import { FileUploader } from 'react-drag-drop-files'
import styles from '../../styles/create-event/NftDrop.module.scss'
import { RiImageAddFill } from '@react-icons/all-files/ri/RiImageAddFill'
import { isInputValid, setHelperText } from '@/utils/errors/formCheckValidity'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
import { formatLocationString, getLocationDetails } from '@/services/getLocationDetails'
import { type NominatimLocation } from '@/models/interfaces/nominatimLocation'
import { GrLocationPin } from '@react-icons/all-files/gr/GrLocationPin'

const Map = dynamic(async () => await import('@/components/map/Map'), { ssr: false })

function Marker(props: { position: number[]; children: ReactNode }) {
	return null
}

const NftDrop = () => {
	const router = useRouter()
	const { isDark } = useTheme()
	const {
		register,
		handleSubmit,
		formState: { isSubmitting },
	} = useForm<formDataType>()
	const [triedToSubmit, setTriedToSubmit] = useState<boolean>(false)
	const [inputValue, setInputValue] = useState<string>('')

	const [locationInfo, setLocationInfo] = useState<NominatimLocation[]>([])
	const [locationCoord, setLocationCoord] = useState<{ lat: number; lon: number }>({ lat: 48.866667, lon: 2.333333 })
	const [selectedLocation, setSelectedLocation] = useState<string>('')

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
		setInputValue(e.target.value)
	}

	const handler = () => {
		setVisible(true)
	}

	const closeHandler = () => {
		setVisible(false)
	}

	const uploadToIpfs = async (): Promise<string> => {
		const url = await upload({
			data: [file],
			options: { uploadWithGatewayUrl: true, uploadWithoutDirectory: true },
		})
		console.log(url[0])
		return url[0]
	}

	const onSubmit = async (formData: formDataType) => {
		if (!isLastStep) {
			await nextStep()
				.then(() => {
					setTriedToSubmit(false)
					setInputValue('')
				})
				.catch((e) => {
					defaultErrorModal()
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
				// show loader modal
				handler()
				// upload img to ipfs
				const imgUrl = await uploadToIpfs()
				// create the ticket

				/*	await createNFTicket(formData, sdkAdmin, connectedAddress, imgUrl)
					.then(() => {
						closeHandler()
						void swal(
							'Bravo !',
							formData.count > 1
								? 'Vos tickets aux étés ajoutés à la blockchain et sont disponibles à la vente !'
								: 'Votre ticket a été ajouté à la blockchain et est disponible à la vente !',
							'success'
						)
					})
					.catch((e) => {
						closeHandler()
						defaultErrorModal()
					}) */

				console.log(formData)
			}
		}
	}

	const { steps, currentStepIndex, step, isFirstStep, previousStep, nextStep, isLastStep } = useMultiStepForm([
		/* DESCRIPTION START */
		<FormWrapper
			title={"Description de l'évènement"}
			key={'description-step'}>
			<Input
				{...register(InputName.NAME)}
				label={"Nom de l'évènement *"}
				type={'text'}
				required
				clearable
				underlined
				status={isInputValid(inputValue, triedToSubmit)}
				color={isInputValid(inputValue, triedToSubmit)}
				helperText={setHelperText(inputValue, triedToSubmit)}
				helperColor="error"
				onClearClick={() => {
					setTriedToSubmit(false)
				}}
				onChange={(e) => {
					inputValue === '' ? setTriedToSubmit(true) : setTriedToSubmit(false)
					handleInputChange(e)
				}}
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
		/* DESCRIPTION END */
		/* IMAGE START */
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
											setTriedToSubmit(false)
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
						hoverTitle={'Déposez ici'}
						required={true}
						handleChange={handleImageChange}
						name="file"
						types={['JPG', 'PNG']}
						classes={styles.drop_area}
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
										<RiImageAddFill />
									</Text>
									<Spacer x={1} />
									<Text>Cliquez ou déposez l&apos;affiche de l&apos;évènement ici</Text>
								</Container>
								<Container
									justify={'center'}
									display={'flex'}>
									<Text
										size="$xs"
										color={'secondary'}>
										Formats acceptés : JPG et PNG
									</Text>
								</Container>
							</Card.Body>
						</Card>
					</FileUploader>

					{file === null && triedToSubmit ? (
						<>
							<Spacer y={1} />
							<Button
								ripple={false}
								animated={false}
								bordered
								color="error">
								Veuillez choisir une image pour votre évènement
							</Button>
						</>
					) : null}
				</>
			)}
		</FormWrapper>,
		/* IMAGE END */
		/* DATE START */
		<FormWrapper
			title={'Dates et heures'}
			key={'dates-step'}>
			<Input
				{...register(InputName.DATE)}
				underlined
				label={'Date de début *'}
				required
				type="date"
				status={isInputValid(inputValue, triedToSubmit)}
				color={isInputValid(inputValue, triedToSubmit)}
				helperText={setHelperText(inputValue, triedToSubmit)}
				helperColor="error"
				onChange={(e) => {
					inputValue === '' ? setTriedToSubmit(true) : setTriedToSubmit(false)
					handleInputChange(e)
				}}
			/>
			<Spacer y={2} />
			<Input
				underlined
				label={'Heure de début *'}
				{...register(InputName.HOUR_START)}
				required
				type="time"
				status={isInputValid(inputValue, triedToSubmit)}
				color={isInputValid(inputValue, triedToSubmit)}
				helperText={setHelperText(inputValue, triedToSubmit)}
				helperColor="error"
				onChange={(e) => {
					inputValue === '' ? setTriedToSubmit(true) : setTriedToSubmit(false)
					handleInputChange(e)
				}}
			/>{' '}
			<Spacer y={2} />
			<Input
				underlined
				label={'Heure de fin *'}
				{...register(InputName.HOUR_END)}
				required
				type="time"
				status={isInputValid(inputValue, triedToSubmit)}
				color={isInputValid(inputValue, triedToSubmit)}
				helperText={setHelperText(inputValue, triedToSubmit)}
				helperColor="error"
				onChange={(e) => {
					inputValue === '' ? setTriedToSubmit(true) : setTriedToSubmit(false)
					handleInputChange(e)
				}}
			/>
		</FormWrapper>,
		/* DATE END */
		/* LOCATION START */
		<FormWrapper
			title={"Où se déroule votre l'évènement ?"}
			key={'location-step'}>
			<Row
				align={'flex-end'}
				justify={'center'}>
				<Input
					width={'50%'}
					{...register(InputName.LOCATION)}
					label={"Adresse de l'évènement *"}
					type="text"
					required
					status={isInputValid(selectedLocation, triedToSubmit)}
					color={isInputValid(selectedLocation, triedToSubmit)}
					helperText={setHelperText(selectedLocation, triedToSubmit)}
					helperColor="error"
					onChange={(e) => {
						selectedLocation === '' ? setTriedToSubmit(true) : setTriedToSubmit(false)
						if (inputValue.length >= 7) {
							try {
								getLocationDetails(inputValue)
									.then((r) => {
										if (r.length > 1) {
											setLocationInfo(r)
										}
									})
									.catch((e) => {
										defaultErrorModal()
										console.error(e)
									})
							} catch (e) {
								defaultErrorModal()
								console.error(e)
							}
						} else {
							setLocationInfo([])
						}
					}}
				/>
				<Spacer x={1} />
			</Row>
			<Spacer y={1} />
			{locationInfo.length > 0 ? (
				<Card>
					<Card.Body>
						{locationInfo.map((location) => (
							<Text
								onClick={() => {
									const formatedTxt = formatLocationString(location)

									handleInputChange({
										target: {
											value: formatedTxt,
										},
									})
									setLocationCoord({ lat: Number(location.lat), lon: Number(location.lon) })
									setSelectedLocation(formatedTxt)
								}}
								css={{
									'&:hover': {
										color: '$primary',
										cursor: 'pointer',
									},
								}}
								key={location.place_id}>
								<GrLocationPin />
								{formatLocationString(location)}
							</Text>
						))}
					</Card.Body>
				</Card>
			) : (
				''
			)}
			<Spacer y={2} />
			<Container style={{ height: '500px', width: '860px', padding: '0' }}>
				<Map
					lat={locationCoord.lat}
					lon={locationCoord.lon}
				/>
			</Container>
		</FormWrapper>,
		/* LOCATION END */
		/* PRICE START */
		<FormWrapper
			title={'Prix du billet'}
			key={'price-count-step'}>
			<Input
				{...register(InputName.PRICE)}
				label={'Prix en € *'}
				type="number"
				required
				underlined
				initialValue={'0'}
				min={0}
				status={isInputValid(inputValue, triedToSubmit)}
				color={isInputValid(inputValue, triedToSubmit)}
				helperText={setHelperText(inputValue, triedToSubmit)}
				helperColor="error"
				onChange={(e) => {
					inputValue === '' ? setTriedToSubmit(true) : setTriedToSubmit(false)
					handleInputChange(e)
				}}
			/>
			<Spacer y={2} />
			<Input
				{...register(InputName.COUNT)}
				label={'Nombre de billets à mettre en vente *'}
				type="number"
				required
				underlined
				min={0}
				initialValue={'1'}
				status={isInputValid(inputValue, triedToSubmit)}
				color={isInputValid(inputValue, triedToSubmit)}
				helperText={setHelperText(inputValue, triedToSubmit)}
				helperColor="error"
				onChange={(e) => {
					inputValue === '' ? setTriedToSubmit(true) : setTriedToSubmit(false)
					handleInputChange(e)
				}}
			/>
		</FormWrapper>,
		/* PRICE END */
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
							{!isFirstStep ? (
								<Button
									onClick={() => {
										previousStep()
										setTriedToSubmit(false)
									}}>
									Précédent
								</Button>
							) : null}

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
			</form>
			<Modal
				open={visible}
				fullScreen>
				<Modal.Body>
					<Grid.Container
						justify={'center'}
						alignItems={'center'}
						direction={'row'}
						css={{ height: '100%' }}>
						<Text h2>Nous ajoutons vos billet à la blockchain</Text>
						<Spacer x={1} />
						<Loading
							type={'points'}
							size={'xl'}
						/>
					</Grid.Container>
				</Modal.Body>
			</Modal>
		</>
	)
}

export default NftDrop
