import swal from 'sweetalert'

export const defaultErrorModal = () => {
	void swal('Oh oh!', "Une erreur c'est produite", 'error').catch((e) => {
		console.error(e)
	})
}
