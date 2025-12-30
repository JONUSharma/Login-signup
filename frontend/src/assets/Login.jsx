import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HandleSuccess, HandleError, HandleWarning } from './Toast';
import { ToastContainer } from "react-toastify";
import { Mail, Lock, ArrowRight, Layout, Eye, EyeOff } from "lucide-react"; 

function Login() {
    const [getValue, setValue] = useState({
        Email: "",
        Password: ""
    });
    const [isLoading, setIsLoading] = useState(false);
    const Navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false); 
    const HandleChange = (e) => {
        const { name, value } = e.target;
        setValue(prev => ({ ...prev, [name]: value }));
    }

    const HandleSubmit = async (e) => {
        e.preventDefault();
        const { Email, Password } = getValue;
        
        if (!Password || !Email) {
            return HandleError("Email and password are required");
        }

        setIsLoading(true);
        try {
            const url = `${import.meta.env.VITE_BACKEND_URL}/user/login`;
            const response = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(getValue)
            });
            const result = await response.json();

            const { success, jwtToken, Name, msg, error } = result;

            if (success) {
                HandleSuccess(msg);
                localStorage.setItem("token", jwtToken);
                localStorage.setItem("LoggedInUser", Name);
                setTimeout(() => {
                    Navigate("/home");
                }, 1500);
            } else if (error) {
                const detail = error?.details?.[0]?.message || "Validation failed";
                HandleError(detail);
            } else {
                HandleError(msg || "Invalid credentials");
            }
        } catch (error) {
            HandleWarning("Server connection error");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-6 relative overflow-hidden">
            {/* 🔹 Background Decoration Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-100/50 rounded-full blur-[120px]"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-100/50 rounded-full blur-[120px]"></div>
            </div>

            <div className="w-full max-w-[440px] z-10">
                {/* 🔹 Logo / Branding */}
                <div className="flex flex-col items-center mb-8">
                    <div className="bg-blue-600 p-3 rounded-2xl text-white shadow-xl shadow-blue-200 mb-4">
                        <Layout size={32} />
                    </div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight">Welcome Back</h1>
                    <p className="text-slate-500 font-medium mt-2 text-center">Enter your details to access your workspace</p>
                </div>

                {/* 🔹 Login Card */}
                <div className="bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-slate-200 p-10">
                    <form onSubmit={HandleSubmit} className="space-y-6">
                        {/* Email Input */}
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
                            <div className="relative group">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={20} />
                                <input 
                                    type="email" 
                                    name="Email"
                                    value={getValue.Email}
                                    onChange={HandleChange}
                                    placeholder="name@company.com" 
                                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-transparent rounded-2xl focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 outline-none transition-all text-slate-700 font-medium"
                                />
                            </div>
                        </div>

                        {/* Password Input */}
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Password</label>
                            <div className="relative group">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={20} />
                                <input 
                                    type={showPassword ? "text" : "password"}
                                    name="Password"
                                    value={getValue.Password}
                                    onChange={HandleChange}
                                    placeholder="••••••••" 
                                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-transparent rounded-2xl focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 outline-none transition-all text-slate-700 font-medium"
                                />
                                <button 
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button 
                            type="submit" 
                            disabled={isLoading}
                            className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 rounded-2xl shadow-lg shadow-slate-200 flex items-center justify-center gap-2 group transition-all active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {isLoading ? "Signing in..." : "Login to Account"}
                            {!isLoading && <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />}
                        </button>

                        {/* Signup Link */}
                        <div className="text-center pt-2">
                            <p className="text-slate-500 font-medium text-sm">
                                Don't have an account?{" "}
                                <Link to="/signup" className="text-blue-600 font-bold hover:underline underline-offset-4">
                                    Create Account
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>

            </div>
            <ToastContainer position="top-center" />
        </div>
    )
}

export default Login;