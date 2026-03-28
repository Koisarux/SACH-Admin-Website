// ─── SACH Admin Portal — Centralized Theme ──────────────────────────────────
// All colors, styles, and shared constants in one place.

export const colors = {
    bgDeep:       '#060E08',
    bgCard:       '#0D1E11',
    bgSidebar:    '#081a0b',
    green:        '#01763A',
    greenDark:    '#015C2E',
    gold:         '#D4AF37',
    emerald:      '#4CAF50',
    divider:      '#0E1F12',
    tableBorder:  '#1A3320',
    textSub:      '#5A7A5D',
    inputBg:      '#091509',
    red:          '#DC2626',
    white:        '#FFFFFF',
    white95:      'rgba(255,255,255,0.95)',
    white85:      'rgba(255,255,255,0.85)',
    white75:      'rgba(255,255,255,0.75)',
    white50:      'rgba(255,255,255,0.50)',
};

// Gradient presets
export const gradients = {
    greenBtn: `linear-gradient(135deg, ${colors.green}, ${colors.greenDark})`,
    goldChip: `linear-gradient(135deg, ${colors.gold}, #b8942e)`,
    profileBg: `linear-gradient(135deg, rgba(1, 118, 58, 0.10), rgba(6, 14, 8, 0.95))`,
};

// Box shadows
export const shadows = {
    greenGlow: '0 6px 16px rgba(1, 118, 58, 0.35)',
    greenGlowLg: '0 8px 24px rgba(1, 118, 58, 0.5)',
    greenBtn: '0 4px 12px rgba(1, 118, 58, 0.3)',
    greenBtnHover: '0 6px 18px rgba(1, 118, 58, 0.45)',
    goldGlow: '0 0 12px rgba(212, 175, 55, 0.4)',
};

// The mock officer data used across dashboard pages
export const officer = {
    name: 'SP Ali Khan',
    initials: 'AK',
    monogram: 'SAK',
    rank: 'Superintendent of Police',
    district: 'District South',
    city: 'Karachi',
    badge: 'PK-84932',
};

// Pakistani city/district data used in auth & FIR pages
export const cities = [
    'Karachi', 'Lahore', 'Islamabad', 'Rawalpindi', 'Peshawar', 'Quetta',
    'Multan', 'Faisalabad', 'Hyderabad', 'Sialkot', 'Gujranwala',
    'Bahawalpur', 'Sargodha', 'Sukkur', 'Larkana'
];

export const cityDistricts = {
    'Karachi': ['Karachi Central', 'Karachi East', 'Karachi West', 'Karachi South', 'Karachi Korangi', 'Malir', 'Kemari'],
    'Lahore': ['Lahore City', 'Lahore Cantt', 'Model Town', 'Gulberg', 'Iqbal Town', 'Raiwind'],
    'Islamabad': ['Islamabad Capital Territory', 'Margalla Hills', 'Sihala', 'Noon'],
    'Rawalpindi': ['Rawalpindi City', 'Rawalpindi Cantt', 'Taxila', 'Gujar Khan', 'Murree'],
    'Peshawar': ['Peshawar City', 'Peshawar Cantt', 'Matani', 'Badaber'],
    'Quetta': ['Quetta City', 'Quetta Cantt', 'Mastung', 'Chaman Road'],
    'Multan': ['Multan City', 'Multan Cantt', 'Shujabad', 'Jalalpur Pirwala'],
    'Faisalabad': ['Faisalabad City', 'Faisalabad Cantt', 'Jaranwala', 'Sammundri', 'Tandlianwala'],
    'Hyderabad': ['Hyderabad City', 'Hyderabad Rural', 'Latifabad', 'Qasimabad'],
    'Sialkot': ['Sialkot City', 'Sialkot Cantt', 'Sambrial', 'Daska'],
    'Gujranwala': ['Gujranwala City', 'Gujranwala Cantt', 'Kamoke', 'Hafizabad Road'],
    'Bahawalpur': ['Bahawalpur City', 'Bahawalpur Cantt', 'Ahmadpur East', 'Uch Sharif'],
    'Sargodha': ['Sargodha City', 'Sargodha Cantt', 'Bhalwal', 'Kot Momin'],
    'Sukkur': ['Sukkur City', 'Rohri', 'Pano Aqil'],
    'Larkana': ['Larkana City', 'Ratodero', 'Kamber'],
};

export const ranks = [
    'Constable', 'Head Constable', 'ASI', 'SI', 'Inspector',
    'DSP', 'SP', 'SSP', 'DIG', 'AIG', 'IG'
];

export const categories = [
    'Theft / Robbery', 'Vehicle Accident', 'Property Dispute', 'Cybercrime',
    'Fraud / Scam', 'Assault / Violence', 'Missing Person', 'Kidnapping',
    'Land Encroachment', 'Other'
];

// ─── Validation helpers ──────────────────────────────────────────────────────
export const validators = {
    cnic: (v) => /^\d{5}-\d{7}-\d$/.test(v),
    cnicPartial: (v) => /^[\d-]*$/.test(v) && v.replace(/-/g, '').length <= 13,
    phone: (v) => /^\+?[\d\s-]{10,15}$/.test(v),
    badge: (v) => /^[A-Za-z]{1,4}-?\d{3,7}$/.test(v),
    email: (v) => !v || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
    required: (v) => v && v.trim().length > 0,
    password: (v) => v && v.length >= 8,
};

export const formatCnic = (value) => {
    const digits = value.replace(/\D/g, '').slice(0, 13);
    if (digits.length <= 5) return digits;
    if (digits.length <= 12) return `${digits.slice(0, 5)}-${digits.slice(5)}`;
    return `${digits.slice(0, 5)}-${digits.slice(5, 12)}-${digits.slice(12)}`;
};

// ─── Shared Inline Style Objects ─────────────────────────────────────────────
// Use these in components to avoid repeating inline styles.

export const pageStyle = {
    minHeight: '100vh',
    backgroundColor: colors.bgDeep,
    fontFamily: "'Roboto', sans-serif",
};

export const headerBar = {
    container: {
        borderColor: colors.divider,
    },
    userChip: {
        background: gradients.goldChip,
    },
};

export const inputStyle = {
    backgroundColor: colors.inputBg,
    border: `1.5px solid ${colors.divider}`,
};

export const selectStyle = {
    ...inputStyle,
};

export const cardStyle = {
    backgroundColor: colors.bgCard,
    border: `1px solid ${colors.divider}`,
};

// ─── Shared SVG icon components (tiny helpers) ───────────────────────────────
export const EyeIcon = ({ size = 18, color = colors.textSub }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
    </svg>
);

export const SearchIcon = ({ size = 16, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
        <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
    </svg>
);

export const ChevronDown = ({ size = 14, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
        <polyline points="6 9 12 15 18 9"/>
    </svg>
);

// ─── Stat Card SVG Icons (replace emojis) ────────────────────────────────────
export const FolderIcon = ({ size = 22, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
    </svg>
);

export const ClockIcon = ({ size = 22, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
    </svg>
);

export const SearchLensIcon = ({ size = 22, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
    </svg>
);

export const CheckCircleIcon = ({ size = 22, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
    </svg>
);

// ─── Dashboard Header (shared across dashboard pages) ────────────────────────
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from './LanguageContext';

export const DashboardHeader = ({ title }) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef(null);
    const navigate = useNavigate();
    const { t, toggleLang, isUrdu, fontFamily } = useLanguage();

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false);
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="px-8 flex items-center justify-between border-b" style={{ borderColor: colors.divider, fontFamily, height: '64px', position: 'sticky', top: 0, zIndex: 40, backgroundColor: colors.bgDeep }}>
            <h1 className="text-xl font-extrabold text-white">{title}</h1>
            <div className="flex items-center gap-4">
                <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-sub">
                        <SearchIcon />
                    </span>
                    <input
                        type="text"
                        placeholder={t('search')}
                        className="pl-10 pr-4 py-2 rounded-lg text-sm outline-none text-white transition-colors duration-200"
                        style={{ backgroundColor: colors.inputBg, border: `1px solid ${colors.divider}`, minWidth: '200px' }}
                        onFocus={(e) => { e.target.style.borderColor = colors.green; }}
                        onBlur={(e) => { e.target.style.borderColor = colors.divider; }}
                    />
                </div>
                <div className="relative" ref={menuRef}>
                    <div
                        className="flex items-center gap-3 cursor-pointer"
                        onClick={() => setMenuOpen(!menuOpen)}
                    >
                        <div className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold text-white" style={{ background: gradients.goldChip }}>
                            {officer.initials}
                        </div>
                        <div className="text-right">
                            <p className="text-sm font-bold text-white leading-tight">{officer.name}</p>
                            <p className="text-[10px] text-text-sub">{officer.district}</p>
                        </div>
                        <ChevronDown color={colors.textSub} />
                    </div>

                    {menuOpen && (
                        <div
                            className="absolute right-0 top-full mt-2 w-60 rounded-xl py-2 z-50 animate-scale-in"
                            style={{
                                backgroundColor: colors.bgCard,
                                border: `1px solid ${colors.divider}`,
                                boxShadow: '0 12px 40px rgba(0,0,0,0.5)',
                            }}
                        >
                            {/* Officer info header */}
                            <div className="px-4 py-3 border-b" style={{ borderColor: colors.divider }}>
                                <p className="text-sm font-bold text-white">{officer.name}</p>
                                <div className="flex items-center gap-2 mt-1">
                                    <span className="text-[10px] px-2 py-0.5 rounded font-semibold" style={{ background: 'rgba(212, 175, 55, 0.12)', color: colors.gold }}>Badge: {officer.badge}</span>
                                    <span className="flex items-center gap-1 text-[10px] font-semibold" style={{ color: colors.emerald }}>
                                        <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: colors.emerald }} />Active
                                    </span>
                                </div>
                            </div>

                            {/* Menu items */}
                            <button onClick={() => { setMenuOpen(false); navigate('/dashboard/profile'); }} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-left transition-colors duration-200 border-none bg-transparent cursor-pointer" style={{ color: colors.textSub }}
                                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'rgba(212, 175, 55, 0.06)'; e.currentTarget.style.color = colors.gold; }}
                                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = colors.textSub; }}
                            >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                                {t('myProfile')}
                            </button>
                            <button onClick={() => { setMenuOpen(false); navigate('/dashboard/settings'); }} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-left transition-colors duration-200 border-none bg-transparent cursor-pointer" style={{ color: colors.textSub }}
                                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'rgba(212, 175, 55, 0.06)'; e.currentTarget.style.color = colors.gold; }}
                                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = colors.textSub; }}
                            >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
                                {t('settings')}
                            </button>

                            <div className="my-1" style={{ borderTop: `1px solid ${colors.divider}` }} />

                            <button onClick={() => { toggleLang(); setMenuOpen(false); }} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-left transition-colors duration-200 border-none bg-transparent cursor-pointer" style={{ color: colors.textSub, fontFamily: isUrdu ? "'Roboto', sans-serif" : "'Noto Nastaliq Urdu', serif" }}
                                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'rgba(212, 175, 55, 0.06)'; e.currentTarget.style.color = colors.gold; }}
                                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = colors.textSub; }}
                            >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
                                {t('urduToggle')}
                            </button>

                            <div className="my-1" style={{ borderTop: `1px solid ${colors.divider}` }} />

                            <button onClick={() => { setMenuOpen(false); navigate('/'); }} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-left transition-colors duration-200 border-none bg-transparent cursor-pointer" style={{ color: '#ef4444' }}
                                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.06)'; }}
                                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; }}
                            >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                                {t('secureLogout')}
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

