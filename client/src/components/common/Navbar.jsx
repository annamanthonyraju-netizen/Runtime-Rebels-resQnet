import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaShieldAlt, FaExclamationTriangle, FaBars, FaTimes } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-50 w-full transition-colors duration-200 ${
      scrolled 
        ? 'bg-slate-900/95 backdrop-blur-md border-b border-slate-800 shadow-md' 
        : 'bg-slate-900 border-b border-slate-800'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Left: ResQnet AI Logo */}
        <Link to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-orange-500 flex items-center justify-center text-slate-950 font-bold shadow-sm">
            <FaShieldAlt className="w-6 h-6 text-slate-950" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold tracking-tight text-white font-sans">
              ResQnet <span className="text-orange-500">AI</span>
            </span>
            <span className="text-[11px] text-slate-400 font-medium">Emergency Response Platform</span>
          </div>
        </Link>

        {/* Center Nav Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-300">
          <a href="#hero" className="hover:text-orange-500 transition-colors">Home</a>
          <a href="#features" className="hover:text-orange-500 transition-colors">Features</a>
          <a href="#dashboard-preview" className="hover:text-orange-500 transition-colors">Dashboard Preview</a>
          <a href="#contact" className="hover:text-orange-500 transition-colors">Contact</a>
        </nav>

        {/* Right Action Buttons */}
        <div className="hidden sm:flex items-center gap-3">
          {isAuthenticated ? (
            <>
              <Link
                to="/dashboard"
                className="text-sm font-semibold text-slate-300 hover:text-white px-3 py-2 rounded-lg"
              >
                Dashboard ({user?.role || 'User'})
              </Link>
              <button
                onClick={logout}
                className="text-sm font-semibold text-slate-400 hover:text-red-400 px-3 py-2 rounded-lg"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-sm font-semibold text-slate-300 hover:text-white px-4 py-2 rounded-lg hover:bg-slate-800 transition-colors"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="text-sm font-semibold text-slate-300 hover:text-white px-4 py-2 rounded-lg hover:bg-slate-800 transition-colors"
              >
                Register
              </Link>
            </>
          )}

          {/* Super Emergency SOS (Unauthenticated Instant Access) */}
          <Link
            to="/sos"
            className="px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-black text-xs sm:text-sm tracking-wide transition-all flex items-center gap-2 shadow-md hover:shadow-red-900/30"
          >
            <FaExclamationTriangle className="w-4 h-4 text-white" />
            <span>SUPER EMERGENCY SOS</span>
          </Link>

          {/* Primary Orange Emergency CTA Button */}
          <Link
            to={isAuthenticated ? "/dashboard/citizen/report" : "/login"}
            className="px-4 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-slate-950 font-bold text-xs sm:text-sm transition-all flex items-center gap-2 shadow-sm"
          >
            <span>Emergency Report</span>
          </Link>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg text-slate-300 hover:bg-slate-800 focus:outline-none"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <FaTimes className="w-6 h-6" /> : <FaBars className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-800 bg-slate-900 px-4 pt-4 pb-6 space-y-3 font-semibold text-sm">
          <a href="#hero" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 text-slate-300 hover:text-orange-500">Home</a>
          <a href="#features" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 text-slate-300 hover:text-orange-500">Features</a>
          <a href="#dashboard-preview" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 text-slate-300 hover:text-orange-500">Dashboard Preview</a>
          <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 text-slate-300 hover:text-orange-500">Contact</a>
          
          <div className="pt-3 border-t border-slate-800 flex flex-col gap-2">
            <Link
              to="/sos"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-center py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-black text-sm tracking-wide shadow-md"
            >
              🚨 SUPER EMERGENCY SOS
            </Link>
            {!isAuthenticated ? (
              <>
                <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="block text-center py-2.5 rounded-lg bg-slate-800 text-white">Login</Link>
                <Link to="/register" onClick={() => setMobileMenuOpen(false)} className="block text-center py-2.5 rounded-lg bg-slate-800 text-white">Register</Link>
              </>
            ) : (
              <Link to="/dashboard" onClick={() => setMobileMenuOpen(false)} className="block text-center py-2.5 rounded-lg bg-slate-800 text-white">Go to Dashboard</Link>
            )}
            <Link
              to={isAuthenticated ? "/dashboard/citizen/report" : "/login"}
              onClick={() => setMobileMenuOpen(false)}
              className="block text-center py-3 rounded-xl bg-orange-500 text-slate-950 font-bold"
            >
              Emergency Report
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
