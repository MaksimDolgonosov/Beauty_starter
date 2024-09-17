import { IAppointmentAction, ActionsTypes } from "./actions";
import { IAppointment, ActiveAppointment } from "../../shared/interfaces/appointment.interface";
import { LooseValue } from "react-calendar/dist/cjs/shared/types";

export interface IInitialState {
    allAppointments: IAppointment[] | [],
    allActiveAppointments: ActiveAppointment[] | [],
    calendarDate: LooseValue
}


export default function reducer(state: IInitialState, action: IAppointmentAction) {
    switch (action.type) {
        case ActionsTypes.SET_ALL_APPOINTMENTS:
            return { ...state, allAppointments: action.payload }
        case ActionsTypes.SET_ACTIVE_APPOINTMENTS:
            return { ...state, allActiveAppointments: action.payload }
        case ActionsTypes.SET_CALENDAR_DATE:
            return { ...state, calendarDate: action.payload }
        default: return state
    }
}