import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";

export function FAQSection() {
  const faqs = [
    {
      question: "Who can participate in the Roboverse Global Hackathon?",
      answer: "The hackathon is open to students, professionals and anyone passionate about robotics. All skill levels are welcome, from beginners to experts."
    },
    {
      question: "Are there any costs to participate?",
      answer: "Roboverse Global Hackathon is completely free to participate! We are providing compute thanks to teams such as Akash and AWS for training."
    },
    {
      question: "Do I need a team to participate?",
      answer: (
        <>
          You can participate solo or with a team of up to 5 people. If you don't have a team, we will setup team formation discussion within{" "}
          <a href="https://discord.com/invite/crypmUTf8x" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
            Discord
          </a>{" "}
          allowing individuals to connect prior to the Hackathon.
        </>
      )
    },
    {
      question: "Can I start working on my project before the hackathon?",
      answer: (
        <>
          Teams are able to ask questions about Roboverse prior to the hackathon within our{" "}
          <a href="https://discord.com/invite/crypmUTf8x" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
            Discord
          </a>
          .
        </>
      )
    },
    {
      question: "How are projects judged?",
      answer: "Projects are judged based on innovation, technical complexity and real-world impact. Our panel includes industry experts, successful entrepreneurs, and technical leaders which will be revealed soon!"
    },
    {
      question: "What if I know nothing about robotics?",
      answer: "Beginners are absolutely welcome! We have workshops and resources specifically designed to help newcomers. The hackathon is a great learning opportunity regardless of your current skill level."
    },
    {
      question: "How do I register for the event?",
      answer: "Click the 'Register Now' button at the top of the page to fill out our registration form. Registration is individual or team based."
    }
  ];

  return (
    <section className="py-20 px-6 bg-muted/30">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-muted-foreground">
            Have questions? We've got answers! If you don't see your question below, feel free to contact us.
          </p>
        </div>
        
        <Accordion type="single" collapsible className="w-full space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="bg-background rounded-lg px-6">
              <AccordionTrigger className="text-left hover:no-underline py-6">
                <span className="font-medium">{faq.question}</span>
              </AccordionTrigger>
              <AccordionContent className="pb-6 text-muted-foreground leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        
        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            Still have questions?
          </p>
          <div className="text-primary font-medium">
            Reach out via{" "}
            <a href="https://discord.com/invite/crypmUTf8x" target="_blank" rel="noopener noreferrer" className="hover:underline">
              Discord
            </a>{" "}
            or contact us via our email:{" "}
            <a href="mailto:hackathon@reborn-ai.xyz" className="hover:underline">
              hackathon@reborn-ai.xyz
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}