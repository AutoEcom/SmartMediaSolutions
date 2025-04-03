import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { GlassCard } from "@/components/ui/glass-card";
import { GradientButton } from "@/components/ui/gradient-button";
import { fadeIn, staggerContainer } from "@/lib/animations";
import { ArrowRight } from "lucide-react";

export default function WorksSection() {
  const { t } = useLanguage();

  const projects = [
    {
      category: t("works.projects.ecommerce"),
      title: "Fashion Store",
      description: t("works.projects.fashionDesc"),
      tags: ["Shopify", "React", t("works.projects.aiRecommendations")],
      bgColor: "from-accent/20 to-accent/5",
    },
    {
      category: t("works.projects.mobile"),
      title: "HealthTrack",
      description: t("works.projects.healthDesc"),
      tags: ["Flutter", "Firebase", "HealthKit"],
      bgColor: "from-accent/30 to-accent/10",
    },
    {
      category: t("works.projects.ai"),
      title: "SupportAI",
      description: t("works.projects.supportDesc"),
      tags: ["Python", "TensorFlow", "NLP"],
      bgColor: "from-accent/40 to-accent/15",
    },
  ];

  return (
    <section id="works" className="py-16 relative">
      <div className="absolute bottom-0 left-1/4 w-1/3 h-1/3 bg-accent opacity-10 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-16"
          variants={fadeIn("up", 0.3)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
        >
          <span className="text-accent text-sm font-semibold uppercase tracking-wider">{t("works.tag")}</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-6">{t("works.title")}</h2>
          <p className="opacity-80">{t("works.subtitle")}</p>
        </motion.div>
        
        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
        >
          {projects.map((project, index) => (
            <motion.div 
              key={index}
              variants={fadeIn("up", 0.1 * index)}
            >
              <GlassCard className="overflow-hidden" hoverEffect>
                <div className="relative h-64 overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-b ${project.bgColor}`}></div>
                  <div className="absolute bottom-4 left-4">
                    <span className="bg-accent text-white text-xs py-1 px-3 rounded-full">
                      {project.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                  <p className="opacity-80 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, idx) => (
                      <span 
                        key={idx} 
                        className="text-xs py-1 px-2 rounded-full backdrop-blur-sm bg-background/30"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div 
          className="text-center mt-12"
          variants={fadeIn("up", 0.5)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
        >
          <GradientButton variant="outline" className="inline-flex items-center">
            {t("works.viewAll")}
            <ArrowRight className="ml-2 h-4 w-4" />
          </GradientButton>
        </motion.div>
      </div>
    </section>
  );
}
