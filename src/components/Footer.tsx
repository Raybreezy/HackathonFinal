import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { Mail, MapPin, Phone, Twitter, Linkedin, Github, Instagram } from "lucide-react";

export function Footer() {
  const socialLinks = [
    { icon: <Twitter className="h-5 w-5" />, href: "#", label: "Twitter" },
    { icon: <Linkedin className="h-5 w-5" />, href: "#", label: "LinkedIn" },
    { icon: <Github className="h-5 w-5" />, href: "#", label: "GitHub" },
    { icon: <Instagram className="h-5 w-5" />, href: "#", label: "Instagram" }
  ];

  const quickLinks = [
    { name: "About", href: "#about" },
    { name: "Schedule", href: "#schedule" },
    { name: "Prizes", href: "#prizes" },
    { name: "Sponsors", href: "#sponsors" },
    { name: "FAQ", href: "#faq" },
    { name: "Contact", href: "#contact" }
  ];

  return (
    <footer id="contact" className="bg-primary text-primary-foreground">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Event Info */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold">TechHack 2025</h3>
            <p className="text-primary-foreground/80">
              48 hours of innovation, collaboration, and building the future together.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((link, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  size="sm"
                  className="text-primary-foreground/80 hover:text-primary-foreground p-2"
                  asChild
                >
                  <a href={link.href} aria-label={link.label}>
                    {link.icon}
                  </a>
                </Button>
              ))}
            </div>
          </div>
          
          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Quick Links</h4>
            <nav className="flex flex-col space-y-2">
              {quickLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </nav>
          </div>
          
          {/* Event Details */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Event Details</h4>
            <div className="space-y-3 text-primary-foreground/80">
              <div className="flex items-start gap-2">
                <MapPin className="h-5 w-5 mt-0.5 flex-shrink-0" />
                <div>
                  <div>Tech Innovation Center</div>
                  <div>123 Innovation Blvd</div>
                  <div>San Francisco, CA 94105</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-5 w-5" />
                <span>(555) 123-4567</span>
              </div>
            </div>
          </div>
          
          {/* Contact */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Get In Touch</h4>
            <div className="space-y-3 text-primary-foreground/80">
              <div className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                <a href="mailto:hello@techhack2025.com" className="hover:text-primary-foreground transition-colors">
                  hello@techhack2025.com
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                <a href="mailto:sponsors@techhack2025.com" className="hover:text-primary-foreground transition-colors">
                  sponsors@techhack2025.com
                </a>
              </div>
            </div>
            <Button variant="secondary" className="w-full mt-4">
              Register Now
            </Button>
          </div>
        </div>
        
        <Separator className="bg-primary-foreground/20 mb-8" />
        
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-primary-foreground/60">
          <div>
            © 2025 TechHack. All rights reserved.
          </div>
          <div className="flex gap-6 text-sm">
            <a href="#" className="hover:text-primary-foreground transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-primary-foreground transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-primary-foreground transition-colors">
              Code of Conduct
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}