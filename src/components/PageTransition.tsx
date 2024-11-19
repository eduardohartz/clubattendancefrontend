import { motion } from "framer-motion";
import React from "react";

const pageVariants = {
  initial: { opacity: 0, x: 0 }, //x 100
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 0 }, //x -100
};

const pageTransition = {
  type: "easeInOut",
  stiffness: 1,
  damping: 3,
  duration: 0.15,
};

interface PageTransitionProps {
  children: React.ReactNode;
}

const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      transition={pageTransition}
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;