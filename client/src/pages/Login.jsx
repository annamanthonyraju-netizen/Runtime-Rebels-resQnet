import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { FaEnvelope, FaLock, FaArrowLeft } from 'react-icons/fa';
import AuthCard from '../components/forms/cards/AuthCard';
import Input from '../components/forms/inputs/Input';
import Checkbox from '../components/forms/inputs/Checkbox';
import Button from '../components/forms/buttons/Button';
import { useAuth } from '../context/AuthContext';

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [serverError, setServerError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
      rememberMe: true
    }
  });

  const onSubmit = async (data) => {
    try {
      setServerError('');
      const res = await login(data);
      navigate(res.redirectPath || '/dashboard');
    } catch (err) {
      setServerError('Authentication failed. Please verify your credentials.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 py-12">
      <div className="w-full max-w-lg flex flex-col items-center">
        
        {/* Back to Home Link */}
        <Link
          to="/"
          className="self-start inline-flex items-center gap-2 font-mono text-xs text-slate-400 hover:text-white mb-6 transition-colors"
        >
          <FaArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Home</span>
        </Link>

        {/* Auth Card Container */}
        <AuthCard
          title="Emergency Portal Login"
          subtitle="Enter your credentials to access your role-based disaster command dashboard."
        >
          {serverError && (
            <div className="p-3.5 rounded-xl bg-red-950/80 border border-red-500/40 text-xs font-mono text-red-300">
              {serverError}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
              label="Email Address"
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

            <Input
              label="Password"
              type="password"
              placeholder="••••••••••••"
              icon={FaLock}
              required
              error={errors.password}
              {...register('password', {
                required: 'Password is required',
                minLength: { value: 6, message: 'Password must be at least 6 characters' }
              })}
            />

            <div className="flex items-center justify-between text-xs font-sans pt-1">
              <Checkbox {...register('rememberMe')}>
                Remember Session
              </Checkbox>

              <Link
                to="/forgot-password"
                className="text-orange-400 hover:text-orange-300 font-semibold font-mono text-xs"
              >
                Forgot Password?
              </Link>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              loading={isSubmitting}
            >
              Sign In to Command
            </Button>
          </form>

          <div className="pt-4 border-t border-slate-800 text-center font-sans text-xs text-slate-400">
            <span>Don&apos;t have an account? </span>
            <Link to="/register" className="text-orange-400 font-bold hover:text-orange-300 font-mono">
              Register Here
            </Link>
          </div>
        </AuthCard>

      </div>
    </div>
  );
}

export default Login;
