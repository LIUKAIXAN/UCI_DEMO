import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { ChevronRight, ShieldCheck, Mail, Lock } from 'lucide-react';

export const Login = () => {
  const { setIsAuthenticated, setRole } = useAppContext();
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('buyer1@example.com');
  const [password, setPassword] = useState('password123');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.includes('admin')) {
      setRole('Admin');
    } else {
      setRole('User');
    }
    setIsAuthenticated(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center mb-6">
          <img src="/TUVlogo.svg" alt="TUV SÜD Logo" className="w-20 h-20" />
        </div>
        <h2 className="mt-2 text-center text-3xl font-extrabold text-slate-900">
          {isRegister ? 'Create an account' : 'Sign in to ODM Portal'}
        </h2>
        <p className="mt-2 text-center text-sm text-slate-600">
          Or{' '}
          <button onClick={() => setIsRegister(!isRegister)} className="font-medium text-[#005085] hover:underline">
            {isRegister ? 'sign in to your existing account' : 'register a new company account'}
          </button>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-xl sm:px-10 border border-slate-200">
          <form className="space-y-6" onSubmit={handleLogin}>
            {isRegister && (
               <div>
                <label className="block text-sm font-medium text-slate-700">Full Name</label>
                <div className="mt-1">
                   <input type="text" required className="w-full p-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#005085]/20 focus:border-[#005085]" placeholder="John Doe" />
                </div>
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-slate-700">Email address</label>
              <div className="mt-1 relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input 
                  type="email" required 
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full pl-10 p-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#005085]/20 focus:border-[#005085]" 
                  placeholder="name@company.com" 
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700">Password</label>
              <div className="mt-1 relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input 
                  type="password" required 
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full pl-10 p-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#005085]/20 focus:border-[#005085]" 
                  placeholder="••••••••" 
                />
              </div>
            </div>

            {!isRegister && (
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 text-[#005085] focus:ring-[#005085] border-slate-300 rounded" />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-slate-900">Remember me</label>
                </div>
                <div className="text-sm">
                  <a href="#" className="font-medium text-[#005085] hover:underline">Forgot your password?</a>
                </div>
              </div>
            )}

            <div>
              <button 
                type="submit" 
                className="w-full flex justify-center items-center gap-2 py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-[#005085] hover:bg-[#00406b] transition-colors"
              >
                {isRegister ? 'Register Account' : 'Sign In'} <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </form>
          
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-slate-500">Secure Portal</span>
              </div>
            </div>
            
            <div className="mt-6 flex justify-center text-slate-400">
               <ShieldCheck className="w-8 h-8" />
            </div>
          </div>
        </div>
        
        <div className="mt-4 text-center">
          <p className="text-xs text-slate-500">
            For prototype purposes, any login works. Use "admin" in email to get Admin role.
          </p>
        </div>
      </div>
    </div>
  );
};
