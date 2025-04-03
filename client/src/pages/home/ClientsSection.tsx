import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { fadeIn, staggerContainer } from "@/lib/animations";
import { Building, Store, Laptop, Package, Leaf, Car } from "lucide-react";

export default function ClientsSection() {
  const { t } = useLanguage();

  const clients = [
    { icon: Building, name: "TechCorp" },
    { icon: Store, name: "ShopMax" },
    { icon: Laptop, name: "DigiSoft" },
    { icon: Package, name: "BoxStore" },
    { icon: Leaf, name: "GreenLife" },
    { icon: Car, name: "AutoGroup" },
  ];

  return (
    <motion.section 
      className="py-12 backdrop-blur-md bg-background/30 my-12"
      variants={fadeIn("up", 0.3)}
    >
      <div className="container mx-auto px-6">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold mb-2">{t("clients.title")}</h2>
          <p className="text-sm opacity-70">{t("clients.subtitle")}</p>
        </div>
        
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center justify-items-center opacity-70"
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
        >
          {clients.map((client, index) => (
            <motion.div 
              key={index}
              className="h-12 flex items-center"
              variants={fadeIn("up", 0.1 * index)}
            >
              <client.icon className="h-7 w-7 mr-2" />
              <span className="font-bold">{client.name}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}
