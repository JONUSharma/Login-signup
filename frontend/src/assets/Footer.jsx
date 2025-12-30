import React from 'react';
import { Heart, Github, Linkedin, } from "lucide-react"; 

const Footer = () => {
  return (
    <footer className="w-full py-8 mt-auto border-t border-slate-200 bg-white/50 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Left Side: Branding/Copyright */}
        <div className="flex items-center gap-2 order-2 md:order-1">
          <p className="text-slate-500 text-sm font-medium">
            © 2025 <span className="text-slate-900 font-bold">TaskFlow Pro</span>. All rights reserved.
          </p>
        </div>

        {/* Center Side: The "Made with Love" Section */}
        <div className="flex items-center gap-2 order-1 md:order-2 group">
          <span className="text-slate-400 text-sm font-medium tracking-tight">Made with</span>
          <div className="relative flex items-center justify-center">
             <Heart 
               size={18} 
               className="text-red-500 fill-red-500 animate-pulse group-hover:scale-125 transition-transform duration-300" 
             />
             <div className="absolute inset-0 bg-red-400/20 blur-lg rounded-full animate-ping opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </div>
          <span className="text-slate-400 text-sm font-medium tracking-tight">by</span>
          <a 
            href="#" 
            className="text-slate-900 font-black text-sm hover:text-blue-600 transition-colors relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-blue-600 after:transition-all hover:after:w-full"
          >
            JonuSharma
          </a>
        </div>

        {/* Right Side: Social Links (Great for Showcasing) */}
        <div className="flex items-center gap-5 order-3">
          <a href="https://github.com/JONUSharma" target='_blank' className="text-slate-400 hover:text-slate-900 transition-colors" title="Github">
            <Github size={20} />
          </a>
          <a href="https://www.linkedin.com/in/jonu-sharma-a316b3275/" target='_blank' className="text-slate-400 hover:text-blue-600 transition-colors" title="LinkedIn">
            <Linkedin size={20} />
          </a>
         
        </div>
        
      </div>
    </footer>
  );
};

export default Footer;