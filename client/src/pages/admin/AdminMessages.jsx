import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FaSearch,
  FaEye,
  FaCheckCircle,
  FaClock,
  FaTrash,
  FaArrowLeft,
  FaSignOutAlt,
  FaChartLine
} from 'react-icons/fa';
import { toast } from 'react-toastify';
import axios from 'axios';

const AdminMessages = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: searchParams.get('search') || '',
    status: searchParams.get('status') || 'all',
    page: parseInt(searchParams.get('page')) || 1
  });
  const [pagination, setPagination] = useState({
    totalPages: 1,
    currentPage: 1,
    totalMessages: 0
  });
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchMessages();
  }, [filters]);

  const fetchMessages = async () => {
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
      params.append('page', filters.page);
      params.append('limit', 10);

      const response = await axios.get(
        // `http://localhost:5000/api/admin/messages?${params.toString()}`,
        `https://clc-backend-0isa.onrender.com/api/admin/messages?${params.toString()}`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      if (response.data.success) {
        setMessages(response.data.messages);
        setPagination({
          totalPages: response.data.totalPages,
          currentPage: response.data.currentPage,
          totalMessages: response.data.totalMessages
        });
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
      if (error.response?.status === 401) {
        localStorage.removeItem('adminToken');
        navigate('/admin/login');
        toast.error('Session expired. Please login again.');
      } else {
        toast.error('Failed to fetch messages');
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
    params.set('page', newFilters.page);
    setSearchParams(params);
  };

  const handlePageChange = (newPage) => {
    setFilters({ ...filters, page: newPage });
    const params = new URLSearchParams(searchParams);
    params.set('page', newPage);
    setSearchParams(params);
  };

  const handleStatusChange = async (messageId, newStatus) => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await axios.patch(
        `${import.meta.env.VITE_API_URL}/api/admin/messages/${messageId}/status`,
        { status: newStatus },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      if (response.data.success) {
        toast.success('Status updated successfully');
        fetchMessages();
        if (selectedMessage && selectedMessage._id === messageId) {
          setSelectedMessage({ ...selectedMessage, status: newStatus });
        }
      }
    } catch (error) {
      console.error('Error updating status:', error);
      toast.error('Failed to update status');
    }
  };

  const handleDelete = async (messageId) => {
    if (!window.confirm('Are you sure you want to delete this message?')) {
      return;
    }

    try {
      const token = localStorage.getItem('adminToken');
      const response = await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/admin/messages/${messageId}`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      if (response.data.success) {
        toast.success('Message deleted successfully');
        fetchMessages();
        if (showModal && selectedMessage?._id === messageId) {
          setShowModal(false);
          setSelectedMessage(null);
        }
      }
    } catch (error) {
      console.error('Error deleting message:', error);
      toast.error('Failed to delete message');
    }
  };

  const handleViewDetails = (message) => {
    setSelectedMessage(message);
    setShowModal(true);
  };

  const getStatusBadge = (status) => {
    const badges = {
      New: 'bg-blue-100 text-blue-800',
      'In Progress': 'bg-orange-100 text-orange-800',
      Resolved: 'bg-green-100 text-green-800'
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
    <div className="min-h-screen bg-gray-100">
      {/* Top Navigation */}
      <nav className="bg-white shadow-lg">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <Link
                to="/admin/dashboard"
                className="text-gray-600 hover:text-primary-900"
              >
                <FaArrowLeft size={20} />
              </Link>
              <h1 className="text-xl md:text-2xl font-bold text-primary-900">
                Contact Messages
              </h1>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center text-red-600 hover:text-red-700 font-medium"
            >
              <FaSignOutAlt className="mr-2" />
              <span className="hidden md:inline">Logout</span>
            </button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 md:px-8 py-8">
        {/* Filters */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Search
              </label>
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by name, email, phone, or subject..."
                  value={filters.search}
                  onChange={(e) => handleFilterChange('search', e.target.value)}
                  className="input-field pl-10"
                />
              </div>
            </div>

            {/* Status Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                value={filters.status}
                onChange={(e) => handleFilterChange('status', e.target.value)}
                className="input-field"
              >
                <option value="all">All Status</option>
                <option value="New">New</option>
                <option value="In Progress">In Progress</option>
                <option value="Resolved">Resolved</option>
              </select>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <p className="text-sm text-gray-600">
              Showing {messages.length} of {pagination.totalMessages} messages
            </p>
          </div>
        </div>

        {/* Messages Table */}
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-900"></div>
          </div>
        ) : messages.length === 0 ? (
          <div className="bg-white rounded-lg shadow-lg p-12 text-center">
            <p className="text-gray-600 text-lg">No messages found</p>
          </div>
        ) : (
          <>
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Email
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Phone
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Subject
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {messages.map((message) => (
                      <tr key={message._id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {message.fullName}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {message.email}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {message.phone}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          <div className="max-w-xs truncate">{message.subject}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(message.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadge(
                              message.status
                            )}`}
                          >
                            {message.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleViewDetails(message)}
                              className="text-blue-600 hover:text-blue-900"
                              title="View Details"
                            >
                              <FaEye size={18} />
                            </button>
                            {message.status !== 'In Progress' && (
                              <button
                                onClick={() =>
                                  handleStatusChange(message._id, 'In Progress')
                                }
                                className="text-orange-600 hover:text-orange-900"
                                title="Mark In Progress"
                              >
                                <FaChartLine size={18} />
                              </button>
                            )}
                            {message.status !== 'Resolved' && (
                              <button
                                onClick={() =>
                                  handleStatusChange(message._id, 'Resolved')
                                }
                                className="text-green-600 hover:text-green-900"
                                title="Mark Resolved"
                              >
                                <FaCheckCircle size={18} />
                              </button>
                            )}
                            {message.status !== 'New' && (
                              <button
                                onClick={() =>
                                  handleStatusChange(message._id, 'New')
                                }
                                className="text-blue-600 hover:text-blue-900"
                                title="Mark as New"
                              >
                                <FaClock size={18} />
                              </button>
                            )}
                            <button
                              onClick={() => handleDelete(message._id)}
                              className="text-red-600 hover:text-red-900"
                              title="Delete"
                            >
                              <FaTrash size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Pagination */}
            {pagination.totalPages > 1 && (
              <div className="mt-6 flex justify-center">
                <nav className="flex space-x-2">
                  <button
                    onClick={() => handlePageChange(filters.page - 1)}
                    disabled={filters.page === 1}
                    className="px-4 py-2 bg-white border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                  >
                    Previous
                  </button>
                  {[...Array(pagination.totalPages)].map((_, index) => (
                    <button
                      key={index + 1}
                      onClick={() => handlePageChange(index + 1)}
                      className={`px-4 py-2 border rounded-md ${
                        filters.page === index + 1
                          ? 'bg-primary-900 text-white border-primary-900'
                          : 'bg-white border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      {index + 1}
                    </button>
                  ))}
                  <button
                    onClick={() => handlePageChange(filters.page + 1)}
                    disabled={filters.page === pagination.totalPages}
                    className="px-4 py-2 bg-white border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                  >
                    Next
                  </button>
                </nav>
              </div>
            )}
          </>
        )}
      </div>

      {/* Message Detail Modal */}
      {showModal && selectedMessage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Message Details</h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600">Name</p>
                  <p className="font-semibold text-gray-900">{selectedMessage.fullName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Email</p>
                  <p className="font-semibold text-gray-900">{selectedMessage.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Phone</p>
                  <p className="font-semibold text-gray-900">{selectedMessage.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Subject</p>
                  <p className="font-semibold text-gray-900">{selectedMessage.subject}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Message</p>
                  <p className="text-gray-900 whitespace-pre-wrap">{selectedMessage.message}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Status</p>
                  <span
                    className={`inline-block px-3 py-1 text-sm font-semibold rounded-full ${getStatusBadge(
                      selectedMessage.status
                    )}`}
                  >
                    {selectedMessage.status}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Received</p>
                  <p className="text-gray-900">
                    {new Date(selectedMessage.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                {selectedMessage.status !== 'In Progress' && (
                  <button
                    onClick={() => handleStatusChange(selectedMessage._id, 'In Progress')}
                    className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 flex items-center"
                  >
                    <FaChartLine className="mr-2" />
                    Mark In Progress
                  </button>
                )}
                {selectedMessage.status !== 'Resolved' && (
                  <button
                    onClick={() => handleStatusChange(selectedMessage._id, 'Resolved')}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center"
                  >
                    <FaCheckCircle className="mr-2" />
                    Mark Resolved
                  </button>
                )}
                <button
                  onClick={() => handleDelete(selectedMessage._id)}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 flex items-center"
                >
                  <FaTrash className="mr-2" />
                  Delete
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default AdminMessages;