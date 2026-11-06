/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Award, 
  Star, 
  ThumbsUp, 
  HeartHandshake, 
  CheckCircle2, 
  Plus, 
  Building2, 
  MessageSquare,
  Sparkles,
  Send
} from 'lucide-react';

interface Commendation {
  id: string;
  author: string;
  role: string;
  organization: string;
  date: string;
  rating: number;
  comment: string;
  verified: boolean;
}

const INITIAL_COMMENDATIONS: Commendation[] = [
  {
    id: 'comm-1',
    author: 'Customer Operations Supervisor',
    role: 'Senior Support Operations Lead',
    organization: 'Ethiopian Electric Utility (EEU)',
    date: 'Verified Institutional Endorsement',
    rating: 5,
    comment: '“Zekarias demonstrates exceptional poise and patient empathy during high-stress customer calls. His proactive communication during feeder maintenance and thorough logging in our CRM system consistently sets a high standard for our front-line team.”',
    verified: true
  },
  {
    id: 'comm-2',
    author: 'Branch Customer Service Manager',
    role: 'Branch Operations Lead',
    organization: 'Commercial Bank of Ethiopia (Tulu Awulia)',
    date: 'Internship Evaluation',
    rating: 5,
    comment: '“During his customer service internship at our Tulu Awulia branch, Zekarias earned the praise of clients and staff alike. He adhered rigorously to banking confidentiality, guided branch visitors efficiently, and handled inquiries with remarkable courtesy.”',
    verified: true
  },
  {
    id: 'comm-3',
    author: 'Ato Daniel Girma',
    role: 'Managing Director',
    organization: 'Bole Commercial Client',
    date: 'Customer Service Resolution',
    rating: 5,
    comment: '“When our facility experienced an unscheduled transformer trip, Zekarias didn’t just answer the call—he kept us informed with SMS updates every 20 minutes until the dispatch crew restored full voltage. Outstanding professionalism.”',
    verified: true
  }
];

export const CsatWall: React.FC = () => {
  const [commendations] = useState<Commendation[]>(INITIAL_COMMENDATIONS);

  return (
    <section id="csat-metrics" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <h2 className="text-4xl font-black text-slate-900 tracking-tight">Customer Satisfaction</h2>
          <p className="text-slate-600 leading-relaxed">
            Verified feedback from partners and clients.
          </p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { label: 'CSAT Score', value: '98.4%' },
            { label: 'First Contact Res', value: '94.2%' },
            { label: 'Avg Triage', value: '<15m' },
            { label: 'SLA Adherence', value: '100%' }
          ].map((stat, idx) => (
            <div key={idx} className="text-center space-y-2">
              <div className="text-4xl font-black text-slate-900 tabular-nums">{stat.value}</div>
              <div className="text-xs font-bold uppercase text-slate-500 tracking-wider">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Commendations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {commendations.map((item) => (
            <div
              key={item.id}
              className="p-8 rounded-3xl bg-[#f8fafc] border border-slate-100 shadow-sm space-y-4"
            >
              <p className="text-sm text-slate-600 italic leading-relaxed">
                {item.comment}
              </p>
              <div className="pt-4 border-t border-slate-200">
                <span className="font-bold text-slate-900 block">{item.author}</span>
                <span className="text-xs text-purple-600 font-semibold">{item.role}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
