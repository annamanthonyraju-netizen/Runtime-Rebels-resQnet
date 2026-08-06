# ResQnet AI — Autonomous Disaster Management & Emergency Operations Platform 🛡️⚡

**ResQnet AI** is a state-of-the-art MERN stack Emergency Operations Center (EOC) application designed for real-time disaster triage, autonomous resource dispatching, 7-Agent AI threat analysis, and Google Maps GIS tracking.

---

## 🌟 Key System Modules & Features

### 1. Multi-Role Dedicated Consoles
- **Citizen Dashboard** (`/dashboard/citizen`): Sub-30-second emergency reporting, live status progress bar, and regional hotlines (`112`, `108`, `100`, `101`, `181`).
- **Officer Dashboard** (`/dashboard/officer`): First responder incident queue, satellite triage verification, and resource dispatch buttons.
- **Volunteer Dashboard** (`/dashboard/volunteer`): Relief distribution task checklist, evacuation GIS routes, and squad communication channel.
- **Administrator Dashboard** (`/dashboard/admin`): EOC system overview, user governance, AI log audits, and platform settings.

### 2. Smart Emergency Reporting (`/dashboard/report`)
- 10 Rapid Selection Categories: *Fire*, *Flood*, *Earthquake*, *Road Accident*, *Medical Emergency*, *Building Collapse*, *Landslide*, *Cyclone*, *Chemical Leak*, *Other*.
- Auto GPS location capture using browser `navigator.geolocation`.
- Multimodal capture: Camera upload, video clips, and voice note recording via browser **`MediaRecorder`** API.

### 3. Tactical Live GIS Command Center (`/dashboard/live-gis`)
- Interactive Google Maps simulation with severity-coded pins (🔴 *Critical*, 🟠 *High*, 🟡 *Medium*, 🟢 *Low*).
- Service depot pins for Hospitals, Police Stations, Fire Stations, Ambulance Depots, and Relief Shelters.
- GIS Overlays: *Thermal Anomaly Heatmap*, *Flood Submersion Contours*, and *Satellite Aerial View*.

### 4. Production-Ready 7-Agent AI Engine (`/dashboard/ai-assistant`)
Sequential multi-agent AI collaboration pipeline powered by Gemini API architecture:
1. **Incident Validation Agent**: Verifies completeness and GPS accuracy.
2. **Media Analysis Agent**: Analyzes multimodal inputs & transcribes audio.
3. **Severity Prediction Agent**: Calculates Urgency Index (0-10) with step-by-step reasoning.
4. **Resource Planning Agent**: Recommends emergency vehicle & heavy rescue equipment counts.
5. **Route Optimization Agent**: Computes fastest path & flags flooded underpass bottlenecks.
6. **Notification Agent**: Auto-crafts multi-role emergency broadcasts.
7. **Incident Summary Agent**: Synthesizes EOC executive & officer tactical briefs.

### 5. Smart Resource Dispatch Engine (`/dashboard/resources`)
- Track fleet status (`Available`, `Busy`, `Maintenance`, `Offline`), vehicle numbers, fuel gauges (`%`), and drone battery levels (`%`).
- Officer Dispatch Panel (`/dashboard/dispatch`) to approve, modify, or recall AI-recommended units.

### 6. Disaster Analytics & Decision Intelligence (`/dashboard/analytics`)
- 9 Executive KPI cards & Recharts visualizations (*Monthly Response Trends*, *Category Distribution*, *Severity Breakdown*, *Fleet Utilization*).
- Official Report Generator (`/dashboard/reports`) with instant CSV and PDF export triggers.

### 7. Socket.IO Real-Time EOC Event Sync
- WebSockets update map markers, officer dispatch queues, and notification bell badges in real time without refreshing.
- Online status toggles (`Available`, `Busy`, `Offline`).

---

## 🏗️ Architecture & Technology Stack

```
ResQnet AI Stack:
├── Frontend: React 18, Vite, Tailwind CSS, React Router v6, Framer Motion, Recharts, React Icons
├── Backend: Node.js, Express.js, Socket.IO, Cookie Parser, Helmet, CORS, Morgan, Express Validator
└── Database & AI: MongoDB Atlas Cloud, Mongoose, JWT (bcryptjs), Gemini API Multi-Agent Architecture
```

---

## 📁 Repository Folder Structure

```
ResQnet/
├── client/                           # React + Vite Frontend Application
│   ├── src/
│   │   ├── components/               # Shared & Dashboard Components
│   │   │   ├── common/               # Navbar & Footer
│   │   │   ├── dashboard/            # Sidebars, TopNav & Role Consoles
│   │   │   └── demo/                 # Live Hackathon Demo Launcher Modal
│   │   ├── context/                  # AuthContext & SocketContext
│   │   ├── layouts/                  # DashboardLayout (Persistent Sidebar & Outlet)
│   │   ├── pages/                    # 20+ Production Pages
│   │   │   ├── dashboards/           # Role Homepages (Citizen, Officer, Volunteer, Admin)
│   │   │   ├── analytics/            # Analytics Subpages
│   │   │   ├── ReportIncident.jsx    # Smart Emergency Reporter
│   │   │   ├── LiveGISCommandCenter  # Tactical Google Maps GIS Console
│   │   │   ├── AIAssistantPage.jsx   # 7-Agent AI Command Center
│   │   │   ├── ResourcesPage.jsx     # Fleet Directory & Depots
│   │   │   └── SystemStatusPage.jsx  # Infrastructure Telemetry
│   │   └── routes/                   # AppRoutes (Zero 404 Route Registry)
│   └── package.json
│
└── server/                           # Node.js + Express REST & WebSocket Backend
    ├── src/
    │   ├── ai/                       # 7-Agent AI Engine Architecture
    │   │   ├── agents/               # 8 Canonical PascalCase AI Agent Modules
    │   │   ├── prompts/              # Gemini API System Prompts
    │   │   └── services/             # aiOrchestratorService
    │   ├── config/                   # db.js, env.js
    │   ├── controllers/              # authController, incidentController, resourceController, etc.
    │   ├── middleware/               # authMiddleware, errorMiddleware
    │   ├── models/                   # User.js, Incident.js, Resource.js, Hospital.js, ReliefCamp.js, Notification.js
    │   ├── routes/                   # authRoutes, incidentRoutes, resourceRoutes, analyticsRoutes, notificationRoutes, aiRoutes
    │   ├── sockets/                  # socketManager.js (Room-based event dispatcher)
    │   ├── app.js                    # Express Application Express Setup
    │   └── server.js                 # HTTP & Socket.IO Listener Entry Point
    └── package.json
```

---

## ⚡ Quick Start & Local Installation Guide

### Prerequisites
- **Node.js**: `v18.x` or higher
- **npm**: `v9.x` or higher
- **MongoDB**: Local MongoDB instance or MongoDB Atlas Connection URI

### 1. Environment Configuration
Create a `.env` file inside `server/`:
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/resqnet
JWT_SECRET=super_secret_resqnet_jwt_key_2026_production
CORS_ORIGIN=http://localhost:5173
```

### 2. Start Backend Server
```bash
cd server
npm install
node src/server.js
```
*Server will start listening on `http://localhost:5000`.*

### 3. Start Frontend Client Application
```bash
cd client
npm install
npm run dev
```
*Client application will launch on `http://localhost:5173`.*

---

## 🚀 Live Hackathon Demo Instructions

1. Log into the application using any role credentials or quick demo links.
2. Click the floating **`START HACKATHON DEMO MODE`** button located at the bottom-left corner of the dashboard layout.
3. Select any disaster scenario (e.g. *Fire in HITEC City*, *Flood in Hyderabad*, *Building Collapse*).
4. Watch the animated **Mission Playback Timeline** automatically simulate citizen SOS reporting, 7-Agent AI triage, severity prediction, resource allocation, and GIS map pin creation!

---

## 📄 License & Attribution

Built for production disaster management authorities and hackathon presentation. Powered by Google DeepMind Agentic AI & MERN Stack.
