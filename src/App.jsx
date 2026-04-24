import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { LanguageProvider, useLanguage } from './LanguageContext';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
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

// Page title mapping for the header (translation keys)
const pageTitles = {
    '/dashboard': 'dashboard',
    '/dashboard/file-fir': 'fileNewFIRTitle',
    '/dashboard/database': 'firDatabase',
    '/dashboard/send-alerts': 'broadcastTitle',
    '/dashboard/audit': 'auditLogsTitle',
    '/dashboard/settings': 'settings',
    '/dashboard/profile': 'sachDigitalID',
};

const DashboardLayout = ({ children }) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { t } = useLanguage();

    // Determine title from current path
    const path = window.location.pathname;
    // Check for FIR detail route
    const titleKey = path.startsWith('/dashboard/fir/') ? 'dashboard' : (pageTitles[path] || 'dashboard');
    const title = t(titleKey);

    return (
        <div className="app-layout">
            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
            <div className="app-main">
                <Header
                    title={title}
                    onMenuClick={() => setSidebarOpen(true)}
                />
                <div className="app-main-content">
                    {children}
                </div>
            </div>
        </div>
    );
};

// Auth guard — redirects to /login if session is missing
const ProtectedRoute = ({ children }) => {
    const isAuth = sessionStorage.getItem('sach_auth') === 'true';
    const location = useLocation();
    if (!isAuth) return <Navigate to="/login" state={{ from: location }} replace />;
    return children;
};

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

          <Route path="/dashboard" element={<ProtectedRoute><DashboardLayout><DashboardHome /></DashboardLayout></ProtectedRoute>} />
          <Route path="/dashboard/database" element={<ProtectedRoute><DashboardLayout><FIRDatabase /></DashboardLayout></ProtectedRoute>} />
          <Route path="/dashboard/file-fir" element={<ProtectedRoute><DashboardLayout><FileNewFIR /></DashboardLayout></ProtectedRoute>} />
          <Route path="/dashboard/send-alerts" element={<ProtectedRoute><DashboardLayout><SendAlerts /></DashboardLayout></ProtectedRoute>} />
          <Route path="/dashboard/audit" element={<ProtectedRoute><DashboardLayout><AuditLogs /></DashboardLayout></ProtectedRoute>} />
          <Route path="/dashboard/settings" element={<ProtectedRoute><DashboardLayout><Settings /></DashboardLayout></ProtectedRoute>} />
          <Route path="/dashboard/profile" element={<ProtectedRoute><DashboardLayout><ProfilePage /></DashboardLayout></ProtectedRoute>} />
          <Route path="/dashboard/fir/:firId" element={<ProtectedRoute><DashboardLayout><FIRDetail /></DashboardLayout></ProtectedRoute>} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </LanguageProvider>
  );
}

export default App;