import React, { useState } from 'react';
import { User, Building2, Bell, Shield, Download, Power, ShieldAlert, LogOut, AlertCircle } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { cn } from '../lib/utils';
import * as Popover from '@radix-ui/react-popover';

type MenuId = 'profile' | 'company' | 'notifications' | 'admin_users';

export const Account = () => {
  const { role, setIsAuthenticated } = useAppContext();
  const [activeMenu, setActiveMenu] = useState<MenuId>('profile');

  const menus = [
    { id: 'profile' as const, label: 'My Profile', icon: User },
    { id: 'company' as const, label: 'Company Info', icon: Building2 },
    { id: 'notifications' as const, label: 'Notifications', icon: Bell },
    ...(role === 'Admin' ? [{ id: 'admin_users' as const, label: 'User Management (Admin)', icon: Shield }] : []),
  ];

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl animate-in fade-in duration-500">
      <h1 className="text-2xl font-bold text-slate-900 mb-8">Account Settings</h1>

      <div className="flex flex-col md:flex-row gap-8">
        
        {/* Left Sidebar */}
        <div className="w-full md:w-64 flex-shrink-0">
          <nav className="space-y-1">
            {menus.map(menu => {
              const Icon = menu.icon;
              const isActive = activeMenu === menu.id;
              return (
                <button
                  key={menu.id}
                  onClick={() => setActiveMenu(menu.id)}
                  className={cn(
                    "w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors text-left",
                    isActive 
                      ? "bg-[#005085]/10 text-[#005085]" 
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                  )}
                >
                  <Icon className="w-4 h-4" />
                  {menu.label}
                </button>
              );
            })}
             <button
               onClick={() => setIsAuthenticated(false)}
               className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors text-left text-red-600 hover:bg-red-50 mt-4"
             >
               <LogOut className="w-4 h-4" />
               Sign Out
             </button>
          </nav>
        </div>

        {/* Right Content */}
        <div className="flex-1 bg-white rounded-xl border border-slate-200 shadow-sm p-6 sm:p-8 min-h-[500px]">
          
          {activeMenu === 'profile' && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-300">
              <h2 className="text-xl font-bold text-slate-800 mb-6">My Profile</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                  <input type="text" defaultValue="John Doe" className="w-full p-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#005085]/20 focus:border-[#005085]" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-500 mb-1">Email <span className="text-[10px] bg-slate-100 px-1 py-0.5 rounded ml-1">Read-only</span></label>
                  <input type="email" defaultValue="buyer1@example.com" disabled className="w-full p-2.5 border border-slate-200 bg-slate-50 text-slate-500 rounded-lg" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Phone Number</label>
                  <input type="text" defaultValue="+1 234 567 8900" className="w-full p-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#005085]/20 focus:border-[#005085]" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Position / Title</label>
                  <input type="text" defaultValue="Sourcing Manager" className="w-full p-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#005085]/20 focus:border-[#005085]" />
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-slate-100 max-w-2xl">
                <h3 className="text-base font-semibold text-slate-800 mb-4">Security</h3>
                <div className="flex items-center justify-between p-4 border border-slate-200 rounded-xl bg-slate-50 mb-4">
                  <div>
                    <div className="font-medium text-slate-800 text-sm">Password</div>
                    <div className="text-xs text-slate-500 mt-0.5">Last changed 3 months ago</div>
                  </div>
                  <button className="px-4 py-2 text-sm font-medium text-[#005085] bg-white border border-slate-200 rounded-lg shadow-sm hover:bg-slate-50">Change</button>
                </div>
                
                <div className="flex items-center justify-between p-4 border border-slate-200 rounded-xl bg-slate-50">
                  <div className="flex items-start gap-3">
                    <ShieldAlert className="w-5 h-5 text-amber-500 mt-0.5" />
                    <div>
                      <div className="font-medium text-slate-800 text-sm">Two-Factor Authentication (2FA)</div>
                      <div className="text-xs text-slate-500 mt-0.5">Not enabled. Recommended for extra security.</div>
                    </div>
                  </div>
                  <button className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-lg shadow-sm hover:bg-slate-50">Setup</button>
                </div>
              </div>
              
              <div className="mt-8 flex justify-end max-w-2xl">
                <button className="px-6 py-2.5 bg-[#005085] text-white text-sm font-medium rounded-lg hover:bg-[#00406b] transition-colors">Save Changes</button>
              </div>
            </div>
          )}

          {activeMenu === 'company' && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-300">
               <h2 className="text-xl font-bold text-slate-800 mb-6">Company Information</h2>
               <div className="bg-slate-50 rounded-xl p-6 border border-slate-200 max-w-2xl">
                 <div className="flex items-center justify-between mb-6 pb-6 border-b border-slate-200">
                   <div>
                     <div className="text-sm text-slate-500 mb-1 uppercase tracking-wider font-semibold">Associated Company</div>
                     <div className="text-xl font-bold text-slate-900">Alpha Global Trading Ltd.</div>
                   </div>
                   <div className="w-12 h-12 rounded-full bg-[#005085]/10 flex items-center justify-center text-[#005085]">
                     <Building2 className="w-6 h-6" />
                   </div>
                 </div>
                 
                 <dl className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-4 text-sm mb-6">
                   <div>
                     <dt className="text-slate-500 mb-1">Company Address</dt>
                     <dd className="font-medium text-slate-800">123 Supply Chain Blvd<br/>Suite 100<br/>San Francisco, CA 94105</dd>
                   </div>
                   <div>
                     <dt className="text-slate-500 mb-1">Business Type</dt>
                     <dd className="font-medium text-slate-800">Retail / Brand</dd>
                     
                     <dt className="text-slate-500 mb-1 mt-4">ODM Account ID</dt>
                     <dd className="font-mono text-[#005085] bg-blue-50 px-2 py-0.5 rounded inline-block">CUST-88214</dd>
                   </div>
                 </dl>
                 
                 <div className="pt-6 border-t border-slate-200">
                   <p className="text-xs text-slate-500 mb-3 flex items-center gap-1.5">
                     <AlertCircle className="w-4 h-4" /> Company details are verified by TÜV SÜD.
                   </p>
                   <button className="px-4 py-2 text-sm font-medium text-[#005085] bg-white border border-[#005085]/20 rounded-lg shadow-sm hover:bg-[#005085]/5 transition-colors">
                     Request Edit
                   </button>
                 </div>
               </div>
            </div>
          )}

          {activeMenu === 'admin_users' && role === 'Admin' && (
             <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-slate-800">User Management <span className="text-white bg-rose-500 px-2 py-0.5 rounded text-xs ml-2 align-middle">Admin</span></h2>
                </div>
                
                <table className="w-full text-sm text-left border border-slate-200 rounded-lg overflow-hidden">
                  <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-200">
                    <tr>
                      <th className="px-4 py-3">User</th>
                      <th className="px-4 py-3">Role</th>
                      <th className="px-4 py-3">Status</th>
                      <th className="px-4 py-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr className="hover:bg-slate-50">
                      <td className="px-4 py-3">
                        <div className="font-medium text-slate-800">Buyer One</div>
                        <div className="text-xs text-slate-500">buyer1@alpha.com</div>
                      </td>
                      <td className="px-4 py-3"><span className="bg-slate-100 px-2 py-1 rounded text-xs">User</span></td>
                      <td className="px-4 py-3"><span className="text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full text-xs font-medium">Active</span></td>
                      <td className="px-4 py-3 text-right">
                        <button className="text-blue-600 hover:underline mx-2">Edit Role</button>
                        <button className="text-red-600 hover:underline">Suspend</button>
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="px-4 py-3">
                         <div className="font-medium text-slate-800">Admin User</div>
                        <div className="text-xs text-slate-500">admin@platform.com</div>
                      </td>
                      <td className="px-4 py-3"><span className="bg-rose-100 text-rose-800 px-2 py-1 rounded text-xs font-semibold">Admin</span></td>
                      <td className="px-4 py-3"><span className="text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full text-xs font-medium">Active</span></td>
                      <td className="px-4 py-3 text-right">
                        <button className="text-slate-400 cursor-not-allowed mx-2" disabled>Edit Role</button>
                        <button className="text-slate-400 cursor-not-allowed" disabled>Suspend</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
             </div>
          )}
        </div>
      </div>
    </div>
  );
};
