
import { motion } from 'framer-motion';

const AnimatedArrow = () => {
  return (
    <motion.span
      animate={{ x: [0, 10, 0] }} // Animation logic
      transition={{ repeat: Infinity, duration: 1 }} // Repeat indefinitely
    >
      →
    </motion.span>
  );
};

export default AnimatedArrow;