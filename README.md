# 🚓 SACH Admin Portal

A **secure web-based administrative dashboard** designed for law enforcement officers to manage, verify, and track decentralized First Information Reports (FIRs). This React application serves as the official operational backend for the SACH ecosystem, complementing the citizen-facing mobile app.

---

## 🤔 What Does This Project Do?

While citizens use the SACH mobile app to file reports on the blockchain, police officers and administrative staff need a powerful tool to process those reports. 

The **SACH Admin Portal** provides a centralized, secure interface for authorized personnel to:

- 🔐 **Verify Officer Credentials** — Secure onboarding and authentication for law enforcement staff.
- 📂 **Manage the FIR Database** — Search, filter, and review all FIRs lodged on the decentralized network.
- 📝 **File Internal Reports** — Allow desk officers to manually file new FIRs on behalf of walk-in citizens.
- 🚨 **Broadcast Safety Alerts** — Push emergency notifications and local alerts directly to citizens' mobile devices.
- 🕵️ **Review Audit Logs** — Maintain strict accountability by tracking all internal system actions and data access.

---

## ✨ Key Features

Built for speed, security, and ease of use, the portal includes:

| Feature | What It Means |
|---------|---------------|
| **Role-Based Workflows** | Distinct flows for authentication (`AuthLayout`) and internal operations (`DashboardLayout`) |
| **Comprehensive Dashboard** | At-a-glance overview of jurisdiction metrics and recent filings |
| **Bilingual Support** | Built-in `LanguageContext` to easily toggle the interface language |
| **Deep Linking** | Dynamic routing to individual case files (e.g., `/dashboard/fir/:firId`) |
| **Responsive Design** | Styled with Tailwind CSS for a seamless experience on both desktop monitors and tablets |

---

## 🏗️ Tech Stack

| Technology | Purpose |
|-----------|---------|
| **React 19** | Core UI library for building reactive, component-based views |
| **Vite 8** | Lightning-fast build tool and development server |
| **Tailwind CSS 4** | Utility-first CSS framework for rapid UI styling |
| **React Router v7** | Handles secure navigation and dynamic dashboard routing |
| **ESLint** | Enforces strict code quality and consistent formatting |

---

## 📁 Project Structure

```text
sach-admin-website/
├── package.json            # Project dependencies and scripts
├── vite.config.js          # Vite bundler configuration
├── eslint.config.js        # Linter rules
└── src/
    ├── main.jsx            # Application entry point
    ├── App.jsx             # Route definitions and layout wrappers
    ├── LanguageContext.jsx # Global state for localization
    ├── theme.js            # Custom design tokens (e.g., colors.bgDeep)
    ├── components/         # Reusable UI elements
    │   └── Sidebar.jsx     # Main dashboard navigation
    └── pages/
        ├── Auth/           # Authentication Flows
        │   ├── AuthLayout.jsx
        │   ├── WelcomePage.jsx
        │   ├── VerifyCredentials.jsx
        │   └── OfficerRegistration.jsx
        └── Dashboard/      # Core Application Views
            ├── DashboardHome.jsx
            ├── FIRDatabase.jsx
            ├── FIRDetail.jsx
            ├── FileNewFIR.jsx
            ├── SendAlerts.jsx
            ├── AuditLogs.jsx
            ├── ProfilePage.jsx
            └── Settings.jsx
```

---

## 🚀 How to Set Up (Step by Step)

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) (v18+ recommended) installed on your computer.

### 1. Clone this repository

```bash
git clone https://github.com/koisarux/sach-admin-website.git
cd sach-admin-website
```

### 2. Install dependencies

Use npm (or yarn/pnpm) to install the required packages:
```bash
npm install
```

### 3. Start the development server

Launch Vite's ultra-fast local development server:
```bash
npm run dev
```

### 4. Open the application

Open your browser and navigate to the local server address (usually `http://localhost:5173`). 

---

## 📡 Core Application Routes

### Public / Authentication
| Path | Component | Description |
|--------|----------|-------------|
| `/` | `WelcomePage` | Landing screen for the portal |
| `/login` | `VerifyCredentials` | Officer login verification |
| `/register` | `OfficerRegistration` | Secure onboarding for new personnel |

### Internal Dashboard (Requires Auth)
| Path | Component | Description |
|--------|----------|-------------|
| `/dashboard` | `DashboardHome` | Main statistical overview |
| `/dashboard/database` | `FIRDatabase` | Master list of all registered FIRs |
| `/dashboard/fir/:id` | `FIRDetail` | Deep dive into a specific case |
| `/dashboard/file-fir` | `FileNewFIR` | Interface to lodge a new report |
| `/dashboard/send-alerts` | `SendAlerts` | Tool to broadcast public notices |
| `/dashboard/audit` | `AuditLogs` | Immutable log of administrative actions |

---

## 🛠️ Build for Production

When you are ready to deploy the admin panel to a live server:

```bash
# 1. Create an optimized production build
npm run build

# 2. Preview the compiled build locally
npm run preview
```

---

## 📄 License

This project is marked as private (`"private": true` in `package.json`). Please contact the repository owner for administrative access or contribution guidelines.
