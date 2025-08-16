import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface TabBarProps {
  children: ReactNode;
  className?: string;
}

interface TabBarItemProps {
  icon: ReactNode;
  label: string;
  isActive?: boolean;
  onClick?: () => void;
  isMainAction?: boolean;
  className?: string;
}

export const TabBar = ({ children, className }: TabBarProps) => {
  return (
    <div className={cn(
      "fixed bottom-0 left-0 right-0 z-50",
      "bg-card/95 backdrop-blur-md border-t border-border/50",
      "shadow-[0_-4px_20px_-4px_hsl(var(--shadow-mobile))]",
      "px-2 py-2",
      "pb-[calc(env(safe-area-inset-bottom,0px)+0.5rem)]",
      className
    )}>
      <div className="flex items-center justify-around max-w-md mx-auto h-16">
        {children}
      </div>
    </div>
  );
};

export const TabBarItem = ({ 
  icon, 
  label, 
  isActive = false, 
  onClick, 
  isMainAction = false,
  className 
}: TabBarItemProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex flex-col items-center justify-center transition-all duration-200",
        "min-w-[60px] h-12 relative touch-manipulation",
        "active:scale-95",
        isMainAction && [
          "bg-gradient-hero text-primary-foreground",
          "scale-110 -mt-3 shadow-[var(--shadow-fab)]",
          "w-14 h-14 rounded-full",
          "hover:scale-[1.15] active:scale-105"
        ],
        !isMainAction && [
          "rounded-lg p-2",
          isActive 
            ? "text-primary bg-primary/10 scale-105" 
            : "text-muted-foreground hover:text-foreground hover:bg-accent/30"
        ],
        className
      )}
    >
      <div className={cn(
        "flex items-center justify-center transition-all duration-200",
        isMainAction ? "text-xl" : "text-base",
        isActive && !isMainAction && "scale-110"
      )}>
        {icon}
      </div>
      {!isMainAction && (
        <span className={cn(
          "text-[10px] font-medium mt-0.5 leading-none transition-all duration-200",
          isActive && "font-semibold"
        )}>
          {label}
        </span>
      )}
    </button>
  );
};