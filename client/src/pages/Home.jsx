import Navbar from '../components/common/Navbar';
import HeroSection from '../components/landing/HeroSection';
import QuickActions from '../components/landing/QuickActions';
import LiveIncidentsSection from '../components/landing/LiveIncidentsSection';
import HowItWorksSection from '../components/landing/HowItWorksSection';
import AIWorkflowSection from '../components/landing/AIWorkflowSection';
import KeyFeaturesSection from '../components/landing/KeyFeaturesSection';
import DashboardPreviewSection from '../components/landing/DashboardPreviewSection';
import ArchitectureSection from '../components/landing/ArchitectureSection';
import Footer from '../components/common/Footer';

function Home() {
  return (
    <div className="min-h-screen bg-slate-900 text-white selection:bg-orange-500 selection:text-slate-950 font-sans">
      {/* Clean Sticky Navbar */}
      <Navbar />

      <main className="w-full">
        {/* 1. Hero Section */}
        <HeroSection />

        {/* 2. Quick Actions Section */}
        <QuickActions />

        {/* 3. Live Incidents Section */}
        <LiveIncidentsSection />

        {/* 4. How ResQnet Works Section */}
        <HowItWorksSection />

        {/* 5. 7-Agent AI Pipeline Section */}
        <AIWorkflowSection />

        {/* 6. Key Features Grid Section */}
        <KeyFeaturesSection />

        {/* 7. Dashboard Preview Section */}
        <DashboardPreviewSection />

        {/* 8. Technology Architecture Section */}
        <ArchitectureSection />
      </main>

      {/* 9. Professional Footer */}
      <Footer />
    </div>
  );
}

export default Home;
