import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "@/components/ThemeProvider";

// Advanced animated background with interactive elements and flowing patterns
const AnimatedBackground = () => {
  const { theme } = useTheme();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMouseMoving, setIsMouseMoving] = useState(false);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas size and handle resize
    const setCanvasSize = () => {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);
    
    // Mouse interaction handling
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      setIsMouseMoving(true);
      
      // Reset the "mouse moving" state after 2 seconds of inactivity
      clearTimeout(mouseTimeout as number);
      mouseTimeout = window.setTimeout(() => setIsMouseMoving(false), 2000);
    };
    
    let mouseTimeout: number | ReturnType<typeof setTimeout>;
    window.addEventListener('mousemove', handleMouseMove);
    
    // Determine colors based on theme
    const isDark = theme === 'dark';
    
    // Flow field parameters
    const cellSize = 20;
    const cols = Math.ceil(canvas.width / cellSize) + 1;
    const rows = Math.ceil(canvas.height / cellSize) + 1;
    let flowFieldAngle = 0;
    
    // Particle system
    class Particle {
      x: number;
      y: number;
      size: number;
      baseSize: number;
      speedX: number;
      speedY: number;
      color: string;
      angle: number;
      velocity: number;
      maxVelocity: number;
      history: { x: number; y: number; size: number }[];
      maxHistory: number;
      originalHue: number;
      hue: number;
      uniqueOffset: number;
      
      constructor() {
        this.x = Math.random() * (canvas?.width || window.innerWidth);
        this.y = Math.random() * (canvas?.height || window.innerHeight);
        this.baseSize = Math.random() * 3 + 1;
        this.size = this.baseSize;
        this.speedX = 0;
        this.speedY = 0;
        this.uniqueOffset = Math.random() * 1000;
        
        // Create aesthetically pleasing colors
        this.originalHue = isDark 
          ? Math.random() * 60 + 220 // Blues and purples for dark mode
          : Math.random() * 60 + 190; // Blues with some cyan for light mode
        this.hue = this.originalHue;
        
        const saturation = isDark ? '70%' : '60%';
        const lightness = isDark ? '70%' : '60%';
        const alpha = isDark ? 0.3 : 0.2;
        
        this.color = `hsla(${this.hue}, ${saturation}, ${lightness}, ${alpha})`;
        
        this.angle = 0;
        this.velocity = 0.3 + Math.random() * 0.5;
        this.maxVelocity = this.velocity * 3;
        
        // Particle trail
        this.history = [];
        this.maxHistory = Math.floor(Math.random() * 10) + 5;
      }
      
      update(flowFieldTime: number, mouseInteraction: boolean = false) {
        if (!canvas) return;
        
        // Flow field movement
        const col = Math.floor(this.x / cellSize);
        const row = Math.floor(this.y / cellSize);
        const index = col + row * cols;
        
        // Create a dynamic flow field with perlin-like noise approximation
        const angleOffset = Math.sin(col * 0.01 + flowFieldTime * 0.005) * 
                           Math.cos(row * 0.01 + flowFieldTime * 0.005) * Math.PI * 2;
        
        this.angle = angleOffset + Math.sin(this.uniqueOffset + flowFieldTime * 0.001) * 0.5;
        
        // Apply mouse interaction
        if (mouseInteraction && isMouseMoving) {
          const dx = this.x - mousePosition.x;
          const dy = this.y - mousePosition.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const maxDistance = 200;
          
          if (distance < maxDistance) {
            // Calculate influence based on distance (closer = more influence)
            const influence = 1 - distance / maxDistance;
            
            // Attract/repel based on distance
            const repelFactor = 0.1;
            this.speedX += dx * repelFactor * influence;
            this.speedY += dy * repelFactor * influence;
            
            // Change color with mouse interaction
            this.hue = this.originalHue + 30 * influence;
            const saturation = isDark ? '80%' : '70%';
            const lightness = isDark ? '70%' : '60%';
            const alpha = (isDark ? 0.4 : 0.3) + influence * 0.2;
            
            this.color = `hsla(${this.hue}, ${saturation}, ${lightness}, ${alpha})`;
            
            // Grow particles on mouse movement
            this.size = this.baseSize * (1 + influence);
          } else {
            // Gradually return to original state
            this.hue = this.hue * 0.95 + this.originalHue * 0.05;
            const saturation = isDark ? '70%' : '60%';
            const lightness = isDark ? '70%' : '60%';
            const alpha = isDark ? 0.3 : 0.2;
            
            this.color = `hsla(${this.hue}, ${saturation}, ${lightness}, ${alpha})`;
            this.size = this.size * 0.95 + this.baseSize * 0.05;
          }
        }
        
        // Calculate directional velocity based on angle
        const targetSpeedX = Math.cos(this.angle) * this.velocity;
        const targetSpeedY = Math.sin(this.angle) * this.velocity;
        
        // Smooth acceleration
        this.speedX = this.speedX * 0.9 + targetSpeedX * 0.1;
        this.speedY = this.speedY * 0.9 + targetSpeedY * 0.1;
        
        // Update position
        this.x += this.speedX;
        this.y += this.speedY;
        
        // Edge wrapping
        if (!canvas) return;
        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;
        if (this.y < 0) this.y = canvas.height;
        if (this.y > canvas.height) this.y = 0;
        
        // Update history for trails
        this.history.unshift({ x: this.x, y: this.y, size: this.size });
        if (this.history.length > this.maxHistory) {
          this.history.pop();
        }
      }
      
      draw(ctx: CanvasRenderingContext2D, drawTrails: boolean = true) {
        // Draw trails
        if (drawTrails) {
          for (let i = 0; i < this.history.length; i++) {
            const point = this.history[i];
            const alpha = 1 - i / this.history.length;
            const pointColor = this.color.replace(/[\d.]+\)$/, `${alpha * 0.2})`);
            
            ctx.fillStyle = pointColor;
            ctx.beginPath();
            const size = point.size * (1 - i / this.history.length);
            ctx.arc(point.x, point.y, size, 0, Math.PI * 2);
            ctx.fill();
          }
        }
        
        // Draw particle
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    
    // Create particles
    const numberOfParticles = Math.min(window.innerWidth / 10, 150); // More particles for more visual impact
    const particles: Particle[] = [];
    
    for (let i = 0; i < numberOfParticles; i++) {
      particles.push(new Particle());
    }
    
    // Animation loop
    let flowFieldTime = 0;
    let animationFrameId: number;
    
    const animate = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update flow field time
      flowFieldTime++;
      
      // Update and draw particles
      for (const particle of particles) {
        particle.update(flowFieldTime, true);
        particle.draw(ctx, true);
      }
      
      // Connect particles with curves for a more aesthetic effect
      connectParticlesWithCurves(particles, ctx, isDark);
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    // Connect particles with curved lines for a more organic look
    const connectParticlesWithCurves = (particles: Particle[], ctx: CanvasRenderingContext2D, isDark: boolean) => {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const maxDistance = 100; // Smaller connection distance for a cleaner look
          
          if (distance < maxDistance) {
            // Calculate line opacity based on distance
            const opacity = (1 - distance / maxDistance) * (isDark ? 0.1 : 0.05);
            
            // Create gradient for line
            const gradient = ctx.createLinearGradient(
              particles[i].x, particles[i].y,
              particles[j].x, particles[j].y
            );
            
            // Use the particle colors for the gradient
            gradient.addColorStop(0, particles[i].color.replace(/[\d.]+\)$/, `${opacity})`));
            gradient.addColorStop(1, particles[j].color.replace(/[\d.]+\)$/, `${opacity})`));
            
            ctx.strokeStyle = gradient;
            ctx.lineWidth = 0.5;
            
            // Draw curved connections
            ctx.beginPath();
            
            // Start at the first particle
            ctx.moveTo(particles[i].x, particles[i].y);
            
            // Create a control point between the particles with some random variation
            const controlX = (particles[i].x + particles[j].x) / 2 + (Math.random() - 0.5) * 20;
            const controlY = (particles[i].y + particles[j].y) / 2 + (Math.random() - 0.5) * 20;
            
            // Draw a quadratic curve
            ctx.quadraticCurveTo(
              controlX, controlY,
              particles[j].x, particles[j].y
            );
            
            ctx.stroke();
          }
        }
      }
    };
    
    animate();
    
    return () => {
      window.removeEventListener('resize', setCanvasSize);
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(mouseTimeout);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme, mousePosition, isMouseMoving]);
  
  return (
    <canvas 
      ref={canvasRef} 
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
    />
  );
};

// Enhanced animated gradient blob with 3D perspective motion
export const AnimatedGradientBlob = ({ 
  color1 = "from-blue-400/20", 
  color2 = "to-violet-500/20",
  top = "top-0",
  left = "left-0",
  size = "w-[500px] h-[500px]",
  delay = 0
}: {
  color1?: string;
  color2?: string;
  top?: string;
  left?: string;
  size?: string;
  delay?: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ 
        opacity: 1, 
        scale: 1,
        x: [0, 20, -20, -10, 10, 0],
        y: [0, -30, 20, 30, -30, 0],
        rotate: [0, 5, -5, 3, -3, 0],
        // Add 3D perspective transforms for more visual depth
        rotateX: [0, 3, -3, 3, 0],
        rotateY: [0, -3, 5, -5, 0],
        z: [0, 20, 40, 20, 0]
      }}
      transition={{
        opacity: { duration: 1, delay },
        scale: { duration: 1.5, delay },
        x: { 
          repeat: Infinity, 
          repeatType: "mirror", 
          duration: 20,
          ease: "easeInOut" 
        },
        y: { 
          repeat: Infinity, 
          repeatType: "mirror", 
          duration: 30,
          ease: "easeInOut" 
        },
        rotate: { 
          repeat: Infinity, 
          repeatType: "mirror", 
          duration: 25,
          ease: "easeInOut" 
        },
        rotateX: {
          repeat: Infinity,
          repeatType: "mirror",
          duration: 35,
          ease: "easeInOut"
        },
        rotateY: {
          repeat: Infinity,
          repeatType: "mirror",
          duration: 45,
          ease: "easeInOut"
        },
        z: {
          repeat: Infinity,
          repeatType: "mirror",
          duration: 40,
          ease: "easeInOut"
        }
      }}
      style={{
        perspective: "1000px",
        transformStyle: "preserve-3d"
      }}
      className={`absolute ${top} ${left} ${size} bg-gradient-to-br ${color1} ${color2} rounded-full blur-[80px] -z-10`}
    />
  );
};

// New nebula-like animated background effect
export const AnimatedNebula = ({
  top = "top-0",
  left = "left-0",
  opacity = "opacity-50",
  delay = 0
}: {
  top?: string;
  left?: string;
  opacity?: string;
  delay?: number;
}) => {
  return (
    <motion.div
      className={`absolute ${top} ${left} w-full h-full ${opacity} overflow-hidden -z-10`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2, delay }}
    >
      {/* Multiple overlapping gradient layers with different animations */}
      <motion.div
        className="absolute inset-0 bg-gradient-conic from-blue-700/20 via-purple-500/10 to-pink-600/20 blur-[80px]"
        animate={{
          rotate: [0, 360],
          scale: [1, 1.1, 1]
        }}
        transition={{
          rotate: { repeat: Infinity, duration: 60, ease: "linear" },
          scale: { repeat: Infinity, duration: 20, ease: "easeInOut" }
        }}
      />
      <motion.div
        className="absolute inset-0 bg-gradient-conic from-indigo-500/10 via-cyan-400/10 to-violet-700/20 blur-[90px]"
        animate={{
          rotate: [360, 0],
          scale: [1, 1.2, 1]
        }}
        transition={{
          rotate: { repeat: Infinity, duration: 50, ease: "linear" },
          scale: { repeat: Infinity, duration: 15, ease: "easeInOut" }
        }}
      />
      <motion.div
        className="absolute inset-0 bg-gradient-radial from-transparent via-blue-900/5 to-indigo-500/10 blur-[60px]"
        animate={{
          scale: [1, 1.1, 0.9, 1]
        }}
        transition={{
          scale: { repeat: Infinity, duration: 25, ease: "easeInOut" }
        }}
      />
    </motion.div>
  );
};

export default AnimatedBackground;