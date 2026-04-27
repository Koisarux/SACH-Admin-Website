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
    phone: (v) => { const d = v.replace(/[^\d]/g, ''); return d.length === 10 && /^3\d{9}$/.test(d); },
    badge: (v) => /^[A-Za-z]{1,4}-?\d{3,7}$/.test(v),
    email: (v) => !v || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
    required: (v) => v && v.trim().length > 0,
    password: (v) => v && v.length >= 8,
};

export const formatPhone = (value) => {
    // Strip everything except digits
    let digits = value.replace(/[^\d]/g, '');
    // Remove leading 92 if someone types it (we show +92 separately)
    if (digits.startsWith('92')) digits = digits.slice(2);
    // Remove leading 0 (habit: 03xx → 3xx)
    if (digits.startsWith('0')) digits = digits.slice(1);
    // First digit must be 3 — discard anything else
    if (digits.length > 0 && digits[0] !== '3') digits = '';
    // Cap at 10 digits
    digits = digits.slice(0, 10);
    return '+92 ' + digits;
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

