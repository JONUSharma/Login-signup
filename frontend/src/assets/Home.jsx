import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { HandleError, HandleSuccess } from "./Toast";
import { ToastContainer } from "react-toastify";
import TaskDashboard from "./Tasks/TaskDashboard";
import { LogOut, Layout, UserCircle, Bell } from "lucide-react"; // npm install lucide-react

function Home() {
  const navigate = useNavigate();
  const [loginUser, setLoginUser] = useState("");

  useEffect(() => {
    setLoginUser(localStorage.getItem("LoggedInUser"));
  }, []);

  const handleLogout = () => {
    try {
      localStorage.removeItem("token");
      localStorage.removeItem("LoggedInUser");
      HandleSuccess("Logout successfully");
      setTimeout(() => {
        navigate("/login");
      }, 1200);
    } catch (error) {
      HandleError("Logout failed");
    }
  };

  return (
    <div className="min-h-screen bg-[#F1F5F9] flex flex-col font-sans">
      {/* 🔹 Professional Navbar */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-slate-200 px-8 py-3 sticky top-0 z-50 flex justify-between items-center shadow-sm">
        <div className="flex items-center gap-4">
          <div className="bg-blue-600 p-2 rounded-xl text-white shadow-lg shadow-blue-200">
             <Layout size={24} />
          </div>
          <div>
            <h1 className="text-xl font-extrabold text-slate-900 tracking-tight leading-none">
              Task Management <span className="text-blue-600">Pro</span>
            </h1>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mt-1">
              Management Suite
            </p>
          </div>
        </div>

        <div className="flex items-center gap-6">
          {/* User Info Section */}
          <div className="hidden md:flex items-center gap-3 px-4 py-1.5 bg-slate-50 rounded-full border border-slate-100">
            <div className="text-right">
              <p className="text-xs text-slate-400 font-semibold uppercase tracking-tighter">Current User</p>
              <p className="text-sm font-bold text-slate-700">{loginUser || "Guest"}</p>
            </div>
            <UserCircle size={32} className="text-slate-300" />
          </div>

          <button
            onClick={handleLogout}
            className="group flex items-center gap-2 px-5 py-2.5 bg-white border border-red-100 text-red-500 font-bold text-sm rounded-xl hover:bg-red-500 hover:text-white transition-all duration-300 shadow-sm active:scale-95"
          >
            <LogOut size={18} className="group-hover:-translate-x-1 transition-transform" />
            Logout
          </button>
        </div>
      </nav>

      {/* 🔹 Main Content Area */}
      <main className="flex-1 p-6 md:p-10 lg:p-12">
        <div className="max-w-7xl mx-auto">
          
          {/* Welcome Header */}
          <div className="mb-10">
            <h2 className="text-3xl font-black text-slate-800 tracking-tight">
              Workspace Overview
            </h2>
            <p className="text-slate-500 font-medium mt-1">
              Welcome back, {loginUser}. Here is what's happening with your tasks.
            </p>
          </div>

          {/* 🔹 Dashboard Container */}
          <div className="bg-white rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-200/60 p-2 overflow-hidden">
            <div className="bg-slate-50/50 rounded-[1.8rem] p-6 md:p-8">
               <TaskDashboard />
            </div>
          </div>
        </div>
      </main>

      <ToastContainer position="bottom-right" />
    </div>
  );
}

export default Home;