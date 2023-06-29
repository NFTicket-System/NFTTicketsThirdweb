import React, { useState } from 'react'
import Cards from 'react-credit-cards-2'
import { Button, Col, Container, Input, Modal, Row, Spacer, Text } from '@nextui-org/react'
import 'react-credit-cards-2/dist/es/styles-compiled.css'
import { type BigNumberish } from 'ethers'
import { BuyWithStripe } from '@/services/buyWithStripe'
import router from 'next/router'

const CreditCardModal = ({
	isOpen,
	onClose,
	nftId,
	connectedAddress,
	price,
}: {
	isOpen: any
	onClose: any
	nftId: BigNumberish
	connectedAddress: string
	price: string
}) => {
	const [cardNumber, setCardNumber] = useState('')
	const [name, setName] = useState('')
	const [expiryMonth, setExpiryMonth] = useState('')
	const [expiryYear, setExpiryYear] = useState('')
	const [cvc, setCvc] = useState('')
	const regexNumber = /^[0-9\b]*$/

	const getExpiry = (): string => {
		return `${expiryMonth}${expiryYear}`
	}

	const isAllFieldsFull = (): boolean => {
		return (
			cardNumber.trim() !== '' &&
			cardNumber.trim().length === 16 &&
			name.trim() !== '' &&
			getExpiry().trim() !== '' &&
			getExpiry().trim().length === 4 &&
			cvc.trim() !== '' &&
			cvc.trim().length === 3
		)
	}

	return (
		<Modal
			width={'50%'}
			preventClose
			blur
			aria-labelledby="modal-title"
			open={isOpen}>
			<Modal.Header>
				<Text
					h2
					id="modal-title">
					<Spacer y={1} />
					Veuillez saisir vos information
				</Text>
			</Modal.Header>
			<Modal.Body>
				<Row gap={2}>
					<Col span={6}>
						<Spacer y={4} />
						<Cards
							number={cardNumber}
							expiry={getExpiry()}
							cvc={cvc}
							name={name}
						/>
					</Col>
					<Col span={6}>
						<Container xl>
							<Spacer y={0.5} />

							<Input
								css={{ width: '100%' }}
								clearable
								aria-label="number"
								label={'Numéro de carte'}
								required
								type="text"
								maxLength={16}
								value={cardNumber}
                                bordered
								onChange={(e) => {
									console.log(e.target.value)
									if (regexNumber.test(e.target.value)) {
										setCardNumber(e.target.value)
									}
								}}
							/>
							<Spacer y={0.5} />
							<Input
								aria-label="name"
								label={'Nom inscrit sur la carte'}
								required
								type="text"
								value={name}
								css={{ width: '100%' }}
                                bordered
								onChange={(e) => {
									setName(e.target.value)
								}}
							/>
							<Spacer y={0.5} />
							<Row>
								<Input
									css={{ width: '50%' }}
									aria-label="expiration"
									label={"Mois d'expiration"}
									required
									type="text"
									maxLength={2}
                                    bordered
									onChange={(e) => {
										if (regexNumber.test(e.target.value)) {
											setExpiryMonth(e.target.value)
										}
									}}
								/>
								<Spacer x={1} />
								<Input
									css={{ width: '50%' }}
									aria-label="expiration"
									label={"Année d'expiration"}
									required
									type="text"
									maxLength={2}
                                    bordered
									onChange={(e) => {
										if (regexNumber.test(e.target.value)) {
											setExpiryYear(e.target.value)
										}
									}}
								/>
							</Row>
							<Spacer y={0.5} />
							<Input
								aria-label="csv"
								label={'CSV'}
								required
								type="text"
								value={cvc}
								maxLength={3}
                                bordered
								onChange={(e) => {
									if (regexNumber.test(e.target.value)) {
										setCvc(e.target.value)
									}
								}}
							/>
						</Container>
					</Col>
				</Row>
			</Modal.Body>
			<Modal.Footer>
				<Spacer y={4} />
				<Button
					auto
					flat
					color="error"
					onPress={() => {
						onClose()
					}}>
					Annuler
				</Button>
				<Button
					auto
					disabled={!isAllFieldsFull()}
					onPress={async () => {
						onClose()
						await BuyWithStripe({
							nftId,
							connectedAddress,
							creditCard: {
								number: cardNumber,
								expMonth: expiryMonth,
								expYear: expiryYear,
								cvc,
							},
							price: parseInt(price),
						})
						await router.push('/')
					}}>
					Confirmer
				</Button>
			</Modal.Footer>
		</Modal>
	)
}

export default CreditCardModal
