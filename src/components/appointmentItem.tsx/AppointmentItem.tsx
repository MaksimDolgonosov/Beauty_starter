import { useState, useEffect, memo } from 'react';
import dayjs from 'dayjs';
import { IAppointment } from "../../shared/interfaces/appointment.interface";
import { Optional } from 'utility-types';
import { useContext } from 'react';
import { AppointmentContext } from '../../context/appointments/AppointmentsContext';
import "./appointmentItem.scss";

type TPage = "history" | "schedual";

type AppointmentProps = Optional<IAppointment, "canceled"> & {
	openModal: (state: number) => void,
	page: TPage
}

const AppointmentItem = memo(({ id, date, name, service, phone, canceled, openModal, page }: AppointmentProps) => {
	const [timeLeft, setTimeLeft] = useState<string | null>(null);
	const { getAllActiveAppointments } = useContext(AppointmentContext);


	const timerEffect = () => {
		const hours = dayjs(date).diff(undefined, "h");
		const minutes = dayjs(date).diff(undefined, "m") % 60;
		setTimeLeft(`${hours}:${minutes}`);

		const intervalId = setInterval(() => {
			if (dayjs(date).diff(undefined, "h") <= 0 && dayjs(date).diff(undefined, "m") % 60 <= 0) {
				getAllActiveAppointments();
				clearInterval(intervalId);
			} else {
				setTimeLeft(`${dayjs(date).diff(undefined, "h")}:${dayjs(date).diff(undefined, "m") % 60}`)
			}


		}, 6000);
		// console.log(date);
		return () => {
			clearInterval(intervalId)
		}
	}


	// useEffect(timerEffect, [date]);
	useEffect(page == "schedual" ? timerEffect : () => { }, page == "schedual" ? [date] : []);

	const formattedDate = dayjs(date).format('DD/MM/YYYY HH:mm');
	console.log("render item");
	return (
		<div className="appointment">
			<div className="appointment__info">
				<span className="appointment__date">Date: {formattedDate}</span>
				<span className="appointment__name">Name: {name}</span>
				<span className="appointment__service">Service: {service}</span>
				<span className="appointment__phone">Phone: {phone}</span>
			</div>

			{page === "schedual" ?
				!canceled ? <>
					<div className="appointment__time">
						<span>Time left:</span>
						<span className="appointment__timer">{timeLeft}</span>
					</div>
					<button className="appointment__cancel" onClick={() => {
						openModal(id)
					}}>Cancel</button>
				</> : <div className="appointment__canceled">Canceled</div>
				: canceled ? <div className="appointment__canceled">Canceled</div> : null}



			{/* <div className="appointment__canceled">Canceled</div> */}
		</div>
	);
})

export default AppointmentItem;
