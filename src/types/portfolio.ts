/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Experience {
  id: string;
  organization: string;
  role: string;
  location: string;
  period: string;
  current: boolean;
  type: 'Full-time' | 'Internship' | 'Contract' | 'Part-time';
  description: string[];
  skillsUsed: string[];
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  location: string;
  period: string;
  details: string[];
  honors?: string;
}

export interface SkillItem {
  id: string;
  name: string;
  category: 'Core Support' | 'Interpersonal' | 'Technical & Tools' | 'Management';
  proficiency: number; // 0 - 100
  highlight?: string;
}

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  issueDate: string;
  credentialUrl?: string;
  fileUrl?: string; // base64 or storage url
  description: string;
}

export interface Project {
  id: string;
  title: string;
  category: 'Utility & Energy' | 'Digital Customer Support' | 'Business Tools';
  shortDescription: string;
  fullDescription: string;
  impactMetrics: string[];
  features: string[];
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
  screenshotUrl: string;
  isInteractive: boolean;
  interactiveType?: 'feeder-dashboard' | 'bill-calculator';
}

export interface ContactInfo {
  email: string;
  whatsapp: string;
  linkedin: string;
  telegram?: string;
  phone?: string;
  location: string;
  availability: string;
}

export interface StatItem {
  id: string;
  label: string;
  value: string;
  description: string;
}

export interface PortfolioData {
  name: string;
  titles: string[];
  heroIntro: string;
  profilePhoto: string;
  cvUrl: string;
  cvFileName: string;
  cvLastUpdated: string;
  aboutBio: string[];
  careerObjectives: string[];
  stats: StatItem[];
  experiences: Experience[];
  education: Education[];
  skills: SkillItem[];
  certificates: Certificate[];
  projects: Project[];
  contact: ContactInfo;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  timestamp: string;
  read?: boolean;
}
