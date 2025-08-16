import { Leaf, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface MobileHeaderProps {
  title?: string;
  subtitle?: string;
  showBranding?: boolean;
}

export const MobileHeader = ({ 
  title, 
  subtitle, 
  showBranding = true 
}: MobileHeaderProps) => {
  if (showBranding) {
    return (
      <header className="bg-gradient-hero text-primary-foreground relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(255,255,255,0.1),transparent_50%)]" />
        <div className="absolute top-4 right-4 opacity-20">
          <Sparkles className="h-12 w-12" />
        </div>
        
        <div className="relative px-4 py-6 pb-8">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-3">
              <div className="p-2 bg-white/10 rounded-full backdrop-blur-sm">
                <Leaf className="h-7 w-7" />
              </div>
              <h1 className="text-2xl font-bold tracking-tight">CustoZen</h1>
            </div>
            {subtitle && (
              <p className="text-sm opacity-95 leading-relaxed max-w-xs mx-auto font-medium">
                {subtitle}
              </p>
            )}
            <Badge variant="secondary" className="mt-3 bg-white/20 text-white border-white/30">
              Beta
            </Badge>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="sticky top-0 z-40 bg-card/95 backdrop-blur-sm border-b border-border">
      <div className="px-4 py-4">
        <div>
          <h2 className="text-lg font-semibold tracking-tight">{title}</h2>
          {subtitle && (
            <p className="text-sm text-muted-foreground mt-1 font-medium">{subtitle}</p>
          )}
        </div>
      </div>
    </header>
  );
};