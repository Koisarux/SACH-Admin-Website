import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { colors, gradients, shadows, cities, cityDistricts, categories, validators, formatCnic } from '../../theme';
import { useLanguage } from '../../LanguageContext';
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix default marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

const cityCoords = {
    'Karachi': [24.8607, 67.0011], 'Lahore': [31.5204, 74.3587], 'Islamabad': [33.6844, 73.0479],
    'Rawalpindi': [33.5651, 73.0169], 'Peshawar': [34.0151, 71.5249], 'Quetta': [30.1798, 66.975],
    'Multan': [30.1575, 71.5249], 'Faisalabad': [31.4504, 73.135], 'Hyderabad': [25.396, 68.3578],
    'Sialkot': [32.4945, 74.5229], 'Gujranwala': [32.1877, 74.1945], 'Bahawalpur': [29.3544, 71.6911],
    'Sargodha': [32.0836, 72.6711], 'Sukkur': [27.7052, 68.8574], 'Larkana': [27.558, 68.2121],
};

const DraggableMarker = ({ position, setPosition }) => {
    useMapEvents({ click(e) { setPosition([e.latlng.lat, e.latlng.lng]); } });
    return <Marker position={position} draggable eventHandlers={{ dragend: (e) => { const p = e.target.getLatLng(); setPosition([p.lat, p.lng]); } }} />;
};

const RecenterMap = ({ center }) => {
    const map = useMap();
    useEffect(() => { if (center) map.flyTo(center, 12, { duration: 1 }); }, [center, map]);
    return null;
};

const FileNewFIR = () => {
    const { t, fontFamily, fontSize } = useLanguage();
    const navigate = useNavigate();
    const stepLabels = [t('citizenInfo'), t('location'), t('detailsStep'), t('evidenceReview')];

    const [step, setStep] = useState(0);
    const [slideDir, setSlideDir] = useState('right');
    const [errors, setErrors] = useState({});
    const [shaking, setShaking] = useState(false);

    // Step 0: Citizen Info
    const [fullName, setFullName] = useState('');
    const [cnicNumber, setCnicNumber] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [gender, setGender] = useState('');
    const [dob, setDob] = useState('');

    // Step 1: Location
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [district, setDistrict] = useState('');
    const [mapCenter, setMapCenter] = useState([30.3753, 69.3451]);
    const [markerPos, setMarkerPos] = useState([30.3753, 69.3451]);

    // Step 2: Details
    const [incidentDate, setIncidentDate] = useState('');
    const [incidentTime, setIncidentTime] = useState('');
    const [category, setCategory] = useState('');
    const [customCategory, setCustomCategory] = useState('');
    const [showCategoryModal, setShowCategoryModal] = useState(false);
    const [description, setDescription] = useState('');
    const [isRecording, setIsRecording] = useState(false);
    const recognitionRef = useRef(null);

    // Step 3: Evidence
    const [evidenceFiles, setEvidenceFiles] = useState([]);
    const fileInputRef = useRef(null);
    const [submitted, setSubmitted] = useState(false);

    const resetForm = () => {
        setStep(0); setSlideDir('right'); setErrors({}); setShaking(false);
        setFullName(''); setCnicNumber(''); setPhone(''); setEmail(''); setGender(''); setDob('');
        setAddress(''); setCity(''); setDistrict(''); setMapCenter([30.3753, 69.3451]); setMarkerPos([30.3753, 69.3451]);
        setIncidentDate(''); setIncidentTime(''); setCategory(''); setCustomCategory(''); setDescription('');
        setEvidenceFiles([]); setSubmitted(false); setIsRecording(false); setShowCategoryModal(false);
        if (recognitionRef.current) { try { recognitionRef.current.stop(); } catch(e) {} }
    };

    const validateStep = (s) => {
        const e = {};
        if (s === 0) {
            if (!validators.required(fullName)) e.fullName = t('fullName') + ' is required';
            else if (fullName.trim().length < 3) e.fullName = 'Name must be at least 3 characters';
            else if (!/^[A-Za-z\s.]+$/.test(fullName.trim())) e.fullName = t('nameLettersOnly');
            if (!validators.required(cnicNumber)) e.cnicNumber = 'CNIC is required';
            else if (!validators.cnic(cnicNumber)) e.cnicNumber = 'Use format: XXXXX-XXXXXXX-X';
            if (!validators.required(phone)) e.phone = 'Phone number is required';
            else if (!/^(\+92[\s-]?3\d{2}[\s-]?\d{7}|03\d{2}[\s-]?\d{7})$/.test(phone.replace(/\s/g,''))) e.phone = t('phoneFormatPk');
            if (email && !validators.email(email)) e.email = 'Enter a valid email address';
        } else if (s === 1) {
            if (!validators.required(address)) e.address = 'Street address is required';
            if (!validators.required(city)) e.city = 'City is required';
            if (!validators.required(district)) e.district = 'District is required';
        } else if (s === 2) {
            if (!validators.required(incidentDate)) e.incidentDate = 'Incident date is required';
            const effectiveCat = category === 'Other' ? customCategory : category;
            if (!validators.required(effectiveCat)) e.category = 'Incident category is required';
            if (!validators.required(description)) e.description = 'Incident description is required';
            else if (description.trim().length < 20) e.description = 'Please provide at least 20 characters';
            else if (/^(.)\1+$/.test(description.trim())) e.description = t('descriptionMeaningful');
        }
        return e;
    };

    const triggerShake = () => { setShaking(true); setTimeout(() => setShaking(false), 500); };
    const goNext = () => {
        const v = validateStep(step);
        setErrors(v);
        if (Object.keys(v).length > 0) { triggerShake(); return; }
        if (step < 3) { setSlideDir('right'); setStep(s => s + 1); setErrors({}); }
        else { setSubmitted(true); }
    };
    const goPrev = () => { if (step > 0) { setSlideDir('left'); setStep(s => s - 1); setErrors({}); } };
    const clearError = (field) => { if (errors[field]) setErrors(prev => ({ ...prev, [field]: undefined })); };
    const handleCnicChange = (val) => { setCnicNumber(formatCnic(val)); clearError('cnicNumber'); };
    const err = (field) => errors[field] ? <span className="field-error-msg">{errors[field]}</span> : null;
    const ec = (field) => errors[field] ? 'input-error' : '';

    const handleCityChange = (val) => {
        setCity(val); setDistrict(''); clearError('city');
        if (cityCoords[val]) { setMapCenter(cityCoords[val]); setMarkerPos(cityCoords[val]); }
    };

    const toggleVoice = () => {
        const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SR) { alert(t('micNotSupported')); return; }
        if (isRecording && recognitionRef.current) {
            recognitionRef.current.stop(); setIsRecording(false); return;
        }
        const recognition = new SR();
        recognition.continuous = true; recognition.interimResults = true; recognition.lang = 'en-US';
        recognition.onresult = (event) => {
            let transcript = '';
            for (let i = event.resultIndex; i < event.results.length; i++) {
                transcript += event.results[i][0].transcript;
            }
            if (event.results[event.results.length - 1].isFinal) {
                setDescription(prev => prev + (prev ? ' ' : '') + transcript);
            }
        };
        recognition.onerror = () => setIsRecording(false);
        recognition.onend = () => setIsRecording(false);
        recognitionRef.current = recognition;
        recognition.start(); setIsRecording(true);
    };

    const handleFileSelect = (e) => {
        const files = Array.from(e.target.files || []);
        setEvidenceFiles(prev => [...prev, ...files]);
        e.target.value = '';
    };
    const removeFile = (idx) => setEvidenceFiles(prev => prev.filter((_, i) => i !== idx));
    const formatSize = (bytes) => bytes < 1024 * 1024 ? (bytes / 1024).toFixed(1) + ' KB' : (bytes / (1024 * 1024)).toFixed(1) + ' MB';

    const handleCategoryChange = (val) => {
        setCategory(val); clearError('category');
        if (val === 'Other') { setShowCategoryModal(true); }
        else { setCustomCategory(''); }
    };

    const renderStepper = () => (
        <div className="flex items-center justify-center px-8 py-5 gap-2" style={{ borderBottom: `1px solid ${colors.divider}` }}>
            {stepLabels.map((label, i) => {
                const active = step === i;
                const done = step > i;
                return (
                    <React.Fragment key={i}>
                        <div className="flex flex-col items-center" style={{ minWidth: '80px' }}>
                            <div className={`stepper-circle ${active ? 'active' : done ? 'done' : 'pending'}`}>
                                {done ? (
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
                                ) : (
                                    <svg width="24" height="24" viewBox="0 0 24 24">
                                        <text x="50%" y="50%" dominantBaseline="central" textAnchor="middle" fontSize="14" fontWeight="bold" fill="currentColor">{i + 1}</text>
                                    </svg>
                                )}
                            </div>
                            <span className="stepper-label" style={{ color: active ? colors.gold : done ? colors.green : colors.textSub }}>{label}</span>
                        </div>
                        {i < stepLabels.length - 1 && (
                            <div className="stepper-line" style={{ backgroundColor: step > i ? colors.green : colors.divider }} />
                        )}
                    </React.Fragment>
                );
            })}
        </div>
    );

    const renderCitizenInfo = () => (
        <div className={slideDir === 'right' ? 'step-enter' : 'step-exit'}>
            <h3 className="text-xl font-bold text-white mb-1">{t('citizenInformation')}</h3>
            <p className="text-sm mb-6" style={{ color: colors.textSub }}>{t('enterComplainantDetails')}</p>
            <div className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="field-label">{t('fullName')} <span className="required">*</span></label>
                        <input id="fir-fullname" type="text" value={fullName} onChange={(e) => { setFullName(e.target.value); clearError('fullName'); }} placeholder="Muhammad Ahmed Khan" className={`input-field ${ec('fullName')}`} />
                        {err('fullName')}
                    </div>
                    <div>
                        <label className="field-label">{t('cnicNumberLabel')} <span className="required">*</span></label>
                        <input id="fir-cnic" type="text" value={cnicNumber} onChange={(e) => handleCnicChange(e.target.value)} placeholder="42101-1234567-8" className={`input-field ${ec('cnicNumber')}`} maxLength={15} />
                        {err('cnicNumber')}
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="field-label">{t('phoneNumber')} <span className="required">*</span></label>
                        <input id="fir-phone" type="tel" value={phone} onChange={(e) => { setPhone(e.target.value); clearError('phone'); }} placeholder="+92 300 1234567" className={`input-field ${ec('phone')}`} />
                        {err('phone')}
                    </div>
                    <div>
                        <label className="field-label">{t('emailAddress')}</label>
                        <input id="fir-email" type="email" value={email} onChange={(e) => { setEmail(e.target.value); clearError('email'); }} placeholder="ahmed.khan@email.com" className={`input-field ${ec('email')}`} />
                        {err('email')}
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="field-label">{t('gender')}</label>
                        <select id="fir-gender" value={gender} onChange={(e) => setGender(e.target.value)} className="select-field">
                            <option value="">{t('selectGender')}</option>
                            <option value="male">{t('male')}</option>
                            <option value="female">{t('female')}</option>
                            <option value="other">{t('other')}</option>
                        </select>
                    </div>
                    <div>
                        <label className="field-label">{t('dateOfBirth')}</label>
                        <input id="fir-dob" type="date" value={dob} onChange={(e) => setDob(e.target.value)} className="input-field" style={{ colorScheme: 'dark' }} />
                    </div>
                </div>
            </div>
        </div>
    );

    const renderLocation = () => (
        <div className={slideDir === 'right' ? 'step-enter' : 'step-exit'}>
            <h3 className="text-xl font-bold text-white mb-1">{t('locationDetails')}</h3>
            <p className="text-sm mb-6" style={{ color: colors.textSub }}>{t('provideLocationInfo')}</p>
            <div className="space-y-5">
                <div>
                    <label className="field-label">{t('streetAddress')} <span className="required">*</span></label>
                    <input id="fir-address" type="text" value={address} onChange={(e) => { setAddress(e.target.value); clearError('address'); }} placeholder={t('enterCompleteAddress')} className={`input-field ${ec('address')}`} />
                    {err('address')}
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="field-label">{t('city')} <span className="required">*</span></label>
                        <select id="fir-city" value={city} onChange={(e) => handleCityChange(e.target.value)} className={`select-field ${ec('city')}`}>
                            <option value="">{t('selectCity')}</option>
                            {cities.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                        {err('city')}
                    </div>
                    <div>
                        <label className="field-label">{t('district')} <span className="required">*</span></label>
                        <select id="fir-district" value={district} onChange={(e) => { setDistrict(e.target.value); clearError('district'); }} className={`select-field ${ec('district')}`} disabled={!city}>
                            <option value="">{city ? t('selectDistrict') : t('selectCityFirst')}</option>
                            {city && (cityDistricts[city] || []).map(d => <option key={d} value={d}>{d}</option>)}
                        </select>
                        {err('district')}
                    </div>
                </div>
                <div className="rounded-xl overflow-hidden" style={{ height: '220px', border: `1.5px solid ${colors.divider}` }}>
                    <MapContainer center={mapCenter} zoom={6} style={{ height: '100%', width: '100%' }} scrollWheelZoom={true}>
                        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution='&copy; OpenStreetMap' />
                        <DraggableMarker position={markerPos} setPosition={setMarkerPos} />
                        <RecenterMap center={mapCenter} />
                    </MapContainer>
                </div>
            </div>
        </div>
    );

    const renderDetails = () => (
        <div className={slideDir === 'right' ? 'step-enter' : 'step-exit'}>
            <h3 className="text-xl font-bold text-white mb-1">{t('incidentDetails')}</h3>
            <p className="text-sm mb-6" style={{ color: colors.textSub }}>{t('describeIncident')}</p>
            <div className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="field-label">{t('incidentDate')} <span className="required">*</span></label>
                        <input id="fir-date" type="date" value={incidentDate} onChange={(e) => { setIncidentDate(e.target.value); clearError('incidentDate'); }} className={`input-field ${ec('incidentDate')}`} style={{ colorScheme: 'dark' }} />
                        {err('incidentDate')}
                    </div>
                    <div>
                        <label className="field-label">{t('incidentTime')}</label>
                        <input id="fir-time" type="time" value={incidentTime} onChange={(e) => setIncidentTime(e.target.value)} className="input-field" style={{ colorScheme: 'dark' }} />
                    </div>
                </div>
                <div>
                    <label className="field-label">{t('incidentCategory')} <span className="required">*</span></label>
                    <select id="fir-category" value={category} onChange={(e) => handleCategoryChange(e.target.value)} className={`select-field ${ec('category')}`}>
                        <option value="">{t('selectIncidentType')}</option>
                        {categories.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                    {category === 'Other' && customCategory && (
                        <div className="mt-2 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg" style={{ background: 'rgba(212,175,55,0.08)', border: '1px solid rgba(212,175,55,0.3)' }}>
                            <span className="text-xs font-semibold" style={{ color: colors.gold }}>{customCategory}</span>
                            <button type="button" onClick={() => setShowCategoryModal(true)} className="text-xs cursor-pointer" style={{ color: colors.textSub, background: 'none', border: 'none' }}>✎</button>
                        </div>
                    )}
                    {err('category')}
                </div>
                <div>
                    <label className="field-label">{t('incidentDescriptionLabel')} <span className="required">*</span></label>
                    <div className="relative">
                        <textarea id="fir-description" value={description} onChange={(e) => { setDescription(e.target.value); clearError('description'); }} placeholder={t('describeInDetail')} rows={5} className={`input-field resize-none ${ec('description')}`} style={{ paddingBottom: '48px' }} />
                        <button type="button" onClick={toggleVoice} className={`absolute bottom-3 right-3 w-9 h-9 rounded-full flex items-center justify-center cursor-pointer transition-all duration-200 ${isRecording ? 'mic-recording' : ''}`} style={{ background: isRecording ? undefined : gradients.greenBtn, border: 'none', boxShadow: isRecording ? undefined : shadows.greenBtn }} title={isRecording ? t('stopRecording') : 'Voice-to-text'}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg>
                        </button>
                    </div>
                    {err('description')}
                    {isRecording && <p className="text-xs mt-1 animate-pulse" style={{ color: '#DC2626' }}>● {t('recording')}</p>}
                    {description && !errors.description && !isRecording && (
                        <p className="text-xs mt-1" style={{ color: colors.textSub }}>{description.length} {t('characters')}</p>
                    )}
                    <p className="text-xs mt-1" style={{ color: colors.textSub }}>{t('voiceToText')}</p>
                </div>
            </div>
        </div>
    );

    const renderEvidence = () => (
        <div className={slideDir === 'right' ? 'step-enter' : 'step-exit'}>
            <h3 className="text-xl font-bold text-white mb-1">{t('uploadEvidence')}</h3>
            <p className="text-sm mb-6" style={{ color: colors.textSub }}>{t('addPhotosVideos')}</p>
            <div className="space-y-5">
                <input type="file" ref={fileInputRef} onChange={handleFileSelect} multiple accept="image/*,video/*,.pdf" style={{ display: 'none' }} />
                <div onClick={() => fileInputRef.current?.click()} className="rounded-xl cursor-pointer transition-all duration-300 flex items-center justify-center" style={{ height: evidenceFiles.length > 0 ? '120px' : '180px', background: evidenceFiles.length > 0 ? 'rgba(1, 118, 58, 0.07)' : colors.inputBg, border: `2px dashed ${evidenceFiles.length > 0 ? colors.green : colors.divider}` }}>
                    <div className="text-center">
                        <svg className="mx-auto mb-2" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke={evidenceFiles.length > 0 ? colors.gold : colors.textSub} strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                        <p className="font-semibold" style={{ color: evidenceFiles.length > 0 ? colors.gold : colors.textSub }}>{evidenceFiles.length > 0 ? `${evidenceFiles.length} ${t('filesSelected')}` : t('browseFiles')}</p>
                        <p className="text-xs mt-1" style={{ color: colors.textSub }}>{t('acceptedFormats')}</p>
                    </div>
                </div>
                {evidenceFiles.length > 0 && (
                    <div className="file-preview-grid">
                        {evidenceFiles.map((file, idx) => (
                            <div key={idx} className="file-preview-item">
                                <button type="button" className="file-remove-btn" onClick={() => removeFile(idx)}>×</button>
                                {file.type.startsWith('image/') ? (
                                    <img src={URL.createObjectURL(file)} alt={file.name} className="file-preview-thumb" />
                                ) : (
                                    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke={colors.textSub} strokeWidth="1.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/></svg>
                                )}
                                <span className="file-name">{file.name}</span>
                                <span className="file-size">{formatSize(file.size)}</span>
                            </div>
                        ))}
                    </div>
                )}
                <div className="info-box flex items-start gap-3">
                    <svg className="mt-0.5 shrink-0" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={colors.gold} strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
                    <p className="text-xs leading-relaxed" style={{ color: colors.textSub }}>{t('evidenceOptional')}</p>
                </div>
                {(fullName || cnicNumber || category) && (
                    <div className="card p-5 space-y-3 animate-scale-in">
                        <h4 className="text-sm font-bold text-white flex items-center gap-2">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={colors.gold} strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/></svg>
                            {t('firSummary')}
                        </h4>
                        <div className="grid grid-cols-2 gap-3 text-sm">
                            {fullName && <div><span className="text-xs" style={{ color: colors.textSub }}>{t('name')}</span><p className="text-white font-medium">{fullName}</p></div>}
                            {cnicNumber && <div><span className="text-xs" style={{ color: colors.textSub }}>{t('cnic')}</span><p className="text-white font-medium">{cnicNumber}</p></div>}
                            {city && <div><span className="text-xs" style={{ color: colors.textSub }}>{t('city')}</span><p className="text-white font-medium">{city}</p></div>}
                            {district && <div><span className="text-xs" style={{ color: colors.textSub }}>{t('district')}</span><p className="text-white font-medium">{district}</p></div>}
                            {category && <div><span className="text-xs" style={{ color: colors.textSub }}>{t('category')}</span><p className="text-white font-medium">{category === 'Other' ? customCategory || 'Other' : category}</p></div>}
                            {incidentDate && <div><span className="text-xs" style={{ color: colors.textSub }}>{t('date')}</span><p className="text-white font-medium">{incidentDate}</p></div>}
                            {evidenceFiles.length > 0 && <div><span className="text-xs" style={{ color: colors.textSub }}>Evidence</span><p className="text-white font-medium">{evidenceFiles.length} {t('filesSelected')}</p></div>}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );

    if (submitted) {
        const firId = `FIR-2025-${Math.floor(10000 + Math.random() * 89999)}`;
        return (
            <div className="flex items-center justify-center" style={{ height: '100%', fontFamily, fontSize }}>
                <div className="card p-10 max-w-md text-center animate-scale-in">
                    <div className="w-20 h-20 rounded-full mx-auto mb-5 flex items-center justify-center" style={{ background: 'rgba(1, 118, 58, 0.12)', border: `2px solid rgba(1, 118, 58, 0.5)` }}>
                        <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke={colors.green} strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                    </div>
                    <h2 className="text-2xl font-extrabold text-white mb-2">{t('eFIRSubmitted')}</h2>
                    <p className="text-sm mb-5 leading-relaxed" style={{ color: colors.textSub }}>{t('complaintFiled')}</p>
                    <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl mb-6" style={{ background: 'rgba(212, 175, 55, 0.08)', border: '1px solid rgba(212, 175, 55, 0.3)' }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={colors.gold} strokeWidth="2"><line x1="4" y1="9" x2="20" y2="9"/><line x1="4" y1="15" x2="20" y2="15"/><line x1="10" y1="3" x2="8" y2="21"/><line x1="16" y1="3" x2="14" y2="21"/></svg>
                        <span className="font-bold tracking-wider" style={{ color: colors.gold }}>{firId}</span>
                    </div>
                    <br />
                    <button onClick={() => { resetForm(); navigate('/dashboard'); }} className="btn-primary mt-2">{t('viewDashboard')}</button>
                </div>
            </div>
        );
    }

    const stepContent = [renderCitizenInfo, renderLocation, renderDetails, renderEvidence];

    return (
        <div className="fir-form-container" style={{ fontFamily, fontSize }}>
            {renderStepper()}
            <div className="fir-form-scroll">
                <div className={`max-w-2xl mx-auto p-8 ${shaking ? 'shake' : ''}`}>
                    <div className="card p-8" key={step}>{stepContent[step]()}</div>
                </div>
            </div>
            <div className="fir-form-footer">
                <button onClick={goPrev} className="px-6 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 cursor-pointer" style={{ border: `1px solid ${colors.divider}`, background: 'transparent', color: colors.textSub }} onMouseEnter={(e) => { e.currentTarget.style.borderColor = colors.gold; e.currentTarget.style.color = colors.gold; }} onMouseLeave={(e) => { e.currentTarget.style.borderColor = colors.divider; e.currentTarget.style.color = colors.textSub; }}>
                    {step === 0 ? t('cancel') : t('back')}
                </button>
                <button id="btn-next-step" onClick={goNext} className="px-8 py-2.5 rounded-lg text-sm font-bold text-white transition-all duration-300 cursor-pointer flex items-center gap-2" style={{ background: gradients.greenBtn, border: 'none', boxShadow: shadows.greenBtn }} onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = shadows.greenBtnHover; }} onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = shadows.greenBtn; }}>
                    {step === 3 ? (<><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>{t('submitSecureFIR')}</>) : t('nextStep')}
                </button>
            </div>

            {/* Custom Category Modal */}
            {showCategoryModal && (
                <div className="modal-overlay" onClick={() => { if (!customCategory) { setCategory(''); } setShowCategoryModal(false); }}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <h3>{t('customCategory')}</h3>
                        <p>{t('enterCustomCategory')}</p>
                        <input type="text" value={customCategory} onChange={(e) => setCustomCategory(e.target.value)} placeholder={t('enterCustomCategory')} className="input-field" autoFocus />
                        <div className="modal-actions">
                            <button onClick={() => { if (!customCategory) { setCategory(''); } setShowCategoryModal(false); }} style={{ background: 'transparent', border: `1px solid ${colors.divider}`, color: colors.textSub }}>{t('cancel')}</button>
                            <button onClick={() => { if (customCategory.trim()) { setShowCategoryModal(false); } }} style={{ background: gradients.greenBtn, border: 'none', color: 'white', boxShadow: shadows.greenBtn }}>{t('confirm')}</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FileNewFIR;
