import { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

// Different animation directions
type Direction = "up" | "down" | "left" | "right" | "none";

// Different animation types/styles
type AnimationType = "fade" | "slide" | "scale" | "rotate" | "flip" | "zoom";

// Define specific variant types
type AnimationVariant = {
  opacity: number;
  y?: number;
  x?: number;
  scale?: number;
  rotate?: number;
  rotateX?: number;
  rotateY?: number;
};

interface RevealProps {
  children: ReactNode;
  className?: string;
  direction?: Direction;
  type?: AnimationType;
  delay?: number;
  duration?: number;
  distance?: number;
  once?: boolean;
  staggerChildren?: number;
  container?: boolean;
  animateInitialOnly?: boolean;
  threshold?: number;
}

// RevealAnimation - Animates children when they enter the viewport
export function RevealAnimation({
  children,
  className,
  direction = "up",
  type = "fade",
  delay = 0,
  duration = 0.5,
  distance = 30,
  once = true,
  staggerChildren = 0.1,
  container = false,
  animateInitialOnly = false,
  threshold = 0.1
}: RevealProps) {
  // Build animation settings based on type and direction
  const getAnimationVariants = () => {
    let hidden: AnimationVariant = { opacity: 0 };
    let visible: AnimationVariant = { opacity: 1 };
    
    if (type === "slide") {
      if (direction === "up") hidden = { ...hidden, y: distance };
      if (direction === "down") hidden = { ...hidden, y: -distance };
      if (direction === "left") hidden = { ...hidden, x: distance };
      if (direction === "right") hidden = { ...hidden, x: -distance };
      visible = { opacity: 1, y: 0, x: 0 };
    }
    
    if (type === "scale") {
      hidden = { opacity: 0, scale: 0.8 };
      visible = { opacity: 1, scale: 1 };
    }
    
    if (type === "zoom") {
      hidden = { opacity: 0, scale: 0.5 };
      visible = { opacity: 1, scale: 1 };
    }
    
    if (type === "rotate") {
      hidden = { opacity: 0, rotate: direction === "left" ? -20 : 20 };
      visible = { opacity: 1, rotate: 0 };
    }
    
    if (type === "flip") {
      if (direction === "up" || direction === "down") {
        hidden = { opacity: 0, rotateX: direction === "down" ? 90 : -90 };
        visible = { opacity: 1, rotateX: 0 };
      } else {
        hidden = { opacity: 0, rotateY: direction === "right" ? -90 : 90 };
        visible = { opacity: 1, rotateY: 0 };
      }
    }
    
    return {
      hidden,
      visible
    };
  };
  
  const variants = getAnimationVariants();
  
  // If it's a container for staggered children animations
  if (container) {
    return (
      <motion.div
        className={className}
        initial="hidden"
        whileInView="visible"
        viewport={{ once, amount: threshold }}
        variants={{
          hidden: { opacity: 1 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren,
              delayChildren: delay
            }
          }
        }}
      >
        {children}
      </motion.div>
    );
  }
  
  // For direct animation of the element
  if (animateInitialOnly) {
    return (
      <motion.div
        className={cn("will-change-transform", className)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once, amount: threshold }}
        variants={variants}
        transition={{
          duration,
          delay,
          ease: [0.25, 0.1, 0.25, 1]
        }}
      >
        {children}
      </motion.div>
    );
  }
  
  return (
    <motion.div
      className={cn("will-change-transform", className)}
      initial={variants.hidden}
      whileInView={variants.visible}
      viewport={{ once, amount: threshold }}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1]
      }}
    >
      {children}
    </motion.div>
  );
}

// Use this component to create a staggered animation effect for multiple children
export function RevealContainer({
  children,
  className,
  delay = 0,
  staggerChildren = 0.1,
  once = true,
  threshold = 0.1
}: Omit<RevealProps, "direction" | "type" | "distance" | "duration">) {
  return (
    <RevealAnimation
      container
      className={className}
      delay={delay}
      staggerChildren={staggerChildren}
      once={once}
      threshold={threshold}
    >
      {children}
    </RevealAnimation>
  );
}

// Use this component to create a single animation for a child element
export function RevealItem({
  children,
  className,
  direction = "up",
  type = "fade",
  delay = 0,
  duration = 0.5,
  distance = 30,
  once = true,
  animateInitialOnly = true,
  threshold = 0.1
}: Omit<RevealProps, "container" | "staggerChildren">) {
  return (
    <RevealAnimation
      className={className}
      direction={direction}
      type={type}
      delay={delay}
      duration={duration}
      distance={distance}
      once={once}
      animateInitialOnly={animateInitialOnly}
      threshold={threshold}
    >
      {children}
    </RevealAnimation>
  );
}