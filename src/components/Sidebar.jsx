import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useLanguage } from '../LanguageContext';
import { colors, gradients } from '../theme';

const navItems = [
  {
    path: '/dashboard',
    labelKey: 'dashboard',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>
      </svg>
    ),
  },
  {
    path: '/dashboard/file-fir',
    labelKey: 'fileFIR',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 5v14M5 12h14"/>
      </svg>
    ),
  },
  {
    path: '/dashboard/database',
    labelKey: 'firDatabase',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 22V4c0-.5.2-1 .6-1.4C5 2.2 5.5 2 6 2h8.5L20 7.5V22c0 .5-.2 1-.6 1.4-.4.4-.9.6-1.4.6H6c-.5 0-1-.2-1.4-.6C4.2 23 4 22.5 4 22z"/><path d="M14 2v6h6"/>
      </svg>
    ),
  },
  {
    path: '/dashboard/send-alerts',
    labelKey: 'sendAlerts',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>
      </svg>
    ),
  },
  {
    path: '/dashboard/audit',
    labelKey: 'auditLogs',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><line x1="10" y1="9" x2="8" y2="9"/>
      </svg>
    ),
  },
  {
    path: '/dashboard/settings',
    labelKey: 'settings',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
      </svg>
    ),
  },
];

const Sidebar = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useLanguage();

  const handleNav = (path) => {
    navigate(path);
    onClose?.();
  };

  const isActive = (path) => {
    if (path === '/dashboard') return location.pathname === '/dashboard';
    return location.pathname.startsWith(path);
  };

  const navBtnStyle = (path) => ({
    backgroundColor: isActive(path) ? 'rgba(212, 175, 55, 0.12)' : 'transparent',
    color: isActive(path) ? colors.gold : colors.textSub,
    border: isActive(path) ? '1px solid rgba(212, 175, 55, 0.2)' : '1px solid transparent',
  });

  const hoverIn = (e, path) => {
    if (!isActive(path)) {
      e.currentTarget.style.backgroundColor = 'rgba(212, 175, 55, 0.06)';
      e.currentTarget.style.color = colors.gold;
    }
  };
  const hoverOut = (e, path) => {
    if (!isActive(path)) {
      e.currentTarget.style.backgroundColor = 'transparent';
      e.currentTarget.style.color = colors.textSub;
    }
  };

  return (
    <>
      {/* Mobile overlay */}
      <div
        className={`sidebar-overlay ${isOpen ? 'show' : ''}`}
        onClick={onClose}
      />

      <div
        className={`sidebar ${isOpen ? 'open' : ''}`}
        style={{
          backgroundColor: colors.bgSidebar,
          borderRight: `1px solid ${colors.divider}`,
          fontFamily: "'Roboto', sans-serif",
        }}
      >
        {/* Brand */}
        <div style={{
          padding: '0 20px',
          height: 64,
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          borderBottom: `1px solid ${colors.divider}`,
        }}>
          <div style={{
            width: 36,
            height: 36,
            borderRadius: 8,
            background: gradients.greenBtn,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 14,
            fontWeight: 900,
            color: '#fff',
          }}>
            S
          </div>
          <div>
            <h1 style={{ fontSize: 14, fontWeight: 800, color: '#fff', lineHeight: 1.2 }}>
              {t('sachAdmin')}
            </h1>
            <p style={{ fontSize: 10, letterSpacing: 1.5, color: colors.emerald }}>
              {t('policePortal')}
            </p>
          </div>
        </div>

        {/* Nav Items */}
        <div style={{ padding: '16px 12px', flex: 1 }}>
          {navItems.map(item => (
            <button
              key={item.path}
              onClick={() => handleNav(item.path)}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                padding: '10px 16px',
                borderRadius: 8,
                fontSize: 14,
                fontWeight: 600,
                cursor: 'pointer',
                outline: 'none',
                background: 'none',
                marginBottom: 4,
                transition: 'all 0.2s',
                ...navBtnStyle(item.path),
              }}
              onMouseEnter={(e) => hoverIn(e, item.path)}
              onMouseLeave={(e) => hoverOut(e, item.path)}
            >
              {item.icon}
              <span style={{ flex: 1, textAlign: 'left' }}>{t(item.labelKey)}</span>
            </button>
          ))}
        </div>

        {/* Bottom */}
        <div style={{ padding: '0 12px 16px' }}>
          {/* Profile */}
          <button
            onClick={() => handleNav('/dashboard/profile')}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              padding: '10px 16px',
              borderRadius: 8,
              fontSize: 14,
              fontWeight: 600,
              cursor: 'pointer',
              outline: 'none',
              background: 'none',
              marginBottom: 4,
              transition: 'all 0.2s',
              ...navBtnStyle('/dashboard/profile'),
            }}
            onMouseEnter={(e) => hoverIn(e, '/dashboard/profile')}
            onMouseLeave={(e) => hoverOut(e, '/dashboard/profile')}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            <span>{t('profile')}</span>
          </button>

          {/* Logout */}
          <button
            onClick={() => { sessionStorage.removeItem('sach_auth'); navigate('/', { replace: true }); onClose?.(); }}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              padding: '10px 16px',
              borderRadius: 8,
              fontSize: 14,
              fontWeight: 600,
              cursor: 'pointer',
              outline: 'none',
              background: 'none',
              border: '1px solid transparent',
              color: '#ef4444',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'rgba(239,68,68,0.08)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
            <span>{t('logout')}</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
