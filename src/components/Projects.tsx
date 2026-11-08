/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { 
  FolderKanban, 
  ExternalLink, 
  Zap, 
  Play, 
  CheckCircle2, 
  Layers, 
  Activity, 
  Calculator,
  ArrowRight
} from 'lucide-react';
import { Project } from '../types/portfolio';

interface ProjectsProps {
  projects: Project[];
}

export const ProjectsSection: React.FC<ProjectsProps> = ({ projects }) => {
  return (
    <section id="projects" className="py-20 bg-[#f8fafc]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <h2 className="text-4xl font-black text-slate-900 tracking-tight">Projects</h2>
          <p className="text-slate-600 leading-relaxed">
            Practical digital prototypes addressing real-world challenges.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div
              key={project.id}
              className="rounded-3xl bg-white border border-slate-100 shadow-sm overflow-hidden flex flex-col group"
            >
              <div className="h-64 overflow-hidden bg-slate-200">
                <img
                  src={project.screenshotUrl}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="p-8 space-y-4 flex-1 flex flex-col">
                <h3 className="text-xl font-bold text-slate-900">{project.title}</h3>
                <p className="text-sm text-slate-600 flex-1">{project.shortDescription}</p>
                
                {/* No interactive button */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
