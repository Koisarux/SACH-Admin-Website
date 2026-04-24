import React, { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, useMap, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { colors, gradients, shadows, categories } from '../../theme';
import { useLanguage } from '../../LanguageContext';

// Fix leaflet default marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const DraggableMarker = ({ position, setPosition, draggable = true }) => {
    const markerRef = React.useRef(null);
    const eventHandlers = useMemo(() => ({
        dragend() { const m = markerRef.current; if (m) setPosition([m.getLatLng().lat, m.getLatLng().lng]); },
    }), [setPosition]);
    return <Marker draggable={draggable} position={position} ref={markerRef} eventHandlers={eventHandlers} />;
};

const RecenterMap = ({ center }) => {
    const map = useMap();
    React.useEffect(() => { map.flyTo(center, map.getZoom()); }, [center]);
    return null;
};

const firDetailData = {
    'FIR-2025-001': {
        citizen: { name: 'Muhammad Ahmed Khan', cnic: '42101-*****41-2', phone: '+92 300 ****567', email: 'ahmed.khan@email.com' },
        caseId: '#9021', date: 'March 8, 2025', type: 'Theft / Robbery', status: 'Pending',
        description: 'Vehicle (Registration: LHR-1234) stolen from parking lot near Jinnah Market. White Toyota Corolla 2020 model, last seen parked at 13:00 hours. Vehicle was locked and alarmed. CCTV footage requested from adjacent shop.',
        location: 'Jinnah Market, Gulberg III, Lahore',
        evidence: [
            { name: 'IMG_001.jpg', type: 'image' },
            { name: 'IMG_003.jpg', type: 'image' },
            { name: 'VID_001.mp4', type: 'video' },
            { name: 'Report.pdf', type: 'document' },
        ],
        auditTrail: [
            { status: 'Case Created', detail: 'Officer M. Hasan initiated case', time: 'Mar 08, 2025 14:00', color: '#60A5FA' },
            { status: 'Evidence Uploaded', detail: '4 files attached', time: 'Mar 08, 2025 14:15', color: '#4CAF50' },
            { status: 'Case Viewed', detail: 'Supervisor reviewed case', time: 'Mar 09, 2025 08:12', color: '#D4AF37' },
        ],
        blockchainHash: 'a7f91d2f0f846a9b3b1f74bdddb5f4f374631cc5e8347196dbc4673682d4b3b8c42fc5138',
    },
};

// Fallback for any FIR ID not in the detail data
const defaultFIR = firDetailData['FIR-2025-001'];

const statusOptions = ['Pending', 'Active', 'Under Review', 'Resolved'];

const FIRDetail = () => {
    const { firId } = useParams();
    const navigate = useNavigate();
    const { t, fontFamily, fontSize } = useLanguage();

    const fir = firDetailData[firId] || defaultFIR;
    const displayId = fir.caseId || `#${firId?.split('-').pop() || '0000'}`;

    // Editing state
    const [isEditing, setIsEditing] = useState(false);
    const [editStatus, setEditStatus] = useState(fir.status);
    const [editDescription, setEditDescription] = useState(fir.description);
    const [editLocation, setEditLocation] = useState(fir.location);
    const [editDate, setEditDate] = useState('2025-03-08');
    const [editType, setEditType] = useState(fir.type);
    const [mapCenter] = useState([31.5204, 74.3587]);
    const [markerPos, setMarkerPos] = useState([31.5204, 74.3587]);

    const handleSave = () => {
        // In production, this would call the backend API
        setIsEditing(false);
        alert('Changes saved successfully. Backend integration pending.');
    };

    const handleCancel = () => {
        setEditStatus(fir.status);
        setEditDescription(fir.description);
        setEditLocation(fir.location);
        setEditDate(fir.date);
        setEditType(fir.type);
        setIsEditing(false);
    };

    const fileIcon = (type) => {
        if (type === 'image') return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={colors.textSub} strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>;
        if (type === 'video') return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={colors.textSub} strokeWidth="1.5"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg>;
        return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={colors.textSub} strokeWidth="1.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/></svg>;
    };

    return (
        <div style={{ minHeight: '100vh', backgroundColor: colors.bgDeep, fontFamily, fontSize }}>

            <div className="p-8">
                {/* Breadcrumb + Status */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2 text-sm">
                        <span className="cursor-pointer gold-hover" style={{ color: colors.textSub }} onClick={() => navigate('/dashboard/database')}>{t('firDatabase')}</span>
                        <span style={{ color: colors.textSub }}>&gt;</span>
                        <span className="text-white font-semibold">{t('caseId')} {displayId}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        {isEditing ? (
                            <select value={editStatus} onChange={(e) => setEditStatus(e.target.value)} className="select-field" style={{ fontSize: '12px', padding: '4px 10px', minWidth: '110px', height: '28px' }}>
                                {statusOptions.map(s => <option key={s} value={s}>{s}</option>)}
                            </select>
                        ) : (
                            <span className="text-xs font-semibold px-3 py-1 rounded-full" style={{ background: editStatus === 'Pending' ? 'rgba(212, 175, 55, 0.12)' : editStatus === 'Active' ? 'rgba(76, 175, 80, 0.12)' : editStatus === 'Resolved' ? 'rgba(156,163,175,0.1)' : 'rgba(96,165,250,0.1)', color: editStatus === 'Pending' ? colors.gold : editStatus === 'Active' ? colors.emerald : editStatus === 'Resolved' ? '#9CA3AF' : '#60A5FA', border: `1px solid ${editStatus === 'Pending' ? 'rgba(212, 175, 55, 0.3)' : editStatus === 'Active' ? 'rgba(76, 175, 80, 0.3)' : editStatus === 'Resolved' ? 'rgba(156,163,175,0.2)' : 'rgba(96,165,250,0.2)'}` }}>
                                {editStatus}
                            </span>
                        )}
                        {isEditing ? (
                            <div className="flex items-center gap-2">
                                <button onClick={handleCancel} className="rounded-lg text-xs font-semibold cursor-pointer transition-all" style={{ padding: '5px 14px', background: 'transparent', border: `1px solid ${colors.divider}`, color: colors.textSub }}>
                                    {t('cancel')}
                                </button>
                                <button onClick={handleSave} className="rounded-lg text-xs font-bold text-white cursor-pointer transition-all flex items-center gap-1.5" style={{ padding: '5px 14px', background: gradients.greenBtn, boxShadow: shadows.greenBtn, border: 'none' }}>
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                                    {t('saveChanges')}
                                </button>
                            </div>
                        ) : (
                            <button onClick={() => setIsEditing(true)} className="rounded-lg text-xs font-bold text-white cursor-pointer transition-all flex items-center gap-1.5" style={{ padding: '5px 14px', background: gradients.greenBtn, boxShadow: shadows.greenBtn, border: 'none' }}>
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                                {t('edit')}
                            </button>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-6">
                    {/* Left Column (2/3) */}
                    <div className="col-span-2 space-y-6">
                        {/* Citizen Profile */}
                        <div className="rounded-xl p-6" style={{ backgroundColor: colors.bgCard, border: `1px solid ${colors.divider}` }}>
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-sm font-bold text-white uppercase tracking-wider">{t('citizenProfile')}</h3>
                                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full flex items-center gap-1" style={{ background: 'rgba(76, 175, 80, 0.12)', color: colors.emerald }}><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg> {t('cnicVerified')}</span>
                            </div>
                            <div className="flex items-center gap-5">
                                <div className="w-14 h-14 rounded-full flex items-center justify-center text-lg font-bold" style={{ background: 'rgba(1, 118, 58, 0.15)', color: colors.green }}>
                                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                                </div>
                                <div className="grid grid-cols-2 gap-x-12 gap-y-3 flex-1">
                                    <div>
                                        <p className="text-[10px] uppercase tracking-wider mb-0.5" style={{ color: colors.textSub }}>{t('fullName')}</p>
                                        <p className="text-sm font-semibold text-white">{fir.citizen.name}</p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] uppercase tracking-wider mb-0.5" style={{ color: colors.textSub }}>{t('cnicNumber')}</p>
                                        <p className="text-sm font-semibold text-white">{fir.citizen.cnic}</p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] uppercase tracking-wider mb-0.5" style={{ color: colors.textSub }}>{t('contactNumber')}</p>
                                        <p className="text-sm font-semibold text-white">{fir.citizen.phone}</p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] uppercase tracking-wider mb-0.5" style={{ color: colors.textSub }}>{t('emailAddress')}</p>
                                        <p className="text-sm font-semibold text-white">{fir.citizen.email}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Incident Description */}
                        <div className="rounded-xl p-6" style={{ backgroundColor: colors.bgCard, border: `1px solid ${colors.divider}` }}>
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-sm font-bold text-white uppercase tracking-wider">{t('incidentDescription')}</h3>
                                {isEditing && <span className="text-[10px] font-semibold px-2 py-0.5 rounded" style={{ background: 'rgba(212,175,55,0.1)', color: colors.gold }}>EDITING</span>}
                            </div>
                            <div className="grid grid-cols-3 gap-6 mb-5">
                                <div>
                                    <p className="text-[10px] uppercase tracking-wider mb-0.5" style={{ color: colors.textSub }}>{t('caseId')}</p>
                                    <p className="text-sm font-bold text-white">{displayId}</p>
                                </div>
                                <div>
                                    <p className="text-[10px] uppercase tracking-wider mb-0.5" style={{ color: colors.textSub }}>{t('dateReported')}</p>
                                    {isEditing ? (
                                        <input type="date" value={editDate} onChange={(e) => setEditDate(e.target.value)} className="input-field text-sm py-1.5 px-2" style={{ colorScheme: 'dark' }} />
                                    ) : (
                                        <p className="text-sm font-semibold text-white">{editDate}</p>
                                    )}
                                </div>
                                <div>
                                    <p className="text-[10px] uppercase tracking-wider mb-0.5" style={{ color: colors.textSub }}>{t('incidentType')}</p>
                                    {isEditing ? (
                                        <select value={editType} onChange={(e) => setEditType(e.target.value)} className="select-field text-sm py-1.5 px-2">
                                            {categories.map(c => <option key={c} value={c}>{c}</option>)}
                                        </select>
                                    ) : (
                                        <p className="text-sm font-semibold text-white">{editType}</p>
                                    )}
                                </div>
                            </div>
                            <div>
                                <p className="text-[10px] uppercase tracking-wider mb-2" style={{ color: colors.textSub }}>{t('fullDescription')}</p>
                                {isEditing ? (
                                    <textarea value={editDescription} onChange={(e) => setEditDescription(e.target.value)} rows={4} className="input-field text-sm resize-none" style={{ lineHeight: '1.6' }} />
                                ) : (
                                    <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.75)' }}>{editDescription}</p>
                                )}
                            </div>
                        </div>

                        {/* Incident Location */}
                        <div className="rounded-xl p-6" style={{ backgroundColor: colors.bgCard, border: `1px solid ${colors.divider}` }}>
                            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">{t('incidentLocation')}</h3>
                            {isEditing ? (
                                <input type="text" value={editLocation} onChange={(e) => setEditLocation(e.target.value)} className="input-field text-sm mb-3" />
                            ) : null}
                            <div className="rounded-lg overflow-hidden" style={{ height: '220px', border: `1px solid ${colors.divider}` }}>
                                <MapContainer center={mapCenter} zoom={12} style={{ height: '100%', width: '100%' }} scrollWheelZoom={true}>
                                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution='&copy; OpenStreetMap' />
                                    <DraggableMarker position={markerPos} setPosition={setMarkerPos} draggable={isEditing} />
                                    <RecenterMap center={mapCenter} />
                                </MapContainer>
                            </div>
                            {!isEditing && (
                                <p className="text-xs font-medium mt-2" style={{ color: colors.textSub }}>
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={colors.emerald} strokeWidth="2" style={{ display: 'inline', verticalAlign: 'middle', marginRight: '4px' }}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                                    {editLocation}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Right Column (1/3) */}
                    <div className="space-y-6">
                        {/* Attached Evidence */}
                        <div className="rounded-xl p-6" style={{ backgroundColor: colors.bgCard, border: `1px solid ${colors.divider}` }}>
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-sm font-bold text-white uppercase tracking-wider">{t('attachedEvidence')}</h3>
                                <button className="text-xs font-semibold cursor-pointer bg-transparent border-none" style={{ color: colors.gold }}>{t('add')}</button>
                            </div>
                            <div className="grid grid-cols-2 gap-3 mb-3">
                                {fir.evidence.map((f, i) => (
                                    <div key={i} className="rounded-lg p-4 flex flex-col items-center gap-2 cursor-pointer transition-all duration-200" style={{ backgroundColor: colors.inputBg, border: `1px solid ${colors.divider}` }}
                                        onMouseEnter={(e) => { e.currentTarget.style.borderColor = colors.gold; }}
                                        onMouseLeave={(e) => { e.currentTarget.style.borderColor = colors.divider; }}
                                    >
                                        {fileIcon(f.type)}
                                        <p className="text-[10px] text-center truncate w-full" style={{ color: colors.textSub }}>{f.name}</p>
                                        <button className="absolute top-1 right-1 text-[10px] opacity-0 group-hover:opacity-100" style={{ color: colors.textSub }}>×</button>
                                    </div>
                                ))}
                            </div>
                            <p className="text-xs text-center" style={{ color: colors.textSub }}>{fir.evidence.length} {t('filesAttached')}</p>
                        </div>

                        {/* Immutable Audit Trail */}
                        <div className="rounded-xl p-6" style={{ backgroundColor: colors.bgCard, border: `1px solid ${colors.divider}` }}>
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-sm font-bold text-white uppercase tracking-wider">{t('immutableAuditTrail')}</h3>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={colors.gold} strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                            </div>

                            <div className="mb-4">
                                <p className="text-[9px] uppercase tracking-wider mb-1" style={{ color: colors.textSub }}>{t('blockchainHash')}</p>
                                <p className="text-[10px] font-mono break-all" style={{ color: colors.textSub }}>{fir.blockchainHash}</p>
                            </div>

                            <div className="space-y-0">
                                {fir.auditTrail.map((entry, i) => (
                                    <div key={i} className="flex gap-3 pb-4" style={{ borderLeft: `2px solid ${colors.divider}`, marginLeft: '6px', paddingLeft: '16px' }}>
                                        <div className="w-3 h-3 rounded-full shrink-0 -ml-[23px] mt-1" style={{ backgroundColor: entry.color, border: `2px solid ${colors.bgCard}` }} />
                                        <div>
                                            <p className="text-sm font-bold text-white">{entry.status}</p>
                                            <p className="text-xs" style={{ color: colors.textSub }}>{entry.detail}</p>
                                            <p className="text-[10px] mt-1" style={{ color: colors.textSub }}>{entry.time}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <p className="text-[10px] text-center mt-2 flex items-center justify-center gap-1" style={{ color: colors.textSub }}><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg> Secured by blockchain technology</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FIRDetail;
