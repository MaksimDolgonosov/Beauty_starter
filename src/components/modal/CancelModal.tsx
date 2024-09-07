import "./modal.scss";
import { useContext } from "react";
import { AppointmentContext } from "../../context/appointments/AppointmentsContext";
import Portal from "../portal/portal";
import { useEffect, useState } from "react";
import { useAppointmentService } from "../../services/AppointmentService";
import Spinner from "../spinner/Spinner";

interface ICancelProps {
	toggleModal: (state: boolean) => void,
	selectedId: number
}

function CancelModal({ toggleModal, selectedId }: ICancelProps) {
	const { getAllActiveAppointments, loadingStatus } = useContext(AppointmentContext);
	const { setCancelAppointment} = useAppointmentService();
	const [loading, setLoading] = useState("idle");
	const [btnDisabled, setBtnDisabled] = useState(false);
	const [cancelStatus, setCancelStatus] = useState<boolean | null>(null);

	const cancelAppointment = () => {
		setBtnDisabled(true);

		setCancelAppointment(selectedId)
			.then(res => {
				setBtnDisabled(false);
				setCancelStatus(true)
				// toggleModal(false);
				//console.log(res)
			})
			.catch(error => console.log(`Something wrong: ${error}`))

	}

	const closeModal = () => {
		toggleModal(false);
		if (cancelStatus) {
			getAllActiveAppointments();
		}
		// setCancelStatus(null);
		// setBtnDisabled(false);
	}

	const escListener = (e: KeyboardEvent): void => {
		if (e.key === "Escape") {
			closeModal();
		}
	}
	useEffect(() => {
		document.body.addEventListener("keydown", escListener)
		return () => {
			document.body.removeEventListener("keydown", escListener)
		}
	}, [toggleModal, cancelStatus])

	return (
		<Portal>
			<div className="modal">
				<div className="modal__body">
					<span className="modal__title">
						Are you sure you want to delete the appointment? #{selectedId}
					</span>
					<div className="modal__btns">
						<button className="modal__ok" onClick={cancelAppointment} disabled={btnDisabled}>Ok</button>
						<button className="modal__close" onClick={closeModal}>Close</button>
					</div>
					<div className="modal__status">
						{loadingStatus === "loading" ? <Spinner /> : null}
						{cancelStatus === null ? "" : cancelStatus ? "Success" : "Error, try again"}
					</div>
				</div>
			</div>
		</Portal>
	);
}

export default CancelModal;
