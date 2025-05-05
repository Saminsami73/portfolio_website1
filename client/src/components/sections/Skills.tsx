import { useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { SectionHeading } from "@/components/ui/section-heading";
import { content } from "@/data/content";
import { Code, Server, Wrench } from "lucide-react";

interface SkillBarProps {
  name: string;
  percentage: number;
  delay: number;
}

// Helper function to get icon component from icon name
const getIconComponent = (iconName: string) => {
  switch (iconName) {
    case "Code":
      return <Code />;
    case "Server":
      return <Server />;
    case "Wrench":
      return <Wrench />;
    default:
      return <Code />;
  }
};

const SkillBar = ({ name, percentage, delay }: SkillBarProps) => {
  const controls = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (inView) {
      controls.start({
        width: `${percentage}%`,
        transition: { duration: 1, delay: delay }
      });
    }
  }, [controls, inView, percentage, delay]);

  return (
    <div className="mb-6" ref={ref}>
      <div className="flex justify-between items-center mb-2">
        <span className="font-medium">{name}</span>
        <span className="text-sm text-muted-foreground">{percentage}%</span>
      </div>
      <div className="h-2 bg-secondary rounded overflow-hidden">
        <motion.div 
          className="h-full bg-primary rounded"
          initial={{ width: 0 }}
          animate={controls}
        />
      </div>
    </div>
  );
};

const SkillCard = ({ 
  iconName, 
  title, 
  skills, 
  delay 
}: { 
  iconName: string; 
  title: string; 
  skills: { name: string; percentage: number }[]; 
  delay: number;
}) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: delay * 0.1 }}
      className="bg-card rounded-xl shadow-lg p-8"
    >
      <div className="text-4xl text-primary mb-6">
        {getIconComponent(iconName)}
      </div>
      <h3 className="text-xl font-bold mb-6">{title}</h3>
      
      {skills.map((skill, index) => (
        <SkillBar 
          key={index} 
          name={skill.name} 
          percentage={skill.percentage} 
          delay={index * 0.1 + delay * 0.1}
        />
      ))}
    </motion.div>
  );
};

const TechIcon = ({ iconClass, name, index }: { iconClass: string; name: string; index: number }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.05 + 0.3 }}
      className="flex flex-col items-center p-4 bg-card rounded-lg shadow-md"
    >
      <div className="text-4xl mb-3">
        <i className={iconClass}></i>
      </div>
      <span className="text-sm font-medium">{name}</span>
    </motion.div>
  );
};

const Skills = () => {
  return (
    <section id="skills" className="py-20 bg-secondary/30 relative overflow-hidden">
      {/* Background gradient elements */}
      <div className="absolute inset-0 z-0 opacity-10 dark:opacity-5">
        <div className="absolute bottom-40 left-20 w-60 h-60 rounded-full bg-yellow-300 dark:bg-yellow-600 blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <SectionHeading 
          subtitle="My expertise" 
          title="Skills & Technologies" 
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {content.skillCategories.map((category, index) => (
            <SkillCard 
              key={index}
              iconName={category.iconName}
              title={category.title}
              skills={category.skills}
              delay={index + 1}
            />
          ))}
        </div>
        
        <div className="mt-16 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {content.techIcons.map((tech, index) => (
            <TechIcon 
              key={index}
              iconClass={tech.iconClass}
              name={tech.name}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
