import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TrendingUp, AlertTriangle, Leaf, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface InsightCardProps {
  type: "seasonal" | "price-alert" | "suggestion" | "optimization";
  title: string;
  description: string;
  actionText?: string;
  onAction?: () => void;
  priority?: "high" | "medium" | "low";
}

const insightIcons = {
  seasonal: TrendingUp,
  "price-alert": AlertTriangle,
  suggestion: Leaf,
  optimization: ArrowRight,
};

const insightColors = {
  seasonal: "text-accent",
  "price-alert": "text-destructive",
  suggestion: "text-primary",
  optimization: "text-muted-foreground",
};

const priorityBadges = {
  high: { variant: "destructive" as const, text: "Urgente" },
  medium: { variant: "secondary" as const, text: "Importante" },
  low: { variant: "outline" as const, text: "Dica" },
};

export const InsightCard = ({
  type,
  title,
  description,
  actionText,
  onAction,
  priority = "medium"
}: InsightCardProps) => {
  const Icon = insightIcons[type];
  const iconColor = insightColors[type];
  const badge = priorityBadges[priority];

  return (
    <Card className="mb-4 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-mobile)] transition-all duration-200">
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div className={cn(
            "p-2 rounded-lg shrink-0 mt-1",
            "bg-gradient-to-br from-card to-muted"
          )}>
            <Icon className={cn("h-5 w-5", iconColor)} />
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <Badge {...badge} className="text-xs">
                {badge.text}
              </Badge>
            </div>
            
            <h3 className="font-semibold text-base mb-1 leading-snug">
              {title}
            </h3>
            
            <p className="text-sm text-muted-foreground leading-relaxed mb-3">
              {description}
            </p>
            
            {actionText && onAction && (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={onAction}
                className="w-full"
              >
                {actionText}
                <ArrowRight className="h-3 w-3 ml-1" />
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};