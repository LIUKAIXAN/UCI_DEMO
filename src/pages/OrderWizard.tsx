import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Check } from 'lucide-react';
import { cn } from '../lib/utils';
import { MOCK_ORDERS, OVERVIEW_NODES, OrderData } from '../data/mockData';
import { OrderStatus } from '../components/ui/StatusBadge';

const STEPS = ['Basic Info', 'Add Sample', 'Test Packages', 'Review & Submit'];

interface SampleData {
  id: string;
  desc: string;
  careLabels: string;
  sku: string;
  productType: string;
}

export const OrderWizard = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState(() => {
    const saved = localStorage.getItem('trf_draft_form');
    if (saved) return JSON.parse(saved);
    return {
      applicant: '',
      contactPerson: '',
      client: '',
      agency: '',
      billingCustomer: 'Applicant',
      billingAccount: '',
      comments: '',
      collection: '',
      productSegment: '',
      
      testPackage: '',
      physicalTests: '',
      chemicalTests: '',
      serviceType: '',
      prevReportNumber: '',
      lab: ''
    };
  });

  const [samples, setSamples] = useState<SampleData[]>(() => {
    const saved = localStorage.getItem('trf_draft_samples');
    if (saved) return JSON.parse(saved);
    return [{
      id: '1', desc: '', careLabels: '', sku: '', productType: ''
    }];
  });

  const addSample = () => {
    setSamples([...samples, {
      id: Date.now().toString(), desc: '', careLabels: '', sku: '', productType: ''
    }]);
  };

  const updateSample = (id: string, field: keyof SampleData, value: string) => {
    setSamples(samples.map(s => s.id === id ? { ...s, [field]: value } : s));
  };

  const removeSample = (id: string) => {
    if (samples.length > 1) {
      setSamples(samples.filter(s => s.id !== id));
    }
  };

  const isStep1Valid = formData.applicant && formData.contactPerson && formData.billingAccount;
  const isStep2Valid = samples.every(s => s.productType);
  const isStep3Valid = formData.serviceType && formData.lab;

  const nextStep = () => setCurrentStep(Math.min(3, currentStep + 1));
  const prevStep = () => setCurrentStep(Math.max(0, currentStep - 1));

  const handleSaveOrder = (status: OrderStatus, step: number) => {
    const newOrder: OrderData = {
      id: Date.now().toString(),
      orderNo: `ORD-2026-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
      trfNo: `TRF26-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
      
      applicant: formData.applicant || '-',
      contactPerson: formData.contactPerson || '-',
      client: formData.client || '-',
      agency: formData.agency || '-',
      billingCustomer: formData.billingCustomer || '-',
      billingAccount: formData.billingAccount || '-',
      
      type: samples[0]?.productType || 'Unknown',
      style: samples[0]?.sku || '-',
      brand: formData.applicant || '-',
      testPackage: formData.testPackage || 'Not Selected',
      lab: formData.lab || '-',
      
      collection: formData.collection || '-',
      productSegment: formData.productSegment || '-',
      
      status,
      created: new Date().toISOString().split('T')[0],
      lastModified: new Date().toISOString().split('T')[0],
      currentStep: step,
    };
    
    MOCK_ORDERS.unshift(newOrder);

    const node = OVERVIEW_NODES.find(n => n.status === status);
    if (node) {
      node.count++;
    }
  };

  const handleSaveDraft = () => {
    localStorage.setItem('trf_draft_form', JSON.stringify(formData));
    localStorage.setItem('trf_draft_samples', JSON.stringify(samples));
    handleSaveOrder('Drafting', 0);
    alert("Draft saved successfully!");
    navigate('/orders');
  };

  const handleSubmit = () => {
    localStorage.removeItem('trf_draft_form');
    localStorage.removeItem('trf_draft_samples');
    handleSaveOrder('Submitted', 1);
    alert("Order submitted successfully!");
    navigate('/orders');
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl animate-in fade-in duration-500">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900 mb-2">New Test Request (TRF)</h1>
        <p className="text-slate-500 text-sm">Follow the steps to create and submit a new testing request.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Progress */}
        <div className="w-full md:w-64 flex-shrink-0">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
            <h3 className="font-semibold text-slate-800 mb-4 text-sm uppercase tracking-wide">Steps</h3>
            <div className="space-y-4">
              {STEPS.map((step, idx) => {
                const isCompleted = currentStep > idx;
                const isCurrent = currentStep === idx;
                
                // Mock validation dot for step 2
                const hasError = idx === 1 && currentStep > 1 && !isStep2Valid;

                return (
                  <div key={idx} className="flex items-center gap-3">
                    <div className={cn(
                      "w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-colors",
                      isCompleted ? "bg-emerald-500 text-white" : 
                      isCurrent   ? "bg-[#005085] text-white ring-4 ring-[#005085]/10" : 
                      "bg-slate-100 text-slate-400"
                    )}>
                      {isCompleted ? <Check className="w-3 h-3" /> : (idx + 1)}
                    </div>
                    <span className={cn(
                      "text-sm font-medium transition-colors",
                      isCurrent ? "text-[#005085]" : 
                      isCompleted ? "text-slate-700" : "text-slate-400"
                    )}>
                      {step}
                    </span>
                    {hasError && <div className="w-2 h-2 rounded-full bg-red-500 ml-auto" title="Required fields missing" />}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Main Form Area */}
        <div className="flex-1">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 sm:p-8 min-h-[400px] flex flex-col">
            
            {/* Step 1: Basic Info */}
            {currentStep === 0 && (
              <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                <h2 className="text-xl font-bold text-slate-800 mb-6">Basic Info</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-slate-700 mb-1">Applicant <span className="text-red-500">*</span></label>
                    <select 
                      value={formData.applicant} onChange={e => setFormData({...formData, applicant: e.target.value})}
                      className="w-full p-2 border border-slate-300 rounded focus:ring-2 focus:ring-[#005085]/20 focus:border-[#005085] outline-none transition-all bg-white" 
                    >
                      <option value="">Select...</option>
                      <option value="nike">Nike Inc.</option>
                      <option value="adidas">Adidas AG</option>
                      <option value="puma">Puma SE</option>
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-slate-700 mb-1">Applicant Contact Person <span className="text-red-500">*</span></label>
                    <select 
                      value={formData.contactPerson} onChange={e => setFormData({...formData, contactPerson: e.target.value})}
                      className="w-full p-2 border border-slate-300 rounded focus:ring-2 focus:ring-[#005085]/20 focus:border-[#005085] outline-none transition-all bg-white" 
                    >
                      <option value="">Select...</option>
                      <option value="john">John Doe</option>
                      <option value="jane">Jane Smith</option>
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-slate-700 mb-1">Client</label>
                    <select 
                      value={formData.client} onChange={e => setFormData({...formData, client: e.target.value})}
                      className="w-full p-2 border border-slate-300 rounded focus:ring-2 focus:ring-[#005085]/20 focus:border-[#005085] outline-none transition-all bg-white" 
                    >
                      <option value="">Select...</option>
                      <option value="footlocker">Foot Locker</option>
                      <option value="jd">JD Sports</option>
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-slate-700 mb-1">Agency</label>
                    <select 
                      value={formData.agency} onChange={e => setFormData({...formData, agency: e.target.value})}
                      className="w-full p-2 border border-slate-300 rounded focus:ring-2 focus:ring-[#005085]/20 focus:border-[#005085] outline-none transition-all bg-white" 
                    >
                      <option value="">Select...</option>
                      <option value="agency1">Global Testing Agency</option>
                      <option value="agency2">Quality Assurance Co.</option>
                    </select>
                  </div>
                  <div className="md:col-span-2 mt-2">
                    <label className="block text-sm font-medium text-slate-700 mb-3">Billing Customer <span className="text-red-500">*</span></label>
                    <div className="grid grid-cols-2 gap-4">
                      {['Applicant', 'Client', 'Agency', 'Other'].map(option => (
                        <label key={option} className="flex items-center gap-2 cursor-pointer">
                          <input 
                            type="radio" 
                            name="billingCustomer"
                            value={option}
                            checked={formData.billingCustomer === option}
                            onChange={e => setFormData({...formData, billingCustomer: e.target.value})}
                            className="w-4 h-4 text-[#005085] focus:ring-[#005085] border-slate-300"
                          />
                          <span className="text-sm text-slate-700">{option}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div className="md:col-span-2 mt-2">
                    <label className="block text-sm font-medium text-slate-700 mb-1">Billing Customer - Associated Account <span className="text-red-500">*</span></label>
                    <select 
                      value={formData.billingAccount} onChange={e => setFormData({...formData, billingAccount: e.target.value})}
                      className="w-full p-2 border border-slate-300 rounded focus:ring-2 focus:ring-[#005085]/20 focus:border-[#005085] outline-none transition-all bg-white" 
                    >
                      <option value="">Select...</option>
                      <option value="acc1">ACC-10029 (US Billing)</option>
                      <option value="acc2">ACC-10030 (EU Billing)</option>
                    </select>
                  </div>
                  <div className="md:col-span-1">
                    <label className="block text-sm font-medium text-slate-700 mb-1">Collection</label>
                    <input 
                      type="text" value={formData.collection} onChange={e => setFormData({...formData, collection: e.target.value})}
                      className="w-full p-2 border border-slate-300 rounded focus:ring-2 focus:ring-[#005085]/20 focus:border-[#005085] outline-none transition-all bg-white" 
                      placeholder="e.g. Summer 2026"
                    />
                  </div>
                  <div className="md:col-span-1">
                    <label className="block text-sm font-medium text-slate-700 mb-1">Product Segment</label>
                    <select 
                      value={formData.productSegment} onChange={e => setFormData({...formData, productSegment: e.target.value})}
                      className="w-full p-2 border border-slate-300 rounded focus:ring-2 focus:ring-[#005085]/20 focus:border-[#005085] outline-none transition-all bg-white" 
                    >
                      <option value="">Select...</option>
                      <option value="men">Men's</option>
                      <option value="women">Women's</option>
                      <option value="kids">Kids</option>
                      <option value="unisex">Unisex</option>
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-slate-700 mb-1">Comments</label>
                    <textarea 
                      rows={4} value={formData.comments} onChange={e => setFormData({...formData, comments: e.target.value})}
                      className="w-full p-2 border border-slate-300 rounded focus:ring-2 focus:ring-[#005085]/20 focus:border-[#005085] outline-none transition-all resize-none" 
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Add Sample */}
            {currentStep === 1 && (
              <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-slate-800">Add Sample</h2>
                </div>
                
                <div className="space-y-8">
                  {samples.map((sample, index) => (
                    <div key={sample.id} className="p-5 border border-slate-200 rounded-xl bg-slate-50 relative">
                      {samples.length > 1 && (
                        <button 
                          onClick={() => removeSample(sample.id)}
                          className="absolute -top-3 -right-3 w-8 h-8 flex items-center justify-center bg-white border border-slate-200 text-slate-400 hover:text-red-500 rounded-full shadow-sm transition-colors"
                        >
                          &times;
                        </button>
                      )}
                      <h3 className="text-sm font-semibold text-slate-700 mb-4 uppercase tracking-widest">Sample {index + 1}</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="md:col-span-1">
                          <label className="block text-sm font-medium text-slate-700 mb-1 flex items-center gap-1">
                            Sample Description
                            <span className="text-slate-400 text-[10px] border border-slate-300 rounded-full w-3 h-3 flex items-center justify-center">i</span>
                          </label>
                          <textarea 
                            rows={4} value={sample.desc} onChange={e => updateSample(sample.id, 'desc', e.target.value)}
                            className="w-full p-2 border border-slate-300 rounded focus:ring-2 focus:ring-[#005085]/20 focus:border-[#005085] outline-none transition-all resize-none bg-white" 
                          />
                        </div>
                        <div className="md:col-span-1 space-y-5">
                          <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Product Type <span className="text-red-500">*</span></label>
                            <select 
                              value={sample.productType} onChange={e => updateSample(sample.id, 'productType', e.target.value)}
                              className="w-full p-2 border border-slate-300 rounded focus:ring-2 focus:ring-[#005085]/20 focus:border-[#005085] outline-none transition-all bg-white" 
                            >
                              <option value="">Select Product Type</option>
                              <option value="footwear">Footwear</option>
                              <option value="apparel">Apparel</option>
                              <option value="accessories">Accessories</option>
                            </select>
                          </div>
                        </div>

                        <div className="md:col-span-1">
                          <label className="block text-sm font-medium text-slate-700 mb-1">Care Labels</label>
                          <select 
                            value={sample.careLabels} onChange={e => updateSample(sample.id, 'careLabels', e.target.value)}
                            className="w-full p-2 border border-slate-300 rounded focus:ring-2 focus:ring-[#005085]/20 focus:border-[#005085] outline-none transition-all bg-white" 
                          >
                            <option value="">Select...</option>
                            <option value="wash-cold">Wash Cold</option>
                            <option value="dry-clean">Dry Clean Only</option>
                          </select>
                        </div>
                        <div className="md:col-span-1">
                           <label className="block text-sm font-medium text-slate-700 mb-1">Article numbers (SKU)</label>
                           <input 
                              type="text" value={sample.sku} onChange={e => updateSample(sample.id, 'sku', e.target.value)}
                              className="w-full p-2 border border-slate-300 rounded focus:ring-2 focus:ring-[#005085]/20 focus:border-[#005085] outline-none transition-all bg-white" 
                            />
                        </div>
                      </div>
                    </div>
                  ))}

                  <div className="flex gap-4">
                    <button 
                      onClick={addSample}
                      className="px-4 py-2 border-2 border-[#005085] text-[#005085] font-medium rounded-lg hover:bg-[#005085]/5 transition-colors text-sm"
                    >
                      SAVE + NEW SAMPLE
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Test Packages */}
            {currentStep === 2 && (
              <div className="animate-in fade-in slide-in-from-right-4 duration-300 flex flex-col h-full">
                 <h2 className="text-xl font-bold text-slate-800 mb-6">Test Packages</h2>
                 <div className="space-y-6 flex-1">
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                     <div className="md:col-span-2">
                       <label className="block text-sm font-medium text-slate-700 mb-2">Select Test Package</label>
                       <select 
                         value={formData.testPackage} onChange={e => setFormData({...formData, testPackage: e.target.value})}
                         className="w-full p-2 border border-slate-300 rounded focus:ring-2 focus:ring-[#005085]/20 focus:border-[#005085] outline-none transition-all bg-white" 
                       >
                         <option value="">Select Test Package</option>
                         <option value="nike-apparel">Nike Apparel Package</option>
                         <option value="adidas-footwear">Adidas Footwear Package</option>
                         <option value="general-safety">General Safety Package</option>
                       </select>
                     </div>
                     <div className="md:col-span-2">
                       <label className="block text-sm font-medium text-slate-700 mb-2">Physical Tests</label>
                       <select 
                         value={formData.physicalTests} onChange={e => setFormData({...formData, physicalTests: e.target.value})}
                         className="w-full p-2 border border-slate-300 rounded focus:ring-2 focus:ring-[#005085]/20 focus:border-[#005085] outline-none transition-all bg-white" 
                       >
                         <option value="">Select Physical Tests</option>
                         <option value="tensile">Tensile Strength</option>
                         <option value="abrasion">Abrasion Resistance</option>
                       </select>
                     </div>
                     <div className="md:col-span-2">
                       <label className="block text-sm font-medium text-slate-700 mb-2">Chemical Tests</label>
                       <select 
                         value={formData.chemicalTests} onChange={e => setFormData({...formData, chemicalTests: e.target.value})}
                         className="w-full p-2 border border-slate-300 rounded focus:ring-2 focus:ring-[#005085]/20 focus:border-[#005085] outline-none transition-all bg-white" 
                       >
                         <option value="">Select Chemical Tests</option>
                         <option value="lead">Lead Content</option>
                         <option value="phthalates">Phthalates</option>
                       </select>
                     </div>
                     <div className="md:col-span-1">
                       <label className="block text-sm font-medium text-slate-700 mb-2">Service Type <span className="text-red-500">*</span></label>
                       <select 
                         value={formData.serviceType} onChange={e => setFormData({...formData, serviceType: e.target.value})}
                         className="w-full p-2 border border-slate-300 rounded focus:ring-2 focus:ring-[#005085]/20 focus:border-[#005085] outline-none transition-all bg-white" 
                       >
                         <option value="">Select Service Type</option>
                         <option value="regular">Regular (5-7 days)</option>
                         <option value="express">Express (2-3 days)</option>
                         <option value="urgent">Urgent (24 hours)</option>
                       </select>
                     </div>
                     <div className="md:col-span-1">
                       <label className="block text-sm font-medium text-slate-700 mb-2">Target Laboratory <span className="text-red-500">*</span></label>
                       <select 
                         value={formData.lab} onChange={e => setFormData({...formData, lab: e.target.value})}
                         className="w-full p-2 border border-slate-300 rounded focus:ring-2 focus:ring-[#005085]/20 focus:border-[#005085] outline-none transition-all bg-white" 
                       >
                         <option value="">Select Lab...</option>
                         <option value="hk">Hong Kong Laboratory</option>
                         <option value="sh">Shanghai Laboratory</option>
                         <option value="vn">Vietnam Laboratory</option>
                       </select>
                     </div>
                     <div className="md:col-span-2">
                       <label className="block text-sm font-medium text-slate-700 mb-2">Previous report number in case of re-test</label>
                       <input 
                         type="text" value={formData.prevReportNumber} onChange={e => setFormData({...formData, prevReportNumber: e.target.value})}
                         className="w-full p-2 border border-slate-300 rounded focus:ring-2 focus:ring-[#005085]/20 focus:border-[#005085] outline-none transition-all" 
                       />
                     </div>
                   </div>
                 </div>
              </div>
            )}

            {/* Step 4: Submission */}
            {currentStep === 3 && (
              <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                <h2 className="text-xl font-bold text-slate-800 mb-6">Review & Submit</h2>
                
                <div className="space-y-6 flex-1 mb-6">
                   <div className="bg-slate-50 p-5 rounded-xl border border-slate-200">
                     <h3 className="font-semibold text-slate-800 border-b border-slate-200 pb-2 mb-3">Basic Info</h3>
                     <div className="grid grid-cols-2 gap-y-2 text-sm">
                       <div className="text-slate-500">Applicant:</div>
                       <div className="font-medium text-slate-800 capitalize">{formData.applicant || '-'}</div>
                       <div className="text-slate-500">Contact Person:</div>
                       <div className="font-medium text-slate-800 capitalize">{formData.contactPerson || '-'}</div>
                       <div className="text-slate-500">Billing Customer:</div>
                       <div className="font-medium text-slate-800">{formData.billingCustomer}</div>
                       <div className="text-slate-500">Billing Account:</div>
                       <div className="font-medium text-slate-800">{formData.billingAccount || '-'}</div>
                     </div>
                   </div>
 
                   <div className="bg-slate-50 p-5 rounded-xl border border-slate-200">
                     <h3 className="font-semibold text-slate-800 border-b border-slate-200 pb-2 mb-3">Samples ({samples.length})</h3>
                     <div className="flex flex-col gap-4">
                       {samples.map((s, i) => (
                         <div key={s.id} className="text-sm bg-white p-3 rounded border border-slate-100">
                           <div className="font-semibold mb-1">Sample {i + 1}</div>
                           <div className="grid grid-cols-2 gap-y-1">
                             <div className="text-slate-500">Product Type:</div>
                             <div className="font-medium text-slate-800 capitalize">{s.productType || '-'}</div>
                             <div className="text-slate-500">Description:</div>
                             <div className="font-medium text-slate-800 truncate">{s.desc || '-'}</div>
                             <div className="text-slate-500">SKU:</div>
                             <div className="font-medium text-slate-800">{s.sku || '-'}</div>
                           </div>
                         </div>
                       ))}
                     </div>
                   </div>
 
                   <div className="bg-slate-50 p-5 rounded-xl border border-slate-200">
                     <h3 className="font-semibold text-slate-800 border-b border-slate-200 pb-2 mb-3">Test & Service Details</h3>
                     <div className="grid grid-cols-2 gap-y-2 text-sm">
                       <div className="text-slate-500">Service Type:</div>
                       <div className="font-medium text-slate-800 capitalize">{formData.serviceType || '-'}</div>
                       <div className="text-slate-500">Laboratory:</div>
                       <div className="font-medium text-slate-800 uppercase">{formData.lab || '-'}</div>
                       <div className="text-slate-500">Test Package:</div>
                       <div className="font-medium text-slate-800 capitalize">{formData.testPackage || '-'}</div>
                     </div>
                   </div>
                 </div>

                <div className="flex items-center gap-3 p-4 bg-blue-50 border border-blue-100 rounded-lg text-blue-800 text-sm">
                  <FileText className="w-5 h-5 flex-shrink-0" />
                  <p>By submitting this form, you agree to the Terms of Service and authorize the generation of the official TRF document.</p>
                </div>
              </div>
            )}

            {/* Bottom Navigation */}
            <div className="mt-auto pt-8 flex justify-between items-center border-t border-slate-100">
              <button 
                onClick={prevStep}
                disabled={currentStep === 0}
                className="px-6 py-2.5 text-sm font-medium text-slate-600 bg-white border border-slate-300 rounded-lg shadow-sm hover:bg-slate-50 disabled:opacity-50 transition-colors"
              >
                Back
              </button>
              
              <div className="flex gap-3">
                <button 
                  onClick={handleSaveDraft}
                  className="px-6 py-2.5 text-sm font-medium text-[#005085] hover:underline"
                >
                  Save Draft
                </button>
                {currentStep < 3 ? (
                    <button 
                    onClick={nextStep}
                    disabled={
                      (currentStep === 0 && !isStep1Valid) ||
                      (currentStep === 1 && !isStep2Valid) ||
                      (currentStep === 2 && !isStep3Valid)
                    }
                    className="px-6 py-2.5 text-sm font-medium text-white bg-[#005085] hover:bg-[#00406b] rounded-lg shadow-sm flex items-center gap-2 transition-colors disabled:opacity-50"
                  >
                    Next Step <ChevronRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button 
                    onClick={handleSubmit}
                    className="px-6 py-2.5 text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-sm flex items-center gap-2 transition-colors"
                  >
                    <Check className="w-4 h-4" /> Confirm & Submit
                  </button>
                )}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

// Simple icon placeholder
function FileText(props: any) {
  return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" x2="8" y1="13" y2="13"/><line x1="16" x2="8" y1="17" y2="17"/><line x1="10" x2="8" y1="9" y2="9"/></svg>;
}
