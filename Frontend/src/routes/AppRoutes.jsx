import Login from "../pages/auth/Login.jsx";
import Register from "../pages/auth/Register.jsx";
import Dashboard from "@/pages/dashboard/Dashboard.jsx";
import { Routes,Route } from "react-router-dom";
function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Register />} />
            <Route path="/login" element={<Login/>} />
            <Route path="/dashboard" element={<Dashboard/>} />
        </Routes>
    );
}

export default AppRoutes
