import Link from "next/link";
import { Container } from "../ui/Container";

export function CTASection() {
  return (
    <section className="py-24 relative overflow-hidden">
      <Container>
        <div className="bg-card shadow-sm p-12 md:p-20 rounded-[2.5rem] text-center relative border border-border">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            Join 10,000+ businesses using ZopShop
          </p>
          <div className="flex flex-col items-center gap-4">
            <Link
              href="/register"
              className="bg-primary text-primary-foreground hover:bg-primary/90 text-lg px-10 py-4 rounded-full font-semibold shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5"
            >
              Start Free Trial
            </Link>
            <p className="text-sm text-muted-foreground mt-4 font-medium">
              No credit card required. Free for 30 days.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
