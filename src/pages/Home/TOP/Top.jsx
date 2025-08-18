import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../../auth/AuthContext';
import { useTheme } from '../../../theme/ThemeContext';
import './Top.css';

function Top() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';
  const [selectedLang, setSelectedLang] = useState('');
  const [streak] = useState(0);
  const [showLangSelector, setShowLangSelector] = useState(false);

  const handleSelect = () => setShowLangSelector(prev => !prev);
  // Streak will update automatically in future when daily problem is solved before midnight IST

  return (
    <div className="topheader">
      {!isAuthPage && (
        <div className="lang-section">
          {selectedLang === '' ? (
            <>
              <button className="lang-btn" onClick={handleSelect}>
                Select Language
              </button>
              {showLangSelector && (
                <div className="lang-dropdown">
                  <button className="dropdown-item" onClick={() => { setSelectedLang('C++'); setShowLangSelector(false); }}>C++</button>
                </div>
              )}
            </>
          ) : (
            <span className="selected-lang">
              Selected Language: {selectedLang}
            </span>
          )}
        </div>
      )}

      <div className="streak-section">
        <span  aria-label="fire" className="fire-emoji">🔥</span>
        <span className="streak-text">Streak: {streak}</span>
      </div>

      <div style={{ marginLeft: 'auto', display: 'flex', gap: 8, alignItems: 'center' }}>
        <button aria-label="Toggle theme" onClick={toggleTheme} className="icon-btn" title={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}>
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
        {!isAuthPage && (
          <>
            <Link to="/"><button>Home</button></Link>
            {!user && (
              <>
                <Link to="/login"><button>Login</button></Link>
                <Link to="/register"><button>Register</button></Link>
              </>
            )}
            {user && (
              <>
                <Link to="/profile"><button>Profile</button></Link>
                <button onClick={() => { logout(); navigate('/'); }}>Logout</button>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Top;
