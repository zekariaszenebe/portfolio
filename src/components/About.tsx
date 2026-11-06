/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { PortfolioData } from '../types/portfolio';

interface AboutProps {
  data: PortfolioData;
}

export const About: React.FC<AboutProps> = ({ data }) => {
  const portraitPath = data.profilePhoto || "/assets/images/hero_zekarias_portrait_1793611793619.jpg";

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Portrait */}
          <div className="relative">
            <div className="w-full aspect-square rounded-3xl overflow-hidden bg-slate-200 shadow-2xl">
              <img
                src={portraitPath}
                alt={data.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Text Content */}
          <div className="space-y-6">
            <h2 className="text-4xl font-black text-slate-900 tracking-tight">
              I am Professional Customer<br />
              <span className="text-slate-900">Support Specialist</span>
            </h2>
            
            <div className="space-y-4 text-slate-600 leading-relaxed">
              {data.aboutBio.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>

            <div className="flex gap-4 pt-4">
              <button
                className="px-6 py-3 rounded-full bg-slate-900 text-white font-bold text-sm hover:bg-slate-800 transition-all cursor-pointer"
              >
                My Project
              </button>
              <button
                className="px-6 py-3 rounded-full bg-slate-100 text-slate-900 font-bold text-sm hover:bg-slate-200 transition-all cursor-pointer"
              >
                Download CV
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
