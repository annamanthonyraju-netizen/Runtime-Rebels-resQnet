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
  const baseStyles = "relative inline-flex items-center justify-center font-sans font-bold transition-all duration-200 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer shadow-sm";

  const sizeStyles = {
    sm: "px-4 py-2 text-xs",
    md: "px-6 py-3.5 text-sm sm:text-base",
    lg: "px-8 py-4 text-base sm:text-lg"
  };

  const variantStyles = {
    primary: "bg-orange-500 hover:bg-orange-600 text-slate-950 shadow-md",
    secondary: "bg-slate-800 hover:bg-slate-700 text-white border border-slate-700",
    outline: "bg-transparent text-slate-300 border border-slate-700 hover:border-slate-500 hover:text-white",
    danger: "bg-red-600 hover:bg-red-700 text-white"
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
        <span className="flex items-center gap-2 font-mono text-xs">
          <FaSpinner className="w-4 h-4 animate-spin text-slate-950" />
          <span>AUTHENTICATING...</span>
        </span>
      ) : (
        <span className="flex items-center justify-center gap-2">
          {Icon && <Icon className="w-4 h-4" />}
          <span>{children}</span>
        </span>
      )}
    </button>
  );
}

export default Button;
