import "./calendar.scss";
import 'react-calendar/dist/Calendar.css';
import { useState, useContext } from "react";
import { Calendar as LibCalendar } from 'react-calendar';
import { AppointmentContext } from "../../context/appointments/AppointmentsContext";
//import { Value } from "react-calendar/dist/cjs/shared/types";


function Calendar() {
	//const [value, onChange] = useState<any>(new Date());
	const { calendarDate, setDateAndFilter, getAllActiveAppointments } = useContext(AppointmentContext);
	//console.log(value)
	return <div className="calendar">
		<LibCalendar value={calendarDate} onChange={(value) => {
			setDateAndFilter(value);
			getAllActiveAppointments();
		}} selectRange={true} />
	</div>;
}

export default Calendar;
