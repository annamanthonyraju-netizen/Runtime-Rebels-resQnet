import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaPhoneAlt, FaLock, FaArrowLeft } from 'react-icons/fa';
import AuthCard from '../components/forms/cards/AuthCard';
import Input from '../components/forms/inputs/Input';
import Checkbox from '../components/forms/inputs/Checkbox';
import Button from '../components/forms/buttons/Button';
import RoleSelector from '../components/forms/RoleSelector';
import { useAuth } from '../context/AuthContext';

function Register() {
  const navigate = useNavigate();
  const { register: registerAuth } = useAuth();
  const [selectedRole, setSelectedRole] = useState('Citizen');
  const [serverError, setServerError] = useState('');

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting }
  } = useForm({
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
      terms: false
    }
  });

  const passwordValue = watch('password');

  const onSubmit = async (data) => {
    try {
      setServerError('');
      const res = await registerAuth({ ...data, role: selectedRole });
      navigate(res.redirectPath || '/dashboard');
    } catch (err) {
      setServerError('Registration failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 py-12">
      <div className="w-full max-w-xl flex flex-col items-center">
        
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
          title="Create Emergency Account"
          subtitle="Register your credentials to access your specialized role dashboard."
        >
          {serverError && (
            <div className="p-3.5 rounded-xl bg-red-950/80 border border-red-500/40 text-xs font-mono text-red-300">
              {serverError}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            
            {/* Full Name */}
            <Input
              label="Full Name"
              type="text"
              placeholder="Alex Vance"
              icon={FaUser}
              required
              error={errors.fullName}
              {...register('fullName', {
                required: 'Full Name is required',
                minLength: { value: 3, message: 'Name must be at least 3 characters' }
              })}
            />

            {/* Email & Phone Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Email Address"
                type="email"
                placeholder="alex@resqnet.ai"
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
                label="Phone Number"
                type="tel"
                placeholder="+91 98765 43210"
                icon={FaPhoneAlt}
                required
                error={errors.phone}
                {...register('phone', {
                  required: 'Phone number is required',
                  pattern: {
                    value: /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]*$/g,
                    message: 'Invalid phone number format'
                  }
                })}
              />
            </div>

            {/* Role Selector */}
            <RoleSelector
              selectedRole={selectedRole}
              onChange={setSelectedRole}
            />

            {/* Passwords Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Password"
                type="password"
                placeholder="••••••••••••"
                icon={FaLock}
                required
                error={errors.password}
                {...register('password', {
                  required: 'Password is required',
                  minLength: { value: 6, message: 'Minimum 6 characters' }
                })}
              />

              <Input
                label="Confirm Password"
                type="password"
                placeholder="••••••••••••"
                icon={FaLock}
                required
                error={errors.confirmPassword}
                {...register('confirmPassword', {
                  required: 'Please confirm password',
                  validate: (val) => val === passwordValue || 'Passwords do not match'
                })}
              />
            </div>

            {/* Terms Checkbox */}
            <Checkbox
              error={errors.terms}
              {...register('terms', {
                required: 'You must accept the terms & emergency conditions'
              })}
            >
              I agree to the <span className="text-orange-400 underline font-semibold">Terms &amp; Emergency Protocols</span>.
            </Checkbox>

            {/* Submit Button */}
            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              loading={isSubmitting}
            >
              Register Account &amp; Launch
            </Button>
          </form>

          <div className="pt-4 border-t border-slate-800 text-center font-sans text-xs text-slate-400">
            <span>Already have an account? </span>
            <Link to="/login" className="text-orange-400 font-bold hover:text-orange-300 font-mono">
              Login to Account
            </Link>
          </div>
        </AuthCard>

      </div>
    </div>
  );
}

export default Register;
