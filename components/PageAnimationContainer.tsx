import { motion } from "framer-motion";
import React, { ReactNode } from "react";

interface IPageContainerProps {
  className?: string | undefined;
  children: ReactNode;
}

const PageAnimationContainer = (props: IPageContainerProps) => {
  const { className = "", children } = props;
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default PageAnimationContainer;
