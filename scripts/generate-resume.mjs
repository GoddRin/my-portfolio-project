/**
 * Generates Marc Harrold Salva's resume as a PDF using jsPDF.
 * Run: node scripts/generate-resume.mjs
 * Output: public/Marc_Harrold_Salva_Resume.pdf
 */
import { jsPDF } from 'jspdf'
import { writeFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const OUTPUT = resolve(__dirname, '..', 'public', 'Marc_Harrold_Salva_Resume.pdf')

const doc = new jsPDF({ unit: 'pt', format: 'letter' })
const W = doc.internal.pageSize.getWidth()
const MARGIN = 50
const CONTENT_W = W - MARGIN * 2
let y = 0

/* ── Helpers ─────────────────────────────────────────────── */
const NAVY = [0, 51, 102]
const BLACK = [0, 0, 0]
const GRAY = [80, 80, 80]

function heading(text) {
  y += 18
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(11)
  doc.setTextColor(...NAVY)
  doc.text(text, MARGIN, y)
  y += 4
  doc.setDrawColor(...NAVY)
  doc.setLineWidth(1.5)
  doc.line(MARGIN, y, W - MARGIN, y)
  y += 10
}

function bodyText(text, opts = {}) {
  const { bold = false, size = 9.5, indent = 0, color = BLACK, maxW } = opts
  doc.setFont('helvetica', bold ? 'bold' : 'normal')
  doc.setFontSize(size)
  doc.setTextColor(...color)
  const lines = doc.splitTextToSize(text, maxW || CONTENT_W - indent)
  doc.text(lines, MARGIN + indent, y)
  y += lines.length * (size + 3)
}

function bulletPoint(text) {
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9)
  doc.setTextColor(...GRAY)
  doc.text('•', MARGIN + 12, y)
  const lines = doc.splitTextToSize(text, CONTENT_W - 28)
  doc.text(lines, MARGIN + 24, y)
  y += lines.length * 12
}

function lineGap(px = 6) { y += px }

function checkPage(need = 60) {
  if (y + need > doc.internal.pageSize.getHeight() - 40) {
    doc.addPage()
    y = 50
  }
}

/* ══════════════════════════════════════════════════════════ */
/*  RESUME CONTENT                                           */
/* ══════════════════════════════════════════════════════════ */

// ── Name ──
y = 45
doc.setFont('helvetica', 'bold')
doc.setFontSize(20)
doc.setTextColor(...NAVY)
doc.text('MARC HARROLD SALVA', W / 2, y, { align: 'center' })

// ── Contact line ──
y += 16
doc.setFont('helvetica', 'normal')
doc.setFontSize(9)
doc.setTextColor(...GRAY)
doc.text(
  'salva.harrold@gmail.com  |  (+63) 976-090-0410  |  Tuguegarao City, Cagayan',
  W / 2, y, { align: 'center' }
)
y += 12
doc.text(
  'linkedin.com/in/marcharrold  |  github.com/GoddRin',
  W / 2, y, { align: 'center' }
)

// ── Professional Summary ──
heading('PROFESSIONAL SUMMARY')
bodyText(
  'BSIT graduate (May 2026) with dual specialization in Network & Security and Full-Stack Development — a combination rarely found at entry level. Configured enterprise MikroTik RouterOS infrastructure for a regional government office serving 300+ users, and shipped production deployed web applications with real user bases. Civil Service Eligible (Professional Level). Targeting roles in Network Engineering, NOC Operations, or Junior Full-Stack Development.',
  { size: 9, color: GRAY }
)

// ── Education ──
heading('EDUCATION')
doc.setFont('helvetica', 'bold'); doc.setFontSize(10); doc.setTextColor(...BLACK)
doc.text('Cagayan State University – Carig Campus', MARGIN, y)
doc.setFont('helvetica', 'normal'); doc.setFontSize(9); doc.setTextColor(...GRAY)
doc.text('Aug 2022 – May 2026', W - MARGIN, y, { align: 'right' })
y += 13
bodyText('Bachelor of Science in Information Technology, Major in Network & Security', { size: 9, color: GRAY })

// ── Experience ──
heading('EXPERIENCE')
doc.setFont('helvetica', 'bold'); doc.setFontSize(10); doc.setTextColor(...BLACK)
doc.text('IT Intern (On-the-Job Training)', MARGIN, y)
doc.setFont('helvetica', 'normal'); doc.setFontSize(9); doc.setTextColor(...GRAY)
doc.text('2025 – 2026', W - MARGIN, y, { align: 'right' })
y += 13
bodyText('Department of Information and Communications Technology (DICT) – Region II  |  Tuguegarao City, Cagayan', { size: 8.5, color: GRAY, bold: false })
lineGap(4)

const internBullets = [
  'Assisted in configuring MikroTik RouterOS via Winbox on a dedicated test unit — applying IP addressing, DHCP server/client, NAT (srcnat/masquerade), and wireless SSID setup under staff supervision.',
  'Supported configuration and testing of firewall rules, mangle rules, and packet marking to enforce traffic control and network security policies.',
  'Optimized WAN bandwidth using Simple Queues, Queue Tree, and PCQ; eliminated congestion and improved throughput fairness across all user groups.',
  'Gained hands-on exposure to Starlink WiFi and Litebeam point-to-point wireless equipment through guided setup demonstration by senior technical staff.',
  'Provisioned and maintained workstations for 10+ official seminars; provided Tier-1 IT support to staff and event participants.',
]
internBullets.forEach(b => { checkPage(30); bulletPoint(b) })

// ── Projects ──
heading('PROJECTS')

// Project 1
checkPage(80)
doc.setFont('helvetica', 'bold'); doc.setFontSize(10); doc.setTextColor(...BLACK)
doc.text('IT Inventory Management System', MARGIN, y)
doc.setFont('helvetica', 'normal'); doc.setFontSize(9); doc.setTextColor(...GRAY)
doc.text('2026', W - MARGIN, y, { align: 'right' })
y += 12
bodyText('React.js • Node.js • MongoDB • JWT • REST API • RBAC • Vercel • Render', { size: 8, color: GRAY })
lineGap(2)
;[
  'Architected a production-deployed inventory platform with role-based access control (RBAC), enabling multi-level user permissions and full asset lifecycle tracking (create → assign → retire).',
  'Engineered a RESTful API backend with JWT authentication and protected routes; deployed responsive UI with dark/light mode via Vercel + Render with continuous deployment.',
  'Implemented real-time asset search, filtering, and export with audit trail logging — enabling administrators to track every change made across the system.',
].forEach(b => { checkPage(30); bulletPoint(b) })

lineGap(2)
bodyText('Live: it-asset-management-system-gb9j.vercel.app', { size: 8, color: NAVY })

// Project 2
checkPage(80)
lineGap(6)
doc.setFont('helvetica', 'bold'); doc.setFontSize(10); doc.setTextColor(...BLACK)
doc.text('Smart Farm Assistant', MARGIN, y)
doc.setFont('helvetica', 'normal'); doc.setFontSize(9); doc.setTextColor(...GRAY)
doc.text('2026', W - MARGIN, y, { align: 'right' })
y += 12
bodyText('React.js • Node.js • Express • MongoDB • Tailwind CSS • REST API • Vercel • Render', { size: 8, color: GRAY })
lineGap(2)
;[
  'Engineered a production-ready, bilingual (English/Tagalog) farm management platform with a responsive, mobile-first glassmorphic UI targeting rural users with limited digital literacy.',
  'Built a JWT-authenticated REST API tracking active crops, expenses, and harvest returns; integrated a context-aware Smart Guide algorithm surfacing live database insights.',
  'Implemented a financial summary dashboard computing net profit/loss per harvest cycle, providing farmers clear operational visibility across multiple crop seasons.',
].forEach(b => { checkPage(30); bulletPoint(b) })
lineGap(2)
bodyText('Live: smart-farm-assistant.vercel.app', { size: 8, color: NAVY })

// Project 3
checkPage(80)
lineGap(6)
doc.setFont('helvetica', 'bold'); doc.setFontSize(10); doc.setTextColor(...BLACK)
doc.text('Centralized Network Management System (Capstone Project)', MARGIN, y)
doc.setFont('helvetica', 'normal'); doc.setFontSize(9); doc.setTextColor(...GRAY)
doc.text('2025 – 2026', W - MARGIN, y, { align: 'right' })
y += 12
bodyText('MikroTik RouterOS • User Manager • VLAN • Captive Portal • Firewall  |  Cagayan State University', { size: 8, color: GRAY })
lineGap(2)
;[
  'Co-designed and deployed a MikroTik RouterOS network for a public K-12 school, replacing an unmanaged setup and supporting 300+ users across the campus.',
  'Configured captive portal authentication (User Manager + session caps), 3-strike brute-force lockout, and VLAN segmentation for CCTV traffic isolation.',
  'Authored a replicable, low-cost deployment guide adopted as a regional blueprint for budget-constrained public schools.',
].forEach(b => { checkPage(30); bulletPoint(b) })

// ── Technical Skills ──
checkPage(100)
heading('TECHNICAL SKILLS')
const skillLines = [
  ['Routing & Switching:', 'MikroTik RouterOS/Winbox, DHCP, NAT, Static Routing, VLAN, IP Subnetting, Cisco Packet Tracer'],
  ['Network Security:', 'Stateful Firewall Rules, Mangle/Packet Marking, Captive Portal, Brute-Force Lockout, ACLs'],
  ['Bandwidth & QoS:', 'Simple Queues, Queue Tree, PCQ, Traffic Shaping, QoS Policy'],
  ['Wireless & Infrastructure:', 'Hotspot Portal, Starlink WiFi, Litebeam P2P, SSID Configuration, Workstation Deployment'],
  ['Full-Stack Development:', 'React.js, Node.js, MongoDB, REST API, JWT Auth, RBAC, Tailwind CSS, Vercel, Render'],
  ['Systems & Tools:', 'Git, Postman, Windows Administration, VMware, VirtualBox, Hardware Servicing'],
]
skillLines.forEach(([label, value]) => {
  checkPage(20)
  doc.setFont('helvetica', 'bold'); doc.setFontSize(9); doc.setTextColor(...BLACK)
  const labelW = doc.getTextWidth(label + ' ')
  doc.text(label, MARGIN, y)
  doc.setFont('helvetica', 'normal'); doc.setTextColor(...GRAY)
  const valLines = doc.splitTextToSize(value, CONTENT_W - labelW)
  doc.text(valLines, MARGIN + labelW, y)
  y += valLines.length * 12
})

// ── Certifications ──
checkPage(60)
heading('CERTIFICATIONS & ELIGIBILITY')
;[
  'Civil Service Eligibility – Professional Level  |  Passed  |  2024',
  'Google IT Support Professional Certificate  |  Coursera  |  2024',
  'Artificial Intelligence & Prompt Engineering in Digital Literacy  |  DICT Region II  |  2025',
].forEach(c => {
  checkPage(20)
  bulletPoint(c)
})

/* ── Save ──────────────────────────────────────────────── */
const pdfBytes = doc.output('arraybuffer')
writeFileSync(OUTPUT, Buffer.from(pdfBytes))
console.log(`✅ Resume PDF saved → ${OUTPUT}`)
