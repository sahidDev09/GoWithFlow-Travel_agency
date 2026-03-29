"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Calendar, 
  Users, 
  Globe, 
  MessageSquare, 
  Image as ImageIcon,
  LogOut,
  Settings,
  Bell,
  Search,
  Sparkles,
  PanelLeftClose,
  PanelLeftOpen,
  Loader2
} from "lucide-react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const sidebarItems = [
  { name: "Dashboard", icon: LayoutDashboard, href: "/admin" },
  { name: "Events", icon: Calendar, href: "/admin/events" },
  { name: "Hosts & Employees", icon: Users, href: "/admin/hosts" },
  { name: "Total Travelers", icon: Globe, href: "/admin/travelers" },
  { name: "Feedbacks", icon: MessageSquare, href: "/admin/feedbacks" },
  { name: "Gallery", icon: ImageIcon, href: "/admin/gallery" },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("isAdminAuthenticated") === "true";
    }
    return null;
  });
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Sync with localStorage on every navigation
    const currentAuth = localStorage.getItem("isAdminAuthenticated") === "true";
    
    // Only update state if it has changed to avoid cascading renders
    if (currentAuth !== isAuthenticated) {
      setIsAuthenticated(currentAuth);
    }

    if (!currentAuth && pathname !== "/admin/login") {
      router.push("/admin/login");
    }
  }, [isAuthenticated, pathname, router]);

  const handleLogout = () => {
    localStorage.removeItem("isAdminAuthenticated");
    setIsAuthenticated(false);
    router.push("/admin/login");
  };

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    const handleScroll = () => {
      setScrolled(scrollContainer.scrollTop > 20);
    };
    
    scrollContainer.addEventListener("scroll", handleScroll);
    return () => scrollContainer.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  // If the user is on the login page, just render children without the layout
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  // If not authenticated, we're being redirected or still checking
  if (isAuthenticated === null || !isAuthenticated) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-[#F8FAFC] dark:bg-[#020617]">
        <Loader2 className="animate-spin text-indigo-500" size={32} />
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-[#F8FAFC] dark:bg-[#020617] overflow-hidden font-sans selection:bg-indigo-100 dark:selection:bg-indigo-900/40">
      {/* Background Decorative Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-500/5 blur-[120px] dark:bg-indigo-900/10" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-500/5 blur-[120px] dark:bg-blue-900/10" />
      </div>

      {/* Sidebar */}
      <motion.aside
        initial={{ width: 280 }}
        animate={{ width: isCollapsed ? 88 : 280 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-50 flex flex-col h-full bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border-r border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none"
      >
        <div className="flex items-center justify-between px-6 h-24">
          <AnimatePresence mode="wait">
            {!isCollapsed ? (
              <motion.div
                key="logo-full"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex items-center gap-3"
              >
                <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-400 tracking-tight">
                  GoWithFlow
                </h1>
              </motion.div>
            ) : (
              <motion.div
                key="logo-small"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 to-blue-500 flex items-center justify-center shadow-lg shadow-indigo-200 dark:shadow-indigo-900/40 mx-auto"
              >
                <Sparkles className="text-white" size={20} />
              </motion.div>
            )}
          </AnimatePresence>
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 rounded-xl text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            {isCollapsed ? <PanelLeftOpen size={20} /> : <PanelLeftClose size={20} />}
          </button>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto custom-scrollbar">
          {sidebarItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link key={item.name} href={item.href} className="block relative">
                <motion.div
                  className={cn(
                    "flex items-center px-4 py-3.5 rounded-2xl transition-all duration-300 group cursor-pointer",
                    isActive
                      ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200 dark:shadow-indigo-900/30"
                      : "text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-white"
                  )}
                  whileHover={{ x: isActive ? 0 : 4 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <item.icon size={22} className={cn(
                    "flex-shrink-0 transition-transform duration-300 group-hover:scale-110",
                    isActive ? "text-white" : "group-hover:text-indigo-600 dark:group-hover:text-indigo-400"
                  )} />
                  {!isCollapsed && (
                    <motion.span 
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="ml-4 font-semibold text-[15px] whitespace-nowrap"
                    >
                      {item.name}
                    </motion.span>
                  )}
                  {isActive && !isCollapsed && (
                    <motion.div
                      layoutId="active-pill"
                      className="absolute right-4 w-1.5 h-1.5 rounded-full bg-white"
                    />
                  )}
                </motion.div>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-200 dark:border-slate-800 space-y-2">
          <div className="flex items-center px-4 py-3.5 rounded-2xl text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800/50 transition-all cursor-pointer group">
            <Settings size={22} className="group-hover:rotate-45 transition-transform duration-500" />
            {!isCollapsed && <span className="ml-4 font-medium">Settings</span>}
          </div>
          <div 
            onClick={handleLogout}
            className="flex items-center px-4 py-3.5 rounded-2xl text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/10 transition-all cursor-pointer group"
          >
            <LogOut size={22} className="group-hover:-translate-x-1 transition-transform duration-300" />
            {!isCollapsed && <span className="ml-4 font-medium">Logout</span>}
          </div>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-h-0 overflow-hidden relative z-10">
        {/* Top Navbar */}
        <header className={cn(
          "h-24 px-10 flex items-center justify-between z-40 transition-all duration-300 border-b border-transparent",
          scrolled ? "bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-slate-200 dark:border-slate-800 shadow-sm" : ""
        )}>
          <div className="flex flex-col">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
              {sidebarItems.find(item => item.href === pathname)?.name || "Admin"}
            </h2>
            <div className="flex items-center gap-2 text-sm text-slate-500 font-medium">
              <span>Overview</span>
              <span className="w-1 h-1 rounded-full bg-slate-300" />
              <span>{new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="hidden md:flex relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" size={18} />
              <input 
                type="text" 
                placeholder="Search anything..." 
                className="pl-11 pr-4 py-2.5 bg-slate-100 dark:bg-slate-800 border-none rounded-2xl text-sm w-64 focus:ring-2 focus:ring-indigo-500 focus:bg-white dark:focus:bg-slate-900 transition-all"
              />
            </div>

            <div className="flex items-center gap-3">
              <button className="p-2.5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 relative transition-colors shadow-sm">
                <Bell size={20} className="text-slate-600 dark:text-slate-300" />
                <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-indigo-500 rounded-full border-2 border-white dark:border-slate-800 animate-pulse"></span>
              </button>
              
              <div className="h-12 flex items-center gap-3 px-1.5 py-1.5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm">
                <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-indigo-500 to-blue-400 flex items-center justify-center text-white font-bold text-sm shadow-md">
                  AD
                </div>
                <div className="hidden lg:block pr-2">
                  <p className="text-xs font-bold text-slate-900 dark:text-white leading-tight">Admin User</p>
                  <p className="text-[10px] text-slate-500 font-medium uppercase tracking-wider">Super Admin</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic Content */}
        <div 
          ref={scrollContainerRef}
          className="flex-1 overflow-y-auto p-10 custom-scrollbar admin-scroll-container" 
          data-lenis-prevent
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={pathname}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-[1600px] mx-auto"
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #E2E8F0;
          border-radius: 10px;
        }
        .dark .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #1E293B;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #CBD5E1;
        }
      `}</style>
    </div>
  );
}
