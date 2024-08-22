import AppointmentItem from "../appointmentItem.tsx/AppointmentItem";
import { useEffect, useContext } from "react";
import { AppointmentContext } from "../../context/appointments/AppointmentsContext";
import { ActiveAppointment } from "../../shared/interfaces/appointment.interface";
import Spinner from "../spinner/Spinner";


function AppointmentList() {
	const { allActiveAppointments, getAllActiveAppointments, loadingStatus } = useContext(AppointmentContext);

	useEffect(() => {
		getAllActiveAppointments();
	}, [])
	// console.log(allActiveAppointments)
	return (
		<>
			{loadingStatus === "loading" ? <Spinner /> : null}
			{allActiveAppointments.map(({ id, date, name, service, phone }: ActiveAppointment) => {
				return <AppointmentItem id={id} key={id} date={date} name={name} service={service} phone={phone} />
			})}

		</>
	);
}

export default AppointmentList;
