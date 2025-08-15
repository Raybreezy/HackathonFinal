import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Trophy, Medal, Award, Users, Crown, MapPin, Calendar, Star, HandHeart } from "lucide-react";

export function PrizesSection() {
  const beginnerPrizes = [
    {
      position: "1st Place",
      icon: <Crown className="h-12 w-12 text-gray-800" />,
      prize: "$3,200",
      badge: "Winner",
      badgeColor: "bg-gray-900 text-white",
      showBadge: true
    },
    {
      position: "2nd Place", 
      icon: <Trophy className="h-10 w-10 text-gray-600" />,
      prize: "$2,100",
      badge: "Runner-up",
      badgeColor: "bg-gray-100 text-gray-800",
      showBadge: false
    },
    {
      position: "3rd Place",
      icon: <Medal className="h-10 w-10 text-gray-600" />,
      prize: "$1,500",
      badge: "Third Place",
      badgeColor: "bg-gray-200 text-gray-800",
      showBadge: false
    },
    {
      position: "4th Place",
      icon: <Award className="h-10 w-10 text-gray-500" />,
      prize: "$1,200",
      badge: "Fourth Place",
      badgeColor: "bg-gray-300 text-gray-800",
      showBadge: false
    }
  ];

  const advancedPrizes = [
    {
      position: "1st Place",
      icon: <Crown className="h-12 w-12 text-gray-800" />,
      prize: "$6,400",
      badge: "Champion",
      badgeColor: "bg-gray-900 text-white",
      showBadge: true
    },
    {
      position: "2nd Place", 
      icon: <Trophy className="h-10 w-10 text-gray-600" />,
      prize: "$4,200",
      badge: "Runner-up",
      badgeColor: "bg-gray-100 text-gray-800",
      showBadge: false
    },
    {
      position: "3rd Place",
      icon: <Medal className="h-10 w-10 text-gray-600" />,
      prize: "$3,000",
      badge: "Third Place",
      badgeColor: "bg-gray-200 text-gray-800",
      showBadge: false
    },
    {
      position: "4th Place",
      icon: <Award className="h-10 w-10 text-gray-500" />,
      prize: "$2,400",
      badge: "Fourth Place",
      badgeColor: "bg-gray-300 text-gray-800",
      showBadge: false
    }
  ];

  return (
    <section className="py-20 px-6 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Prizes & Awards
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Two virtual tracks with different prize structures and a final offline 
            finalist track - $50,000 total in prizes
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center flex-wrap">
            <div className="flex items-center gap-2">
              <Badge className="bg-gray-100 text-gray-800">Beginner Track</Badge>
              <span className="font-semibold">$10,000 Prize Pool</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge className="bg-gray-900 text-white">Advanced Track</Badge>
              <span className="font-semibold">$20,000 Prize Pool</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge className="bg-gray-600 text-white">Finalist Track</Badge>
              <span className="font-semibold">$20,000 Prize Pool</span>
            </div>
          </div>
        </div>
        
        {/* Beginner Track */}
        <div className="mb-16">
          <h3 className="text-2xl font-semibold text-center mb-8 flex items-center justify-center gap-3">
            <Badge className="bg-gray-100 text-gray-800">Beginner Track</Badge>
            <span>$10,000 Prize Pool</span>
          </h3>
          
          {/* Top 4 Prizes */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {beginnerPrizes.map((prize, index) => (
              <Card key={index} className={`text-center p-6 hover:shadow-lg transition-shadow ${index === 0 ? 'ring-2 ring-gray-300 bg-gray-50/50' : ''}`}>
                <CardHeader className="pb-4">
                  <div className="flex justify-center mb-4">
                    {prize.icon}
                  </div>
                  {prize.showBadge && (
                    <Badge className={`mb-2 ${prize.badgeColor}`}>
                      {prize.badge}
                    </Badge>
                  )}
                  <CardTitle className="text-lg">
                    {prize.position}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-primary">
                    {prize.prize}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {/* 5th-10th Place */}
          <Card className="max-w-md mx-auto text-center p-6 bg-gray-50/50 ring-2 ring-gray-200">
            <CardHeader className="pb-4">
              <div className="flex justify-center mb-4">
                <Award className="h-10 w-10 text-gray-500" />
              </div>
              <CardTitle className="text-lg">
                5th - 10th Place
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary mb-2">
                $400
              </div>
              <p className="text-sm text-muted-foreground">
                Each of the six participants
              </p>
            </CardContent>
          </Card>
        </div>
        
        {/* Advanced Track */}
        <div className="mb-12">
          <h3 className="text-2xl font-semibold text-center mb-8 flex items-center justify-center gap-3">
            <Badge className="bg-gray-900 text-white">Advanced Track</Badge>
            <span>$20,000 Prize Pool</span>
          </h3>
          
          {/* Top 4 Prizes */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {advancedPrizes.map((prize, index) => (
              <Card key={index} className={`text-center p-6 hover:shadow-lg transition-shadow ${index === 0 ? 'ring-2 ring-gray-300 bg-gray-50/50' : ''}`}>
                <CardHeader className="pb-4">
                  <div className="flex justify-center mb-4">
                    {prize.icon}
                  </div>
                  {prize.showBadge && (
                    <Badge className={`mb-2 ${prize.badgeColor}`}>
                      {prize.badge}
                    </Badge>
                  )}
                  <CardTitle className="text-lg">
                    {prize.position}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-primary">
                    {prize.prize}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {/* 5th-8th Place */}
          <Card className="max-w-md mx-auto text-center p-6 bg-gray-50/50 ring-2 ring-gray-200">
            <CardHeader className="pb-4">
              <div className="flex justify-center mb-4">
                <Award className="h-10 w-10 text-gray-500" />
              </div>
              <CardTitle className="text-lg">
                5th - 8th Place
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary mb-2">
                $1,000
              </div>
              <p className="text-sm text-muted-foreground">
                Each of the four participants
              </p>
            </CardContent>
          </Card>
        </div>
        
        {/* Finalist Track */}
        <div className="mt-20 pt-16 border-t border-border">
          <div className="text-center mb-16">
            <h3 className="text-2xl md:text-3xl font-bold mb-6">
              Finalist Track $20,000 Prize Pool
            </h3>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Top finalists from the Advanced Track will be invited to an exclusive offline hackathon 
              in Berkeley, where they'll work with real Unitree G1 robots and compete for additional prizes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {/* Location Card */}
            <Card className="text-center p-6 bg-white/70 backdrop-blur-sm border-gray-200">
              <CardHeader className="pb-4">
                <div className="flex justify-center mb-4">
                  <MapPin className="h-12 w-12 text-gray-600" />
                </div>
                <CardTitle className="text-xl">
                  Berkeley, California
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Exclusive in-person event at for training real robot policies and then showcasing your work to the world in Berkeley.
                </p>
              </CardContent>
            </Card>

            {/* Real Robots Card */}
            <Card className="text-center p-6 bg-white/70 backdrop-blur-sm border-gray-200">
              <CardHeader className="pb-4">
                <div className="flex justify-center mb-4">
                  <Star className="h-12 w-12 text-gray-600" />
                </div>
                <CardTitle className="text-xl">
                  Real Unitree G1 Robots
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Work hands-on with cutting-edge Unitree G1 humanoid robots, deploying your policies into real hardware.
                </p>
              </CardContent>
            </Card>

            {/* Hands on Support Card */}
            <Card className="text-center p-6 bg-white/70 backdrop-blur-sm border-gray-200">
              <CardHeader className="pb-4">
                <div className="flex justify-center mb-4">
                  <HandHeart className="h-12 w-12 text-gray-600" />
                </div>
                <CardTitle className="text-xl">
                  Hands on Support
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Receive hands on support from the Reborn team for deployment and maintenance from the team at Unitree.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Selection Criteria */}
          <Card className="max-w-4xl mx-auto p-8 bg-white/80 backdrop-blur-sm border-2 border-gray-200">
            <CardHeader className="text-center pb-6">
              <div className="flex justify-center mb-4">
                <Award className="h-16 w-16 text-gray-600" />
              </div>
              <Badge className="bg-gray-100 text-gray-800 mb-4">
                Selection Process
              </Badge>
              <CardTitle className="text-2xl">
                How to Qualify for the Finalist Track
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <Users className="h-5 w-5 text-gray-600" />
                    Qualification Requirements
                  </h4>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Place in top 8 of Advanced Track</li>
                    <li>• Ability to travel to SF</li>
                    <li>• If the whole team cannot make it to SF, can combine with other teams within the top 8</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-gray-600" />
                    What to Expect
                  </h4>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Intensive robotics workshop with real Unitree G1s</li>
                    <li>• Mentorship from Reborn and other mentors</li>
                    <li>• Presenting real demonstrations to top robotics professionals</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}