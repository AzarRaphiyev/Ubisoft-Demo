import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

import { Toaster, toast } from 'react-hot-toast';
import { userSignIn } from '../services/AuthService';

const UbisoftLogin = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // Yadda saxlanmış email varsa götür
  useEffect(() => {
    const savedEmail = localStorage.getItem('email');
    if (savedEmail) {
      setFormData(prev => ({
        ...prev,
        email: savedEmail,
        rememberMe: true
      }));
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email tələb olunur';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Düzgün email formatı daxil edin';
    }

    if (!formData.password.trim()) {
      newErrors.password = 'Şifrə tələb olunur';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Şifrə ən azı 6 simvol olmalıdır';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error('Zəhmət olmasa bütün sahələri düzgün doldurun');
      return;
    }

    try {
      setIsLoading(true);
      const user = await userSignIn({
        email: formData.email.trim(),
        password: formData.password
      });

      toast.success('Giriş uğurla tamamlandı!');

      //  localStorage/sessionStorage-da saxla
      if (formData.rememberMe) {
        localStorage.setItem('user', JSON.stringify(user));
      } else {
        sessionStorage.setItem('user', JSON.stringify(user));
      }

      // Girişdən sonra 1 saniyə sonra yönləndir
      setTimeout(() => {
        navigate('/');
      }, 1000);
    } catch (error) {
      console.error('Login error:', error);
      const msg = error.message.toLowerCase();

      if (
        msg.includes('yanlışdır') ||
        msg.includes('mövcud deyil') ||
        msg.includes('not found') ||
        msg.includes('invalid') ||
        msg.includes('incorrect') ||
        msg.includes('wrong')
      ) {
        toast.error('Email və ya şifrə yanlışdır');
      } else if (msg.includes('network')) {
        toast.error('İnternet bağlantısında problem var');
      } else {
        toast.error(error.message || 'Giriş zamanı xəta baş verdi');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-[100vh] flex items-center justify-center px-4">
      <Toaster position="top-right" />
      <div className="w-full scale-90 max-w-lg">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl mb-4">
            <img
              src="https://logos-marques.com/wp-content/uploads/2021/03/Ubisoft-Embleme.png"
              alt="Ubisoft Logo"
              className="w-12 h-12 object-contain"
            />
          </div>
          <h1 className="text-3xl ubisoft-bold text-white mb-2">Welcome Back</h1>
          <p className="text-slate-400 ubisoft-text">Sign in to your account</p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20"
        >
          <div className="space-y-6">
            {/* Email */}
            <div>
              <label className="text-white text-sm font-medium flex items-center gap-2 mb-2">
                <Mail size={16} />
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full bg-white/10 border rounded-xl px-4 py-3 text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all ${
                  errors.email
                    ? 'border-red-500 focus:border-red-500'
                    : 'border-white/20 focus:border-blue-500'
                }`}
                placeholder="Enter your email"
                disabled={isLoading}
              />
              {errors.email && (
                <p className="text-red-400 text-xs mt-1">{errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="text-white text-sm font-medium flex items-center gap-2 mb-2">
                <Lock size={16} />
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`w-full bg-white/10 border rounded-xl px-4 py-3 pr-12 text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all ${
                    errors.password
                      ? 'border-red-500 focus:border-red-500'
                      : 'border-white/20 focus:border-blue-500'
                  }`}
                  placeholder="Enter your password"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white disabled:opacity-50"
                  disabled={isLoading}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-400 text-xs mt-1">{errors.password}</p>
              )}
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-blue-500 bg-white/10 border-white/20 rounded focus:ring-blue-500 focus:ring-2"
                  disabled={isLoading}
                />
                <span className="text-sm text-slate-300">Remember me</span>
              </label>

              <button
                type="button"
                className="text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors disabled:opacity-50"
                disabled={isLoading}
              >
                Forgot password?
              </button>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:transform-none"
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Signing in...
                </div>
              ) : (
                'Sign In'
              )}
            </button>
          </div>

          {/* Register Link */}
          <div className="mt-6 text-center">
            <p className="text-slate-400 text-sm">
              Don't have an account?{' '}
              <Link
                to="/auth/register"
                className="text-blue-400 hover:text-blue-300 transition-colors"
              >
                Create Account
              </Link>
            </p>
          </div>
        </form>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-slate-500 text-xs">
            By signing in, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
};

export default UbisoftLogin;
