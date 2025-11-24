import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaQuoteLeft } from 'react-icons/fa';

const Founder = () => {
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
              FOUNDER MESSAGE
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
            <span className="text-secondary-500">Founder Message</span>
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
            <h2 className="text-2xl text-secondary-500 font-semibold mb-4">From Founder's Desk</h2>
          </motion.div>

          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-8"
            >
              {/* Founder Image */}
              <div className="lg:col-span-1">
                <div className="bg-gradient-to-br from-primary-600 to-primary-800 p-1 rounded-lg">
                  <img
                    src="/founder.jpg"
                    alt="Mr. M. M. Srivastava"
                    className="w-full rounded-lg"
                  />
                </div>
                <div className="mt-6 text-center">
                  <h3 className="text-2xl font-bold text-primary-900">MR. M. M. SRIVASTAVA</h3>
                  <p className="text-secondary-500 font-semibold text-lg">FOUNDER</p>
                </div>
              </div>

              {/* Message Content */}
              <div className="lg:col-span-2">
                <div className="card p-8 relative">
                  <FaQuoteLeft className="text-6xl text-secondary-400 opacity-20 absolute top-4 right-4" />
                  
                  <div className="space-y-6 text-gray-700 leading-relaxed">
                    <p className="text-lg">
                      I congratulate you on stepping into the portals of <span className="font-semibold text-primary-900">CITY ACADEMY</span>, 
                      an institution that was 'Built by Excellence, Backed by Experience'. The college, in its endeavor to 
                      ensure competence at all levels of education, intends to maintain high standards in terms of 
                      teaching-learning, research, faculty and infrastructure.
                    </p>

                    <p className="text-lg">
                      The reputation of an institution of higher learning is based on the character and performance of 
                      individuals who work and live in it, i.e., the teachers and students; There can be distractions and 
                      setbacks in the making of an institution. There can be challenges which may appear formidable. But, 
                      those who have the will, determination and perseverance shall overcome the difficulties and attain 
                      higher levels of achievement in the pursuit of excellence. This is the lesson of history which CITY 
                      COLLEGE OF MANAGEMENT has assimilated in its work culture.
                    </p>

                    <p className="text-lg">
                      We believe in nurturing talent and providing opportunities for students to excel in their chosen fields. 
                      Our commitment to quality education and holistic development ensures that every student leaves our 
                      institution as a confident and capable individual ready to make a positive impact on society.
                    </p>

                    <p className="text-lg font-semibold text-primary-900">
                      I wish you all the very best in your academic journey and future endeavors.
                    </p>
                  </div>

                  <div className="mt-8 pt-6 border-t border-gray-200">
                    <div className="flex items-center">
                      <div className="ml-4">
                        <p className="font-bold text-xl text-primary-900">M. M. Srivastava</p>
                        <p className="text-secondary-500 font-semibold">Founder</p>
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

      {/* Vision Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="card p-8 bg-gradient-to-br from-primary-50 to-secondary-50"
            >
              <h3 className="text-2xl font-bold text-primary-900 mb-6 text-center">Our Foundation Principles</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { title: 'Excellence', desc: 'Commitment to quality education' },
                  { title: 'Innovation', desc: 'Modern teaching methodologies' },
                  { title: 'Integrity', desc: 'Building character and values' }
                ].map((principle, index) => (
                  <div key={index} className="text-center">
                    <div className="w-16 h-16 bg-secondary-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-white text-2xl font-bold">{index + 1}</span>
                    </div>
                    <h4 className="text-xl font-bold text-dark-900 mb-2">{principle.title}</h4>
                    <p className="text-gray-600">{principle.desc}</p>
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Be Part of Our Legacy</h2>
            <p className="text-xl mb-8 opacity-90">Join us in building a brighter future</p>
            <a href="/registration" className="btn-secondary bg-white text-primary-900 hover:bg-gray-100">
              Apply Now
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Founder;
