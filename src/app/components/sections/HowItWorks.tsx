import { Container } from "../ui/Container";

const STEPS = [
  {
    number: "1",
    title: "Sign Up Free",
    description: "Create your account in seconds",
  },
  {
    number: "2",
    title: "Create Store",
    description: "Set up your store details",
  },
  {
    number: "3",
    title: "Start Selling",
    description: "Add products and start selling",
  },
];

export function HowItWorks() {
  return (
    <section className="py-24 bg-muted/30">
      <Container>
        <div className="text-center mb-16">
          <h2 className="mb-4">How It Works</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            3 Simple Steps
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Optional connector line for desktop */}
          <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-0.5 bg-border/50 z-0"></div>

          {STEPS.map((step, index) => (
            <div key={index} className="glass p-8 rounded-2xl flex flex-col items-center text-center relative z-10">
              <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground font-bold text-xl flex items-center justify-center mb-6 shadow-lg">
                {step.number}
              </div>
              <h3 className="font-semibold text-xl mb-3 text-foreground">
                {step.title}
              </h3>
              <p className="text-muted-foreground">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
