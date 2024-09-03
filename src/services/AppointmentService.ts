import { useHttp } from "../hooks/http.hook";
import dayjs from 'dayjs';
import hasRequiredFields from "../utils/hasRequiredFields";
import { IAppointment, ActiveAppointment } from "../shared/interfaces/appointment.interface";
const requiredFields = ["id", "date", "name", "service", "phone", "canceled"];

export const useAppointmentService = () => {
    const { loadingStatus, request, modification } = useHttp();
    const _apiBase = "http://localhost:3001/appointments";


    console.log("service hook");
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
            })
        return transformed;
    }

    const setCancelAppointment = async (id: number): Promise<IAppointment> => {
        const res = await modification({ url: `${_apiBase}/${id}`, body: JSON.stringify({ canceled: true }) });
        if (hasRequiredFields(res, requiredFields)) {
            return res
        } else {
            throw new Error("Something wrong!");
        }

    }

    return { loadingStatus, getAllAppointments, getAllActiveAppointments, setCancelAppointment }

}