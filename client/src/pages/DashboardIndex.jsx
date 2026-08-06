import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function DashboardIndex() {
  const { user, getDashboardPathForRole } = useAuth();
  const path = getDashboardPathForRole(user?.role || 'Citizen');
  return <Navigate to={path} replace />;
}

export default DashboardIndex;
