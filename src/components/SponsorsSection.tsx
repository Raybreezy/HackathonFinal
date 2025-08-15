import { Card } from "./ui/card";

const sponsors = [
  {
    name: "Unitree",
    image: "/sponsors/unitree.png",
    logo: null
  },
  {
    name: "AWS",
    image: "/sponsors/aws_startups.png",
    logo: "AWS"
  },
  {
    name: "Intel",
    image: "/sponsors/Intel Logo.png",
    logo: "IN"
  },
  {
    name: "Coohom",
    image: "/sponsors/黑色组合.png",
    logo: "CH"
  },
  {
    name: "BAIR",
    image: "/sponsors/BAIR.png",
    logo: "BR"
  },
  {
    name: "Akash",
    image: "/sponsors/Akash.png",
    logo: "AK"
  },
  {
    name: "Rokae",
    image: "/sponsors/1755239885030.jpg",
    logo: "RK"
  },
  {
    name: "Tianji",
    image: "/sponsors/1755239892665.jpg",
    logo: "TJ"
  }
];

export function SponsorsSection() {
  return (
    <section className="py-16 px-6 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Sponsors
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            We're grateful to our sponsors who make this hackathon possible.
          </p>
        </div>
        
        <div className="flex justify-center gap-8 flex-wrap">
          {sponsors.map((sponsor, index) => (
            <Card key={index} className="p-8 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-center w-48 h-30">
                {sponsor.image ? (
                  sponsor.name === "Coohom" ? (
                    <a href="https://www.spatial-verse.com/" target="_blank" rel="noopener noreferrer">
                      <img 
                        src={sponsor.image} 
                        alt={`${sponsor.name} logo`}
                        className="object-contain w-72 h-48 hover:opacity-80 transition-opacity cursor-pointer"
                      />
                    </a>
                  ) : sponsor.name === "Unitree" ? (
                    <a href="https://www.unitree.com/" target="_blank" rel="noopener noreferrer">
                      <img 
                        src={sponsor.image} 
                        alt={`${sponsor.name} logo`}
                        className="object-contain w-36 h-24 hover:opacity-80 transition-opacity cursor-pointer"
                      />
                    </a>
                  ) : sponsor.name === "AWS" ? (
                    <a href="https://aws.amazon.com/startups?lang=en-US" target="_blank" rel="noopener noreferrer">
                      <img 
                        src={sponsor.image} 
                        alt={`${sponsor.name} logo`}
                        className="object-contain w-36 h-24 hover:opacity-80 transition-opacity cursor-pointer"
                      />
                    </a>
                  ) : sponsor.name === "Intel" ? (
                    <a href="https://www.intel.com/content/www/us/en/homepage.html" target="_blank" rel="noopener noreferrer">
                      <img 
                        src={sponsor.image} 
                        alt={`${sponsor.name} logo`}
                        className="object-contain w-36 h-24 hover:opacity-80 transition-opacity cursor-pointer"
                      />
                    </a>
                  ) : sponsor.name === "BAIR" ? (
                    <a href="https://bair.berkeley.edu/" target="_blank" rel="noopener noreferrer">
                      <img 
                        src={sponsor.image} 
                        alt={`${sponsor.name} logo`}
                        className="object-contain w-36 h-24 hover:opacity-80 transition-opacity cursor-pointer"
                      />
                    </a>
                  ) : sponsor.name === "Akash" ? (
                    <a href="https://akash.network/" target="_blank" rel="noopener noreferrer">
                      <img 
                        src={sponsor.image} 
                        alt={`${sponsor.name} logo`}
                        className="object-contain w-36 h-24 hover:opacity-80 transition-opacity cursor-pointer"
                      />
                    </a>
                  ) : sponsor.name === "Rokae" ? (
                    <a href="https://www.rokae.com/" target="_blank" rel="noopener noreferrer">
                      <img 
                        src={sponsor.image} 
                        alt={`${sponsor.name} logo`}
                        className="object-contain w-36 h-24 hover:opacity-80 transition-opacity cursor-pointer"
                      />
                    </a>
                  ) : sponsor.name === "Tianji" ? (
                    <a href="https://www.tianji.com/" target="_blank" rel="noopener noreferrer">
                      <img 
                        src={sponsor.image} 
                        alt={`${sponsor.name} logo`}
                        className="object-contain w-36 h-24 hover:opacity-80 transition-opacity cursor-pointer"
                      />
                    </a>
                  ) : (
                    <img 
                      src={sponsor.image} 
                      alt={`${sponsor.name} logo`}
                      className="object-contain w-36 h-24"
                    />
                  )
                ) : (
                  <div className="w-20 h-16 bg-primary/10 rounded-lg flex items-center justify-center">
                    <span className="text-xl font-bold text-primary">{sponsor.logo}</span>
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-16">
          <p className="text-muted-foreground mb-4">
            Interested in sponsoring future events?
          </p>
          <a href="mailto:hackathon@reborn-ai.xyz" className="text-primary hover:underline font-medium">
            Contact us
          </a>
        </div>
      </div>
    </section>
  );
}