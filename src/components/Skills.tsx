/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Sparkles, 
  CheckCircle2, 
  Users, 
  Headphones, 
  Workflow, 
  MessageSquare, 
  Clock, 
  FolderKanban, 
  Laptop
} from 'lucide-react';
import { SkillItem } from '../types/portfolio';

interface SkillsProps {
  skills: SkillItem[];
}

export const SkillsSection: React.FC<SkillsProps> = ({ skills }) => {
  return (
    <section id="skills" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <h2 className="text-4xl font-black text-slate-900 tracking-tight">Skills & Capabilities</h2>
          <p className="text-slate-600 leading-relaxed">
            Professional competencies in customer support, operations, and technical tools.
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skills.map((skill) => (
            <div
              key={skill.id}
              className="p-8 rounded-3xl bg-[#f8fafc] border border-slate-100 shadow-sm space-y-4"
            >
              <h3 className="text-lg font-bold text-slate-900">{skill.name}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{skill.highlight}</p>
              
              {/* Proficiency Bar */}
              <div className="w-full h-2 rounded-full bg-slate-200 overflow-hidden">
                <div
                  className="h-full bg-slate-900"
                  style={{ width: `${skill.proficiency}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
