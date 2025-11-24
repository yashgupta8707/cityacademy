import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaQuoteLeft } from 'react-icons/fa';

const Director = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
              DIRECTOR'S MESSAGE
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Breadcrumb */}
      <section className="bg-white py-4 border-b">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex items-center space-x-2 text-gray-600">
            <a href="/" className="hover:text-secondary-500">Home</a>
            <span>/</span>
            <a href="/about" className="hover:text-secondary-500">About Us</a>
            <span>/</span>
            <span className="text-secondary-500">Director's Message</span>
          </div>
        </div>
      </section>

      {/* Message Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl text-secondary-500 font-semibold mb-4">From Director's Desk</h2>
          </motion.div>

          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-8"
            >
              {/* Director Image */}
              <div className="lg:col-span-1">
                <div className="bg-gradient-to-br from-secondary-500 to-secondary-600 p-1 rounded-lg">
                  <img
                    src="/director.jpg"
                    alt="Dr. Mamta Srivastava"
                    className="w-full rounded-lg"
                  />
                </div>
                <div className="mt-6 text-center">
                  <h3 className="text-2xl font-bold text-primary-900">DR. MAMTA SRIVASTAVA</h3>
                  <p className="text-secondary-500 font-semibold text-lg">DIRECTOR</p>
                </div>
              </div>

              {/* Message Content */}
              <div className="lg:col-span-2">
                <div className="card p-8 relative">
                  <FaQuoteLeft className="text-6xl text-secondary-400 opacity-20 absolute top-4 right-4" />
                  
                  <div className="space-y-6 text-gray-700 leading-relaxed">
                    <p className="text-lg">
                      We are living in an age of uncertainty, change and competition. Today's environment moves fast and 
                      modern systems have to encourage flexibility, initiative and empowerment. <span className="font-semibold text-primary-900">CITY COLLEGE 
                      OF MANAGEMENT</span> emphasizes the all-round development of its students. It aims at producing not 
                      only good professionals, teachers, but worthy citizens of a great Country, aiding in its overall 
                      progress and development. I am proud to introduce these premier institutions of learning where we 
                      endeavor to equip our students with the knowledge and skills that lead to graduate employability.
                    </p>

                    <p className="text-lg">
                      We are committed to delivering an outstanding learning experience to our Students such that the 
                      value add is maximized from their entry to exit. The programs are based on the state of art theory 
                      and contemporary practices to enable the students to face the challenges of the future. The is thus 
                      designed to impart knowledge and skills, both functional and integrative, to the Students to make 
                      them leaders in the upcoming years.
                    </p>

                    <p className="text-lg">
                      Our focus is on holistic development, combining academic excellence with character building and 
                      practical skills. We believe in creating an environment where students can explore their potential, 
                      develop critical thinking abilities, and emerge as confident professionals ready to contribute 
                      meaningfully to society.
                    </p>

                    <p className="text-lg font-semibold text-primary-900">
                      I welcome you to City Academy and wish you a rewarding learning experience with us.
                    </p>
                  </div>

                  <div className="mt-8 pt-6 border-t border-gray-200">
                    <div className="flex items-center">
                      <div className="ml-4">
                        <p className="font-bold text-xl text-primary-900">Dr. Mamta Srivastava</p>
                        <p className="text-secondary-500 font-semibold">Director</p>
                        <p className="text-gray-600">City Academy</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-dark-900 mb-4">Our Core Values</h2>
            <p className="text-gray-600 text-lg">Guiding principles that shape our institution</p>
          </motion.div>

          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'Quality Education', icon: '📚', desc: 'Academic excellence in every program' },
              { title: 'Student Empowerment', icon: '💪', desc: 'Developing confident leaders' },
              { title: 'Innovation', icon: '💡', desc: 'Modern teaching methodologies' },
              { title: 'Social Responsibility', icon: '🌍', desc: 'Contributing to society' }
            ].map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card p-6 text-center hover:shadow-2xl transition-shadow duration-300"
              >
                <div className="text-5xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-bold text-dark-900 mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Student Development Section */}
      <section className="py-20 bg-gradient-to-br from-primary-50 to-secondary-50">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="card p-8"
            >
              <h3 className="text-2xl font-bold text-primary-900 mb-6 text-center">
                Our Commitment to Student Development
              </h3>
              <div className="space-y-4">
                {[
                  'State-of-the-art theory combined with contemporary practices',
                  'Focus on functional and integrative skills development',
                  'Creating future leaders through comprehensive training',
                  'Maximizing value addition from entry to exit',
                  'Preparing students for real-world challenges'
                ].map((point, index) => (
                  <div key={index} className="flex items-start">
                    <div className="w-2 h-2 bg-secondary-500 rounded-full mt-2 mr-4 flex-shrink-0"></div>
                    <p className="text-gray-700 text-lg">{point}</p>
                  </div>
                ))}
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Start Your Journey With Us</h2>
            <p className="text-xl mb-8 opacity-90">Transform your future with quality education</p>
            <a href="/registration" className="btn-secondary bg-white text-primary-900 hover:bg-gray-100">
              Enroll Now
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Director;