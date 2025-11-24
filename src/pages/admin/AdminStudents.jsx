import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FaSearch,
  FaArrowLeft,
  FaSignOutAlt,
  FaEye
} from 'react-icons/fa';
import { toast } from 'react-toastify';
import axios from 'axios';

const AdminStudents = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: searchParams.get('search') || '',
    status: searchParams.get('status') || 'all',
    course: searchParams.get('course') || 'all',
    page: parseInt(searchParams.get('page')) || 1
  });
  const [pagination, setPagination] = useState({
    totalPages: 1,
    currentPage: 1,
    totalStudents: 0
  });

  useEffect(() => {
    fetchStudents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  const fetchStudents = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('adminToken');
      if (!token) {
        navigate('/admin/login');
        return;
      }

      const params = new URLSearchParams();
      if (filters.search) params.append('search', filters.search);
      if (filters.status !== 'all') params.append('status', filters.status);
      if (filters.course !== 'all') params.append('course', filters.course);
      params.append('page', filters.page);
      params.append('limit', 25); // denser, more rows like Excel

      const response = await axios.get(
        // `http://localhost:5000/api/admin/students?${params.toString()}`,
        `https://clc-backend-0isa.onrender.com/api/admin/students?${params.toString()}`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      if (response.data.success) {
        setStudents(response.data.students);
        setPagination({
          totalPages: response.data.totalPages,
          currentPage: response.data.currentPage,
          totalStudents: response.data.totalStudents
        });
      }
    } catch (error) {
      console.error('Error fetching students:', error);
      if (error.response?.status === 401) {
        localStorage.removeItem('adminToken');
        navigate('/admin/login');
        toast.error('Session expired. Please login again.');
      } else {
        toast.error('Failed to fetch students');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value, page: 1 };
    setFilters(newFilters);

    const params = new URLSearchParams();
    if (newFilters.search) params.set('search', newFilters.search);
    if (newFilters.status !== 'all') params.set('status', newFilters.status);
    if (newFilters.course !== 'all') params.set('course', newFilters.course);
    params.set('page', newFilters.page);
    setSearchParams(params);
  };

  const handlePageChange = (newPage) => {
    setFilters({ ...filters, page: newPage });
    const params = new URLSearchParams(searchParams);
    params.set('page', newPage);
    setSearchParams(params);
  };

  const getStatusBadge = (status) => {
    const badges = {
      Pending: 'bg-yellow-100 text-yellow-800',
      Approved: 'bg-green-100 text-green-800',
      Rejected: 'bg-red-100 text-red-800'
    };
    return badges[status] || 'bg-gray-100 text-gray-800';
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminData');
    toast.success('Logged out successfully');
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-slate-100 print:bg-white">
      {/* Top Navigation */}
      <nav className="bg-white shadow-sm border-b border-slate-200 print:hidden">
        <div className="mx-auto max-w-7xl px-4 lg:px-6">
          <div className="flex justify-between items-center py-3">
            <div className="flex items-center gap-3">
              <Link
                to="/admin/dashboard"
                className="text-slate-500 hover:text-slate-800"
              >
                <FaArrowLeft size={18} />
              </Link>
              <div>
                <h1 className="text-lg md:text-xl font-semibold text-slate-900">
                  Student Management
                </h1>
                <p className="text-xs text-slate-500">
                  Excel-like overview of all registrations
                </p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-2 rounded-full border border-red-500/40 bg-red-500/10 px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-500/20 transition"
            >
              <FaSignOutAlt className="text-sm" />
              <span className="hidden md:inline">Logout</span>
            </button>
          </div>
        </div>
      </nav>

      <div className="mx-auto max-w-7xl px-4 lg:px-6 py-6">
        {/* Filters */}
        <div className="mb-4 rounded-2xl bg-white shadow-sm border border-slate-200 p-4 md:p-5">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                Search
              </label>
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
                <input
                  type="text"
                  placeholder="Name, email, phone, or registration number"
                  value={filters.search}
                  onChange={(e) => handleFilterChange('search', e.target.value)}
                  className="w-full rounded-xl border border-slate-300 bg-white py-2.5 pl-9 pr-3 text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/40"
                />
              </div>
            </div>

            {/* Status Filter */}
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                Status
              </label>
              <select
                value={filters.status}
                onChange={(e) => handleFilterChange('status', e.target.value)}
                className="w-full rounded-xl border border-slate-300 bg-white py-2.5 px-3 text-sm text-slate-900 outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/40"
              >
                <option value="all">All Status</option>
                <option value="Pending">Pending</option>
                <option value="Approved">Approved</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>

            {/* Course Filter */}
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                Course
              </label>
              <select
                value={filters.course}
                onChange={(e) => handleFilterChange('course', e.target.value)}
                className="w-full rounded-xl border border-slate-300 bg-white py-2.5 px-3 text-sm text-slate-900 outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/40"
              >
                <option value="all">All Courses</option>
                <option value="BBA">BBA</option>
                <option value="BCA">BCA</option>
                <option value="BCom">BCom</option>
                <option value="BSc(AG)">BSc(AG)</option>
                <option value="BEd">BEd</option>
                <option value="MEd">MEd</option>
                <option value="DElEd">DElEd</option>
              </select>
            </div>
          </div>

          <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
            <p>
              Showing <span className="font-semibold text-slate-700">{students.length}</span> of{' '}
              <span className="font-semibold text-slate-700">{pagination.totalStudents}</span> students
            </p>
            <p>Page {pagination.currentPage} of {pagination.totalPages}</p>
          </div>
        </div>

        {/* Students Table */}
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-10 w-10 border-2 border-amber-500 border-t-transparent"></div>
          </div>
        ) : students.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-12 text-center">
            <p className="text-slate-600 text-sm">No students found for the selected filters.</p>
          </div>
        ) : (
          <>
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full table-fixed text-xs md:text-sm">
                  <thead className="bg-slate-50 border-b border-slate-200">
                    <tr>
                      <th className="px-4 py-2.5 text-left font-semibold text-slate-600 uppercase tracking-[0.06em]">
                        Reg. No
                      </th>
                      <th className="px-4 py-2.5 text-left font-semibold text-slate-600 uppercase tracking-[0.06em]">
                        Student Name
                      </th>
                      <th className="px-4 py-2.5 text-left font-semibold text-slate-600 uppercase tracking-[0.06em]">
                        Email
                      </th>
                      <th className="px-4 py-2.5 text-left font-semibold text-slate-600 uppercase tracking-[0.06em]">
                        Phone
                      </th>
                      <th className="px-4 py-2.5 text-left font-semibold text-slate-600 uppercase tracking-[0.06em]">
                        Course
                      </th>
                      <th className="px-4 py-2.5 text-left font-semibold text-slate-600 uppercase tracking-[0.06em]">
                        Status
                      </th>
                      <th className="px-4 py-2.5 text-center font-semibold text-slate-600 uppercase tracking-[0.06em] w-28">
                        View
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {students.map((student, idx) => (
                      <tr
                        key={student._id}
                        className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50'}
                      >
                        <td className="px-4 py-2 border-t border-slate-200 whitespace-nowrap font-medium text-slate-900">
                          {student.registrationNo}
                        </td>
                        <td className="px-4 py-2 border-t border-slate-200 whitespace-nowrap text-slate-900">
                          {student.studentName || student.fullName}
                        </td>
                        <td className="px-4 py-2 border-t border-slate-200 whitespace-nowrap text-slate-600">
                          {student.email}
                        </td>
                        <td className="px-4 py-2 border-t border-slate-200 whitespace-nowrap text-slate-600">
                          {student.phone}
                        </td>
                        <td className="px-4 py-2 border-t border-slate-200 whitespace-nowrap text-slate-600">
                          {student.course}
                        </td>
                        <td className="px-4 py-2 border-t border-slate-200 whitespace-nowrap">
                          <span
                            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${getStatusBadge(
                              student.status
                            )}`}
                          >
                            {student.status}
                          </span>
                        </td>
                        <td className="px-4 py-2 border-t border-slate-200 whitespace-nowrap text-center">
                          <Link
                            to={`/admin/students/${student._id}`}
                            className="inline-flex items-center justify-center rounded-full border border-amber-500/60 bg-amber-500/10 px-3 py-1.5 text-[11px] font-medium text-amber-700 hover:bg-amber-500/20 transition"
                            title="View as PDF-style form"
                          >
                            <FaEye className="mr-1.5 text-xs" />
                            View
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Pagination */}
            {pagination.totalPages > 1 && (
              <div className="mt-4 flex justify-center">
                <nav className="flex flex-wrap items-center gap-2 text-xs">
                  <button
                    onClick={() => handlePageChange(filters.page - 1)}
                    disabled={filters.page === 1}
                    className="px-3 py-1.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>
                  {[...Array(pagination.totalPages)].map((_, index) => (
                    <button
                      key={index + 1}
                      onClick={() => handlePageChange(index + 1)}
                      className={`px-3 py-1.5 rounded-lg border ${
                        filters.page === index + 1
                          ? 'bg-amber-500 text-white border-amber-500'
                          : 'bg-white border-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      {index + 1}
                    </button>
                  ))}
                  <button
                    onClick={() => handlePageChange(filters.page + 1)}
                    disabled={filters.page === pagination.totalPages}
                    className="px-3 py-1.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                </nav>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AdminStudents;
