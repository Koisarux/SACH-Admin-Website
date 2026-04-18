import React, { useState } from 'react';
import { colors, officer } from '../../theme';
import { useLanguage } from '../../LanguageContext';

const Toggle = ({ enabled, onToggle }) => (
    <button
        onClick={onToggle}
        className="w-11 h-6 rounded-full relative transition-all duration-300 cursor-pointer border-none"
        style={{ backgroundColor: enabled ? colors.green : colors.divider }}
    >
        <div
            className="w-5 h-5 rounded-full absolute top-0.5 transition-all duration-300"
            style={{
                backgroundColor: 'white',
                left: enabled ? '22px' : '2px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.3)',
            }}
        />
    </button>
);

const Settings = () => {
    const { t, fontFamily, fontSize, toggleLang, isUrdu } = useLanguage();

    // Notification toggles
    const [newFirAlerts, setNewFirAlerts] = useState(true);
    const [firStatusUpdates, setFirStatusUpdates] = useState(true);
    const [broadcastAlerts, setBroadcastAlerts] = useState(true);
    const [loginAlerts, setLoginAlerts] = useState(false);
    const [emailDigest, setEmailDigest] = useState(true);

    // Appearance toggles
    const [compactMode, setCompactMode] = useState(false);
    const [showAnimations, setShowAnimations] = useState(true);
    const [highContrast, setHighContrast] = useState(false);

    // Data & Privacy toggles
    const [activityLogging, setActivityLogging] = useState(true);
    const [autoLock, setAutoLock] = useState(true);
    const [shareAnalytics, setShareAnalytics] = useState(false);

    // Session timeout (dropdown)
    const [sessionTimeout, setSessionTimeout] = useState('30');

    // Save confirmation
    const [saved, setSaved] = useState(false);
    const handleSave = () => {
        setSaved(true);
        setTimeout(() => setSaved(false), 2500);
    };

    const SectionCard = ({ icon, title, children, badge }) => (
        <div className="rounded-xl p-6 mb-6" style={{ backgroundColor: colors.bgCard, border: `1px solid ${colors.divider}` }}>
            <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: 'rgba(1, 118, 58, 0.12)' }}>
                        {icon}
                    </div>
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider">{title}</h3>
                </div>
                {badge && <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full" style={{ background: 'rgba(76, 175, 80, 0.12)', color: colors.emerald }}>{badge}</span>}
            </div>
            {children}
        </div>
    );

    const InfoRow = ({ label, value, editable }) => (
        <div className="flex items-center py-3" style={{ borderBottom: `1px solid ${colors.divider}` }}>
            <span className="w-40 text-sm" style={{ color: colors.textSub }}>{label}</span>
            <span className="flex-1 text-sm font-medium text-white">{value}</span>
            {editable && <button className="text-xs font-semibold cursor-pointer bg-transparent border-none" style={{ color: colors.gold }}>{t('edit')}</button>}
        </div>
    );

    const NotifRow = ({ label, desc, enabled, onToggle }) => (
        <div className="flex items-center justify-between py-4" style={{ borderBottom: `1px solid ${colors.divider}` }}>
            <div className="flex-1 mr-4">
                <p className="text-sm font-semibold text-white">{label}</p>
                <p className="text-xs mt-0.5" style={{ color: colors.textSub }}>{desc}</p>
            </div>
            <Toggle enabled={enabled} onToggle={onToggle} />
        </div>
    );

    return (
        <div style={{ minHeight: '100vh', backgroundColor: colors.bgDeep, fontFamily, fontSize }}>

            <div className="p-8 max-w-3xl">
                {/* Officer Profile */}
                <SectionCard
                    icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={colors.green} strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>}
                    title={t('officerProfile')}
                >
                    <div>
                        <InfoRow label={t('fullName')} value={officer.name} />
                        <InfoRow label={t('badgeNumber')} value={officer.badge} />
                        <InfoRow label={t('rank')} value={officer.rank} />
                        <InfoRow label={t('emailAddress')} value="ali.khan@punjabpolice.gov.pk" editable />
                        <InfoRow label={t('phoneNumber')} value="+92 300 1234567" editable />
                        <InfoRow label={t('dateOfJoining')} value="March 15, 2018" />
                    </div>
                </SectionCard>

                {/* Jurisdiction */}
                <SectionCard
                    icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={colors.green} strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>}
                    title={t('jurisdictionAssignment')}
                >
                    <div>
                        <InfoRow label={t('city')} value={officer.city} />
                        <InfoRow label={t('district')} value={officer.district} />
                        <InfoRow label={t('policeStation')} value="Central Police Station" />
                    </div>
                    <p className="text-xs mt-4" style={{ color: colors.textSub }}>{t('jurisdictionNote')}</p>
                </SectionCard>

                {/* Appearance & Language */}
                <SectionCard
                    icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={colors.green} strokeWidth="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>}
                    title={t('appearanceLanguage')}
                >
                    <div>
                        {/* Language toggle */}
                        <div className="flex items-center justify-between py-4" style={{ borderBottom: `1px solid ${colors.divider}` }}>
                            <div className="flex-1 mr-4">
                                <p className="text-sm font-semibold text-white">{t('languageToggle')}</p>
                                <p className="text-xs mt-0.5" style={{ color: colors.textSub }}>{t('languageToggleDesc')}</p>
                            </div>
                            <button
                                onClick={toggleLang}
                                className="text-xs font-semibold px-4 py-2 rounded-lg cursor-pointer transition-all duration-200"
                                style={{ border: `1px solid ${isUrdu ? colors.gold : colors.divider}`, background: isUrdu ? 'rgba(212, 175, 55, 0.08)' : 'transparent', color: isUrdu ? colors.gold : colors.textSub }}
                            >
                                {isUrdu ? 'English' : 'اردو'}
                            </button>
                        </div>
                        <NotifRow label={t('compactMode')} desc={t('compactModeDesc')} enabled={compactMode} onToggle={() => setCompactMode(!compactMode)} />
                        <NotifRow label={t('showAnimations')} desc={t('showAnimationsDesc')} enabled={showAnimations} onToggle={() => setShowAnimations(!showAnimations)} />
                        <NotifRow label={t('highContrast')} desc={t('highContrastDesc')} enabled={highContrast} onToggle={() => setHighContrast(!highContrast)} />
                    </div>
                </SectionCard>

                {/* Notification Preferences */}
                <SectionCard
                    icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={colors.green} strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>}
                    title={t('notificationPreferences')}
                >
                    <div>
                        <NotifRow label={t('newFirAlerts')} desc={t('newFirAlertsDesc')} enabled={newFirAlerts} onToggle={() => setNewFirAlerts(!newFirAlerts)} />
                        <NotifRow label={t('firStatusUpdates')} desc={t('firStatusUpdatesDesc')} enabled={firStatusUpdates} onToggle={() => setFirStatusUpdates(!firStatusUpdates)} />
                        <NotifRow label={t('broadcastAlerts')} desc={t('broadcastAlertsDesc')} enabled={broadcastAlerts} onToggle={() => setBroadcastAlerts(!broadcastAlerts)} />
                        <NotifRow label={t('loginAlerts')} desc={t('loginAlertsDesc')} enabled={loginAlerts} onToggle={() => setLoginAlerts(!loginAlerts)} />
                        <NotifRow label={t('emailDigest')} desc={t('emailDigestDesc')} enabled={emailDigest} onToggle={() => setEmailDigest(!emailDigest)} />
                    </div>
                </SectionCard>

                {/* Security */}
                <SectionCard
                    icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={colors.green} strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>}
                    title={t('security')}
                >
                    <div className="flex items-center justify-between py-3" style={{ borderBottom: `1px solid ${colors.divider}` }}>
                        <div>
                            <p className="text-sm font-semibold text-white">{t('changePassword')}</p>
                            <p className="text-xs mt-0.5" style={{ color: colors.textSub }}>{t('lastChanged')}</p>
                        </div>
                        <button className="text-xs font-semibold px-4 py-2 rounded-lg cursor-pointer transition-all duration-200" style={{ border: `1px solid ${colors.divider}`, background: 'transparent', color: colors.textSub }}
                            onMouseEnter={(e) => { e.currentTarget.style.borderColor = colors.gold; e.currentTarget.style.color = colors.gold; }}
                            onMouseLeave={(e) => { e.currentTarget.style.borderColor = colors.divider; e.currentTarget.style.color = colors.textSub; }}
                        >
                            {t('update')}
                        </button>
                    </div>
                    <div className="flex items-center justify-between py-3" style={{ borderBottom: `1px solid ${colors.divider}` }}>
                        <div>
                            <p className="text-sm font-semibold text-white">{t('twoFactor')}</p>
                            <p className="text-xs mt-0.5" style={{ color: colors.textSub }}>{t('twoFactorDesc')}</p>
                        </div>
                        <Toggle enabled={false} onToggle={() => {}} />
                    </div>
                    {/* Session timeout */}
                    <div className="flex items-center justify-between py-3">
                        <div>
                            <p className="text-sm font-semibold text-white">{t('sessionTimeout')}</p>
                            <p className="text-xs mt-0.5" style={{ color: colors.textSub }}>{t('sessionTimeoutDesc')}</p>
                        </div>
                        <select
                            value={sessionTimeout}
                            onChange={(e) => setSessionTimeout(e.target.value)}
                            className="text-sm py-1.5 px-3 rounded-lg outline-none cursor-pointer"
                            style={{ backgroundColor: colors.inputBg, border: `1px solid ${colors.divider}`, color: 'white' }}
                        >
                            <option value="15">15 min</option>
                            <option value="30">30 min</option>
                            <option value="60">1 hour</option>
                            <option value="120">2 hours</option>
                            <option value="never">{t('never')}</option>
                        </select>
                    </div>
                </SectionCard>

                {/* Data & Privacy */}
                <SectionCard
                    icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={colors.green} strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>}
                    title={t('dataPrivacy')}
                >
                    <div>
                        <NotifRow label={t('activityLogging')} desc={t('activityLoggingDesc')} enabled={activityLogging} onToggle={() => setActivityLogging(!activityLogging)} />
                        <NotifRow label={t('autoLock')} desc={t('autoLockDesc')} enabled={autoLock} onToggle={() => setAutoLock(!autoLock)} />
                        <NotifRow label={t('shareAnalytics')} desc={t('shareAnalyticsDesc')} enabled={shareAnalytics} onToggle={() => setShareAnalytics(!shareAnalytics)} />
                    </div>
                    <div className="mt-4 flex gap-3">
                        <button className="text-xs font-semibold px-4 py-2 rounded-lg cursor-pointer transition-all duration-200"
                            style={{ border: `1px solid ${colors.divider}`, background: 'transparent', color: colors.textSub }}
                            onMouseEnter={(e) => { e.currentTarget.style.borderColor = colors.gold; e.currentTarget.style.color = colors.gold; }}
                            onMouseLeave={(e) => { e.currentTarget.style.borderColor = colors.divider; e.currentTarget.style.color = colors.textSub; }}
                        >{t('exportData')}</button>
                        <button className="text-xs font-semibold px-4 py-2 rounded-lg cursor-pointer transition-all duration-200"
                            style={{ border: `1px solid rgba(220, 38, 38, 0.3)`, background: 'transparent', color: 'rgba(220, 38, 38, 0.7)' }}
                            onMouseEnter={(e) => { e.currentTarget.style.borderColor = colors.red; e.currentTarget.style.color = colors.red; }}
                            onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(220, 38, 38, 0.3)'; e.currentTarget.style.color = 'rgba(220, 38, 38, 0.7)'; }}
                        >{t('clearCache')}</button>
                    </div>
                </SectionCard>

                {/* About */}
                <SectionCard
                    icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={colors.green} strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>}
                    title={t('about')}
                    badge="v2.01"
                >
                    <div>
                        <InfoRow label={t('version')} value="2.01 (PK)" />
                        <InfoRow label={t('platform')} value="SACH Admin Portal" />
                        <InfoRow label={t('buildDate')} value="March 15, 2026" />
                        <InfoRow label={t('serverRegion')} value="Asia South (Karachi)" />
                    </div>
                    <div className="mt-4 flex gap-4 text-xs" style={{ color: colors.textSub }}>
                        <span className="cursor-pointer gold-hover">{t('privacyPolicy')}</span>
                        <span className="cursor-pointer gold-hover">{t('termsOfService')}</span>
                        <span className="cursor-pointer gold-hover">{t('helpCenter')}</span>
                    </div>
                </SectionCard>

                {/* Save Button */}
                <div className="flex items-center gap-4 mt-2 mb-12">
                    <button onClick={handleSave}
                        className="px-8 py-3 rounded-xl text-sm font-bold text-white cursor-pointer transition-all duration-300 flex items-center gap-2"
                        style={{ background: `linear-gradient(135deg, ${colors.green}, ${colors.greenDark})`, border: 'none', boxShadow: '0 6px 16px rgba(1, 118, 58, 0.35)' }}
                        onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; }}
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>
                        {t('saveChanges')}
                    </button>
                    {saved && (
                        <span className="text-sm font-semibold flex items-center gap-1.5 animate-fade-in" style={{ color: colors.emerald }}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
                            {t('changesSaved')}
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Settings;
