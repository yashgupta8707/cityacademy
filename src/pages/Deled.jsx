import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaCalendar, FaGraduationCap, FaCheckCircle, FaFileAlt, FaUsers, FaClock } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const DElEd = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const schedule = [
    { event: 'Online Registration Start', date: '24 November 2025 (Afternoon)' },
    { event: 'Last Date for Online Registration', date: '15 December 2025' },
    { event: 'Last Date for Fee Payment', date: '16 December 2025' },
    { event: 'Last Date for Print Out', date: '18 December 2025' }
  ];

  const eligibility = [
    {
      title: 'Educational Qualification',
      points: [
        'Graduation in any stream with minimum 50% marks',
        'SC/ST/OBC/Disabled candidates: 45% marks',
        'Valid for 10+2+3 education system'
      ]
    },
    {
      title: 'Age Criteria',
      points: [
        'Minimum Age: 18 years as on 01 July 2025',
        'Maximum Age: 35 years as on 01 July 2025',
        'Age relaxation: SC/ST (5 years), Disabled (15 years), Ex-servicemen (as per rules)'
      ]
    },
    {
      title: 'Residence',
      points: [
        'Preference given to UP domicile candidates',
        'Valid residence certificate required',
        'Other state candidates allowed in vacant seats'
      ]
    }
  ];

  const features = [
    { icon: FaGraduationCap, title: 'NCTE Approved', desc: 'Recognized by National Council for Teacher Education' },
    { icon: FaUsers, title: 'Expert Faculty', desc: 'Experienced educators and trainers' },
    { icon: FaFileAlt, title: 'Updated Curriculum', desc: 'Modern teaching methodologies' },
    { icon: FaClock, title: '2 Years Program', desc: 'Comprehensive training duration' }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[400px] flex items-center gradient-bg">
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              D.El.Ed Training 2025
            </h1>
            <p className="text-xl text-gray-200">Diploma in Elementary Education (Formerly B.T.C.)</p>
          </motion.div>
        </div>
      </section>

      {/* Registration Notice */}
      <section className="bg-secondary-100 border-l-4 border-secondary-500 py-6">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex items-center justify-center">
            <FaCheckCircle className="text-3xl text-green-600 mr-4" />
            <div>
              <h3 className="text-xl font-bold text-gray-800">Registration Open!</h3>
              <p className="text-gray-700">D.El.Ed Training 2025 - Online Application Started</p>
            </div>
          </div>
        </div>
      </section>

      {/* About D.El.Ed */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-primary-900 mb-6 text-center">
              About D.El.Ed Training
            </h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 leading-relaxed mb-4">
                D.El.Ed (Diploma in Elementary Education) is a two-year regular non-residential training program 
                for primary level teacher training. Previously known as B.T.C. (Basic Teacher Certificate), this 
                program has been renamed as per NCTE Regulation 2014, Appendix-2.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                The program is conducted at District Institutes of Education and Training (DIETs) across Uttar Pradesh, 
                as well as at NCTE-approved and state-affiliated private D.El.Ed training institutions.
              </p>
              <p className="text-gray-700 leading-relaxed">
                City Academy offers this NCTE-approved program with a focus on modern teaching 
                methodologies, practical training, and comprehensive curriculum designed to prepare competent 
                elementary school teachers.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-dark-900 mb-4">Program Highlights</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card p-6 text-center"
              >
                <feature.icon className="text-5xl text-secondary-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-dark-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Eligibility Criteria */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-primary-900 mb-4">Eligibility Criteria</h2>
            <p className="text-gray-600 text-lg">Requirements for D.El.Ed Training 2025</p>
          </motion.div>

          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            {eligibility.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card p-6"
              >
                <h3 className="text-xl font-bold text-primary-900 mb-4">{item.title}</h3>
                <ul className="space-y-3">
                  {item.points.map((point, i) => (
                    <li key={i} className="flex items-start text-gray-700">
                      <FaCheckCircle className="text-green-500 mr-2 mt-1 flex-shrink-0" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Schedule */}
      <section className="py-20 bg-gradient-to-br from-primary-50 to-secondary-50">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-primary-900 mb-4">
              Important Dates - D.El.Ed Training 2025
            </h2>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            <div className="card overflow-hidden">
              <div className="bg-primary-800 text-white py-4 px-6">
                <h3 className="text-2xl font-bold flex items-center">
                  <FaCalendar className="mr-3" />
                  Registration Schedule
                </h3>
              </div>
              <div className="divide-y divide-gray-200">
                {schedule.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="p-6 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                      <h4 className="text-lg font-semibold text-gray-800 mb-2 md:mb-0">{item.event}</h4>
                      <span className="text-secondary-500 font-bold text-lg">{item.date}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Selection Process */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-primary-900 mb-8 text-center">
                Selection Process
              </h2>
              <div className="card p-8">
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-secondary-500 rounded-full flex items-center justify-center text-white font-bold mr-4 flex-shrink-0">
                      1
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-gray-800 mb-2">Online Application</h4>
                      <p className="text-gray-600">Submit online application with required details and documents</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-secondary-500 rounded-full flex items-center justify-center text-white font-bold mr-4 flex-shrink-0">
                      2
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-gray-800 mb-2">Merit-Based Selection</h4>
                      <p className="text-gray-600">Selection based on marks obtained in High School, Intermediate, and Graduation</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-secondary-500 rounded-full flex items-center justify-center text-white font-bold mr-4 flex-shrink-0">
                      3
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-gray-800 mb-2">Document Verification</h4>
                      <p className="text-gray-600">Verification of original documents and certificates</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-secondary-500 rounded-full flex items-center justify-center text-white font-bold mr-4 flex-shrink-0">
                      4
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-gray-800 mb-2">Final Admission</h4>
                      <p className="text-gray-600">Admission confirmation and fee payment</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 gradient-bg text-white text-center">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Apply?</h2>
            <p className="text-xl mb-8 opacity-90">Start your teaching career with D.El.Ed Training</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/registration" className="btn-secondary bg-white text-primary-900 hover:bg-gray-100">
                Apply Online Now
              </Link>
              <Link to="/contact" className="btn-outline border-white text-white hover:bg-white hover:text-primary-900">
                Contact Us
              </Link>
            </div>
            <p className="mt-8 text-lg">
              For queries: <a href="tel:918400133333" className="underline">+91 8400133333</a> | 
              <a href="tel:918177001081" className="underline ml-2">+91 8177001081</a>
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default DElEd;