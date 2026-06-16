import { createContext, useState, useEffect } from "react";
import { getUser, refreshAccessToken } from "../api/auth.api";




export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isCheckingAuth, setIsCheckingAuth] = useState(true);
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await getUser();

                setUser(response.data.user);
            } catch {
                try {
                    console.log("Trying refresh token...");
                    await refreshAccessToken();

                    const response = await getUser();
                    setUser(response.data.user);
                    console.log("User restored after refresh");


                } catch (error) {
                    console.log("Full refresh error:", error);
                    console.log("Status:", error.response?.status);
                    console.log("Data:", error.response?.data);

                    setUser(null);
                }

            }
            finally {
                setIsCheckingAuth(false);
            }
        };

        fetchUser();
    }, []);



    return (
        <AuthContext.Provider value={{ user, setUser, isCheckingAuth }}>
            {children}
        </AuthContext.Provider>
    );

}