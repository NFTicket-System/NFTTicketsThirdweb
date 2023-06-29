import React, { useState } from 'react'
import Cards from 'react-credit-cards-2'
import { Button, Col, Input, Modal, Row, Spacer, Text } from '@nextui-org/react'
import 'react-credit-cards-2/dist/es/styles-compiled.css'

const CreditCardModal = ({ isOpen, onClose }: { isOpen: any; onClose: any }) => {
	const [cardNumber, setCardNumber] = useState('')
	const [name, setName] = useState('')
	const [expiry, setExpiry] = useState('')
	const [cvc, setCvc] = useState('')

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
				<Spacer y={1} />
				<Row gap={2}>
					<Col span={6}>
						<Cards
							number={cardNumber}
							expiry={expiry}
							cvc={cvc}
							name={name}
						/>
					</Col>
					<Col span={5}>
						<Spacer y={0.5} />
						<Input
							aria-label="number"
							labelPlaceholder={'Numéro de carte'}
							required
							type="text"
							maxLength={16}
							value={cardNumber}
							onChange={(e) => {
								setCardNumber(e.target.value)
							}}
						/>
						<Spacer y={0.5} />
						<Input
							aria-label="name"
							labelPlaceholder={'Nom inscrit sur la carte'}
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
								labelPlaceholder={"Date d'expiration"}
								required
								type="text"
								maxLength={4}
								value={expiry}
								onChange={(e) => {
									setExpiry(e.target.value)
								}}
							/>
							<Spacer x={1} />
							<Input
								aria-label="csv"
								labelPlaceholder={'CSV'}
								required
								type="text"
								value={cvc}
								onChange={(e) => {
									setCvc(e.target.value)
								}}
							/>
						</Row>
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
					onPress={() => {
						onClose()
					}}>
					Confirmer
				</Button>
			</Modal.Footer>
		</Modal>
	)
}

export default CreditCardModal
