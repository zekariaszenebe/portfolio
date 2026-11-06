/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { GraduationCap, Award, BookOpen, CheckCircle, MapPin, Calendar } from 'lucide-react';
import { Education } from '../types/portfolio';

interface EducationProps {
  education: Education[];
}

export const EducationSection: React.FC<EducationProps> = ({ education }) => {
  return (
    <section id="education" className="py-20 bg-[#f8fafc]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <h2 className="text-4xl font-black text-slate-900 tracking-tight">Education</h2>
          <p className="text-slate-600 leading-relaxed">
            Academic credentials and management coursework.
          </p>
        </div>

        {/* Education Cards */}
        <div className="max-w-4xl mx-auto space-y-6">
          {education.map((edu, idx) => (
            <div
              key={edu.id || idx}
              className="p-8 rounded-3xl bg-white border border-slate-100 shadow-sm space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-xl font-bold text-slate-900">
                    {edu.degree} in {edu.field}
                  </h3>
                  <p className="text-sm font-semibold text-[#008236] mt-1">{edu.institution}</p>
                </div>
                <span className="text-sm font-semibold text-slate-500">{edu.period}</span>
              </div>
              <ul className="list-disc list-outside pl-4 space-y-2 text-sm text-slate-600">
                {edu.details.map((detail, dIdx) => (
                  <li key={dIdx}>{detail}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
