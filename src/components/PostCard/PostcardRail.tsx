"use client";

import { PropsWithChildren } from "react";
import { motion } from "framer-motion";

export const PostcardRail: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <motion.div
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: true, amount: 0.2 }}
      transition={{ staggerChildren: 0.35 }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-8 lg:gap-16"
    >
      {children}
    </motion.div>
  );
};
