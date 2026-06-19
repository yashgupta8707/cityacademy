import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FaSearch,
  FaArrowLeft,
  FaSignOutAlt,
  FaEye,
  FaFileExcel
} from 'react-icons/fa';
import { toast } from 'react-toastify';
import axios from 'axios';
import * as XLSX from 'xlsx';

const CUTOFF_DATE = new Date('2026-06-19T00:00:00+05:30'); // only show submissions after 18 June 2026 IST

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
        const filtered = response.data.students.filter(
          (s) => new Date(s.createdAt) >= CUTOFF_DATE
        );
        setStudents(filtered);
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

  const exportToExcel = async () => {
    try {
      toast.info('Fetching all student data...');
      const token = localStorage.getItem('adminToken');
      if (!token) {
        navigate('/admin/login');
        return;
      }

      // Fetch all students without pagination
      const params = new URLSearchParams();
      if (filters.search) params.append('search', filters.search);
      if (filters.status !== 'all') params.append('status', filters.status);
      if (filters.course !== 'all') params.append('course', filters.course);
      params.append('page', 1);
      params.append('limit', 10000); // Fetch all students

      const response = await axios.get(
        `https://clc-backend-0isa.onrender.com/api/admin/students?${params.toString()}`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      if (response.data.success) {
        const allStudents = response.data.students.filter(
          (s) => new Date(s.createdAt) >= CUTOFF_DATE
        );

        // Prepare data for Excel
        const excelData = allStudents.map((student, index) => ({
          'S.No': index + 1,
          'Registration No': student.registrationNo || '',
          'Student Name': student.studentName || student.fullName || '',
          'Full Name': student.fullName || '',
          'Email': student.email || '',
          'Phone': student.phone || '',
          'Date of Birth': student.dateOfBirth ? new Date(student.dateOfBirth).toLocaleDateString('en-IN') : '',
          'Gender': student.gender || '',
          'Father Name': student.fatherName || '',
          'Mother Name': student.motherName || '',
          'Nationality': student.nationality || '',
          'Category': student.category || '',
          'Aadhaar No': student.adhaarNo || '',
          'Father Contact': student.fatherContact || '',
          'Address': student.address || '',
          'State': student.state || '',
          'District': student.district || '',
          'Pincode': student.pincode || '',
          'Course': student.course || '',

          // 10th Details
          '10th Board': student.tenthBoard || '',
          '10th Year': student.tenthYear || '',
          '10th Marksheet No': student.tenthMarksheetNo || '',
          '10th Roll No': student.tenthRollNo || '',
          '10th Total Marks': student.tenthTotalMarks || '',
          '10th Marks Obtained': student.tenthMarksObtained || '',
          '10th Percentage': student.tenthPercentage || '',

          // 12th Details
          '12th Board': student.twelfthBoard || '',
          '12th Year': student.twelfthYear || '',
          '12th Marksheet No': student.twelfthMarksheetNo || '',
          '12th Roll No': student.twelfthRollNo || '',
          '12th Total Marks': student.twelfthTotalMarks || '',
          '12th Marks Obtained': student.twelfthMarksObtained || '',
          '12th Percentage': student.twelfthPercentage || '',

          // Graduation Details
          'Graduation Board/University': student.graduationBoard || '',
          'Graduation Year': student.graduationYear || '',
          'Graduation Marksheet No': student.graduationMarksheetNo || '',
          'Graduation Roll No': student.graduationRollNo || '',
          'Graduation Total Marks': student.graduationTotalMarks || '',
          'Graduation Marks Obtained': student.graduationMarksObtained || '',
          'Graduation Percentage': student.graduationPercentage || '',

          // Documents Info
          'Documents Uploaded': student.documents ? 'Yes' : 'No',
          'Photo': student.documents?.photo ? 'Yes' : 'No',
          'Signature': student.documents?.signature ? 'Yes' : 'No',
          '10th Marksheet': student.documents?.tenthMarksheet ? 'Yes' : 'No',
          '12th Marksheet': student.documents?.twelfthMarksheet ? 'Yes' : 'No',
          'Graduation Marksheet': student.documents?.graduationMarksheet ? 'Yes' : 'No',
          'Aadhaar Card': student.documents?.adhaarCard ? 'Yes' : 'No',
          'TC/Migration': student.documents?.tcMigration ? 'Yes' : 'No',

          // Status and Dates
          'Declaration Accepted': student.declarationAccepted ? 'Yes' : 'No',
          'Status': student.status || '',
          // 'Registration Date': student.registrationDate ? new Date(student.registrationDate).toLocaleString('en-IN') : '',
          'Submission Date': student.createdAt ? new Date(student.createdAt).toLocaleString('en-IN') : '',
          // 'Updated At': student.updatedAt ? new Date(student.updatedAt).toLocaleString('en-IN') : ''
        }));

        // Create worksheet
        const worksheet = XLSX.utils.json_to_sheet(excelData);

        // Set column widths for better readability
        const columnWidths = [
          { wch: 6 },   // S.No
          { wch: 15 },  // Registration No
          { wch: 25 },  // Student Name
          { wch: 25 },  // Full Name
          { wch: 30 },  // Email
          { wch: 15 },  // Phone
          { wch: 12 },  // DOB
          { wch: 10 },  // Gender
          { wch: 25 },  // Father Name
          { wch: 25 },  // Mother Name
          { wch: 12 },  // Nationality
          { wch: 12 },  // Category
          { wch: 15 },  // Aadhaar No
          { wch: 15 },  // Father Contact
          { wch: 40 },  // Address
          { wch: 15 },  // State
          { wch: 15 },  // District
          { wch: 10 },  // Pincode
          { wch: 12 },  // Course

          // 10th Details
          { wch: 20 },  // 10th Board
          { wch: 10 },  // 10th Year
          { wch: 15 },  // 10th Marksheet No
          { wch: 15 },  // 10th Roll No
          { wch: 12 },  // 10th Total Marks
          { wch: 15 },  // 10th Marks Obtained
          { wch: 12 },  // 10th Percentage

          // 12th Details
          { wch: 20 },  // 12th Board
          { wch: 10 },  // 12th Year
          { wch: 15 },  // 12th Marksheet No
          { wch: 15 },  // 12th Roll No
          { wch: 12 },  // 12th Total Marks
          { wch: 15 },  // 12th Marks Obtained
          { wch: 12 },  // 12th Percentage

          // Graduation Details
          { wch: 40 },  // Graduation Board/University
          { wch: 12 },  // Graduation Year
          { wch: 18 },  // Graduation Marksheet No
          { wch: 18 },  // Graduation Roll No
          { wch: 15 },  // Graduation Total Marks
          { wch: 18 },  // Graduation Marks Obtained
          { wch: 15 },  // Graduation Percentage

          // Documents
          { wch: 18 },  // Documents Uploaded
          { wch: 10 },  // Photo
          { wch: 12 },  // Signature
          { wch: 15 },  // 10th Marksheet
          { wch: 15 },  // 12th Marksheet
          { wch: 20 },  // Graduation Marksheet
          { wch: 15 },  // Aadhaar Card
          { wch: 15 },  // TC/Migration

          // Status and Dates
          { wch: 18 },  // Declaration Accepted
          { wch: 12 },  // Status
          // { wch: 20 },  // Registration Date
          { wch: 20 },  // Submission Date
          // { wch: 20 }   // Updated At
        ];
        worksheet['!cols'] = columnWidths;

        // Create workbook
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Students Data');

        // Generate file name with current date
        const fileName = `Students_Data_${new Date().toISOString().split('T')[0]}.xlsx`;

        // Download file
        XLSX.writeFile(workbook, fileName);

        toast.success(`Excel file downloaded successfully! Total records: ${allStudents.length}`);
      }
    } catch (error) {
      console.error('Error exporting to Excel:', error);
      if (error.response?.status === 401) {
        localStorage.removeItem('adminToken');
        navigate('/admin/login');
        toast.error('Session expired. Please login again.');
      } else {
        toast.error('Failed to export data to Excel');
      }
    }
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
              Showing <span className="font-semibold text-slate-700">{students.length}</span> students
            </p>
            <div className="flex items-center gap-3">
              <p>Page {pagination.currentPage} of {pagination.totalPages}</p>
              <button
                onClick={exportToExcel}
                className="inline-flex items-center gap-2 rounded-xl border border-green-500/40 bg-green-500/10 px-4 py-2 text-xs font-semibold text-green-700 hover:bg-green-500/20 transition-all duration-200"
                title="Export all students data to Excel"
              >
                <FaFileExcel className="text-sm" />
                Export to Excel
              </button>
            </div>
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
