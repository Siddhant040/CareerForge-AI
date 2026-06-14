import Login from "../pages/auth/Login.jsx";
import Register from "../pages/auth/Register.jsx";
import Dashboard from "@/pages/dashboard/Dashboard.jsx";
import { Routes,Route } from "react-router-dom";
import ProtectedRoute from "@/components/protectedroutes/ProtectedAuthRoutes.jsx";
function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Register />} />
            <Route path="/login" element={<Login/>} />
            <Route path="/dashboard" element={
                <ProtectedRoute>
                <Dashboard/>
                </ProtectedRoute>} />
        </Routes>
    );
}

export default AppRoutes
