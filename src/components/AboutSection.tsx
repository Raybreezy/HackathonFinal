
import robotDemoImage from '/Users/lawrenceopferkuch/Downloads/roboverse.png';

export function AboutSection() {
  return (
    <section className="pb-8 px-6 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            About <a href="https://roboverseorg.github.io/" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary/80 transition-colors underline decoration-2 underline-offset-4">Roboverse</a>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Roboverse is a comprehensive framework comprising a simulation platform, synthetic dataset and unified benchmarks.
            Our simulation platform supports multiple simulators and robotic embodiments,enabling seamless transitions between different 
            environments.
          </p>
        </div>
        
        {/* Robot Demo Image */}
        <div className="mb-16 text-center">
          <img 
            src={robotDemoImage}
            alt="Robot demonstrations and experiments"
            className="w-full max-w-4xl mx-auto rounded-lg shadow-lg"
          />
        </div>
        
        <div className="mb-16">
          <h3 className="text-2xl font-semibold mb-8 text-center">
            Tracks
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center">
              <h4 className="text-xl font-semibold mb-4">
                Beginner Track
              </h4>
              <p className="text-muted-foreground">
                Perfect for newcomers to robotics and AI. This track focuses on foundational concepts 
                and provides a guided challenge for teams. Resources will be provided once the hackathon begins for aid teams.
              </p>
            </div>
            <div className="text-center">
              <h4 className="text-xl font-semibold mb-4">
                Advanced Track
              </h4>
              <p className="text-muted-foreground">
                Designed for teams that are familiar with robotics and robotics simulation. This track provided is more open ended, with
                task specifics being highlighted prior to the official start date. 
              </p>
            </div>
            <div className="text-center">
              <h4 className="text-xl font-semibold mb-4">
                Finalist Track
              </h4>
              <p className="text-muted-foreground">
                Top 8 from the advanced track will have the ability to train their policies in real robots courtesy of Unitree.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}