import { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface GradientButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  variant?: "filled" | "outline";
}

export const GradientButton = forwardRef<HTMLButtonElement, GradientButtonProps>(
  ({ children, className, variant = "filled", ...props }, ref) => {
    return (
      <motion.button
        ref={ref}
        className={cn(
          "font-medium py-3 px-8 rounded-full transition-all",
          "hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-accent/50",
          variant === "filled"
            ? "bg-gradient-to-r from-accent to-accent/80 text-white"
            : "backdrop-blur-md bg-background/30 border border-background/10 hover:border-accent/30",
          className
        )}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.2 }}
        {...props}
      >
        {children}
      </motion.button>
    );
  }
);

GradientButton.displayName = "GradientButton";
