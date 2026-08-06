import { forwardRef } from 'react';

const Input = forwardRef(({
  label,
  type = 'text',
  name,
  error,
  placeholder,
  icon: Icon,
  required = false,
  className = '',
  ...rest
}, ref) => {
  return (
    <div className="w-full space-y-1.5 font-mono text-left">
      {label && (
        <label htmlFor={name} className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
          {label} {required && <span className="text-orange-400">*</span>}
        </label>
      )}

      <div className="relative flex items-center">
        {Icon && (
          <div className="absolute left-4 text-orange-400 pointer-events-none">
            <Icon className="w-5 h-5" />
          </div>
        )}
        
        <input
          id={name}
          name={name}
          type={type}
          ref={ref}
          placeholder={placeholder}
          className={`w-full bg-slate-950/90 border ${
            error ? 'border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.3)]' : 'border-slate-800 focus:border-orange-400 focus:shadow-[0_0_20px_rgba(255,107,0,0.25)]'
          } text-white placeholder-slate-500 text-sm sm:text-base rounded-xl ${
            Icon ? 'pl-12' : 'px-4'
          } pr-4 py-3.5 transition-all outline-none font-mono ${className}`}
          {...rest}
        />
      </div>

      {error && (
        <p className="text-xs text-red-400 font-semibold flex items-center gap-1.5 pt-0.5">
          <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping"></span>
          <span>{error.message}</span>
        </p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
