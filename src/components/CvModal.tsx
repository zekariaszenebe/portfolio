/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { 
  X, 
  Download, 
  Printer, 
  Mail, 
  MapPin, 
  Phone, 
  Linkedin, 
  GraduationCap, 
  Briefcase, 
  Award, 
  CheckCircle,
  FileText
} from 'lucide-react';
import { PortfolioData } from '../types/portfolio';

interface CvModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: PortfolioData;
}

export const CvModal: React.FC<CvModalProps> = ({ isOpen, onClose, data }) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/40 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden my-auto text-slate-900 print:bg-white print:text-black print:border-none print:shadow-none">
        
        {/* Header Actions (hidden on print) */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50 print:hidden">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-slate-50 text-slate-900 border border-slate-200">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Curriculum Vitae</h3>
              <p className="text-xs text-slate-500 font-medium">Official Professional Resume • {data.name}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {data.cvUrl && (
              <a
                href={data.cvUrl}
                download={data.cvFileName || "Zekarias_Zenebe_Ababu_CV.pdf"}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center gap-2 transition-all shadow-sm"
              >
                <Download className="w-4 h-4" />
                <span>Download PDF</span>
              </a>
            )}
            <button
              onClick={handlePrint}
              className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center gap-2 border border-slate-200 transition-all cursor-pointer"
            >
              <Printer className="w-4 h-4 text-slate-900" />
              <span>Print / Save</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* CV Document Body */}
        <div className="p-6 sm:p-10 max-h-[82vh] overflow-y-auto bg-slate-50/30 print:bg-white print:max-h-none print:p-0">
          
          <div className="bg-white border border-slate-100 rounded-2xl p-6 sm:p-12 space-y-10 shadow-sm print:border-none print:bg-white print:text-black print:p-0">
            
            {/* CV Title & Header */}
            <div className="border-b border-slate-100 print:border-slate-300 pb-8">
              <h1 className="text-3xl sm:text-4xl font-black text-slate-900 print:text-black tracking-tight leading-tight">
                {data.name}
              </h1>
              <p className="text-base sm:text-lg font-bold text-slate-900 print:text-slate-800 mt-1">
                Management Graduate | Customer Support Professional
              </p>
              
              {/* Contact Bar */}
              <div className="flex flex-wrap gap-y-3 gap-x-6 mt-6 text-xs text-slate-600 print:text-slate-600 font-medium">
                <span className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-100">
                  <MapPin className="w-4 h-4 text-green-600" />
                  {data.contact.location}
                </span>
                <a 
                  href={`https://mail.google.com/mail/?view=cm&fs=1&to=${data.contact.email}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-100 hover:border-slate-300 transition-colors"
                >
                  <Mail className="w-4 h-4 text-slate-900" />
                  {data.contact.email}
                </a>
                {data.contact.phone && (
                  <span className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-100">
                    <Phone className="w-4 h-4 text-green-600" />
                    {data.contact.phone}
                  </span>
                )}
                {data.contact.linkedin && (
                  <span className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-100">
                    <Linkedin className="w-4 h-4 text-slate-900" />
                    LinkedIn Profile
                  </span>
                )}
              </div>
            </div>

            {/* Professional Summary */}
            <div className="space-y-3">
              <h2 className="text-xs uppercase tracking-widest font-black text-[#000000] print:text-slate-900 flex items-center gap-2.5">
                <div className="w-1.5 h-1.5 rounded-full bg-slate-900" />
                Professional Summary
              </h2>
              <p className="text-sm sm:text-base text-slate-600 print:text-slate-700 leading-relaxed max-w-3xl">
                {data.heroIntro}
              </p>
            </div>

            {/* Experience Section */}
            <div className="space-y-6">
              <h2 className="text-xs uppercase tracking-widest font-black text-[#000000] print:text-slate-900 flex items-center gap-2.5">
                <Briefcase className="w-4 h-4 text-green-600" />
                Work Experience
              </h2>
              <div className="space-y-8">
                {data.experiences.map((exp) => (
                  <div key={exp.id} className="space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <span className="text-base font-bold text-slate-900 print:text-black">
                        {exp.role} — <span className="text-slate-900 print:text-slate-800">{exp.organization}</span>
                      </span>
                      <span className="text-xs text-slate-500 print:text-slate-600 font-bold bg-slate-50 px-2 py-1 rounded-lg border border-slate-100">
                        {exp.location} | {exp.period}
                      </span>
                    </div>
                    <ul className="list-disc list-outside pl-5 space-y-2 text-sm text-slate-600 print:text-slate-700">
                      {exp.description.map((desc, dIdx) => (
                        <li key={dIdx} className="leading-relaxed">{desc}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Education Section */}
            <div className="space-y-6">
              <h2 className="text-xs uppercase tracking-widest font-black text-slate-900 print:text-slate-900 flex items-center gap-2.5">
                <GraduationCap className="w-4 h-4 text-green-600" />
                Education
              </h2>
              <div className="space-y-6">
                {data.education.map((edu) => (
                  <div key={edu.id} className="space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <span className="text-base font-bold text-slate-900 print:text-black">
                        {edu.degree} in {edu.field}
                      </span>
                      <span className="text-xs text-slate-500 print:text-slate-600 font-bold bg-slate-50 px-2 py-1 rounded-lg border border-slate-100">
                        {edu.institution} | {edu.location}
                      </span>
                    </div>
                    {edu.details.map((d, dIdx) => (
                      <p key={dIdx} className="text-sm text-slate-600 print:text-slate-700 leading-relaxed">
                        {d}
                      </p>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {/* Core Competencies & Skills */}
            <div className="space-y-4">
              <h2 className="text-xs uppercase tracking-widest font-black text-slate-900 print:text-slate-900 flex items-center gap-2.5">
                <CheckCircle className="w-4 h-4 text-green-600" />
                Core Professional Competencies
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {data.skills.map((skill) => (
                  <div key={skill.id} className="p-3 rounded-xl bg-slate-50 border border-slate-100 print:bg-slate-100 print:border-slate-300 transition-colors hover:border-slate-300">
                    <span className="text-xs font-bold text-slate-900 print:text-black block">{skill.name}</span>
                    <span className="text-[10px] font-bold text-slate-400 print:text-slate-600 uppercase tracking-tighter mt-0.5 block">{skill.category}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Certificates */}
            <div className="space-y-4">
              <h2 className="text-xs uppercase tracking-widest font-black text-slate-900 print:text-slate-900 flex items-center gap-2.5">
                <Award className="w-4 h-4 text-green-600" />
                Certificates & Accreditations
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {data.certificates.map((cert) => (
                  <div key={cert.id} className="p-4 rounded-xl bg-slate-50 border border-slate-100 print:bg-slate-100 print:border-slate-300 space-y-2">
                    <span className="text-sm font-bold text-slate-900 print:text-black block">{cert.title}</span>
                    <span className="text-xs text-green-700 font-bold block">{cert.issuer}</span>
                    <p className="text-xs text-slate-600 print:text-slate-700 leading-relaxed">{cert.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Key Utility & Support Projects */}
            <div className="space-y-4">
              <h2 className="text-xs uppercase tracking-widest font-black text-slate-900 print:text-slate-900 flex items-center gap-2.5">
                <div className="w-1.5 h-1.5 rounded-full bg-green-600" />
                Featured Portfolio Projects
              </h2>
              <div className="space-y-3">
                {data.projects.map((proj) => (
                  <div key={proj.id} className="text-sm space-y-1">
                    <span className="font-bold text-slate-900 print:text-black">{proj.title}</span> 
                    <span className="text-slate-400 font-medium px-2">—</span>
                    <span className="text-slate-600 print:text-slate-600">{proj.shortDescription}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-medium print:hidden">
          <span>Zekarias Zenebe Ababu • Addis Ababa, Ethiopia</span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-100 text-slate-900 font-bold transition-all cursor-pointer shadow-sm"
          >
            Close Viewer
          </button>
        </div>
      </div>
    </div>
  );
};
