import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sparkles } from "lucide-react";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { toast } from "sonner";
import { useAuth } from "@/hooks/checkAuth";

export default function Register() {
    const navigate = useNavigate();
    const {handleRegister,registerLoading} = useAuth();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",

    })
    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
           const response = await handleRegister(formData);
            toast.success(response.message);
            navigate("/login");
            
            setFormData({
                name: "",
                email: "",
                password: "",
            });
            
            
        } catch (error) {
           
            toast.error(

                error?.response?.data?.message || "Something went wrong"
            )
            
        }

        
    };






    return (<div className="min-h-screen flex items-center justify-center px-4 bg-black">
        <Card className="w-full max-w-md p-8 bg-zinc-950 border border-zinc-800">
            <form onSubmit={handleSubmit}>
            <div className="flex items-center justify-center gap-3 mb-2">
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

            <p className="text-zinc-400 text-center">
                AI-Powered Career Growth Platform
            </p>

            <div className="space-y-5">
                <div className="space-y-2">
                    <Label className="text-zinc-200">Name</Label>
                    <Input
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleChange}

                        className="bg-zinc-900 border-zinc-700 text-white placeholder:text-zinc-500"
                        placeholder="Enter your name"
                    />
                </div>

                <div className="space-y-2">
                    <Label className="text-zinc-200">Email</Label>
                    <Input
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        type="email"
                        className="bg-zinc-900 border-zinc-700 text-white placeholder:text-zinc-500"
                        placeholder="Enter your email"
                    />
                </div>

                <div className="space-y-2">
                    <Label className="text-zinc-200">Password</Label>
                    <Input
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        type="password"
                        className="bg-zinc-900 border-zinc-700 text-white placeholder:text-zinc-500"
                        placeholder="Enter your password"
                    />
                </div>

                <Button 
                                        type="submit"
                                        disabled={registerLoading}
                                        className="w-full bg-rose-600 hover:bg-rose-700">
                                            {registerLoading? (
                                            <>
                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                Regitering...
                                            
                                         </>
                                              ) :(
                                                "Register"
                                            )}  
                                        </Button>

                <p className="text-center text-sm text-zinc-400">
                    Already have an account?{" "}
                    <span className="text-rose-500 cursor-pointer hover:text-rose-400">
                        Login
                    </span>
                </p>
            </div>
            </form>
        </Card>
    </div>


    );
}
