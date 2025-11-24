import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import { FaGraduationCap, FaChalkboardTeacher, FaBook, FaAward, FaUserGraduate, FaUsers, FaCalendarAlt, FaStar, FaQuoteLeft, FaArrowRight } from 'react-icons/fa';

const Home = () => {
  const [courses, setCourses] = useState([]);
  const [isVisible, setIsVisible] = useState({});

  useEffect(() => {
    window.scrollTo(0, 0);
    // Fetch courses from API
    fetchCourses();
    
    // Intersection Observer for animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('[id^="section-"]').forEach((section) => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const fetchCourses = async () => {
    try {
      // Mock data for now - replace with actual API call
      const mockCourses = [
        {
          code: 'BBA',
          name: 'Bachelor of Business Administration',
          duration: '3 Years',
          image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800'
        },
        {
          code: 'BCA',
          name: 'Bachelor of Computer Applications',
          duration: '3 Years',
          image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800'
        },
        {
          code: 'BCom',
          name: 'Bachelor of Commerce',
          duration: '3 Years',
          image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800'
        },
        {
          code: 'DElEd',
          name: 'Diploma in Elementary Education',
          duration: '2 Years',
          image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800'
        }
      ];
      setCourses(mockCourses);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  const stats = [
    { icon: FaUserGraduate, label: 'Total Students', value: 4950, suffix: '+' },
    { icon: FaChalkboardTeacher, label: 'Expert Faculty', value: 95, suffix: '+' },
    { icon: FaBook, label: 'Courses', value: 549, suffix: '+' },
    { icon: FaAward, label: 'Years of History', value: 204, suffix: '+' }
  ];

  const features = [
    {
      icon: FaGraduationCap,
      title: 'Scholarship Facility',
      description: 'Financial assistance for deserving students to pursue their dreams'
    },
    {
      icon: FaChalkboardTeacher,
      title: 'Skilled Teachers',
      description: 'Experienced faculty with industry expertise and teaching excellence'
    },
    {
      icon: FaBook,
      title: 'Book & Library',
      description: 'Extensive collection of books and digital resources for learning'
    }
  ];

  const testimonials = [
    {
      name: 'Priyanka Sharma',
      role: 'B.Ed. Graduate',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
      rating: 5,
      text: 'City Academy provided me with excellent education and practical training. The faculty is highly supportive and the infrastructure is world-class.'
    },
    {
      name: 'Rahul Verma',
      role: 'BBA Graduate',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
      rating: 5,
      text: 'The management program here is outstanding. I gained both theoretical knowledge and practical skills that helped me secure a great job.'
    },
    {
      name: 'Anjali Singh',
      role: 'BCA Student',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
      rating: 5,
      text: 'Best decision to join this college. The computer lab facilities are excellent and the faculty always encourages us to think innovatively.'
    }
  ];

  const events = [
    {
      date: '15',
      month: 'JAN',
      title: 'How to start a blog site using wordpress',
      category: 'Latest Trends',
      image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=600'
    },
    {
      date: '20',
      month: 'JAN',
      title: 'How to create a new SaaS page',
      category: 'Latest Trends',
      image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600'
    }
  ];

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative h-[600px] md:h-[700px] flex items-center gradient-bg">
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div
          className="absolute inset-0 bg-cover bg-center mix-blend-overlay"
          style={{
            backgroundImage: 'url(/hero1.png)'
          }}
        ></div>
        
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Better Education for World
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-8">
              Take the first step towards a bright future. Build your career with quality education at City Academy.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/registration" className="btn-primary bg-[#867299] inline-block text-center p-2 rounded-2xl hover:bg-gray-100 text-white font-bold">
                Get Started Now
              </Link>
              <Link to="/about" className="btn-outline bg-yellow-400 p-2 rounded-2xl hover:bg-gray-100 text-primary-900 inline-block text-center">
                Learn More
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Feature Cards */}
        <div className="absolute bottom-0 left-0 right-0 transform translate-y-1/2 z-20 hidden lg:block">
          <div className="container mx-auto px-8">
            <div className="grid grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  className="bg-cyan-700 p-8 rounded-lg shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-2"
                >
                  <feature.icon className="text-5xl text-white mb-4" />
                  <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                  <p className="text-white opacity-90">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Welcome Section */}
      <section id="section-welcome" className="py-20 lg:pt-40 bg-gray-50">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isVisible['section-welcome'] ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              <img
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800"
                alt="Welcome to City College"
                className="rounded-xl shadow-2xl"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isVisible['section-welcome'] ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-dark-900 mb-6">
                Welcome to City Academy
              </h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                With increasing globalization of business, faster growth of the Indian economy and advancement in technology, 
                the legal profession has become one of the most growing and lucrative professions all over the world.
              </p>
              <p className="text-gray-600 mb-6 leading-relaxed">
                The past decade has been a mini revolution in the legal service sector with the greatest legal impact on corporate 
                legal arena. Activities in project finance, intellectual property protection, environmental protection, competition law, 
                corporate taxation, infrastructure contract, corporate governance and investment law were almost unknown before 1990's.
              </p>
              <p className="text-gray-600 mb-6 leading-relaxed">
                The curriculum at City Academy is novel, innovative and designed to keep students equipped and up-to-date 
                with the skills needed in the profession.
              </p>
              <Link to="/about" className="btn-primary inline-flex items-center">
                Read More <FaArrowRight className="ml-2" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Popular Courses */}
      <section id="section-courses" className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible['section-courses'] ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="section-title">POPULAR COURSES</h2>
            <p className="section-subtitle">
              Choose from our wide range of professional courses designed for your success
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {courses.map((course, index) => (
              <motion.div
                key={course.code}
                initial={{ opacity: 0, y: 30 }}
                animate={isVisible['section-courses'] ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="card group"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={course.image}
                    alt={course.name}
                    className="w-full h-48 object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 bg-secondary-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {course.duration}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-dark-900 mb-3 group-hover:text-secondary-500 transition-colors">
                    {course.name}
                  </h3>
                  <p className="text-gray-600 mb-4">Duration: {course.duration}</p>
                  <Link
                    to="/courses"
                    className="text-secondary-500 font-semibold flex items-center hover:text-secondary-600 transition-colors"
                  >
                    Learn More <FaArrowRight className="ml-2" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/courses" className="btn-primary">
              View All Courses
            </Link>
          </div>
        </div>
      </section>
      

      {/* Statistics Section */}
      <section id="section-stats" className="py-20 gradient-bg bg-gray-700">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isVisible['section-stats'] ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center text-white"
              >
                <stat.icon className="text-6xl mx-auto mb-4 text-secondary-400" />
                <div className="text-5xl font-bold mb-2">
                  {isVisible['section-stats'] && (
                    <CountUp end={stat.value} duration={2.5} suffix={stat.suffix} />
                  )}
                </div>
                <p className="text-xl font-semibold opacity-90">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Registration CTA */}
      <section className="py-5 bg-gradient-to-r from-secondary-500 to-secondary-600 bg-gray-400">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            <div className="text-white mb-8 lg:mb-0">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Register Now for Admission 2025</h2>
              <p className="text-xl opacity-90">Limited seats available. Secure your future today!</p>
            </div>
            <Link to="/registration" className="btn-secondary bg-white text-secondary-600 hover:bg-gray-100 px-8 py-4 border-0 rounded-xl font-bold">
              Register Now
            </Link>
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      {/* <section id="section-events" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible['section-events'] ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="section-title">UPCOMING EVENTS</h2>
            <p className="section-subtitle">
              Stay updated with the latest college events and seminars
            </p>
          </motion.div>

          <div className="space-y-6">
            {events.map((event, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                animate={isVisible['section-events'] ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="card flex flex-col md:flex-row overflow-hidden"
              >
                <div className="bg-secondary-500 text-white p-6 flex flex-col items-center justify-center md:w-32">
                  <div className="text-4xl font-bold">{event.date}</div>
                  <div className="text-xl font-semibold">{event.month}</div>
                </div>
                <div className="md:flex-1 flex flex-col md:flex-row">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full md:w-64 h-48 object-cover"
                  />
                  <div className="p-6 flex-1">
                    <span className="text-sm text-secondary-500 font-semibold">{event.category}</span>
                    <h3 className="text-2xl font-bold text-dark-900 my-2">{event.title}</h3>
                    <p className="text-gray-600">Join us for an exciting learning experience and expand your knowledge.</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Testimonials */}
      {/* <section id="section-testimonials" className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible['section-testimonials'] ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="section-title">WHAT PEOPLE SAY</h2>
            <p className="section-subtitle">
              Hear from our successful students and alumni
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isVisible['section-testimonials'] ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="card p-8 relative"
              >
                <FaQuoteLeft className="text-4xl text-secondary-400 opacity-20 absolute top-4 left-4" />
                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="font-bold text-dark-900">{testimonial.name}</h4>
                    <p className="text-gray-600 text-sm">{testimonial.role}</p>
                  </div>
                </div>
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <FaStar key={i} className="text-secondary-500" />
                  ))}
                </div>
                <p className="text-gray-600 italic">"{testimonial.text}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section> */}

    </div>
  );
};

export default Home;