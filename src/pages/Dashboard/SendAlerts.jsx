import React, { useState } from 'react';
import { colors, gradients, shadows } from '../../theme';
import { useLanguage } from '../../LanguageContext';

const recentAlerts = [
    { title: 'Security Alert – Sector G-11', desc: 'Suspicious activity reported near G-11 markaz. All units advised to increase patrols.', type: 'Emergency', time: '2 hours ago', scope: 'District' },
    { title: 'Traffic Advisory – Jinnah Avenue', desc: 'Road closure on Jinnah Avenue due to VIP movement. Alternate routes advised.', type: 'Advisory', time: '5 hours ago', scope: 'City' },
    { title: 'Weather Warning – Heavy Rain', desc: 'Heavy rainfall expected in Karachi division. Emergency teams on standby.', type: 'Notice', time: '1 day ago', scope: 'Province' },
    { title: 'Missing Child Alert', desc: '12-year-old boy missing from Saddar area. Last seen wearing blue school uniform.', type: 'Emergency', time: '1 day ago', scope: 'District' },
    { title: 'System Maintenance Notice', desc: 'SACH portal will undergo scheduled maintenance on March 13 from 02:00 to 06:00 AM.', type: 'Update', time: '2 days ago', scope: 'All' },
];

const typeColors = {
    'Emergency': { bg: 'rgba(220, 38, 38, 0.10)', color: '#EF4444', border: 'rgba(220, 38, 38, 0.3)' },
    'Advisory':  { bg: 'rgba(212, 175, 55, 0.10)', color: '#D4AF37', border: 'rgba(212, 175, 55, 0.3)' },
    'Notice':    { bg: 'rgba(96, 165, 250, 0.10)', color: '#60A5FA', border: 'rgba(96, 165, 250, 0.3)' },
    'Update':    { bg: 'rgba(76, 175, 80, 0.10)', color: '#4CAF50', border: 'rgba(76, 175, 80, 0.3)' },
};

const audiences = ['All Officers', 'District Officers', 'Citizens – Jurisdiction', 'Citizens – City-wide', 'All Users'];

const SendAlerts = () => {
    const { t, fontFamily, fontSize } = useLanguage();
    const [audience, setAudience] = useState('');
    const [subject, setSubject] = useState('');
    const [body, setBody] = useState('');

    const handleSend = () => {
        if (!audience || !subject || !body) return;
        alert(`Alert "${subject}" sent to ${audience}`);
        setAudience(''); setSubject(''); setBody('');
    };

    return (
        <div style={{ minHeight: '100vh', backgroundColor: colors.bgDeep, fontFamily, fontSize }}>

            <div className="p-8">
                <div className="grid grid-cols-5 gap-6">
                    {/* Left: Compose Alert */}
                    <div className="col-span-3">
                        <div className="rounded-xl p-6" style={{ backgroundColor: colors.bgCard, border: `1px solid ${colors.divider}` }}>
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: 'rgba(1, 118, 58, 0.12)' }}>
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={colors.green} strokeWidth="2"><path d="M22 2L11 13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-white">{t('composeNewAlert')}</h3>
                                    <p className="text-xs" style={{ color: colors.textSub }}>{t('composeDesc')}</p>
                                </div>
                            </div>

                            <div className="space-y-5">
                                <div>
                                    <label className="field-label">{t('targetAudience')}</label>
                                    <select value={audience} onChange={(e) => setAudience(e.target.value)} className="select-field w-full">
                                        <option value="">{t('selectTargetAudience')}</option>
                                        {audiences.map(a => <option key={a} value={a}>{a}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label className="field-label">{t('alertSubject')}</label>
                                    <input type="text" value={subject} onChange={(e) => setSubject(e.target.value)} placeholder={t('enterAlertSubject')} className="input-field w-full" />
                                </div>
                                <div>
                                    <label className="field-label">{t('messageBody')}</label>
                                    <textarea value={body} onChange={(e) => setBody(e.target.value)} placeholder={t('composeMessage')} rows={5} className="input-field w-full resize-none" />
                                    <p className="text-xs mt-1.5 text-right" style={{ color: colors.textSub }}>{body.length} / 500</p>
                                </div>
                                <button
                                    onClick={handleSend}
                                    className="w-full py-3 rounded-lg text-sm font-bold text-white flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer"
                                    style={{ background: gradients.greenBtn, boxShadow: shadows.greenBtn, border: 'none' }}
                                    onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = shadows.greenBtnHover; }}
                                    onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = shadows.greenBtn; }}
                                >
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 2L11 13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
                                    {t('sendSecureAlert')}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Right: Recent Alerts */}
                    <div className="col-span-2">
                        <div className="rounded-xl p-6" style={{ backgroundColor: colors.bgCard, border: `1px solid ${colors.divider}` }}>
                            <div className="flex items-center justify-between mb-5">
                                <h3 className="text-lg font-bold text-white">{t('recentAlerts')}</h3>
                                <span className="text-xs font-semibold px-2.5 py-1 rounded-full" style={{ background: 'rgba(212, 175, 55, 0.10)', color: colors.gold }}>{recentAlerts.length} {t('total')}</span>
                            </div>

                            <div className="space-y-0">
                                {recentAlerts.map((alert, i) => {
                                    const tc = typeColors[alert.type] || typeColors['Notice'];
                                    return (
                                        <div key={i} className="py-4 transition-colors duration-200" style={{ borderBottom: i < recentAlerts.length - 1 ? `1px solid ${colors.divider}` : 'none' }}>
                                            <div className="flex items-start justify-between mb-1.5">
                                                <h4 className="text-sm font-bold text-white leading-tight pr-3">{alert.title}</h4>
                                                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full shrink-0" style={{ background: tc.bg, color: tc.color, border: `1px solid ${tc.border}` }}>
                                                    {alert.type}
                                                </span>
                                            </div>
                                            <p className="text-xs leading-relaxed mb-2" style={{ color: colors.textSub }}>{alert.desc}</p>
                                            <div className="flex items-center gap-3">
                                                <span className="flex items-center gap-1 text-[10px]" style={{ color: colors.textSub }}>
                                                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: tc.color }} />
                                                    {alert.time}
                                                </span>
                                                <span className="text-[10px] font-medium px-1.5 py-0.5 rounded" style={{ background: 'rgba(255,255,255,0.05)', color: colors.textSub }}>{alert.scope}</span>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            <button className="w-full text-center text-sm font-semibold mt-4 cursor-pointer bg-transparent border-none gold-hover" style={{ color: colors.gold }}>
                                {t('viewBroadcastHistory')}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SendAlerts;
