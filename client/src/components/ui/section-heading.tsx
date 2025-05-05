import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { AnimatedUnderline } from "./animated-text";
import { RevealItem } from "./reveal";

interface SectionHeadingProps {
  subtitle: string;
  title: string;
  className?: string;
  centered?: boolean;
  description?: string;
}

export const SectionHeading = ({
  subtitle,
  title,
  className,
  centered = false,
  description
}: SectionHeadingProps) => {
  return (
    <RevealItem className={cn("mb-16", centered && "text-center", className)}>
      <div>
        <motion.span 
          className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-primary rounded-full text-sm font-medium mb-4"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {subtitle}
        </motion.span>
        
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
          <AnimatedUnderline text={title} />
        </h2>
        
        {description && (
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            {description}
          </p>
        )}
      </div>
    </RevealItem>
  );
};