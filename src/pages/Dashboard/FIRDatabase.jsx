import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { colors, gradients, shadows, EyeIcon, FolderIcon, ClockIcon, SearchLensIcon, CheckCircleIcon } from '../../theme';
import { useLanguage } from '../../LanguageContext';

const allFIRs = [
    { id: 'FIR-2025-001', cnic: '42101-*****42-2', category: 'Theft / Robbery', jurisdiction: 'Gulberg', status: 'Pending' },
    { id: 'FIR-2025-002', cnic: '42301-*****91-1', category: 'Assault / Violence', jurisdiction: 'Karachi East', status: 'Active' },
    { id: 'FIR-2025-003', cnic: '51101-*****73-5', category: 'Fraud / Scam', jurisdiction: 'Model Town', status: 'Resolved' },
    { id: 'FIR-2025-004', cnic: '42101-*****86-3', category: 'Property Dispute', jurisdiction: 'Karachi East', status: 'Under Review' },
    { id: 'FIR-2025-005', cnic: '61101-*****55-9', category: 'Theft / Robbery', jurisdiction: 'Islamabad Capital Territory', status: 'Pending' },
    { id: 'FIR-2025-006', cnic: '42101-*****98-3', category: 'Kidnapping', jurisdiction: 'Karachi South', status: 'Active' },
    { id: 'FIR-2025-007', cnic: '42101-*****12-7', category: 'Cybercrime', jurisdiction: 'Karachi Central', status: 'Pending' },
    { id: 'FIR-2025-008', cnic: '35201-*****44-1', category: 'Vehicle Accident', jurisdiction: 'Lahore Cantt', status: 'Active' },
];

const officersList = [
    { initials: 'SA', name: 'SP Ali Khan', rank: 'Superintendent of Police', station: 'Central PS', badge: 'PK-84932', district: 'District South', available: true },
    { initials: 'DF', name: 'DSP Fatima Zahra', rank: 'Deputy Superintendent', station: 'Clifton PS', badge: 'PK-71063', district: 'District South', available: true },
    { initials: 'IR', name: 'Inspector Rehman', rank: 'Inspector', station: 'Saddar PS', badge: 'PK-65125', district: 'District South', available: true },
    { initials: 'IB', name: 'Inspector Bilal Ahmed', rank: 'Inspector', station: 'Defence PS', badge: 'PK-48290', district: 'District South', available: false },
    { initials: 'SA', name: 'SI Ayesha Siddiqui', rank: 'Sub Inspector', station: 'Gulshan PS', badge: 'PK-42096', district: 'District East', available: true },
    { initials: 'SH', name: 'SI Hassan Shah', rank: 'Sub Inspector', station: 'SITE PS', badge: 'PK-38167', district: 'District West', available: true },
];

const stats = [
    { label: 'totalFIRs', value: 8, color: colors.gold, Icon: FolderIcon },
    { label: 'pendingNew', value: 3, color: colors.textSub, Icon: ClockIcon },
    { label: 'active', value: 3, color: colors.emerald, Icon: SearchLensIcon },
    { label: 'resolved', value: 1, color: colors.green, Icon: CheckCircleIcon },
];

const statusBadge = (status) => {
    const map = {
        'Pending':      { bg: 'rgba(212, 175, 55, 0.12)', color: '#D4AF37', border: 'rgba(212, 175, 55, 0.3)' },
        'Active':       { bg: 'rgba(76, 175, 80, 0.12)', color: '#4CAF50', border: 'rgba(76, 175, 80, 0.3)' },
        'Resolved':     { bg: 'rgba(156, 163, 175, 0.10)', color: '#9CA3AF', border: 'rgba(156, 163, 175, 0.2)' },
        'Under Review': { bg: 'rgba(96, 165, 250, 0.10)', color: '#60A5FA', border: 'rgba(96, 165, 250, 0.2)' },
    };
    const s = map[status] || map['Pending'];
    return (
        <span className="text-xs font-semibold px-2.5 py-1 rounded-full" style={{ background: s.bg, color: s.color, border: `1px solid ${s.border}` }}>
            {status}
        </span>
    );
};

/* ─── Assign Officer Modal ─────────────────────────────────────────────────── */
const AssignModal = ({ firId, onClose, t }) => {
    const [search, setSearch] = useState('');
    const [selected, setSelected] = useState(null);

    const filtered = officersList.filter(o => !search || o.name.toLowerCase().includes(search.toLowerCase()) || o.badge.toLowerCase().includes(search.toLowerCase()) || o.station.toLowerCase().includes(search.toLowerCase()));

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ backgroundColor: 'rgba(0,0,0,0.7)' }} onClick={onClose}>
            <div className="w-[520px] rounded-xl overflow-hidden" style={{ backgroundColor: colors.bgCard, border: `1px solid ${colors.divider}` }} onClick={(e) => e.stopPropagation()}>
                {/* Header */}
                <div className="p-5 flex items-center justify-between" style={{ borderBottom: `1px solid ${colors.divider}` }}>
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: 'rgba(1, 118, 58, 0.12)' }}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={colors.green} strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-white">{t('assignOfficer')}</h3>
                            <p className="text-xs" style={{ color: colors.textSub }}>{t('assignDesc')}</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="w-8 h-8 rounded-lg flex items-center justify-center cursor-pointer transition-all" style={{ color: colors.textSub, background: 'transparent', border: `1px solid ${colors.divider}` }}
                        onMouseEnter={(e) => { e.currentTarget.style.borderColor = colors.gold; e.currentTarget.style.color = colors.gold; }}
                        onMouseLeave={(e) => { e.currentTarget.style.borderColor = colors.divider; e.currentTarget.style.color = colors.textSub; }}
                    >✕</button>
                </div>

                {/* FIR Info bar */}
                <div className="px-5 py-3 flex justify-between" style={{ borderBottom: `1px solid ${colors.divider}`, backgroundColor: 'rgba(6, 14, 8, 0.5)' }}>
                    <div>
                        <p className="text-[10px] uppercase tracking-wider" style={{ color: colors.textSub }}>{t('firNo')}</p>
                        <p className="text-sm font-bold text-white">{firId}</p>
                    </div>
                    <div className="text-right">
                        <p className="text-[10px] uppercase tracking-wider" style={{ color: colors.textSub }}>{t('currentlyAssigned')}</p>
                        <p className="text-sm font-medium text-white">{t('noOfficerAssigned')}</p>
                    </div>
                </div>

                {/* Search */}
                <div className="px-5 py-3" style={{ borderBottom: `1px solid ${colors.divider}` }}>
                    <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: colors.textSub }}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                        </span>
                        <input type="text" placeholder={t('searchOfficers')} value={search} onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-9 pr-4 py-2 rounded-lg text-sm text-white outline-none"
                            style={{ backgroundColor: colors.inputBg, border: `1px solid ${colors.divider}` }}
                        />
                    </div>
                </div>

                {/* Officer List */}
                <div className="max-h-72 overflow-y-auto">
                    {filtered.map((o, i) => (
                        <div key={i}
                            className="px-5 py-3 flex items-center justify-between cursor-pointer transition-all duration-200"
                            style={{
                                borderBottom: `1px solid ${colors.divider}`,
                                backgroundColor: selected === i ? 'rgba(1, 118, 58, 0.08)' : 'transparent',
                            }}
                            onClick={() => o.available && setSelected(i)}
                            onMouseEnter={(e) => { if (o.available) e.currentTarget.style.backgroundColor = selected === i ? 'rgba(1, 118, 58, 0.08)' : 'rgba(212, 175, 55, 0.03)'; }}
                            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = selected === i ? 'rgba(1, 118, 58, 0.08)' : 'transparent'; }}
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold" style={{ background: gradients.greenBtn, color: 'white' }}>
                                    {o.initials}
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-white">{o.name}</p>
                                    <p className="text-[10px]" style={{ color: colors.textSub }}>{o.rank} · {o.station}</p>
                                    <p className="text-[10px]" style={{ color: colors.textSub }}>{o.badge} · {o.district}</p>
                                </div>
                            </div>
                            <span className="flex items-center gap-1 text-[10px] font-semibold" style={{ color: o.available ? colors.emerald : '#EF4444' }}>
                                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: o.available ? colors.emerald : '#EF4444' }} />
                                {o.available ? t('available') : t('unavailable')}
                            </span>
                        </div>
                    ))}
                </div>

                {/* Footer */}
                <div className="px-5 py-4 flex items-center justify-end gap-3" style={{ borderTop: `1px solid ${colors.divider}` }}>
                    <button onClick={onClose} className="px-5 py-2 rounded-lg text-sm font-semibold cursor-pointer transition-all" style={{ color: colors.textSub, background: 'transparent', border: `1px solid ${colors.divider}` }}
                        onMouseEnter={(e) => { e.currentTarget.style.borderColor = colors.gold; e.currentTarget.style.color = colors.gold; }}
                        onMouseLeave={(e) => { e.currentTarget.style.borderColor = colors.divider; e.currentTarget.style.color = colors.textSub; }}
                    >{t('close')}</button>
                    <button onClick={() => { if (selected !== null) { alert(`Assigned ${officersList[selected].name} to ${firId}`); onClose(); } }}
                        className="px-5 py-2 rounded-lg text-sm font-bold text-white cursor-pointer transition-all flex items-center gap-2"
                        style={{ background: selected !== null ? gradients.greenBtn : colors.divider, border: 'none', opacity: selected !== null ? 1 : 0.5 }}
                    >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                        {t('assignOfficer')}
                    </button>
                </div>
            </div>
        </div>
    );
};

/* ─── FIR Database Page ────────────────────────────────────────────────────── */
const FIRDatabase = () => {
    const navigate = useNavigate();
    const { t, fontFamily } = useLanguage();
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');
    const [categoryFilter, setCategoryFilter] = useState('All');
    const [assignModal, setAssignModal] = useState(null);

    const filtered = allFIRs.filter(f => {
        const matchSearch = !search || f.id.toLowerCase().includes(search.toLowerCase()) || f.category.toLowerCase().includes(search.toLowerCase()) || f.cnic.includes(search);
        const matchStatus = statusFilter === 'All' || f.status === statusFilter;
        const matchCat = categoryFilter === 'All' || f.category === categoryFilter;
        return matchSearch && matchStatus && matchCat;
    });

    const categories = ['All', ...new Set(allFIRs.map(f => f.category))];
    const statuses = ['All', 'Pending', 'Active', 'Resolved', 'Under Review'];

    return (
        <div style={{ minHeight: '100vh', backgroundColor: colors.bgDeep, fontFamily }}>

            <div className="p-8 space-y-6">
                {/* Stat Cards */}
                <div className="grid grid-cols-4 gap-4">
                    {stats.map((stat) => {
                        const IconComp = stat.Icon;
                        return (
                            <div key={stat.label} className="stat-card">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-[11px] font-medium tracking-wide uppercase mb-1.5" style={{ color: colors.textSub }}>{t(stat.label)}</p>
                                        <p className="text-3xl font-extrabold text-white">{stat.value}</p>
                                    </div>
                                    <div className="w-11 h-11 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${stat.color}10` }}>
                                        <IconComp size={22} color={stat.color} />
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Search + Filters */}
                <div className="rounded-xl p-4 flex items-center gap-4" style={{ backgroundColor: colors.bgCard, border: `1px solid ${colors.divider}` }}>
                    <div className="flex-1 relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: colors.textSub }}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                        </span>
                        <input type="text" placeholder={t('searchPlaceholder')} value={search} onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 rounded-lg text-sm text-white outline-none"
                            style={{ backgroundColor: colors.inputBg, border: `1px solid ${colors.divider}` }}
                            onFocus={(e) => { e.target.style.borderColor = colors.green; }}
                            onBlur={(e) => { e.target.style.borderColor = colors.divider; }}
                        />
                    </div>
                    <div>
                        <p className="text-[10px] font-semibold uppercase mb-1" style={{ color: colors.textSub }}>{t('status')}</p>
                        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="select-field text-sm py-2 px-3" style={{ minWidth: '100px' }}>
                            {statuses.map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                    </div>
                    <div>
                        <p className="text-[10px] font-semibold uppercase mb-1" style={{ color: colors.textSub }}>{t('category')}</p>
                        <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} className="select-field text-sm py-2 px-3" style={{ minWidth: '100px' }}>
                            {categories.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                    </div>
                </div>

                {/* Results count + File button */}
                <div className="flex items-center justify-between">
                    <p className="text-sm" style={{ color: colors.textSub }}>{t('showing')} <strong className="text-white">{filtered.length}</strong> {t('of')} {allFIRs.length} {t('records')}</p>
                    <button onClick={() => navigate('/dashboard/file-fir')}
                        className="px-5 py-2.5 rounded-lg text-sm font-bold text-white flex items-center gap-2 transition-all duration-300 cursor-pointer"
                        style={{ background: gradients.greenBtn, boxShadow: shadows.greenBtn, border: 'none' }}
                    >{t('fileNewFIR')}</button>
                </div>

                {/* Table */}
                <div>
                    <h3 className="text-lg font-bold text-white mb-4">{t('allFiledFIRs')}</h3>
                    <div className="rounded-xl overflow-hidden" style={{ border: `1px solid ${colors.divider}`, backgroundColor: colors.bgCard }}>
                        <table className="w-full border-collapse" style={{ tableLayout: 'fixed' }}>
                            <colgroup>
                                <col style={{ width: '18%' }} />
                                <col style={{ width: '22%' }} />
                                <col style={{ width: '22%' }} />
                                <col style={{ width: '16%' }} />
                                <col style={{ width: '22%' }} />
                            </colgroup>
                            <thead>
                                <tr style={{ borderBottom: `1.5px solid ${colors.tableBorder}`, backgroundColor: 'rgba(6, 14, 8, 0.9)' }}>
                                    {[t('firNo'), t('offenseCategory'), t('jurisdiction'), t('status'), t('actions')].map((h, i) => (
                                        <th key={h} className="text-left px-5 py-3.5 text-[11px] font-bold uppercase tracking-wider" style={{ color: colors.textSub, borderRight: i < 4 ? `1px solid ${colors.tableBorder}` : 'none', textAlign: i === 4 ? 'center' : 'left' }}>
                                            {h}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {filtered.map((c) => (
                                    <tr key={c.id} className="transition-colors duration-200" style={{ borderBottom: `1px solid ${colors.tableBorder}` }}
                                        onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'rgba(212, 175, 55, 0.03)'; }}
                                        onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; }}
                                    >
                                        <td className="px-5 py-4" style={{ borderRight: `1px solid ${colors.tableBorder}` }}>
                                            <p className="font-bold text-white text-sm">{c.id}</p>
                                            <p className="text-[11px] mt-0.5" style={{ color: colors.textSub }}>{c.cnic}</p>
                                        </td>
                                        <td className="px-5 py-4 text-sm" style={{ color: colors.textSub, borderRight: `1px solid ${colors.tableBorder}` }}>{c.category}</td>
                                        <td className="px-5 py-4 text-sm" style={{ color: colors.textSub, borderRight: `1px solid ${colors.tableBorder}` }}>{c.jurisdiction}</td>
                                        <td className="px-5 py-4" style={{ borderRight: `1px solid ${colors.tableBorder}` }}>{statusBadge(c.status)}</td>
                                        <td className="px-5 py-4 text-center">
                                            <div className="flex items-center justify-center gap-2">
                                                <button className="btn-eye" title={t('assignOfficer')} onClick={() => setAssignModal(c.id)}>
                                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                                                </button>
                                                <button className="btn-eye" title="View FIR" onClick={() => navigate(`/dashboard/fir/${c.id}`)}>
                                                    <EyeIcon size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Assign Officer Modal */}
            {assignModal && <AssignModal firId={assignModal} onClose={() => setAssignModal(null)} t={t} />}
        </div>
    );
};

export default FIRDatabase;
