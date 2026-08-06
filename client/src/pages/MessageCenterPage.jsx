import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaComments, FaPaperPlane, FaArrowLeft, FaUsers, FaShieldAlt } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import { useSocket } from '../context/SocketContext';

function MessageCenterPage() {
  const { user } = useAuth();
  const { socket } = useSocket();
  const [activeChannel, setActiveChannel] = useState('Officer ↔ Volunteer');
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState([
    { sender: 'Capt. Sarah Jenkins (Officer)', text: 'All squads, confirm receipt of food distribution manifest at Central Shelter.', time: '10:40 AM' },
    { sender: 'Volunteer Lead Priya (Volunteer)', text: 'Food manifest received. 15 volunteers deployed at Central Camp.', time: '10:42 AM' }
  ]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const newMsg = {
      sender: `${user?.name || 'Commander'} (${user?.role || 'Officer'})`,
      text: inputText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, newMsg]);
    if (socket) {
      socket.emit('squad-message', newMsg);
    }
    setInputText('');
  };

  return (
    <div className="w-full space-y-6 text-left font-sans">
      
      <Link to="/dashboard/notifications" className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-white">
        <FaArrowLeft /> Back to Notifications
      </Link>

      {/* Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-800/90 border border-slate-700 flex flex-wrap items-center justify-between gap-6 shadow-xl">
        <div>
          <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-cyan-950 text-cyan-400 border border-cyan-800 uppercase">
            INTERNAL COMMS MESH
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-white mt-1">Inter-Agency Message Center</h1>
          <p className="text-xs text-slate-300">Secure real-time squad communication between Officers, Volunteers, and Admins.</p>
        </div>

        {/* Channel Selector */}
        <div className="flex items-center gap-1 bg-slate-950 p-1.5 rounded-xl border border-slate-800 font-mono text-xs">
          {['Officer ↔ Officer', 'Officer ↔ Volunteer', 'Admin ↔ All'].map(ch => (
            <button
              key={ch}
              onClick={() => setActiveChannel(ch)}
              className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                activeChannel === ch ? 'bg-orange-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              {ch}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Workspace */}
      <div className="rounded-3xl bg-slate-900 border border-slate-700 p-6 space-y-4 shadow-xl">
        
        {/* Messages Feed Box */}
        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 min-h-[300px] max-h-[400px] overflow-y-auto space-y-3 font-mono text-xs">
          {messages.map((msg, i) => (
            <div key={i} className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
              <div className="flex justify-between items-center">
                <span className="text-orange-400 font-bold font-sans text-xs">{msg.sender}</span>
                <span className="text-slate-500 text-[10px]">{msg.time}</span>
              </div>
              <p className="text-slate-200 font-sans text-xs">{msg.text}</p>
            </div>
          ))}
        </div>

        {/* Send Input */}
        <form onSubmit={handleSend} className="flex gap-3">
          <input
            type="text"
            placeholder={`Message channel (${activeChannel})...`}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="flex-1 bg-slate-950 border border-slate-700 focus:border-orange-500 text-white rounded-xl px-4 py-3 text-sm outline-none font-sans"
          />
          <button type="submit" className="px-6 py-3 rounded-xl bg-orange-500 text-slate-950 font-bold text-sm flex items-center gap-2 cursor-pointer shadow-md">
            <FaPaperPlane />
            <span>Send</span>
          </button>
        </form>

      </div>

    </div>
  );
}

export default MessageCenterPage;
