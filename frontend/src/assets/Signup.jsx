import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import { HandleError, HandleSuccess, HandleWarning } from './Toast';
import { User, Mail, Lock, UserPlus, Eye, EyeOff, Layout } from "lucide-react"; // npm install lucide-react

function Signup() {
    const [getValue, setValue] = useState({
        Name: "",
        Email: "",
        Password: "",
    });
    
    const [showPassword, setShowPassword] = useState(false); 
    const [isLoading, setIsLoading] = useState(false);
    const Navigate = useNavigate();

    const HandleChange = (e) => {
        const { name, value } = e.target;
        setValue(prev => ({ ...prev, [name]: value }));
    }

    const HandleSubmit = async (e) => {
        e.preventDefault();
        const { Name, Email, Password, ConfirmPassword } = getValue;
        
        // 🔹 Professional Validation Logic
        if (!Name || !Password || !Email) {
            return HandleError("All fields are required");
        }
        if (Password !== ConfirmPassword) {
            return HandleError("Passwords do not match!");
        }
        if (Password.length < 6) {
            return HandleError("Password must be at least 6 characters");
        }

        setIsLoading(true);
        try {
            const url = `${import.meta.env.VITE_BACKEND_URL}/signup`;
            // Note: We don't send ConfirmPassword to the backend, just the main data
            const signupData = { Name, Email, Password };
            
            const response = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(signupData)
            });
            const result = await response.json();

            const { success, msg, error } = result;
            
            if (success) {
                HandleSuccess(msg);
                setTimeout(() => Navigate("/login"), 1500);
            } else if (error) {
                const detail = error?.details?.[0]?.message || "Validation error";
                HandleError(detail);
            } else {
                HandleError(msg || "Registration failed");
            }
        } catch (error) {
            HandleWarning("Connection error. Try again.");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-6 relative overflow-hidden font-sans">
            {/* Background Blobs */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
                <div className="absolute top-[-5%] right-[-5%] w-[35%] h-[35%] bg-blue-100/60 rounded-full blur-[100px]"></div>
                <div className="absolute bottom-[-5%] left-[-5%] w-[35%] h-[35%] bg-indigo-100/60 rounded-full blur-[100px]"></div>
            </div>

            <div className="w-full max-w-[480px] z-10">
                <div className="flex flex-col items-center mb-6 text-center">
                    <div className="bg-blue-600 p-3 rounded-2xl text-white shadow-xl shadow-blue-200 mb-4 transform hover:scale-110 transition-transform">
                        <Layout size={32} />
                    </div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight">Join Task Management</h1>
                    <p className="text-slate-500 font-medium mt-1 text-sm px-4">Create your account to start managing your Tasks with precision.</p>
                </div>

                <div className="bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-slate-200 p-8 md:p-10">
                    <form onSubmit={HandleSubmit} className="space-y-4">
                        
                        {/* Name Input */}
                        <div className="space-y-1.5">
                            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                            <div className="relative group">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={18} />
                                <input 
                                    type="text" name="Name" value={getValue.Name} onChange={HandleChange} placeholder="Ram" 
                                    className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-transparent rounded-2xl focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 outline-none transition-all text-slate-700"
                                />
                            </div>
                        </div>

                        {/* Email Input */}
                        <div className="space-y-1.5">
                            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1">Email</label>
                            <div className="relative group">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={18} />
                                <input 
                                    type="email" name="Email" value={getValue.Email} onChange={HandleChange} placeholder="example@gmail.com" 
                                    className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-transparent rounded-2xl focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 outline-none transition-all text-slate-700"
                                />
                            </div>
                        </div>

                        {/* Password Input with Show/Hide */}
                        <div className="space-y-1.5">
                            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1">Password</label>
                            <div className="relative group">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={18} />
                                <input 
                                    type={showPassword ? "text" : "password"}
                                    name="Password" value={getValue.Password} onChange={HandleChange} placeholder="••••••••" 
                                    className="w-full pl-12 pr-12 py-3.5 bg-slate-50 border border-transparent rounded-2xl focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 outline-none transition-all text-slate-700"
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

                        {/* Confirm Password Input */}
                        <div className="space-y-1.5">
                            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1">Confirm Password</label>
                            <div className="relative group">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={18} />
                                <input 
                                    type={showPassword ? "text" : "password"} 
                                    name="ConfirmPassword"  onChange={HandleChange} placeholder="••••••••" 
                                    className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-transparent rounded-2xl focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 outline-none transition-all text-slate-700"
                                />
                            </div>
                        </div>

                        <button 
                            type="submit" disabled={isLoading}
                            className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 rounded-2xl shadow-lg shadow-slate-200 flex items-center justify-center gap-2 group transition-all active:scale-95 disabled:opacity-70 mt-4"
                        >
                            {isLoading ? "Processing..." : "Create Workspace Account"}
                            {!isLoading && <UserPlus size={18} className="group-hover:scale-110 transition-transform" />}
                        </button>

                        <div className="text-center pt-2">
                            <p className="text-slate-500 font-medium text-sm">
                                Already a member?{" "}
                                <Link to="/login" className="text-blue-600 font-bold hover:underline underline-offset-4">
                                    Login here
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

export default Signup;