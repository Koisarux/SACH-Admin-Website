import React, { useState } from 'react';
import { colors } from '../../theme';
import { useLanguage } from '../../LanguageContext';

const auditData = [
    { ts: '2025-03-18 14:12:18', action: 'Broadcast Sent', details: 'FIR Status Update - Case #2025-0842 → Citizen (CNIC: 42301-*****-7)', user: 'SP Ali Khan', ip: '192.168.1.185', cat: 'Broadcast' },
    { ts: '2025-03-18 14:28:05', action: 'FIR Status Changed', details: 'FIR-2025-001 status changed: Pending → Active', user: 'SP Ali Khan', ip: '192.168.1.185', cat: 'FIR' },
    { ts: '2025-03-18 13:15:42', action: 'Officer Assigned', details: 'Inspector Rehman assigned to FIR-2025-010 (Drug Trafficking)', user: 'SP Ali Khan', ip: '192.168.1.185', cat: 'FIR' },
    { ts: '2025-03-18 11:15:06', action: 'Broadcast Sent', details: 'Security Advisory: District South → All users in District South', user: 'SP Ali Khan', ip: '192.168.1.185', cat: 'Broadcast' },
    { ts: '2025-03-18 10:41:30', action: 'FIR Status Changed', details: 'FIR-2025-003 status changed: Active → Resolved', user: 'DSP Fatima', ip: '10.0.0.33', cat: 'FIR' },
    { ts: '2025-03-18 09:30:13', action: 'Login Success', details: 'Officer SP Ali Khan logged in from Chrome on Windows', user: 'SP Ali Khan', ip: '192.168.1.185', cat: 'Auth' },
    { ts: '2025-03-09 18:45:00', action: 'Broadcast Sent', details: 'Investigation Update Required → All Active FIRs (District South)', user: 'SP Ali Khan', ip: '192.168.1.185', cat: 'Broadcast' },
    { ts: '2025-03-09 16:28:15', action: 'FIR Created', details: 'New FIR-2025-012 filed: Extortion at Central Police Station', user: 'System', ip: '–', cat: 'FIR' },
    { ts: '2025-03-09 15:05:55', action: 'FIR Status Changed', details: 'FIR-2025-004 status changed: New → Under Review', user: 'DSP Fatima', ip: '10.0.0.86', cat: 'FIR' },
    { ts: '2025-03-09 14:00:00', action: 'Login Failed', details: 'Failed login attempt with Badge: PK-00000 (invalid credentials)', user: 'Unknown', ip: '203.99.45..12', cat: 'Auth' },
];

const catColors = {
    'Broadcast': { bg: 'rgba(96, 165, 250, 0.10)', color: '#60A5FA', border: 'rgba(96, 165, 250, 0.3)' },
    'FIR':       { bg: 'rgba(76, 175, 80, 0.10)', color: '#4CAF50', border: 'rgba(76, 175, 80, 0.3)' },
    'Auth':      { bg: 'rgba(212, 175, 55, 0.10)', color: '#D4AF37', border: 'rgba(212, 175, 55, 0.3)' },
};

const actionIcons = {
    'Broadcast Sent': <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#60A5FA" strokeWidth="2"><path d="M22 2L11 13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>,
    'FIR Status Changed': <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#4CAF50" strokeWidth="2"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg>,
    'Officer Assigned': <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#4CAF50" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
    'Login Success': <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#4CAF50" strokeWidth="2"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" y1="12" x2="3" y2="12"/></svg>,
    'Login Failed': <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>,
    'FIR Created': <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#4CAF50" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><line x1="12" y1="18" x2="12" y2="12"/><line x1="9" y1="15" x2="15" y2="15"/></svg>,
};

const AuditLogs = () => {
    const { t, fontFamily, fontSize } = useLanguage();
    const [search, setSearch] = useState('');
    const [catFilter, setCatFilter] = useState('All');
    const [sevFilter, setSevFilter] = useState('All');

    const filtered = auditData.filter(a => {
        const matchSearch = !search || a.action.toLowerCase().includes(search.toLowerCase()) || a.details.toLowerCase().includes(search.toLowerCase()) || a.user.toLowerCase().includes(search.toLowerCase());
        const matchCat = catFilter === 'All' || a.cat === catFilter;
        return matchSearch && matchCat;
    });

    const todayCount = auditData.filter(a => a.ts.startsWith('2025-03-18')).length;
    const criticalCount = auditData.filter(a => a.action.includes('Failed') || a.action.includes('Broadcast')).length;

    const tableHeaders = [t('timestamp'), t('action'), t('details'), t('user'), t('ipAddress'), t('category')];

    return (
        <div style={{ minHeight: '100vh', backgroundColor: colors.bgDeep, fontFamily, fontSize }}>

            <div className="p-8 space-y-6">
                {/* Stat cards */}
                <div className="grid grid-cols-3 gap-4">
                    {[
                        { label: t('totalEvents'), value: auditData.length, color: colors.emerald,
                          icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/></svg> },
                        { label: t('todayEvents'), value: todayCount, color: colors.gold,
                          icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg> },
                        { label: t('criticalEvents'), value: criticalCount, color: '#EF4444',
                          icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg> },
                    ].map(s => (
                        <div key={s.label} className="stat-card">
                            <div className="flex items-center gap-4">
                                <div className="w-11 h-11 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${s.color}15`, color: s.color }}>{s.icon}</div>
                                <div>
                                    <p className="text-3xl font-extrabold text-white">{s.value}</p>
                                    <p className="text-[11px] font-medium tracking-wide uppercase" style={{ color: colors.textSub }}>{s.label}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Search + Filters */}
                <div className="rounded-xl p-4 flex items-center gap-4" style={{ backgroundColor: colors.bgCard, border: `1px solid ${colors.divider}` }}>
                    <div className="flex-1 relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: colors.textSub }}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                        </span>
                        <input type="text" placeholder={t('searchAuditPlaceholder')} value={search} onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 rounded-lg text-sm text-white outline-none"
                            style={{ backgroundColor: colors.inputBg, border: `1px solid ${colors.divider}` }}
                            onFocus={(e) => { e.target.style.borderColor = colors.green; }}
                            onBlur={(e) => { e.target.style.borderColor = colors.divider; }}
                        />
                    </div>
                    <div>
                        <p className="text-[10px] font-semibold uppercase mb-1" style={{ color: colors.textSub }}>{t('category')}</p>
                        <select value={catFilter} onChange={(e) => setCatFilter(e.target.value)} className="select-field text-sm py-2 px-3" style={{ minWidth: '100px' }}>
                            {['All', 'FIR', 'Broadcast', 'Auth'].map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                    </div>
                    <div>
                        <p className="text-[10px] font-semibold uppercase mb-1" style={{ color: colors.textSub }}>{t('severity')}</p>
                        <select value={sevFilter} onChange={(e) => setSevFilter(e.target.value)} className="select-field text-sm py-2 px-3" style={{ minWidth: '100px' }}>
                            {['All', 'Info', 'Warning', 'Critical'].map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                    </div>
                </div>

                {/* Count */}
                <p className="text-sm" style={{ color: colors.textSub }}>{t('showing')} <strong className="text-white">{filtered.length}</strong> {t('of')} {auditData.length} {t('events')}</p>

                {/* Table */}
                <div className="rounded-xl overflow-hidden" style={{ border: `1px solid ${colors.divider}`, backgroundColor: colors.bgCard }}>
                    <table className="w-full border-collapse" style={{ tableLayout: 'fixed' }}>
                        <colgroup>
                            <col style={{ width: '16%' }} />
                            <col style={{ width: '14%' }} />
                            <col style={{ width: '30%' }} />
                            <col style={{ width: '13%' }} />
                            <col style={{ width: '14%' }} />
                            <col style={{ width: '13%' }} />
                        </colgroup>
                        <thead>
                            <tr style={{ borderBottom: `1px solid ${colors.divider}`, backgroundColor: 'rgba(6, 14, 8, 0.8)' }}>
                                {tableHeaders.map((h, i) => (
                                    <th key={h} className="text-left px-4 py-3.5 text-[11px] font-bold uppercase tracking-wider" style={{ color: colors.textSub, borderRight: i < 5 ? `1px solid ${colors.divider}` : 'none' }}>
                                        {h}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.map((a, i) => {
                                const tc = catColors[a.cat] || catColors['FIR'];
                                return (
                                    <tr key={i} className="transition-colors duration-200" style={{ borderBottom: `1px solid ${colors.divider}` }}
                                        onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'rgba(212, 175, 55, 0.03)'; }}
                                        onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; }}
                                    >
                                        <td className="px-4 py-3.5 text-xs font-mono" style={{ color: colors.textSub, borderRight: `1px solid ${colors.divider}` }}>{a.ts}</td>
                                        <td className="px-4 py-3.5" style={{ borderRight: `1px solid ${colors.divider}` }}>
                                            <div className="flex items-center gap-2">
                                                {actionIcons[a.action] || null}
                                                <span className="text-xs font-semibold text-white">{a.action}</span>
                                            </div>
                                        </td>
                                        <td className="px-4 py-3.5 text-xs" style={{ color: colors.textSub, borderRight: `1px solid ${colors.divider}` }}>{a.details}</td>
                                        <td className="px-4 py-3.5 text-xs font-medium text-white" style={{ borderRight: `1px solid ${colors.divider}` }}>{a.user}</td>
                                        <td className="px-4 py-3.5 text-xs font-mono" style={{ color: colors.textSub, borderRight: `1px solid ${colors.divider}` }}>{a.ip}</td>
                                        <td className="px-4 py-3.5">
                                            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full" style={{ background: tc.bg, color: tc.color, border: `1px solid ${tc.border}` }}>
                                                {a.cat}
                                            </span>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AuditLogs;
