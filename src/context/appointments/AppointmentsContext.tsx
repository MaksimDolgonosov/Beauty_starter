import { createContext, useReducer } from "react";
import reducer, { IInitialState } from "./reducer";
import { useAppointmentService } from "../../services/AppointmentService";
import { ActionsTypes } from "./actions";
import { LoadingStatus } from "../../hooks/http.hook";
import { Value } from "react-calendar/dist/cjs/shared/types";


const initialState: IInitialState = {
    allAppointments: [],
    allActiveAppointments: [],
    calendarDate: [null, null]
}

interface ProviderProps {
    children: React.ReactNode;
}

interface IContextValue extends IInitialState {
    loadingStatus: LoadingStatus
    getAllAppointments: () => void;
    getAllActiveAppointments: () => void,
    setDateAndFilter: (newDate: Value) => void
}

export const AppointmentContext = createContext<IContextValue>({
    loadingStatus: "idle",
    allAppointments: initialState.allAppointments,
    allActiveAppointments: initialState.allActiveAppointments,
    getAllAppointments: () => { },
    getAllActiveAppointments: () => { },
    calendarDate: [null, null],
    setDateAndFilter: (newDate: Value) => { }
});

export const AppointmentContextProvider = ({ children }: ProviderProps) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { loadingStatus, getAllAppointments, getAllActiveAppointments } = useAppointmentService();


    const value: IContextValue = {
        loadingStatus: loadingStatus,
        allAppointments: state.allAppointments,
        allActiveAppointments: state.allActiveAppointments,
        calendarDate: state.calendarDate,
        getAllAppointments: () => {
            getAllAppointments()
                .then(data => dispatch({ type: ActionsTypes.SET_ALL_APPOINTMENTS, payload: data }));
        },
        getAllActiveAppointments: () => {
            getAllActiveAppointments()
                .then(data => {
                    const filteredData = data.filter(item => {
                        if (Array.isArray(state.calendarDate) && state.calendarDate[0] && state.calendarDate[1]) {
                            if (new Date(item.date).getTime() >= new Date(state.calendarDate[0]).getTime() && new Date(item.date).getTime() <= new Date(state.calendarDate[1]).getTime()) {
                                return item;
                            }
                        } else {
                            return item;
                        }
                    })
                    dispatch({ type: ActionsTypes.SET_ACTIVE_APPOINTMENTS, payload: filteredData })
                })
        },
        setDateAndFilter: (newDate: Value) => {
            dispatch({ type: ActionsTypes.SET_CALENDAR_DATE, payload: newDate })
        }

    }

    return (
        <AppointmentContext.Provider value={value}>
            {children}
        </AppointmentContext.Provider >
    )




}

export default AppointmentContextProvider;