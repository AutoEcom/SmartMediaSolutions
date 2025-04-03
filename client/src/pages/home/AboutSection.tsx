import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { GlassCard } from "@/components/ui/glass-card";
import { fadeIn, slideIn } from "@/lib/animations";

export default function AboutSection() {
  const { t } = useLanguage();

  const milestones = [
    { year: "2003", description: t("about.timeline.2003") },
    { year: "2008", description: t("about.timeline.2008") },
    { year: "2015", description: t("about.timeline.2015") },
    { year: "2020", description: t("about.timeline.2020") },
  ];

  const stats = [
    { value: "500+", label: t("about.stats.projects") },
    { value: "200+", label: t("about.stats.clients") },
    { value: "50+", label: t("about.stats.experts") },
    { value: "15+", label: t("about.stats.countries") },
  ];

  return (
    <section id="about" className="py-16 relative">
      <div className="absolute top-1/4 left-0 w-1/3 h-1/3 bg-accent opacity-10 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          <motion.div 
            className="lg:w-1/2"
            variants={slideIn("right", 0.3)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
          >
            <GlassCard className="p-6 relative z-10" floatingEffect>
              <div className="mb-6">
                <span className="text-accent font-semibold">{t("about.card.tag")}</span>
                <h3 className="text-2xl font-bold mt-2">{t("about.card.title")}</h3>
              </div>
              
              <div className="space-y-6">
                {milestones.map((milestone, index) => (
                  <div key={index} className="flex">
                    <div className="mr-4">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-accent to-accent/80 flex items-center justify-center">
                        <span className="text-white text-sm font-bold">{index + 1}</span>
                      </div>
                      {index < milestones.length - 1 && (
                        <div className="h-full w-0.5 bg-accent bg-opacity-30 ml-4 mt-2"></div>
                      )}
                    </div>
                    <div>
                      <h4 className="font-bold">{milestone.year}</h4>
                      <p className="text-sm opacity-80 mt-1">{milestone.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>
          </motion.div>
          
          <motion.div 
            className="lg:w-1/2"
            variants={fadeIn("left", 0.3)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
          >
            <span className="text-accent text-sm font-semibold uppercase tracking-wider">{t("about.tag")}</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-6">{t("about.title")}</h2>
            
            <p className="mb-6 opacity-80">
              {t("about.paragraph1")}
            </p>
            
            <p className="mb-6 opacity-80">
              {t("about.paragraph2")}
            </p>
            
            <div className="grid grid-cols-2 gap-6 mt-8">
              {stats.map((stat, index) => (
                <div key={index}>
                  <div className="text-3xl font-bold text-accent">{stat.value}</div>
                  <p className="opacity-80">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
