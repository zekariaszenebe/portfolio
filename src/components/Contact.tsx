/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Mail, 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  Copy, 
  Check, 
  Linkedin, 
  Phone, 
  MapPin, 
  Clock, 
  MessageSquare,
  ExternalLink,
  Loader2
} from 'lucide-react';
import { ContactInfo } from '../types/portfolio';
import { submitContactMessage } from '../services/firebase';

interface ContactProps {
  contact: ContactInfo;
}

export const ContactSection: React.FC<ContactProps> = ({ contact }) => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await submitContactMessage(formData);
    setLoading(false);
    setSuccess(true);
  };

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <h2 className="text-4xl font-black text-slate-900 tracking-tight">Contact</h2>
          <p className="text-slate-600 leading-relaxed">Let's connect.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-5xl mx-auto">
          <div className="space-y-8">
            <h3 className="text-2xl font-bold text-slate-900">Reach out</h3>
            <div className="space-y-6 text-slate-600">
              <a 
                href={`https://mail.google.com/mail/?view=cm&fs=1&to=${contact.email}`} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-4 hover:text-slate-900"
              >
                <Mail className="w-6 h-6" /> <span className="text-lg">{contact.email}</span>
              </a>
              {contact.phone && (
                <a href={`tel:${contact.phone.replace(/\s+/g, '')}`} className="flex items-center gap-4 hover:text-slate-900">
                  <Phone className="w-6 h-6" /> <span className="text-lg">{contact.phone}</span>
                </a>
              )}
              <div className="flex items-center gap-4">
                <MapPin className="w-6 h-6" /> <span className="text-lg">{contact.location}</span>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-8 rounded-3xl bg-[#f8fafc] border border-slate-100 shadow-sm space-y-4">
            {success ? (
              <div className="text-center p-8 text-slate-900 font-bold">Message sent successfully!</div>
            ) : (
              <>
                <input type="text" placeholder="Name" required className="w-full px-6 py-4 rounded-full bg-white border border-slate-200 text-slate-900" onChange={e => setFormData({...formData, name: e.target.value})} />
                <input type="email" placeholder="Email" required className="w-full px-6 py-4 rounded-full bg-white border border-slate-200 text-slate-900" onChange={e => setFormData({...formData, email: e.target.value})} />
                <textarea placeholder="Message" required rows={4} className="w-full px-6 py-4 rounded-3xl bg-white border border-slate-200 text-slate-900" onChange={e => setFormData({...formData, message: e.target.value})}></textarea>
                <button disabled={loading} className="w-full py-4 rounded-full bg-slate-900 text-white font-bold hover:bg-slate-800 transition-colors">
                  {loading ? 'Sending...' : 'Send Message'}
                </button>
              </>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};
