import { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Sidebar from '../components/dashboard/Sidebar';
import DashboardTopNav from '../components/dashboard/DashboardTopNav';
import DemoModeModal from '../components/demo/DemoModeModal';
import { useAuth } from '../context/AuthContext';

function DashboardLayout() {
  const { user } = useAuth();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans flex flex-col lg:flex-row selection:bg-orange-500 selection:text-slate-950">
      
      {/* 1. Persistent Fixed Sidebar */}
      <Sidebar
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      {/* 2. Main Content Wrapper */}
      <div className="flex-1 lg:pl-64 flex flex-col min-w-0">
        
        {/* Persistent Top Navbar */}
        <DashboardTopNav
          setMobileOpen={setMobileOpen}
        />

        {/* 3. Dynamic Animated Outlet Area */}
        <main className="flex-1 p-4 sm:p-8 max-w-[1700px] w-full mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      {/* 4. Floating Hackathon Demo Mode Launcher */}
      <DemoModeModal />

    </div>
  );
}

export default DashboardLayout;
