import React, { useState, useEffect } from 'react';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { HelpCircle, User, Globe, ChevronDown, CheckCircle2, Circle, Clock, CheckCircle } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import * as Popover from '@radix-ui/react-popover';

export const AppLayout = () => {
  const { role, language, setLanguage, setRole, setIsAuthenticated } = useAppContext();
  const location = useLocation();
  const navigate = useNavigate();
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 300);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const t = {
    dashboard: language === 'zh' ? '工作台' : 'Dashboard',
    orders: language === 'zh' ? '我的订单' : 'My Orders',
    reports: language === 'zh' ? '报告中心' : 'Reports',
    account: language === 'zh' ? '账户管理' : 'Account',
    help: language === 'zh' ? '帮助中心' : 'Help',
  };

  const navLinks = [
    { to: '/', label: t.dashboard },
    { to: '/orders', label: t.orders },
    { to: '/reports', label: t.reports },
    { to: '/account', label: t.account },
    { to: '/help', label: t.help },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans">
      {/* Top Navigation */}
      <header className="sticky top-0 z-50 w-full bg-white border-b border-slate-200 shadow-sm">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          
          {/* Logo Area */}
          <div className="flex items-center gap-2 mr-8">
            <img src="/TUVlogo.svg" alt="TUV SÜD Logo" className="w-10 h-10" />
            <span className="font-bold text-[#005085] text-xl hidden sm:inline-block">ODM Portal</span>
          </div>

          {/* Nav Links */}
          <nav className="hidden md:flex flex-1 items-center gap-1">
            {navLinks.map((link) => (
               <NavLink
                 key={link.to}
                 to={link.to}
                 className={({ isActive }) =>
                   cn(
                     "px-3 py-2 text-sm font-medium rounded-md transition-colors",
                     isActive 
                       ? "bg-[#005085]/10 text-[#005085]" 
                       : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                   )
                 }
               >
                 {link.label}
               </NavLink>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            {/* Lang Toggle */}
            <button 
              onClick={() => setLanguage(language === 'en' ? 'zh' : 'en')}
              className="flex items-center gap-1 text-sm text-slate-600 hover:text-slate-900 transition-colors"
            >
              <Globe className="w-4 h-4" />
              <span>{language === 'en' ? '中' : 'EN'}</span>
            </button>

            {/* Help */}
            <NavLink to="/help" className="text-slate-600 hover:text-slate-900 transition-colors">
              <HelpCircle className="w-5 h-5" />
            </NavLink>

            {/* User Dropdown */}
            <Popover.Root>
              <Popover.Trigger asChild>
                <div className="relative group cursor-pointer flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-600">
                    <User className="w-5 h-5" />
                  </div>
                  <span className="text-sm font-medium hidden sm:inline-block">Buyer1</span>
                  <ChevronDown className="w-4 h-4 text-slate-400" />
                </div>
              </Popover.Trigger>
              <Popover.Portal>
                <Popover.Content className="bg-white p-2 rounded-lg shadow-xl border border-slate-200 w-48 text-sm z-50 fade-in zoom-in" align="end" sideOffset={5}>
                   <div className="px-3 py-2 text-xs text-slate-500 font-medium border-b border-slate-100 mb-1">
                     buyer1@alpha.com
                   </div>
                   <button onClick={() => navigate('/account')} className="w-full text-left px-3 py-2 hover:bg-slate-50 rounded-md text-slate-700">Account Settings</button>
                   <button onClick={() => setIsAuthenticated(false)} className="w-full text-left px-3 py-2 hover:bg-red-50 text-red-600 rounded-md">Sign Out</button>
                </Popover.Content>
              </Popover.Portal>
            </Popover.Root>

            {/* PROTOTYPE ONLY: Role Toggle */}
            <div className="flex items-center gap-2 border-l border-slate-200 pl-4 ml-2">
              <span className="text-xs text-slate-400">Switch:</span>
              <button 
                onClick={() => setRole(role === 'User' ? 'Admin' : 'User')}
                className={cn(
                  "text-xs px-2 py-1 rounded",
                  role === 'User' ? "bg-slate-100 text-slate-600" : "bg-[#005085] text-white"
                )}
              >
                {role}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 w-full bg-slate-50 pb-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Floating Elements */}
      <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-50">
        <button 
          className="w-12 h-12 bg-white text-[#005085] rounded-full shadow-lg border border-slate-100 flex items-center justify-center hover:bg-slate-50 transition-colors"
          title="Customer Support"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/></svg>
        </button>
        {showScrollTop && (
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="w-12 h-12 bg-slate-800 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-slate-700 transition-colors"
            title="Back to Top"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m18 15-6-6-6 6"/></svg>
          </button>
        )}
      </div>
    </div>
  );
};
