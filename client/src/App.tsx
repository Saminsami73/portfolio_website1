import { useEffect, useState } from "react";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Hero from "./components/sections/Hero";
import About from "./components/sections/About";
import Skills from "./components/sections/Skills";
import Projects from "./components/sections/Projects";
import Contact from "./components/sections/Contact";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useScrollSpy } from "./hooks/use-scroll-spy";
import { ThemeProvider } from "@/components/ThemeProvider";
import AnimatedBackground, { AnimatedGradientBlob, AnimatedNebula } from "@/components/ui/animated-background";
import AnimatedCursor from "@/components/ui/animated-cursor";
import { ScrollProgressBar, ScrollToTopButton } from "@/components/ui/scroll-progress";
import { PageLoader } from "@/components/ui/loader";
import { AnimatePresence, motion } from "framer-motion";

function App() {
  const activeSection = useScrollSpy();
  const [isLoading, setIsLoading] = useState(true);

  // Enable smooth scrolling
  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
    
    // Simulate page loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    
    return () => {
      document.documentElement.style.scrollBehavior = "auto";
      clearTimeout(timer);
    };
  }, []);

  return (
    <ThemeProvider>
      <TooltipProvider>
        <AnimatePresence mode="wait">
          {isLoading && <PageLoader />}
        </AnimatePresence>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: isLoading ? 2 : 0 }}
        >
          <Toaster />
          <AnimatedCursor />
          <ScrollProgressBar />
          <ScrollToTopButton />
          
          {/* Advanced interactive background elements */}
          <AnimatedBackground />
          <AnimatedNebula opacity="opacity-30" delay={0.5} />
          
          {/* 3D gradient blobs with enhanced animations */}
          <AnimatedGradientBlob 
            color1="from-blue-400/20" 
            color2="to-violet-500/20" 
            top="top-20" 
            left="left-20" 
            size="w-[600px] h-[600px]"
          />
          <AnimatedGradientBlob 
            color1="from-purple-400/20" 
            color2="to-indigo-500/20" 
            top="top-[60%]" 
            left="right-20" 
            size="w-[500px] h-[500px]"
            delay={0.3}
          />
          <AnimatedGradientBlob 
            color1="from-emerald-400/10" 
            color2="to-cyan-500/20" 
            top="top-[30%]" 
            left="left-[40%]" 
            size="w-[400px] h-[400px]"
            delay={0.6}
          />
          
          <Navbar activeSection={activeSection} />
          <main>
            <Hero />
            <About />
            <Skills />
            <Projects />
            <Contact />
          </main>
          <Footer />
        </motion.div>
      </TooltipProvider>
    </ThemeProvider>
  );
}

export default App;
