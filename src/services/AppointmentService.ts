import { useHttp } from "../hooks/http.hook"

export const useAppointmentService = () => {
    const { loadingStatus, request } = useHttp();
    const _apiBase = "http://localhost:3001/appointment";


    const getAllAppointments = async () => {
        const res = await request({ url: _apiBase })
    }



}