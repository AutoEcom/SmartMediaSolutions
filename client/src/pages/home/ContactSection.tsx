import { useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { GlassCard } from "@/components/ui/glass-card";
import { GradientButton } from "@/components/ui/gradient-button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { fadeIn, slideIn } from "@/lib/animations";
import { MapPin, Mail, Phone } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function ContactSection() {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "",
    message: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSelectChange = (value: string) => {
    setFormData(prev => ({ ...prev, service: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, we would send the form data to the server
    console.log(formData);
    
    toast({
      title: t("contact.toast.title"),
      description: t("contact.toast.message"),
    });
    
    // Reset form
    setFormData({
      name: "",
      email: "",
      service: "",
      message: ""
    });
  };

  const contactInfo = [
    { 
      icon: MapPin, 
      title: t("contact.address.title"), 
      value: t("contact.address.value") 
    },
    { 
      icon: Mail, 
      title: t("contact.email.title"), 
      value: t("contact.email.value") 
    },
    { 
      icon: Phone, 
      title: t("contact.phone.title"), 
      value: t("contact.phone.value") 
    },
  ];

  return (
    <section id="contact" className="py-16 relative">
      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-accent opacity-5"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <GlassCard className="p-8 md:p-12 max-w-5xl mx-auto relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent opacity-10 rounded-full blur-3xl transform translate-x-1/4 -translate-y-1/4"></div>
          
          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              variants={slideIn("right", 0.3)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.25 }}
            >
              <span className="text-accent text-sm font-semibold uppercase tracking-wider">{t("contact.tag")}</span>
              <h2 className="text-3xl font-bold mt-4 mb-6">{t("contact.title")}</h2>
              
              <p className="opacity-80 mb-8">
                {t("contact.subtitle")}
              </p>
              
              <div className="space-y-6">
                {contactInfo.map((item, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-accent to-accent/80 flex items-center justify-center mr-4">
                      <item.icon className="text-white h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold">{item.title}</h4>
                      <p className="opacity-80">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
            
            <motion.div
              variants={fadeIn("left", 0.3)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.25 }}
            >
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                  <Label htmlFor="name">{t("contact.form.name")}</Label>
                  <Input 
                    type="text" 
                    id="name" 
                    className="bg-background/20 backdrop-blur-md mt-2"
                    placeholder={t("contact.form.namePlaceholder")}
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="email">{t("contact.form.email")}</Label>
                  <Input 
                    type="email" 
                    id="email" 
                    className="bg-background/20 backdrop-blur-md mt-2"
                    placeholder="example@email.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="service">{t("contact.form.service")}</Label>
                  <Select 
                    onValueChange={handleSelectChange}
                    value={formData.service}
                  >
                    <SelectTrigger className="bg-background/20 backdrop-blur-md mt-2">
                      <SelectValue placeholder={t("contact.form.servicePlaceholder")} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ecommerce">{t("services.ecommerce.title")}</SelectItem>
                      <SelectItem value="webdev">{t("services.webDev.title")}</SelectItem>
                      <SelectItem value="softwaredev">{t("services.softwareDev.title")}</SelectItem>
                      <SelectItem value="ai">{t("services.aiSolutions.title")}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="message">{t("contact.form.message")}</Label>
                  <Textarea 
                    id="message" 
                    rows={4} 
                    className="bg-background/20 backdrop-blur-md mt-2"
                    placeholder={t("contact.form.messagePlaceholder")}
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <GradientButton type="submit" className="w-full">
                  {t("contact.form.submit")}
                </GradientButton>
              </form>
            </motion.div>
          </div>
        </GlassCard>
      </div>
    </section>
  );
}
