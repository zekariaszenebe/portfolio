/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  X, 
  Search, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  Send, 
  ShieldCheck, 
  Building2, 
  AlertTriangle,
  UserCheck
} from 'lucide-react';

interface Ticket {
  id: string;
  service: 'Ethiopian Electric Utility' | 'Commercial Bank of Ethiopia';
  subject: string;
  customer: string;
  location: string;
  priority: 'High' | 'Normal' | 'Critical';
  status: 'Resolved' | 'In Progress' | 'Dispatched';
  stages: {
    title: string;
    timestamp: string;
    detail: string;
    completed: boolean;
  }[];
  resolutionTime: string;
  csatRating: string;
  agentNotes: string;
}

const SAMPLE_TICKETS: Ticket[] = [
  {
    id: 'EEU-ADD-4921',
    service: 'Ethiopian Electric Utility',
    subject: 'Bole Substation Feeder 04 Transformer Overload',
    customer: 'Ato Daniel Girma (Commercial Bakery)',
    location: 'Bole Sub-city, Addis Ababa',
    priority: 'Critical',
    status: 'Resolved',
    stages: [
      {
        title: 'Inquiry Logged & Customer Authenticated',
        timestamp: '10:12 AM EAT',
        detail: 'Customer reported unexpected power cutoff impacting commercial equipment.',
        completed: true
      },
      {
        title: 'Priority Triage & Feeder Correlation',
        timestamp: '10:16 AM EAT',
        detail: 'Telemetry identified unscheduled tripping on Feeder 04. Priority marked as Critical.',
        completed: true
      },
      {
        title: 'Mobile Dispatch Unit Coordinated',
        timestamp: '10:24 AM EAT',
        detail: 'Dispatch Unit Delta-1 arrived on-site with replacement fuse & transformer insulation kit.',
        completed: true
      },
      {
        title: 'Automated Customer SMS Notification Sent',
        timestamp: '10:28 AM EAT',
        detail: 'SMS alert delivered with targeted restoration estimate (35 mins).',
        completed: true
      },
      {
        title: 'Supply Restored & Customer Resolution Confirmed',
        timestamp: '10:49 AM EAT',
        detail: 'Line re-energized. Customer called back to confirm normal voltage delivery.',
        completed: true
      }
    ],
    resolutionTime: '37 minutes (Well within EEU 2-hr SLA target)',
    csatRating: '5 / 5 Stars (Exceptional Speed & Communication)',
    agentNotes: 'Handled by Zekarias Zenebe Ababu. Customer acknowledged rapid communication prevented cold-storage loss.'
  },
  {
    id: 'EEU-MTR-1082',
    service: 'Ethiopian Electric Utility',
    subject: 'Smart Meter CIU Keypad Error 30 Communication Timeout',
    customer: 'W/ro Muluemebet Assefa',
    location: 'Kazanchis, Kirkos Sub-city',
    priority: 'Normal',
    status: 'Resolved',
    stages: [
      {
        title: 'Inquiry Logged & Meter Number Verified',
        timestamp: '02:05 PM EAT',
        detail: 'Prepaid customer unable to enter token; CIU screen showing “Error 30”.',
        completed: true
      },
      {
        title: 'Remote Meter Signal Diagnosis',
        timestamp: '02:09 PM EAT',
        detail: 'Investigated radio-frequency pairing between indoor keypad and pole-mounted meter unit.',
        completed: true
      },
      {
        title: 'Step-by-Step Guided Troubleshooting',
        timestamp: '02:14 PM EAT',
        detail: 'Guided customer through battery reseating and code 56 signal handshake command.',
        completed: true
      },
      {
        title: 'Prepaid Token Successfully Accepted',
        timestamp: '02:19 PM EAT',
        detail: 'Customer confirmed 20-digit token accepted; 120.5 kWh added to balance.',
        completed: true
      },
      {
        title: 'Case Closed with Energy Saving Guidance',
        timestamp: '02:22 PM EAT',
        detail: 'Shared guidance on avoiding tier transition over 200 kWh.',
        completed: true
      }
    ],
    resolutionTime: '17 minutes',
    csatRating: '5 / 5 Stars',
    agentNotes: 'Handled by Zekarias Zenebe Ababu. First Contact Resolution (FCR) achieved via phone.'
  },
  {
    id: 'CBE-CS-8390',
    service: 'Commercial Bank of Ethiopia',
    subject: 'Inter-Branch Cash Transfer Ledger Verification',
    customer: 'Ato Yohannes Bekele',
    location: 'Tulu Awulia Branch, Ethiopia',
    priority: 'Normal',
    status: 'Resolved',
    stages: [
      {
        title: 'Branch Client Welcomed & Kebele ID Verified',
        timestamp: '09:40 AM EAT',
        detail: 'Assisted customer inquiring about delayed mobile banking transfer alert.',
        completed: true
      },
      {
        title: 'Core Banking Journal Cross-Check',
        timestamp: '09:44 AM EAT',
        detail: 'Verified journal sequence #TXN-8820; transfer was settled to beneficiary branch.',
        completed: true
      },
      {
        title: 'Receipt Stamped & Direct Reassurance',
        timestamp: '09:48 AM EAT',
        detail: 'Printed official stamped transaction receipt verifying credit of funds.',
        completed: true
      },
      {
        title: 'SMS Gateway Confirmation Re-triggered',
        timestamp: '09:51 AM EAT',
        detail: 'Customer received instant automated delivery notification on mobile handset.',
        completed: true
      },
      {
        title: 'Case Concluded with Etiquette',
        timestamp: '09:53 AM EAT',
        detail: 'Guided customer to teller queue for remaining statement requests.',
        completed: true
      }
    ],
    resolutionTime: '13 minutes',
    csatRating: '5 / 5 Stars',
    agentNotes: 'Internship Service by Zekarias Zenebe Ababu. Strictly adhered to banking confidentiality standards.'
  }
];

export const TicketTrackerModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose
}) => {
  const [searchInput, setSearchInput] = useState('');
  const [activeTicket, setActiveTicket] = useState<Ticket>(SAMPLE_TICKETS[0]);
  const [searchFeedback, setSearchFeedback] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = searchInput.trim().toUpperCase();
    const found = SAMPLE_TICKETS.find(t => t.id.toUpperCase() === clean);
    if (found) {
      setActiveTicket(found);
      setSearchFeedback(null);
    } else {
      setSearchFeedback(`Ticket "${searchInput}" not found. Select one of the verified sample tickets below.`);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-[#0B111E] border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden my-auto text-slate-100">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-[#080C14]">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-[#59A650]/10 text-[#59A650] border border-[#59A650]/30">
              <Search className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white tracking-wide">
                Customer Case & Ticket Lifecycle Tracker
              </h3>
              <p className="text-xs text-slate-400">
                Interactive audit trail of customer grievances, technical dispatches, and confirmed resolutions
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

        {/* Search Bar & Sample Tickets Pills */}
        <div className="p-5 bg-[#080C14]/60 border-b border-slate-800 space-y-3">
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-500" />
              <input
                type="text"
                placeholder="Enter Ticket ID (e.g. EEU-ADD-4921 or EEU-MTR-1082)..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#0E1726] border border-slate-700 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#59A650]"
              />
            </div>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-[#59A650] text-slate-950 font-bold text-xs hover:bg-[#6fbf65] transition-colors cursor-pointer"
            >
              Track Case
            </button>
          </form>

          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="text-slate-400">Quick Test Cases:</span>
            {SAMPLE_TICKETS.map(t => (
              <button
                key={t.id}
                onClick={() => {
                  setActiveTicket(t);
                  setSearchInput(t.id);
                  setSearchFeedback(null);
                }}
                className={`px-2.5 py-1 rounded-lg font-mono text-xs font-semibold transition-all cursor-pointer ${
                  activeTicket.id === t.id
                    ? 'bg-[#F4984A] text-slate-950'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {t.id} ({t.service.includes('EEU') ? 'EEU' : 'CBE'})
              </button>
            ))}
          </div>

          {searchFeedback && (
            <p className="text-xs text-rose-400">{searchFeedback}</p>
          )}
        </div>

        {/* Ticket Details Body */}
        <div className="p-6 space-y-6 max-h-[72vh] overflow-y-auto">
          
          {/* Ticket Metadata Card */}
          <div className="p-5 rounded-2xl bg-[#0E1726] border border-slate-800 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-sm font-bold text-[#F4984A]">{activeTicket.id}</span>
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#59A650]/20 text-[#59A650] border border-[#59A650]/30 font-bold">
                    {activeTicket.status}
                  </span>
                </div>
                <h4 className="text-base font-bold text-white mt-1">{activeTicket.subject}</h4>
              </div>

              <div className="text-xs text-slate-400 space-y-1 sm:text-right">
                <span className="block font-semibold text-white">{activeTicket.service}</span>
                <span className="flex items-center sm:justify-end gap-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-500" />
                  {activeTicket.location}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-[#080C14] border border-slate-800">
                <span className="text-slate-400 block mb-0.5">Affected Customer:</span>
                <span className="font-semibold text-white">{activeTicket.customer}</span>
              </div>
              <div className="p-3 rounded-xl bg-[#080C14] border border-slate-800">
                <span className="text-slate-400 block mb-0.5">Total Resolution Time:</span>
                <span className="font-semibold text-[#59A650]">{activeTicket.resolutionTime}</span>
              </div>
              <div className="p-3 rounded-xl bg-[#080C14] border border-slate-800">
                <span className="text-slate-400 block mb-0.5">Verified CSAT Rating:</span>
                <span className="font-semibold text-[#F4984A]">{activeTicket.csatRating}</span>
              </div>
            </div>
          </div>

          {/* 5-Step Visual Lifecycle Timeline */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase font-bold text-slate-400 tracking-wider">
              Service Resolution Lifecycle & Audit Trail
            </h4>

            <div className="relative border-l-2 border-[#59A650]/60 ml-4 pl-6 space-y-6">
              {activeTicket.stages.map((stage, idx) => (
                <div key={idx} className="relative">
                  {/* Node icon */}
                  <div className="absolute -left-[31px] top-0.5 w-4 h-4 rounded-full bg-[#59A650] border-2 border-[#0B111E] flex items-center justify-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-950" />
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-white">{stage.title}</span>
                      <span className="text-[10px] font-mono text-[#F4984A] bg-[#080C14] px-2 py-0.5 rounded border border-slate-800">
                        {stage.timestamp}
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {stage.detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Support Officer Note */}
          <div className="p-4 rounded-xl bg-blue-950/20 border border-blue-900/30 text-xs text-slate-300 flex items-start gap-2.5">
            <UserCheck className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-blue-300 block mb-0.5">Support Officer Verification Note:</span>
              {activeTicket.agentNotes}
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-[#080C14] border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <span>Customer Case Transparency Protocol</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-medium transition-colors"
          >
            Close Tracker
          </button>
        </div>
      </div>
    </div>
  );
};
