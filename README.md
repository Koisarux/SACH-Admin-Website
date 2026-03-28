# 🚓 SACH Admin Portal (React UI Template)

A **React-based administrative dashboard template** designed for law enforcement officers to manage and track First Information Reports (FIRs). This project is the static frontend architecture for the SACH ecosystem, ready to be integrated with a backend API.

---

## 🤔 What Does This Project Do?

This repository showcases the **frontend UI and layout** for a secure police dashboard. It provides the visual framework required for officers to process the reports filed by citizens.

The UI template includes fully styled pages and routing for:
- 🔐 **Authentication Flows** — Screens for officer login and secure registration.
- 📂 **FIR Database Views** — Data table layouts designed for searching, filtering, and reviewing reports.
- 📝 **Internal Reporting** — Form interfaces for desk officers to manually log incidents.
- 🚨 **Alert Broadcasting** — UI components designed for drafting and sending public safety notices.

---

## ✨ Key Frontend Features

| Feature | What It Means |
|---------|---------------|
| **Tailwind CSS Styling** | Modern, utility-first styling for a clean, professional, and responsive dashboard |
| **React Router v7** | Pre-configured dynamic routing (e.g., navigating from the database to `/dashboard/fir/:id`) |
| **Bilingual Architecture** | A `LanguageContext` wrapper established to easily toggle UI languages |
| **Component-Based** | Reusable UI components (like Sidebars and Modals) for easy maintenance and scaling |
| **Vite Tooling** | Lightning-fast local development and optimized production builds |

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
git clone [https://github.com/koisarux/sach-admin-website.git](https://github.com/koisarux/sach-admin-website.git)
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
| `/login` | `VerifyCredentials` | Officer login verification UI |
| `/register` | `OfficerRegistration` | Secure onboarding UI for new personnel |

### Internal Dashboard (Requires Auth)
| Path | Component | Description |
|--------|----------|-------------|
| `/dashboard` | `DashboardHome` | Main statistical overview |
| `/dashboard/database` | `FIRDatabase` | Master list view of all registered FIRs |
| `/dashboard/fir/:id` | `FIRDetail` | Deep dive view into a specific case |
| `/dashboard/file-fir` | `FileNewFIR` | Interface to lodge a new report |
| `/dashboard/send-alerts` | `SendAlerts` | Tool to broadcast public notices |
| `/dashboard/audit` | `AuditLogs` | Visual log of administrative actions |

---

## 🛠️ Build for Production

When you are ready to deploy the static admin panel:

```bash
# 1. Create an optimized production build
npm run build

# 2. Preview the compiled build locally
npm run preview
```

---

## 📄 License

MIT License — feel free to use this project for learning or as a portfolio piece.
