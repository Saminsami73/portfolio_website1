import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedTextProps {
  text: string;
  className?: string;
  once?: boolean;
  animated?: boolean;
  staggerChildren?: number;
  delayChildren?: number;
}

// For animating text with a character-by-character reveal effect
export function AnimatedCharacters({ 
  text, 
  className,
  once = true,
  animated = true,
  staggerChildren = 0.03,
  delayChildren = 0
}: AnimatedTextProps) {
  // Split text into an array of characters
  const characters = Array.from(text);
  
  const container = {
    hidden: {},
    visible: (i = 1) => ({
      transition: { 
        staggerChildren: staggerChildren, 
        delayChildren: delayChildren * i
      }
    })
  };
  
  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 200,
      }
    },
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 200,
      }
    }
  };
  
  // If not animated, just return the text
  if (!animated) {
    return <span className={className}>{text}</span>;
  }
  
  return (
    <motion.span
      className={cn("inline-block", className)}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once }}
    >
      {characters.map((char, index) => (
        <motion.span 
          key={`${char}-${index}`} 
          variants={child}
          className="inline-block"
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.span>
  );
}

// For animating text with a line-by-line reveal effect, splitting by words
export function AnimatedWords({ 
  text, 
  className,
  once = true,
  animated = true,
  staggerChildren = 0.1,
  delayChildren = 0
}: AnimatedTextProps) {
  // Split text into an array of words
  const words = text.split(" ");
  
  const container = {
    hidden: {},
    visible: (i = 1) => ({
      transition: { 
        staggerChildren: staggerChildren, 
        delayChildren: delayChildren * i
      }
    })
  };
  
  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 200,
      }
    },
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 200,
      }
    }
  };
  
  // If not animated, just return the text
  if (!animated) {
    return <span className={className}>{text}</span>;
  }
  
  return (
    <motion.span
      className={cn("inline-block", className)}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once }}
    >
      {words.map((word, index) => (
        <motion.span 
          key={`${word}-${index}`} 
          variants={child}
          className="inline-block mr-[0.25em]"
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
}

// Animated underline effect for text
export function AnimatedUnderline({
  text,
  className,
  once = true
}: {
  text: string;
  className?: string;
  once?: boolean;
}) {
  return (
    <span className={cn("relative inline-block", className)}>
      {text}
      <motion.span
        initial={{ width: 0 }}
        whileInView={{ width: "100%" }}
        viewport={{ once }}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        className="absolute left-0 bottom-0 h-[2px] bg-primary rounded-full"
      />
    </span>
  );
}

// Gradient text that animates the gradient direction
export function AnimatedGradientText({
  text,
  className,
  from = "from-blue-500",
  to = "to-violet-500",
  animated = true
}: {
  text: string;
  className?: string;
  from?: string;
  to?: string;
  animated?: boolean;
}) {
  if (!animated) {
    return (
      <span className={cn(`bg-clip-text text-transparent bg-gradient-to-r ${from} ${to}`, className)}>
        {text}
      </span>
    );
  }
  
  return (
    <motion.span
      className={cn(`bg-clip-text text-transparent bg-gradient-to-r ${from} ${to}`, className)}
      animate={{
        backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
      }}
      transition={{
        duration: 15,
        repeat: Infinity,
        ease: "linear",
      }}
      style={{
        backgroundSize: "200% 200%",
      }}
    >
      {text}
    </motion.span>
  );
}

// Type animation that simulates typing and deleting text
export function TypeAnimation({
  texts,
  className,
  speed = 0.05,
  delayBetweenTexts = 2,
  infinite = true
}: {
  texts: string[];
  className?: string;
  speed?: number;
  delayBetweenTexts?: number;
  infinite?: boolean;
}) {
  const textIndex = 0;
  const sentence = texts[textIndex % texts.length];
  
  return (
    <motion.div
      initial={{ opacity: 1 }}
      className={cn("inline-block", className)}
    >
      <motion.span
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
        }}
        transition={{
          duration: 0.1,
        }}
        className="inline-block"
      >
        {sentence}
        <motion.span 
          animate={{ opacity: [1, 0, 1] }} 
          transition={{ duration: 0.8, repeat: Infinity }} 
          className="inline-block ml-1 w-[2px] h-[1em] bg-current align-text-top"
        />
      </motion.span>
    </motion.div>
  );
}