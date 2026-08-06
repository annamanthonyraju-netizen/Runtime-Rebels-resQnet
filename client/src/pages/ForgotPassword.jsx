import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { FaEnvelope, FaArrowLeft, FaCheckCircle, FaKey } from 'react-icons/fa';
import AuthCard from '../components/forms/cards/AuthCard';
import Input from '../components/forms/inputs/Input';
import Button from '../components/forms/buttons/Button';
import { useAuth } from '../context/AuthContext';

function ForgotPassword() {
  const { forgotPassword } = useAuth();
  const [successEmail, setSuccessEmail] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm({
    defaultValues: {
      email: ''
    }
  });

  const onSubmit = async (data) => {
    await forgotPassword(data.email);
    setSuccessEmail(data.email);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 py-12">
      <div className="w-full max-w-lg flex flex-col items-center">
        
        {/* Back to Login Link */}
        <Link
          to="/login"
          className="self-start inline-flex items-center gap-2 font-mono text-xs text-slate-400 hover:text-white mb-6 transition-colors"
        >
          <FaArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Login</span>
        </Link>

        {/* Auth Card Container */}
        <AuthCard
          title="Reset Account Password"
          subtitle="Enter your authorized emergency email address to receive password reset instructions."
        >
          {successEmail ? (
            <div className="p-6 rounded-2xl bg-emerald-950/80 border border-emerald-500/40 text-center space-y-3 font-mono">
              <FaCheckCircle className="w-10 h-10 text-emerald-400 mx-auto" />
              <h3 className="text-base font-bold text-white">Reset Instructions Dispatched</h3>
              <p className="text-xs text-slate-300">
                An encrypted password reset link has been dispatched to <strong className="text-orange-400">{successEmail}</strong>.
              </p>
              <div className="pt-2">
                <Link
                  to="/login"
                  className="inline-block px-5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs font-bold text-white hover:text-orange-400"
                >
                  Return to Login
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <Input
                label="Registered Email Address"
                type="email"
                placeholder="officer@resqnet.ai"
                icon={FaEnvelope}
                required
                error={errors.email}
                {...register('email', {
                  required: 'Email address is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email format'
                  }
                })}
              />

              <Button
                type="submit"
                variant="primary"
                size="lg"
                fullWidth
                loading={isSubmitting}
                icon={FaKey}
              >
                Send Password Reset Link
              </Button>
            </form>
          )}

          <div className="pt-4 border-t border-slate-800 text-center font-sans text-xs text-slate-400">
            <span>Remembered your password? </span>
            <Link to="/login" className="text-orange-400 font-bold hover:text-orange-300 font-mono">
              Back to Login
            </Link>
          </div>
        </AuthCard>

      </div>
    </div>
  );
}

export default ForgotPassword;
