import swal from 'sweetalert'

export const noConnectedWalletErrorAlert = () => {
	void swal('Oh oh!', 'Veuillez connecter votre wallet pour effectuer cette action', 'warning').catch((e) => {
		console.error(e)
	})
}
