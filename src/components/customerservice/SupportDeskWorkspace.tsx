/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Headphones, 
  Clock, 
  Calendar, 
  CheckCircle2, 
  Send, 
  ShieldCheck, 
  MessageSquare, 
  Award, 
  AlertTriangle,
  Play,
  RotateCcw,
  Sparkles,
  Search,
  BookOpen
} from 'lucide-react';

interface Scenario {
  id: string;
  institution: 'Ethiopian Electric Utility (EEU)' | 'Commercial Bank of Ethiopia (CBE)';
  title: string;
  customerName: string;
  customerMood: 'Distressed & Urgent' | 'Frustrated' | 'Confused';
  issueDescription: string;
  empathyOptions: {
    id: string;
    text: string;
    isOptimal: boolean;
    feedback: string;
    csatImpact: number;
  }[];
  diagnosticAction: string;
  diagnosticResult: string;
  resolutionOptions: {
    id: string;
    text: string;
    isOptimal: boolean;
    smsNotice: string;
    fcrScore: number;
  }[];
}

const SCENARIOS: Scenario[] = [
  {
    id: 'eeu-outage',
    institution: 'Ethiopian Electric Utility (EEU)',
    title: 'Emergency Power Interruption at Commercial Facility',
    customerName: 'Ato Daniel Girma (Bole Sub-city)',
    customerMood: 'Distressed & Urgent',
    issueDescription: '“My commercial bakery refrigeration has been completely without electricity for 45 minutes! Our morning inventory will spoil if this feeder is not restored. Why was there no prior announcement?”',
    empathyOptions: [
      {
        id: 'opt-1a',
        text: '“I understand the critical urgency of your inventory, Ato Daniel. Let me immediately cross-reference your service point against our live feeder telemetry so we can diagnose the outage cause.”',
        isOptimal: true,
        feedback: 'Excellent de-escalation: Validates customer distress with personal empathy and transitions promptly into operational investigation.',
        csatImpact: 98
      },
      {
        id: 'opt-1b',
        text: '“Outages happen across Addis Ababa due to maintenance. You need to wait until the line crew finishes.”',
        isOptimal: false,
        feedback: 'Ineffective: Dismissive tone escalates customer anxiety and fails EEU customer service standards.',
        csatImpact: 52
      }
    ],
    diagnosticAction: 'Query EEU Bole Substation 132/15kV Feeder 04 Telemetry',
    diagnosticResult: 'Telemetry detects an unscheduled tripping on Feeder 04 due to heavy rainfall transformer overload. Mobile Dispatch Crew Delta-1 is currently on-site with restoration estimated in 35 minutes.',
    resolutionOptions: [
      {
        id: 'res-1a',
        text: 'Log Priority Emergency Ticket #EEU-BOLE-884, link customer phone for automated dispatch progress SMS, and notify Substation Supervisor.',
        isOptimal: true,
        smsNotice: '[EEU Notice]: Ato Daniel, emergency ticket #EEU-BOLE-884 is active for Feeder 04. Crew Delta-1 is replacing the affected fuse on-site. Target restoration: 35 minutes. Thank you for your patience.',
        fcrScore: 100
      },
      {
        id: 'res-1b',
        text: 'Tell customer to call back in an hour if the lights are still not on.',
        isOptimal: false,
        smsNotice: 'No SMS notice generated.',
        fcrScore: 30
      }
    ]
  },
  {
    id: 'eeu-smart-meter',
    institution: 'Ethiopian Electric Utility (EEU)',
    title: 'Smart Meter Progressive Tariff Consumption Dispute',
    customerName: 'W/ro Selamawit Tadesse (Kirkos)',
    customerMood: 'Frustrated',
    issueDescription: '“I bought a 500 ETB prepaid token yesterday for my smart meter, but it gave me fewer kWh units than last month! Is your meter deducting extra fees illegally?”',
    empathyOptions: [
      {
        id: 'opt-2a',
        text: '“Thank you for raising this, W/ro Selamawit. Let me pull up your monthly consumption tier to show you exactly how the progressive tariff blocks and service charges were calculated for this recharge.”',
        isOptimal: true,
        feedback: 'Optimal response: Transparent, respectful, and initiates clear tariff education without defensive jargon.',
        csatImpact: 96
      },
      {
        id: 'opt-2b',
        text: '“The rates are set by the government, not by me. Whatever units the machine gives is what you get.”',
        isOptimal: false,
        feedback: 'Poor response: Creates customer mistrust and misses the opportunity for billing education.',
        csatImpact: 45
      }
    ],
    diagnosticAction: 'Execute Smart Meter Tariff Tier Breakdown (EEU Billing Matrix)',
    diagnosticResult: 'Customer previously reached 285 kWh in the current billing cycle. The recent token moved usage from Block 2 (1.15 ETB/kWh) into Block 3 (1.70 ETB/kWh) plus statutory 15% VAT, resulting in fewer units per 500 ETB.',
    resolutionOptions: [
      {
        id: 'res-2a',
        text: 'Provide an itemized breakdown sheet, explain how graduated consumption tiers reset on the 1st of each Ethiopian calendar month, and offer appliance efficiency tips.',
        isOptimal: true,
        smsNotice: '[EEU Transparency]: W/ro Selamawit, your itemized tariff summary for Account #100429 shows transition to Tier 3. Your tier baseline resets on the 1st. View breakdown via smart meter customer portal.',
        fcrScore: 98
      },
      {
        id: 'res-2b',
        text: 'Advise customer to file a formal dispute at the regional branch.',
        isOptimal: false,
        smsNotice: 'Dispute ticket filed.',
        fcrScore: 40
      }
    ]
  },
  {
    id: 'cbe-bank-service',
    institution: 'Commercial Bank of Ethiopia (CBE)',
    title: 'Customer Service Slip & Account Query Support',
    customerName: 'Ato Yohannes Bekele (Tulu Awulia)',
    customerMood: 'Confused',
    issueDescription: '“I made an inter-branch transfer this morning, but my mobile banking confirmation has not arrived. I need to verify if the payment was securely processed.”',
    empathyOptions: [
      {
        id: 'opt-3a',
        text: '“I would be glad to assist you in verifying your transaction, Ato Yohannes. Let us check your branch transaction journal and confirm the settlement status right away.”',
        isOptimal: true,
        feedback: 'Reassuring and compliant with banking confidentiality and customer service protocol.',
        csatImpact: 99
      },
      {
        id: 'opt-3b',
        text: '“You should have received an SMS. Check your phone settings first.”',
        isOptimal: false,
        feedback: 'Unhelpful: Dismisses customer concern and does not verify ledger status.',
        csatImpact: 50
      }
    ],
    diagnosticAction: 'Cross-reference Branch Core Banking Journal (Tulu Awulia)',
    diagnosticResult: 'Transaction #TXN-8820 was successfully posted and settled at 10:14 AM. SMS gateway dispatch had a temporary network delay.',
    resolutionOptions: [
      {
        id: 'res-3a',
        text: 'Print and stamp official verification receipt, confirm recipient balance credit, and re-trigger instant SMS confirmation to customer.',
        isOptimal: true,
        smsNotice: '[CBE Alert]: Dear Customer, transfer of ETB to beneficiary has been verified as Settled. Ref: #TXN-8820. Thank you for banking with CBE.',
        fcrScore: 100
      },
      {
        id: 'res-3b',
        text: 'Tell customer the money is probably safe and to check tomorrow.',
        isOptimal: false,
        smsNotice: 'None',
        fcrScore: 35
      }
    ]
  }
];

export const SupportDeskWorkspace: React.FC<{
  onOpenKnowledgeBase: () => void;
  onOpenTicketTracker: () => void;
}> = ({ onOpenKnowledgeBase, onOpenTicketTracker }) => {
  // Live Addis Ababa Time (UTC+3)
  const [eatTime, setEatTime] = useState('');
  const [isOnDuty, setIsOnDuty] = useState(true);

  // Simulator State
  const [selectedScenario, setSelectedScenario] = useState<Scenario>(SCENARIOS[0]);
  const [step, setStep] = useState<number>(1);
  const [selectedEmpathy, setSelectedEmpathy] = useState<string | null>(null);
  const [diagnosticRun, setDiagnosticRun] = useState(false);
  const [selectedResolution, setSelectedResolution] = useState<string | null>(null);
  const [simResults, setSimResults] = useState<{
    csat: number;
    fcr: number;
    message: string;
  } | null>(null);

  // Booking / Schedule Modal State
  const [bookingOpen, setBookingOpen] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookingData, setBookingData] = useState({
    name: '',
    organization: '',
    role: '',
    slot: 'Tomorrow at 10:00 AM (EAT)',
    notes: ''
  });

  // Keep Addis Ababa time updated
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Addis Ababa is UTC+3
      const eatDate = new Date(now.toLocaleString('en-US', { timeZone: 'Africa/Addis_Ababa' }));
      const hours = eatDate.getHours();
      const minutes = eatDate.getMinutes().toString().padStart(2, '0');
      const seconds = eatDate.getSeconds().toString().padStart(2, '0');
      const ampm = hours >= 12 ? 'PM' : 'AM';
      const formattedHours = (hours % 12 || 12).toString().padStart(2, '0');
      
      setEatTime(`${formattedHours}:${minutes}:${seconds} ${ampm} EAT`);
      
      // Typical office hours: Mon-Sat 8:30 AM - 5:30 PM EAT
      const day = eatDate.getDay(); // 0 = Sun
      const isWorkHours = day !== 0 && (hours >= 8 && (hours < 18 || (hours === 17 && eatDate.getMinutes() <= 30)));
      setIsOnDuty(isWorkHours);
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const resetSimulator = (scenario: Scenario) => {
    setSelectedScenario(scenario);
    setStep(1);
    setSelectedEmpathy(null);
    setDiagnosticRun(false);
    setSelectedResolution(null);
    setSimResults(null);
  };

  const handleEmpathySelect = (id: string) => {
    setSelectedEmpathy(id);
    setTimeout(() => {
      setStep(2);
    }, 400);
  };

  const handleRunDiagnostic = () => {
    setDiagnosticRun(true);
    setTimeout(() => {
      setStep(3);
    }, 500);
  };

  const handleResolutionSelect = (id: string) => {
    setSelectedResolution(id);
    const empathy = selectedScenario.empathyOptions.find(o => o.id === selectedEmpathy);
    const resolution = selectedScenario.resolutionOptions.find(o => o.id === id);

    const csat = empathy ? empathy.csatImpact : 80;
    const fcr = resolution ? resolution.fcrScore : 80;

    setSimResults({
      csat,
      fcr,
      message: resolution?.smsNotice || 'Resolution completed.'
    });
    setStep(4);
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingSuccess(true);
    setTimeout(() => {
      setBookingOpen(false);
      setBookingSuccess(false);
    }, 3500);
  };

  return (
    <section id="support-console" className="py-20 relative bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-700 border border-slate-200">
            <Headphones className="w-3.5 h-3.5" />
            <span>Interactive Customer Service Console</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Customer Support in Action
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Test how Zekarias navigates real-world utility grievances, smart meter disputes, and banking inquiries with structured empathy, operational tools, and CRM resolution.
          </p>
        </div>

        {/* Live Support Availability Banner & Quick Triggers */}
        <div className="mb-10 p-5 rounded-2xl bg-white border border-slate-100 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-4 text-xs">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-100">
              <Clock className="w-4 h-4 text-slate-600" />
              <span className="text-slate-600">Addis Ababa Time:</span>
              <span className="font-mono font-bold text-slate-900 tabular-nums">{eatTime || '09:30:00 AM EAT'}</span>
            </div>

            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-100">
              <span className={`w-2 h-2 rounded-full ${isOnDuty ? 'bg-green-600 animate-pulse' : 'bg-amber-400'}`} />
              <span className="text-slate-900 font-semibold">
                {isOnDuty ? 'On-Duty • Rapid Inquiry Response' : 'Queue Active • Mon-Sat 8:30AM–5:30PM EAT'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2.5 w-full md:w-auto justify-end">
            <button
              onClick={onOpenTicketTracker}
              className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-900 text-xs font-semibold flex items-center gap-1.5 border border-slate-200 transition-colors cursor-pointer"
            >
              <Search className="w-3.5 h-3.5 text-green-700" />
              <span>Track Sample Ticket</span>
            </button>

            <button
              onClick={onOpenKnowledgeBase}
              className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-900 text-xs font-semibold flex items-center gap-1.5 border border-slate-200 transition-colors cursor-pointer"
            >
              <BookOpen className="w-3.5 h-3.5 text-slate-600" />
              <span>Support Knowledge Base</span>
            </button>

            <button
              onClick={() => setBookingOpen(true)}
              className="px-4 py-2 rounded-xl bg-slate-900 text-white font-bold text-xs flex items-center gap-1.5 hover:bg-slate-800 transition-all cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Schedule Call</span>
            </button>
          </div>
        </div>

        {/* Main Interactive Support Simulator Container */}
        <div className="bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-sm">
          
          {/* Console Header Bar */}
          <div className="p-5 sm:p-6 bg-slate-50 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2.5">
                <span className="w-3 h-3 rounded-full bg-green-600" />
                <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-wide">
                  Live Resolution Simulator: Customer Service Desk
                </h3>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Select a scenario below to walk through Zekarias’s 4-step de-escalation & resolution protocol
              </p>
            </div>

            {/* Scenario Selector Tabs */}
            <div className="flex flex-wrap gap-2">
              {SCENARIOS.map((scen) => (
                <button
                  key={scen.id}
                  onClick={() => resetSimulator(scen)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                    selectedScenario.id === scen.id
                      ? 'bg-slate-900 text-white shadow-md'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200 border border-slate-200'
                  }`}
                >
                  {scen.institution.includes('EEU') ? '⚡ EEU: ' : '🏦 CBE: '}
                  {scen.title.split(' ')[0]} {scen.title.split(' ')[1]}
                </button>
              ))}
            </div>
          </div>

          {/* Simulator Body */}
          <div className="p-6 sm:p-8 space-y-8">
            
            {/* Step Progress Bar */}
            <div className="grid grid-cols-4 gap-2">
              {[
                { num: 1, label: 'Empathy & Listening' },
                { num: 2, label: 'System Diagnosis' },
                { num: 3, label: 'CRM Action & Dispatch' },
                { num: 4, label: 'CSAT & Resolution' },
              ].map((s) => (
                <div key={s.num} className="space-y-1.5">
                  <div className="h-1.5 rounded-full bg-slate-100 overflow-hidden">
                    <div 
                      className={`h-full transition-all duration-300 ${
                        step >= s.num ? 'bg-green-600' : 'bg-transparent'
                      }`}
                    />
                  </div>
                  <span className={`text-[11px] font-semibold block truncate ${
                    step >= s.num ? 'text-slate-900' : 'text-slate-400'
                  }`}>
                    {s.num}. {s.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Customer Case Context Card */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-900">{selectedScenario.institution}</span>
                  <span className="text-slate-300">·</span>
                  <span className="text-xs text-slate-900 font-semibold">{selectedScenario.customerName}</span>
                </div>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-100 font-semibold">
                  Mood: {selectedScenario.customerMood}
                </span>
              </div>
              
              <blockquote className="text-sm sm:text-base text-slate-700 italic leading-relaxed font-medium">
                {selectedScenario.issueDescription}
              </blockquote>
            </div>

            {/* STEP 1: EMPATHY & ACTIVE LISTENING */}
            {step === 1 && (
              <div className="space-y-4 animate-in fade-in duration-200">
                <div>
                  <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-slate-100 text-slate-900 text-xs font-black flex items-center justify-center">1</span>
                    Select Professional De-escalation & Empathy Response
                  </h4>
                  <p className="text-xs text-slate-500 mt-0.5">
                    How should the Customer Support Officer reply to de-escalate anxiety and establish rapport?
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedScenario.empathyOptions.map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => handleEmpathySelect(opt.id)}
                      className="p-5 rounded-2xl bg-white hover:bg-slate-50 border border-slate-200 hover:border-slate-300 text-left space-y-2.5 transition-all group cursor-pointer"
                    >
                      <span className="text-xs font-bold text-green-700 block group-hover:text-slate-900 transition-colors">
                        Response Option
                      </span>
                      <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                        {opt.text}
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 2: SYSTEM DIAGNOSIS */}
            {step === 2 && (
              <div className="space-y-4 animate-in fade-in duration-200">
                <div>
                  <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-green-100 text-green-700 text-xs font-black flex items-center justify-center">2</span>
                    Operational Inquiry Investigation
                  </h4>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Query the institutional backend to retrieve factual diagnostic data.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-slate-500">Action: {selectedScenario.diagnosticAction}</span>
                    {!diagnosticRun ? (
                      <button
                        onClick={handleRunDiagnostic}
                        className="px-4 py-2 rounded-xl bg-green-600 text-white font-bold text-xs flex items-center gap-1.5 hover:bg-green-700 transition-colors cursor-pointer"
                      >
                        <Play className="w-3.5 h-3.5 fill-white" />
                        Execute Telemetry Query
                      </button>
                    ) : (
                      <span className="text-xs text-green-700 font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-4 h-4" /> Telemetry Retrieved
                      </span>
                    )}
                  </div>

                  {diagnosticRun && (
                    <div className="p-4 rounded-xl bg-white border border-slate-200 text-xs text-slate-800 leading-relaxed font-mono">
                      <span className="text-slate-900 font-bold block mb-1">SYSTEM OUTPUT:</span>
                      {selectedScenario.diagnosticResult}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* STEP 3: CRM ACTION & DISPATCH */}
            {step === 3 && (
              <div className="space-y-4 animate-in fade-in duration-200">
                <div>
                  <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-slate-100 text-slate-900 text-xs font-black flex items-center justify-center">3</span>
                    Resolution Action & Customer SMS Communication
                  </h4>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Execute the formal CRM workflow and transmit clear client updates.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedScenario.resolutionOptions.map((res) => (
                    <button
                      key={res.id}
                      onClick={() => handleResolutionSelect(res.id)}
                      className="p-5 rounded-2xl bg-white hover:bg-slate-50 border border-slate-200 hover:border-green-200 text-left space-y-2.5 transition-all group cursor-pointer"
                    >
                      <span className="text-xs font-bold text-slate-900 block">
                        Support Workflow Action
                      </span>
                      <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                        {res.text}
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 4: CSAT & RESOLUTION OUTCOME */}
            {step === 4 && simResults && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <div className="p-6 rounded-2xl bg-slate-50 border border-green-200 space-y-6 shadow-sm">
                  
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
                    <div>
                      <span className="text-xs uppercase font-bold text-green-700 tracking-wider">Resolution Verified</span>
                      <h4 className="text-xl font-black text-slate-900 mt-0.5">Case Successfully Resolved</h4>
                    </div>

                    <button
                      onClick={() => resetSimulator(selectedScenario)}
                      className="px-4 py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-900 text-xs font-semibold flex items-center gap-1.5 border border-slate-200 self-start sm:self-auto cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Try Another Scenario</span>
                    </button>
                  </div>

                  {/* Customer Support Scorecard */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="p-4 rounded-xl bg-white border border-slate-200">
                      <span className="text-xs text-slate-500">Customer Satisfaction (CSAT)</span>
                      <div className="text-2xl font-black text-green-700 mt-1 tabular-nums">{simResults.csat}%</div>
                      <span className="text-[11px] text-slate-400">Calculated on empathy & clarity</span>
                    </div>

                    <div className="p-4 rounded-xl bg-white border border-slate-200">
                      <span className="text-xs text-slate-500">First Contact Resolution (FCR)</span>
                      <div className="text-2xl font-black text-slate-900 mt-1 tabular-nums">{simResults.fcr}%</div>
                      <span className="text-[11px] text-slate-400">Resolved without re-escalation</span>
                    </div>

                    <div className="p-4 rounded-xl bg-white border border-slate-200">
                      <span className="text-xs text-slate-500">Compliance & CRM Logging</span>
                      <div className="text-2xl font-black text-slate-900 mt-1">100%</div>
                      <span className="text-[11px] text-slate-400">Institutional SLA achieved</span>
                    </div>
                  </div>

                  {/* Dispatched SMS Preview */}
                  <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-2">
                    <span className="text-xs font-semibold text-slate-500 flex items-center gap-1.5">
                      <Send className="w-3.5 h-3.5 text-green-700" /> Dispatched Client Notification SMS:
                    </span>
                    <p className="text-xs font-mono text-slate-800 bg-slate-50 p-3 rounded-lg border border-slate-100 leading-relaxed">
                      {simResults.message}
                    </p>
                  </div>

                </div>
              </div>
            )}

          </div>

        </div>

      </div>

      {/* Schedule Call / Interview Booking Modal */}
      {bookingOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg bg-white border border-slate-100 rounded-2xl p-6 sm:p-8 space-y-6 text-slate-900 my-auto shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Schedule Introduction Call</h3>
                <p className="text-xs text-slate-500">Direct booking with Zekarias Zenebe Ababu (Addis Ababa, EAT)</p>
              </div>
              <button
                onClick={() => setBookingOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-900 hover:bg-slate-100"
              >
                ✕
              </button>
            </div>

            {bookingSuccess ? (
              <div className="p-6 rounded-xl bg-green-50 border border-green-100 text-center space-y-2 animate-in fade-in">
                <CheckCircle2 className="w-8 h-8 text-green-700 mx-auto" />
                <h4 className="text-base font-bold text-slate-900">Booking Request Dispatched</h4>
                <p className="text-xs text-slate-600">
                  Zekarias has received your interview slot request and will confirm via WhatsApp/Email promptly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleBookingSubmit} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs text-slate-600 font-semibold">Your Name</label>
                  <input
                    type="text"
                    required
                    value={bookingData.name}
                    onChange={(e) => setBookingData({ ...bookingData, name: e.target.value })}
                    placeholder="e.g., Talent Acquisition Manager"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-900"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-slate-600 font-semibold">Organization / Company</label>
                  <input
                    type="text"
                    required
                    value={bookingData.organization}
                    onChange={(e) => setBookingData({ ...bookingData, organization: e.target.value })}
                    placeholder="e.g., Commercial Bank / Enterprise Utility"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-900"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-slate-600 font-semibold">Preferred Meeting Slot (EAT)</label>
                  <select
                    value={bookingData.slot}
                    onChange={(e) => setBookingData({ ...bookingData, slot: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-900"
                  >
                    <option value="Tomorrow at 10:00 AM (EAT)">Tomorrow at 10:00 AM (EAT / UTC+3)</option>
                    <option value="Tomorrow at 02:30 PM (EAT)">Tomorrow at 02:30 PM (EAT / UTC+3)</option>
                    <option value="Thursday at 11:00 AM (EAT)">Thursday at 11:00 AM (EAT / UTC+3)</option>
                    <option value="Friday at 03:00 PM (EAT)">Friday at 03:00 PM (EAT / UTC+3)</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-slate-600 font-semibold">Topic / Role Details</label>
                  <textarea
                    rows={3}
                    value={bookingData.notes}
                    onChange={(e) => setBookingData({ ...bookingData, notes: e.target.value })}
                    placeholder="Briefly describe the customer service or management role you'd like to discuss..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-900"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-slate-900 text-white font-bold text-xs flex items-center justify-center gap-2 hover:bg-slate-800 cursor-pointer"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Confirm Introduction Request</span>
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
