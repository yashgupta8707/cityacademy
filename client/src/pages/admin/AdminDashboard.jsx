import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FaUsers,
  FaEnvelope,
  FaCheckCircle,
  FaClock,
  FaTimesCircle,
  FaChartLine,
  FaSignOutAlt,
  FaUserGraduate,
  FaBars,
  FaTimes
} from 'react-icons/fa';
import { toast } from 'react-toastify';
import axios from 'axios';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      if (!token) {
        navigate('/admin/login');
        return;
      }

      const response = await axios.get(
        // `http://localhost:5000/api/admin/dashboard/stats`,
        `https://clc-backend-0isa.onrender.com/api/admin/dashboard/stats`,

        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      if (response.data.success) {
        setStats(response.data.stats);
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
      if (error.response?.status === 401) {
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminData');
        navigate('/admin/login');
        toast.error('Session expired. Please login again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminData');
    toast.success('Logged out successfully');
    navigate('/admin/login');
  };

  const StatCard = ({ icon, title, value, color, link, subtitle }) => (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4, scale: 1.01 }}
      transition={{ duration: 0.2 }}
      className="h-full"
    >
      <Link to={link} className="block h-full group">
        <div className="relative h-full overflow-hidden rounded-2xl border border-slate-700/60 bg-slate-900/80 p-5 shadow-md transition group-hover:shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/5 via-transparent to-emerald-500/5 opacity-0 group-hover:opacity-100 transition" />
          <div className="relative flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-slate-400">
                {title}
              </p>
              <p className={`mt-2 text-3xl font-semibold ${color}`}>
                {value}
              </p>
              {subtitle && (
                <p className="mt-1 text-xs text-slate-400">
                  {subtitle}
                </p>
              )}
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-800 group-hover:bg-slate-700 transition">
              <span className={`${color} text-2xl`}>{icon}</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950">
        <div className="flex flex-col items-center gap-3">
          <div className="animate-spin rounded-full h-10 w-10 border-2 border-amber-500 border-t-transparent" />
          <p className="text-sm text-slate-300">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Top Navigation */}
      <nav className="sticky top-0 z-40 border-b border-slate-800 bg-slate-950/80 backdrop-blur-xl">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-3">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="md:hidden mr-1 text-slate-300 hover:text-white"
              >
                {sidebarOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
              </button>
              <div>
                <h1 className="text-lg sm:text-xl font-semibold tracking-tight">
                  Admin Dashboard
                </h1>
                <p className="text-xs text-slate-400">
                  City Academy • Control Panel
                </p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-2 rounded-full border border-red-500/40 bg-red-500/10 px-3 py-1.5 text-xs font-medium text-red-300 hover:bg-red-500/20 transition"
            >
              <FaSignOutAlt className="text-sm" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar (mobile drawer) */}
      <div
        className={`fixed inset-y-0 left-0 z-40 w-64 transform bg-slate-900/95 backdrop-blur-xl border-r border-slate-800 px-5 pt-6 pb-8 transition-transform md:hidden ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="mb-8 flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold">Admin Menu</p>
            <p className="text-xs text-slate-400">Quick navigation</p>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="text-slate-400 hover:text-white"
          >
            <FaTimes />
          </button>
        </div>

        <nav className="space-y-3 text-sm">
          <Link
            to="/admin/students"
            onClick={() => setSidebarOpen(false)}
            className="flex items-center gap-3 rounded-xl px-3 py-2 hover:bg-slate-800/90"
          >
            <FaUserGraduate className="text-amber-400" />
            <span>Manage Students</span>
          </Link>
          <Link
            to="/admin/messages"
            onClick={() => setSidebarOpen(false)}
            className="flex items-center gap-3 rounded-xl px-3 py-2 hover:bg-slate-800/90"
          >
            <FaEnvelope className="text-emerald-400" />
            <span>Contact Messages</span>
          </Link>
        </nav>
      </div>

      {/* Main Content */}
      <main className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Navigation */}
        <section className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold tracking-tight">
              Quick Access
            </h2>
            <span className="text-[11px] text-slate-400 hidden sm:inline">
              Use these shortcuts to jump straight into key modules
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link
              to="/admin/students"
              className="group relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/80 p-5 shadow-md hover:shadow-xl transition"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/10 via-transparent to-emerald-500/10 opacity-0 group-hover:opacity-100 transition" />
              <div className="relative flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500/15 text-amber-300">
                    <FaUserGraduate className="text-2xl" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold">
                      Manage Students
                    </h3>
                    <p className="mt-1 text-xs text-slate-300">
                      View, approve, and track registrations
                    </p>
                  </div>
                </div>
              </div>
            </Link>

            <Link
              to="/admin/messages"
              className="group relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/80 p-5 shadow-md hover:shadow-xl transition"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-sky-500/10 via-transparent to-purple-500/10 opacity-0 group-hover:opacity-100 transition" />
              <div className="relative flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-sky-500/15 text-sky-300">
                    <FaEnvelope className="text-2xl" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold">
                      Contact Messages
                    </h3>
                    <p className="mt-1 text-xs text-slate-300">
                      Review and respond to inquiries efficiently
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </section>

        {/* Student Statistics */}
        <section className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold tracking-tight">
              Student Registrations
            </h2>
            <span className="text-[11px] text-slate-400">
              Overall status of all applications
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <StatCard
              icon={<FaUsers />}
              title="Total Students"
              value={stats?.students?.total || 0}
              color="text-amber-300"
              link="/admin/students"
              subtitle="All registered applicants"
            />
            <StatCard
              icon={<FaClock />}
              title="Pending"
              value={stats?.students?.pending || 0}
              color="text-yellow-300"
              link="/admin/students?status=Pending"
              subtitle="Awaiting review"
            />
            <StatCard
              icon={<FaCheckCircle />}
              title="Approved"
              value={stats?.students?.approved || 0}
              color="text-emerald-300"
              link="/admin/students?status=Approved"
              subtitle="Successfully admitted"
            />
            <StatCard
              icon={<FaTimesCircle />}
              title="Rejected"
              value={stats?.students?.rejected || 0}
              color="text-red-300"
              link="/admin/students?status=Rejected"
              subtitle="Not selected"
            />
          </div>
        </section>

        {/* Message Statistics */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold tracking-tight">
              Contact Messages
            </h2>
            <span className="text-[11px] text-slate-400">
              Overview of all inquiries
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <StatCard
              icon={<FaEnvelope />}
              title="Total Messages"
              value={stats?.messages?.total || 0}
              color="text-sky-300"
              link="/admin/messages"
              subtitle="All received messages"
            />
            <StatCard
              icon={<FaClock />}
              title="New"
              value={stats?.messages?.new || 0}
              color="text-amber-300"
              link="/admin/messages?status=New"
              subtitle="Unseen / unread"
            />
            <StatCard
              icon={<FaChartLine />}
              title="In Progress"
              value={stats?.messages?.inProgress || 0}
              color="text-orange-300"
              link="/admin/messages?status=In Progress"
              subtitle="Being handled"
            />
            <StatCard
              icon={<FaCheckCircle />}
              title="Resolved"
              value={stats?.messages?.resolved || 0}
              color="text-emerald-300"
              link="/admin/messages?status=Resolved"
              subtitle="Closed queries"
            />
          </div>
        </section>

        {/* Recent Activity */}
        <section className="mt-10">
          <div className="relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/80 p-6 shadow-md">
            <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/10 via-transparent to-emerald-500/10 opacity-60" />
            <div className="relative">
              <h2 className="text-lg font-semibold mb-2">
                Recent Activity
              </h2>
              <p className="text-sm text-slate-200">
                {stats?.students?.recent || 0} new registrations in the last 7 days.
              </p>
              <p className="mt-1 text-xs text-slate-400">
                Use this trend to plan follow-ups, approvals, and counselling sessions.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default AdminDashboard;
