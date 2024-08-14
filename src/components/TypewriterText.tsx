"use client";

import { motion, Variants } from "framer-motion";

interface TypewriterTextProps {
  text: string;
  delay?: number;
}

const textVariants: Variants = {
  offscreen: {
    opacity: 0,
    y: 20,
  },
  onscreen: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.2,
      bounce: 0.3,
      type: "tween",
    },
  },
};

export const TypewriterText: React.FC<TypewriterTextProps> = ({
  text,
  delay,
}) => {
  return (
    <>
      {text.split(" ").map((word, wordIndex) => (
        <span className="inline-block" key={`${word}-${wordIndex}`}>
          {word.split("").map((char, charIndex) => (
            <motion.span
              key={`${char}-${charIndex}`}
              className="inline-block"
              variants={textVariants}
            >
              {char}
            </motion.span>
          ))}
          <span className="inline-block">&nbsp;</span>
        </span>
      ))}
    </>
  );
};
