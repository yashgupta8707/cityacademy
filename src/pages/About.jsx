import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaEye, FaGem, FaLightbulb, FaHandshake } from 'react-icons/fa';

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const visionMission = [
    {
      icon: FaEye,
      title: 'Our Vision',
      points: [
        'Strive towards a better understanding of the exponentially growing National and International interconnectivity',
        'Promote knowledge with the express goal of quality education for the next generation',
        'Develop professional leadership qualities and control, direct and manage human and material resources',
        'Shape a better future by developing effective and socially responsible individuals & organizations'
      ]
    },
    {
      icon: FaLightbulb,
      title: 'Our Mission',
      points: [
        'Ideal preparation for the development and training of every student by recognizing their potential for achieving matchless ambitions and life goals'
      ]
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[400px] flex items-center gradient-bg">
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div
          className="absolute inset-0 bg-cover bg-center mix-blend-overlay"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1920)'
          }}
        ></div>
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              ABOUT CITY ACADEMY
            </h1>
            <p className="text-xl text-gray-200">Building Excellence, Backed by Experience</p>
          </motion.div>
        </div>
      </section>

      {/* Welcome Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <img
                src="/hero1.png"
                alt="College Building"
                className="rounded-xl shadow-2xl"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl text-secondary-500 font-semibold mb-4">WELCOME TO</h2>
              <h3 className="text-3xl md:text-4xl font-bold text-primary-900 mb-6">
                CITY ACADEMY
              </h3>
              
              <p className="text-gray-600 mb-4 leading-relaxed">
                Increasing globalization of business, faster growth of the Indian economy and advancement in technology 
                has resulted into a situation where legal profession has become one of the most growing and lucrative 
                profession all over the world.
              </p>

              <p className="text-gray-600 mb-4 leading-relaxed">
                The past decade has seen a mini revolution in legal service sector with the greatest legal impact on 
                corporate legal arena.
              </p>

              <p className="text-gray-600 mb-6 leading-relaxed">
                Activities in project finance, intellectual property protection, environmental protection, competition law, 
                corporate taxation, infrastructure contract, corporate governance and Investment law were almost unknown 
                before 1990's.
              </p>

              <p className="text-gray-600 leading-relaxed">
                The curriculum at the College is novel, innovative and designed to keep students equipped and up-to-date 
                with the skills needed in the profession.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-dark-900 mb-4">
              Our Vision & Mission
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {visionMission.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="card p-8"
              >
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-secondary-500 rounded-full flex items-center justify-center mr-4">
                    <item.icon className="text-3xl text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-primary-900">{item.title}</h3>
                </div>
                <ul className="space-y-3">
                  {item.points.map((point, i) => (
                    <li key={i} className="flex items-start text-gray-600">
                      <span className="w-2 h-2 bg-secondary-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 gradient-bg text-black text-center">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Join Us?</h2>
            <p className="text-xl mb-8 opacity-90">Start your journey to success today</p>
            <a href="/registration" className="btn-secondary bg-yellow-500 p-2 border-amber-300 rounded-2xl text-primary-900 hover:bg-gray-100">
              Apply Now
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;