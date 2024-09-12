import AppointmentItem from "../appointmentItem.tsx/AppointmentItem";
import { useContext, useEffect } from "react";
import { AppointmentContext } from "../../context/appointments/AppointmentsContext";
import Spinner from "../spinner/Spinner";
import { IAppointment } from "../../shared/interfaces/appointment.interface";

interface IHistoryProps extends IAppointment {

}

function HistoryList() {
	const { getAllAppointments, allAppointments, loadingStatus } = useContext(AppointmentContext);

	useEffect(() => {
		console.log("history")
		getAllAppointments();
		console.log(allAppointments)
		// .then((res: IAppointment[]) => console.log(res))
	}, [])
	return (
		<>
			{loadingStatus ? <Spinner /> :
				allAppointments.map(item => {
					return <AppointmentItem id={item.id} date={item.date} name={item.name} phone={item.phone} canceled={item.canceled} openModal={() => { }} service={item.service} />
				})}
		</>
	);
}

export default HistoryList;
