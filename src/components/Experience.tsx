/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Briefcase, 
  Building2, 
  MapPin, 
  Calendar, 
  CheckCircle2, 
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { Experience } from '../types/portfolio';

interface ExperienceProps {
  experiences: Experience[];
}

export const ExperienceSection: React.FC<ExperienceProps> = ({ experiences }) => {
  return (
    <section id="experience" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <h2 className="text-4xl font-black text-slate-900 tracking-tight">Work Experience</h2>
          <p className="text-slate-600 leading-relaxed">
            Hands-on experience in customer support and operational assistance.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative border-l-2 border-slate-200 ml-6 pl-8 space-y-12">
          {experiences.map((exp, idx) => (
            <div key={exp.id || idx} className="relative">
              <div className="absolute -left-[41px] top-0 w-6 h-6 rounded-full bg-[#000000] border-4 border-white shadow-sm" />
              
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <h3 className="text-xl font-bold text-slate-900">{exp.role}</h3>
                  <span className="text-sm font-semibold text-[#008236]">{exp.period}</span>
                </div>
                <p className="text-sm font-semibold text-slate-700">{exp.organization} · {exp.location}</p>
                
                <ul className="list-disc list-outside pl-4 space-y-2 text-sm text-slate-600">
                  {exp.description.map((duty, dIdx) => (
                    <li key={dIdx}>{duty}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
