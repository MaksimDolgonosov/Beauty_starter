import { useHttp } from "../hooks/http.hook";
import dayjs from 'dayjs';
import customParseFormat from "dayjs/plugin/customParseFormat";

import hasRequiredFields from "../utils/hasRequiredFields";
import { IAppointment, ActiveAppointment } from "../shared/interfaces/appointment.interface";
const requiredFields = ["id", "date", "name", "service", "phone", "canceled"];
dayjs.extend(customParseFormat);
export const useAppointmentService = () => {
    const { loadingStatus, request } = useHttp();
    const _apiBase = "http://localhost:3001/appointments";


    //console.log("service hook");
    const getAllAppointments = async (): Promise<IAppointment[]> => {
        const res = await request({ url: _apiBase });
        if (Array.isArray(res) && res.every((item: IAppointment) => {
            return hasRequiredFields(item, requiredFields)
        })) {
            return res;
        } else {
            throw new Error("Data doesn't have all fields");
        }
    }

    const getAllActiveAppointments = async () => {
        const base = await getAllAppointments();
        const transformed: ActiveAppointment[] = base
            .filter(item => !item.canceled)
            .filter(item => dayjs(item.date).diff(undefined, "minute") > 0)
            .map((item) => {
                return {
                    id: item.id,
                    date: item.date,
                    name: item.name,
                    service: item.service,
                    phone: item.phone,

                }
            }).sort((a: ActiveAppointment, b: ActiveAppointment) => {
                return new Date(a.date).getTime() - new Date(b.date).getTime()
            })
        return transformed;
    }

    const setCancelAppointment = async (id: number): Promise<IAppointment> => {
        const res = await request({ url: `${_apiBase}/${id}`, method: "PATCH", body: JSON.stringify({ canceled: true }) });
        if (hasRequiredFields(res, requiredFields)) {
            return res
        } else {
            throw new Error("Something wrong!");
        }

    }

    const createNewAppointment = async (body: IAppointment) => {
        body.id = await new Date().getTime();
        body.date = await dayjs(body.date, "DD/MM/YYYY HH:mm").format('YYYY-MM-DDTHH:mm')
        return await request(
            {
                url: _apiBase,
                method: "POST",
                body: JSON.stringify(body)
            });
    }


    // const getHistory = async () => {
    //     const base = await getAllAppointments();


    // }

    return { loadingStatus, getAllAppointments, getAllActiveAppointments, setCancelAppointment, createNewAppointment }

}