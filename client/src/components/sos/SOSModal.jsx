import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes } from 'react-icons/fa';
import PublicSOSPage from '../../pages/PublicSOSPage';

function SOSModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-3xl my-auto rounded-3xl bg-slate-900 border border-slate-800 p-4 sm:p-6 shadow-2xl overflow-hidden max-h-[92vh] overflow-y-auto"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <FaTimes className="w-4 h-4" />
          </button>

          <PublicSOSPage isModal={true} onClose={onClose} />
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

export default SOSModal;
