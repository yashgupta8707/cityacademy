import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaArrowLeft,
  FaPrint,
  FaSignOutAlt,
  FaCheckCircle,
  FaTimesCircle,
  FaClock,
} from "react-icons/fa";
import { toast } from "react-toastify";
import axios from "axios";
import Barcode from "react-barcode";

const API_BASE = "https://clc-backend-0isa.onrender.com";

// Helper to handle both old `/uploads/...` paths and new Cloudinary URLs
const getImageUrl = (pathOrUrl) => {
  if (!pathOrUrl) return null;
  if (pathOrUrl.startsWith("http://") || pathOrUrl.startsWith("https://")) {
    return pathOrUrl; // Cloudinary (or any absolute) URL
  }
  return `${API_BASE}${pathOrUrl}`; // old local uploads
};

const AdminStudentDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStudentDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const fetchStudentDetails = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      if (!token) {
        navigate("/admin/login");
        return;
      }

      const response = await axios.get(
        `${API_BASE}/api/admin/students/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.success) {
        setStudent(response.data.student);
      }
    } catch (error) {
      console.error("Error fetching student details:", error);
      if (error.response?.status === 401) {
        localStorage.removeItem("adminToken");
        navigate("/admin/login");
        toast.error("Session expired. Please login again.");
      } else {
        toast.error("Failed to fetch student details");
        navigate("/admin/students");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (newStatus) => {
    try {
      const token = localStorage.getItem("adminToken");
      const response = await axios.patch(
        `${API_BASE}/api/admin/students/${id}/status`,
        { status: newStatus },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.success) {
        toast.success("Status updated successfully");
        setStudent({ ...student, status: newStatus });
      }
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Failed to update status");
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminData");
    toast.success("Logged out successfully");
    navigate("/admin/login");
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600 mb-4"></div>
          <p className="text-xl font-semibold text-gray-700">
            Loading Student Details...
          </p>
        </div>
      </div>
    );
  }

  if (!student) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl font-semibold text-red-600 mb-4">
            Student not found!
          </p>
          <button
            onClick={() => navigate("/admin/students")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold"
          >
            Back to Students
          </button>
        </div>
      </div>
    );
  }

  const regNo = student.registrationNo || id;
  const photoUrl = getImageUrl(student.documents?.photo);
  const signatureUrl = getImageUrl(student.documents?.signature);

  return (
    <>
      <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #print-area, #print-area * {
            visibility: visible;
          }
          #print-area {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
          }
          .no-print {
            display: none !important;
          }
          @page {
            size: A4;
            margin: 10mm;
          }
        }
        
        .reg-table {
          width: 100%;
          border-collapse: collapse;
          border: 2px solid #000;
          font-size: 11px;
        }
        
        .reg-table td, .reg-table th {
          border: 1px solid #000;
          padding: 4px 8px;
          text-align: left;
        }
        
        .reg-table th {
          background-color: #f3f4f6;
          font-weight: 600;
          text-align: center;
        }
      `}</style>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        {/* Top Navigation - Hidden in print */}
        <nav className="bg-white shadow-sm border-b border-slate-200 no-print">
          <div className="mx-auto max-w-6xl px-4 lg:px-6">
            <div className="flex justify-between items-center py-3">
              <div className="flex items-center gap-3">
                <Link
                  to="/admin/students"
                  className="text-slate-500 hover:text-slate-800"
                >
                  <FaArrowLeft size={18} />
                </Link>
                <div>
                  <h1 className="text-lg md:text-xl font-semibold text-slate-900">
                    Student Registration Form
                  </h1>
                  <p className="text-xs text-slate-500">
                    Print-ready format matching official layout
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

        <div className="py-8 px-4">
          {/* Action Buttons - Hidden in print */}
          <div className="mb-4 flex flex-wrap gap-3 justify-center no-print">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-2 rounded-lg bg-blue-600 hover:bg-blue-700 px-6 py-3 text-sm font-semibold text-white shadow-lg transition"
            >
              <FaPrint />
              Print / Download PDF
            </button>
            {student.status !== "Pending" && (
              <button
                onClick={() => handleStatusChange("Pending")}
                className="inline-flex items-center gap-2 rounded-lg bg-yellow-500 px-4 py-2 text-sm font-semibold text-white hover:bg-yellow-600 transition"
              >
                <FaClock />
                Mark as Pending
              </button>
            )}
          </div>

          {/* Print Area */}
          <div
            id="print-area"
            className="registration-sheet max-w-[210mm] mx-auto bg-white shadow-2xl rounded-lg overflow-hidden"
          >
            {/* Header Section */}
            <div className="border-2 border-black p-3 mb-2">
              <div className="flex items-center justify-between">
                {/* College Logo */}
                <div className="w-20 flex-shrink-0">
                  <img
                    src="/logo.png"
                    alt="College Logo"
                    className="w-full h-auto"
                  />
                </div>

                {/* College Details */}
                <div className="flex-1 text-center px-4">
                  <h1
                    className="text-[#B8860B] text-2xl font-bold"
                    style={{ fontFamily: "Times New Roman, serif" }}
                  >
                    CITY ACADEMY
                  </h1>
                  <p className="text-[#B8860B] text-sm font-bold mt-1">
                    COLLEGE CODE - 290024
                  </p>
                  <p className="text-[#B8860B] text-xs font-bold mt-1">
                    Tiwariganj, Chinhat, Ayodhya Road, Lucknow
                  </p>
                </div>

                {/* Empty space for symmetry */}
                <div className="w-20 flex-shrink-0"></div>
              </div>
            </div>

            {/* Registration Number and Barcode */}
            <table className="reg-table mb-2">
              <tbody>
                <tr>
                  <td
                    className="font-bold bg-gray-100"
                    style={{ width: "25%" }}
                  >
                    Registration No
                  </td>
                  <td style={{ width: "35%" }}>{regNo}</td>
                  <td
                    className="font-bold bg-gray-100"
                    style={{ width: "15%" }}
                  >
                    Barcode:
                  </td>
                  <td style={{ width: "25%" }}>
                    {regNo && (
                      <div className="flex justify-center">
                        <Barcode
                          value={regNo}
                          height={40}
                          width={1.5}
                          fontSize={10}
                          margin={0}
                        />
                      </div>
                    )}
                  </td>
                </tr>
              </tbody>
            </table>

            {/* Personal Details Section */}
            <div className="bg-[#333] text-white font-bold text-center py-1 text-xs">
              PERSONAL DETAILS
            </div>
            <table className="reg-table mb-2">
              <tbody>
                <tr>
                  <td
                    className="font-semibold bg-gray-100"
                    style={{ width: "25%" }}
                  >
                    Student Name
                  </td>
                  <td style={{ width: "25%" }}>{student.studentName || ""}</td>
                  <td
                    className="font-semibold bg-gray-100"
                    style={{ width: "25%" }}
                  >
                    Date of Birth
                  </td>
                  <td style={{ width: "25%" }}>
                    {formatDate(student.dateOfBirth)}
                  </td>
                </tr>
                <tr>
                  <td className="font-semibold bg-gray-100">Mother Name</td>
                  <td>{student.motherName || ""}</td>
                  <td className="font-semibold bg-gray-100">Gender</td>
                  <td>{student.gender || ""}</td>
                </tr>
                <tr>
                  <td className="font-semibold bg-gray-100">Father Name</td>
                  <td>{student.fatherName || ""}</td>
                  <td className="font-semibold bg-gray-100">Category</td>
                  <td>{student.category || ""}</td>
                </tr>
                <tr>
                  <td className="font-semibold bg-gray-100">Phone No</td>
                  <td>{student.phone || ""}</td>
                  <td className="font-semibold bg-gray-100">Adhar Number</td>
                  <td>{student.adhaarNo || "N/A"}</td>
                </tr>
                <tr>
                  <td className="font-semibold bg-gray-100">Sub Category</td>
                  <td>{student.subCategory || "Not Applicable"}</td>
                  <td className="font-semibold bg-gray-100">
                    Father Contact no.
                  </td>
                  <td>{student.fatherContact || "N/A"}</td>
                </tr>
              </tbody>
            </table>

            {/* Education Details Section */}
            <div className="bg-[#333] text-white font-bold text-center py-1 text-xs">
              EDUCATION DETAILS
            </div>
            <table className="reg-table mb-2">
              <thead>
                <tr>
                  <th style={{ width: "14%" }}>Qualification</th>
                  <th style={{ width: "16%" }}>Board/University Name</th>
                  <th style={{ width: "8%" }}>Year</th>
                  <th style={{ width: "12%" }}>Marksheet No</th>
                  <th style={{ width: "10%" }}>Rollno</th>
                  <th style={{ width: "10%" }}>Total Marks</th>
                  <th style={{ width: "12%" }}>Marks Obtained</th>
                  <th style={{ width: "8%" }}>%</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="font-semibold bg-gray-100">
                    10 Th or Equivalent
                  </td>
                  <td>{student.tenthBoard || ""}</td>
                  <td>{student.tenthYear || ""}</td>
                  <td>{student.tenthMarksheetNo || ""}</td>
                  <td>{student.tenthRollNo || ""}</td>
                  <td>{student.tenthTotalMarks || ""}</td>
                  <td>{student.tenthMarksObtained || ""}</td>
                  <td>{student.tenthPercentage || ""}</td>
                </tr>
                <tr>
                  <td className="font-semibold bg-gray-100">
                    12 Th or Equivalent
                  </td>
                  <td>{student.twelfthBoard || ""}</td>
                  <td>{student.twelfthYear || ""}</td>
                  <td>{student.twelfthMarksheetNo || ""}</td>
                  <td>{student.twelfthRollNo || ""}</td>
                  <td>{student.twelfthTotalMarks || ""}</td>
                  <td>{student.twelfthMarksObtained || ""}</td>
                  <td>{student.twelfthPercentage || ""}</td>
                </tr>
                <tr>
                  <td className="font-semibold bg-gray-100">Graduation</td>
                  <td>{student.graduationBoard || ""}</td>
                  <td>{student.graduationYear || ""}</td>
                  <td>{student.graduationMarksheetNo || ""}</td>
                  <td>{student.graduationRollNo || ""}</td>
                  <td>{student.graduationTotalMarks || ""}</td>
                  <td>{student.graduationMarksObtained || ""}</td>
                  <td>{student.graduationPercentage || ""}</td>
                </tr>
                <tr>
                  <td className="font-semibold bg-gray-100">other</td>
                  <td>{student.otherBoard || ""}</td>
                  <td>{student.otherYear || ""}</td>
                  <td>{student.otherMarksheetNo || ""}</td>
                  <td>{student.otherRollNo || ""}</td>
                  <td>{student.otherTotalMarks || ""}</td>
                  <td>{student.otherMarksObtained || ""}</td>
                  <td>{student.otherPercentage || ""}</td>
                </tr>
              </tbody>
            </table>

            {/* Communication Details Section */}
            <div className="bg-[#333] text-white font-bold text-center py-1 text-xs">
              COMMUNICATION/CORRESPONDANCE DETAILS
            </div>
            <table className="reg-table mb-2">
              <tbody>
                <tr>
                  <td
                    className="font-semibold bg-gray-100"
                    style={{ width: "25%" }}
                  >
                    Address
                  </td>
                  <td colSpan="3">{student.address || ""}</td>
                </tr>
                <tr>
                  <td className="font-semibold bg-gray-100">District</td>
                  <td style={{ width: "25%" }}>{student.district || ""}</td>
                  <td
                    className="font-semibold bg-gray-100"
                    style={{ width: "25%" }}
                  >
                    State
                  </td>
                  <td style={{ width: "25%" }}>{student.state || ""}</td>
                </tr>
                <tr>
                  <td className="font-semibold bg-gray-100">Pin Code</td>
                  <td>{student.pincode || ""}</td>
                  <td className="font-semibold bg-gray-100">Email id</td>
                  <td>{student.email || ""}</td>
                </tr>
                <tr>
                  <td className="font-semibold bg-gray-100">
                    Pan/Voter id Number
                  </td>
                  <td colSpan="3">
                    {student.panVoterId || student.panVoterIdNumber || "N/A"}
                  </td>
                </tr>
              </tbody>
            </table>

            {/* Document Uploaded Section */}
            <div className="bg-[#333] text-white font-bold text-center py-1 text-xs">
              DOCUMENT UPLOADED
            </div>
            <table className="reg-table mb-2">
              <tbody>
                <tr>
                  <td
                    className="text-center align-top p-4"
                    style={{ width: "50%" }}
                  >
                    <strong className="block mb-2">Photograph</strong>
                    {photoUrl ? (
                      <img
                        src={photoUrl}
                        alt="Photograph"
                        className="w-32 h-32 mx-auto object-cover border border-gray-300"
                        crossOrigin="anonymous"
                      />
                    ) : (
                      <div className="w-32 h-32 mx-auto border border-gray-300 flex items-center justify-center text-gray-400 text-sm">
                        No Photo
                      </div>
                    )}
                  </td>
                  <td
                    className="text-center align-top p-4"
                    style={{ width: "50%" }}
                  >
                    <strong className="block mb-2">Signature</strong>
                    {signatureUrl ? (
                      <img
                        src={signatureUrl}
                        alt="Signature"
                        className="w-32 h-32 mx-auto object-contain border border-gray-300"
                        crossOrigin="anonymous"
                      />
                    ) : (
                      <div className="w-32 h-32 mx-auto border border-gray-300 flex items-center justify-center text-gray-400 text-sm">
                        No Signature
                      </div>
                    )}
                  </td>
                </tr>
              </tbody>
            </table>

            {/* Declaration Section */}
            <div className="bg-[#333] text-white font-bold text-center py-1 text-xs">
              DECLARATION
            </div>
            <table className="reg-table mb-2">
              <tbody>
                <tr>
                  <td className="text-xs leading-relaxed p-2">
                    मैं प्रमाणित करता हूँ कि ऑनलाइन आवेदन में भरी गयी समस्त
                    प्रविष्टियों मेरे पास उपलब्ध अभिलेखों पर आधारित है एवं मेरे
                    व्यक्तिगत जानकारी में सही एवं सत्य है। आवेदन करने की तिथि को
                    मेरे पास ऑनलाइन आवेदन में उल्लेखित समस्त अंकप्रमाणपत्र
                    आरक्षण एवं विशेष आरक्षण सम्बन्धी प्रमाण पत्र उपलब्ध है।
                    ऑनलाइन आवेदन पत्र में अपलोड की गयी मेरी फोटो स्वच्छ स्पष्ट
                    एवं दिये गये निर्देशानुसार हैं। मुझे विज्ञापन की दी गयी समस्त
                    शर्त मान्य हैं। यदि परीक्षा के पूर्व अथवा बाद में किसी भी
                    स्तर पर जांचोपरान्त ऑनलाइन आवेदन पत्र में कोई भी विवरण
                    त्रुटिपूर्ण असत्य पाया जाता है तो उसका समस्त उत्तरदायित्व
                    मेरा होगा और सम्बन्धित अधिकारी को मेरा अभ्यर्थन निरस्त करने
                    तथा मेरे विरुद्ध वैधानिक कार्यवाही करने का अधिकार होगा।
                  </td>
                </tr>
              </tbody>
            </table>

            {/* Footer with Dates */}
            <table className="reg-table">
              <tbody>
                <tr>
                  <td className="text-xs p-2">
                    <strong>Submission Date: </strong>
                    {student.createdAt
                      ? new Date(student.createdAt).toLocaleString("en-IN")
                      : "N/A"}
                  </td>
                  <td className="text-xs p-2 text-right">
                    <strong>Print Date: </strong>
                    {new Date().toLocaleDateString("en-IN")}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Status Display - Only visible on screen */}
          <div className="no-print text-center mt-6 bg-blue-50 border-2 border-blue-200 rounded-lg p-6 max-w-2xl mx-auto">
            <div className="text-blue-600 text-xl font-bold mb-2">
              Current Status: {student.status}
            </div>
            <p className="text-gray-700">
              Registration Number: <strong>{regNo}</strong>
            </p>
            <p className="text-sm text-gray-600 mt-2">
              Use the action buttons above to change the application status or
              print the form.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminStudentDetail;
