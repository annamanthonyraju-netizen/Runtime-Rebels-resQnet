import { motion } from 'framer-motion';

function SectionHeader({ badge, title, highlightTitle, subtitle, align = 'center' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`max-w-4xl mb-16 ${align === 'center' ? 'mx-auto text-center' : 'text-left'}`}
    >
      {badge && (
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/90 border border-orange-500/30 text-xs font-mono font-bold text-orange-400 mb-4 shadow-[0_0_15px_rgba(255,107,0,0.15)]">
          <span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse"></span>
          <span className="uppercase tracking-widest">{badge}</span>
        </div>
      )}

      <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white font-mono tracking-tight leading-tight">
        {title}{' '}
        {highlightTitle && (
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-400 to-orange-500 text-orange-glow">
            {highlightTitle}
          </span>
        )}
      </h2>

      {subtitle && (
        <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed font-sans">
          {subtitle}
        </p>
      )}

      <div className={`mt-6 h-1 w-24 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full shadow-[0_0_15px_rgba(255,107,0,0.5)] ${align === 'center' ? 'mx-auto' : ''}`}></div>
    </motion.div>
  );
}

export default SectionHeader;
