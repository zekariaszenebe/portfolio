/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  X, 
  Search, 
  BookOpen, 
  Copy, 
  Check, 
  ExternalLink, 
  HelpCircle, 
  Zap, 
  Building2, 
  FileText,
  CheckCircle2
} from 'lucide-react';

interface Article {
  id: string;
  category: 'EEU Utility Procedures' | 'Smart Metering & Tariffs' | 'CBE Banking Guidelines' | 'Customer Rights';
  title: string;
  summary: string;
  sopSteps: string[];
  customerScript: string;
}

const ARTICLES: Article[] = [
  {
    id: 'art-1',
    category: 'Smart Metering & Tariffs',
    title: 'How Graduated Progressive Tariff Blocks (kWh) are Calculated in Ethiopia',
    summary: 'Clear breakdown of how electricity consumption shifts across subsidized lifeline tiers into progressive pricing brackets, and why token recharges yield varying kWh units depending on monthly accumulated consumption.',
    sopSteps: [
      'Query the customer account or meter serial number in the EEU billing portal.',
      'Check the current cumulative kWh consumed during the active Ethiopian calendar month.',
      'Explain that the first 50 kWh is subsidized at 0.35 ETB/kWh; units exceeding 100 kWh shift to Block 2 (1.15 ETB/kWh) and Block 3 (1.70 ETB/kWh).',
      'Account for the monthly fixed service charge (15.00 ETB) and 15% statutory VAT deducted upon recharge.',
      'Provide customer reassurance that tier baselines reset automatically at the beginning of each Ethiopian month.'
    ],
    customerScript: '“Dear Customer, in Ethiopia electricity tariffs use progressive blocks so that basic energy remains affordable. When your monthly usage passes 100 kWh or 200 kWh, additional units enter the standard tariff tier. Your tier will reset automatically at the start of next month!”'
  },
  {
    id: 'art-2',
    category: 'EEU Utility Procedures',
    title: 'Emergency Power Supply Outage Protocol & Dispatch Coordination',
    summary: 'Standard operating procedure for logging feeder tripping incidents, coordinating emergency crew dispatch, and broadcasting transparent restoration timelines to affected Addis Ababa sub-cities.',
    sopSteps: [
      'Verify substation feeder telemetry (Active / Tripped / Scheduled Maintenance).',
      'Check if the outage is isolated to customer distribution box or affects the neighborhood line.',
      'Log Priority Emergency Ticket with substation feeder ID and GPS cross-street location.',
      'Assign nearest Mobile Dispatch Unit via EEU VHF radio / dispatch queue.',
      'Trigger automated customer SMS advisory with estimated restoration window (SLA target: < 2 hours).'
    ],
    customerScript: '“Dear Customer, our dispatch unit has identified the line disruption on your feeder and technical crews are on-site replacing the affected fuse. Estimated restoration is within 45 minutes. Thank you for your patience.”'
  },
  {
    id: 'art-3',
    category: 'Smart Metering & Tariffs',
    title: 'Prepaid Smart Meter STS Keypad Error Codes (EEU Standards)',
    summary: 'Troubleshooting guide for prepaid token rejection codes (Error 30, Used Token, Duplicate Token, Voltage Anomaly) to assist customers via phone or branch desks.',
    sopSteps: [
      'Ask customer to read the 2-digit error code displayed on the CIU (Customer Interface Unit).',
      'Error 30 / Reject: Verify if the 20-digit token was purchased for this specific meter ID (meter serial mismatch).',
      'Used Token: Confirm if token was already accepted into meter memory by checking accumulated credit.',
      'Low Voltage Alarm: Inspect circuit breaker position and verify neighborhood supply stability.',
      'Instruct customer to enter 56 to test battery level and signal reception with the pole-mounted meter.'
    ],
    customerScript: '“Please check the 11-digit meter serial number printed on your token slip. If it matches your meter card, re-enter the 20 digits slowly without pausing between digits.”'
  },
  {
    id: 'art-4',
    category: 'CBE Banking Guidelines',
    title: 'Commercial Bank of Ethiopia: Cash Dispense Anomaly & Client Verification',
    summary: 'Support guidelines for assisting branch customers when an automated ATM withdrawal debits their account without physical cash ejection.',
    sopSteps: [
      'Greet customer warmly and reassure them that electronic transactions are systematically audited.',
      'Request customer passbook or debit card with valid Kebele ID / National ID.',
      'Check core banking system for the transaction journal sequence and reversal status.',
      'If not automatically reversed, initiate an official CBE Settlement Reconciliation Slip #SR-Form.',
      'Provide signed reference number and confirm reconciliation timeline within 24 to 48 banking hours.'
    ],
    customerScript: '“Ato/W/ro, your funds are completely protected under Commercial Bank of Ethiopia audit standards. Our reconciliation team audits the ATM cash cassette balance daily, and any unsettled debit is credited back to your account promptly.”'
  }
];

export const KnowledgeBaseModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose
}) => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(ARTICLES[0]);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  if (!isOpen) return null;

  const categories = ['All', 'Smart Metering & Tariffs', 'EEU Utility Procedures', 'CBE Banking Guidelines'];

  const filtered = ARTICLES.filter(a => {
    const matchesCat = selectedCategory === 'All' || a.category === selectedCategory;
    const matchesSearch = a.title.toLowerCase().includes(search.toLowerCase()) ||
                          a.summary.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl bg-[#0B111E] border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden my-auto text-slate-100">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-[#080C14]">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-[#F4984A]/10 text-[#F4984A] border border-[#F4984A]/30">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white tracking-wide">
                Customer Support Knowledge Base & SOP Directory
              </h3>
              <p className="text-xs text-slate-400">
                Authored standard operating procedures & customer communication scripts for utility and banking operations
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search & Category Filter Controls */}
        <div className="p-5 bg-[#080C14]/60 border-b border-slate-800 space-y-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-500" />
            <input
              type="text"
              placeholder="Search procedures, smart meter error codes, tariff explanations..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#0E1726] border border-slate-700 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#F4984A]"
            />
          </div>

          <div className="flex flex-wrap gap-2 text-xs">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#F4984A] text-slate-950 font-bold'
                    : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Content Body: Split Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 max-h-[70vh] overflow-hidden">
          
          {/* Article List (Left) */}
          <div className="md:col-span-5 border-r border-slate-800 overflow-y-auto p-4 space-y-2">
            {filtered.map((art) => {
              const isSelected = selectedArticle?.id === art.id;
              return (
                <div
                  key={art.id}
                  onClick={() => setSelectedArticle(art)}
                  className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-[#111C30] border-[#F4984A]'
                      : 'bg-[#0E1726] border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <span className="text-[10px] uppercase font-bold text-[#59A650] block">
                    {art.category}
                  </span>
                  <h4 className="text-xs font-bold text-white mt-1 leading-snug">
                    {art.title}
                  </h4>
                  <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">
                    {art.summary}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Article Detail View (Right) */}
          <div className="md:col-span-7 p-6 overflow-y-auto space-y-5 bg-[#080C14]">
            {selectedArticle ? (
              <>
                <div className="border-b border-slate-800 pb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#F4984A]">
                    {selectedArticle.category}
                  </span>
                  <h3 className="text-lg sm:text-xl font-black text-white mt-1">
                    {selectedArticle.title}
                  </h3>
                  <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                    {selectedArticle.summary}
                  </p>
                </div>

                {/* SOP Steps */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#59A650] flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Standard Operating Protocol for Support Officers
                  </h4>
                  <ol className="list-decimal list-outside pl-4 space-y-2 text-xs text-slate-300">
                    {selectedArticle.sopSteps.map((step, idx) => (
                      <li key={idx} className="leading-relaxed">
                        {step}
                      </li>
                    ))}
                  </ol>
                </div>

                {/* Customer Communication Script */}
                <div className="p-4 rounded-xl bg-[#0E1726] border border-slate-800 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white flex items-center gap-1.5">
                      <HelpCircle className="w-3.5 h-3.5 text-[#F4984A]" />
                      Empathetic Customer Phrasing Script
                    </span>
                    <button
                      onClick={() => handleCopy(selectedArticle.customerScript, selectedArticle.id)}
                      className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-[11px] text-slate-300 flex items-center gap-1 cursor-pointer"
                    >
                      {copiedId === selectedArticle.id ? (
                        <>
                          <Check className="w-3 h-3 text-[#59A650]" />
                          <span>Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copy Script</span>
                        </>
                      )}
                    </button>
                  </div>
                  <blockquote className="text-xs font-mono text-slate-300 italic bg-[#080C14] p-3 rounded-lg border border-slate-800 leading-relaxed">
                    {selectedArticle.customerScript}
                  </blockquote>
                </div>
              </>
            ) : (
              <div className="text-center py-20 text-xs text-slate-500">
                Select a support article to inspect procedure details
              </div>
            )}
          </div>

        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-[#080C14] border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <span>Customer Experience SOP Documentation • Zekarias Zenebe Ababu</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-medium transition-colors"
          >
            Close Guide
          </button>
        </div>
      </div>
    </div>
  );
};
