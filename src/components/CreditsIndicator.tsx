import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Leaf } from "lucide-react";
import { cn } from "@/lib/utils";
import { CreditsModal } from "./CreditsModal";

interface CreditsIndicatorProps {
  credits: number;
  className?: string;
}

export const CreditsIndicator = ({ credits, className }: CreditsIndicatorProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsModalOpen(true)}
        className={cn(
          "flex items-center gap-2 h-8 px-3 bg-gradient-primary text-primary-foreground",
          "hover:bg-gradient-primary/90 shadow-sm border-0",
          "rounded-full font-semibold transition-all duration-200",
          "hover:scale-105 active:scale-95",
          className
        )}
      >
        <Leaf className="h-4 w-4" />
        <span className="text-sm">{credits}</span>
      </Button>

      <CreditsModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        currentCredits={credits}
      />
    </>
  );
};