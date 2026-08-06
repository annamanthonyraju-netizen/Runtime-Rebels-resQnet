import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaShieldAlt, FaPhoneAlt, FaEnvelope, FaLock, FaCheckCircle, FaPaperPlane } from 'react-icons/fa';
import { SYSTEM_INFO } from '../../utils/constants';

function ContactFooterSection() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <footer id="contact" className="relative z-10 w-full bg-slate-950 border-t border-orange-500/20 text-slate-400 pt-24 pb-12 font-sans">
      
      <div className="w-full max-w-[1700px] mx-auto px-6 sm:px-12 lg:px-16">
        
        {/* Top Contact Form & Emergency Box Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-20 border-b border-orange-500/10">
          
          {/* Left: Brand Info & Emergency SOS Box (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center gap-3.5">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-amber-600 p-[1.5px] shadow-[0_0_20px_rgba(255,107,0,0.4)]">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                  <FaShieldAlt className="w-6 h-6 text-orange-400" />
                </div>
              </div>
              <span className="text-3xl font-black text-white font-mono tracking-tight">
                Res<span className="text-orange-500 text-orange-glow">Q</span>net <span className="text-orange-400 text-sm">AI</span>
              </span>
            </div>

            <p className="text-base text-slate-300 max-w-md leading-relaxed">
              Autonomous AI-driven disaster management, real-time satellite telemetry, and coordinated emergency dispatch platform saving lives globally.
            </p>

            {/* 24/7 SOS Box */}
            <div className="p-6 rounded-3xl bg-slate-900/90 border border-red-500/40 max-w-md shadow-[0_0_30px_rgba(239,68,68,0.15)] space-y-3">
              <div className="flex items-center gap-4">
                <div className="p-3.5 rounded-2xl bg-red-500/15 text-red-400 border border-red-500/40">
                  <FaPhoneAlt className="w-6 h-6 animate-pulse" />
                </div>
                <div>
                  <span className="block text-xs font-mono font-bold text-red-400 uppercase tracking-widest">
                    24/7 EMERGENCY SOS HOTLINE
                  </span>
                  <a
                    href="tel:18007377638"
                    className="text-2xl font-mono font-black text-white hover:text-red-400 transition-colors"
                  >
                    {SYSTEM_INFO.emergencyHotline}
                  </a>
                </div>
              </div>
              <p className="text-xs font-mono text-slate-400 border-t border-slate-800 pt-2">
                Direct command bridge dispatch for first responder authorities & crisis managers.
              </p>
            </div>
          </div>

          {/* Right: Quick Contact Form (7 cols) */}
          <div className="lg:col-span-7 rounded-3xl bg-slate-900/60 backdrop-blur-2xl border border-orange-500/30 p-8 sm:p-10">
            <h3 className="text-2xl font-bold font-mono text-white mb-2">
              Get in Touch with ResQnet AI Team
            </h3>
            <p className="text-sm font-mono text-slate-400 mb-6">
              Inquire about enterprise deployment, API integration, or emergency agency onboarding.
            </p>

            {submitted ? (
              <div className="p-6 rounded-2xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 font-mono text-sm flex items-center gap-3">
                <FaCheckCircle className="w-6 h-6 text-emerald-400" />
                <span>Thank you! Your message has been routed to the ResQnet AI Emergency Integration Command team.</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 font-mono text-sm">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    required
                    placeholder="Your Full Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:border-orange-400 focus:outline-none"
                  />
                  <input
                    type="email"
                    required
                    placeholder="Agency / Personal Email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:border-orange-400 focus:outline-none"
                  />
                </div>
                <textarea
                  required
                  rows={4}
                  placeholder="Describe your inquiry or agency integration requirements..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full p-4 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:border-orange-400 focus:outline-none"
                ></textarea>

                <button
                  type="submit"
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-orange-500 to-amber-600 text-slate-950 font-extrabold text-base flex items-center justify-center gap-3 shadow-[0_0_25px_rgba(255,107,0,0.35)] hover:scale-[1.01] transition-transform"
                >
                  <FaPaperPlane className="w-4 h-4" />
                  <span>Transmit Inquiry to Command</span>
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Bottom Network Status & Copyright */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-400">
          <p>© {new Date().getFullYear()} ResQnet AI Disaster Management Ecosystem. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2 text-emerald-400 font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              NETWORK: OPERATIONAL (99.99%)
            </span>
            <span className="flex items-center gap-1.5 text-slate-400">
              <FaLock className="w-3.5 h-3.5 text-orange-400" />
              256-Bit Encrypted
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
}

export default ContactFooterSection;
