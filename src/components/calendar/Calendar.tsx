import "./calendar.scss";
import 'react-calendar/dist/Calendar.css';
import { useContext } from "react";
import { Calendar as LibCalendar } from 'react-calendar';
import { AppointmentContext } from "../../context/appointments/AppointmentsContext";
//import { Value } from "react-calendar/dist/cjs/shared/types";


function Calendar() {

	const { calendarDate, setDateAndFilter } = useContext(AppointmentContext);

	return <><div className="calendar">
		<LibCalendar value={calendarDate} onChange={(value) => {
			setDateAndFilter(value);
		}} selectRange={true} />


	</div>
		<button className="calendar__reset" onClick={() => setDateAndFilter([null, null])}>Reset filter</button>
	</>;
}

export default Calendar;
