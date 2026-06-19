import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaUser, FaLock, FaSignInAlt, FaEye, FaEyeSlash } from 'react-icons/fa';
import { toast } from 'react-toastify';
import axios from 'axios';

const AdminLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      navigate('/admin/dashboard');
    }
  }, [navigate]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        // `http://localhost:5000/api/admin/login`,
        `https://clc-backend-0isa.onrender.com/api/admin/login`,
        formData
      );

      if (response.data.success) {
        localStorage.setItem('adminToken', response.data.token);
        localStorage.setItem('adminData', JSON.stringify(response.data.admin));
        toast.success('Login successful!');
        navigate('/admin/dashboard');
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error(error.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center bg-slate-950 overflow-hidden">
      {/* Background gradients */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-amber-500/20 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-emerald-500/10 blur-3xl" />
      </div>

      {/* Subtle grid overlay */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_#ffffff10,_transparent_55%)] opacity-60" />

      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="relative z-10 w-full max-w-md px-4 sm:px-6 lg:px-8"
      >
        <div className="rounded-2xl border border-white/10 bg-slate-900/80 backdrop-blur-xl shadow-[0_18px_60px_rgba(0,0,0,0.75)] p-8 sm:p-10">
          {/* Badge + logo */}
          <div className="flex items-center justify-between mb-6">
            <span className="inline-flex items-center rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.16em] text-amber-300">
              Secure Admin Portal
            </span>
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500 to-amber-600 shadow-lg shadow-amber-900/40">
              <FaUser className="text-white text-xl" />
            </div>
          </div>

          {/* Heading */}
          <div className="mb-8 text-left">
            <h1 className="text-3xl sm:text-3xl font-semibold tracking-tight text-white">
              Admin Login
            </h1>
            <p className="mt-2 text-sm text-slate-300">
              City Academy
            </p>
            <p className="mt-1 text-xs text-slate-400">
              Access analytics, registrations, and messages from your dashboard.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Username */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-2">
                Username
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <FaUser className="text-slate-400 text-sm" />
                </span>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  autoComplete="username"
                  className="w-full rounded-xl border border-slate-700 bg-slate-900/60 py-2.5 pl-9 pr-3 text-sm text-white placeholder:text-slate-500 outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-500/50"
                  placeholder="Enter your admin username"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-xs font-medium text-slate-300">
                  Password
                </label>
              </div>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <FaLock className="text-slate-400 text-sm" />
                </span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  autoComplete="current-password"
                  className="w-full rounded-xl border border-slate-700 bg-slate-900/60 py-2.5 pl-9 pr-10 text-sm text-white placeholder:text-slate-500 outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-500/50"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-slate-200 transition"
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <FaEyeSlash className="text-sm" />
                  ) : (
                    <FaEye className="text-sm" />
                  )}
                </button>
              </div>
            </div>

            {/* Remember + meta */}
            <div className="flex items-center justify-between text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <input
                  id="remember"
                  type="checkbox"
                  className="h-3.5 w-3.5 rounded border-slate-600 bg-slate-900 text-amber-500 focus:ring-amber-500/60"
                />
                <label htmlFor="remember" className="select-none">
                  Remember this device
                </label>
              </div>
              <span className="text-[11px] italic">
                Last login details visible in dashboard
              </span>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={loading}
              className="mt-2 inline-flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-amber-500 via-amber-600 to-amber-500 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-amber-900/40 transition hover:brightness-105 hover:-translate-y-[1px] focus:outline-none focus:ring-2 focus:ring-amber-500/60 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                <>
                  <span className="mr-2 inline-flex h-4 w-4 animate-spin rounded-full border-2 border-white border-b-transparent" />
                  Logging in...
                </>
              ) : (
                <>
                  <FaSignInAlt className="mr-2" />
                  Login to Dashboard
                </>
              )}
            </button>
          </form>

          {/* Footer text */}
          <div className="mt-6 text-center">
            <p className="text-[11px] text-slate-500">
              Protected Area – Authorized Access Only. All login attempts are logged.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
