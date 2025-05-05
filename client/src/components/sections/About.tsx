import { motion } from "framer-motion";
import { ArrowRight, Download } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { content } from "@/data/content";
import { RevealAnimation, RevealContainer, RevealItem } from "@/components/ui/reveal";
import { AnimatedGradientText, AnimatedWords } from "@/components/ui/animated-text";
import { AnimatedGradientBlob } from "@/components/ui/animated-background";

const About = () => {
  return (
    <section id="about" className="py-20 relative overflow-hidden">
      {/* Animated gradient blob with 3D perspective */}
      <AnimatedGradientBlob 
        color1="from-green-400/20" 
        color2="to-emerald-500/20" 
        top="top-40" 
        left="right-20" 
        size="w-[500px] h-[500px]"
        delay={0.2}
      />
      
      <div className="container mx-auto px-6 relative z-10">
        <SectionHeading 
          subtitle="Get to know me" 
          title="About Me" 
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <RevealAnimation 
            type="slide" 
            direction="up"
            duration={0.7}
          >
            <div className="relative">
              <motion.div 
                className="aspect-[4/3] rounded-lg overflow-hidden shadow-xl"
                whileHover={{ 
                  scale: 1.03,
                  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                  rotate: [0, 1, 0, -1, 0]
                }}
                transition={{
                  rotate: { repeat: 2, duration: 0.5 }
                }}
              >
                <img 
                  src={content.workspaceImage}
                  alt="Web development workspace" 
                  className="w-full h-full object-cover"
                />
              </motion.div>
              <motion.div 
                className="absolute -bottom-6 -left-6 w-24 h-24 md:w-32 md:h-32 rounded-lg overflow-hidden shadow-xl border-4 border-background"
                initial={{ opacity: 0, scale: 0.5, y: 20, x: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.5 }}
                whileHover={{ 
                  scale: 1.1,
                  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                  borderColor: 'rgba(59, 130, 246, 0.5)'
                }}
              >
                <img 
                  src={content.codingImage}
                  alt="Coding environment" 
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </div>
          </RevealAnimation>
          
          <RevealContainer delay={0.3} staggerChildren={0.15}>
            <RevealItem>
              <h3 className="text-2xl font-bold mb-6">
                Passionate Full Stack Developer Building{" "}
                <AnimatedGradientText 
                  text="Digital Experiences"
                  from="from-blue-500"
                  to="to-violet-600"
                />
              </h3>
            </RevealItem>
            
            <RevealItem delay={0.1}>
              <div className="text-muted-foreground space-y-4">
                {content.aboutParagraphs.map((paragraph, index) => (
                  <p key={index}>
                    <AnimatedWords 
                      text={paragraph} 
                      staggerChildren={0.01} 
                      delayChildren={0.1 * index}
                      once={true}
                    />
                  </p>
                ))}
              </div>
            </RevealItem>
            
            <RevealItem delay={0.2}>
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {content.personalInfo.map((info, index) => (
                  <motion.div 
                    key={index} 
                    className="p-3 rounded-lg hover:bg-secondary/40 transition-colors"
                    whileHover={{ 
                      scale: 1.05,
                      backgroundColor: 'rgba(100, 150, 255, 0.1)' 
                    }}
                  >
                    <h4 className="font-bold">{info.label}:</h4>
                    <p className={`${info.highlight ? "text-primary" : "text-muted-foreground"}`}>
                      {info.value}
                    </p>
                  </motion.div>
                ))}
              </div>
            </RevealItem>
            
            <RevealItem delay={0.3}>
              <div className="mt-8 flex flex-wrap gap-4">
                <motion.a 
                  href="#contact" 
                  className="px-6 py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:shadow-lg transition-all inline-flex items-center overflow-hidden relative group"
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Contact Me
                    <ArrowRight className="h-4 w-4" />
                  </span>
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-blue-600 to-violet-600 opacity-0 group-hover:opacity-100 transition-opacity"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: 0 }}
                    transition={{ type: 'spring', stiffness: 100 }}
                  />
                </motion.a>
                
                <motion.a 
                  href="#"
                  onClick={(e) => e.preventDefault()} 
                  className="px-6 py-3 border border-border text-foreground font-medium rounded-lg hover:bg-secondary/50 transition-all inline-flex items-center gap-2"
                  whileHover={{ 
                    scale: 1.05, 
                    borderColor: 'rgba(100, 150, 255, 0.8)'
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span>Download CV</span>
                  <Download className="h-4 w-4" />
                </motion.a>
              </div>
            </RevealItem>
          </RevealContainer>
        </div>
      </div>
    </section>
  );
};

export default About;
