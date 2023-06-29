import React, { useState } from 'react'
import Cards from 'react-credit-cards-2'
import { Button, Col, Input, Modal, Row, Spacer, Text } from '@nextui-org/react'
import 'react-credit-cards-2/dist/es/styles-compiled.css'
import { BigNumberish } from 'ethers'
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
					<Col span={5}>
						<Spacer y={0.5} />
						<Input
							clearable
							aria-label="number"
							label={'Numéro de carte'}
							required
							type="text"
							maxLength={16}
							value={cardNumber}
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
							onChange={(e) => {
								setName(e.target.value)
							}}
						/>
						<Spacer y={0.5} />
						<Row>
							<Input
								aria-label="expiration"
								label={"Mois d'expiration"}
								required
								type="text"
								maxLength={2}
								onChange={(e) => {
									if (regexNumber.test(e.target.value)) {
										setExpiryMonth(e.target.value)
									}
								}}
							/>
							<Spacer x={1} />
							<Input
								aria-label="expiration"
								label={"Année d'expiration"}
								required
								type="text"
								maxLength={2}
								onChange={(e) => {
									if (regexNumber.test(e.target.value)) {
										setExpiryYear(e.target.value)
									}
								}}
							/>
						</Row>
						<Spacer x={1} />
						<Input
							aria-label="csv"
							label={'CSV'}
							required
							type="number"
							value={cvc}
							maxLength={3}
							onChange={(e) => {
								if (regexNumber.test(e.target.value)) {
									setCvc(e.target.value)
								}
							}}
						/>
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
					onPress={async () => {
						onClose()
						await BuyWithStripe({
							nftId: nftId,
							connectedAddress,
							creditCard: {
								number: cardNumber,
								expMonth: expiryMonth,
								expYear: expiryYear,
								cvc: cvc,
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
