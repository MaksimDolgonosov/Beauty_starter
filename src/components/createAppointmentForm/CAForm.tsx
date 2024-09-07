import "./caform.scss";
import { useAppointmentService } from "../../services/AppointmentService";
import { useState, useContext } from "react";
import { IAppointment } from "../../shared/interfaces/appointment.interface";
import { AppointmentContext } from "../../context/appointments/AppointmentsContext";

function CAForm() {
	const { createNewAppointment } = useAppointmentService();
	const { getAllActiveAppointments } = useContext(AppointmentContext);

	const [creationStatus, setCreationStatus] = useState(false);
	const [formData, setFormData] = useState<IAppointment>({
		id: 1,
		date: "",
		name: "",
		service: "",
		phone: "",
		canceled: false
	})

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setCreationStatus(true)
		createNewAppointment(formData)
			.then(() => {
				getAllActiveAppointments();
				setFormData({ id: 1, date: "", name: "", service: "", phone: "", canceled: false })
				setCreationStatus(false)
			})
			.catch(() => {
				alert("Error while creating new appointment!")
			})

	}

	const changeFormData = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	}

	return (
		<form className="caform" onSubmit={handleSubmit}>
			<div className="caform__title">Create new appointment</div>
			<label htmlFor="name">
				Name<span>*</span>
			</label>
			<input
				type="text"
				name="name"
				id="name"
				placeholder="User name"
				required
				value={formData.name}
				onChange={changeFormData}
			/>

			<label htmlFor="service">
				Service<span>*</span>
			</label>
			<input
				type="text"
				name="service"
				id="service"
				placeholder="Service name"
				required
				onChange={changeFormData}
				value={formData.service}
			/>

			<label htmlFor="phone">
				Phone number<span>*</span>
			</label>
			<input
				type="tel"
				name="phone"
				id="phone"
				placeholder="+1 890 335 372"
				pattern="^\++[0-9]{1} [0-9]{3} [0-9]{3} [0-9]{3}"
				title="Format should be +1 804 944 567"
				required
				onChange={changeFormData}
				value={formData.phone}
			/>

			<label htmlFor="date">
				Date<span>*</span>
			</label>
			<input
				type="text"
				name="date"
				id="date"
				placeholder="DD/MM/YYYY HH:mm"
				pattern="^\d{2}\/\d{2}\/\d{4} \d{2}:\d{2}$"
				title="Format should be DD/MM/YYYY HH:mm"
				required
				onChange={changeFormData}
				value={formData.date}
			/>
			<button disabled={creationStatus}>Create</button>
		</form>
	);
}

export default CAForm;
