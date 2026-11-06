/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { SupportDeskWorkspace } from './components/customerservice/SupportDeskWorkspace';
import { About } from './components/About';
import { ExperienceSection } from './components/Experience';
import { EducationSection } from './components/Education';
import { SkillsSection } from './components/Skills';
import { CertificatesSection } from './components/Certificates';
import { ProjectsSection } from './components/Projects';

import { ContactSection } from './components/Contact';
import { Footer } from './components/Footer';
import { WorkProcess } from './components/WorkProcess';
import { CvModal } from './components/CvModal';
import { KnowledgeBaseModal } from './components/customerservice/KnowledgeBaseModal';
import { TicketTrackerModal } from './components/customerservice/TicketTrackerModal';
import { PortfolioData } from './types/portfolio';
import { initialPortfolioData } from './data/initialPortfolioData';
import { getPortfolioData } from './services/firebase';

export default function App() {
  const [data, setData] = useState<PortfolioData>(initialPortfolioData);
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  
  // Modals state
  const [cvOpen, setCvOpen] = useState(false);
  const [kbOpen, setKbOpen] = useState(false);
  const [ticketTrackerOpen, setTicketTrackerOpen] = useState(false);

  // Load portfolio data on boot
  useEffect(() => {
    async function load() {
      try {
        const loaded = await getPortfolioData();
        setData(loaded);
      } catch (err) {
        console.warn('Using authentic initial portfolio data fallback:', err);
      } finally {
        setTimeout(() => setLoading(false), 450);
      }
    }
    load();
  }, []);

  // Hash-based routing listener for GitHub Pages & direct URL navigation
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.toLowerCase();
      if (hash === '#cv') {
        setCvOpen(true);
      } else if (hash === '#knowledge-base') {
        setKbOpen(true);
      } else if (hash === '#ticket-tracker') {
        setTicketTrackerOpen(true);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Keyboard navigation & modal dismiss
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setCvOpen(false);
        setKbOpen(false);
        setTicketTrackerOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Dark mode class toggle
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      document.documentElement.style.backgroundColor = '#080C14';
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.style.backgroundColor = '#F8FAFC';
    }
  }, [darkMode]);

  if (loading) {
    return (
      <div className="fixed inset-0 bg-white flex flex-col items-center justify-center p-6 text-slate-900 z-50">
        <div className="relative">
          <div className="w-20 h-20 rounded-2xl bg-white border-2 border-slate-900 flex items-center justify-center shadow-lg animate-pulse">
            <span className="text-3xl font-black text-slate-900">
              ZZA
            </span>
          </div>
          <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-green-600 border-2 border-white" />
        </div>
        <h1 className="text-lg font-bold text-slate-900 mt-6 tracking-wide">
          Zekarias Zenebe Ababu
        </h1>
        <p className="text-xs text-slate-500 mt-1 font-medium">
          Management Graduate | Customer Support Professional
        </p>
        <div className="w-36 h-1 rounded-full bg-slate-100 overflow-hidden mt-6">
          <div className="h-full bg-slate-900 w-full animate-[progress_1s_ease-in-out_infinite]" />
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-[#080C14] text-slate-100' : 'bg-white text-slate-800'} transition-colors duration-200`}>
      
      {/* Navigation Header */}
      <Navbar
        darkMode={darkMode}
        onToggleTheme={() => setDarkMode(!darkMode)}
        onOpenCv={() => setCvOpen(true)}
      />

      {/* Main Content Sections */}
      <main id="main-content">
        <Hero
          data={data}
          onOpenCv={() => setCvOpen(true)}
        />

        {/* Interactive Customer Support Live Simulator & Workspace */}
        <SupportDeskWorkspace
          onOpenKnowledgeBase={() => setKbOpen(true)}
          onOpenTicketTracker={() => setTicketTrackerOpen(true)}
        />

        <About data={data} />

        <WorkProcess />

        <ExperienceSection experiences={data.experiences} />

        <EducationSection education={data.education} />

        <SkillsSection skills={data.skills} />

        <CertificatesSection certificates={data.certificates} />

        <ProjectsSection projects={data.projects} />

        <ContactSection contact={data.contact} />
      </main>

      {/* Footer */}
      <Footer
        contact={data.contact}
        onOpenCv={() => setCvOpen(true)}
      />

      {/* CV Modal */}
      <CvModal
        isOpen={cvOpen}
        onClose={() => {
          setCvOpen(false);
          if (window.location.hash.toLowerCase() === '#cv') {
            history.pushState(null, '', window.location.pathname);
          }
        }}
        data={data}
      />

      {/* Knowledge Base & SOP Modal */}
      <KnowledgeBaseModal
        isOpen={kbOpen}
        onClose={() => {
          setKbOpen(false);
          if (window.location.hash.toLowerCase() === '#knowledge-base') {
            history.pushState(null, '', window.location.pathname);
          }
        }}
      />

      {/* Ticket Lifecycle Tracker Modal */}
      <TicketTrackerModal
        isOpen={ticketTrackerOpen}
        onClose={() => {
          setTicketTrackerOpen(false);
          if (window.location.hash.toLowerCase() === '#ticket-tracker') {
            history.pushState(null, '', window.location.pathname);
          }
        }}
      />

    </div>
  );
}
