/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Award, CheckCircle2, Eye, Calendar, ExternalLink, Download } from 'lucide-react';
import { Certificate } from '../types/portfolio';
import { CertificateModal } from './CertificateModal';

interface CertificatesProps {
  certificates: Certificate[];
}

export const CertificatesSection: React.FC<CertificatesProps> = ({ certificates }) => {
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);

  return (
    <section id="certificates" className="py-20 relative bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-700 border border-slate-200">
            <Award className="w-3.5 h-3.5" />
            <span>Accreditations & Training</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Professional Certificates
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Verified qualifications enhancing employability, entrepreneurial acumen, workplace collaboration, and business agility.
          </p>
        </div>

        {/* Certificates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {certificates.map((cert) => (
            <div
              key={cert.id}
              className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 space-y-5 flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="p-3 rounded-xl bg-green-50 text-green-700 border border-green-100 group-hover:bg-green-100 transition-colors">
                    <Award className="w-6 h-6" />
                  </div>
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-green-50 text-green-700 border border-green-100">
                    <CheckCircle2 className="w-3 h-3" />
                    Verified
                  </span>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-slate-700 transition-colors tracking-tight">
                    {cert.title}
                  </h3>
                  <div className="flex items-center gap-3 text-xs text-slate-500 mt-1.5 font-medium">
                    <span className="text-[#008236]">{cert.issuer}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1 text-slate-500">
                      <Calendar className="w-3 h-3 text-slate-600" />
                      {cert.issueDate}
                    </span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {cert.description}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Certificate Modal */}
      <CertificateModal
        certificate={selectedCert}
        onClose={() => setSelectedCert(null)}
      />
    </section>
  );
};
