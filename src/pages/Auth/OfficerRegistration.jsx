import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { cities, cityDistricts, ranks, validators, formatCnic } from '../../theme';

const OfficerRegistration = () => {
    const navigate = useNavigate();
    const [fullName, setFullName] = useState('');
    const [badge, setBadge] = useState('');
    const [cnic, setCnic] = useState('');
    const [rank, setRank] = useState('');
    const [city, setCity] = useState('');
    const [district, setDistrict] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [shaking, setShaking] = useState(false);

    const validate = () => {
        const e = {};
        if (!validators.required(fullName)) e.fullName = 'Full name is required';
        else if (fullName.trim().length < 3) e.fullName = 'Name must be at least 3 characters';
        if (!validators.required(badge)) e.badge = 'Badge number is required';
        else if (!validators.badge(badge)) e.badge = 'Format: PK-12345';
        if (!validators.required(cnic)) e.cnic = 'CNIC is required';
        else if (!validators.cnic(cnic)) e.cnic = 'Use format: XXXXX-XXXXXXX-X';
        if (!validators.required(rank)) e.rank = 'Rank is required';
        if (!validators.required(city)) e.city = 'City is required';
        if (!validators.required(district)) e.district = 'District is required';
        if (!validators.required(password)) e.password = 'Password is required';
        else if (!validators.password(password)) e.password = 'Minimum 8 characters';
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
        navigate('/');
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
                <div className="mb-4">
                    <h2 className="text-2xl font-extrabold text-white mb-1">Officer Registration</h2>
                    <p className="text-text-sub text-sm">Create your new official credentials to access the SACH portal.</p>
                </div>

                <div>
                    <label className="field-label">Full Name (As per CNIC) <span className="required">*</span></label>
                    <input id="input-fullname" type="text" value={fullName} onChange={(e) => { setFullName(e.target.value); clearError('fullName'); }} placeholder="Muhammad Ali" className={`input-field ${errors.fullName ? 'input-error' : ''}`} />
                    {errors.fullName && <span className="field-error-msg">{errors.fullName}</span>}
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="field-label">Badge/Service No. <span className="required">*</span></label>
                        <input id="input-badge-reg" type="text" value={badge} onChange={(e) => { setBadge(e.target.value); clearError('badge'); }} placeholder="e.g. PK-12345" className={`input-field ${errors.badge ? 'input-error' : ''}`} />
                        {errors.badge && <span className="field-error-msg">{errors.badge}</span>}
                    </div>
                    <div>
                        <label className="field-label">CNIC <span className="required">*</span></label>
                        <input id="input-cnic-reg" type="text" value={cnic} onChange={(e) => handleCnicChange(e.target.value)} placeholder="XXXXX-XXXXXXX-X" className={`input-field ${errors.cnic ? 'input-error' : ''}`} maxLength={15} />
                        {errors.cnic && <span className="field-error-msg">{errors.cnic}</span>}
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="field-label">Rank <span className="required">*</span></label>
                        <select id="select-rank" value={rank} onChange={(e) => { setRank(e.target.value); clearError('rank'); }} className={`select-field ${errors.rank ? 'input-error' : ''}`}>
                            <option value="">Select Rank</option>
                            {ranks.map(r => <option key={r} value={r}>{r}</option>)}
                        </select>
                        {errors.rank && <span className="field-error-msg">{errors.rank}</span>}
                    </div>
                    <div>
                        <label className="field-label">City <span className="required">*</span></label>
                        <select id="select-city-reg" value={city} onChange={(e) => { setCity(e.target.value); setDistrict(''); clearError('city'); }} className={`select-field ${errors.city ? 'input-error' : ''}`}>
                            <option value="">Select City</option>
                            {cities.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                        {errors.city && <span className="field-error-msg">{errors.city}</span>}
                    </div>
                </div>

                <div>
                    <label className="field-label">District <span className="required">*</span></label>
                    <select id="select-district-reg" value={district} onChange={(e) => { setDistrict(e.target.value); clearError('district'); }} className={`select-field ${errors.district ? 'input-error' : ''}`} disabled={!city}>
                        <option value="">{city ? 'Select District' : 'Select City First'}</option>
                        {city && (cityDistricts[city] || []).map(d => <option key={d} value={d}>{d}</option>)}
                    </select>
                    {errors.district && <span className="field-error-msg">{errors.district}</span>}
                </div>

                <div>
                    <label className="field-label">Create Secure Password <span className="required">*</span></label>
                    <input id="input-password" type="password" value={password} onChange={(e) => { setPassword(e.target.value); clearError('password'); }} placeholder="••••••••" className={`input-field ${errors.password ? 'input-error' : ''}`} />
                    {errors.password && <span className="field-error-msg">{errors.password}</span>}
                    {password && !errors.password && (
                        <div className="flex items-center gap-2 mt-2">
                            <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}>
                                <div className="h-full rounded-full transition-all duration-300" style={{
                                    width: password.length >= 12 ? '100%' : password.length >= 10 ? '75%' : password.length >= 8 ? '50%' : '25%',
                                    backgroundColor: password.length >= 12 ? '#4CAF50' : password.length >= 10 ? '#D4AF37' : password.length >= 8 ? '#D4AF37' : '#DC2626'
                                }} />
                            </div>
                            <span className="text-[11px] font-medium" style={{ color: password.length >= 12 ? '#4CAF50' : password.length >= 8 ? '#D4AF37' : '#DC2626' }}>
                                {password.length >= 12 ? 'Strong' : password.length >= 8 ? 'Medium' : 'Weak'}
                            </span>
                        </div>
                    )}
                </div>

                <button id="btn-submit-reg" type="submit" className="btn-primary text-base tracking-wider">SUBMIT FOR REVIEW</button>

                <div className="text-center space-y-2 pt-1">
                    <p className="text-text-sub text-sm">Already have an account? <span onClick={() => navigate('/login')} className="text-white font-semibold cursor-pointer gold-hover">Sign in</span></p>
                    <p onClick={() => navigate('/')} className="text-text-sub text-sm cursor-pointer gold-hover flex items-center justify-center gap-1">← <span className="underline">Back to Welcome</span></p>
                </div>
            </form>
    );
};

export default OfficerRegistration;
