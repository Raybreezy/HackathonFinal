import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Trophy, MapPin, Calendar, Users, Star, Award } from "lucide-react";

export function FinalistTrackSection() {
  return (
    <section className="py-20 px-6 bg-gradient-to-br from-purple-50 to-blue-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <Badge className="bg-purple-100 text-purple-800 mb-4">
            Exclusive Opportunity
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Finalist Track
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Top finalists from the Advanced Track will be invited to an exclusive offline hackathon 
            in Berkeley, where they'll work with real Unitree G1 robots and compete for additional prizes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {/* Location Card */}
          <Card className="text-center p-6 bg-white/70 backdrop-blur-sm border-purple-200">
            <CardHeader className="pb-4">
              <div className="flex justify-center mb-4">
                <MapPin className="h-12 w-12 text-purple-600" />
              </div>
              <CardTitle className="text-xl">
                Berkeley, California
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Exclusive in-person event for training policies on real robots and a well known location to demonstrate.
              </p>
            </CardContent>
          </Card>

          {/* Real Robots Card */}
          <Card className="text-center p-6 bg-white/70 backdrop-blur-sm border-blue-200">
            <CardHeader className="pb-4">
              <div className="flex justify-center mb-4">
                <Star className="h-12 w-12 text-blue-600" />
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

          {/* Elite Competition Card */}
          <Card className="text-center p-6 bg-white/70 backdrop-blur-sm border-yellow-200">
            <CardHeader className="pb-4">
              <div className="flex justify-center mb-4">
                <Trophy className="h-12 w-12 text-yellow-600" />
              </div>
              <CardTitle className="text-xl">
                Elite Competition
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Compete alongside the best robotics minds in an intensive, high-stakes environment.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Selection Criteria */}
        <Card className="max-w-4xl mx-auto p-8 bg-white/80 backdrop-blur-sm border-2 border-purple-200">
          <CardHeader className="text-center pb-6">
            <div className="flex justify-center mb-4">
              <Award className="h-16 w-16 text-purple-600" />
            </div>
            <Badge className="bg-purple-100 text-purple-800 mb-4">
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
                  <Users className="h-5 w-5 text-purple-600" />
                  Qualification Requirements
                </h4>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Place in top 8 of Advanced Track</li>
                  <li>• Demonstrate exceptional technical innovation</li>
                  <li>• Show real-world application potential</li>
                  <li>• Pass technical review by expert panel</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-blue-600" />
                  What to Expect
                </h4>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• 3-day intensive robotics workshop</li>
                  <li>• Mentorship from industry experts</li>
                  <li>• Access to state-of-the-art facilities</li>
                  <li>• Networking with top robotics professionals</li>
                </ul>
              </div>
            </div>
            
            <div className="mt-8 p-6 bg-gradient-to-r from-purple-100 to-blue-100 rounded-lg">
              <h4 className="font-semibold mb-2 text-center">Additional Benefits</h4>
              <p className="text-center text-muted-foreground">
                Finalists will receive travel stipends, accommodation coverage, and exclusive access to 
                Unitree's latest robotics technology. This is your chance to bridge the gap between 
                simulation and reality.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}