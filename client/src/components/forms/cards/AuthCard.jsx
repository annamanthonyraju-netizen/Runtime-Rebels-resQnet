import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaShieldAlt } from 'react-icons/fa';

function AuthCard({ title, subtitle, children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-lg rounded-3xl bg-slate-900 border border-slate-700 p-8 sm:p-10 shadow-xl space-y-6"
    >
      {/* Header */}
      <div className="text-center space-y-2">
        <Link to="/" className="inline-flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-orange-500 flex items-center justify-center text-slate-950 font-bold">
            <FaShieldAlt className="w-5 h-5 text-slate-950" />
          </div>
          <span className="text-2xl font-bold tracking-tight text-white font-sans">
            ResQnet <span className="text-orange-500">AI</span>
          </span>
        </Link>

        <h1 className="text-2xl font-bold text-white pt-2 font-sans">
          {title}
        </h1>
        {subtitle && (
          <p className="text-xs text-slate-400 font-sans">
            {subtitle}
          </p>
        )}
      </div>

      {children}
    </motion.div>
  );
}

export default AuthCard;
