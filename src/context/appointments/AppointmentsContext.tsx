import { createContext, useReducer } from "react";
import reducer, { IInitialState } from "./reducer";
import { useAppointmentService } from "../../services/AppointmentService";
import { ActionsTypes } from "./actions";
import { LoadingStatus } from "../../hooks/http.hook";

const initialState: IInitialState = {
    allAppointments: [],
    allActiveAppointments: []
}

interface ProviderProps {
    children: React.ReactNode;
}

interface IContextValue extends IInitialState {
    loadingStatus: LoadingStatus
    getAllAppointments: () => void;
    getAllActiveAppointments: () => void
}

export const AppointmentContext = createContext<IContextValue>({
    loadingStatus: "idle",
    allAppointments: initialState.allAppointments,
    allActiveAppointments: initialState.allActiveAppointments,
    getAllAppointments: () => { },
    getAllActiveAppointments: () => { }
});

export const AppointmentContextProvider = ({ children }: ProviderProps) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { loadingStatus, getAllAppointments, getAllActiveAppointments } = useAppointmentService();


    const value: IContextValue = {
        loadingStatus: loadingStatus,
        allAppointments: state.allAppointments,
        allActiveAppointments: state.allActiveAppointments,
        getAllAppointments: () => {
            getAllAppointments()
                .then(data => dispatch({ type: ActionsTypes.SET_ALL_APPOINTMENTS, payload: data }));
        },
        getAllActiveAppointments: () => {
            getAllActiveAppointments()
                .then(data => dispatch({ type: ActionsTypes.SET_ACTIVE_APPOINTMENTS, payload: data }));
        }
    }

    return (
        <AppointmentContext.Provider value={value}>
            {children}
        </AppointmentContext.Provider >
    )




}

export default AppointmentContextProvider;