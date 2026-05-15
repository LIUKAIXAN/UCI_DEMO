import React from 'react';
import { Search, Filter, Download, Eye, CheckCircle2, XCircle, AlertCircle, Clock, FileText, Receipt } from 'lucide-react';
import { cn } from '../lib/utils';
import * as Popover from '@radix-ui/react-popover';

const MOCK_REPORTS = [
  { id: 'R001', order: 'ORD-2026-006', type: 'Apparel', result: 'Pass', date: '2026-05-15', reportName: 'Chem-T01 (REACH)' },
  { id: 'R002', order: 'ORD-2026-006', type: 'Apparel', result: 'Pass', date: '2026-05-14', reportName: 'Phys-T02 (Tensile)' },
  { id: 'R003', order: 'ORD-2026-007', type: 'Footwear', result: 'Fail', date: '2026-05-13', reportName: 'Chem-T01 (REACH)' },
  { id: 'R004', order: 'ORD-2026-007', type: 'Footwear', result: 'Pass', date: '2026-05-12', reportName: 'Phys-T03 (Abrasion)' },
  { id: 'R005', order: 'ORD-2026-008', type: 'Accessories', result: 'See Result', date: '2026-05-11', reportName: 'General Safety Report' },
];

const ResultBadge = ({ result }: { result: string }) => {
  if (result === 'Pass') return <span className="inline-flex items-center gap-1 text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full text-xs font-semibold border border-emerald-100"><CheckCircle2 className="w-3.5 h-3.5"/> Pass</span>;
  if (result === 'Fail') return <span className="inline-flex items-center gap-1 text-rose-700 bg-rose-50 px-2.5 py-1 rounded-full text-xs font-semibold border border-rose-100"><XCircle className="w-3.5 h-3.5"/> Fail</span>;
  if (result === 'To Be Approve') return <span className="inline-flex items-center gap-1 text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full text-xs font-semibold border border-blue-100"><Clock className="w-3.5 h-3.5"/> To Be Approve</span>;
  return <span className="inline-flex items-center gap-1 text-slate-700 bg-slate-50 px-2.5 py-1 rounded-full text-xs font-semibold border border-slate-200"><Eye className="w-3.5 h-3.5"/> See Result</span>;
};

export const Reports = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl animate-in fade-in duration-500">
      <h1 className="text-2xl font-bold text-slate-900 mb-6">Test Reports</h1>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        {/* Operations */}
        <div className="p-4 border-b border-slate-100 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-1 min-w-[240px] max-w-md gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search report No., order No..." 
                className="w-full pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#005085]"
              />
            </div>
            <select className="text-sm border border-slate-200 rounded-lg px-3 py-2 bg-white text-slate-600 focus:outline-none focus:ring-1 focus:ring-[#005085] w-38">
              <option>All Results</option>
              <option>Pass</option>
              <option>Fail</option>
              <option>To Be Approve</option>
              <option>See Result</option>
            </select>
          </div>
          
          <div className="flex items-center gap-2">
             <button className="px-3 py-2 text-sm font-medium text-slate-600 bg-slate-50 border border-slate-200 rounded-lg hover:bg-slate-100 flex items-center gap-2 transition-colors">
              <Download className="w-4 h-4" /> Export Excel
            </button>
            <button className="px-3 py-2 text-sm font-medium text-slate-600 bg-slate-50 border border-slate-200 rounded-lg hover:bg-slate-100 flex items-center gap-2 transition-colors">
              <Filter className="w-4 h-4" /> Custom Export Fields
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-slate-500 uppercase bg-slate-50/80 border-b border-slate-100">
              <tr>
                <th className="px-5 py-3 font-medium">Report No.</th>
                <th className="px-5 py-3 font-medium">Order No.</th>
                <th className="px-5 py-3 font-medium">Product Type</th>
                <th className="px-5 py-3 font-medium">Overall Result</th>
                <th className="px-5 py-3 font-medium">Report Date</th>
                <th className="px-5 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {MOCK_REPORTS.map((report) => (
                <tr key={report.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-5 py-4">
                    <div className="font-mono text-sm font-medium text-slate-800">REP-{report.id}</div>
                    <div className="text-xs text-slate-500 mt-1">{report.reportName}</div>
                  </td>
                  <td className="px-5 py-4 font-mono text-xs text-[#005085] hover:underline cursor-pointer">{report.order}</td>
                  <td className="px-5 py-4 text-slate-600">{report.type}</td>
                  <td className="px-5 py-4">
                    <ResultBadge result={report.result} />
                  </td>
                  <td className="px-5 py-4 text-slate-500">{report.date}</td>
                  <td className="px-5 py-4 flex items-center justify-end gap-3 text-slate-400">
                    <button className="hover:text-[#005085] transition-colors" title="Download Invoice"><Receipt className="w-4 h-4" /></button>
                    <button className="hover:text-[#005085] transition-colors" title="Preview"><Eye className="w-4 h-4" /></button>
                    <button className="hover:text-[#005085] transition-colors" title="Download PDF"><Download className="w-4 h-4" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
