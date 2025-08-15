import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";

export function ScheduleSection() {
  const schedule = [
    {
      day: "Friday, March 15",
      events: [
        { time: "6:00 PM", title: "Registration & Check-in", type: "general" },
        { time: "7:00 PM", title: "Opening Ceremony", type: "ceremony" },
        { time: "8:00 PM", title: "Team Formation & Networking", type: "networking" },
        { time: "9:00 PM", title: "Hacking Begins!", type: "hacking" },
      ]
    },
    {
      day: "Saturday, March 16",
      events: [
        { time: "8:00 AM", title: "Breakfast", type: "meal" },
        { time: "10:00 AM", title: "Technical Workshop: AI/ML", type: "workshop" },
        { time: "12:00 PM", title: "Lunch", type: "meal" },
        { time: "2:00 PM", title: "Mentor Check-ins", type: "mentoring" },
        { time: "6:00 PM", title: "Dinner", type: "meal" },
        { time: "8:00 PM", title: "Tech Talks", type: "talk" },
        { time: "10:00 PM", title: "Late Night Snacks", type: "meal" },
      ]
    },
    {
      day: "Sunday, March 17",
      events: [
        { time: "8:00 AM", title: "Breakfast", type: "meal" },
        { time: "12:00 PM", title: "Submission Deadline", type: "deadline" },
        { time: "1:00 PM", title: "Lunch & Project Showcase", type: "showcase" },
        { time: "3:00 PM", title: "Judging Period", type: "judging" },
        { time: "5:00 PM", title: "Awards Ceremony", type: "ceremony" },
        { time: "6:00 PM", title: "Closing & Networking", type: "networking" },
      ]
    }
  ];

  const getEventColor = (type: string) => {
    const colors: Record<string, string> = {
      general: "bg-blue-100 text-blue-800",
      ceremony: "bg-purple-100 text-purple-800",
      networking: "bg-green-100 text-green-800",
      hacking: "bg-red-100 text-red-800",
      meal: "bg-orange-100 text-orange-800",
      workshop: "bg-indigo-100 text-indigo-800",
      mentoring: "bg-teal-100 text-teal-800",
      talk: "bg-pink-100 text-pink-800",
      deadline: "bg-yellow-100 text-yellow-800",
      showcase: "bg-cyan-100 text-cyan-800",
      judging: "bg-gray-100 text-gray-800",
    };
    return colors[type] || "bg-gray-100 text-gray-800";
  };

  return (
    <section className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Event Schedule
          </h2>
          <p className="text-lg text-muted-foreground">
            A packed 48 hours of coding, learning, and fun activities
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {schedule.map((day, dayIndex) => (
            <Card key={dayIndex} className="h-fit">
              <CardHeader>
                <CardTitle className="text-xl">
                  {day.day}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {day.events.map((event, eventIndex) => (
                  <div key={eventIndex} className="flex items-start gap-3 p-3 rounded-lg bg-muted/30">
                    <div className="text-sm font-medium text-muted-foreground min-w-[60px]">
                      {event.time}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium mb-1">
                        {event.title}
                      </div>
                      <Badge variant="secondary" className={`text-xs ${getEventColor(event.type)}`}>
                        {event.type}
                      </Badge>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}