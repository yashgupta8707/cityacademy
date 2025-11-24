import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaBook, FaLaptop, FaNetworkWired, FaDesktop } from 'react-icons/fa';

const Facilities = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const facilities = [
    {
      icon: FaBook,
      title: 'LIBRARY',
      bgColor: 'bg-blue-50',
      description: 'The city academy Library collectively supports the teaching, research and extension programmes of the Institute. All students and faculty members of the Institute are entitled to make use of the Library facilities on taking library membership. The Library, besides having a huge collection of books and offers library services through its various Divisions.',
      images: [
        'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=600',
        'https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=600'
      ]
    },
    {
      icon: FaLaptop,
      title: 'COMPUTER LAB',
      bgColor: 'bg-green-50',
      description: 'The fully air conditioned, sophisticated and spacious computer centre is a matter of tremendous pride for the college. Extensively equipped with the latest hardware and software, the systems are interconnected through a Local Area Network to the centralized server.',
      images: [
        'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600',
        'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600'
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
            backgroundImage: 'url(https://images.unsplash.com/photo-1562774053-701939374585?w=1920)'
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
              OUR FACILITIES
            </h1>
            <p className="text-xl text-gray-200">World-Class Infrastructure for Better Learning</p>
          </motion.div>
        </div>
      </section>

      {/* Facilities Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          {facilities.map((facility, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="mb-16"
            >
              {/* Facility Header */}
              <div className="bg-primary-800 text-white py-4 px-6 rounded-t-lg">
                <h2 className="text-2xl md:text-3xl font-bold flex items-center">
                  <facility.icon className="mr-4 text-3xl" />
                  {facility.title}
                </h2>
              </div>

              {/* Facility Content */}
              <div className={`${facility.bgColor} p-6 md:p-8 rounded-b-lg`}>
                <p className="text-gray-700 text-lg leading-relaxed mb-8">
                  {facility.description}
                </p>

                {/* Images Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {facility.images.map((image, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: i * 0.2 }}
                      viewport={{ once: true }}
                      className="relative overflow-hidden rounded-lg shadow-xl group"
                    >
                      <img
                        src={image}
                        alt={`${facility.title} ${i + 1}`}
                        className="w-full h-64 object-cover transform group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}

          {/* Additional Features */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mt-16"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { icon: FaDesktop, title: 'Smart Classrooms', description: 'Digital learning environment' },
                { icon: FaNetworkWired, title: 'High-Speed WiFi', description: 'Campus-wide connectivity' },
                { icon: FaBook, title: 'Digital Library', description: 'E-books and journals' },
                { icon: FaLaptop, title: 'Modern Labs', description: 'State-of-the-art equipment' }
              ].map((feature, index) => (
                <div key={index} className="card p-6 text-center">
                  <feature.icon className="text-5xl text-secondary-500 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-dark-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      {/* <section className="py-20 gradient-bg text-white text-center">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Experience Our Campus</h2>
            <p className="text-xl mb-8 opacity-90">Visit us to see our world-class facilities</p>
            <a href="/contact" className="btn-secondary bg-white text-primary-900 hover:bg-gray-100">
              Schedule a Visit
            </a>
          </motion.div>
        </div>
      </section> */}
    </div>
  );
};

export default Facilities;