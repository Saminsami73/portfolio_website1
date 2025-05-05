import { content } from "@/data/content";

const Footer = () => {
  return (
    <footer className="bg-background py-8 border-t border-border">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <a 
              href="#home" 
              className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-violet-500"
            >
              {content.name}
            </a>
            <p className="text-muted-foreground mt-2">{content.profession}</p>
          </div>
          
          <div className="flex flex-col items-center md:items-end">
            <p className="text-muted-foreground mb-2">© {new Date().getFullYear()} All Rights Reserved</p>
            <a href="#" className="text-primary hover:underline">Privacy Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
