import { motion } from "framer-motion";

// Initial page loader animation
export function PageLoader() {
  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-background"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 1, delay: 1.5 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="flex flex-col items-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div 
          className="text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-violet-500"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          SS.
        </motion.div>
        <motion.div 
          className="mt-4 flex gap-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <LoadingDot delay={0} />
          <LoadingDot delay={0.1} />
          <LoadingDot delay={0.2} />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

function LoadingDot({ delay = 0 }) {
  return (
    <motion.div
      className="h-3 w-3 rounded-full bg-primary"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.5,
        delay,
        repeat: Infinity,
        repeatType: "reverse"
      }}
    />
  );
}

// Spinning loader for loading states
export function SpinningLoader({ size = "medium", color = "primary" }) {
  const sizeClass = {
    small: "h-4 w-4 border-2",
    medium: "h-8 w-8 border-3",
    large: "h-12 w-12 border-4"
  };
  
  const colorClass = {
    primary: "border-primary border-t-transparent",
    white: "border-white border-t-transparent"
  };
  
  return (
    <motion.div
      className={`rounded-full ${sizeClass[size as keyof typeof sizeClass]} ${colorClass[color as keyof typeof colorClass]} animate-spin`}
      animate={{ rotate: 360 }}
      transition={{
        duration: 1,
        repeat: Infinity,
        ease: "linear"
      }}
    />
  );
}

// Progress bar loader
export function ProgressLoader({ progress = 0 }) {
  return (
    <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
      <motion.div
        className="h-full bg-primary"
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.5 }}
      />
    </div>
  );
}