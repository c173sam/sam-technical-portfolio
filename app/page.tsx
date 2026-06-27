import { Background } from "@/components/Background";
import { ContactSection } from "@/components/ContactSection";
import { ExperimentsSection } from "@/components/ExperimentsSection";
import { Hero } from "@/components/Hero";
import { ProfileSection } from "@/components/ProfileSection";
import { SkillsBento } from "@/components/SkillsBento";
import { Timeline } from "@/components/Timeline";

export default function Home() {
  return (
    <main className="relative overflow-hidden">
      <Background />
      <div className="relative z-10">
        <Hero />
        <ProfileSection />
        <SkillsBento />
        <Timeline />
        <ExperimentsSection />
        <ContactSection />
      </div>
    </main>
  );
}
