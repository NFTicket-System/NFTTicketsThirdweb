import React, { useEffect, useState } from 'react'
import { FaEraser } from '@react-icons/all-files/fa/FaEraser'
import {
	Button,
	Card,
	Checkbox,
	Col,
	Collapse,
	Container,
	Divider,
	Grid,
	Image,
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
import swal from 'sweetalert'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { useAddress, useConnect, useNetwork, useNetworkMismatch, useStorageUpload } from '@thirdweb-dev/react'
import { ChainId, ThirdwebSDK } from '@thirdweb-dev/sdk'
import {
	type CreateEvent,
	type CreateEventCategories,
	type CreateEventResponse,
	type formDataType,
} from '@/models/interfaces/createNFTFormData'
import { noConnectedWalletErrorAlert } from '@/utils/errors/noConnectedWalletErrorAlert'
import { defaultErrorModal } from '@/utils/errors/defaultErrorAlert'
import { useMultiStepForm } from '@/hooks/useMultiStepForm'
import FormWrapper from '../forms/FormWrapper'
import { InputName } from '@/models/enum/createNFTInputs'
import { FileUploader } from 'react-drag-drop-files'
import styles from '../../styles/create-event/NftDrop.module.scss'
import { RiImageAddFill } from '@react-icons/all-files/ri/RiImageAddFill'
import {
	checkDateValid,
	isDateValid2Submit,
	isInputValid,
	setDateHelperText,
	setHelperText,
} from '@/utils/formCheckValidity'
import dynamic from 'next/dynamic'
import { getLocationDetails } from '@/services/getLocationDetails'
import { type ApiLocationItem } from '@/models/interfaces/locationApi'
import { GrLocationPin } from '@react-icons/all-files/gr/GrLocationPin'
import { convertToTimestamp, formatEventDate, truncateText } from '@/utils/tools'
import {
	createEventCategories,
	createNFTicket,
	getAllEventsObjCategories,
	matchCategories,
} from '@/services/createNFTicket'
import { type Category } from '@/models/Category'
import EventCategoryBadge from '@/components/Badge/EventCategoryBadge'
import { TicketType } from '@/models/TicketType'
import { FormDataTypeClass } from '@/models/formDataTypeClass'

const Map = dynamic(async () => await import('@/components/map/Map'), { ssr: false })

const NftDrop = () => {
	const { isDark } = useTheme()

	/* EVENT CATEGORIES */
	const [eventCategories, setEventCategories] = useState<Category[]>([])
	const [selectedEventCategories, setSelectedEventCategories] = useState<string[]>([])
	const [selectedEventIdsCategories, setSelectedEventIdsCategories] = useState<Array<Category | null>>([])
	/* EVENT CATEGORIES */

	/* DATE */
	const [dateValue, setDateValue] = useState<string>('')
	const [startHourValue, setStartHourValue] = useState<string>('')
	const [endHourValue, setEndtHourValue] = useState<string>('')
	/* DATE */

	/* FILE */
	const [file, setFile] = useState<File | undefined>()
	const handleImageChange = (file: File) => {
		setFile(file)
	}
	/* FILE */

	/* LOCATION */
	const [locationInfo, setLocationInfo] = useState<ApiLocationItem[]>([])
	const [locationCoord, setLocationCoord] = useState<{ lat: number; lon: number }>({
		lat: 48.866667,
		lon: 2.333333,
	})
	const [selectedLocation, setSelectedLocation] = useState<string>('')
	const [selectedLocationCity, setSelectedLocationCity] = useState<string>('')
	const [searchResult2Show, setSearchResult2Show] = useState<boolean>(false)
	/* LOCATION */

	/* CONFIRMATION && MODALS */
	const [showConfirmationModal, setShowConfirmationModal] = useState(false)
	const [loadingModal, setLoadingModal] = useState(false)
	const [isInfosCorrect, setIsInfosCorrect] = useState(false)
	useEffect(() => {
		if (isInfosCorrect) {
			handleButtonClick()
		}
	}, [isInfosCorrect])
	const [creationStep, setCreationStep] = useState<string>()
	const [showAddTypeTicketModal, setShowAddTypeTicketModal] = useState(false)
	/* CONFIRMATION CONFIRMATION && MODALS */

	/* BLOCKCHAIN */
	const sdkAdmin = ThirdwebSDK.fromPrivateKey(process.env.NEXT_PUBLIC_SDK_PK ?? '', 'mumbai')
	const { mutateAsync: upload } = useStorageUpload()
	const [{ data: userWallet }] = useConnect()
	const connectedAddress = useAddress()
	const isMismatched = useNetworkMismatch()
	const [, switchNetwork] = useNetwork()

	const uploadToIpfs = async (): Promise<string> => {
		const url = await upload({
			data: [file],
			options: { uploadWithGatewayUrl: true, uploadWithoutDirectory: true },
		})
		return url[0]
	}
	/* BLOCKCHAIN */

	/* TICKETS TYPES */
	const [ticketTypes, setTicketTypes] = useState<TicketType[]>([])
	let ticketTypeLabel = ''
	let ticketTypePrice = '0'
	let ticketTypeCount = '1'
	const handleSubmitAddTicketType = (libelle: string, prix: string, nbTicket: string) => {
		const ticketType = new TicketType(libelle, prix, nbTicket)
		ticketTypeLabel = ''
		ticketTypePrice = ''
		ticketTypeCount = ''
		setTicketTypes([...ticketTypes, ticketType])
		setShowAddTypeTicketModal(false)
	}
	/* TICKETS  TYPES */

	/* FORM */
	const handleButtonClick = () => {
		handleSubmit(onSubmit)()
	}

	const { register, handleSubmit, setValue, getValues } = useForm<formDataType>()
	const [triedToSubmit, setTriedToSubmit] = useState<boolean>(false)

	const onSubmit = async (formData: formDataType) => {
		if (!isLastStep) {
			let isOk = false
			switch (currentStepIndex) {
				case 0:
					if (getValues(InputName.NAME)) {
						getValues(InputName.NAME).length > 0 && selectedEventIdsCategories.length !== 0
							? (isOk = true)
							: (isOk = false)
					} else {
						isOk = false
					}
					break
				case 1:
					file !== undefined ? (isOk = true) : (isOk = false)
					break
				case 2:
					checkDateValid(dateValue) && startHourValue !== '' && endHourValue !== ''
						? (isOk = true)
						: (isOk = false)
					break
				case 3:
					if (getValues(InputName.LOCATION)) {
						getValues(InputName.LOCATION).length > 0 ? (isOk = true) : (isOk = false)
					} else {
						isOk = false
					}
					break
				default:
					isOk = false
			}
			isOk
				? await nextStep()
						.then(() => {
							setTriedToSubmit(false)
						})
						.catch((e) => {
							defaultErrorModal()
						})
				: console.log('ERROR IN STEP')
		} else {
			if (!userWallet.connected) {
				noConnectedWalletErrorAlert()
			} else {
				if (isMismatched) {
					setLoadingModal(false)
					await switchNetwork?.(ChainId.Mumbai)
					return
				}

				if (ticketTypes.length > 0) {
					if (isInfosCorrect) {
						setShowConfirmationModal(false)
						// show loader modal
						setLoadingModal(true)
						// upload img to ipfs
						await uploadToIpfs().then(async (fileUrl) => {
							// create the ticket
							console.log(fileUrl)
							console.log(formData)

							const eventData: CreateEvent = {
								libelle: formData.name,
								timestampStart: convertToTimestamp(formData.date, formData.hourStart),
								timestampEnd: convertToTimestamp(formData.date, formData.hourEnd),
								idOrganizer: 1,
								isTrendemous: 0,
								urlImage: fileUrl,
								city: selectedLocationCity,
								address: selectedLocation,
							}

							console.log(eventData)

							await axios
								.post(process.env.NEXT_PUBLIC_API_HOSTNAME + '/api/events/', eventData)
								.then(async (response) => {
									const axiosResponse: CreateEventResponse = response.data
									const createdEventId: number = axiosResponse.insertId

									const ticketCategories: CreateEventCategories = {
										id: createdEventId,
										categories: selectedEventIdsCategories.map((category) =>
											category != null ? category.id : 1
										),
									}

									await createEventCategories(ticketCategories)

									console.log('ticketCATEGORIES', ticketCategories)

									for (const item of ticketTypes) {
										/*	const priceInMatic = await convertEuroToMATIC(
											Number(item.prix),
											ConversionSens.MATIC
										) */

										const typedFormData = new FormDataTypeClass(
											Number(item.nbticket),
											formData.name,
											formData.description,
											formData.date,
											item.prix,
											formData.hourStart,
											formData.hourEnd,
											formData.location,
											fileUrl,
											item.libelle
										)

										await createNFTicket(
											typedFormData,
											sdkAdmin,
											connectedAddress,
											fileUrl,
											setCreationStep,
											axiosResponse.insertId
										)
									}
								})
								.then(() => {
									setLoadingModal(false)
									void swal(
										'Bravo !',
										formData.count > 1
											? 'Vos tickets sont disponibles à la vente !'
											: 'Votre ticket est disponible à la vente !',
										'success'
									)
								})
								.catch((e) => {
									setLoadingModal(false)
									defaultErrorModal()
									console.error(e)
								})
								.catch((error) => {
									console.error('Error making POST request:', error)
								})
						})
					}
				} else {
					setShowConfirmationModal(false)
					defaultErrorModal()
				}
			}
		}
	}
	/* FORM */

	/* MULTISTEPS FORM */
	const { steps, currentStepIndex, step, isFirstStep, previousStep, nextStep, isLastStep } = useMultiStepForm([
		/* DESCRIPTION START */
		<FormWrapper
			title={"Description de l'évènement"}
			key={'description-step'}>
			<Input
				aria-label="Event Name"
				label={"Nom de l'évènement *"}
				type={'text'}
				required
				clearable
				underlined
				status={isInputValid(getValues(InputName.NAME), triedToSubmit)}
				color={isInputValid(getValues(InputName.NAME), triedToSubmit)}
				helperText={setHelperText(getValues(InputName.NAME), triedToSubmit)}
				helperColor="error"
				onClearClick={() => {
					setTriedToSubmit(false)
					setValue(InputName.NAME, '')
				}}
				onChange={(e) => {
					setValue(InputName.NAME, e.target.value)
					getValues(InputName.NAME).length < 1 || e.target.value === ''
						? setTriedToSubmit(true)
						: setTriedToSubmit(false)
				}}
			/>
			<Spacer y={4} />
			<Text>Description de l&apos;évènement</Text>
			<Textarea
				aria-label="Event description"
				bordered
				color="default"
				helperText={'Décrivez votre évènement en quelques mots'}
				{...register(InputName.DESCRIPTION)}
			/>
			<Spacer y={4} />
			<Container xl>
				<Checkbox.Group
					color="primary"
					label="Catégorie de l'évènement"
					orientation="horizontal"
					onChange={(selectedItems) => {
						setSelectedEventIdsCategories(matchCategories(selectedItems))
					}}>
					<Grid.Container gap={2}>
						{eventCategories.map((category, index) => (
							<Grid
								xs={4}
								key={category.id}>
								<Checkbox value={category.libelle}>{category.libelle}</Checkbox>
							</Grid>
						))}
					</Grid.Container>
				</Checkbox.Group>
			</Container>
			{selectedEventIdsCategories.length === 0 && triedToSubmit ? (
				<>
					<Spacer y={1} />
					<Button
						ripple={false}
						animated={false}
						bordered
						color="error">
						Veuillez choisir une catgerorie pour votre évènement
					</Button>
				</>
			) : null}
		</FormWrapper>,
		/* DESCRIPTION END */
		/* IMAGE START */
		<FormWrapper
			title={"Affiche de l'évènement"}
			key={'image-step'}>
			{file !== undefined ? (
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
										onPress={() => {
											setFile(undefined)
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

					{getValues(InputName.IMAGE) !== '' && triedToSubmit ? (
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
				aria-label="Event Date"
				{...register(InputName.DATE)}
				underlined
				label={'Date de début *'}
				required
				type="date"
				status={isDateValid2Submit(dateValue, triedToSubmit)}
				helperText={setDateHelperText(dateValue, triedToSubmit)}
				helperColor="error"
				onChange={(e) => {
					setDateValue(e.target.value)
				}}
			/>
			<Spacer y={2} />
			<Input
				aria-label="Event Start hour"
				underlined
				label={'Heure de début *'}
				{...register(InputName.HOUR_START)}
				required
				type="time"
				status={startHourValue === '' && triedToSubmit ? 'error' : 'default'}
				helperColor="error"
				onChange={(e) => {
					setStartHourValue(e.target.value)
				}}
			/>{' '}
			<Spacer y={2} />
			<Input
				aria-label="Event end hour"
				underlined
				label={'Heure de fin *'}
				{...register(InputName.HOUR_END)}
				required
				type="time"
				status={endHourValue === '' && triedToSubmit ? 'error' : 'default'}
				helperColor="error"
				onChange={(e) => {
					setEndtHourValue(e.target.value)
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
					aria-label="Location search bar"
					width={'50%'}
					label={"Adresse de l'évènement *"}
					type="text"
					required
					clearable
					value={selectedLocation === '' ? '' : selectedLocation}
					status={isInputValid(getValues(InputName.LOCATION), triedToSubmit)}
					color={isInputValid(getValues(InputName.LOCATION), triedToSubmit)}
					helperText={
						getValues(InputName.LOCATION) === '' && triedToSubmit
							? 'Veuillez choisir une adresse de la' + ' liste'
							: ''
					}
					helperColor="error"
					onChange={(e) => {
						selectedLocation === '' ? setTriedToSubmit(true) : setTriedToSubmit(false)
						setSelectedLocation(e.target.value)
						setValue(InputName.LOCATION, '')
						if (e.target.value.length >= 7) {
							try {
								getLocationDetails(e.target.value)
									.then((r) => {
										if (r.length > 0) {
											setLocationInfo(r)
											setSearchResult2Show(true)
										}
									})
									.catch((e) => {
										defaultErrorModal()
									})
							} catch (e) {
								defaultErrorModal()
							}
						} else {
							setLocationInfo([])
						}
					}}
				/>
				<Spacer x={1} />
			</Row>
			<Spacer y={1} />
			{locationInfo.length > 0 && searchResult2Show ? (
				<Card>
					<Card.Body>
						{locationInfo.map((location) => (
							<Text
								onClick={(e) => {
									setLocationCoord({
										lat: location.geometry.coordinates[1],
										lon: location.geometry.coordinates[0],
									})
									setSelectedLocation(location.properties.name)
									setValue(InputName.LOCATION, location.properties.name)
									setSelectedLocationCity(
										`${location.properties.city} ${location.properties.postcode}`
									)
									setSearchResult2Show(false)
								}}
								css={{
									display: 'flex',
									alignItems: 'center',
									'&:hover': {
										color: '#4E3104',
										cursor: 'pointer',
										backgroundColor: '$primaryLight',
										borderRadius: '4px',
									},
								}}
								key={location.properties.id}>
								<GrLocationPin />
								{location.properties.label}
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
			title={'Billets'}
			key={'price-count-step'}>
			<Card variant="bordered">
				<Card.Body>
					<Container xl>
						<Row
							align={'center'}
							justify={'space-between'}>
							<Text>Type(s) de billet(s)</Text>
							<Button
								color="primary"
								auto
								rounded
								onPress={() => {
									setShowAddTypeTicketModal(true)
								}}>
								<Text
									color="black"
									b>
									Ajouter un type de billet
								</Text>
							</Button>
						</Row>
					</Container>
				</Card.Body>
			</Card>
			<Row>
				<Container xl>
					<Collapse.Group accordion={false}>
						{ticketTypes.map((ticketType) => {
							return (
								<Collapse title={ticketType.libelle}>
									<Row justify={'space-evenly'}>
										<Row align={'center'}>
											<Text>nombre de ticket : </Text>
											<Spacer x={0.5} />
											<Text h4>{ticketType.nbticket}</Text>
										</Row>
										<Spacer />
										<Row align={'center'}>
											<Text>prix du ticket : </Text>
											<Spacer x={0.5} />
											<Text h4>{ticketType.prix} €</Text>
										</Row>
										<Button
											color="error"
											rounded
											ghost
											iconRight={<FaEraser />}
											onPress={() => {
												setTicketTypes(
													ticketTypes.filter((type) => type.libelle !== ticketType.libelle)
												)
											}}>
											Supprimer
										</Button>
									</Row>
								</Collapse>
							)
						})}
					</Collapse.Group>
				</Container>
			</Row>
		</FormWrapper>,
		/* PRICE END */
	])
	/* MULTISTEPS FORM */

	/* EVENT CATEGORIES */
	useEffect(() => {
		const getCategoriesId = async () => {
			await getAllEventsObjCategories().then((result) => {
				setEventCategories(result)
			})
		}
		getCategoriesId()
	}, [isLastStep])
	/* EVENT CATEGORIES */

	return (
		<>
			<form
				noValidate
				onSubmit={handleSubmit(onSubmit)}>
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
						<Button.Group color="primary">
							{!isFirstStep ? (
								<Button
									onPress={() => {
										previousStep()
										setTriedToSubmit(false)
									}}>
									<Text
										color="black"
										b>
										Précédent
									</Text>
								</Button>
							) : null}

							<Button
								onPress={() => {
									setTriedToSubmit(true)
									handleButtonClick()
									isLastStep && userWallet.connected ? setShowConfirmationModal(true) : ''
								}}>
								<Text
									color="black"
									b>
									{isLastStep ? 'Mettre en vente' : 'Suivant'}
								</Text>
							</Button>
						</Button.Group>
					</Row>
					<Spacer />
				</Container>
			</form>
			{/* MODALS */}
			<Modal
				open={loadingModal}
				fullScreen>
				<Modal.Body>
					<Grid.Container
						justify={'center'}
						alignItems={'center'}
						direction={'row'}
						css={{ height: '100%' }}>
						<Text size={50}>{creationStep}</Text>
						<Spacer x={1} />
						<Loading
							type={'points'}
							size={'xl'}
						/>
					</Grid.Container>
				</Modal.Body>
			</Modal>
			<Modal
				blur
				width={'60%'}
				aria-labelledby="confirmation modal"
				open={showConfirmationModal}
				onClose={() => {
					setShowConfirmationModal(false)
				}}>
				<Modal.Header>
					<Col>
						<Text
							id="modal-title"
							size={25}>
							Veuillez confirmer vos choix
						</Text>
						<Text
							id="modal-title-desc"
							size={18}>
							Une fois votre évènement créer et ajouter à la blockchain
							<Text
								size={18}
								color={'error'}
								b>
								&nbsp;il ne sera plus modifiable&nbsp;
							</Text>
							!
						</Text>
					</Col>
				</Modal.Header>
				<Modal.Body autoMargin>
					<Col>
						{file !== undefined ? (
							<Image
								src={URL.createObjectURL(file)}
								objectFit="cover"
								alt="Default Image"
								width={'70%'}
								height={200}
								css={{ borderRadius: '10px' }}
							/>
						) : (
							<></>
						)}
						<Spacer y={2} />
						<Row justify={'center'}>
							{selectedEventIdsCategories.map((category) =>
								category !== null ? (
									<>
										<EventCategoryBadge category={category} />
										<Spacer y={2} />
									</>
								) : (
									<></>
								)
							)}
						</Row>
						<Row justify={'center'}>
							<Text
								b
								size={18}>
								Nom de l&apos;évènement :&nbsp;
							</Text>
							<Text size={18}>{getValues(InputName.NAME)}</Text>
							<Spacer x={2} />
							<Text
								b
								size={18}>
								Description :&nbsp;
							</Text>
							<Text size={18}>{truncateText(getValues(InputName.DESCRIPTION), 50)}</Text>
						</Row>
						<Row justify={'center'}>
							<Text
								b
								size={18}>
								Date :&nbsp;
							</Text>
							<Text size={18}>
								{formatEventDate(getValues(InputName.DATE))}, de {getValues(InputName.HOUR_START)}
								&nbsp;à&nbsp;
								{getValues(InputName.HOUR_END)}
							</Text>
						</Row>
						<Row justify={'center'}>
							<Text
								b
								size={18}>
								Lieu :&nbsp;
							</Text>
							<Text size={18}>{getValues(InputName.LOCATION)}</Text>
						</Row>
						<Row>
							<Container>
								<Text
									b
									size={18}>
									Types et nombre des billets
								</Text>
								<Spacer y={0.5} />
								<Collapse.Group
									accordion={false}
									bordered>
									{ticketTypes.map((ticketType) => {
										return (
											<Collapse
												expanded
												title={ticketType.libelle}>
												<Row justify={'space-evenly'}>
													<Row align={'center'}>
														<Text>nombre de ticket : </Text>
														<Spacer x={0.5} />
														<Text h4>{ticketType.nbticket}</Text>
													</Row>
													<Spacer />
													<Row align={'center'}>
														<Text>prix du ticket : </Text>
														<Spacer x={0.5} />
														<Text h4>{ticketType.prix} €</Text>
													</Row>
												</Row>
											</Collapse>
										)
									})}
								</Collapse.Group>
							</Container>
						</Row>
					</Col>
				</Modal.Body>
				<Modal.Footer>
					<Button
						auto
						flat
						color="error"
						onPress={() => {
							setShowConfirmationModal(false)
							setIsInfosCorrect(false)
						}}>
						Annuler
					</Button>
					<Button
						auto
						onPress={async () => {
							setShowConfirmationModal(true)
							setIsInfosCorrect(true)
						}}>
						<Text
							color="black"
							b>
							Confimer
						</Text>
					</Button>
				</Modal.Footer>
			</Modal>
			<Modal
				open={showAddTypeTicketModal}
				scroll
				width="600px"
				aria-labelledby="modal-title"
				aria-describedby="modal-description">
				<Modal.Header>
					<Text
						h2
						id="modal-title"
						size={18}>
						Ajouter des billets
					</Text>
				</Modal.Header>
				<Divider />
				<Modal.Body>
					<Col>
						<Spacer />
						<Row>
							<Input
								css={{ width: '100%' }}
								bordered
								size="lg"
								labelPlaceholder="Nom du type"
								onChange={(event) => {
									ticketTypeLabel = event.target.value.toUpperCase()
								}}
							/>
						</Row>
						<Spacer y={2} />
						<Row
							align={'center'}
							justify={'center'}>
							<Input
								aria-label="Event price"
								label={'Prix en € *'}
								type="number"
								required
								underlined
								initialValue={'0'}
								min={0}
								onChange={(event) => {
									ticketTypePrice = event.target.value
								}}
							/>
							<Spacer x={2} />

							<Input
								aria-label="Event count"
								label={'Nombre de billets à mettre en vente *'}
								type="number"
								required
								underlined
								min={1}
								initialValue={'1'}
								onChange={(event) => {
									ticketTypeCount = event.target.value
								}}
							/>
						</Row>
					</Col>
				</Modal.Body>
				<Modal.Footer>
					<Button
						auto
						flat
						color="error"
						onPress={() => {
							setShowAddTypeTicketModal(false)
						}}>
						Fermer
					</Button>
					<Button
						auto
						onPress={() => {
							if (ticketTypeLabel !== '') {
								handleSubmitAddTicketType(ticketTypeLabel, ticketTypePrice, ticketTypeCount)
							}
						}}>
						<Text
							color="black"
							b>
							Valider
						</Text>
					</Button>
				</Modal.Footer>
			</Modal>
			{/* MODALS */}
		</>
	)
}

export default NftDrop
