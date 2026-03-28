import React from 'react';

const AssignOfficerModal = () => {
    const officers = [
        { id: 'SA', name: 'SP Ali Khan', role: 'Superintendent of Police - Central PS', badge: 'PK-04932', status: 'Available' },
        { id: 'DF', name: 'DSP Fatima Zahra', role: 'Deputy Superintendent - Clifton PS', badge: 'PK-11023', status: 'Available', selected: true },
        { id: 'IR', name: 'Inspector Rehman', role: 'Inspector - Saddar PS', badge: 'PK-10222', status: 'Available' },
        { id: 'IB', name: 'Inspector Bilal Ahmed', role: 'Inspector - Defence PS', badge: 'PK-11444', status: 'Unavailable' }
    ];

    return (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 font-sans">
            <div className="bg-bg-card border border-divider rounded-2xl w-full max-w-md overflow-hidden">

                {/* Header */}
                <div className="p-6 border-b border-divider relative">
                    <button className="absolute right-6 top-6 text-text-sub hover:text-white">✕</button>
                    <h2 className="text-lg font-bold text-white">Assign Officer</h2>
                    <p className="text-sm text-text-sub mt-1">Select an officer to assign to this case</p>
                    <div className="mt-4 flex gap-4 text-xs">
                        <div>
                            <span className="text-text-sub">Case No.</span>
                            <p className="font-mono text-white mt-0.5">FIR-2025-004</p>
                        </div>
                        <div>
                            <span className="text-text-sub">Currently Assigned</span>
                            <p className="text-white mt-0.5">No officer assigned</p>
                        </div>
                    </div>
                </div>

                {/* Search */}
                <div className="p-4 border-b border-divider">
                    <input type="text" placeholder="Search by name, badge, or station..." className="w-full bg-black/50 border border-divider rounded-lg px-4 py-2.5 text-sm focus:border-sach-emerald outline-none text-white" />
                </div>

                {/* Officer List */}
                <div className="max-h-80 overflow-y-auto p-2">
                    {officers.map((off, i) => (
                        <div key={i} className={`flex items-center gap-4 p-3 rounded-lg cursor-pointer transition-colors ${off.selected ? 'bg-sach-emerald/10 border border-sach-emerald/30' : 'hover:bg-white/5 border border-transparent'}`}>
                            <div className="w-10 h-10 rounded-full bg-divider text-sach-emerald flex items-center justify-center font-bold text-sm shrink-0">
                                {off.id}
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-bold text-white truncate">{off.name}</p>
                                <p className="text-[10px] text-text-sub truncate">{off.role}</p>
                                <p className="text-[10px] text-text-sub font-mono mt-0.5">{off.badge}</p>
                            </div>
                            <div className="shrink-0 flex items-center gap-2">
                                {off.status === 'Available' ? (
                                    <span className="text-[10px] text-sach-emerald flex items-center gap-1"><div className="w-1.5 h-1.5 bg-sach-emerald rounded-full"></div> Available</span>
                                ) : (
                                    <span className="text-[10px] text-red-500 flex items-center gap-1"><div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div> Unavailable</span>
                                )}
                                {off.selected && <span className="text-sach-emerald ml-2"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{display:'inline'}}><polyline points="20 6 9 17 4 12"/></svg></span>}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Footer */}
                <div className="p-4 border-t border-divider flex justify-between items-center bg-black/20">
                    <button className="text-sm text-text-sub hover:text-white">Close</button>
                    <button className="bg-gradient-to-r from-sach-green to-sach-green-dark text-white font-bold py-2 px-6 rounded-lg transition-all shadow-[0_4px_12px_rgba(1,118,58,0.3)] hover:shadow-[0_6px_16px_rgba(1,118,58,0.45)] hover:-translate-y-0.5 flex items-center gap-2">
                        Assign Officer
                    </button>
                </div>
            </div>
        </div>
    );
};
export default AssignOfficerModal;