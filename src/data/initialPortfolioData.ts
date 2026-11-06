/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { PortfolioData } from '../types/portfolio';

export const initialPortfolioData: PortfolioData = {
  name: "Zekarias Zenebe Ababu",
  titles: [
    "Management Graduate",
    "Customer Support Professional",
    "Junior Customer Support Officer @ EEU",
    "Client Experience & CRM Specialist"
  ],
  heroIntro: "A dedicated and results-oriented professional with experience in customer service, communication, problem-solving, and organizational operations. Currently working at Ethiopian Electric Utility, with a strong interest in professional growth, customer experience, and business development.",
  profilePhoto: "assets/images/professional_portrait_zekarias_1794002083585.jpg",
  cvUrl: "",
  cvFileName: "Zekarias_Zenebe_Ababu_CV.pdf",
  cvLastUpdated: "2026",
  aboutBio: [
    "I am a passionate Management graduate and customer support professional based in Addis Ababa, Ethiopia. Through my academic foundation in business management and operational roles in two of Ethiopia's premier service institutions—Ethiopian Electric Utility (EEU) and Commercial Bank of Ethiopia (CBE)—I have developed a sharp command of customer relationship management, rapid problem resolution, and front-line service excellence.",
    "My work at Ethiopian Electric Utility centers on managing high-stakes customer inquiries, navigating public utility service procedures, and coordinating with technical units to ensure transparent client communication. During my customer service internship at Commercial Bank of Ethiopia's Tulu Awulia Branch, I reinforced principles of client confidentiality, financial operations support, and empathetic stakeholder communication.",
    "I believe exceptional customer support is the cornerstone of brand loyalty and operational effectiveness. I strive to combine analytical management thinking with genuine empathy to optimize support workflows and deliver dependable outcomes."
  ],
  careerObjectives: [
    "Drive high-impact customer service and operational excellence across progressive utility, banking, or corporate environments.",
    "Apply structured management methodologies to streamline client inquiry handling, grievance resolution, and CRM operations.",
    "Harness modern digital tools and data dashboards to enhance customer satisfaction, service delivery transparency, and organizational productivity.",
    "Pursue continuous professional development and leadership in customer experience management and business development."
  ],
  stats: [
    {
      id: "stat-1",
      label: "Education",
      value: "BA",
      description: "Management Degree from Mekdela Amba University"
    },
    {
      id: "stat-2",
      label: "Institutions",
      value: "EEU & CBE",
      description: "Ethiopian Electric Utility & Commercial Bank of Ethiopia"
    },
    {
      id: "stat-3",
      label: "Core Competencies",
      value: "8+",
      description: "CRM, Service Operations, Communication & Problem-Solving"
    },
    {
      id: "stat-4",
      label: "Commitment",
      value: "100%",
      description: "Dedication to Client Satisfaction & Timely Issue Resolution"
    }
  ],
  experiences: [
    {
      id: "exp-eeu",
      organization: "Ethiopian Electric Utility (EEU)",
      role: "Junior Customer Support Officer",
      location: "Addis Ababa, Ethiopia",
      period: "Current Role",
      current: true,
      type: "Full-time",
      description: [
        "Provide front-line customer assistance, managing inquiries related to power supply, billing inquiries, and service connections.",
        "Log customer service requests, track feeder outage reports, and facilitate communication between customers and technical dispatch teams.",
        "Resolve customer complaints with patience, active listening, and adherence to utility service standards.",
        "Contribute to customer relationship management and assist clients with service procedures and documentation."
      ],
      skillsUsed: ["Customer Service", "Customer Relationship Management", "Communication", "Problem-solving", "Time Management"]
    },
    {
      id: "exp-cbe",
      organization: "Commercial Bank of Ethiopia (CBE)",
      role: "Customer Service Internship",
      location: "Tulu Awulia Branch, Ethiopia",
      period: "Internship Period",
      current: false,
      type: "Internship",
      description: [
        "Welcomed and guided branch clients with account inquiries, banking slips, and standard service procedures.",
        "Assisted customer service officers in processing customer requests and maintaining organized records.",
        "Demonstrated adherence to strict banking standards, customer confidentiality, and professional etiquette.",
        "Collaborated with branch personnel to maintain efficient lobby queue flow and clear client communications."
      ],
      skillsUsed: ["Customer Service", "Communication", "Teamwork", "Organizational Skills", "Microsoft Office"]
    }
  ],
  education: [
    {
      id: "edu-1",
      institution: "Mekdela Amba University",
      degree: "Bachelor of Art (BA)",
      field: "Management",
      location: "Ethiopia",
      period: "Graduated",
      details: [
        "Comprehensive curriculum encompassing Principles of Management, Organizational Behavior, Operations Management, Human Resource Management, Business Ethics, and Quantitative Methods.",
        "Developed strong foundation in organizational workflow design, team leadership, strategic decision-making, and client-centric business principles."
      ],
      honors: "BA in Management Degree Awarded"
    }
  ],
  skills: [
    {
      id: "skill-1",
      name: "Customer Service",
      category: "Core Support",
      proficiency: 95,
      highlight: "Front-line inquiry handling, empathy, de-escalation, and client care"
    },
    {
      id: "skill-2",
      name: "Customer Relationship Management",
      category: "Core Support",
      proficiency: 92,
      highlight: "Inquiry lifecycle tracking, CRM workflows, and client retention"
    },
    {
      id: "skill-3",
      name: "Communication",
      category: "Interpersonal",
      proficiency: 94,
      highlight: "Clear verbal and written interaction across diverse customer groups"
    },
    {
      id: "skill-4",
      name: "Problem-solving",
      category: "Core Support",
      proficiency: 90,
      highlight: "Analytical troubleshooting of customer grievances and service anomalies"
    },
    {
      id: "skill-5",
      name: "Teamwork",
      category: "Interpersonal",
      proficiency: 92,
      highlight: "Coordinating seamlessly with technical, dispatch, and administrative teams"
    },
    {
      id: "skill-6",
      name: "Microsoft Office",
      category: "Technical & Tools",
      proficiency: 88,
      highlight: "Word, Excel spreadsheets for inquiry reporting, PowerPoint presentations"
    },
    {
      id: "skill-7",
      name: "Time Management",
      category: "Management",
      proficiency: 90,
      highlight: "Prioritizing urgent customer cases, dispatch updates, and daily logs"
    },
    {
      id: "skill-8",
      name: "Organizational Skills",
      category: "Management",
      proficiency: 93,
      highlight: "Document archiving, ticket tracking, workflow coordination, and records"
    }
  ],
  certificates: [
    {
      id: "cert-1",
      title: "Employability and Job Readiness Skills",
      issuer: "Certified Professional Program",
      issueDate: "Verified",
      fileUrl: "",
      credentialUrl: "",
      description: "Comprehensive training in professional workplace communication, interview readiness, business etiquette, team collaboration, and proactive problem solving."
    },
    {
      id: "cert-2",
      title: "Entrepreneurship Skills",
      issuer: "Professional Development Initiative",
      issueDate: "Verified",
      fileUrl: "",
      credentialUrl: "",
      description: "Practical coursework in business ideation, resource allocation, market opportunity assessment, customer discovery, financial budgeting, and organizational leadership."
    }
  ],
  projects: [
    {
      id: "proj-1",
      title: "EEU Feeder Interruption Dashboard",
      category: "Utility & Energy",
      shortDescription: "An interactive operational monitoring prototype designed for Ethiopian Electric Utility customer service agents to track substation feeder status, log incident tickets, and inform affected clients.",
      fullDescription: "In public electricity distribution, prompt communication during scheduled or unscheduled power interruptions is essential to customer trust. This interactive dashboard simulates a live feeder status control room: it visualizes active distribution feeders across Addis Ababa zones, shows live status (Operational vs Outage/Maintenance), displays estimated restoration timelines, and allows support officers to query customer premises to instantly verify outage status.",
      impactMetrics: [
        "Real-time feeder health indicator (Active / Maintenance / Outage)",
        "Instant ticket lookup by customer account or phone number",
        "Estimated restoration time calculator to keep clients informed"
      ],
      features: [
        "Live Substation Feeder Grid simulator with toggles",
        "Customer premises status query tool",
        "SMS/Dispatch alert drafting generator for customer notifications",
        "Outage statistics & incident logging table"
      ],
      tags: ["Utility Operations", "EEU Support Tool", "Customer Communication", "Outage Tracking"],
      screenshotUrl: "assets/images/eeu_control_room_banner_1793611794063.jpg",
      isInteractive: true,
      interactiveType: "feeder-dashboard"
    },
    {
      id: "proj-2",
      title: "Smart Meter Bill Calculator",
      category: "Digital Customer Support",
      shortDescription: "A specialized billing estimator tailored for Ethiopian electricity consumers, incorporating graduated tariff tiers (kWh blocks), service charges, and VAT for transparent customer assistance.",
      fullDescription: "Customer service officers frequently assist citizens with understanding their monthly electricity bills and prepaid smart meter deductions. This web-based calculator applies the official progressive tariff structure for residential and commercial energy consumption. Support staff and customers can input meter readings or kWh consumption to generate an itemized breakdown including tier costs, standard service fees, and applicable taxes, fostering complete billing transparency.",
      impactMetrics: [
        "Eliminates billing ambiguity through transparent breakdown",
        "Supports both prepaid tokens and postpaid meter readings",
        "Highlights energy conservation saving thresholds"
      ],
      features: [
        "Dynamic tier calculations based on consumption blocks",
        "Interactive slider for real-time cost projection in Ethiopian Birr (ETB)",
        "Downloadable / printable itemized customer billing statement",
        "Energy-saving tips tailored for domestic appliances"
      ],
      tags: ["Tariff Calculation", "Ethiopian Birr (ETB)", "Billing Transparency", "Interactive Calculator"],
      screenshotUrl: "assets/images/smart_meter_tech_banner_1793611793987.jpg",
      isInteractive: true,
      interactiveType: "bill-calculator"
    }
  ],
  contact: {
    email: "zekariaszenebe21@gmail.com",
    whatsapp: "+251911000000",
    linkedin: "https://www.linkedin.com/in/zekarias-zenebe-ababu",
    telegram: "https://t.me/zekariaszenebe",
    phone: "+251 99 118 2141",
    location: "Addis Ababa, Ethiopia",
    availability: "Open to Full-Time Roles & Professional Inquiries"
  }
};
