import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LanguageProvider } from './LanguageContext';
import Sidebar from './components/Sidebar';
import WelcomePage from './pages/Auth/WelcomePage';
import VerifyCredentials from './pages/Auth/VerifyCredentials';
import OfficerRegistration from './pages/Auth/OfficerRegistration';
import DashboardHome from './pages/Dashboard/DashboardHome';
import FIRDatabase from './pages/Dashboard/FIRDatabase';
import FileNewFIR from './pages/Dashboard/FileNewFIR';
import SendAlerts from './pages/Dashboard/SendAlerts';
import AuditLogs from './pages/Dashboard/AuditLogs';
import Settings from './pages/Dashboard/Settings';
import ProfilePage from './pages/Dashboard/ProfilePage';
import FIRDetail from './pages/Dashboard/FIRDetail';
import AuthLayout from './pages/Auth/AuthLayout';
import { colors } from './theme';

const DashboardLayout = ({ children }) => (
    <div className="flex min-h-screen" style={{ backgroundColor: colors.bgDeep, fontFamily: "'Roboto', sans-serif" }}>
        <Sidebar />
        <main className="flex-1 overflow-x-hidden">
            {children}
        </main>
    </div>
);

function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<AuthLayout />}>
            <Route path="/" element={<WelcomePage />} />
            <Route path="/login" element={<VerifyCredentials />} />
            <Route path="/register" element={<OfficerRegistration />} />
          </Route>

          <Route path="/dashboard" element={<DashboardLayout><DashboardHome /></DashboardLayout>} />
          <Route path="/dashboard/database" element={<DashboardLayout><FIRDatabase /></DashboardLayout>} />
          <Route path="/dashboard/file-fir" element={<DashboardLayout><FileNewFIR /></DashboardLayout>} />
          <Route path="/dashboard/send-alerts" element={<DashboardLayout><SendAlerts /></DashboardLayout>} />
          <Route path="/dashboard/audit" element={<DashboardLayout><AuditLogs /></DashboardLayout>} />
          <Route path="/dashboard/settings" element={<DashboardLayout><Settings /></DashboardLayout>} />
          <Route path="/dashboard/profile" element={<DashboardLayout><ProfilePage /></DashboardLayout>} />
          <Route path="/dashboard/fir/:firId" element={<DashboardLayout><FIRDetail /></DashboardLayout>} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </LanguageProvider>
  );
}

export default App;