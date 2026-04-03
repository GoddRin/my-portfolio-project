import assetManagementImage from '../assets/project-asset-management.png'
import portfolioProfileImage from '../assets/project-portfolio-profile.png'
import smartFarmImage from '../assets/project-smart-farm.png'

export const projects = [
  {
    id: 'asset-management',
    featured: true,
    category: 'Full-Stack · MERN',
    name: 'Asset Management System',
    description:
      'Full-stack MERN app for tracking and managing organizational assets. Includes authentication, role-based access control, CSV export, and audit logs.',
    longDescription:
      'A production-oriented asset tracking platform designed for real organizations. It emphasizes secure workflows, traceability, and reliable exports for operational reporting.',
    features: [
      'JWT authentication + role-based access control',
      'Asset lifecycle tracking and audit logs',
      'CSV export for reporting',
      'Search + filtering optimized for real datasets',
    ],
    stack: ['MongoDB', 'Express', 'React', 'Node.js', 'JWT'],
    image: assetManagementImage,
    liveUrl: 'https://it-asset-management-system-gb9j.vercel.app',
    githubUrl: 'https://github.com/yourhandle/asset-management', // TODO: Replace
    screenshots: [
      assetManagementImage,
      'https://picsum.photos/seed/asset-system-2/1400/900',
      'https://picsum.photos/seed/asset-system-3/1400/900',
    ],
  },
  {
    id: 'smart-farm',
    featured: false,
    category: 'IoT · Dashboard',
    name: 'Smart Farm Assistant',
    description:
      'IoT-connected platform for agricultural monitoring with real-time sensor visualization, alerting, and a mobile-responsive dashboard.',
    longDescription:
      'A real-time monitoring interface for farm sensors and events. Built to be readable on mobile, resilient on unstable connections, and clear under operational pressure.',
    features: [
      'Realtime sensor streams via WebSockets',
      'Alert thresholds + notification flows',
      'Mobile-first dashboard layout',
      'Charts and historical trends',
    ],
    stack: ['React', 'Node.js', 'MongoDB', 'WebSockets'],
    image: smartFarmImage,
    liveUrl: 'https://smart-farm-assistant.vercel.app',
    githubUrl: 'https://github.com/yourhandle/smart-farm', // TODO: Replace
    screenshots: [
      smartFarmImage,
      'https://picsum.photos/seed/smart-farm-system-2/1400/900',
      'https://picsum.photos/seed/smart-farm-system-3/1400/900',
    ],
  },
  {
    id: 'portfolio-os',
    featured: false,
    category: 'Frontend · Showcase',
    name: 'Portfolio Profile',
    description:
      'This portfolio itself, built as a showcase of modern frontend engineering with cinematic animations and production-grade structure.',
    longDescription:
      'A single-page experience designed with accessibility, performance, and premium motion. Includes custom cursor, scroll-linked UI, section indicators, and a project lightbox.',
    features: [
      'Smooth section navigation + active states',
      'Project modal with carousel + links',
      'Theme persistence + reduced-motion support',
      'Easter egg terminal popup',
    ],
    stack: ['React', 'Vite', 'Framer Motion', 'Tailwind'],
    image: portfolioProfileImage,
    liveUrl: 'https://example.com', // TODO: Replace
    githubUrl: 'https://github.com/yourhandle/portfolio-profile', // TODO: Replace
    screenshots: [
      portfolioProfileImage,
      'https://picsum.photos/seed/portfolio-system-2/1400/900',
      'https://picsum.photos/seed/portfolio-system-3/1400/900',
    ],
  },
]

