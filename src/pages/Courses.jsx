import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaClock, FaUser, FaBookOpen, FaGraduationCap } from 'react-icons/fa';

const Courses = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const courses = [
    {
      code: 'BBA',
      name: 'Bachelor of Business Administration',
      duration: '3 Years',
      eligibility: '10+2 in any Stream',
      description: 'Comprehensive program covering business management, finance, marketing, and entrepreneurship.',
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800',
      category: 'Undergraduate'
    },
    {
      code: 'BCA',
      name: 'Bachelor of Computer Applications',
      duration: '3 Years',
      eligibility: '10+2 in any Stream',
      description: 'Focus on computer programming, software development, and IT fundamentals.',
      image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800',
      category: 'Undergraduate'
    },
    {
      code: 'BCom',
      name: 'Bachelor of Commerce',
      duration: '3 Years',
      eligibility: '10+2 in any Stream',
      description: 'Covers accounting, taxation, business law, and commerce fundamentals.',
      image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800',
      category: 'Undergraduate'
    },
    {
      code: 'BSc(AG)',
      name: 'Bachelor of Science (Agriculture)',
      duration: '4 Years',
      eligibility: '10+2 Passed 50% with Bio & Agriculture',
      description: 'Agricultural science, crop management, and modern farming techniques.',
      image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800',
      category: 'Undergraduate'
    },
    {
      code: 'BEd',
      name: 'Bachelor of Education',
      duration: '2 Years',
      eligibility: 'Graduation in any Stream',
      description: 'Teacher training program focused on pedagogy and educational psychology.',
      image: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=800',
      category: 'Postgraduate'
    },
    {
      code: 'MEd',
      name: 'Master of Education',
      duration: '2 Years',
      eligibility: 'Graduation in any Stream',
      description: 'Advanced education program for experienced teachers and educators.',
      image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800',
      category: 'Postgraduate'
    },
    {
      code: 'DElEd',
      name: 'Diploma in Elementary Education',
      duration: '2 Years',
      eligibility: 'Graduation in any Stream',
      description: 'Primary teacher training program (formerly known as B.T.C.).',
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800',
      category: 'Undergraduate'
    }
  ];

  return (
    <div>
      {/* <section className="relative h-[400px] flex items-center gradient-bg">
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <motion.div className="container mx-auto px-4 md:px-8 relative z-10 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-white mb-4"
          >
            ALL COURSES OF CITY ACADEMY
          </motion.h1>
        </motion.div>
      </section> */}

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <h2 className="text-3xl font-bold text-center text-primary-900 mb-4">COURSES</h2>
          
          <div className="mb-12">
            <div className="bg-primary-800 text-white py-4 px-6 rounded-t-lg">
              <h3 className="text-2xl font-bold">COLLEGE OF MANAGEMENT STUDIES</h3>
            </div>
            <div className="bg-green-100 py-2 px-6">
              <h4 className="font-bold text-lg">UNDER GRADUATE COURSES</h4>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
              {courses.filter(c => c.category === 'Undergraduate').map((course, index) => (
                <motion.div
                  key={course.code}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="card group"
                >
                  <div className="relative overflow-hidden">
                    {/* <img
                      src={course.image}
                      alt={course.name}
                      className="w-full h-48 object-cover transform group-hover:scale-110 transition-transform duration-500"
                    /> */}
                    <div className="absolute top-4 right-4 bg-secondary-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      {course.duration}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-dark-900 mb-3">{course.name}</h3>
                    <div className="space-y-2 text-gray-600 mb-4">
                      <p><span className="font-semibold">Duration:</span> {course.duration}</p>
                      <p><span className="font-semibold">Eligibility:</span> {course.eligibility}</p>
                    </div>
                    <p className="text-gray-600">{course.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div>
            <div className="bg-primary-800 text-white py-4 px-6 rounded-t-lg">
              <h3 className="text-2xl font-bold">COLLEGE OF EDUCATION STUDIES</h3>
            </div>
            <div className="bg-green-100 py-2 px-6">
              <h4 className="font-bold text-lg">POST GRADUATE COURSES</h4>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
              {courses.filter(c => c.category === 'Postgraduate').map((course, index) => (
                <motion.div
                  key={course.code}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="card group"
                >
                  <div className="relative overflow-hidden">
                    {/* <img
                      src={course.image}
                      alt={course.name}
                      className="w-full h-48 object-cover transform group-hover:scale-110 transition-transform duration-500"
                    /> */}
                    <div className="absolute top-4 right-4 bg-secondary-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      {course.duration}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-dark-900 mb-3">{course.name}</h3>
                    <div className="space-y-2 text-gray-600 mb-4">
                      <p><span className="font-semibold">Duration:</span> {course.duration}</p>
                      <p><span className="font-semibold">Eligibility:</span> {course.eligibility}</p>
                    </div>
                    <p className="text-gray-600">{course.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Courses;