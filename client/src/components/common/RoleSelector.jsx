import { FaUser, FaHandsHelping, FaShieldAlt, FaUserShield } from 'react-icons/fa';

const ROLES = [
  { id: 'Citizen', label: 'Citizen', desc: 'Local Resident / Public', icon: FaUser },
  { id: 'Volunteer', label: 'Volunteer', desc: 'Disaster Relief Helper', icon: FaHandsHelping },
  { id: 'Officer', label: 'Officer', desc: 'First Responder / Police / Fire', icon: FaShieldAlt },
  { id: 'Admin', label: 'Admin', desc: 'Emergency Command Authority', icon: FaUserShield }
];

function RoleSelector({ selectedRole, onChange, error }) {
  return (
    <div className="w-full space-y-2 font-mono text-left">
      <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
        Select Access Role <span className="text-orange-400">*</span>
      </label>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {ROLES.map((role) => {
          const Icon = role.icon;
          const isSelected = selectedRole === role.id;
          return (
            <button
              key={role.id}
              type="button"
              onClick={() => onChange(role.id)}
              className={`p-3.5 rounded-2xl border text-left transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'bg-orange-500/20 border-orange-400 text-orange-300 shadow-[0_0_20px_rgba(255,107,0,0.25)] font-bold'
                  : 'bg-slate-950/80 border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <Icon className={`w-5 h-5 ${isSelected ? 'text-orange-400' : 'text-slate-400'}`} />
                {isSelected && <span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse"></span>}
              </div>

              <div>
                <span className="block text-sm font-bold font-mono">{role.label}</span>
                <span className="block text-[10px] text-slate-400 leading-tight mt-0.5">{role.desc}</span>
              </div>
            </button>
          );
        })}
      </div>

      {error && (
        <p className="text-xs text-red-400 font-semibold pt-1">
          {error.message}
        </p>
      )}
    </div>
  );
}

export default RoleSelector;
