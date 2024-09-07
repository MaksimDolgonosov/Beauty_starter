import Header from "../header/Header";
import SchedulePage from "../../pages/schedule/SchedulePage";
 import HistoryPage from "../../pages/history/HistoryPage";
import { AppointmentContextProvider } from "../../context/appointments/AppointmentsContext";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

import "./app.scss";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Root />,
		children: [
			{
				path: "/",
				element: <SchedulePage />,
			},
			{
				path: "/schedule",
				element: <SchedulePage />,
			},
			{
				path: "/history",
				element: <HistoryPage />,
			},
		],
	},
]);


function App() {
		return <RouterProvider router={router} />;
}

function Root() {
	return (
		<main className="board">
			<Header />
			<AppointmentContextProvider>
				<Outlet />
			</AppointmentContextProvider>
		</main>
	);
}

export default App;
