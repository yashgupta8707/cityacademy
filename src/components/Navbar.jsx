import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaBars, FaTimes, FaPhone, FaEnvelope, FaChevronDown } from 'react-icons/fa';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [aboutDropdown, setAboutDropdown] = useState(false);
  const [deledDropdown, setDeledDropdown] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setAboutDropdown(false);
    setDeledDropdown(false);
  }, [location]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Courses', path: '/courses' },
    { name: 'Facilities', path: '/facilities' },
    { name: 'D.El.Ed', path: '/deled' },
    { name: 'Contact', path: '/contact' },
  ];

  const aboutLinks = [
    { name: 'About Us', path: '/about' },
    { name: 'Founder Message', path: '/founder-message' },
    { name: 'Director Message', path: '/director-message' },
  ];

  return (
    <>
      {/* Top Bar */}
      <div className="bg-primary-900 text-black bg-[#867299] py-2 px-4 md:px-8 hidden lg:block">
        <div className="container mx-auto flex justify-between items-center text-sm">
          <div className="flex items-center space-x-6">
            <a href="tel:918400133333" className="flex items-center hover:text-secondary-400 transition-colors">
              <FaPhone className="mr-2" />
              +91 8400133333
            </a>
            <span className="text-gray-400">|</span>
            <a href="tel:918177001081" className="flex items-center hover:text-secondary-400 transition-colors">
              <FaPhone className="mr-2" />
              +91 8177001081
            </a>
          </div>
          <div className="flex items-center">
            <FaEnvelope className="mr-2" />
            <span>citycollege21@gmail.com</span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-neutral-400 shadow-lg' : 'bg-white'
        }`}
      >
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3">
              <img
                src="/logo.jpeg"
                alt="City College Logo"
                className="h-15 w-15 object-contain"
              />
              <div className="hidden md:block">
                <h1 className="text-xl lg:text-2xl font-bold text-primary-900 leading-tight">
                  City College
                </h1>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {navLinks.map((link) => {
                // D.El.Ed dropdown (desktop)
                if (link.name === 'D.El.Ed') {
                  return (
                    <div
                      key={link.name}
                      className="relative"
                      onMouseEnter={() => setDeledDropdown(true)}
                      onMouseLeave={() => setDeledDropdown(false)}
                    >
                      <button
                        className={`font-semibold transition-colors hover:text-secondary-500 flex items-center ${
                          location.pathname === link.path ? 'text-secondary-500' : 'text-gray-700'
                        }`}
                      >
                        D.El.Ed <FaChevronDown className="ml-1 text-sm" />
                      </button>
                      {deledDropdown && (
                        <div className="absolute top-full left-0 mt-2 w-56 bg-white shadow-xl rounded-lg py-2 animate-fade-in-down">
                          <a
                            href="/pdfs/Registration%20Open.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block px-4 py-2 hover:bg-secondary-50 hover:text-secondary-500 transition-colors"
                          >
                            Registration Open
                          </a>
                          <a
                            href="/pdfs/Eligibility.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block px-4 py-2 hover:bg-secondary-50 hover:text-secondary-500 transition-colors"
                          >
                            Eligibility
                          </a>
                        </div>
                      )}
                    </div>
                  );
                }

                // Normal links (desktop)
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`font-semibold transition-colors hover:text-secondary-500 ${
                      location.pathname === link.path ? 'text-secondary-500' : 'text-gray-700'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}

              {/* About Us Dropdown (desktop) */}
              <div
                className="relative"
                onMouseEnter={() => setAboutDropdown(true)}
                onMouseLeave={() => setAboutDropdown(false)}
              >
                <button
                  className={`font-semibold transition-colors hover:text-secondary-500 flex items-center ${
                    aboutLinks.some(link => location.pathname === link.path)
                      ? 'text-secondary-500'
                      : 'text-gray-700'
                  }`}
                >
                  About Us <FaChevronDown className="ml-1 text-sm" />
                </button>
                {aboutDropdown && (
                  <div className="absolute top-full left-0 mt-2 w-56 bg-white shadow-xl rounded-lg py-2 animate-fade-in-down">
                    {aboutLinks.map((link) => (
                      <Link
                        key={link.path}
                        to={link.path}
                        className="block px-4 py-2 hover:bg-secondary-50 hover:text-secondary-500 transition-colors"
                      >
                        {link.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <Link
                to="/registration"
                className="btn-primary"
              >
                Online Registration
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden text-primary-900 text-2xl focus:outline-none"
            >
              {isOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isOpen && (
            <div className="lg:hidden pb-4 animate-fade-in-down">
              <div className="flex flex-col space-y-3">
                {navLinks.map((link) => {
                  // D.El.Ed dropdown (mobile)
                  if (link.name === 'D.El.Ed') {
                    return (
                      <div key={link.name}>
                        <button
                          onClick={() => setDeledDropdown(!deledDropdown)}
                          className="font-semibold py-2 transition-colors hover:text-secondary-500 flex items-center justify-between w-full"
                        >
                          D.El.Ed
                          <FaChevronDown
                            className={`transition-transform ${
                              deledDropdown ? 'rotate-180' : ''
                            }`}
                          />
                        </button>
                        {deledDropdown && (
                          <div className="pl-4 mt-2 space-y-2">
                            <a
                              href="/pdfs/Registration%20Open.pdf"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="block py-2 text-gray-600 hover:text-secondary-500 transition-colors"
                            >
                              Registration Open
                            </a>
                            <a
                              href="/pdfs/Eligibility.pdf"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="block py-2 text-gray-600 hover:text-secondary-500 transition-colors"
                            >
                              Eligibility
                            </a>
                          </div>
                        )}
                      </div>
                    );
                  }

                  // Normal links (mobile)
                  return (
                    <Link
                      key={link.path}
                      to={link.path}
                      className={`font-semibold py-2 transition-colors hover:text-secondary-500 ${
                        location.pathname === link.path ? 'text-secondary-500' : 'text-gray-700'
                      }`}
                    >
                      {link.name}
                    </Link>
                  );
                })}

                {/* Mobile About Dropdown */}
                <div>
                  <button
                    onClick={() => setAboutDropdown(!aboutDropdown)}
                    className="font-semibold py-2 transition-colors hover:text-secondary-500 flex items-center justify-between w-full"
                  >
                    About Us{' '}
                    <FaChevronDown
                      className={`transition-transform ${
                        aboutDropdown ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {aboutDropdown && (
                    <div className="pl-4 mt-2 space-y-2">
                      {aboutLinks.map((link) => (
                        <Link
                          key={link.path}
                          to={link.path}
                          className="block py-2 text-gray-600 hover:text-secondary-500 transition-colors"
                        >
                          {link.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                <Link
                  to="/registration"
                  className="btn-primary text-center"
                >
                  Online Registration
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
