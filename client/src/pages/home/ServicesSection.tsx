import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { GlassCard } from "@/components/ui/glass-card";
import { fadeIn, staggerContainer } from "@/lib/animations";
import { ShoppingCart, Globe, Code, Bot, Check } from "lucide-react";

export default function ServicesSection() {
  const { t } = useLanguage();

  const services = [
    {
      icon: ShoppingCart,
      title: t("services.ecommerce.title"),
      description: t("services.ecommerce.description"),
      features: [
        t("services.ecommerce.feature1"),
        t("services.ecommerce.feature2"),
        t("services.ecommerce.feature3"),
      ],
    },
    {
      icon: Globe,
      title: t("services.webDev.title"),
      description: t("services.webDev.description"),
      features: [
        t("services.webDev.feature1"),
        t("services.webDev.feature2"),
        t("services.webDev.feature3"),
      ],
    },
    {
      icon: Code,
      title: t("services.softwareDev.title"),
      description: t("services.softwareDev.description"),
      features: [
        t("services.softwareDev.feature1"),
        t("services.softwareDev.feature2"),
        t("services.softwareDev.feature3"),
      ],
    },
    {
      icon: Bot,
      title: t("services.aiSolutions.title"),
      description: t("services.aiSolutions.description"),
      features: [
        t("services.aiSolutions.feature1"),
        t("services.aiSolutions.feature2"),
        t("services.aiSolutions.feature3"),
      ],
    },
  ];

  return (
    <section id="services" className="py-16 relative">
      <div className="absolute bottom-0 right-1/4 w-1/3 h-1/3 bg-accent opacity-10 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-16"
          variants={fadeIn("up", 0.3)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
        >
          <span className="text-accent text-sm font-semibold uppercase tracking-wider">{t("services.tag")}</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-6">{t("services.title")}</h2>
          <p className="opacity-80">{t("services.subtitle")}</p>
        </motion.div>
        
        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
        >
          {services.map((service, index) => (
            <motion.div 
              key={index} 
              variants={fadeIn("up", 0.1 * index)}
            >
              <GlassCard className="p-6" hoverEffect>
                <div className="w-14 h-14 rounded-xl bg-gradient-to-r from-accent to-accent/80 flex items-center justify-center mb-6">
                  <service.icon className="text-white text-xl" />
                </div>
                <h3 className="text-xl font-bold mb-4">{service.title}</h3>
                <p className="mb-6 opacity-80">{service.description}</p>
                <div className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center">
                      <Check className="text-accent mr-2 h-5 w-5" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
