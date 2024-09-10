import Calendar from "../../components/calendar/Calendar";
import HistoryList from "../../components/historyList/HistoryList";
import "./historyPage.scss";
import { useContext, useEffect } from "react";
import { AppointmentContext } from "../../context/appointments/AppointmentsContext";
import { IAppointment } from "../../shared/interfaces/appointment.interface";
function HistoryPage() {

	const { getAllAppointments, allAppointments } = useContext(AppointmentContext);
	
	useEffect(() => {
		getAllAppointments();
		console.log(allAppointments)
		// .then((res: IAppointment[]) => console.log(res))
	}, [])
	return (
		<section className="history">
			<div className="history__controls">
				<Calendar />
			</div>
			<div className="history__list">
				<HistoryList />
			</div>
		</section>
	);
}

export default HistoryPage;
