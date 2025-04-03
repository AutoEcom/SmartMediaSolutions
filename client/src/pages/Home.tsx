import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import HeroSection from "./home/HeroSection";
import ClientsSection from "./home/ClientsSection";
import ServicesSection from "./home/ServicesSection";
import AboutSection from "./home/AboutSection";
import WorksSection from "./home/WorksSection";
import TestimonialsSection from "./home/TestimonialsSection";
import ContactSection from "./home/ContactSection";
import { staggerContainer } from "@/lib/animations";
import { Helmet } from "react-helmet";

export default function Home() {
  const { t, language } = useLanguage();

  return (
    <>
      <Helmet>
        <title>{t("meta.title")}</title>
        <meta name="description" content={t("meta.description")} />
        <html lang={language} />
      </Helmet>

      <motion.main
        variants={staggerContainer}
        initial="hidden"
        animate="show"
        className="relative overflow-hidden"
      >
        {/* Purple blob decoration elements */}
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-accent opacity-10 rounded-full blur-3xl transform translate-x-1/4 -translate-y-1/4"></div>
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-accent opacity-10 rounded-full blur-3xl transform -translate-x-1/4 translate-y-1/4"></div>
        
        <HeroSection />
        <ClientsSection />
        <ServicesSection />
        <AboutSection />
        <WorksSection />
        <TestimonialsSection />
        <ContactSection />
      </motion.main>
    </>
  );
}
