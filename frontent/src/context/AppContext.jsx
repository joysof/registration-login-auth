import axios from "axios";
import { createContext, useState } from "react";
import { toast } from "react-toastify";

export const AppContext = createContext()

export const AppContextProvider =(props) =>{
    const backend_url = import.meta.env.VITE_BACKEND_URL
    const [isLoggedin , setIsLoggedin] = useState(false)
    const [userData , setUserData] = useState(false)

    const getUserData = async () =>{
        try {
            const res = await axios.get(`${backend_url}/api/user/data`, {
            withCredentials: true
});
            const data = res.data;

            data.success ? setUserData(data.userData) : toast.error(data.message)
        } catch (error) {
            toast.error(error)
        }
    }
    const value = {
        backend_url , isLoggedin , setIsLoggedin , userData , setUserData,getUserData
    }
    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}