import { Container } from "../ui/Container";
import { Star } from "lucide-react";

const TESTIMONIALS = [
  {
    text: "ZopShop saved my business! Now I track everything easily.",
    author: "Rahim, Grocery Store Owner",
    avatar: "R",
  },
  {
    text: "Best inventory tool I've ever used. Simple and powerful.",
    author: "Sarah, Hardware Shop",
    avatar: "S",
  },
  {
    text: "My team loves it. We saved 10+ hours weekly.",
    author: "Ahmed, Retail Chain",
    avatar: "A",
  },
];

export function Testimonials() {
  return (
    <section className="py-24">
      <Container>
        <div className="text-center mb-16">
          <h2 className="mb-4">What Our Customers Say</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Trusted by business owners everywhere
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((testimonial, index) => (
            <div key={index} className="bg-card border border-border shadow-sm p-10 rounded-3xl flex flex-col gap-6 hover:shadow-md transition-shadow">
              <div className="flex gap-1 text-primary">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-current" />
                ))}
              </div>
              <p className="text-lg font-medium text-foreground italic flex-grow leading-relaxed">
                "{testimonial.text}"
              </p>
              <div className="flex items-center gap-4 mt-auto">
                <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-lg">
                  {testimonial.avatar}
                </div>
                <div className="text-sm font-semibold text-foreground">
                  {testimonial.author}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
