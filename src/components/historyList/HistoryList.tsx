import AppointmentItem from "../appointmentItem.tsx/AppointmentItem";
import { useContext, useEffect } from "react";
import { AppointmentContext } from "../../context/appointments/AppointmentsContext";
import Spinner from "../spinner/Spinner";
import { IAppointment } from "../../shared/interfaces/appointment.interface";

interface IHistoryProps extends IAppointment {

}

function HistoryList() {
	const { getAllAppointments, allAppointments, loadingStatus, calendarDate } = useContext(AppointmentContext);

	useEffect(() => {
		console.log("history")
		getAllAppointments();
		// .then((res: IAppointment[]) => console.log(res))
	}, [calendarDate])
	return (
		<>
			{loadingStatus === "loading" ? <Spinner /> :
				allAppointments.map(item => {
					return <AppointmentItem page="history" key={item.id} id={item.id} date={item.date} name={item.name} phone={item.phone} canceled={item.canceled} openModal={() => { }} service={item.service} />
				})}
		</>
	);
}

export default HistoryList;
