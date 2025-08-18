import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Calendar, MapPin } from "lucide-react";
import roboticsImage from "/banner.png";
import titleImage from "/Title.png";

interface HeroSectionProps {
  onRegisterClick: () => void;
}

export function HeroSection({ onRegisterClick }: HeroSectionProps) {
  return (
    <section 
      className="relative h-screen flex items-center justify-center px-6"
      style={{
        backgroundImage: `url(${roboticsImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
        filter: 'contrast(1.1) saturate(1.1)'
      }}
    >

      
      <div className="relative max-w-4xl mx-auto text-center space-y-8 z-10">
        <Badge variant="secondary" className="mb-4 bg-white/90 text-black">
          Registration Open
        </Badge>
        
        <div className="flex justify-center mb-8">
          <img 
            src={titleImage} 
            alt="Reborn x Roboverse x Unitree Global Hackathon" 
            className="max-w-full h-auto drop-shadow-lg mx-auto"
            style={{ maxHeight: '2700px', marginLeft: '-5px' }}
          />
        </div>
        
        <h2 className="text-base md:text-3xl lg:text-4xl font-bold text-white drop-shadow-lg mb-6">
          Global Hackathon
        </h2>
        
        <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto drop-shadow-md">
          The ultimate robotics + simulation challenge is here! Challenge yourself whilst learning about robotics simulation. For developers of all level whether you are familiar with robotics simulation or complete beginners
        </p>
        
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center text-sm">
          <div className="flex items-center gap-2 text-white/90">
            <Calendar className="h-5 w-5 text-white" />
            <span>September 29- October 6, 2025</span>
          </div>
          <div className="flex items-center gap-2 text-white/90">
            <MapPin className="h-5 w-5 text-white" />
            <span>Virtual</span>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            size="lg" 
            className="text-lg px-8 py-6 bg-white text-black hover:bg-white/90"
            onClick={onRegisterClick}
          >
            Register Now
          </Button>
          <Button 
            variant="outline" 
            size="lg" 
            className="text-lg px-8 py-6 bg-white text-black border-white hover:bg-white/90"
            asChild
          >
            <a href="https://roboverseorg.github.io/" target="_blank" rel="noopener noreferrer">
              Learn More
            </a>
          </Button>
        </div>
        
        <div className="text-sm text-white/80">
          Registration closes on September 28th, 2025
        </div>
      </div>
    </section>
  );
}