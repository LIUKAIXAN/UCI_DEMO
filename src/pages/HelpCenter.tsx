import React, { useState } from 'react';
import { Search, Book, HelpCircle, MessageSquare, Bell, Download, FileText, ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '../lib/utils';
import * as Tabs from '@radix-ui/react-tabs';

const FAQ_DATA = [
  { q: "How do I create a new Test Request?", a: "Go to 'My Orders' and click the '+ NEW TEST REQUEST' button. Follow the wizard to fill in product details and select your test packages." },
  { q: "How can I download my final report?", a: "Navigate to the 'Reports' section. You can use the search or filters to find your report, then click the download icon in the Actions column." }
];

export const HelpCenter = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl animate-in fade-in duration-500">
      <h1 className="text-2xl font-bold text-slate-900 mb-8">Help Center</h1>

      <Tabs.Root defaultValue="manual" className="flex flex-col">
        <Tabs.List className="flex border-b border-slate-200 mb-8">
          <Tabs.Trigger value="manual" className="px-6 py-3 font-medium text-sm text-slate-600 hover:text-slate-900 data-[state=active]:text-[#005085] data-[state=active]:border-b-2 data-[state=active]:border-[#005085] bg-transparent outline-none transition-colors">
            User Manual
          </Tabs.Trigger>
          <Tabs.Trigger value="faq" className="px-6 py-3 font-medium text-sm text-slate-600 hover:text-slate-900 data-[state=active]:text-[#005085] data-[state=active]:border-b-2 data-[state=active]:border-[#005085] bg-transparent outline-none transition-colors">
            FAQ
          </Tabs.Trigger>
          <Tabs.Trigger value="support" className="px-6 py-3 font-medium text-sm text-slate-600 hover:text-slate-900 data-[state=active]:text-[#005085] data-[state=active]:border-b-2 data-[state=active]:border-[#005085] bg-transparent outline-none transition-colors">
            Contact Support
          </Tabs.Trigger>
          <Tabs.Trigger value="announcements" className="px-6 py-3 font-medium text-sm text-slate-600 hover:text-slate-900 data-[state=active]:text-[#005085] data-[state=active]:border-b-2 data-[state=active]:border-[#005085] bg-transparent outline-none transition-colors">
            Announcements
          </Tabs.Trigger>
        </Tabs.List>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden min-h-[500px]">
          
          <Tabs.Content value="manual" className="p-0 flex h-[600px] outline-none">
            <div className="w-64 border-r border-slate-100 bg-slate-50/50 p-4 overflow-y-auto hidden md:block">
               <div className="font-semibold text-slate-800 mb-4 text-sm mt-2">Getting Started</div>
               <div className="space-y-2 text-sm">
                 <div className="text-[#005085] font-medium bg-blue-50 px-3 py-1.5 rounded cursor-pointer">Dashboard Overview</div>
                 <div className="text-slate-600 hover:bg-slate-100 px-3 py-1.5 rounded cursor-pointer transition-colors">Navigation Guide</div>
               </div>
               <div className="font-semibold text-slate-800 mb-4 text-sm mt-6">Order Management</div>
               <div className="space-y-2 text-sm">
                 <div className="text-slate-600 hover:bg-slate-100 px-3 py-1.5 rounded cursor-pointer transition-colors">Create TRF</div>
                 <div className="text-slate-600 hover:bg-slate-100 px-3 py-1.5 rounded cursor-pointer transition-colors">Track Order</div>
               </div>
            </div>
            <div className="flex-1 p-8 overflow-y-auto relative">
               <div className="absolute top-8 right-8">
                 <button className="flex items-center gap-2 text-[#005085] text-sm font-medium bg-blue-50 hover:bg-blue-100 px-4 py-2 rounded-lg transition-colors">
                   <Download className="w-4 h-4" /> Download PDF Manual
                 </button>
               </div>
               <h2 className="text-2xl font-bold text-slate-900 mb-6 max-w-2xl">Dashboard Overview</h2>
               <div className="prose prose-slate max-w-3xl text-sm leading-relaxed">
                 <p className="mb-4">The ODM Dashboard is your central hub for managing testing and certification requests. It provides a quick glance at your active pipeline, recent applications, and key analytics.</p>
                 <h3 className="text-lg font-semibold mt-8 mb-4">The 5-Node View</h3>
                 <p className="mb-4">At the top of your dashboard, you will see the 5 status nodes representing the full lifecycle of an order: from Drafting to Report Released. Clicking any of these nodes will take you to your order list, pre-filtered for that specific status.</p>
                 <div className="bg-slate-100 h-48 w-full rounded-xl border border-slate-200 my-6 flex items-center justify-center text-slate-400">
                   [ Image Placeholder: Dashboard Screenshot ]
                 </div>
               </div>
            </div>
          </Tabs.Content>

          <Tabs.Content value="faq" className="p-8 outline-none">
            <div className="max-w-2xl mx-auto">
              <div className="relative mb-8">
                <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Search frequently asked questions..." 
                  className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#005085]/20 focus:border-[#005085] text-sm"
                />
              </div>

              <div className="flex flex-wrap gap-2 mb-8">
                {['All', 'Registration', 'Orders & TRF', 'Reports', 'Account'].map((tag, i) => (
                  <button key={tag} className={cn("px-4 py-1.5 rounded-full text-xs font-medium transition-colors", i===0 ? "bg-slate-800 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200")}>
                    {tag}
                  </button>
                ))}
              </div>

              <div className="space-y-4">
                {FAQ_DATA.map((faq, idx) => (
                  <div key={idx} className="border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                    <button 
                      onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                      className="w-full px-6 py-4 flex items-center justify-between text-left bg-white hover:bg-slate-50 transition-colors"
                    >
                      <span className="font-medium text-slate-800 pr-8">{faq.q}</span>
                      {openFaq === idx ? <ChevronUp className="w-5 h-5 text-slate-500 flex-shrink-0" /> : <ChevronDown className="w-5 h-5 text-slate-500 flex-shrink-0" />}
                    </button>
                    {openFaq === idx && (
                      <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 text-slate-600 text-sm leading-relaxed">
                        {faq.a}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </Tabs.Content>

          <Tabs.Content value="support" className="p-8 outline-none">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-xl font-bold text-slate-900 mb-6">Contact Support</h2>
              <form className="space-y-5" onSubmit={e => e.preventDefault()}>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Issue Type</label>
                  <select className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#005085]/20 focus:border-[#005085] bg-white text-sm">
                    <option>Technical Issue with Portal</option>
                    <option>Question about an Order</option>
                    <option>Request Company Info Edit</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Subject</label>
                  <input type="text" className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#005085]/20 focus:border-[#005085] text-sm" placeholder="Brief description of the issue" />
                </div>
                <div>
                   <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
                   <textarea rows={5} className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#005085]/20 focus:border-[#005085] resize-none text-sm" placeholder="Please provide as much detail as possible..." />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Attachments (Optional)</label>
                  <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer">
                     <p className="text-sm text-slate-500">Drag and drop files here, or click to browse</p>
                  </div>
                </div>
                <div className="pt-4 flex justify-end">
                  <button className="px-6 py-3 bg-[#005085] hover:bg-[#00406b] text-white font-medium rounded-xl shadow-sm transition-colors flex items-center gap-2">
                    Submit Request
                  </button>
                </div>
              </form>
            </div>
          </Tabs.Content>

          <Tabs.Content value="announcements" className="p-8 outline-none">
             <div className="max-w-3xl mx-auto space-y-6">
               <div className="bg-white border border-slate-200 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                 <div className="flex items-center gap-3 mb-3">
                   <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2.5 py-1 rounded-full">NEW</span>
                   <span className="text-slate-500 text-sm">May 5, 2026</span>
                 </div>
                 <h3 className="text-lg font-bold text-slate-900 mb-2">UCI Portal Version 2.0 Released</h3>
                 <p className="text-slate-600 text-sm">We are excited to announce the completely redesigned Universal Customer Interface. This update brings a much requested streamlined order tracking timeline and better batch export features...</p>
                 <button className="text-[#005085] mt-4 text-sm font-medium hover:underline">Read Full Details</button>
               </div>

                <div className="bg-white border border-slate-200 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                 <div className="flex items-center gap-3 mb-3">
                   <span className="bg-amber-100 text-amber-800 text-xs font-bold px-2.5 py-1 rounded-full">MAINTENANCE</span>
                   <span className="text-slate-500 text-sm">April 20, 2026</span>
                 </div>
                 <h3 className="text-lg font-bold text-slate-900 mb-2">Scheduled Weekend Maintenance</h3>
                 <p className="text-slate-600 text-sm">The platform will undergo scheduled maintenance on April 25 from 02:00 UTC to 04:00 UTC. During this window, order submissions will be paused.</p>
               </div>
             </div>
          </Tabs.Content>
          
        </div>
      </Tabs.Root>
    </div>
  );
};
