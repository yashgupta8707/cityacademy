import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaPhone, FaEnvelope, FaMapMarkerAlt, FaArrowRight } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Courses', path: '/courses' },
    { name: 'Facilities', path: '/facilities' },
  ];

  const importantLinks = [
    { name: 'D.El.Ed Training', path: '/deled' },
    { name: 'Founder Message', path: '/founder-message' },
    { name: 'Director Message', path: '/director-message' },
    { name: 'Contact Us', path: '/contact' },
  ];

  return (
    <footer className="bg-[#867299] text-white">
      {/* Main Footer */}
      <div className="container mx-auto px-4 md:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-secondary-400">City Academy</h3>
            <p className="text-gray-300 leading-relaxed">
              Building excellence in education since our inception. Committed to providing quality education and shaping future leaders through innovative teaching methods.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-primary-800 rounded-full flex items-center justify-center hover:bg-secondary-500 transition-colors"
              >
                <FaFacebookF />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-primary-800 rounded-full flex items-center justify-center hover:bg-secondary-500 transition-colors"
              >
                <FaTwitter />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-primary-800 rounded-full flex items-center justify-center hover:bg-secondary-500 transition-colors"
              >
                <FaInstagram />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-primary-800 rounded-full flex items-center justify-center hover:bg-secondary-500 transition-colors"
              >
                <FaLinkedinIn />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-bold mb-4 text-secondary-400">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="flex items-center text-gray-300 hover:text-secondary-400 transition-colors group"
                  >
                    <FaArrowRight className="mr-2 text-xs group-hover:translate-x-1 transition-transform" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Important Links */}
          <div>
            <h4 className="text-xl font-bold mb-4 text-secondary-400">Important Links</h4>
            <ul className="space-y-2">
              {importantLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="flex items-center text-gray-300 hover:text-secondary-400 transition-colors group"
                  >
                    <FaArrowRight className="mr-2 text-xs group-hover:translate-x-1 transition-transform" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-xl font-bold mb-4 text-secondary-400">Contact Info</h4>
            <ul className="space-y-4">
              <li className="flex items-start text-gray-300">
                <FaMapMarkerAlt className="mr-3 mt-1 text-secondary-400 flex-shrink-0" />
                <span>Tiwarigang, Faizabad Road, Chinhat, Lucknow, Uttar Pradesh</span>
              </li>
              <li className="flex items-center text-gray-300">
                <FaPhone className="mr-3 text-secondary-400" />
                <a href="tel:918400133333" className="hover:text-secondary-400 transition-colors">
                  +91 8400133333
                </a>
              </li>
              <li className="flex items-center text-gray-300">
                <FaPhone className="mr-3 text-secondary-400" />
                <a href="tel:918177001081" className="hover:text-secondary-400 transition-colors">
                  +91 8177001081
                </a>
              </li>
              <li className="flex items-center text-gray-300">
                <FaEnvelope className="mr-3 text-secondary-400" />
                <a href="mailto:info@citycollegemanagement.com" className="hover:text-secondary-400 transition-colors">
                  cityacademylko@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 md:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm">
            <p>Copyright © {currentYear} City Academy. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;