import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../LanguageContext';
import { colors, gradients, officer, SearchIcon, ChevronDown } from '../theme';

const Header = ({ title, onMenuClick }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();
  const { t, isUrdu, toggleLang, fontFamily } = useLanguage();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const menuItemStyle = {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    padding: '10px 16px',
    fontSize: 13,
    color: colors.textSub,
    cursor: 'pointer',
    border: 'none',
    background: 'transparent',
    textAlign: 'left',
    transition: 'all 0.15s',
    fontFamily: "'Roboto', sans-serif",
  };

  const menuHoverIn = (e) => {
    e.currentTarget.style.backgroundColor = 'rgba(212, 175, 55, 0.06)';
    e.currentTarget.style.color = colors.gold;
  };
  const menuHoverOut = (e) => {
    e.currentTarget.style.backgroundColor = 'transparent';
    e.currentTarget.style.color = colors.textSub;
  };

  /* Hamburger menu icon (SVG stroke) */
  const MenuIcon = () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  );

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 32px',
      height: 64,
      borderBottom: `1px solid ${colors.divider}`,
      backgroundColor: colors.bgDeep,
      position: 'sticky',
      top: 0,
      zIndex: 40,
      fontFamily: fontFamily || "'Roboto', sans-serif",
    }}>
      {/* Left: Menu button + Title */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <button className="mobile-menu-btn" onClick={onMenuClick}><MenuIcon /></button>
        <h1 style={{ fontSize: 20, fontWeight: 800, color: '#fff' }}>{title}</h1>
      </div>

      {/* Right: Search + User */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        {/* Search bar */}
        <div style={{ position: 'relative' }}>
          <span style={{
            position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)',
            color: colors.textSub,
          }}>
            <SearchIcon />
          </span>
          <input
            type="text"
            placeholder={t('search')}
            style={{
              paddingLeft: 38,
              paddingRight: 16,
              paddingTop: 8,
              paddingBottom: 8,
              borderRadius: 8,
              fontSize: 13,
              outline: 'none',
              color: '#fff',
              backgroundColor: colors.inputBg,
              border: `1px solid ${colors.divider}`,
              minWidth: 200,
              transition: 'border-color 0.2s',
              fontFamily: "'Roboto', sans-serif",
            }}
            onFocus={(e) => { e.target.style.borderColor = colors.green; }}
            onBlur={(e) => { e.target.style.borderColor = colors.divider; }}
          />
        </div>

        {/* User chip + dropdown */}
        <div style={{ position: 'relative' }} ref={menuRef}>
          <div
            style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <div style={{
              width: 36,
              height: 36,
              borderRadius: '50%',
              background: gradients.goldChip,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 13,
              fontWeight: 700,
              color: '#fff',
            }}>
              {officer.initials}
            </div>
            <div style={{ textAlign: 'right' }}>
              <p style={{ fontSize: 13, fontWeight: 700, color: '#fff', lineHeight: 1.2 }}>{officer.name}</p>
              <p style={{ fontSize: 10, color: colors.textSub }}>{officer.district}</p>
            </div>
            <ChevronDown color={colors.textSub} />
          </div>

          {/* Dropdown */}
          {menuOpen && (
            <div style={{
              position: 'absolute',
              right: 0,
              top: 'calc(100% + 8px)',
              width: 240,
              borderRadius: 12,
              padding: '6px 0',
              backgroundColor: colors.bgCard,
              border: `1px solid ${colors.divider}`,
              boxShadow: '0 12px 40px rgba(0,0,0,0.5)',
              zIndex: 50,
              animation: 'fadeIn 0.15s ease',
            }}>
              {/* Officer info */}
              <div style={{ padding: '12px 16px', borderBottom: `1px solid ${colors.divider}` }}>
                <p style={{ fontSize: 13, fontWeight: 700, color: '#fff' }}>{officer.name}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 4 }}>
                  <span style={{
                    fontSize: 10,
                    padding: '2px 8px',
                    borderRadius: 4,
                    fontWeight: 600,
                    background: 'rgba(212, 175, 55, 0.12)',
                    color: colors.gold,
                  }}>
                    Badge: {officer.badge}
                  </span>
                  <span style={{
                    display: 'flex', alignItems: 'center', gap: 3,
                    fontSize: 10, fontWeight: 600, color: colors.emerald,
                  }}>
                    <span style={{
                      width: 5, height: 5, borderRadius: '50%',
                      backgroundColor: colors.emerald,
                    }} />
                    Active
                  </span>
                </div>
              </div>

              {/* Menu items */}
              <button
                onClick={() => { setMenuOpen(false); navigate('/dashboard/profile'); }}
                style={menuItemStyle}
                onMouseEnter={menuHoverIn}
                onMouseLeave={menuHoverOut}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                {t('myProfile')}
              </button>

              <button
                onClick={() => { setMenuOpen(false); navigate('/dashboard/settings'); }}
                style={menuItemStyle}
                onMouseEnter={menuHoverIn}
                onMouseLeave={menuHoverOut}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
                {t('settings')}
              </button>

              <div style={{ height: 1, background: colors.divider, margin: '4px 0' }} />

              <button
                onClick={() => { toggleLang(); setMenuOpen(false); }}
                style={{ ...menuItemStyle, fontFamily: isUrdu ? "'Roboto', sans-serif" : "'Noto Nastaliq Urdu', serif" }}
                onMouseEnter={menuHoverIn}
                onMouseLeave={menuHoverOut}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
                {t('urduToggle')}
              </button>

              <div style={{ height: 1, background: colors.divider, margin: '4px 0' }} />

              <button
                onClick={() => { setMenuOpen(false); navigate('/'); }}
                style={{ ...menuItemStyle, color: '#ef4444' }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.06)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                {t('secureLogout')}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
