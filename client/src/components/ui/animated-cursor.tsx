import { useEffect, useState } from "react";
import { motion } from "framer-motion";

// Custom animated cursor that follows the user's mouse
const AnimatedCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState("default");
  
  useEffect(() => {
    const mouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      });
    };
    
    const mouseDown = () => setCursorVariant("clicked");
    const mouseUp = () => setCursorVariant("default");
    
    const handleLinkHover = () => setCursorVariant("hover");
    const handleLinkLeave = () => setCursorVariant("default");
    
    window.addEventListener("mousemove", mouseMove);
    window.addEventListener("mousedown", mouseDown);
    window.addEventListener("mouseup", mouseUp);
    
    // Add event listeners to links and buttons
    const links = document.querySelectorAll("a, button");
    links.forEach(link => {
      link.addEventListener("mouseenter", handleLinkHover);
      link.addEventListener("mouseleave", handleLinkLeave);
    });
    
    return () => {
      window.removeEventListener("mousemove", mouseMove);
      window.removeEventListener("mousedown", mouseDown);
      window.removeEventListener("mouseup", mouseUp);
      
      links.forEach(link => {
        link.removeEventListener("mouseenter", handleLinkHover);
        link.removeEventListener("mouseleave", handleLinkLeave);
      });
    };
  }, []);
  
  // Different cursor variants/states
  const variants = {
    default: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      height: 32,
      width: 32,
      backgroundColor: "rgba(100, 150, 255, 0.1)",
      borderColor: "rgba(100, 150, 255, 0.5)",
      borderWidth: "1px"
    },
    hover: {
      x: mousePosition.x - 24,
      y: mousePosition.y - 24,
      height: 48,
      width: 48,
      backgroundColor: "rgba(100, 150, 255, 0.2)",
      borderColor: "rgba(100, 150, 255, 0.8)",
      borderWidth: "2px"
    },
    clicked: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      height: 32,
      width: 32,
      backgroundColor: "rgba(100, 150, 255, 0.3)",
      borderColor: "rgba(100, 150, 255, 1)",
      borderWidth: "2px",
      scale: 0.9
    }
  };
  
  // Only show custom cursor on non-touch devices
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  
  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);
  
  if (isTouchDevice) return null;
  
  return (
    <>
      <motion.div
        className="rounded-full fixed top-0 left-0 pointer-events-none z-50 border-solid hidden md:block"
        animate={cursorVariant}
        variants={variants}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 28,
          mass: 0.5
        }}
      />
      <motion.div
        className="rounded-full fixed top-0 left-0 pointer-events-none z-50 bg-primary hidden md:block"
        animate={{
          x: mousePosition.x - 4,
          y: mousePosition.y - 4,
        }}
        transition={{
          type: "spring",
          stiffness: 1000,
          damping: 30,
          mass: 0.1
        }}
        style={{
          height: 8,
          width: 8
        }}
      />
      <style dangerouslySetInnerHTML={{
        __html: `
          body {
            cursor: none;
          }
          
          @media (max-width: 768px) {
            body {
              cursor: auto;
            }
          }
        `
      }} />
    </>
  );
};

export default AnimatedCursor;