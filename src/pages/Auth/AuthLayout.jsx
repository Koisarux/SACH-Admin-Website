import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { colors } from '../../theme';
import sachLogo from '../../assets/sach_logo.png';

const AuthLayout = () => {
    const location = useLocation();

    return (
        <div className="flex min-h-screen" style={{ fontFamily: "'Outfit', sans-serif" }}>
            {/* ── Left Panel ─────────────────────────────────────────── */}
            <div className="hidden lg:flex w-1/2 relative overflow-hidden flex-col justify-between p-12" style={{ backgroundColor: colors.bgDeep }}>
                {/* Glow blobs */}
                <div className="auth-glow auth-glow-1" />
                <div className="auth-glow auth-glow-2" />
                <div className="auth-glow auth-glow-3" />

                {/* Content */}
                <div className="relative z-10 flex flex-col items-start justify-center flex-1 max-w-md mx-auto animate-fade-in">
                    {/* SACH Logo */}
                    <img
                        src={sachLogo}
                        alt="SACH"
                        className="mb-0"
                        style={{
                            height: 120,
                            width: 'auto',
                            objectFit: 'contain',
                            filter: 'drop-shadow(0 0 20px rgba(212, 175, 55, 0.4))',
                        }}
                    />

                    <p className="text-xs font-bold tracking-[0.25em] uppercase mb-4 animate-slide-up" style={{ color: colors.gold }}>
                        Admin Portal
                    </p>
                    <h1 className="text-4xl font-extrabold text-white leading-tight mb-4 animate-slide-up delay-100" style={{ opacity: 0 }}>
                        Secure Authenticated<br />Complaint Handling
                    </h1>
                    <p className="text-sm tracking-[0.15em] uppercase animate-slide-up delay-200" style={{ opacity: 0, color: colors.textSub }}>
                        Platform — Authorized Access Only
                    </p>
                </div>

                {/* Bottom badges */}
                <div className="relative z-10 flex items-center gap-6 text-xs animate-fade-in delay-500" style={{ opacity: 0, color: colors.textSub }}>
                    <span className="flex items-center gap-2">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                        </svg>
                        SECURE ENCRYPTED
                    </span>
                    <span className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: colors.emerald }} />
                        SACH CERTIFIED
                    </span>
                </div>
            </div>

            {/* ── Right Panel ────────────────────────────────────────── */}
            <div className="w-full lg:w-1/2 flex flex-col min-h-screen" style={{ backgroundColor: colors.bgCard }}>
                <div className="flex-1 flex items-center justify-center p-8 lg:p-16">
                    <div key={location.pathname} className="w-full max-w-md animate-slide-right">
                        <Outlet />
                    </div>
                </div>

                {/* Footer */}
                <div className="px-8 py-4 flex items-center justify-between text-[11px]" style={{ color: colors.textSub, borderTop: `1px solid ${colors.divider}` }}>
                    <span className="flex items-center gap-2">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                        </svg>
                        Secure NTC Connection
                    </span>
                    <span>SACH Portal v2.01 (PK)</span>
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;
