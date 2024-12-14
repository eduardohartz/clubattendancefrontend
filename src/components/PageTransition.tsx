import { motion } from "framer-motion";
import React from "react";
import Loading from "./Loading";

const pageVariants = {
  initial: { opacity: 0, x: 0 }, //x 100
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 0 }, //x -100
};

const pageTransition = {
  type: "tween",
  duration: 0.15,
  ease: "easeInOut",
  stiffness: 50,
  damping: 20,
  mass: 1,
};

const loadingTransition = {
  type: "tween",
  duration: 0.1,
  ease: "easeInOut",
  stiffness: 100,
  damping: 20,
  mass: 1,
};

interface PageTransitionProps {
  children: React.ReactNode;
}

const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
  if (React.isValidElement(children) && children.type === Loading) {
    return (
      <motion.div
        initial="initial"
        animate="animate"
        exit="exit"
        variants={pageVariants}
        transition={loadingTransition}
      >
        {children}
      </motion.div>
    );
  }
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