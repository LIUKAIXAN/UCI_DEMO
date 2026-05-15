import React, { useState } from 'react';
import { Search, Filter, Settings, Printer, Download, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { StatusBadge, OrderStatus } from '../components/ui/StatusBadge';
import * as Popover from '@radix-ui/react-popover';
import { MOCK_ORDERS } from '../data/mockData';

const COLUMNS = [
  { key: 'trfNo', label: 'TRF ID' },
  { key: 'applicant', label: 'Applicant' },
  { key: 'client', label: 'Client' },
  { key: 'reportNumber', label: 'Report Number' },
  { key: 'testResult', label: 'Test Result' },
  { key: 'lab', label: 'Laboratory' },
  { key: 'status', label: 'Status' },
  { key: 'lastModified', label: 'Last modified' },
  { key: 'season', label: 'Season' },
  { key: 'fiberContent', label: 'Fiber Content' },
  { key: 'collection', label: 'Collection' },
  { key: 'productSegment', label: 'Product segment' },
];

export const Orders = () => {
  const navigate = useNavigate();
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [visibleCols, setVisibleCols] = useState<Set<string>>(new Set(COLUMNS.map(c => c.key)));

  const toggleSelect = (id: string) => {
    const newSet = new Set(selectedIds);
    if (newSet.has(id)) newSet.delete(id);
    else newSet.add(id);
    setSelectedIds(newSet);
  };

  const toggleSelectAll = () => {
    if (selectedIds.size === MOCK_ORDERS.length) setSelectedIds(new Set());
    else setSelectedIds(new Set(MOCK_ORDERS.map(o => o.id)));
  };

  const toggleColumn = (key: string) => {
    const newCols = new Set(visibleCols);
    if (newCols.has(key)) newCols.delete(key);
    else newCols.add(key);
    setVisibleCols(newCols);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold text-slate-900">My Orders</h1>
        <button 
          onClick={() => navigate('/orders/new')}
          className="bg-[#005085] hover:bg-[#00406b] text-white px-4 py-2 rounded-lg font-medium text-sm flex items-center gap-2 transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" />
          NEW TEST REQUEST
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        {/* Top Operations Bar */}
        <div className="p-4 border-b border-slate-100 flex flex-col gap-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex-1 min-w-[240px] max-w-md relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search orders, TRF, brand..." 
                className="w-full pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#005085]/20 focus:border-[#005085]"
              />
            </div>
            
            <div className="flex items-center gap-2">
              <button className="px-3 py-2 text-sm font-medium text-slate-600 bg-slate-50 border border-slate-200 rounded-lg hover:bg-slate-100 flex items-center gap-2 transition-colors">
                <Printer className="w-4 h-4" /> <span className="hidden sm:inline">Print (Batch)</span>
              </button>
              <button className="px-3 py-2 text-sm font-medium text-slate-600 bg-slate-50 border border-slate-200 rounded-lg hover:bg-slate-100 flex items-center gap-2 transition-colors">
                <Download className="w-4 h-4" /> <span className="hidden sm:inline">Export Excel</span>
              </button>
               
              {/* Column Configurator */}
              <Popover.Root>
                <Popover.Trigger asChild>
                  <button className="p-2 text-slate-600 bg-slate-50 border border-slate-200 rounded-lg hover:bg-slate-100 transition-colors" title="Configure Columns">
                    <Settings className="w-4 h-4" />
                  </button>
                </Popover.Trigger>
                <Popover.Portal>
                  <Popover.Content className="bg-white p-3 rounded-xl shadow-xl border border-slate-200 w-56 text-sm z-50 fade-in zoom-in" align="end" sideOffset={5}>
                    <h4 className="font-semibold mb-2 text-slate-800">Display Columns</h4>
                    <div className="space-y-2">
                      {COLUMNS.map(col => (
                        <label key={col.key} className="flex items-center gap-2 cursor-pointer">
                          <input 
                            type="checkbox" 
                            checked={visibleCols.has(col.key)} 
                            onChange={() => toggleColumn(col.key)}
                            className="rounded border-slate-300 text-[#005085] focus:ring-[#005085]"
                          />
                          <span className="text-slate-600">{col.label}</span>
                        </label>
                      ))}
                    </div>
                  </Popover.Content>
                </Popover.Portal>
              </Popover.Root>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 items-center">
            <select className="text-sm border border-slate-200 rounded-md px-3 py-1.5 bg-slate-50 text-slate-600 focus:outline-none focus:ring-1 focus:ring-[#005085]">
              <option>All Status</option>
              <option>Drafting</option>
              <option>Submitted</option>
              <option>Accepted Testing</option>
            </select>
            <select className="text-sm border border-slate-200 rounded-md px-3 py-1.5 bg-slate-50 text-slate-600 focus:outline-none focus:ring-1 focus:ring-[#005085]">
              <option>All Product Types</option>
              <option>Garments</option>
              <option>Footwear</option>
            </select>
             <input type="date" className="text-sm border border-slate-200 rounded-md px-3 py-1.5 bg-slate-50 text-slate-600 focus:outline-none focus:ring-1 focus:ring-[#005085]" title="Start Date" />
             <span className="text-slate-400">-</span>
             <input type="date" className="text-sm border border-slate-200 rounded-md px-3 py-1.5 bg-slate-50 text-slate-600 focus:outline-none focus:ring-1 focus:ring-[#005085]" title="End Date" />
            <button className="text-sm text-[#005085] font-medium hover:underline px-2">Reset Filters</button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-slate-500 uppercase bg-slate-50/80 border-b border-slate-100">
              <tr>
                <th className="px-5 py-3 w-10">
                  <input type="checkbox" checked={selectedIds.size === MOCK_ORDERS.length && MOCK_ORDERS.length > 0} onChange={toggleSelectAll} className="rounded border-slate-300" />
                </th>
                {COLUMNS.map(col => visibleCols.has(col.key) && (
                  <th key={col.key} className="px-5 py-3 font-medium cursor-pointer hover:bg-slate-100 transition-colors">
                    <div className="flex items-center gap-1">
                      {col.label} <span className="text-[10px] opacity-50">↓</span>
                    </div>
                  </th>
                ))}
                <th className="px-5 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {MOCK_ORDERS.map((order) => (
                <tr key={order.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-5 py-4">
                    <input type="checkbox" checked={selectedIds.has(order.id)} onChange={() => toggleSelect(order.id)} className="rounded border-slate-300" />
                  </td>
                  {visibleCols.has('trfNo') && (
                    <td className="px-5 py-4 font-mono text-xs font-medium text-[#005085] cursor-pointer hover:underline" onClick={() => navigate(`/orders/${order.id}`)}>
                      {order.trfNo}
                    </td>
                  )}
                  {visibleCols.has('applicant') && <td className="px-5 py-4 text-slate-700">{order.applicant || '-'}</td>}
                  {visibleCols.has('client') && <td className="px-5 py-4 text-slate-700">{order.client || '-'}</td>}
                  {visibleCols.has('reportNumber') && <td className="px-5 py-4 text-slate-700">{order.reportNumber || '-'}</td>}
                  {visibleCols.has('testResult') && <td className="px-5 py-4 text-slate-700">{order.testResult || '-'}</td>}
                  {visibleCols.has('lab') && <td className="px-5 py-4 text-slate-700">{order.lab || '-'}</td>}
                  {visibleCols.has('status') && (
                    <td className="px-5 py-4 cursor-pointer hover:opacity-80 transition-opacity" onClick={() => navigate(`/orders/${order.id}`)}>
                      <StatusBadge status={order.status} />
                    </td>
                  )}
                  {visibleCols.has('lastModified') && <td className="px-5 py-4 text-slate-500">{order.lastModified || '-'}</td>}
                  {visibleCols.has('season') && <td className="px-5 py-4 text-slate-700">{order.season || '-'}</td>}
                  {visibleCols.has('fiberContent') && <td className="px-5 py-4 text-slate-700">{order.fiberContent || '-'}</td>}
                  {visibleCols.has('collection') && <td className="px-5 py-4 text-slate-700">{order.collection || '-'}</td>}
                  {visibleCols.has('productSegment') && <td className="px-5 py-4 text-slate-700">{order.productSegment || '-'}</td>}
                  <td className="px-5 py-4 text-right">
                    <button onClick={() => navigate(`/orders/${order.id}`)} className="text-[#005085] font-medium text-sm hover:underline opacity-0 group-hover:opacity-100 transition-opacity">
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Setup */}
        <div className="p-4 border-t border-slate-100 flex items-center justify-between text-sm text-slate-500">
          <div>Showing 1 to {MOCK_ORDERS.length} of {MOCK_ORDERS.length} entries</div>
          <div className="flex gap-1">
            <button className="px-3 py-1 border border-slate-200 rounded-md hover:bg-slate-50 disabled:opacity-50" disabled>Previous</button>
            <button className="px-3 py-1 border border-[#005085] bg-[#005085] text-white rounded-md">1</button>
            <button className="px-3 py-1 border border-slate-200 rounded-md hover:bg-slate-50">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};
