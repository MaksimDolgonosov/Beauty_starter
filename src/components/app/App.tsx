import { useEffect, useReducer, useState } from "react";

import Header from "../header/Header";
import SchedulePage from "../../pages/schedule/SchedulePage";
// import HistoryPage from "../../pages/history/HistoryPage";
// import CancelModal from "../modal/CancelModal";
import { AppointmentContextProvider } from "../../context/appointments/AppointmentsContext";


import "./app.scss";







function App() {
	// const [appointments, setAppointments] = useState<IAppointment[]>();






	return (
		<main className="board">
			<Header />

			<AppointmentContextProvider>
				<SchedulePage />
			</AppointmentContextProvider>

			{/* <HistoryPage /> */}
			{/* <CancelModal /> */}
		</main>
	);
}

export default App;
