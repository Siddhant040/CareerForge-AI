import { useState } from "react";
import { Sparkles } from "lucide-react";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

import { useAuth } from "@/hooks/checkAuth";

export default function Login() {
    const navigate = useNavigate();

    const {handleLogin,loginLoading} = useAuth();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await handleLogin(formData);
            toast.success(response.message);
            navigate("/dashboard");
            
            
            setFormData({
                email: "",
                password: "",
            });

        } catch (error) {
            

            toast.error(
                error.response?.data?.message ||
                "Something went wrong"
            );
        }
    }


    return (
        <div className="min-h-screen flex items-center justify-center px-4 bg-black">
            <Card className="w-full max-w-md p-8 bg-zinc-950 border border-zinc-800">
                <form onSubmit={handleSubmit}>
                    <div className="mb-8 text-center">
                        <div className="flex items-center justify-center gap-3 mb-3">
                            <div className="p-2 rounded-xl bg-rose-600/20">
                                <Sparkles
                                    size={32}
                                    className="text-rose-500"
                                />
                            </div>

                            <h1 className="text-4xl font-bold text-rose-500">
                                CareerForge AI
                            </h1>
                        </div>

                        <p className="text-zinc-400">
                            Welcome back to your career journey
                        </p>
                    </div>

                    <div className="space-y-5">
                        <div className="space-y-2">
                            <Label className="text-zinc-200">
                                Email
                            </Label>

                            <Input
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                type="email"
                                placeholder="Enter your email"
                                className="bg-zinc-900 border-zinc-700 text-white placeholder:text-zinc-500"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label className="text-zinc-200">
                                Password
                            </Label>

                            <Input
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                type="password"
                                placeholder="Enter your password"
                                className="bg-zinc-900 border-zinc-700 text-white placeholder:text-zinc-500"
                            />
                        </div>

                        <Button 
                        type="submit"
                        disabled={loginLoading}
                        className="w-full bg-rose-600 hover:bg-rose-700">
                            {loginLoading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Logging in...
                            
                         </>
                              ) :(
                                "Login"
                            )}  
                        </Button>
                        

                        <p
                         onClick={() => navigate("/register")}
                         className="text-center text-sm text-zinc-400">
                            Don't have an account?{" "}
                            <span className="text-rose-500 hover:text-rose-400 cursor-pointer">
                                Register
                            </span>
                        </p>
                    </div>
                </form>
            </Card>
        </div>
    );
}