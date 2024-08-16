import { useHttp } from "../hooks/http.hook"
import hasRequiredFields from "../utils/hasRequiredFields";

const requiredFields = ["id", "date", "name", "service", "phone", "canceled"];

export const useAppointmentService = () => {
    const { loadingStatus, request } = useHttp();
    const _apiBase = "http://localhost:3001/appointment";


    const getAllAppointments = async () => {
        const res = await request({ url: _apiBase });
        if (Array.isArray(res) && res.every(item => {
            return hasRequiredFields(item, requiredFields)
        })) {
            return res;
        } else {
            throw new Error("Data doesn't have all fields");
        }
    }



}