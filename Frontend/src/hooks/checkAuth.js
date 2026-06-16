import { useContext, useState } from "react";
import { AuthContext } from "../contexts/auth.context";
import { loginUser, logoutUser, registerUser } from "../api/auth.api"

export const useAuth = () => {
  const context = useContext(AuthContext)
  const { user, setUser, isCheckingAuth } = context;

  const [loginLoading, setLoginLoading] = useState(false);
  const [registerLoading, setRegisterLoading] = useState(false);
  const [logoutLoading, setLogoutLoading] = useState(false);

  const handleLogin = async ({ email, password }) => {
    try {
      setLoginLoading(true);

      const response = await loginUser({
        email,
        password,
      });

      setUser(response.data.user);

      return response;
    } finally {
      setLoginLoading(false);
    }
  };
  const handleRegister = async ({ name, email, password }) => {
    try {
      setRegisterLoading(true);

      const response = await registerUser({
        name,
        email,
        password,
      });

      setUser(response.data.user);

      return response;
    } finally {
      setRegisterLoading(false);
    }
  }
  const handleLogout = async () => {
    try {
      setLogoutLoading(true);
      const response = await logoutUser();
      setUser(null);
      return response;
    } finally {
      setLogoutLoading(false);
    }
  }


  return { user,loginLoading, registerLoading, logoutLoading,isCheckingAuth, handleLogin, handleLogout, handleRegister };
}
