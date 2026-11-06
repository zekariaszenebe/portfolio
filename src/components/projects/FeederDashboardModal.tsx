/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  X, 
  Activity, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  Search, 
  Send, 
  RefreshCw,
  Zap,
  Info
} from 'lucide-react';

interface Feeder {
  id: string;
  name: string;
  substation: string;
  zone: string;
  status: 'Operational' | 'Under Maintenance' | 'Unscheduled Outage';
  loadPercentage: number;
  customersCount: number;
  lastIncident?: string;
  estimatedRestoration?: string;
  technicianTeam?: string;
}

const INITIAL_FEEDERS: Feeder[] = [
  {
    id: "FDR-AA-01",
    name: "Bole Medhanialem Feeder 04",
    substation: "Bole Substation 132/15kV",
    zone: "Bole Sub-city, Addis Ababa",
    status: "Operational",
    loadPercentage: 68,
    customersCount: 4250,
    lastIncident: "None in past 72 hrs",
    technicianTeam: "Dispatch Unit Delta-1"
  },
  {
    id: "FDR-AA-02",
    name: "Kazanchis Commercial Feeder 02",
    substation: "Kirkos Substation 132/15kV",
    zone: "Kirkos Sub-city, Addis Ababa",
    status: "Under Maintenance",
    loadPercentage: 0,
    customersCount: 2890,
    lastIncident: "Transformer scheduled maintenance",
    estimatedRestoration: "Today at 04:30 PM (EAT)",
    technicianTeam: "EEU Substation Crew 08"
  },
  {
    id: "FDR-AA-03",
    name: "Piazza Central Feeder 01",
    substation: "Arada Substation 66/15kV",
    zone: "Arada Sub-city, Addis Ababa",
    status: "Operational",
    loadPercentage: 81,
    customersCount: 3640,
    lastIncident: "Cleared 18 hrs ago",
    technicianTeam: "Dispatch Unit Alpha-2"
  },
  {
    id: "FDR-AA-04",
    name: "Megenagna Hub Feeder 03",
    substation: "Yeka Substation 132/15kV",
    zone: "Yeka Sub-city, Addis Ababa",
    status: "Unscheduled Outage",
    loadPercentage: 0,
    customersCount: 5120,
    lastIncident: "High voltage line trip detected",
    estimatedRestoration: "Est. within 1 hr 45 min",
    technicianTeam: "Emergency Dispatch Team 03"
  },
  {
    id: "FDR-AA-05",
    name: "Gotera Industrial Feeder 05",
    substation: "Nifas Silk Substation 132/15kV",
    zone: "Nifas Silk Lafto, Addis Ababa",
    status: "Operational",
    loadPercentage: 74,
    customersCount: 1980,
    lastIncident: "Stable past 5 days",
    technicianTeam: "Maintenance Crew Gamma"
  }
];

export const FeederDashboardModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose
}) => {
  const [feeders, setFeeders] = useState<Feeder[]>(INITIAL_FEEDERS);
  const [searchAccount, setSearchAccount] = useState('');
  const [searchResult, setSearchResult] = useState<string | null>(null);
  const [selectedFeeder, setSelectedFeeder] = useState<Feeder | null>(INITIAL_FEEDERS[3]);
  const [alertSent, setAlertSent] = useState(false);
  const [filterZone, setFilterZone] = useState('All');

  if (!isOpen) return null;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchAccount.trim()) return;

    // Simulate account lookup mapped to feeder
    const hash = searchAccount.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const assignedFeeder = feeders[hash % feeders.length];
    
    setSelectedFeeder(assignedFeeder);
    setSearchResult(`Account #${searchAccount.trim()} is connected to ${assignedFeeder.name} (${assignedFeeder.substation}). Current status: ${assignedFeeder.status}.`);
  };

  const toggleFeederStatus = (id: string) => {
    setFeeders(prev => prev.map(f => {
      if (f.id === id) {
        const nextStatus: Feeder['status'] = 
          f.status === 'Operational' ? 'Under Maintenance' :
          f.status === 'Under Maintenance' ? 'Unscheduled Outage' : 'Operational';
        return {
          ...f,
          status: nextStatus,
          loadPercentage: nextStatus === 'Operational' ? 72 : 0,
          estimatedRestoration: nextStatus === 'Operational' ? undefined : 'In progress (approx. 2 hrs)'
        };
      }
      return f;
    }));
  };

  const handleSendSmsAlert = () => {
    setAlertSent(true);
    setTimeout(() => setAlertSent(false), 4000);
  };

  const filteredFeeders = filterZone === 'All' 
    ? feeders 
    : feeders.filter(f => f.zone.toLowerCase().includes(filterZone.toLowerCase()));

  const operationalCount = feeders.filter(f => f.status === 'Operational').length;
  const outageCount = feeders.filter(f => f.status !== 'Operational').length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl bg-[#0B111E] border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden my-auto text-slate-100">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-[#080C14]">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-[#F4984A]/10 text-[#F4984A] border border-[#F4984A]/30">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-white tracking-wide">
                  EEU Feeder Interruption & Customer Inquiries Dashboard
                </h3>
                <span className="px-2 py-0.5 text-xs font-semibold rounded bg-[#59A650]/20 text-[#59A650] border border-[#59A650]/30">
                  Live Prototype
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Interactive support officer tool for Ethiopian Electric Utility grid monitoring & client notifications
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            title="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Dashboard Body */}
        <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          
          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-[#0E1726] border border-slate-800">
              <span className="text-xs text-slate-400">Total Monitored Feeders</span>
              <p className="text-2xl font-black text-white mt-1">{feeders.length}</p>
              <span className="text-[11px] text-slate-500">Addis Ababa Metropolitan</span>
            </div>
            <div className="p-4 rounded-xl bg-[#0E1726] border border-slate-800">
              <span className="text-xs text-slate-400">Operational Lines</span>
              <p className="text-2xl font-black text-[#59A650] mt-1">{operationalCount}</p>
              <span className="text-[11px] text-[#59A650]/80">Normal distribution</span>
            </div>
            <div className="p-4 rounded-xl bg-[#0E1726] border border-slate-800">
              <span className="text-xs text-slate-400">Active Outages / Work</span>
              <p className="text-2xl font-black text-[#F4984A] mt-1">{outageCount}</p>
              <span className="text-[11px] text-[#F4984A]/80">Attention required</span>
            </div>
            <div className="p-4 rounded-xl bg-[#0E1726] border border-slate-800">
              <span className="text-xs text-slate-400">Affected Customers</span>
              <p className="text-2xl font-black text-white mt-1">
                {feeders.filter(f => f.status !== 'Operational').reduce((acc, curr) => acc + curr.customersCount, 0).toLocaleString()}
              </p>
              <span className="text-[11px] text-slate-500">Informed via SMS dispatch</span>
            </div>
          </div>

          {/* Interactive Customer Inquiry Lookup Bar */}
          <div className="p-4 rounded-xl bg-[#0E1726] border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-white flex items-center gap-2">
                <Search className="w-4 h-4 text-[#F4984A]" />
                Customer Inquiry & Premise Outage Query
              </span>
              <span className="text-xs text-slate-400">Try testing with: 100429 or 209841</span>
            </div>
            <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-2">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Enter EEU Customer Account Number or Meter ID..."
                  value={searchAccount}
                  onChange={(e) => setSearchAccount(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg bg-[#080C14] border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#F4984A]"
                />
              </div>
              <button
                type="submit"
                className="px-5 py-2.5 rounded-lg bg-[#F4984A] text-slate-950 font-bold text-sm hover:bg-[#ffaa5e] transition-all flex items-center justify-center gap-2"
              >
                <Search className="w-4 h-4" />
                Query Status
              </button>
            </form>
            {searchResult && (
              <div className="p-3 rounded-lg bg-[#080C14] border border-[#F4984A]/30 text-xs text-slate-200 flex items-start gap-2 animate-in fade-in duration-150">
                <Info className="w-4 h-4 text-[#F4984A] shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-[#F4984A]">EEU System Lookup: </span>
                  {searchResult}
                </div>
              </div>
            )}
          </div>

          {/* Grid of Feeders & Feeder Detail Inspector */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Feeder List (Left) */}
            <div className="lg:col-span-7 space-y-3">
              <div className="flex items-center justify-between mb-1">
                <h4 className="text-sm font-bold text-slate-200">Addis Ababa Distribution Lines</h4>
                <div className="flex gap-1.5 text-xs">
                  {['All', 'Bole', 'Kirkos', 'Arada', 'Yeka'].map(z => (
                    <button
                      key={z}
                      onClick={() => setFilterZone(z)}
                      className={`px-2.5 py-1 rounded text-xs transition-colors ${
                        filterZone === z 
                          ? 'bg-[#F4984A] text-slate-950 font-bold' 
                          : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                      }`}
                    >
                      {z}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2.5">
                {filteredFeeders.map((feeder) => {
                  const isSelected = selectedFeeder?.id === feeder.id;
                  const isOp = feeder.status === 'Operational';
                  const isMaint = feeder.status === 'Under Maintenance';
                  
                  return (
                    <div 
                      key={feeder.id}
                      onClick={() => setSelectedFeeder(feeder)}
                      className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                        isSelected 
                          ? 'bg-[#111C30] border-[#F4984A]' 
                          : 'bg-[#0E1726] border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-mono font-bold text-[#F4984A]">{feeder.id}</span>
                            <h5 className="text-sm font-semibold text-white">{feeder.name}</h5>
                          </div>
                          <div className="flex items-center gap-3 text-xs text-slate-400">
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3.5 h-3.5 text-slate-500" />
                              {feeder.zone}
                            </span>
                            <span>•</span>
                            <span>{feeder.substation}</span>
                          </div>
                        </div>

                        <div className="text-right shrink-0">
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${
                            isOp 
                              ? 'bg-[#59A650]/20 text-[#59A650] border border-[#59A650]/30' 
                              : isMaint 
                              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                              : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                          }`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${isOp ? 'bg-[#59A650]' : isMaint ? 'bg-amber-400' : 'bg-rose-500'}`} />
                            {feeder.status}
                          </span>
                          <div className="text-[11px] text-slate-400 mt-1">
                            {feeder.customersCount.toLocaleString()} clients
                          </div>
                        </div>
                      </div>

                      {/* Load Bar */}
                      <div className="mt-2.5 pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs">
                        <span className="text-slate-400">Current Feeder Load:</span>
                        <div className="flex items-center gap-2">
                          <div className="w-24 h-1.5 rounded-full bg-slate-800 overflow-hidden">
                            <div 
                              className={`h-full rounded-full ${isOp ? 'bg-[#59A650]' : 'bg-rose-500'}`}
                              style={{ width: `${feeder.loadPercentage}%` }}
                            />
                          </div>
                          <span className="font-mono text-xs text-white">{feeder.loadPercentage}%</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Feeder Detail & Support Actions Panel (Right) */}
            <div className="lg:col-span-5 bg-[#0E1726] border border-slate-800 rounded-xl p-5 space-y-4">
              {selectedFeeder ? (
                <>
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                    <div>
                      <span className="text-xs text-slate-400 uppercase tracking-wider">Active Inspector</span>
                      <h4 className="text-base font-bold text-white">{selectedFeeder.name}</h4>
                    </div>
                    <button
                      onClick={() => toggleFeederStatus(selectedFeeder.id)}
                      className="px-2.5 py-1 text-xs rounded bg-slate-800 text-slate-200 hover:bg-slate-700 border border-slate-700 flex items-center gap-1.5"
                      title="Simulate outage or restoration"
                    >
                      <RefreshCw className="w-3 h-3 text-[#F4984A]" />
                      Simulate Status
                    </button>
                  </div>

                  <div className="space-y-2.5 text-xs">
                    <div className="flex justify-between py-1.5 border-b border-slate-800/60">
                      <span className="text-slate-400">Feeder ID:</span>
                      <span className="font-mono text-white font-semibold">{selectedFeeder.id}</span>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-slate-800/60">
                      <span className="text-slate-400">Substation:</span>
                      <span className="text-white text-right">{selectedFeeder.substation}</span>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-slate-800/60">
                      <span className="text-slate-400">Location:</span>
                      <span className="text-white">{selectedFeeder.zone}</span>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-slate-800/60">
                      <span className="text-slate-400">Assigned Crew:</span>
                      <span className="text-white font-semibold">{selectedFeeder.technicianTeam}</span>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-slate-800/60">
                      <span className="text-slate-400">Status & Diagnosis:</span>
                      <span className="font-semibold text-[#F4984A]">{selectedFeeder.lastIncident}</span>
                    </div>
                    {selectedFeeder.estimatedRestoration && (
                      <div className="flex justify-between py-1.5 border-b border-slate-800/60 bg-amber-950/20 px-2 rounded">
                        <span className="text-amber-400 font-medium flex items-center gap-1">
                          <Clock className="w-3 h-3" /> Est. Restoration:
                        </span>
                        <span className="text-amber-300 font-bold">{selectedFeeder.estimatedRestoration}</span>
                      </div>
                    )}
                  </div>

                  {/* Customer Communication Dispatch Box */}
                  <div className="p-3.5 rounded-lg bg-[#080C14] border border-slate-800 space-y-2.5">
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-white">
                      <Send className="w-3.5 h-3.5 text-[#59A650]" />
                      Draft Customer SMS / Dispatch Notice
                    </div>
                    <p className="text-[11px] text-slate-400 leading-relaxed font-mono bg-slate-900/80 p-2.5 rounded border border-slate-800">
                      {`[EEU Customer Notice]: Dear Valued Customer in ${selectedFeeder.zone}, ${selectedFeeder.name} is currently ${selectedFeeder.status}. ${selectedFeeder.estimatedRestoration ? `Restoration target: ${selectedFeeder.estimatedRestoration}.` : 'Technical team is monitoring stability.'} Thank you for your patience.`}
                    </p>
                    <button
                      onClick={handleSendSmsAlert}
                      disabled={alertSent}
                      className={`w-full py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                        alertSent 
                          ? 'bg-[#59A650] text-slate-950' 
                          : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
                      }`}
                    >
                      {alertSent ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Simulated Dispatch Broadcast Sent!
                        </>
                      ) : (
                        <>
                          <Zap className="w-3.5 h-3.5 text-[#F4984A]" />
                          Broadcast Simulated Outage SMS to Customers
                        </>
                      )}
                    </button>
                  </div>

                  <div className="p-3 rounded-lg bg-blue-950/20 border border-blue-900/30 text-[11px] text-slate-400 leading-relaxed">
                    <span className="text-blue-300 font-semibold block mb-0.5">Professional Portfolio Note:</span>
                    Created by Zekarias Zenebe Ababu to illustrate how front-line customer support officers at Ethiopian Electric Utility leverage data clarity to manage customer inquiries and de-escalate crisis calls during service interruptions.
                  </div>
                </>
              ) : (
                <div className="text-center py-12 text-slate-400 text-xs">
                  Select a distribution line to inspect details
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-[#080C14] border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <span>Project by Zekarias Zenebe Ababu | EEU Junior Customer Support Officer</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-medium transition-colors"
          >
            Close Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};
