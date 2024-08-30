import { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import { IAppointment } from "../../shared/interfaces/appointment.interface";
import { Optional } from 'utility-types';

import "./appointmentItem.scss";

type AppointmentProps = Optional<IAppointment, "canceled"> & {
	openModal: (state: boolean) => void,
	setSelectId: () => void
}

function AppointmentItem({ id, date, name, service, phone, canceled, openModal, setSelectId }: AppointmentProps) {
	const [timeLeft, setTimeLeft] = useState<string | null>(null);
	useEffect(() => {
		const hours = dayjs(date).diff(undefined, "h");
		const minutes = dayjs(date).diff(undefined, "m") % 60;
		setTimeLeft(`${hours}:${minutes}`);
		const intervalId = setInterval(() => { setTimeLeft(`${dayjs(date).diff(undefined, "h")}:${dayjs(date).diff(undefined, "m") % 60}`) }, 6000);

		return () => {
			clearInterval(intervalId)
		}
	}, [date])

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

			{!canceled ? <>
				<div className="appointment__time">
					<span>Time left:</span>
					<span className="appointment__timer">{timeLeft}</span>
				</div>
				<button className="appointment__cancel" onClick={() => {
					openModal(true)
					setSelectId();
				}}>Cancel</button>
			</> : <div className="appointment__canceled">Canceled</div>}

			{/* <div className="appointment__canceled">Canceled</div> */}
		</div>
	);
}

export default AppointmentItem;
