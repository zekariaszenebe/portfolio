/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { X, Award, ExternalLink, Calendar, CheckCircle2, Download } from 'lucide-react';
import { Certificate } from '../types/portfolio';

interface CertificateModalProps {
  certificate: Certificate | null;
  onClose: () => void;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({ certificate, onClose }) => {
  if (!certificate) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#0B111E] border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden my-auto text-slate-100">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-[#080C14]">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-[#59A650]/10 text-[#59A650] border border-[#59A650]/20">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Certificate Verification</h3>
              <p className="text-xs text-slate-400">Professional Credential Details</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Certificate Display Card */}
        <div className="p-6 sm:p-8 space-y-6">
          
          {/* Certificate Decorative Graphic */}
          <div className="relative p-6 sm:p-8 rounded-xl bg-gradient-to-br from-[#0E1726] via-[#111C30] to-[#080C14] border-2 border-[#F4984A]/30 text-center space-y-4 shadow-xl">
            <div className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#59A650]/20 text-[#59A650] border border-[#59A650]/30 text-[11px] font-semibold">
              <CheckCircle2 className="w-3 h-3" />
              Verified
            </div>

            <div className="inline-flex p-3 rounded-full bg-[#F4984A]/10 text-[#F4984A] border border-[#F4984A]/20">
              <Award className="w-8 h-8" />
            </div>

            <div>
              <span className="text-xs uppercase tracking-widest text-[#59A650] font-bold">Certificate of Completion</span>
              <h2 className="text-xl sm:text-2xl font-black text-white mt-1 tracking-tight">
                {certificate.title}
              </h2>
              <p className="text-sm text-slate-300 mt-2 font-medium">
                Awarded to <span className="text-white font-bold">Zekarias Zenebe Ababu</span>
              </p>
            </div>

            <div className="pt-2 border-t border-slate-800 flex items-center justify-center gap-6 text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <span className="text-slate-500">Issuer:</span>
                <strong className="text-slate-200">{certificate.issuer}</strong>
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#F4984A]" />
                <strong className="text-slate-200">{certificate.issueDate}</strong>
              </span>
            </div>
          </div>

          {/* Description */}
          <div className="p-4 rounded-xl bg-[#0E1726] border border-slate-800 space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Credential Overview</h4>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {certificate.description}
            </p>
          </div>

          {/* Uploaded File / Link if available */}
          {certificate.fileUrl && (
            <div className="p-4 rounded-xl bg-blue-950/20 border border-blue-900/30 flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-white block">Official Document Attached</span>
                <span className="text-[11px] text-slate-400">PDF / Image uploaded via Administrator Panel</span>
              </div>
              <a
                href={certificate.fileUrl}
                download={`${certificate.title.replace(/\s+/g, '_')}_Certificate`}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 rounded-lg bg-[#59A650] hover:bg-[#6fbf65] text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                View Document
              </a>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-[#080C14] border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <span>Verified Professional Document</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-medium transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
