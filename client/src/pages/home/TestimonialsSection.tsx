import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { GlassCard } from "@/components/ui/glass-card";
import { fadeIn, staggerContainer } from "@/lib/animations";
import { Star, StarHalf } from "lucide-react";

export default function TestimonialsSection() {
  const { t } = useLanguage();

  const testimonials = [
    {
      name: t("testimonials.person1.name"),
      role: t("testimonials.person1.role"),
      company: t("testimonials.person1.company"),
      text: t("testimonials.person1.text"),
      rating: 5,
    },
    {
      name: t("testimonials.person2.name"),
      role: t("testimonials.person2.role"),
      company: t("testimonials.person2.company"),
      text: t("testimonials.person2.text"),
      rating: 5,
    },
    {
      name: t("testimonials.person3.name"),
      role: t("testimonials.person3.role"),
      company: t("testimonials.person3.company"),
      text: t("testimonials.person3.text"),
      rating: 4.5,
    },
  ];

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`star-${i}`} className="text-accent" fill="currentColor" />);
    }

    if (hasHalfStar) {
      stars.push(<StarHalf key="half-star" className="text-accent" fill="currentColor" />);
    }

    return stars;
  };

  return (
    <section className="py-16 relative">
      <div className="absolute top-1/2 right-0 w-1/3 h-1/3 bg-accent opacity-10 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-16"
          variants={fadeIn("up", 0.3)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
        >
          <span className="text-accent text-sm font-semibold uppercase tracking-wider">{t("testimonials.tag")}</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-6">{t("testimonials.title")}</h2>
          <p className="opacity-80">{t("testimonials.subtitle")}</p>
        </motion.div>
        
        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
        >
          {testimonials.map((testimonial, index) => (
            <motion.div 
              key={index}
              variants={fadeIn("up", 0.1 * index)}
            >
              <GlassCard className="p-6" hoverEffect>
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 rounded-full overflow-hidden mr-4 bg-accent/30 flex items-center justify-center">
                    <span className="font-bold text-lg">{testimonial.name.charAt(0)}</span>
                  </div>
                  <div>
                    <h4 className="font-bold">{testimonial.name}</h4>
                    <p className="text-sm opacity-70">{testimonial.role}, {testimonial.company}</p>
                  </div>
                </div>
                
                <p className="italic opacity-80 mb-4">
                  "{testimonial.text}"
                </p>
                
                <div className="flex text-accent">
                  {renderStars(testimonial.rating)}
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
