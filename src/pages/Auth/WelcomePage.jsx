import React from 'react';
import { useNavigate } from 'react-router-dom';

const WelcomePage = () => {
    const navigate = useNavigate();

    return (
        <div className="space-y-6">
            <div className="mb-8">
                <h2 className="text-3xl font-extrabold text-white mb-2">Welcome Officer</h2>
                <p className="text-text-sub text-sm">Access the national complaint handling system.</p>
            </div>

            <button id="btn-login" onClick={() => navigate('/login')} className="btn-primary flex items-center justify-center gap-3 text-base">
                Verify & Setup Account (Login)
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </button>

            <button id="btn-register" onClick={() => navigate('/register')} className="btn-outline flex items-center justify-center gap-2 text-base">
                Register New Credential
            </button>

            <div className="security-warning mt-8 animate-slide-up delay-400" style={{ opacity: 0 }}>
                <div className="flex items-start gap-3">
                    <div className="mt-0.5">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                            <circle cx="12" cy="12" r="10" fill="#DC2626" opacity="0.2"/>
                            <circle cx="12" cy="12" r="6" fill="#DC2626" opacity="0.5"/>
                            <circle cx="12" cy="12" r="3" fill="#DC2626"/>
                        </svg>
                    </div>
                    <div>
                        <p className="text-red-400 font-bold text-sm mb-1">SECURITY WARNING</p>
                        <p className="text-text-sub text-xs leading-relaxed">
                            Authorized personnel only. All access attempts are logged
                            and actively monitored by platform administration.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WelcomePage;
