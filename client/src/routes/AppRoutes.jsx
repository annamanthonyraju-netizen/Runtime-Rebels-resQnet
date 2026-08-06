import { Routes, Route, Navigate } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import ForgotPassword from '../pages/ForgotPassword';
import DashboardLayout from '../layouts/DashboardLayout';
import DashboardIndex from '../pages/DashboardIndex';

// Unique Role Homepages
import CitizenDashboardHome from '../pages/dashboards/CitizenDashboardHome';
import VolunteerDashboardHome from '../pages/dashboards/VolunteerDashboardHome';
import OfficerDashboardHome from '../pages/dashboards/OfficerDashboardHome';
import AdminDashboardHome from '../pages/dashboards/AdminDashboardHome';

// Tactical GIS Command Center
import LiveGISCommandCenter from '../pages/LiveGISCommandCenter';

// Emergency Reporting & Module Pages
import ReportIncident from '../pages/ReportIncident';
import MyReportsPage from '../pages/MyReportsPage';
import ReportDetailPage from '../pages/ReportDetailPage';
import AIAssistantPage from '../pages/AIAssistantPage';

// Smart Resource Dispatch Engine Pages
import ResourcesPage from '../pages/ResourcesPage';
import ResourceDetailPage from '../pages/ResourceDetailPage';
import SmartDispatchPanel from '../pages/SmartDispatchPanel';
import DispatchHistoryPage from '../pages/DispatchHistoryPage';

// Emergency Communication & Notification Module Pages
import NotificationsPage from '../pages/NotificationsPage';
import EmergencyBroadcastPage from '../pages/EmergencyBroadcastPage';
import MessageCenterPage from '../pages/MessageCenterPage';

// Analytics & Reports Module
import AnalyticsPage from '../pages/AnalyticsPage';
import AnalyticsIncidentsSubpage from '../pages/analytics/AnalyticsIncidentsSubpage';
import AnalyticsResourcesSubpage from '../pages/analytics/AnalyticsResourcesSubpage';
import AnalyticsAISubpage from '../pages/analytics/AnalyticsAISubpage';
import ReportsGeneratorPage from '../pages/ReportsGeneratorPage';

// System Health Page
import SystemStatusPage from '../pages/SystemStatusPage';

import SettingsPage from '../pages/SettingsPage';
import EmergencyContactsPage from '../pages/EmergencyContactsPage';
import NearbySheltersPage from '../pages/NearbySheltersPage';

// Responder & Admin Pages
import IncidentQueuePage from '../pages/IncidentQueuePage';
import IncidentVerificationPage from '../pages/IncidentVerificationPage';
import ResourceAllocationPage from '../pages/ResourceAllocationPage';
import TeamManagementPage from '../pages/TeamManagementPage';
import AssignedTasksPage from '../pages/AssignedTasksPage';
import CommunicationPage from '../pages/CommunicationPage';
import UsersPage from '../pages/UsersPage';
import OfficersPage from '../pages/OfficersPage';
import VolunteersPage from '../pages/VolunteersPage';
import IncidentManagementPage from '../pages/IncidentManagementPage';
import AILogsPage from '../pages/AILogsPage';

import NotFound from '../pages/NotFound';
import ProtectedRoute from './ProtectedRoute';

function AppRoutes() {
  return (
    <Routes>
      {/* Public Landing & Auth Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      
      {/* Persistent Role-Based Dashboard Architecture */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        {/* Index Automatic Role Redirect */}
        <Route index element={<DashboardIndex />} />

        {/* 1. CITIZEN DASHBOARD ROUTE SUBTREE */}
        <Route path="citizen" element={<CitizenDashboardHome />} />
        <Route path="citizen/report" element={<ReportIncident />} />
        <Route path="citizen/my-reports" element={<MyReportsPage />} />
        <Route path="citizen/report/:id" element={<ReportDetailPage />} />
        <Route path="citizen/emergency-contacts" element={<EmergencyContactsPage />} />
        <Route path="citizen/shelters" element={<NearbySheltersPage />} />
        <Route path="citizen/ai-assistant" element={<AIAssistantPage />} />
        <Route path="citizen/settings" element={<SettingsPage />} />

        {/* 2. VOLUNTEER DASHBOARD ROUTE SUBTREE */}
        <Route path="volunteer" element={<VolunteerDashboardHome />} />
        <Route path="volunteer/assigned-tasks" element={<AssignedTasksPage />} />
        <Route path="volunteer/map" element={<LiveGISCommandCenter />} />
        <Route path="volunteer/resources" element={<ResourcesPage />} />
        <Route path="volunteer/communication" element={<MessageCenterPage />} />
        <Route path="volunteer/notifications" element={<NotificationsPage />} />
        <Route path="volunteer/settings" element={<SettingsPage />} />

        {/* 3. OFFICER DASHBOARD ROUTE SUBTREE */}
        <Route path="officer" element={<OfficerDashboardHome />} />
        <Route path="officer/incident-queue" element={<IncidentQueuePage />} />
        <Route path="officer/incident-verification" element={<IncidentVerificationPage />} />
        <Route path="officer/map" element={<LiveGISCommandCenter />} />
        <Route path="officer/dispatch-resources" element={<SmartDispatchPanel />} />
        <Route path="officer/team-status" element={<TeamManagementPage />} />
        <Route path="officer/analytics" element={<AnalyticsPage />} />
        <Route path="officer/settings" element={<SettingsPage />} />

        {/* 4. ADMINISTRATOR DASHBOARD ROUTE SUBTREE */}
        <Route path="admin" element={<AdminDashboardHome />} />
        <Route path="admin/map" element={<LiveGISCommandCenter />} />
        <Route path="admin/resources" element={<ResourcesPage />} />
        <Route path="admin/users" element={<UsersPage />} />
        <Route path="admin/officers" element={<OfficersPage />} />
        <Route path="admin/volunteers" element={<VolunteersPage />} />
        <Route path="admin/incident-management" element={<IncidentManagementPage />} />
        <Route path="admin/ai-logs" element={<AILogsPage />} />
        <Route path="admin/analytics" element={<AnalyticsPage />} />
        <Route path="admin/settings" element={<SettingsPage />} />

        {/* System Infrastructure Telemetry Route */}
        <Route path="status" element={<SystemStatusPage />} />

        {/* Emergency Communication & Notification Routes */}
        <Route path="notifications" element={<NotificationsPage />} />
        <Route path="alerts" element={<EmergencyBroadcastPage />} />
        <Route path="messages" element={<MessageCenterPage />} />

        {/* Analytics & Reports Center Routes */}
        <Route path="analytics" element={<AnalyticsPage />} />
        <Route path="analytics/incidents" element={<AnalyticsIncidentsSubpage />} />
        <Route path="analytics/resources" element={<AnalyticsResourcesSubpage />} />
        <Route path="analytics/ai" element={<AnalyticsAISubpage />} />
        <Route path="reports" element={<ReportsGeneratorPage />} />

        {/* Smart Resource Dispatch Engine Routes */}
        <Route path="resources" element={<ResourcesPage />} />
        <Route path="resources/:resourceId" element={<ResourceDetailPage />} />
        <Route path="dispatch" element={<SmartDispatchPanel />} />
        <Route path="dispatch/history" element={<DispatchHistoryPage />} />

        {/* Tactical GIS Routes */}
        <Route path="live-gis" element={<LiveGISCommandCenter />} />
        <Route path="map" element={<LiveGISCommandCenter />} />
        <Route path="live-map" element={<LiveGISCommandCenter />} />

        {/* Fallback Shared Routes inside Dashboard */}
        <Route path="report" element={<ReportIncident />} />
        <Route path="report-incident" element={<ReportIncident />} />
        <Route path="report/:id" element={<ReportDetailPage />} />
        <Route path="my-reports" element={<MyReportsPage />} />
        <Route path="ai-assistant" element={<AIAssistantPage />} />
        <Route path="settings" element={<SettingsPage />} />
        <Route path="emergency-contacts" element={<EmergencyContactsPage />} />
      </Route>

      {/* Legacy Top-Level Direct Aliases */}
      <Route path="/status" element={<Navigate to="/dashboard/status" replace />} />

      {/* Fallback 404 Routes */}
      <Route path="/not-found" element={<NotFound />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRoutes;
