import { createContext, useState, useEffect } from "react";
import { getUser } from "../api/auth.api";



export const AuthContext = createContext();
export  const AuthProvider =({children})=>{
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
    const fetchUser = async () => {
        try {
            const response = await getUser();
            console.log("full response:",response.data.user);
            console.log(response.data.user);
            setUser(response.data.user);
        } catch (error) {
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    fetchUser();
}, []);

    

    return (
        <AuthContext.Provider value={{user, setUser, loading, setLoading}}>
            {children}
        </AuthContext.Provider>
    );
    
}