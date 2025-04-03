import { useState, useEffect } from "react";
import { Link } from "wouter";
import { useTheme } from "@/components/ThemeProvider";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon, Globe, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { href: "#services", label: t("nav.services") },
    { href: "#about", label: t("nav.about") },
    { href: "#works", label: t("nav.works") },
    { href: "#contact", label: t("nav.contact") },
  ];

  return (
    <header className={`fixed w-full top-0 z-50 backdrop-blur-md transition-all duration-300 ${isScrolled ? "shadow-md" : ""}`}>
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/">
            <a className="flex items-center space-x-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-accent to-accent/80 flex items-center justify-center">
                <span className="font-bold text-white text-lg">SM</span>
              </div>
              <span className="font-bold text-xl">Smart Media</span>
            </a>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <a 
                key={item.href} 
                href={item.href} 
                className="hover:text-accent transition-all"
              >
                {item.label}
              </a>
            ))}
          </nav>
          
          {/* Controls */}
          <div className="flex items-center space-x-6">
            {/* Language Switcher */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center space-x-1">
                  <Globe className="h-5 w-5" />
                  <span>{language === "bg" ? "БГ" : "EN"}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setLanguage("bg")}>
                  БГ
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLanguage("en")}>
                  EN
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            {/* Theme Toggle */}
            <Button 
              variant="ghost" 
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="text-xl"
            >
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            
            {/* Mobile Menu Button */}
            <Button 
              variant="ghost" 
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden mt-4 pb-4"
            >
              <nav className="flex flex-col space-y-3">
                {navItems.map((item) => (
                  <a 
                    key={item.href} 
                    href={item.href} 
                    className="hover:text-accent transition-all"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
