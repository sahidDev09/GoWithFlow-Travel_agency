"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Lock, 
  Mail, 
  ArrowRight, 
  Loader2, 
  ShieldCheck, 
  Eye, 
  EyeOff,
  AlertCircle
} from "lucide-react";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const auth = localStorage.getItem("isAdminAuthenticated");
    if (auth === "true") {
      router.push("/admin");
    }
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Realistic delay for premium feel
    await new Promise((resolve) => setTimeout(resolve, 1500));

    if (email === "travel@gmail.com" && password === "travel1234") {
      setIsSuccess(true);
      localStorage.setItem("isAdminAuthenticated", "true");
      setTimeout(() => {
        router.push("/admin");
      }, 800);
    } else {
      setError("Invalid credentials. Please verify your email and password.");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#F8FAFC] dark:bg-[#020617] relative overflow-hidden font-sans selection:bg-indigo-100 dark:selection:bg-indigo-900/40">
      

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-[580px] p-6"
      >
        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-3xl border border-white/40 dark:border-slate-800/50 rounded-[3rem] shadow-[0_32px_128px_-16px_rgba(0,0,0,0.1)] dark:shadow-[0_32px_128px_-16px_rgba(0,0,0,0.4)] overflow-hidden">
          {/* Top Decorative bar */}
          <div className="h-2 w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500" />
          
          <div className="p-10 sm:p-12">
            <div className="flex flex-col items-center mb-12 text-center">
             
              
              <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white mb-3 tracking-tight">
                Welcome Back
              </h1>
              <p className="text-slate-500 dark:text-slate-400 font-medium text-lg">
                Enter your credentials to access the admin flight deck.
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <div className="flex flex-col gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1 flex items-center gap-2">
                    <Mail size={14} className="text-indigo-500" />
                    Email Address
                  </label>
                  <div className="relative group">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="travel@gmail.com"
                      required
                      className="w-full pl-6 pr-6 py-4 bg-slate-50/50 dark:bg-slate-800/30 border border-slate-200 dark:border-slate-800 rounded-2xl text-slate-900 dark:text-white focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 focus:bg-white dark:focus:bg-slate-900 transition-all outline-none text-lg font-medium placeholder:text-slate-400"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1 flex items-center gap-2">
                    <Lock size={14} className="text-indigo-500" />
                    Password
                  </label>
                  <div className="relative group">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      required
                      className="w-full pl-6 pr-14 py-4 bg-slate-50/50 dark:bg-slate-800/30 border border-slate-200 dark:border-slate-800 rounded-2xl text-slate-900 dark:text-white focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 focus:bg-white dark:focus:bg-slate-900 transition-all outline-none text-lg font-medium placeholder:text-slate-400"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-5 top-1/2 -translate-y-1/2 p-2 text-slate-400 hover:text-indigo-500 transition-colors"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>
              </div>

              <AnimatePresence mode="wait">
                {error && (
                  <motion.div
                    initial={{ opacity: 0, height: 0, scale: 0.9 }}
                    animate={{ opacity: 1, height: "auto", scale: 1 }}
                    exit={{ opacity: 0, height: 0, scale: 0.9 }}
                    className="p-4 bg-rose-50 dark:bg-rose-900/10 border border-rose-200/50 dark:border-rose-900/20 rounded-2xl text-rose-600 dark:text-rose-400 text-sm font-bold flex items-center gap-3"
                  >
                    <AlertCircle size={18} />
                    {error}
                  </motion.div>
                )}
              </AnimatePresence>

              <button
                type="submit"
                disabled={isLoading || isSuccess}
                className="w-full py-5 bg-gradient-to-r from-indigo-600 via-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white rounded-[1.5rem] font-bold shadow-xl shadow-indigo-500/25 dark:shadow-indigo-900/40 transition-all flex items-center justify-center gap-3 group disabled:opacity-80 relative overflow-hidden h-[68px]"
              >
                {isLoading ? (
                  <Loader2 className="animate-spin" size={24} />
                ) : isSuccess ? (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="flex items-center gap-2"
                  >
                    <ShieldCheck size={24} />
                    Authenticated
                  </motion.div>
                ) : (
                  <>
                    <span className="text-lg">Sign In</span>
                    <ArrowRight size={22} className="group-hover:translate-x-1.5 transition-transform" />
                  </>
                )}
                
                {/* Button shine effect */}
                <motion.div 
                  animate={{ x: ["-100%", "200%"] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                  className="absolute top-0 bottom-0 left-0 w-20 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[20deg] pointer-events-none"
                />
              </button>
            </form>
          </div>
        </div>
      </motion.div>
      
      <style jsx global>{`
        input:-webkit-autofill,
        input:-webkit-autofill:hover, 
        input:-webkit-autofill:focus {
          -webkit-text-fill-color: inherit;
          -webkit-box-shadow: 0 0 0px 1000px transparent inset;
          transition: background-color 5000s ease-in-out 0s;
        }
      `}</style>
    </div>
  );
}
