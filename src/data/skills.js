import {
  Braces,
  Code2,
  Database,
  Globe,
  Layers,
  Network,
  Server,
  Shield,
  Terminal,
  Wrench,
} from 'lucide-react'

export const skillCategories = [
  { id: 'all', label: 'All' },
  { id: 'frontend', label: 'Frontend' },
  { id: 'backend', label: 'Backend' },
  { id: 'networking', label: 'Networking' },
  { id: 'tools', label: 'Tools' },
]

export const skills = [
  // Frontend
  { id: 'react', name: 'React.js', category: 'frontend', icon: Layers, level: 88 },
  { id: 'js', name: 'JavaScript (ES6+)', category: 'frontend', icon: Braces, level: 84 },
  { id: 'htmlcss', name: 'HTML5/CSS3', category: 'frontend', icon: Globe, level: 86 },
  { id: 'tailwind', name: 'Tailwind CSS', category: 'frontend', icon: Code2, level: 82 },
  { id: 'vite', name: 'Vite', category: 'frontend', icon: Terminal, level: 78 },

  // Backend
  { id: 'node', name: 'Node.js', category: 'backend', icon: Server, level: 80 },
  { id: 'express', name: 'Express.js', category: 'backend', icon: Network, level: 76 },
  { id: 'mongo', name: 'MongoDB', category: 'backend', icon: Database, level: 74 },
  { id: 'rest', name: 'REST API Design', category: 'backend', icon: Globe, level: 79 },
  { id: 'jwt', name: 'JWT Auth', category: 'backend', icon: Shield, level: 72 },
  { id: 'mongoose', name: 'Mongoose', category: 'backend', icon: Database, level: 70 },

  // Networking
  { id: 'mt', name: 'MikroTik RouterOS', category: 'networking', icon: Network, level: 82 },
  { id: 'vlan', name: 'VLAN Segmentation', category: 'networking', icon: Layers, level: 78 },
  { id: 'fw', name: 'Firewall Rules', category: 'networking', icon: Shield, level: 80 },
  { id: 'hotspot', name: 'Hotspot Systems', category: 'networking', icon: Globe, level: 72 },
  { id: 'bw', name: 'Bandwidth Management', category: 'networking', icon: Wrench, level: 76 },
  { id: 'topology', name: 'Network Topology Design', category: 'networking', icon: Network, level: 74 },

  // Tools
  { id: 'git', name: 'Git & GitHub', category: 'tools', icon: Code2, level: 82 },
  { id: 'vscode', name: 'VS Code', category: 'tools', icon: Terminal, level: 86 },
  { id: 'postman', name: 'Postman', category: 'tools', icon: Globe, level: 76 },
  { id: 'figma', name: 'Figma (basic)', category: 'tools', icon: Layers, level: 62 },
  { id: 'linux', name: 'Linux CLI', category: 'tools', icon: Terminal, level: 72 },
  { id: 'vercel', name: 'Vercel', category: 'tools', icon: Globe, level: 70 },
]

export const marqueeTech = [
  'React',
  'Vite',
  'Tailwind',
  'Framer Motion',
  'Node.js',
  'Express',
  'MongoDB',
  'JWT',
  'MikroTik',
  'Vercel',
  'GitHub',
  'Postman',
  'Linux',
]

