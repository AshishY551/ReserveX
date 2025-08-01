// import React from 'react';
// export default function Services() {
//   return <div className="p-4"><h1>Services (Coming Soon)</h1></div>;
// }

// app/services/page.jsx (for Next.js 13+/App Router projects)
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Wrench, Rocket, ShieldCheck } from 'lucide-react';

const services = [
  {
    title: 'Custom Development',
    description: 'We deliver tailored web and mobile solutions that meet your unique needs.',
    icon: <Wrench className="w-8 h-8 text-blue-600" />,
  },
  {
    title: 'Performance Optimization',
    description: 'Speed, scalability, and security – we ensure your platform performs at its peak.',
    icon: <Rocket className="w-8 h-8 text-green-600" />,
  },
  {
    title: 'Security & Compliance',
    description: 'Top-tier protection and audit-ready compliance for your digital assets.',
    icon: <ShieldCheck className="w-8 h-8 text-purple-600" />,
  },
];

export default function Services() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-gray-50 to-white p-6 md:p-12"
    >
      <div className="text-center mb-10">
        <motion.h1
          className="text-4xl font-bold text-gray-800"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          Our Services
        </motion.h1>
        <p className="mt-3 text-gray-500 text-lg">
          We are working hard to bring you powerful tools. Here is a sneak peek!
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {services.map((service, index) => (
          <motion.div
            key={index}
            className="bg-white rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-all border border-gray-200"
            whileHover={{ scale: 1.03 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + index * 0.1 }}
          >
            <div className="flex items-center mb-4">{service.icon}</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">{service.title}</h3>
            <p className="text-gray-600 text-sm">{service.description}</p>
          </motion.div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <p className="text-gray-500 text-sm italic">🚧 More services launching soon. Stay tuned!</p>
      </div>
    </motion.div>
  );
}
