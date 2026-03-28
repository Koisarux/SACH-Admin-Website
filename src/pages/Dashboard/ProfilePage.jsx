import React from 'react';
import { useNavigate } from 'react-router-dom';
import { colors, gradients, officer, DashboardHeader } from '../../theme';
import { useLanguage } from '../../LanguageContext';

const ProfilePage = () => {
    const navigate = useNavigate();
    const { t, isUrdu, fontFamily, fontSize } = useLanguage();

    const SectionCard = ({ icon, title, children, cols }) => (
        <div className="rounded-xl p-6" style={{ backgroundColor: colors.bgCard, border: `1px solid ${colors.divider}` }}>
            <div className="flex items-center gap-3 mb-5">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: 'rgba(1, 118, 58, 0.12)' }}>
                    {icon}
                </div>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">{title}</h3>
            </div>
            {children}
        </div>
    );

    const InfoField = ({ label, value }) => (
        <div className="mb-4">
            <p className="text-[10px] uppercase tracking-wider font-semibold mb-1" style={{ color: colors.textSub }}>
                <span className="inline-flex items-center gap-1.5">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={colors.textSub} strokeWidth="2"><circle cx="12" cy="12" r="10"/></svg>
                    {label}
                </span>
            </p>
            <p className="text-sm font-medium text-white">{value}</p>
        </div>
    );

    return (
        <div style={{ minHeight: '100vh', backgroundColor: colors.bgDeep, fontFamily, fontSize }}>
            <DashboardHeader title={t('sachDigitalID')} />
            <div className="p-8 max-w-5xl mx-auto space-y-6">
                {/* Hero Card */}
                <div className="rounded-xl p-6 flex items-center justify-between" style={{ backgroundColor: colors.bgCard, border: `1px solid ${colors.divider}` }}>
                    <div className="flex items-center gap-5">
                        <div className="relative">
                            <div className="w-20 h-20 rounded-full flex items-center justify-center text-2xl font-black" style={{ background: gradients.greenBtn, color: 'white' }}>
                                {officer.monogram}
                            </div>
                            <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center" style={{ backgroundColor: colors.green }}>
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
                            </div>
                        </div>
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <h2 className="text-xl font-black text-white">{officer.name}</h2>
                                <span className="text-[10px] font-semibold px-2 flex items-center gap-1 py-0.5 rounded-full" style={{ background: 'rgba(76, 175, 80, 0.12)', color: colors.emerald, border: '1px solid rgba(76, 175, 80, 0.3)' }}>
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                                    {t('verified')}
                                </span>
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <p className="text-xs flex items-center gap-2 gold-hover cursor-pointer transition-colors" style={{ color: colors.textSub }}>
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/></svg>
                                    <span className="font-medium tracking-wide">42101-1234567-8</span>
                                </p>
                                <div className="flex items-center gap-5 text-xs">
                                    <span className="flex items-center gap-1.5 gold-hover cursor-pointer transition-colors" style={{ color: colors.textSub }}>
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                                        {t('dateOfBirth')}: January 15, 1985
                                    </span>
                                    <span className="flex items-center gap-1.5 gold-hover cursor-pointer transition-colors" style={{ color: colors.textSub }}>
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                                        {t('gender')}: Male
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button onClick={() => navigate('/dashboard/settings')} className="text-xs font-semibold px-4 py-2 rounded-lg cursor-pointer transition-all" style={{ color: colors.textSub, border: `1px solid ${colors.divider}`, background: 'transparent' }}
                        onMouseEnter={(e) => { e.currentTarget.style.borderColor = colors.gold; e.currentTarget.style.color = colors.gold; }}
                        onMouseLeave={(e) => { e.currentTarget.style.borderColor = colors.divider; e.currentTarget.style.color = colors.textSub; }}
                    >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
                        {t('settings')}
                    </button>
                </div>

                {/* Contact + Residential */}
                <div className="grid grid-cols-2 gap-6">
                    <SectionCard
                        icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={colors.green} strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>}
                        title={t('contactInformation')}
                    >
                        <InfoField label={t('phoneNumber')} value="+92 300 1234567" />
                        <InfoField label={t('emailAddress')} value="ali.khan@punjabpolice.gov.pk" />
                        <InfoField label={t('alternativeContact')} value="+92 321 9876543" />
                    </SectionCard>

                    <SectionCard
                        icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={colors.green} strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>}
                        title={t('residentialInformation')}
                    >
                        <InfoField label={t('currentAddress')} value="House 45, Street 12, Sector G-9" />
                        <InfoField label={t('district')} value="District South" />
                        <InfoField label={t('province')} value="Sindh" />
                    </SectionCard>
                </div>

                {/* Service Information */}
                <SectionCard
                    icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={colors.green} strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>}
                    title={t('serviceInformation')}
                >
                    <div className="grid grid-cols-4 gap-6">
                        <InfoField label={t('education')} value="Master's Degree (Criminology)" />
                        <InfoField label={t('rankDesignation')} value={officer.rank} />
                        <InfoField label={t('dateOfJoining')} value="March 15, 2018" />
                        <InfoField label={t('lastUpdated')} value="March 10, 2025" />
                    </div>
                </SectionCard>

                {/* Footer */}
                <div className="flex items-center justify-between py-4 text-xs" style={{ color: colors.textSub }}>
                    <p className="flex items-center gap-1.5"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg> {t('securedBySACH')}</p>
                    <div className="flex gap-4">
                        <span className="cursor-pointer gold-hover">{t('privacyPolicy')}</span>
                        <span className="cursor-pointer gold-hover">{t('termsOfService')}</span>
                        <span className="cursor-pointer gold-hover">{t('helpCenter')}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
