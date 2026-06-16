import Login from "../pages/auth/Login.jsx";
import Register from "../pages/auth/Register.jsx";
import Home from "@/pages/interview/Home.jsx";
import Dashboard from "@/pages/interview/Dashboard.jsx";
import Report from "@/pages/interview/Report.jsx";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "@/components/protectedroutes/ProtectedAuthRoutes.jsx";
function AppRoutes() {
    return (
        <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Home />} />
            <Route
                path="/dashboard"
                element={
                    <ProtectedRoute>
                        <Dashboard />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/report"
                element={
                    <ProtectedRoute>
                        <Report />
                    </ProtectedRoute>
                }
            />

        </Routes>
    );
}

export default AppRoutes
