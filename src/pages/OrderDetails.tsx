import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Printer, FileText, Send, User, MessageCircle, Clock, CheckCircle, X, Package, Briefcase } from 'lucide-react';
import { StatusBadge, OrderStatus, statusColors } from '../components/ui/StatusBadge';
import { cn } from '../lib/utils';
import * as Popover from '@radix-ui/react-popover';
import { MOCK_ORDERS } from '../data/mockData';

const TIMELINE_NODES = [
  { status: 'Drafting', label: 'Drafting\n草拟中' },
  { status: 'Submitted', label: 'Submitted\n已提交' },
  { status: 'Application', label: 'Application\n申请中' },
  { status: 'Accepted Testing', label: 'Accepted Testing\n测试中' },
  { status: 'Report Released', label: 'Report Released\n报告签发' },
];

export const OrderDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'logs' | 'notes' | 'chat'>('logs');
  const [showLogisticsModal, setShowLogisticsModal] = useState(false);
  const [logisticsSubmitted, setLogisticsSubmitted] = useState(false);

  const order = MOCK_ORDERS.find(o => o.id === id) || MOCK_ORDERS[0];
  const currentStepIndex = order.currentStep; 

  const visibleNodes = TIMELINE_NODES;

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl animate-in fade-in duration-500">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="text-slate-500 hover:text-slate-900 transition-colors">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-slate-900">{order.orderNo}</h1>
              <StatusBadge status={TIMELINE_NODES[currentStepIndex].status as OrderStatus} />
            </div>
            <div className="text-sm text-slate-500 mt-1">TRF: {order.trfNo}</div>
          </div>
        </div>
        <div className="flex gap-2">
           <button className="px-4 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-lg shadow-sm hover:bg-slate-50 flex items-center gap-2 transition-colors">
            <Printer className="w-4 h-4" /> Print TRF
          </button>
          {(currentStepIndex as number) === 2 && !logisticsSubmitted && (
            <button onClick={() => setShowLogisticsModal(true)} className="px-4 py-2 text-sm font-medium text-white bg-[#005085] rounded-lg shadow-sm hover:bg-[#00406b] flex items-center gap-2 transition-colors">
              <Send className="w-4 h-4" /> Submit Logistics Info
            </button>
          )}
        </div>
      </div>

      {/* Timeline Card */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 mb-8 overflow-hidden">
        <div className="flex items-center justify-between relative max-w-4xl mx-auto">
          {/* Background Track */}
          <div className="absolute top-5 left-8 right-8 h-1 bg-slate-100 z-0" />
          
          {/* Active Track */}
          <div 
            className="absolute top-5 left-8 h-1 bg-emerald-500 z-0 transition-all duration-1000"
            style={{ width: `calc(${(currentStepIndex) / (visibleNodes.length - 1)} * (100% - 4rem))` }}
          />

          {visibleNodes.map((node, index) => {
            const isCompleted = index < currentStepIndex;
            const isCurrent = index === currentStepIndex;
            const isPending = index > currentStepIndex;
            const isSubreportsClickable = index === 3 && currentStepIndex >= 3 && order.subReports;
            const isDraftNodeClickable = node.status === 'Drafting' && order.status === 'Drafting';
            const isClickable = isSubreportsClickable || isDraftNodeClickable;

            const handleNodeClick = () => {
              if (isDraftNodeClickable) navigate('/orders/new');
            };

            return (
              <div key={node.status} className="relative z-10 flex flex-col items-center w-24">
                <Popover.Root>
                  <Popover.Trigger asChild>
                    <button 
                      onClick={handleNodeClick}
                      className={cn(
                        "w-10 h-10 rounded-full flex items-center justify-center border-4 bg-white transition-all",
                        isCompleted ? "border-emerald-500 text-emerald-500" :
                        isCurrent ? "border-[#005085] ring-4 ring-[#005085]/20" :
                        "border-slate-200 text-slate-300",
                        isClickable ? "cursor-pointer hover:scale-110" : "cursor-default"
                      )}
                    >
                      {isCompleted ? <CheckCircle className="w-5 h-5" /> : 
                       isCurrent ? <div className="w-3 h-3 bg-[#005085] rounded-full animate-pulse" /> : 
                       <div className="w-2 h-2 bg-slate-200 rounded-full" />}
                    </button>
                  </Popover.Trigger>
                  {isClickable && order.subReports && (
                    <Popover.Portal>
                      <Popover.Content className="bg-white p-4 rounded-xl shadow-xl border border-slate-200 w-80 text-sm z-50 fade-in zoom-in" sideOffset={8}>
                        <h4 className="font-semibold mb-3 border-b pb-2">Sub-reports Status</h4>
                        <div className="space-y-3">
                          {order.subReports.map(sub => (
                            <div key={sub.name} className="flex justify-between items-center">
                              <span className="text-slate-600">{sub.name}</span>
                              <span className={cn(
                                "text-xs px-2 py-0.5 rounded font-medium",
                                sub.isPass ? "text-emerald-600 bg-emerald-50" : "text-blue-600 bg-blue-50"
                              )}>{sub.statusText}</span>
                            </div>
                          ))}
                        </div>
                        <Popover.Arrow className="fill-white" />
                      </Popover.Content>
                    </Popover.Portal>
                  )}
                </Popover.Root>

                <div className="text-center mt-3">
                  <div className={cn(
                    "text-xs font-semibold whitespace-pre-line leading-tight",
                    isCurrent ? "text-[#005085]" : isCompleted ? "text-slate-700" : "text-slate-400"
                  )}>
                    {node.label}
                  </div>
                  {isCompleted && (
                    <div className="text-[10px] text-slate-400 mt-1">05/08 14:00</div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Info & Tabs */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left: Info Card */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 sticky top-24">
            <h3 className="font-semibold text-slate-800 mb-4 border-b border-slate-100 pb-2">Order Information</h3>
            <dl className="space-y-4 text-sm">
              <div>
                <dt className="text-slate-500 text-xs uppercase">Product Type</dt>
                <dd className="font-medium text-slate-900 mt-0.5">{order.type}</dd>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <dt className="text-slate-500 text-xs uppercase">Applicant / Brand</dt>
                  <dd className="font-medium text-slate-900 mt-0.5">{order.applicant} / {order.brand}</dd>
                </div>
                <div>
                  <dt className="text-slate-500 text-xs uppercase">Style No</dt>
                  <dd className="font-medium text-slate-900 mt-0.5">{order.style}</dd>
                </div>
              </div>
              <div className="pt-4 border-t border-slate-100">
                <dt className="text-slate-500 text-xs uppercase">Test Package</dt>
                <dd className="font-medium text-slate-900 mt-0.5">{order.testPackage}</dd>
              </div>
            </dl>
          </div>
        </div>

        {/* Right: Tabs */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col h-[500px]">
            <div className="flex border-b border-slate-200">
              <button 
                onClick={() => setActiveTab('logs')}
                className={cn("flex-1 py-3 text-sm font-medium transition-colors border-b-2", activeTab === 'logs' ? "border-[#005085] text-[#005085] bg-[#005085]/5" : "border-transparent text-slate-600 hover:text-slate-900 bg-slate-50")}
              >
                Operation Logs
              </button>
              <button 
                onClick={() => setActiveTab('notes')}
                className={cn("flex-1 py-3 text-sm font-medium transition-colors border-b-2", activeTab === 'notes' ? "border-[#005085] text-[#005085] bg-[#005085]/5" : "border-transparent text-slate-600 hover:text-slate-900 bg-slate-50")}
              >
                Private Notes
              </button>
              <button 
                onClick={() => setActiveTab('chat')}
                className={cn("flex-1 py-3 text-sm font-medium transition-colors border-b-2", activeTab === 'chat' ? "border-[#005085] text-[#005085] bg-[#005085]/5" : "border-transparent text-slate-600 hover:text-slate-900 bg-slate-50")}
              >
                Communications
              </button>
            </div>

            <div className="flex-1 overflow-auto p-6 bg-slate-50/50">
              
              {activeTab === 'logs' && (
                <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-slate-200 before:via-slate-200 before:to-transparent">
                   
                   {/* Reversed order list so newest is on top */}

                   {currentStepIndex >= 4 && (
                     <>
                       <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                         <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 text-emerald-500 z-10">
                            <CheckCircle className="w-5 h-5" />
                         </div>
                         <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-4 rounded-xl shadow-sm border border-slate-200">
                           <div className="flex items-center justify-between mb-1">
                              <span className="font-bold text-slate-800 text-sm">Report Released</span>
                              <span className="text-xs font-medium text-slate-500">System</span>
                           </div>
                           <time className="block text-xs text-slate-400">May 15, 2026 16:45 (Virtual)</time>
                         </div>
                       </div>
                       <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                         <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 text-emerald-500 z-10">
                            <FileText className="w-5 h-5" />
                         </div>
                         <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-4 rounded-xl shadow-sm border border-slate-200">
                           <div className="flex items-center justify-between mb-1">
                              <span className="font-bold text-slate-800 text-sm">Test Finished & Report Generated</span>
                              <span className="text-xs font-medium text-slate-500">Personnel</span>
                           </div>
                           <time className="block text-xs text-slate-400">May 14, 2026 14:00 (Virtual)</time>
                         </div>
                       </div>
                     </>
                   )}

                   {currentStepIndex >= 3 && (
                     <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                       <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 text-blue-500 z-10">
                          <CheckCircle className="w-5 h-5" />
                       </div>
                       <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-4 rounded-xl shadow-sm border border-slate-200">
                         <div className="flex items-center justify-between mb-1">
                            <span className="font-bold text-slate-800 text-sm">Test Started</span>
                            <span className="text-xs font-medium text-slate-500">Personnel</span>
                         </div>
                         <time className="block text-xs text-slate-400">May 12, 2026 09:30 (Virtual)</time>
                       </div>
                     </div>
                   )}

                   {(currentStepIndex >= 3 || logisticsSubmitted) && (
                     <>
                        <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                          <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 text-emerald-500 z-10">
                             <CheckCircle className="w-5 h-5" />
                          </div>
                          <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-4 rounded-xl shadow-sm border border-slate-200">
                            <div className="flex items-center justify-between mb-1">
                               <span className="font-bold text-slate-800 text-sm">Sample Delivered to Destination</span>
                               <span className="text-xs font-medium text-slate-500">Personnel</span>
                            </div>
                            <time className="block text-xs text-slate-400">May 10, 2026 10:30 (Virtual)</time>
                          </div>
                        </div>
                        <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                          <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 text-blue-500 z-10">
                             <Package className="w-5 h-5" />
                          </div>
                          <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-4 rounded-xl shadow-sm border border-slate-200">
                            <div className="flex items-center justify-between mb-2">
                               <span className="font-bold text-slate-800 text-sm">Logistics info submitted</span>
                               <span className="text-xs font-medium text-slate-500">Buyer1 (You)</span>
                            </div>
                            <button onClick={() => setShowLogisticsModal(true)} className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs rounded shadow-sm font-medium transition-colors">
                              View Logistics Info
                            </button>
                          </div>
                        </div>
                     </>
                   )}

                   {currentStepIndex === 2 && !logisticsSubmitted && (
                     <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                       <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 text-amber-500 z-10">
                          <Package className="w-5 h-5" />
                       </div>
                       <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-4 rounded-xl shadow-sm border border-amber-200 bg-amber-50/50">
                         <div className="flex items-center justify-between mb-2">
                            <span className="font-bold text-amber-800 text-sm">Application approved, please fill in the shipping logistics information</span>
                            <span className="text-xs font-medium text-amber-600">Action Required</span>
                         </div>
                         <button onClick={() => setShowLogisticsModal(true)} className="px-3 py-1.5 bg-[#005085] hover:bg-[#00406b] text-white text-xs rounded shadow-sm font-medium transition-colors">
                           Enter Logistics Info
                         </button>
                       </div>
                     </div>
                   )}

                   {currentStepIndex >= 2 && (
                     <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                       <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 text-blue-500 z-10">
                          <Briefcase className="w-5 h-5" />
                       </div>
                       <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-4 rounded-xl shadow-sm border border-slate-200">
                         <div className="flex items-center justify-between mb-1">
                            <span className="font-bold text-slate-800 text-sm">Application Received</span>
                            <span className="text-xs font-medium text-slate-500">Personnel</span>
                         </div>
                         <time className="block text-xs text-slate-400">May 9, 2026 10:15 (Virtual)</time>
                       </div>
                     </div>
                   )}

                   {currentStepIndex >= 1 && (
                     <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                       <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 text-blue-500 z-10">
                          <User className="w-5 h-5" />
                       </div>
                       <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-4 rounded-xl shadow-sm border border-slate-200">
                         <div className="flex items-center justify-between mb-1">
                            <span className="font-bold text-slate-800 text-sm">Order Submitted</span>
                            <span className="text-xs font-medium text-slate-500">Buyer1 (You)</span>
                         </div>
                         <time className="block text-xs text-slate-400">May 8, 2026 09:12</time>
                       </div>
                     </div>
                   )}

                   {currentStepIndex >= 0 && (
                     <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                       <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 text-slate-400 z-10">
                          <FileText className="w-5 h-5" />
                       </div>
                       <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-4 rounded-xl shadow-sm border border-slate-200">
                         <div className="flex items-center justify-between mb-1">
                            <span className="font-bold text-slate-800 text-sm">Order Created (Drafted)</span>
                            <span className="text-xs font-medium text-slate-500">Buyer1 (You)</span>
                         </div>
                         <time className="block text-xs text-slate-400">May 7, 2026 15:30</time>
                       </div>
                     </div>
                   )}

                </div>
              )}

              {activeTab === 'notes' && (
                <div className="flex flex-col h-full fade-in">
                  <div className="flex-1 overflow-auto space-y-4 mb-4">
                    <div className="bg-amber-50 border border-amber-100 rounded-lg p-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-xs font-semibold text-amber-800 flex items-center gap-1"><Clock className="w-3 h-3" /> May 6, 2026</span>
                        <button className="text-xs text-red-500 hover:underline">Delete</button>
                      </div>
                      <p className="text-sm text-slate-700">Remember to send the secondary sample batch via DHL tomorrow.</p>
                    </div>
                  </div>
                  <div className="mt-auto">
                    <textarea 
                      className="w-full border border-slate-200 rounded-lg p-3 text-sm focus:ring-2 focus:ring-[#005085]/20 focus:border-[#005085] outline-none resize-none mb-2"
                      rows={3} placeholder="Add private remark (only visible to you)..."
                    />
                    <div className="flex justify-end">
                      <button className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-medium rounded-lg transition-colors">Add Note</button>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'chat' && (
                <div className="flex flex-col h-full fade-in">
                  <div className="flex-1 overflow-auto space-y-4 p-2">
                     <div className="flex items-start gap-4 flex-row-reverse">
                       <div className="w-8 h-8 rounded-full bg-[#005085] flex items-center justify-center text-white text-xs">You</div>
                       <div className="bg-[#005085] text-white p-3 rounded-2xl rounded-tr-sm text-sm shadow-sm max-w-[80%]">
                         Has the sample arrived at the Shenzhen Lab yet?
                         <div className="text-[10px] text-blue-200 mt-1 text-right">09:41 AM</div>
                       </div>
                     </div>
                     <div className="flex items-start gap-4">
                       <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 text-xs font-bold">CS</div>
                       <div className="bg-white border border-slate-200 p-3 rounded-2xl rounded-tl-sm text-sm shadow-sm max-w-[80%]">
                         Yes, we received it this morning. It is currently being unpacked and will enter the testing queue shortly.
                         <div className="text-[10px] text-slate-400 mt-1">10:05 AM</div>
                       </div>
                     </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-slate-200 relative">
                     <input
                       type="text" placeholder="Type a message to the team..."
                       className="w-full bg-white border border-slate-200 rounded-full pl-4 pr-12 py-3 text-sm focus:outline-none focus:border-[#005085] focus:ring-1 focus:ring-[#005085]"
                     />
                     <button className="absolute right-3 top-1/2 -translate-y-1/2 mt-2 w-8 h-8 bg-[#005085] rounded-full flex items-center justify-center text-white hover:bg-[#00406b] transition-colors">
                       <Send className="w-4 h-4 ml-0.5" />
                     </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Logistics Modal */}
      {showLogisticsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full flex flex-col max-h-[90vh]">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
              <h3 className="font-bold text-lg text-slate-800">Submit Logistics Info</h3>
              <button onClick={() => setShowLogisticsModal(false)} className="text-slate-400 hover:text-slate-600 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto space-y-5">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Logistics Company Name</label>
                <input 
                  type="text" 
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#005085]/30 focus:border-[#005085]"
                  placeholder="e.g. SF Express, DHL"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Tracking Number</label>
                <input 
                  type="text" 
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#005085]/30 focus:border-[#005085]"
                  placeholder="e.g. YT123456789"
                />
              </div>

              <div className="pt-2">
                <button className="flex items-center gap-2 text-sm font-medium text-[#005085] hover:underline">
                  <Printer className="w-4 h-4" /> 
                  Print TRF for your sample package
                </button>
              </div>

              <div className="bg-slate-50 p-4 rounded-lg text-sm text-slate-600 space-y-3 mt-4">
                <p>Please make sure to indicate on the proforma invoice that the sample has no commercial value, as it is only for testing purposes.</p>
                <p>Please partially damage the sample by cutting or other methods before sending it to the laboratory.</p>
              </div>
            </div>

            <div className="p-6 border-t border-slate-100 bg-slate-50/50 rounded-b-xl flex justify-end gap-3">
              <button 
                onClick={() => setShowLogisticsModal(false)}
                className="px-4 py-2 border border-slate-300 rounded-lg text-sm font-medium text-slate-700 bg-white hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={() => {
                  setLogisticsSubmitted(true);
                  setShowLogisticsModal(false);
                }}
                className="px-4 py-2 bg-[#005085] hover:bg-[#00406b] rounded-lg text-sm font-medium text-white shadow-sm transition-colors"
              >
                Save and Print TRF to send to the laboratory
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
