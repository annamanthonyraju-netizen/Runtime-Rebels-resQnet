import { FaSpinner } from 'react-icons/fa';

function Button({
  children,
  type = 'button',
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  loading = false,
  disabled = false,
  icon: Icon,
  onClick,
  className = '',
  ...rest
}) {
  const baseStyles = "relative inline-flex items-center justify-center font-mono font-bold transition-all duration-300 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer";

  const sizeStyles = {
    sm: "px-4 py-2 text-xs",
    md: "px-6 py-3.5 text-sm sm:text-base",
    lg: "px-8 py-4 text-base sm:text-lg"
  };

  const variantStyles = {
    primary: "bg-gradient-to-r from-orange-500 to-amber-600 text-slate-950 hover:from-orange-400 hover:to-amber-500 shadow-[0_0_25px_rgba(255,107,0,0.35)] hover:shadow-[0_0_35px_rgba(255,107,0,0.5)] hover:scale-[1.01]",
    secondary: "bg-slate-900/90 text-orange-400 border border-orange-500/40 hover:bg-slate-800 hover:border-orange-400 shadow-[0_0_15px_rgba(255,107,0,0.15)]",
    outline: "bg-transparent text-slate-300 border border-slate-700 hover:border-slate-500 hover:text-white",
    danger: "bg-gradient-to-r from-red-600 to-orange-600 text-white shadow-[0_0_20px_rgba(239,68,68,0.35)] hover:scale-[1.01]"
  };

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...rest}
    >
      {loading ? (
        <span className="flex items-center gap-2">
          <FaSpinner className="w-5 h-5 animate-spin text-slate-950" />
          <span>AUTHENTICATING NODE...</span>
        </span>
      ) : (
        <span className="flex items-center justify-center gap-2.5">
          {Icon && <Icon className="w-5 h-5" />}
          <span>{children}</span>
        </span>
      )}
    </button>
  );
}

export default Button;
