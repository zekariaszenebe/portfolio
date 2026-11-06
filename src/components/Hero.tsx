/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { PortfolioData } from '../types/portfolio';
import { ArrowRight, Download, MessageSquare } from 'lucide-react';

interface HeroProps {
  data: PortfolioData;
  onOpenCv: () => void;
}

export const Hero: React.FC<HeroProps> = ({ data, onOpenCv }) => {
  const portraitPath = data.profilePhoto || "/src/assets/images/hero_zekarias_portrait_1793611793619.jpg";

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative pt-32 pb-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Text Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold uppercase tracking-widest border border-slate-200">
                <MessageSquare className="w-3.5 h-3.5" />
                Customer Experience Specialist
              </span>
              <h1 className="text-5xl lg:text-7xl font-black text-slate-900 tracking-tight leading-[1.05]">
                Hello, I’m<br />
                <span className="text-slate-900">
                  {data.name.split(' ')[0]} {data.name.split(' ')[1]}
                </span>
              </h1>
            </div>
            
            <p className="text-lg text-slate-600 leading-relaxed max-w-lg">
              {data.heroIntro}
            </p>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => scrollToSection('contact')}
                className="px-8 py-4 rounded-xl bg-slate-900 text-white font-bold text-sm hover:bg-slate-800 transition-all shadow-lg shadow-slate-200 flex items-center gap-2 cursor-pointer"
              >
                Hire for Support
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={onOpenCv}
                className="px-8 py-4 rounded-xl bg-slate-100 text-slate-900 font-bold text-sm hover:bg-slate-200 transition-all flex items-center gap-2 cursor-pointer"
              >
                <Download className="w-4 h-4" />
                Download CV
              </button>
            </div>

            {/* Stats */}
            <div className="flex gap-8 pt-8 border-t border-slate-100">
              <div>
                <div className="text-3xl font-black text-slate-900 tabular-nums">1+</div>
                <div className="text-xs text-slate-500 font-bold uppercase tracking-wider mt-1">Years Experience</div>
              </div>
              <div>
                <div className="text-3xl font-black text-slate-900 tabular-nums">10+</div>
                <div className="text-xs text-slate-500 font-bold uppercase tracking-wider mt-1">Projects Completed</div>
              </div>
            </div>
          </div>

          {/* Portrait */}
          <div className="relative">
            <div className="absolute -top-6 -left-6 w-24 h-24 bg-slate-100 rounded-full blur-2xl opacity-60" />
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-green-50 rounded-full blur-2xl opacity-60" />
            <div className="relative w-full max-w-lg aspect-[4/5] rounded-[2rem] overflow-hidden bg-slate-100 shadow-2xl border-4 border-white">
              <img
                src={portraitPath}
                alt={data.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-8 -left-8 p-6 bg-white rounded-2xl shadow-xl border border-slate-100 max-w-[200px]">
              <div className="text-sm font-black text-slate-900">Expert Support</div>
              <p className="text-xs text-slate-500 mt-1">Dedicated to solving complex customer challenges.</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
