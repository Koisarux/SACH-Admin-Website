import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { colors, gradients } from '../theme';
import { useLanguage } from '../LanguageContext';

const Sidebar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { t, isUrdu, fontFamily } = useLanguage();

    const navItems = [
        {
            path: '/dashboard',
            label: t('dashboard'),
            icon: (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>
                </svg>
            ),
        },
        {
            path: '/dashboard/file-fir',
            label: t('fileFIR'),
            icon: (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 5v14M5 12h14"/>
                </svg>
            ),
        },
        {
            path: '/dashboard/database',
            label: t('firDatabase'),
            icon: (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 22V4c0-.5.2-1 .6-1.4C5 2.2 5.5 2 6 2h8.5L20 7.5V22c0 .5-.2 1-.6 1.4-.4.4-.9.6-1.4.6H6c-.5 0-1-.2-1.4-.6C4.2 23 4 22.5 4 22z"/><path d="M14 2v6h6"/>
                </svg>
            ),
        },
        {
            path: '/dashboard/send-alerts',
            label: t('sendAlerts'),
            icon: (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>
                </svg>
            ),
        },
        {
            path: '/dashboard/audit',
            label: t('auditLogs'),
            icon: (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><line x1="10" y1="9" x2="8" y2="9"/>
                </svg>
            ),
        },
        {
            path: '/dashboard/settings',
            label: t('settings'),
            icon: (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
                </svg>
            ),
        },
    ];

    return (
        <div
            className="w-60 flex flex-col shrink-0 border-r"
            style={{ backgroundColor: colors.bgSidebar, borderColor: colors.divider, fontFamily, position: 'sticky', top: 0, height: '100vh', overflowY: 'auto' }}
        >
            {/* Brand */}
            <div className="px-5 border-b flex items-center gap-3" style={{ borderColor: colors.divider, height: '64px' }}>
                <div className="w-9 h-9 rounded-lg flex items-center justify-center text-sm font-black text-white" style={{ background: gradients.greenBtn }}>
                    S
                </div>
                <div>
                    <h1 className="font-extrabold text-white text-sm leading-tight">{t('sachAdmin')}</h1>
                    <p className="text-[10px] tracking-wider" style={{ color: colors.emerald }}>{t('policePortal')}</p>
                </div>
            </div>

            {/* Nav Items */}
            <div className="px-3 py-4 flex-1 space-y-1">
                {navItems.map(item => {
                    const isActive = item.path === '/dashboard'
                        ? location.pathname === '/dashboard'
                        : location.pathname.startsWith(item.path);

                    return (
                        <button
                            key={item.path}
                            id={`nav-${item.label.toLowerCase().replace(/[\s+]/g, '-')}`}
                            onClick={() => navigate(item.path)}
                            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm transition-all duration-200 cursor-pointer border-none outline-none"
                            style={{
                                backgroundColor: isActive ? 'rgba(212, 175, 55, 0.12)' : 'transparent',
                                color: isActive ? colors.gold : colors.textSub,
                                border: isActive ? '1px solid rgba(212, 175, 55, 0.2)' : '1px solid transparent',
                            }}
                            onMouseEnter={(e) => {
                                if (!isActive) {
                                    e.currentTarget.style.backgroundColor = 'rgba(212, 175, 55, 0.06)';
                                    e.currentTarget.style.color = colors.gold;
                                }
                            }}
                            onMouseLeave={(e) => {
                                if (!isActive) {
                                    e.currentTarget.style.backgroundColor = 'transparent';
                                    e.currentTarget.style.color = colors.textSub;
                                }
                            }}
                        >
                            {item.icon}
                            <span className="font-semibold">{item.label}</span>
                        </button>
                    );
                })}
            </div>

            {/* Bottom */}
            <div className="px-3 pb-4 space-y-1">
                <button
                    id="nav-profile"
                    onClick={() => navigate('/dashboard/profile')}
                    className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm transition-all cursor-pointer border-none outline-none"
                    style={{
                        color: location.pathname === '/dashboard/profile' ? colors.gold : colors.textSub,
                        backgroundColor: location.pathname === '/dashboard/profile' ? 'rgba(212, 175, 55, 0.12)' : 'transparent',
                        border: location.pathname === '/dashboard/profile' ? '1px solid rgba(212, 175, 55, 0.2)' : '1px solid transparent',
                    }}
                    onMouseEnter={(e) => { if (location.pathname !== '/dashboard/profile') { e.currentTarget.style.backgroundColor = 'rgba(212, 175, 55, 0.06)'; e.currentTarget.style.color = colors.gold; } }}
                    onMouseLeave={(e) => { if (location.pathname !== '/dashboard/profile') { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = colors.textSub; } }}
                >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                    <span className="font-semibold">{t('profile')}</span>
                </button>
                <button
                    id="nav-logout"
                    onClick={() => navigate('/')}
                    className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm transition-all cursor-pointer border-none outline-none"
                    style={{ color: '#ef4444' }}
                    onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'rgba(239,68,68,0.08)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; }}
                >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
                    <span className="font-semibold">{t('logout')}</span>
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
