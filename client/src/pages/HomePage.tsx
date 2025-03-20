import { HeroSection } from "@/components/HeroSection";
import { FeaturesSection } from "@/components/FeaturesSection";
import { HowItWorksSection } from "@/components/HowItWorks";
import { StatsSection } from "@/components/StatsSection";
import { CtaSection } from "@/components/CTASection";

function HomePage() {
  return (
    <main className="flex-1">
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <StatsSection />
      <CtaSection />
    </main>
  );
}

export default HomePage;
