import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, ChevronRight, ArrowRight, TrendingUp, CheckCircle, Clock, FileEdit, Send, FileSearch, FlaskConical, FileCheck, Award, Shield, ShieldAlert, Calendar } from 'lucide-react';
import { OrderStatus, statusColors } from '../components/ui/StatusBadge';
import { cn } from '../lib/utils';
import * as Popover from '@radix-ui/react-popover';
import { MOCK_ORDERS, OVERVIEW_NODES } from '../data/mockData';
import { ResponsiveContainer, ComposedChart, Line, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell } from 'recharts';

const renderCustomLegend = (props: any) => {
  const { payload } = props;
  return (
    <div className="flex flex-wrap gap-x-6 gap-y-2 mt-4 justify-center w-full text-[11px] text-slate-500 font-medium">
      {payload.map((entry: any, index: number) => (
        <div key={`item-${index}`} className="flex items-center gap-2">
           <svg width="14" height="4" viewBox="0 0 14 4">
             <line x1="0" y1="2" x2="14" y2="2" stroke={entry.color} strokeWidth={2} />
           </svg>
          <span>{entry.value}</span>
        </div>
      ))}
    </div>
  );
};

const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

const CHART_DATA = [
  { name: '2026/01', pass: 9, fail: 0, approve: 0, seeResult: 0 },
  { name: '2026/02', pass: 0, fail: 0, approve: 0, seeResult: 0 },
  { name: '2026/03', pass: 0, fail: 6, approve: 0, seeResult: 0 },
  { name: '2026/04', pass: 3, fail: 6, approve: 0, seeResult: 0 },
  { name: '2026/05', pass: 3, fail: 0, approve: 0, seeResult: 6 },
  { name: '2026/06', pass: 0, fail: 18, approve: 0, seeResult: 0 },
  { name: '2026/07', pass: 3, fail: 9, approve: 0, seeResult: 0 },
  { name: '2026/08', pass: 0, fail: 3, approve: 0, seeResult: 0 },
  { name: '2026/09', pass: 3, fail: 0, approve: 0, seeResult: 0 },
  { name: '2026/10', pass: 0, fail: 0, approve: 0, seeResult: 0 },
  { name: '2026/11', pass: 0, fail: 0, approve: 0, seeResult: 0 },
  { name: '2026/12', pass: 0, fail: 0, approve: 0, seeResult: 0 },
];

export const Dashboard = () => {
  const navigate = useNavigate();
  const [startYear, setStartYear] = React.useState(2026);
  const [startMonth, setStartMonth] = React.useState(0);   // Jan (0)
  const [endYear, setEndYear] = React.useState(2026);
  const [endMonth, setEndMonth] = React.useState(11);      // Dec (11)

  const totalPass = CHART_DATA.reduce((acc, curr) => acc + curr.pass, 0);
  const totalFail = CHART_DATA.reduce((acc, curr) => acc + curr.fail, 0);
  const totalApprove = CHART_DATA.reduce((acc, curr) => acc + curr.approve, 0);
  const totalSeeResult = CHART_DATA.reduce((acc, curr) => acc + curr.seeResult, 0);
  const totalReports = totalPass + totalFail + totalApprove + totalSeeResult;
  const passRate = totalReports > 0 ? Math.round((totalPass / totalReports) * 100) : 0;
  const failRate = totalReports > 0 ? Math.round((totalFail / totalReports) * 100) : 0;

  return (
    <div className="container mx-auto px-4 py-8 max-w-[90rem] animate-in fade-in duration-500">
      {/* 7-Node Status Cards */}
      <section className="w-full mb-8">
        <div className="flex items-center justify-between gap-2 lg:gap-3 overflow-x-auto pb-2 pt-1 snap-x hide-scrollbar">
          {OVERVIEW_NODES.map((node, index) => {
            const getStageConfig = (status: OrderStatus) => {
              switch (status) {
                case 'Drafting':
                case 'Submitted':
                  return { 
                    icon: status === 'Drafting' ? FileEdit : Send, 
                    bg: 'bg-orange-50/40', 
                    border: 'border-orange-200 hover:border-orange-300', 
                    iconColor: 'text-orange-600',
                    titleColor: 'text-orange-700',
                    numColor: 'text-orange-900' 
                  };
                case 'Application':
                case 'Accepted Testing':
                  return { 
                    icon: status === 'Application' ? FileSearch : FlaskConical, 
                    bg: 'bg-[#005085]/5', 
                    border: 'border-[#005085]/20 hover:border-[#005085]/30', 
                    iconColor: 'text-[#005085]',
                    titleColor: 'text-[#005085]',
                    numColor: 'text-[#003050]' 
                  };
                case 'Report Released':
                  return { 
                    icon: FileCheck, 
                    bg: 'bg-emerald-50/50', 
                    border: 'border-emerald-200 hover:border-emerald-300', 
                    iconColor: 'text-emerald-600',
                    titleColor: 'text-emerald-700',
                    numColor: 'text-emerald-900' 
                  };
                default:
                  return { 
                    icon: FileText, 
                    bg: 'bg-slate-50', 
                    border: 'border-slate-200', 
                    iconColor: 'text-slate-500', 
                    titleColor: 'text-slate-600', 
                    numColor: 'text-slate-800' 
                  };
              }
            };

            const stage = getStageConfig(node.status);
            const Icon = stage.icon;
            
            return (
              <React.Fragment key={node.status}>
                <div 
                  onClick={() => navigate(`/orders?status=${node.status}`)}
                  className={cn(
                    "flex flex-col p-2.5 lg:p-3 rounded-xl flex-1 min-w-[120px] lg:min-w-0 cursor-pointer transition-all border relative snap-center shadow-sm flex-shrink-0 lg:flex-shrink h-[76px] lg:h-[84px]",
                    stage.bg, stage.border
                  )}
                >
                  <div className="flex items-start lg:items-center gap-1.5 lg:gap-2 mb-auto shrink-0 overflow-hidden">
                    <Icon className={cn("w-3.5 h-3.5 lg:w-4 lg:h-4 shrink-0 mt-0.5 lg:mt-0", stage.iconColor)} />
                    <span 
                      className={cn("text-[8px] lg:text-[9px] xl:text-[10px] font-bold uppercase tracking-wide whitespace-nowrap truncate", stage.titleColor)}
                      title={node.status}
                    >
                      {node.status}
                    </span>
                  </div>
                  <div className="flex items-baseline w-full mt-auto">
                    <div className={cn("text-2xl lg:text-3xl font-bold font-sans tracking-tight leading-none ml-[30%]", stage.numColor)}>
                      {node.count}
                    </div>
                    <div className={cn("text-[10px] lg:text-[11px] lowercase font-medium opacity-90 ml-auto", stage.titleColor)}>
                      orders
                    </div>
                  </div>
                </div>
                {index < OVERVIEW_NODES.length - 1 && (
                  <div className="text-slate-400 flex-shrink-0 hidden md:block">
                    <ChevronRight className="w-4 h-4" />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </section>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-4">
        {/* Left: New Test Request & Live Tracking */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col h-[360px]">
          <div className="p-5 border-b border-slate-100 flex items-center justify-between shrink-0">
            <h2 className="text-lg font-semibold text-slate-800">Recent Applications</h2>
            <button 
              onClick={() => navigate('/orders/new')}
              className="px-4 py-2 bg-[#005085] hover:bg-[#00406b] text-white text-sm font-medium rounded-lg transition-colors flex items-center gap-2"
            >
              <span>+</span> NEW TEST REQUEST
            </button>
          </div>
          <div className="p-0 flex-1 overflow-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-slate-500 uppercase sticky top-0 bg-slate-50 z-10 shadow-sm">
                <tr>
                  <th className="px-5 py-3 font-medium">Job Status</th>
                  <th className="px-5 py-3 font-medium">TRF Number</th>
                  <th className="px-5 py-3 font-medium">Style No</th>
                  <th className="px-5 py-3 font-medium whitespace-nowrap">Update Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {[...MOCK_ORDERS].sort((a, b) => {
                  if (a.issueStep !== undefined && b.issueStep === undefined) return -1;
                  if (a.issueStep === undefined && b.issueStep !== undefined) return 1;
                  return new Date(b.created).getTime() - new Date(a.created).getTime();
                }).map((row, i) => (
                  <tr key={row.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-5 py-4">
                      {/* Condensed Timeline Bar */}
                      <div className="flex flex-col gap-1 w-full max-w-[200px]">
                        <div className="flex items-center gap-1">
                          {Array.from({ length: 5 }).map((_, stepIdx) => (
                            <Popover.Root key={stepIdx}>
                              <Popover.Trigger asChild>
                                <div 
                                  className={cn(
                                    "flex-1 h-2 rounded-full cursor-pointer transition-all relative",
                                    stepIdx === row.issueStep ? "bg-red-500 animate-pulse" :
                                    stepIdx < row.currentStep ? "bg-emerald-500" :
                                    stepIdx === row.currentStep ? "bg-[#005085]" :
                                    "bg-slate-200",
                                    stepIdx === 3 && row.currentStep >= 3 && stepIdx !== row.issueStep ? "ring-2 ring-offset-1 ring-[#005085]/30" : "", // Accepted Testing highlight
                                    stepIdx === row.issueStep ? "ring-2 ring-offset-1 ring-red-500/30" : ""
                                  )}
                                  title={OVERVIEW_NODES[stepIdx].status}
                                />
                              </Popover.Trigger>
                              {((stepIdx === 3 && row.currentStep >= 3) || stepIdx === row.issueStep) && (
                                <Popover.Portal>
                                  <Popover.Content 
                                    className={cn(
                                      "bg-white p-4 rounded-xl shadow-xl border w-96 text-sm z-50 fade-in zoom-in",
                                      stepIdx === row.issueStep ? "border-red-200" : "border-slate-200"
                                    )} 
                                    sideOffset={8}
                                  >
                                    {stepIdx === row.issueStep && (
                                      <div className={cn(stepIdx === 3 && row.currentStep >= 3 ? "mb-4 border-b border-slate-100 pb-4" : "")}>
                                        <h4 className="font-bold mb-2 flex items-center gap-2 text-red-600 text-[15px]">
                                          <ShieldAlert className="w-5 h-5" /> Action Required
                                        </h4>
                                        <p className="text-slate-600 mb-3 text-[13px] leading-relaxed">
                                          {row.issueMessage}
                                        </p>
                                        <button className="w-full text-center text-[13px] font-medium bg-red-50 text-red-700 py-2 rounded-lg border border-red-100 hover:bg-red-100 transition-colors">
                                          View Issue Details
                                        </button>
                                      </div>
                                    )}
                                    
                                    {stepIdx === 3 && row.currentStep >= 3 && row.subReports && (
                                      <div>
                                        <h4 className="font-bold mb-3 border-b pb-2 text-slate-800 text-[15px]">Sub-reports Status</h4>
                                        <div className="space-y-3">
                                          {row.subReports.map((sub, sIdx) => (
                                          <div key={sIdx} className="flex justify-between items-center text-slate-600 text-[13px] font-medium">
                                            <span className="truncate mr-2">{sub.name}</span>
                                            <div className="flex items-center gap-2 shrink-0">
                                              {row.issueStep === 3 && stepIdx === 3 && !sub.isPass && (
                                                <span className="whitespace-nowrap flex items-center gap-1 px-1.5 py-0.5 bg-red-50 text-red-600 rounded text-[10px] font-bold border border-red-100 uppercase tracking-wider">
                                                  <ShieldAlert className="w-3 h-3" /> Action Required
                                                </span>
                                              )}
                                              <span className={cn(
                                                "whitespace-nowrap px-2 py-0.5 rounded text-[11px] font-medium border",
                                                sub.isPass ? "bg-emerald-50 text-emerald-700 border-emerald-100" : "bg-blue-50 text-blue-700 border-blue-100"
                                              )}>{sub.statusText}</span>
                                            </div>
                                          </div>
                                          ))}
                                        </div>
                                      </div>
                                    )}
                                    <Popover.Arrow className="fill-white" />
                                  </Popover.Content>
                                </Popover.Portal>
                              )}
                            </Popover.Root>
                          ))}
                        </div>
                        <span className={cn(
                          "text-[10px] truncate font-medium",
                          row.issueStep !== undefined ? "text-red-600 font-semibold" : "text-slate-500"
                        )}>
                          {row.issueStep !== undefined ? `Action Required: ${OVERVIEW_NODES[row.issueStep].status}` : OVERVIEW_NODES[row.currentStep].status}
                        </span>
                      </div>
                    </td>
                    <td className="px-5 py-4 font-mono text-xs font-medium text-[#005085] cursor-pointer hover:underline" onClick={() => navigate(`/orders/${row.id}`)}>
                      {row.trfNo}
                    </td>
                    <td className="px-5 py-4 text-slate-600">
                      {row.style}
                    </td>
                    <td className="px-5 py-4 text-slate-500 whitespace-nowrap">
                      {row.lastModified || row.created}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right: Report Statistical Analysis */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col p-5 h-[360px]">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-slate-800">Order Statistical Analysis</h2>
            <div className="flex items-center gap-2">
              <Popover.Root>
                <Popover.Trigger asChild>
                  <div className="flex items-center border border-slate-200 rounded-md px-3 py-1.5 bg-slate-50 text-slate-600 text-sm cursor-pointer hover:bg-slate-100 hover:border-slate-300 transition-all select-none">
                    <span>{MONTHS[startMonth]} {startYear}</span>
                    <Calendar className="w-4 h-4 ml-2 text-slate-400" />
                  </div>
                </Popover.Trigger>
                <Popover.Portal>
                  <Popover.Content className="bg-white p-3 rounded-xl shadow-xl border border-slate-200 w-64 z-50 fade-in zoom-in" align="center" sideOffset={6}>
                    {/* Year selector */}
                    <div className="flex items-center justify-between mb-3 px-1">
                      <div
                        onClick={() => setStartYear(startYear - 1)}
                        className="w-8 h-8 flex items-center justify-center rounded-lg cursor-pointer hover:bg-slate-100 text-slate-600 text-lg font-bold transition-colors select-none"
                      >‹</div>
                      <span className="text-sm font-bold text-slate-800">{startYear}</span>
                      <div
                        onClick={() => setStartYear(startYear + 1)}
                        className="w-8 h-8 flex items-center justify-center rounded-lg cursor-pointer hover:bg-slate-100 text-slate-600 text-lg font-bold transition-colors select-none"
                      >›</div>
                    </div>
                    <div className="grid grid-cols-3 gap-1">
                      {MONTHS.map((m, i) => (
                        <div
                          key={m}
                          onClick={() => { setStartMonth(i); }}
                          className={cn(
                            "text-center text-sm py-2 px-1 rounded-lg cursor-pointer transition-all font-medium",
                            i === startMonth
                              ? "bg-[#005085] text-white shadow"
                              : "text-slate-600 hover:bg-slate-100"
                          )}
                        >
                          {m}
                        </div>
                      ))}
                    </div>
                    <Popover.Arrow className="fill-white" />
                  </Popover.Content>
                </Popover.Portal>
              </Popover.Root>

              <span className="text-slate-400">-</span>

              <Popover.Root>
                <Popover.Trigger asChild>
                  <div className="flex items-center border border-slate-200 rounded-md px-3 py-1.5 bg-slate-50 text-slate-600 text-sm cursor-pointer hover:bg-slate-100 hover:border-slate-300 transition-all select-none">
                    <span>{MONTHS[endMonth]} {endYear}</span>
                    <Calendar className="w-4 h-4 ml-2 text-slate-400" />
                  </div>
                </Popover.Trigger>
                <Popover.Portal>
                  <Popover.Content className="bg-white p-3 rounded-xl shadow-xl border border-slate-200 w-64 z-50 fade-in zoom-in" align="center" sideOffset={6}>
                    {/* Year selector */}
                    <div className="flex items-center justify-between mb-3 px-1">
                      <div
                        onClick={() => setEndYear(endYear - 1)}
                        className="w-8 h-8 flex items-center justify-center rounded-lg cursor-pointer hover:bg-slate-100 text-slate-600 text-lg font-bold transition-colors select-none"
                      >‹</div>
                      <span className="text-sm font-bold text-slate-800">{endYear}</span>
                      <div
                        onClick={() => setEndYear(endYear + 1)}
                        className="w-8 h-8 flex items-center justify-center rounded-lg cursor-pointer hover:bg-slate-100 text-slate-600 text-lg font-bold transition-colors select-none"
                      >›</div>
                    </div>
                    <div className="grid grid-cols-3 gap-1">
                      {MONTHS.map((m, i) => (
                        <div
                          key={m}
                          onClick={() => { setEndMonth(i); }}
                          className={cn(
                            "text-center text-sm py-2 px-1 rounded-lg cursor-pointer transition-all font-medium",
                            i === endMonth
                              ? "bg-[#005085] text-white shadow"
                              : "text-slate-600 hover:bg-slate-100"
                          )}
                        >
                          {m}
                        </div>
                      ))}
                    </div>
                    <Popover.Arrow className="fill-white" />
                  </Popover.Content>
                </Popover.Portal>
              </Popover.Root>
            </div>
          </div>
          
          <div className="flex gap-6 flex-1 h-full items-center">
            {/* KPIs */}
            <div className="flex flex-col gap-4 min-w-[150px] shrink-0">
              <div>
                <div className="text-3xl font-bold text-[#005085]">{totalReports}</div>
                <div className="text-xs text-slate-500 font-medium">Total Reports</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-[#005085]">{totalPass}</div>
                <div className="text-xs text-slate-500 font-medium">Reports Passed</div>
              </div>
              <div className="mt-auto pt-4 border-t border-slate-100 flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-slate-500">Pass Rate</span>
                  <span className="text-sm font-bold text-emerald-600 flex items-center">{passRate}% <ArrowRight className="w-3 h-3 ml-0.5 -rotate-45" /></span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-slate-500">Fail Rate</span>
                  <span className="text-sm font-bold text-rose-600 flex items-center">{failRate}% <ArrowRight className="w-3 h-3 ml-0.5 -rotate-45" /></span>
                </div>
              </div>
            </div>

            {/* Recharts Area */}
            <div className="flex-1 min-w-0 h-full -ml-4 -mt-2">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={CHART_DATA} margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
                  <defs>
                    <linearGradient id="colorPass" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.15}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorFail" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.15}/>
                      <stop offset="95%" stopColor="#f43f5e" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#94a3b8', fontSize: 11 }}
                    dy={10}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#94a3b8', fontSize: 11 }}
                  />
                  <Tooltip 
                    contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                  <Legend 
                    verticalAlign="top" 
                    height={36} 
                    content={renderCustomLegend}
                  />
                  <Area type="monotone" dataKey="pass" name="Pass" stroke="#10b981" strokeWidth={2} fill="url(#colorPass)" fillOpacity={1} dot={false} activeDot={{ r: 4 }} />
                  <Area type="monotone" dataKey="fail" name="Fail" stroke="#f43f5e" strokeWidth={2} fill="url(#colorFail)" fillOpacity={1} dot={false} activeDot={{ r: 4 }} />
                  <Line type="monotone" dataKey="approve" name="To Be Approve" stroke="#3b82f6" strokeDasharray="5 5" strokeWidth={2} dot={false} activeDot={{ r: 4 }} />
                  <Line type="monotone" dataKey="seeResult" name="See Result" stroke="#64748b" strokeDasharray="5 5" strokeWidth={2} dot={false} activeDot={{ r: 4 }} />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom 3 Columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Resource Hub */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 hover:shadow-md transition-shadow cursor-pointer group">
          <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <FileText className="w-5 h-5" />
          </div>
          <h3 className="font-semibold text-slate-800 mb-2">RESOURCE HUB</h3>
          <p className="text-sm text-slate-500 mb-4 h-10 line-clamp-2">Access Standards, Testing Specifications, and Compliance Documents.</p>
          <div className="text-sm font-medium text-[#005085] flex items-center gap-1 group-hover:gap-2 transition-all">
            Browse Knowledge Base <ArrowRight className="w-4 h-4" />
          </div>
        </div>

        {/* New Service */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 hover:shadow-md transition-shadow cursor-pointer group">
           <div className="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
          </div>
          <h3 className="font-semibold text-slate-800 mb-2 flex items-center gap-2">
            NEW SERVICE
            <span className="text-[9px] bg-red-100 text-red-600 px-1.5 py-0.5 rounded-full uppercase tracking-wider font-bold animate-pulse">Hot</span>
          </h3>
          <p className="text-sm text-slate-500 mb-4 h-10 line-clamp-2">
            Explore our newly launched PFAS testing and Sustainable Textile programs.
          </p>
          <div className="text-sm font-medium text-[#005085] flex items-center gap-1 group-hover:gap-2 transition-all">
            Learn More <ArrowRight className="w-4 h-4" />
          </div>
        </div>

        {/* News */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 hover:shadow-md transition-shadow cursor-pointer group">
          <div className="w-10 h-10 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <TrendingUp className="w-5 h-5" />
          </div>
          <h3 className="font-semibold text-slate-800 mb-2">NEWS</h3>
          <div className="space-y-3 mb-4 h-10">
            <div className="text-sm text-slate-600 truncate hover:text-[#005085] transition-colors">• EU REACH Annex XVII Updates 2026</div>
            <div className="text-sm text-slate-600 truncate hover:text-[#005085] transition-colors">• New PFAS Regulations in US Market</div>
          </div>
          <div className="text-sm font-medium text-[#005085] flex items-center gap-1 group-hover:gap-2 transition-all mt-2">
            More News <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </div>
    </div>
  );
};
