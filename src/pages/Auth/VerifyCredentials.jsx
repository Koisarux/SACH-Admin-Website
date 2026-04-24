import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { cities, cityDistricts, colors, validators, formatCnic } from '../../theme';

const VerifyCredentials = () => {
    const navigate = useNavigate();
    const [badge, setBadge] = useState('');
    const [cnic, setCnic] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [city, setCity] = useState('');
    const [district, setDistrict] = useState('');
    const [errors, setErrors] = useState({});
    const [shaking, setShaking] = useState(false);

    const validate = () => {
        const e = {};
        if (!validators.required(badge)) e.badge = 'Badge/Service number is required';
        else if (!validators.badge(badge)) e.badge = 'Format: PK-12345 (1-4 letters, dash, 3-7 digits)';
        if (!validators.required(cnic)) e.cnic = 'CNIC is required';
        else if (!validators.cnic(cnic)) e.cnic = 'Use format: XXXXX-XXXXXXX-X';
        if (!validators.required(password)) e.password = 'Password is required';
        else if (password.length < 6) e.password = 'Password must be at least 6 characters';
        if (!validators.required(city)) e.city = 'City is required';
        if (!validators.required(district)) e.district = 'District is required';
        return e;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const v = validate();
        setErrors(v);
        if (Object.keys(v).length > 0) {
            setShaking(true);
            setTimeout(() => setShaking(false), 500);
            return;
        }
        sessionStorage.setItem('sach_auth', 'true');
        navigate('/dashboard', { replace: true });
    };

    const handleCnicChange = (val) => {
        setCnic(formatCnic(val));
        if (errors.cnic) setErrors(prev => ({ ...prev, cnic: undefined }));
    };

    const clearError = (field) => {
        if (errors[field]) setErrors(prev => ({ ...prev, [field]: undefined }));
    };

    return (
        <form onSubmit={handleSubmit} className={`space-y-5 ${shaking ? 'shake' : ''}`} noValidate>
                <div className="mb-6">
                    <h2 className="text-2xl font-extrabold text-white mb-1 flex items-center gap-2">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg> Verify Credentials
                    </h2>
                    <p className="text-text-sub text-sm">Enter your service details to securely access the SACH portal.</p>
                </div>

                <div>
                    <label className="field-label">Official Badge/Service Number <span className="required">*</span></label>
                    <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text-sub">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="8" r="4"/><path d="M12 14v4M8 18h8"/></svg>
                        </span>
                        <input id="input-badge" type="text" value={badge} onChange={(e) => { setBadge(e.target.value); clearError('badge'); }} placeholder="e.g. PK-12345" className={`input-field pl-11 ${errors.badge ? 'input-error' : ''}`} />
                    </div>
                    {errors.badge && <span className="field-error-msg">{errors.badge}</span>}
                </div>

                <div>
                    <label className="field-label">CNIC <span className="text-text-sub text-xs font-normal">(National Identity Card)</span> <span className="required">*</span></label>
                    <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text-sub">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="6" y1="9" x2="18" y2="9"/></svg>
                        </span>
                        <input id="input-cnic" type="text" value={cnic} onChange={(e) => handleCnicChange(e.target.value)} placeholder="XXXXX-XXXXXXX-X" className={`input-field pl-11 ${errors.cnic ? 'input-error' : ''}`} maxLength={15} />
                    </div>
                    {errors.cnic && <span className="field-error-msg">{errors.cnic}</span>}
                </div>

                <div>
                    <label className="field-label">Password <span className="required">*</span></label>
                    <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text-sub">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                        </span>
                        <input id="input-password" type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => { setPassword(e.target.value); clearError('password'); }} placeholder="Enter your password" className={`input-field pl-11 pr-11 ${errors.password ? 'input-error' : ''}`} />
                        <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer bg-transparent border-none" style={{ color: colors.textSub }}>
                            {showPassword ? (
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                            ) : (
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                            )}
                        </button>
                    </div>
                    {errors.password && <span className="field-error-msg">{errors.password}</span>}
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="field-label">City <span className="required">*</span></label>
                        <select id="select-city" value={city} onChange={(e) => { setCity(e.target.value); setDistrict(''); clearError('city'); }} className={`select-field ${errors.city ? 'input-error' : ''}`}>
                            <option value="">Select City</option>
                            {cities.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                        {errors.city && <span className="field-error-msg">{errors.city}</span>}
                    </div>
                    <div>
                        <label className="field-label">District <span className="required">*</span></label>
                        <select id="select-district" value={district} onChange={(e) => { setDistrict(e.target.value); clearError('district'); }} className={`select-field ${errors.district ? 'input-error' : ''}`} disabled={!city}>
                            <option value="">{city ? 'Select District' : 'Select City First'}</option>
                            {city && (cityDistricts[city] || []).map(d => <option key={d} value={d}>{d}</option>)}
                        </select>
                        {errors.district && <span className="field-error-msg">{errors.district}</span>}
                    </div>
                </div>

                <div className="info-box flex items-start gap-3 animate-slide-up delay-200" style={{ opacity: 0 }}>
                    <span className="mt-0.5" style={{ color: colors.green }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
                    </span>
                    <p className="text-text-sub text-xs leading-relaxed">Your credentials will be verified against the secure SACH database. This process may take 30-60 seconds.</p>
                </div>

                <button id="btn-verify" type="submit" className="btn-primary flex items-center justify-center gap-3 text-base">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                    VERIFY & SETUP ACCOUNT
                </button>

                <div className="text-center space-y-2 pt-2">
                    <p className="text-text-sub text-sm">Need IT Support? <span className="text-white font-bold cursor-pointer gold-hover">Contact SACH Helpdesk</span></p>
                    <p className="text-text-sub text-sm">Don't have an account? <span onClick={() => navigate('/register')} className="text-white font-semibold cursor-pointer gold-hover">Register here</span></p>
                    <p onClick={() => navigate('/')} className="text-text-sub text-sm cursor-pointer gold-hover flex items-center justify-center gap-1">← <span className="underline">Back to Welcome</span></p>
                </div>
            </form>
    );
};

export default VerifyCredentials;
