import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { colors, gradients, shadows, officer, EyeIcon, FolderIcon, ClockIcon, SearchLensIcon, CheckCircleIcon } from '../../theme';
import { useLanguage } from '../../LanguageContext';

const recentCases = [
    { id: 'FIR-2025-001', cnic: '42101-*****81-2', category: 'Theft / Robbery', jurisdiction: 'Gulberg', status: 'Pending' },
    { id: 'FIR-2025-002', cnic: '42301-*****91-1', category: 'Assault / Violence', jurisdiction: 'Karachi East', status: 'Active' },
    { id: 'FIR-2025-006', cnic: '42101-*****98-3', category: 'Kidnapping', jurisdiction: 'Karachi South', status: 'Active' },
];

/* Stat card with SVG icon that glows gold on hover */
const StatCard = ({ stat, delay, label }) => {
    const [hovered, setHovered] = useState(false);
    const IconComp = stat.Icon;

    return (
        <div
            className="stat-card animate-slide-up"
            style={{ opacity: 0, animationDelay: `${delay}ms`, animationFillMode: 'forwards' }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-[11px] font-medium tracking-wide uppercase mb-1.5" style={{ color: colors.textSub }}>{label}</p>
                    <p className="text-3xl font-extrabold text-white">{stat.value}</p>
                </div>
                <div
                    className="w-11 h-11 rounded-lg flex items-center justify-center transition-all duration-300"
                    style={{
                        backgroundColor: hovered ? 'rgba(212, 175, 55, 0.12)' : `${stat.color}10`,
                        boxShadow: hovered ? '0 0 14px rgba(212, 175, 55, 0.25)' : 'none',
                    }}
                >
                    <IconComp size={22} color={hovered ? colors.gold : stat.color} />
                </div>
            </div>
        </div>
    );
};

const DashboardHome = () => {
    const navigate = useNavigate();
    const { t, fontFamily, fontSize } = useLanguage();

    const stats = [
        { key: 'myAssignedCases', value: 3, color: colors.gold, Icon: FolderIcon },
        { key: 'pending', value: 3, color: colors.textSub, Icon: ClockIcon },
        { key: 'active', value: 3, color: colors.emerald, Icon: SearchLensIcon },
        { key: 'resolved', value: 1, color: colors.green, Icon: CheckCircleIcon },
    ];

    const tableHeaders = [t('firNo'), t('offenseCategory'), t('jurisdiction'), t('status'), t('actions')];

    return (
        <div style={{ minHeight: '100vh', backgroundColor: colors.bgDeep, fontFamily, fontSize }}>


            <div className="p-8 space-y-6">
                {/* Officer Profile Card */}
                <div
                    className="rounded-xl p-6 flex items-center justify-between animate-slide-up"
                    style={{ background: gradients.profileBg, border: `1px solid ${colors.divider}` }}
                >
                    <div className="flex items-center gap-5">
                        <div className="w-14 h-14 rounded-full flex items-center justify-center text-lg font-black" style={{ background: gradients.goldChip, color: colors.bgCard }}>
                            {officer.monogram}
                        </div>
                        <div>
                            <h2 className="text-xl font-extrabold text-white">{officer.name}</h2>
                            <p className="text-sm" style={{ color: colors.textSub }}>{officer.rank} · {officer.district}, {officer.city}</p>
                            <div className="flex items-center gap-3 mt-1">
                                <span className="text-xs px-2.5 py-0.5 rounded font-semibold" style={{ background: 'rgba(212, 175, 55, 0.12)', color: colors.gold }}>{t('badge')}: {officer.badge}</span>
                                <span className="flex items-center gap-1 text-xs font-semibold" style={{ color: colors.emerald }}>
                                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: colors.emerald }} />{t('active')}
                                </span>
                            </div>
                        </div>
                    </div>

                    <button
                        id="btn-file-new-fir"
                        onClick={() => navigate('/dashboard/file-fir')}
                        className="px-5 py-2.5 rounded-lg text-sm font-bold text-white flex items-center gap-2 transition-all duration-300 cursor-pointer"
                        style={{ background: gradients.greenBtn, boxShadow: shadows.greenBtn, border: 'none' }}
                        onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = shadows.greenBtnHover; }}
                        onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = shadows.greenBtn; }}
                    >
                        {t('fileNewFIR')}
                    </button>
                </div>

                {/* Stat Cards */}
                <div className="grid grid-cols-4 gap-4">
                    {stats.map((stat, i) => (
                        <StatCard key={stat.key} stat={stat} delay={(i + 1) * 100} label={t(stat.key)} />
                    ))}
                </div>

                {/* Recent Cases */}
                <div className="animate-slide-up delay-500" style={{ opacity: 0, animationFillMode: 'forwards' }}>
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-bold text-white">{t('myRecentCases')}</h3>
                        <button className="text-sm font-semibold cursor-pointer bg-transparent border-none gold-hover" style={{ color: colors.gold }}>{t('viewAll')}</button>
                    </div>

                    <div className="rounded-xl overflow-hidden" style={{ border: `1px solid ${colors.divider}`, backgroundColor: colors.bgCard }}>
                        <table className="w-full border-collapse" style={{ tableLayout: 'fixed' }}>
                            <colgroup>
                                <col style={{ width: '22%' }} />
                                <col style={{ width: '24%' }} />
                                <col style={{ width: '20%' }} />
                                <col style={{ width: '16%' }} />
                                <col style={{ width: '18%' }} />
                            </colgroup>
                            <thead>
                                <tr style={{ borderBottom: `1.5px solid ${colors.tableBorder}`, backgroundColor: 'rgba(6, 14, 8, 0.9)' }}>
                                    {tableHeaders.map((h, i) => (
                                        <th
                                            key={h}
                                            className="text-left px-5 py-3.5 text-[11px] font-bold uppercase tracking-wider"
                                            style={{
                                                color: colors.textSub,
                                                borderRight: i < 4 ? `1px solid ${colors.tableBorder}` : 'none',
                                                textAlign: i === 4 ? 'center' : 'left',
                                            }}
                                        >
                                            {h}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {recentCases.map((c, i) => (
                                    <tr
                                        key={c.id}
                                        id={`case-${c.id}`}
                                        className="transition-colors duration-200"
                                        style={{
                                            borderBottom: `1px solid ${colors.tableBorder}`,
                                            opacity: 0,
                                            animation: `staggerFadeIn 0.4s ease-out ${600 + i * 100}ms forwards`,
                                        }}
                                        onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'rgba(212, 175, 55, 0.03)'; }}
                                        onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; }}
                                    >
                                        <td className="px-5 py-4" style={{ borderRight: `1px solid ${colors.tableBorder}` }}>
                                            <p className="font-bold text-white text-sm">{c.id}</p>
                                            <p className="text-[11px] mt-0.5" style={{ color: colors.textSub }}>{c.cnic}</p>
                                        </td>
                                        <td className="px-5 py-4 text-sm" style={{ color: colors.textSub, borderRight: `1px solid ${colors.tableBorder}` }}>
                                            {c.category}
                                        </td>
                                        <td className="px-5 py-4 text-sm" style={{ color: colors.textSub, borderRight: `1px solid ${colors.tableBorder}` }}>
                                            {c.jurisdiction}
                                        </td>
                                        <td className="px-5 py-4" style={{ borderRight: `1px solid ${colors.tableBorder}` }}>
                                            <span className={c.status === 'Pending' ? 'badge-pending' : 'badge-active'}>{c.status}</span>
                                        </td>
                                        <td className="px-5 py-4 text-center">
                                            <button className="btn-eye mx-auto" onClick={() => navigate(`/dashboard/fir/${c.id}`)}>
                                                <EyeIcon size={16} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardHome;
