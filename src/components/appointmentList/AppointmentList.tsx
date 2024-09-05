import AppointmentItem from "../appointmentItem.tsx/AppointmentItem";
import { useEffect, useContext, useState, useCallback } from "react";
import { AppointmentContext } from "../../context/appointments/AppointmentsContext";
import { ActiveAppointment } from "../../shared/interfaces/appointment.interface";
import CancelModal from "../modal/CancelModal";
import Spinner from "../spinner/Spinner";
import Error from "../error/Error";

function AppointmentList() {
	const [isOpen, setIsOpen] = useState(false);
	const [selectedId, setSelectId] = useState(0);
	const { allActiveAppointments, getAllActiveAppointments, loadingStatus } = useContext(AppointmentContext);

	const openModal = useCallback((id: number) => {
		setIsOpen(true);
		setSelectId(id)
	}, [])

	useEffect(() => {
		getAllActiveAppointments();
	}, [])

	const reload: React.MouseEventHandler = (e): void => {
		e.preventDefault();
		getAllActiveAppointments();
	}

	console.log("render list")
	return (
		<>
			{loadingStatus === "error" ?
				<>
					<Error />
					<button className="schedule__reload" onClick={e => reload(e)}>Загрузить</button>
				</>

				: null}
			{loadingStatus === "loading" ? <Spinner /> : null}
			{allActiveAppointments.map(({ id, date, name, service, phone }: ActiveAppointment) => {
				return <AppointmentItem id={id} key={id} date={date} name={name} service={service} phone={phone} openModal={openModal} />
			})}
			{isOpen ? <CancelModal toggleModal={setIsOpen} selectedId={selectedId} /> : null}
		</>
	);
}

export default AppointmentList;
