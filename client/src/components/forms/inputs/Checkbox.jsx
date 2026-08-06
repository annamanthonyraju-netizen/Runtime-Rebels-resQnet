import { forwardRef } from 'react';

const Checkbox = forwardRef(({
  label,
  name,
  error,
  required = false,
  className = '',
  children,
  ...rest
}, ref) => {
  return (
    <div className="w-full space-y-1 font-sans text-left">
      <label className="flex items-start gap-3 cursor-pointer text-xs sm:text-sm text-slate-300 select-none">
        <input
          id={name}
          name={name}
          type="checkbox"
          ref={ref}
          className="mt-0.5 w-4 h-4 rounded bg-slate-950 border-slate-700 text-orange-500 focus:ring-orange-500 cursor-pointer"
          {...rest}
        />
        <span className="leading-snug">{children || label}</span>
      </label>

      {error && (
        <p className="text-xs text-red-400 font-semibold flex items-center gap-1.5 pt-0.5 font-mono">
          <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
          <span>{error.message}</span>
        </p>
      )}
    </div>
  );
});

Checkbox.displayName = 'Checkbox';

export default Checkbox;
