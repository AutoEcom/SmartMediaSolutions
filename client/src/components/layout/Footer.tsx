import { Link } from "wouter";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Facebook, Linkedin, Twitter, Instagram, Send } from "lucide-react";

export default function Footer() {
  const { t } = useLanguage();
  
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="py-12 backdrop-blur-md bg-background/60 mt-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-accent to-accent/80 flex items-center justify-center">
                <span className="font-bold text-white text-lg">SM</span>
              </div>
              <span className="font-bold text-xl">Smart Media</span>
            </div>
            
            <p className="opacity-80 mb-6">
              {t("footer.description")}
            </p>
            
            <div className="flex space-x-4">
              <Button size="icon" variant="ghost" className="rounded-full hover:text-accent transition-all">
                <Facebook className="h-5 w-5" />
              </Button>
              <Button size="icon" variant="ghost" className="rounded-full hover:text-accent transition-all">
                <Linkedin className="h-5 w-5" />
              </Button>
              <Button size="icon" variant="ghost" className="rounded-full hover:text-accent transition-all">
                <Twitter className="h-5 w-5" />
              </Button>
              <Button size="icon" variant="ghost" className="rounded-full hover:text-accent transition-all">
                <Instagram className="h-5 w-5" />
              </Button>
            </div>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-6">{t("footer.services")}</h3>
            <ul className="space-y-3">
              <li><a href="#" className="hover:text-accent transition-all">{t("footer.ecommerce")}</a></li>
              <li><a href="#" className="hover:text-accent transition-all">{t("footer.webDev")}</a></li>
              <li><a href="#" className="hover:text-accent transition-all">{t("footer.softwareDev")}</a></li>
              <li><a href="#" className="hover:text-accent transition-all">{t("footer.aiSolutions")}</a></li>
              <li><a href="#" className="hover:text-accent transition-all">{t("footer.mobileApps")}</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-6">{t("footer.company")}</h3>
            <ul className="space-y-3">
              <li><a href="#about" className="hover:text-accent transition-all">{t("footer.about")}</a></li>
              <li><a href="#works" className="hover:text-accent transition-all">{t("footer.projects")}</a></li>
              <li><a href="#" className="hover:text-accent transition-all">{t("footer.careers")}</a></li>
              <li><a href="#" className="hover:text-accent transition-all">{t("footer.blog")}</a></li>
              <li><a href="#contact" className="hover:text-accent transition-all">{t("footer.contact")}</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-6">{t("footer.newsletter")}</h3>
            <p className="opacity-80 mb-4">
              {t("footer.newsletterDesc")}
            </p>
            
            <form className="flex">
              <Input 
                type="email" 
                className="rounded-r-none backdrop-blur-md bg-background/30" 
                placeholder={t("footer.emailPlaceholder")} 
              />
              <Button 
                type="submit" 
                className="rounded-l-none bg-gradient-to-r from-accent to-accent/80"
              >
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>
        
        <div className="border-t border-border mt-12 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="opacity-70">© {currentYear} Smart Media. {t("footer.copyright")}</p>
          
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="#">
              <a className="text-sm opacity-70 hover:opacity-100 transition-all">{t("footer.terms")}</a>
            </Link>
            <Link href="#">
              <a className="text-sm opacity-70 hover:opacity-100 transition-all">{t("footer.privacy")}</a>
            </Link>
            <Link href="#">
              <a className="text-sm opacity-70 hover:opacity-100 transition-all">{t("footer.cookies")}</a>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
