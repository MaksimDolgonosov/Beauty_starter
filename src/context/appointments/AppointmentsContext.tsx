import { createContext, useReducer } from "react";
import reducer, { IInitialState } from "./reducer";



const initialState: IInitialState = {
    allAppointments: [],
    allActiveAppointments: []
}

interface ProviderProps {
    children: React.ReactNode;
}

const AppointmentContextProvider = ({ children }: ProviderProps) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    
}

export default AppointmentContextProvider;