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
    <div className="w-full space-y-1.5 font-sans text-left">
      {label && (
        <label htmlFor={name} className="block text-xs font-bold text-slate-300 uppercase tracking-wider font-mono">
          {label} {required && <span className="text-orange-500">*</span>}
        </label>
      )}

      <div className="relative flex items-center">
        {Icon && (
          <div className="absolute left-4 text-orange-500 pointer-events-none">
            <Icon className="w-4 h-4" />
          </div>
        )}
        
        <input
          id={name}
          name={name}
          type={type}
          ref={ref}
          placeholder={placeholder}
          className={`w-full bg-slate-950 border ${
            error ? 'border-red-500 shadow-sm' : 'border-slate-700 focus:border-orange-500'
          } text-white placeholder-slate-500 text-sm rounded-xl ${
            Icon ? 'pl-11' : 'px-4'
          } pr-4 py-3.5 transition-all outline-none font-sans ${className}`}
          {...rest}
        />
      </div>

      {error && (
        <p className="text-xs text-red-400 font-semibold flex items-center gap-1.5 pt-0.5 font-mono">
          <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
          <span>{error.message}</span>
        </p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
