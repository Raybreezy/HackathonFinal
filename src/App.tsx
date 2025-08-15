import { HeroSection } from "./components/HeroSection";
import { AboutSection } from "./components/AboutSection";
import { PrizesSection } from "./components/PrizesSection";
import { SponsorsSection } from "./components/SponsorsSection";
import { FAQSection } from "./components/FAQSection";

export default function App() {
  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      <AboutSection />
      <PrizesSection />
      <SponsorsSection />
      <FAQSection />
    </div>
  );
}