import { cn } from "@/lib/utils";
import { motion, HTMLMotionProps } from "framer-motion";
import { ReactNode } from "react";

interface GlassCardProps extends HTMLMotionProps<"div"> {
  children: ReactNode;
  className?: string;
  hoverEffect?: boolean;
  floatingEffect?: boolean;
}

export function GlassCard({
  children,
  className,
  hoverEffect = false,
  floatingEffect = false,
  ...props
}: GlassCardProps) {
  return (
    <motion.div
      className={cn(
        "backdrop-blur-md bg-background/30 rounded-xl border border-background/10",
        hoverEffect && "hover:shadow-xl transition-all duration-300",
        className
      )}
      animate={
        floatingEffect
          ? {
              y: [0, -10, 0],
              transition: {
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              },
            }
          : {}
      }
      whileHover={
        hoverEffect
          ? {
              scale: 1.02,
              boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
            }
          : {}
      }
      {...props}
    >
      {children}
    </motion.div>
  );
}
