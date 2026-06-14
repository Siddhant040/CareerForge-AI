import { useContext, useEffect } from "react";
import { AuthContext } from "../contexts/auth.context";
import {loginUser, logoutUser, registerUser, getUser} from "../api/auth.api"

export const useAuth = () => {
   const context = useContext(AuthContext)
   const {user, setUser, loading, setLoading} = context;

  const handleLogin = async ({ email, password }) => {
  try {
    setLoading(true);

    const response = await loginUser({
      email,
      password,
    });

    setUser(response.data.user);

    return response;
  } finally {
    setLoading(false);
  }
};
   const handleRegister = async ({name,email,password}) =>{
   try {
    setLoading(true);

    const response = await registerUser({
      name,
      email,
      password,
    });

    setUser(response.data.user);

    return response;
  } finally {
    setLoading(false);
  }
   }
   const handleLogout = async () => {
       setLoading(true)
       const response = await logoutUser();
       setUser(null);
       setLoading(false)
   }

   

   return {user, loading, handleLogin, handleLogout, handleRegister};
}
