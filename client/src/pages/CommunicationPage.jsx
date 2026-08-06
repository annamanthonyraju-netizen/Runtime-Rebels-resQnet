import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaComments, FaPaperPlane, FaArrowLeft } from 'react-icons/fa';
import Navbar from '../components/common/Navbar';

function CommunicationPage() {
  const [msg, setMsg] = useState('');
  const [messages, setMessages] = useState([
    { sender: 'Command HQ', text: 'All squads, confirm receipt of food distribution manifest.' }
  ]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!msg.trim()) return;
    setMessages(prev => [...prev, { sender: 'Volunteer', text: msg }]);
    setMsg('');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans flex flex-col">
      <Navbar />

      <main className="flex-1 pt-24 pb-12 px-4 sm:px-6 lg:px-8 w-full max-w-4xl mx-auto space-y-6 text-left">
        <Link to="/dashboard?role=volunteer" className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-white">
          <FaArrowLeft /> Return to Dashboard
        </Link>

        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-700 flex justify-between items-center shadow-xl">
          <div>
            <span className="text-xs font-mono font-bold text-orange-500 uppercase tracking-wider block mb-1">
              REAL-TIME SQUAD BROADCAST
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Emergency Communication Channel</h1>
            <p className="text-xs text-slate-400 mt-1">Direct chat channel for field volunteers and command staff</p>
          </div>
        </div>

        <div className="rounded-3xl bg-slate-900 border border-slate-700 p-6 space-y-4 shadow-xl font-sans">
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 min-h-[280px] max-h-[380px] overflow-y-auto space-y-3 font-mono text-xs">
            {messages.map((m, i) => (
              <div key={i} className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-orange-400 font-bold block">{m.sender}</span>
                <p className="text-slate-200">{m.text}</p>
              </div>
            ))}
          </div>

          <form onSubmit={handleSend} className="flex gap-3">
            <input
              type="text"
              placeholder="Broadcast message to squad..."
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
              className="flex-1 bg-slate-950 border border-slate-700 text-white rounded-xl px-4 py-3 text-sm outline-none font-sans"
            />
            <button type="submit" className="px-6 py-3 rounded-xl bg-orange-500 text-slate-950 font-bold text-sm">
              <FaPaperPlane /> Broadcast
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}

export default CommunicationPage;
