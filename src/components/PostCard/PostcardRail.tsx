"use client";

import { PropsWithChildren } from "react";
import { motion } from "framer-motion";

export const PostcardRail: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <motion.div
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: true, amount: 0.3 }}
      transition={{ staggerChildren: 0.35 }}
      className="flex flex-col md:flex-row gap-12 md:gap-8 lg:gap-16"
    >
      {children}
    </motion.div>
  );
};
