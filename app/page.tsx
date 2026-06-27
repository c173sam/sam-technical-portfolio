import { Background } from "@/components/Background";
import { ContactSection } from "@/components/ContactSection";
import { Hero } from "@/components/Hero";
import { ProfileSection } from "@/components/ProfileSection";
import { SkillsBento } from "@/components/SkillsBento";
import { Timeline } from "@/components/Timeline";

export default function Home() {
  return (
    <main className="relative overflow-hidden">
      <Background />
      <Hero />
      <ProfileSection />
      <SkillsBento />
      <Timeline />
      <ContactSection />
    </main>
  );
}
