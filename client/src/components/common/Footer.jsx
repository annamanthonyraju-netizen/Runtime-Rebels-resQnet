import { Link } from 'react-router-dom';
import { FaShieldAlt, FaPhoneAlt, FaGithub, FaEnvelope, FaExclamationTriangle } from 'react-icons/fa';

function Footer() {
  return (
    <footer id="contact" className="bg-slate-900 border-t border-slate-800 text-slate-400 pt-16 pb-12 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          
          {/* Column 1 & 2: About & Emergency Hotline Box */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-orange-500 flex items-center justify-center text-slate-950 font-bold">
                <FaShieldAlt className="w-5 h-5 text-slate-950" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                ResQnet <span className="text-orange-500">AI</span>
              </span>
            </Link>

            <p className="text-sm text-slate-300 leading-relaxed max-w-sm">
              An intelligent, accessible emergency response platform helping citizens, first responders, and government authorities coordinate disaster operations seamlessly.
            </p>

            {/* Emergency Hotline Box */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 max-w-sm">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-red-500/20 text-red-400 border border-red-500/30">
                  <FaPhoneAlt className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-[11px] font-mono font-bold text-red-400 uppercase">
                    NATIONAL EMERGENCY HOTLINE
                  </span>
                  <a href="tel:18007377638" className="text-base font-bold font-mono text-white hover:text-orange-500">
                    1-800-RESQ-NET / 112
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Column 3: Quick Links */}
          <div>
            <h4 className="text-xs font-mono font-bold text-orange-500 uppercase tracking-wider mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-sm font-medium">
              <li><a href="#hero" className="hover:text-white transition-colors">Home</a></li>
              <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
              <li><a href="#dashboard-preview" className="hover:text-white transition-colors">Dashboard Preview</a></li>
              <li><Link to="/dashboard/citizen/report" className="hover:text-white transition-colors">Report Emergency</Link></li>
            </ul>
          </div>

          {/* Column 4: Emergency Contacts */}
          <div>
            <h4 className="text-xs font-mono font-bold text-orange-500 uppercase tracking-wider mb-4">
              Emergency Services
            </h4>
            <ul className="space-y-2.5 text-sm font-medium">
              <li><span className="text-slate-300">National Police:</span> <strong className="text-white">100 / 112</strong></li>
              <li><span className="text-slate-300">Fire &amp; Rescue:</span> <strong className="text-white">101</strong></li>
              <li><span className="text-slate-300">Ambulance SOS:</span> <strong className="text-white">108</strong></li>
              <li><span className="text-slate-300">Disaster Authority:</span> <strong className="text-white">1078</strong></li>
            </ul>
          </div>

          {/* Column 5: GitHub & Project Info */}
          <div>
            <h4 className="text-xs font-mono font-bold text-orange-500 uppercase tracking-wider mb-4">
              Project &amp; Code
            </h4>
            <ul className="space-y-2.5 text-sm font-medium">
              <li>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors"
                >
                  <FaGithub className="w-4 h-4 text-orange-500" />
                  <span>GitHub Repository</span>
                </a>
              </li>
              <li><span className="text-slate-400">Open Source Protocol</span></li>
              <li><span className="text-slate-400">Production Build v3.0</span></li>
            </ul>
          </div>

        </div>

        {/* Bottom Line */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-medium text-slate-400">
          <p>© {new Date().getFullYear()} ResQnet AI Emergency Response Platform. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-white cursor-pointer">Privacy Policy</span>
            <span className="hover:text-white cursor-pointer">Terms of Service</span>
            <span className="hover:text-white cursor-pointer">Accessibility</span>
          </div>
        </div>

      </div>
    </footer>
  );
}

export default Footer;
