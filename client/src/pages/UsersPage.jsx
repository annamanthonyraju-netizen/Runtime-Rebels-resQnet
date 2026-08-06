import { Link } from 'react-router-dom';
import { FaUsers, FaArrowLeft } from 'react-icons/fa';
import Navbar from '../components/common/Navbar';
import { ADMIN_USERS } from '../utils/dashboardData';

function UsersPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans flex flex-col">
      <Navbar />

      <main className="flex-1 pt-24 pb-12 px-4 sm:px-6 lg:px-8 w-full max-w-6xl mx-auto space-y-6 text-left">
        <Link to="/dashboard?role=admin" className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-white">
          <FaArrowLeft /> Return to Admin Console
        </Link>

        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-700 flex justify-between items-center shadow-xl">
          <div>
            <span className="text-xs font-mono font-bold text-orange-500 uppercase tracking-wider block mb-1">
              PLATFORM GOVERNANCE
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Registered Users Directory</h1>
            <p className="text-xs text-slate-400 mt-1">Manage platform accounts, security credentials, and access roles</p>
          </div>
        </div>

        <div className="rounded-3xl bg-slate-900 border border-slate-700 p-6 shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left font-mono text-xs sm:text-sm">
              <thead className="bg-slate-950 text-slate-400 uppercase text-[11px]">
                <tr>
                  <th className="p-3.5 rounded-l-xl">User ID</th>
                  <th className="p-3.5">Name</th>
                  <th className="p-3.5">Email</th>
                  <th className="p-3.5">Role</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5 rounded-r-xl">Joined</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-200">
                {ADMIN_USERS.map(u => (
                  <tr key={u.id} className="hover:bg-slate-950/50">
                    <td className="p-3.5 text-orange-500 font-bold">{u.id}</td>
                    <td className="p-3.5 font-bold font-sans text-white">{u.name}</td>
                    <td className="p-3.5 text-slate-400">{u.email}</td>
                    <td className="p-3.5"><span className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-orange-400">{u.role}</span></td>
                    <td className="p-3.5 text-emerald-400 font-bold">{u.status}</td>
                    <td className="p-3.5 text-slate-400">{u.joined}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}

export default UsersPage;
