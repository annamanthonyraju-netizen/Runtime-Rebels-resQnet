import { createContext, useContext, useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import { useAuth } from './AuthContext';

const SocketContext = createContext(null);
const SOCKET_SERVER_URL = 'https://runtime-rebels-resqnet.onrender.com';

export function SocketProvider({ children }) {
  const { user } = useAuth();
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [toasts, setToasts] = useState([]);
  const [unreadCount, setUnreadCount] = useState(2);
  const [userStatus, setUserStatus] = useState('Available'); // 'Available' | 'Busy' | 'Offline'

  useEffect(() => {
    // Initialize Socket.IO connection
    const newSocket = io(SOCKET_SERVER_URL, {
      transports: ['websocket', 'polling'],
      withCredentials: true,
      autoConnect: true
    });

    newSocket.on('connect', () => {
      console.log('[SocketContext] Connected to Socket.IO EOC Server:', newSocket.id);
      setIsConnected(true);

      // Join role room automatically
      if (user?.role) {
        newSocket.emit('join-role-room', user.role);
      }
    });

    newSocket.on('disconnect', () => {
      console.log('[SocketContext] Disconnected from Socket.IO Server');
      setIsConnected(false);
    });

    // Real-Time Notification Listener
    newSocket.on('notification-created', (notif) => {
      addToast(notif);
      setUnreadCount(prev => prev + 1);
    });

    // Real-Time Incident Listener
    newSocket.on('new-incident', (incident) => {
      addToast({
        id: Date.now(),
        type: 'CRITICAL DISPATCH',
        title: `🚨 ${incident.title || 'New Incident'}`,
        message: `Category: ${incident.type || 'Emergency'} • Location: ${incident.location?.address || 'Sector 7'}`
      });
      setUnreadCount(prev => prev + 1);
    });

    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, [user?.role]);

  const addToast = (toast) => {
    const id = Date.now();
    const newToast = { id, ...toast };
    setToasts(prev => [...prev, newToast]);

    // Auto dismiss toast after 5s
    setTimeout(() => {
      removeToast(id);
    }, 5000);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const changeUserStatus = (status) => {
    setUserStatus(status);
    if (socket) {
      socket.emit('user-status-changed', { userId: user?.id, role: user?.role, status });
    }
  };

  return (
    <SocketContext.Provider value={{
      socket,
      isConnected,
      toasts,
      addToast,
      removeToast,
      unreadCount,
      setUnreadCount,
      userStatus,
      changeUserStatus
    }}>
      {children}

      {/* Floating Real-Time Toast Notifications Overlay */}
      <div className="fixed bottom-6 right-6 z-50 space-y-3 max-w-sm w-full font-sans text-xs pointer-events-none">
        {toasts.map(toast => (
          <div
            key={toast.id}
            className="p-4 rounded-2xl bg-slate-900/95 border border-orange-500/50 text-white shadow-2xl space-y-1 pointer-events-auto backdrop-blur-md animate-bounce"
          >
            <div className="flex items-center justify-between font-mono font-bold text-[11px] text-orange-400">
              <span>{toast.type || 'REAL-TIME ALERT'}</span>
              <button onClick={() => removeToast(toast.id)} className="text-slate-400 hover:text-white">✕</button>
            </div>
            <h4 className="font-bold text-sm text-white">{toast.title}</h4>
            <p className="text-slate-300 text-[11px]">{toast.message}</p>
          </div>
        ))}
      </div>
    </SocketContext.Provider>
  );
}

export function useSocket() {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
  return context;
}
