import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaPaperPlane } from 'react-icons/fa';
import { toast } from 'react-toastify';
import axios from 'axios';

const Contact = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        // `http://localhost:5000/api/contact/submit`,
        `https://clc-backend-0isa.onrender.com/api/contact/submit`,
        formData
      );

      if (response.data.success) {
        toast.success(response.data.message || 'Message sent successfully! We will contact you soon.');
        setFormData({ fullName: '', email: '', phone: '', subject: '', message: '' });
      }
    } catch (error) {
      console.error('Contact form error:', error);
      toast.error(error.response?.data?.message || 'Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* <section className="relative h-[400px] flex items-center gradient-bg">
        <motion.div className="container mx-auto px-4 md:px-8 relative z-10 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-white"
          >
            CONTACT US
          </motion.h1>
        </motion.div>
      </section> */}

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-primary-900 mb-2">Campus Address</h2>
            <div className="h-1 w-20 bg-secondary-500"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="card p-8"
            >
              <h3 className="text-2xl font-bold text-primary-900 mb-6">LUCKNOW CAMPUS</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <FaMapMarkerAlt className="text-secondary-500 text-xl mr-4 mt-1" />
                  <div>
                    <p className="font-semibold">LOCATION</p>
                    <p className="text-gray-600">Tiwarigang, Faizabad Road, Chinhat,</p>
                    <p className="text-gray-600">Lucknow</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <FaPhone className="text-secondary-500 text-xl mr-4 mt-1" />
                  <div>
                    <p className="font-semibold">PHONE</p>
                    <p className="text-gray-600">8177001081, 8400133333</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3558.3188419496964!2d81.0673927759711!3d26.893374360920387!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399959366b504ed3%3A0xcb0b3a41e5172b28!2sCity%20College%20of%20Management!5e0!3m2!1sen!2sin!4v1763463756354!5m2!1sen!2sin"
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                className="rounded-lg shadow-lg"
              ></iframe>
            </motion.div>
          </div>

          <div className="mb-12">
            <h2 className="text-3xl font-bold text-primary-900 mb-2">Drop A Message Here</h2>
            <p className="text-gray-600">If message is not sent kindly call on the following number: <a href="tel:8177001081" className="text-secondary-500 font-semibold">8177001081</a></p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.form
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input
                  type="text"
                  name="fullName"
                  placeholder="FULL NAME"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  disabled={loading}
                  className="input-field"
                />
                <input
                  type="text"
                  name="subject"
                  placeholder="SUBJECT"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  disabled={loading}
                  className="input-field"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input
                  type="tel"
                  name="phone"
                  placeholder="CONTACT NO"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  disabled={loading}
                  className="input-field"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="EMAIL"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  disabled={loading}
                  className="input-field"
                />
              </div>
              <textarea
                name="message"
                placeholder="MESSAGE"
                value={formData.message}
                onChange={handleChange}
                required
                disabled={loading}
                rows="6"
                className="textarea-field"
              ></textarea>
              <button 
                type="submit" 
                disabled={loading}
                className="btn-primary w-full flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Sending...
                  </>
                ) : (
                  <>
                    <FaPaperPlane className="mr-2" /> SEND NOW
                  </>
                )}
              </button>
            </motion.form>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center justify-center"
            >
              <div className="text-center">
                <div className="bg-green-500 w-32 h-32 rounded-full flex items-center justify-center mx-auto mb-6">
                  <FaPhone className="text-white text-5xl" />
                </div>
                <h3 className="text-2xl font-bold text-primary-900 mb-4">LIVE SUPPORT AVAILABLE</h3>
                <p className="text-gray-600">Call us for immediate assistance</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;