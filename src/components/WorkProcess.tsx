/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Search, BrainCircuit, Figma, Rocket } from 'lucide-react';

export const WorkProcess: React.FC = () => {
  const steps = [
    {
      id: 1,
      title: 'Research',
      icon: Search,
      description: 'Understanding user needs, business goals, and competitive landscape.'
    },
    {
      id: 2,
      title: 'Analyze',
      icon: BrainCircuit,
      description: 'Synthesizing data to define clear problem statements and project requirements.'
    },
    {
      id: 3,
      title: 'Design',
      icon: Figma,
      description: 'Creating wireframes, prototypes, and visual designs that solve identified problems.'
    },
    {
      id: 4,
      title: 'Launch',
      icon: Rocket,
      description: 'Implementing designs and launching the final solution to users.'
    }
  ];

  return (
    <section id="process" className="py-20 bg-[#f8fafc]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <div className="space-y-6">
            <h2 className="text-4xl font-black text-slate-900 tracking-tight">Work Process</h2>
            <p className="text-slate-600 leading-relaxed">
              My structured approach ensures that every design decision is backed by research and data, resulting in effective and user-centric solutions.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {steps.map((step) => {
              const Icon = step.icon;
              return (
                <div key={step.id} className="p-8 rounded-3xl bg-white border border-slate-100 shadow-sm space-y-4">
                  <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-900 flex items-center justify-center">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">{step.id}. {step.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{step.description}</p>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
};
