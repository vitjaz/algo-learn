import { HeroSection } from "@/components/home/hero-section";
import { QuickNav } from "@/components/home/quick-nav";

export default function HomePage() {
  return (
    <div className="space-y-12">
      <HeroSection />
      <QuickNav />
    </div>
  );
}
