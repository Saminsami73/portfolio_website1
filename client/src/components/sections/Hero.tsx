import { motion } from "framer-motion";
import { ArrowDown, Github, Linkedin, Twitter, Mail } from "lucide-react";
import { content } from "@/data/content";
import { AnimatedCharacters, AnimatedGradientText, AnimatedWords } from "@/components/ui/animated-text";
import { RevealAnimation, RevealContainer, RevealItem } from "@/components/ui/reveal";
import { AnimatedGradientBlob } from "@/components/ui/animated-background";

const Hero = () => {
  return (
    <section id="home" className="min-h-screen pt-20 flex items-center relative overflow-hidden">
      {/* Animated gradient blobs with 3D perspective */}
      <AnimatedGradientBlob 
        color1="from-indigo-400/30" 
        color2="to-blue-500/30" 
        top="top-[25%]" 
        left="left-40" 
        size="w-[400px] h-[400px]"
        delay={0.5}
      />
      <AnimatedGradientBlob 
        color1="from-violet-400/20" 
        color2="to-fuchsia-500/20" 
        top="bottom-20" 
        left="right-20" 
        size="w-[300px] h-[300px]"
        delay={0.7}
      />
      
      <div className="container mx-auto px-6 py-16 z-10 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <RevealContainer staggerChildren={0.1} delay={0.2}>
            <RevealItem className="mb-4">
              <motion.span 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-primary rounded-full text-sm font-medium"
              >
                {content.profession}
              </motion.span>
            </RevealItem>
            
            <RevealItem className="mb-6" delay={0.2}>
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold leading-tight">
                <span className="block">Hi, I'm </span>
                <AnimatedGradientText 
                  text={content.name}
                  className="text-5xl md:text-6xl lg:text-8xl font-bold"
                  from="from-blue-500"
                  to="to-violet-600"
                />
              </h1>
            </RevealItem>
            
            <RevealItem delay={0.3} className="mb-8">
              <div className="text-xl text-muted-foreground max-w-lg">
                <AnimatedWords 
                  text={content.heroDescription} 
                  staggerChildren={0.01}
                />
              </div>
            </RevealItem>
            
            <RevealItem delay={0.4} className="flex flex-wrap gap-4">
              <motion.a 
                href="#projects" 
                className="px-6 py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:shadow-lg transition-all overflow-hidden relative group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10">View My Work</span>
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-blue-600 to-violet-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: 0 }}
                  transition={{ type: 'spring', stiffness: 100 }}
                />
              </motion.a>
              <motion.a 
                href="#contact" 
                className="px-6 py-3 border border-border text-foreground font-medium rounded-lg hover:bg-secondary/50 transition-all"
                whileHover={{ scale: 1.05, borderColor: 'rgba(100, 150, 255, 0.8)' }}
                whileTap={{ scale: 0.95 }}
              >
                Contact Me
              </motion.a>
            </RevealItem>
            
            <RevealItem delay={0.5} className="mt-12">
              <div className="flex space-x-6">
                {content.socialLinks.map((link, index) => (
                  <motion.a 
                    key={index}
                    href={link.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-all"
                    aria-label={link.name}
                    whileHover={{ 
                      scale: 1.2, 
                      rotate: [0, -10, 10, -10, 0],
                      color: '#3b82f6'
                    }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    {link.name === "Github" && <Github className="h-6 w-6" />}
                    {link.name === "Linkedin" && <Linkedin className="h-6 w-6" />}
                    {link.name === "Twitter" && <Twitter className="h-6 w-6" />}
                    {link.name === "Email" && <Mail className="h-6 w-6" />}
                  </motion.a>
                ))}
              </div>
            </RevealItem>
          </RevealContainer>
          
          <RevealAnimation type="scale" direction="none" delay={0.6} duration={0.8} className="flex justify-center lg:justify-end">
            <div className="relative">
              <motion.div 
                className="w-72 h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-4 border-background shadow-xl"
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                  borderColor: 'rgba(59, 130, 246, 0.5)'
                }}
                animate={{ 
                  y: [0, -15, 0],
                  rotate: [0, 2, 0, -2, 0] 
                }}
                transition={{ 
                  y: { duration: 6, repeat: Infinity, ease: 'easeInOut' },
                  rotate: { duration: 10, repeat: Infinity, ease: 'easeInOut' }
                }}
              >
                <img 
                  src={content.profileImage}
                  alt={`${content.name} portrait`}
                  className="w-full h-full object-cover"
                />
              </motion.div>
              <motion.div 
                className="absolute -bottom-6 -right-6 bg-background px-6 py-3 rounded-lg shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1 }}
                whileHover={{ 
                  scale: 1.1,
                  boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                }}
              >
                <span className="text-sm font-medium text-muted-foreground">Based in</span>
                <p className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-violet-500">
                  {content.location}
                </p>
              </motion.div>
            </div>
          </RevealAnimation>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ 
            opacity: [0, 1, 0],
            y: [0, 10, 0]
          }}
          transition={{ 
            duration: 1.5, 
            delay: 2,
            repeat: Infinity,
            repeatDelay: 0.5
          }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden md:block"
        >
          <motion.a 
            href="#about" 
            className="text-muted-foreground p-2 rounded-full border border-muted/20 flex items-center justify-center bg-background/80 backdrop-blur-sm"
            whileHover={{ scale: 1.2, borderColor: 'rgba(100, 150, 255, 0.8)' }}
            whileTap={{ scale: 0.9 }}
          >
            <ArrowDown className="h-6 w-6" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
