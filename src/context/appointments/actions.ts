import { IAppointment, ActiveAppointment } from "../../shared/interfaces/appointment.interface";
import { LooseValue } from "react-calendar/dist/cjs/shared/types";
export enum ActionsTypes {
    SET_ACTIVE_APPOINTMENTS = "SET_ACTIVE_APPOINTMENTS",
    SET_ALL_APPOINTMENTS = "SET_ALL_APPOINTMENTS",
    SET_CALENDAR_DATE = "SET_CALENDAR_DATE"
}


export type IAppointmentAction = {
    type: ActionsTypes.SET_ACTIVE_APPOINTMENTS,
    payload: ActiveAppointment[]
} | {
    type: ActionsTypes.SET_ALL_APPOINTMENTS,
    payload: IAppointment[]
} | {
    type: ActionsTypes.SET_CALENDAR_DATE,
    payload: LooseValue
} 