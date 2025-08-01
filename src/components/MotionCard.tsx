// components/MotionCard.tsx
"use client";

// import { motion } from "framer-motion";
import { motion, AnimatePresence, useInView } from 'framer-motion';
export { motion, AnimatePresence, useInView };

export default function MotionCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6 bg-white shadow rounded-xl"
    >
      <p>Hello with animation!</p>
    </motion.div>
  );
}
