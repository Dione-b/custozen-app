import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Package, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ProductLimitIndicatorProps {
  currentProducts: number;
  maxProducts: number;
  isPro?: boolean;
}

const ProductLimitIndicator = ({ 
  currentProducts, 
  maxProducts, 
  isPro = false 
}: ProductLimitIndicatorProps) => {
  const navigate = useNavigate();
  const progressPercentage = isPro ? 100 : (currentProducts / maxProducts) * 100;
  const isLimitReached = !isPro && currentProducts >= maxProducts;
  
  if (isPro) {
    return (
      <Card className="shadow-[var(--shadow-card)]">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-full">
              <Package className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-foreground">
                  Produtos: {currentProducts}
                </span>
                <span className="text-xs text-primary font-semibold px-2 py-1 bg-primary/10 rounded-full">
                  Pro
                </span>
              </div>
              <p className="text-xs text-muted-foreground">
                Produtos ilimitados
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-[var(--shadow-card)]">
      <CardContent className="p-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-full">
            <Package className="h-5 w-5 text-primary" />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-foreground">
                Produtos: {currentProducts}/{maxProducts}
              </span>
              {isLimitReached && (
                <span className="text-xs text-amber-600 font-medium">
                  Limite atingido
                </span>
              )}
            </div>
            <Progress 
              value={progressPercentage} 
              className="h-2"
            />
            <div className="flex items-center justify-between mt-2">
              <p className="text-xs text-muted-foreground">
                {currentProducts < maxProducts 
                  ? `${maxProducts - currentProducts} produtos restantes no plano gratuito`
                  : "Limite atingido no plano gratuito"
                }
              </p>
              {isLimitReached && (
                <Button 
                  size="sm" 
                  className="bg-gradient-primary text-primary-foreground hover:opacity-90 ml-2"
                  onClick={() => navigate("/subscription?upgrade=true")}
                >
                  Upgrade Pro
                  <ArrowRight className="h-3 w-3 ml-1" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductLimitIndicator;