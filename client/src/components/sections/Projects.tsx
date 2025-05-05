import { motion } from "framer-motion";
import { ArrowRight, Github, ExternalLink } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { content } from "@/data/content";

const ProjectCard = ({ 
  project, 
  index 
}: { 
  project: typeof content.projects[0]; 
  index: number;
}) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group bg-card rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all hover:-translate-y-2"
    >
      <div className="relative overflow-hidden h-48">
        <img 
          src={project.image} 
          alt={project.title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
          <div className="p-4">
            <h3 className="text-white text-xl font-bold">{project.title}</h3>
          </div>
        </div>
      </div>
      <div className="p-6">
        <p className="text-muted-foreground mb-4">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.map((tech, idx) => (
            <span 
              key={idx} 
              className="px-2 py-1 text-xs bg-secondary text-secondary-foreground rounded"
            >
              {tech}
            </span>
          ))}
        </div>
        <div className="flex justify-between items-center">
          <a 
            href={project.demoUrl} 
            className="text-primary hover:underline flex items-center"
            target="_blank" 
            rel="noopener noreferrer"
          >
            <span>View Details</span>
            <ArrowRight className="ml-1 h-4 w-4" />
          </a>
          <div className="flex gap-3">
            <a 
              href={project.githubUrl} 
              className="text-muted-foreground hover:text-primary transition-colors"
              target="_blank" 
              rel="noopener noreferrer"
              aria-label={`${project.title} GitHub repository`}
            >
              <Github className="h-5 w-5" />
            </a>
            <a 
              href={project.demoUrl} 
              className="text-muted-foreground hover:text-primary transition-colors"
              target="_blank" 
              rel="noopener noreferrer"
              aria-label={`${project.title} live demo`}
            >
              <ExternalLink className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Projects = () => {
  return (
    <section id="projects" className="py-20 relative overflow-hidden">
      {/* Background gradient elements */}
      <div className="absolute inset-0 z-0 opacity-10 dark:opacity-5">
        <div className="absolute top-20 left-1/3 w-60 h-60 rounded-full bg-pink-300 dark:bg-pink-600 blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <SectionHeading 
          subtitle="My work" 
          title="Featured Projects" 
          description="Here are some of my recent projects. Each project is uniquely designed and developed to solve specific problems."
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {content.projects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12 text-center"
        >
          <a 
            href={content.allProjectsUrl} 
            className="inline-flex items-center px-6 py-3 border border-border text-foreground font-medium rounded-lg hover:bg-secondary/50 transition-all"
            target="_blank" 
            rel="noopener noreferrer"
          >
            <span>View All Projects</span>
            <ArrowRight className="ml-2 h-4 w-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
