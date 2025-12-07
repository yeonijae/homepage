import styles from "./page.module.css";
import Navigation from "@/components/common/Navigation";
import HeroSection from "@/components/home/HeroSection";
import StorySection from "@/components/home/StorySection";
import PhilosophySection from "@/components/home/PhilosophySection";
import FocusSection from "@/components/home/FocusSection";
import MeaningSection from "@/components/home/MeaningSection";
import PromiseSection from "@/components/home/PromiseSection";
import ContactSection from "@/components/home/ContactSection";
import Footer from "@/components/common/Footer";

export default function Home() {
  return (
    <main className={styles.main}>
      <Navigation />
      <HeroSection />
      <StorySection />
      <PhilosophySection />
      <FocusSection />
      <MeaningSection />
      <PromiseSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
