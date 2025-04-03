import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { GlassCard } from "@/components/ui/glass-card";
import { GradientButton } from "@/components/ui/gradient-button";
import { fadeIn, slideIn } from "@/lib/animations";
import { BarChart3, Users, Bot } from "lucide-react";

export default function HeroSection() {
  const { t } = useLanguage();

  return (
    <section className="pt-32 pb-24 relative">
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <motion.div 
            className="lg:w-1/2 space-y-8"
            variants={fadeIn("right", 0.3)}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              {t("hero.title.1")} <span className="text-accent">{t("hero.title.2")}</span> {t("hero.title.3")}
            </h1>
            <p className="text-lg md:text-xl opacity-90 max-w-xl">
              {t("hero.subtitle")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <GradientButton variant="filled" onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}>
                {t("hero.cta.contact")}
              </GradientButton>
              <GradientButton variant="outline" onClick={() => document.getElementById("services")?.scrollIntoView({ behavior: "smooth" })}>
                {t("hero.cta.services")}
              </GradientButton>
            </div>
            
            <div className="flex items-center space-x-6 pt-4">
              <div className="flex items-center">
                <div className="flex -space-x-2">
                  <div className="w-10 h-10 rounded-full bg-accent/30 flex items-center justify-center border-2 border-primary z-30">
                    <span className="text-sm">SM</span>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center border-2 border-primary z-20">
                    <span className="text-sm">SM</span>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center border-2 border-primary z-10">
                    <span className="text-sm">SM</span>
                  </div>
                </div>
                <span className="ml-4 text-sm">{t("hero.team")}</span>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            className="lg:w-1/2 relative"
            variants={slideIn("left", 0.5)}
          >
            <div className="relative">
              <div className="w-full h-full absolute top-0 left-0 bg-accent opacity-10 rounded-3xl blur-lg"></div>
              <GlassCard floatingEffect className="p-6 max-w-md mx-auto">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-bold">{t("hero.card.title")}</h3>
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-accent to-accent/80 flex items-center justify-center">
                    <span className="text-white text-sm">SM</span>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="backdrop-blur-sm bg-background/20 rounded-lg p-4 flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-accent/30 flex items-center justify-center">
                      <BarChart3 className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <div className="text-sm font-medium">{t("hero.card.sales.title")}</div>
                      <div className="text-lg font-bold">+127% <span className="text-xs opacity-70">{t("hero.card.sales.period")}</span></div>
                    </div>
                  </div>
                  
                  <div className="backdrop-blur-sm bg-background/20 rounded-lg p-4 flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-accent/30 flex items-center justify-center">
                      <Users className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <div className="text-sm font-medium">{t("hero.card.customers.title")}</div>
                      <div className="text-lg font-bold">+3,452 <span className="text-xs opacity-70">{t("hero.card.customers.period")}</span></div>
                    </div>
                  </div>
                  
                  <div className="backdrop-blur-sm bg-background/20 rounded-lg p-4 flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-accent/30 flex items-center justify-center">
                      <Bot className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <div className="text-sm font-medium">{t("hero.card.ai.title")}</div>
                      <div className="text-lg font-bold">-35% <span className="text-xs opacity-70">{t("hero.card.ai.period")}</span></div>
                    </div>
                  </div>
                </div>
              </GlassCard>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
