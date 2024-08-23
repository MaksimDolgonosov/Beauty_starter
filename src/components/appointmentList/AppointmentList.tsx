import AppointmentItem from "../appointmentItem.tsx/AppointmentItem";
import { useEffect, useContext } from "react";
import { AppointmentContext } from "../../context/appointments/AppointmentsContext";
import { ActiveAppointment } from "../../shared/interfaces/appointment.interface";
import Spinner from "../spinner/Spinner";
import Error from "../error/Error";

function AppointmentList() {
	const { allActiveAppointments, getAllActiveAppointments, loadingStatus } = useContext(AppointmentContext);

	useEffect(() => {
		getAllActiveAppointments();
	}, [])

	const reload: React.MouseEventHandler = (e): void => {
		e.preventDefault();
		getAllActiveAppointments();
	}
	// console.log(allActiveAppointments)
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
				return <AppointmentItem id={id} key={id} date={date} name={name} service={service} phone={phone} />
			})}

		</>
	);
}

export default AppointmentList;
