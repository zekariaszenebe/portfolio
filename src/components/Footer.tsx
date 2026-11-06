/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ContactInfo } from '../types/portfolio';

interface FooterProps {
  contact: ContactInfo;
  onOpenCv: () => void;
}

export const Footer: React.FC<FooterProps> = ({ contact, onOpenCv }) => {
  return (
    <footer className="py-16 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <span className="font-bold text-slate-900">Zekarias Zenebe Ababu</span>
          
          <div className="flex gap-8 text-sm text-slate-600">
            <a href="#home" className="hover:text-slate-900">Home</a>
            <a href="#about" className="hover:text-slate-900">About</a>
            <a href="#contact" className="hover:text-slate-900">Contact</a>
          </div>

          <button 
            onClick={onOpenCv} 
            className="text-sm text-slate-500 hover:text-slate-900 cursor-pointer"
          >
            View CV
          </button>
        </div>
      </div>
    </footer>
  );
};
