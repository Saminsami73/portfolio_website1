import { ReactNode } from "react";

interface SkillItem {
  name: string;
  percentage: number;
}

interface SkillCategory {
  title: string;
  iconName: string; // Changed to iconName instead of actual React component
  skills: SkillItem[];
}

interface TechIcon {
  name: string;
  iconClass: string; // Changed to icon class name instead of actual React component
}

interface PersonalInfo {
  label: string;
  value: string;
  highlight?: boolean;
}

interface Project {
  title: string;
  description: string;
  image: string;
  technologies: string[];
  githubUrl: string;
  demoUrl: string;
}

interface SocialLink {
  name: string;
  url: string;
}

interface ContactInfo {
  email: string;
  location: string;
  phone: string;
}

interface SocialPlatform {
  name: string;
  url: string;
}

export const content = {
  name: "Samin Sami",
  profession: "Full Stack Web Developer",
  location: "Bangladesh",
  heroDescription: "I build exceptional digital experiences that are fast, accessible, and visually appealing. Based in Bangladesh.",
  profileImage: "https://raw.githubusercontent.com/Saminsami73/new-port-image/refs/heads/main/me%20port%20pic.jpg",
  workspaceImage: "https://raw.githubusercontent.com/Saminsami73/new-port-image/refs/heads/main/WhatsApp%20Image%202025-05-05%20at%209.22.46%20PM.jpeg",
  codingImage: "https://raw.githubusercontent.com/Saminsami73/new-port-image/refs/heads/main/WhatsApp%20Image%202025-05-05%20at%209.13.48%20PM.jpeg",
  
  aboutParagraphs: [
    "Hello! I'm Samin, a full stack web developer based in Bangladesh with a passion for creating interactive digital experiences. I enjoy taking complex problems and turning them into simple and beautiful interface designs.",
    "My journey in web development started in 2016, and I've been improving my skills ever since. I specialize in building applications using modern technologies that deliver fast, robust, and scalable products.",
    "When I'm not coding, you can find me exploring new technologies, contributing to open-source projects, or enjoying a good cup of coffee while reading tech blogs."
  ],
  
  personalInfo: [
    { label: "Name", value: "Samin Sami" },
    { label: "Email", value: "saminsami73@gmail.com" },
    { label: "From", value: "Bangladesh" },
    { label: "Availability", value: "Available for work", highlight: true }
  ],
  
  skillCategories: [
    {
      title: "Frontend Development",
      iconName: "Code",
      skills: [
        { name: "HTML/CSS", percentage: 95 },
        { name: "JavaScript", percentage: 90 },
        { name: "React", percentage: 85 }
      ]
    },
    {
      title: "Backend Development",
      iconName: "Server",
      skills: [
        { name: "Node.js", percentage: 85 },
        { name: "Express", percentage: 80 },
        { name: "MongoDB", percentage: 75 }
      ]
    },
    {
      title: "Tools & Others",
      iconName: "Wrench",
      skills: [
        { name: "Git & GitHub", percentage: 90 },
        { name: "AWS", percentage: 70 },
        { name: "Docker", percentage: 65 }
      ]
    }
  ],
  
  techIcons: [
    { name: "React", iconClass: "fab fa-react text-blue-500" },
    { name: "Node.js", iconClass: "fab fa-node-js text-green-600" },
    { name: "JavaScript", iconClass: "fab fa-js text-yellow-500" },
    { name: "HTML5", iconClass: "fab fa-html5 text-orange-500" },
    { name: "CSS3", iconClass: "fab fa-css3-alt text-blue-600" },
    { name: "Git", iconClass: "fab fa-git-alt text-red-500" }
  ],
  
  projects: [
    {
      title: "E-commerce Platform",
      description: "A full-featured e-commerce platform with payment integration, user authentication, and admin dashboard.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1015&q=80",
      technologies: ["React", "Node.js", "MongoDB"],
      githubUrl: "https://github.com/Saminsami73",
      demoUrl: ""
    },
    {
      title: "Task Management App",
      description: "A productivity app that helps teams organize tasks, track progress, and collaborate effectively.",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1050&q=80",
      technologies: ["React", "Firebase", "Redux"],
      githubUrl: "https://github.com/Saminsami73",
      demoUrl: ""
    },
    {
      title: "Social Media Dashboard",
      description: "Analytics dashboard that tracks social media performance metrics and engagement in real-time.",
      image: "https://images.unsplash.com/photo-1520333789090-1afc82db536a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1051&q=80",
      technologies: ["Vue.js", "Express", "Chart.js"],
      githubUrl: "https://github.com/Saminsami73",
      demoUrl: ""
    }
  ],
  
  allProjectsUrl: "https://github.com/Saminsami73",
  
  socialLinks: [
    { name: "Github", url: "https://github.com/Saminsami73" },
    { name: "Linkedin", url: "https://www.linkedin.com/in/samin-sami-96534417a/" },
    { name: "Twitter", url: "https://x.com/SaminSami8" },
    { name: "Email", url: "mailto:hello@saminsami.com" }
  ],
  
  contactInfo: {
    email: "saminsami73@gmail.com",
    location: "Dhaka, Bangladesh",
    phone: "+880 1705143675"
  },
  
  socialPlatforms: [
    { name: "Github", url: "https://github.com/Saminsami73" },
    { name: "Linkedin", url: "https://www.linkedin.com/in/samin-sami-96534417a/" },
    { name: "Twitter", url: "https://x.com/SaminSami8" },
    { name: "Instagram", url: "https://www.instagram.com/samin_sami__official/" }
  ]
};
