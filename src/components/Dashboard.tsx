import { InsightsFeed } from "@/components/InsightsFeed";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import ProductLimitIndicator from "@/components/ProductLimitIndicator";
import { TrendingUp, DollarSign, Package, AlertTriangle } from "lucide-react";

const Dashboard = () => {
  // Mock data - em produção viria do backend/contexto
  const currentProducts = 3;
  const maxProducts = 3;
  const isPro = false; // Simula se é usuário Pro

  return (
    <div className="pb-6">
      {/* Indicador de Limite de Produtos */}
      <div className="mb-6">
        <ProductLimitIndicator 
          currentProducts={currentProducts}
          maxProducts={maxProducts}
          isPro={isPro}
        />
      </div>

      {/* Métricas Rápidas */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card className="shadow-[var(--shadow-elevated)] border-0 bg-gradient-card card-hover">
          <CardContent className="p-4 lg:p-6">
            <div className="flex items-center gap-3">
              <div className="p-2.5 lg:p-3 bg-gradient-primary rounded-xl shadow-sm">
                <Package className="h-4 w-4 lg:h-6 lg:w-6 text-primary-foreground" />
              </div>
              <div>
                <p className="text-xs lg:text-sm text-muted-foreground font-medium">Produtos</p>
                <p className="text-xl lg:text-2xl font-bold text-primary">{currentProducts}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-[var(--shadow-elevated)] border-0 bg-gradient-card card-hover">
          <CardContent className="p-4 lg:p-6">
            <div className="flex items-center gap-3">
              <div className="p-2.5 lg:p-3 bg-gradient-accent rounded-xl shadow-sm">
                <DollarSign className="h-4 w-4 lg:h-6 lg:w-6 text-accent-foreground" />
              </div>
              <div>
                <p className="text-xs lg:text-sm text-muted-foreground font-medium">Faturamento</p>
                <p className="text-xl lg:text-2xl font-bold text-accent">R$ 2.8K</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-[var(--shadow-elevated)] border-0 bg-gradient-card card-hover">
          <CardContent className="p-4 lg:p-6">
            <div className="flex items-center gap-3">
              <div className="p-2.5 lg:p-3 bg-gradient-primary rounded-xl shadow-sm">
                <TrendingUp className="h-4 w-4 lg:h-6 lg:w-6 text-primary-foreground" />
              </div>
              <div>
                <p className="text-xs lg:text-sm text-muted-foreground font-medium">Margem Média</p>
                <p className="text-xl lg:text-2xl font-bold text-primary">68%</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-[var(--shadow-elevated)] border-0 bg-gradient-card card-hover">
          <CardContent className="p-4 lg:p-6">
            <div className="flex items-center gap-3">
              <div className="p-2.5 lg:p-3 bg-destructive/20 rounded-xl">
                <AlertTriangle className="h-4 w-4 lg:h-6 lg:w-6 text-destructive" />
              </div>
              <div>
                <p className="text-xs lg:text-sm text-muted-foreground font-medium">Alertas</p>
                <p className="text-xl lg:text-2xl font-bold text-destructive">3</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Feed de Insights da IA */}
        <div className="lg:col-span-2">
          <InsightsFeed />
        </div>

        {/* Produtos em Destaque */}
        <div>
          <h3 className="text-lg lg:text-xl font-bold mb-4 flex items-center justify-center lg:justify-start gap-2">
            <span className="text-2xl">🏆</span>
            Top Produtos
          </h3>
          <Card className="shadow-[var(--shadow-elevated)] border-0 bg-gradient-card">
            <CardContent className="p-5 lg:p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 lg:p-4 bg-primary/5 rounded-xl">
                  <div>
                    <h4 className="font-semibold text-sm lg:text-base">Brigadeiro Gourmet</h4>
                    <p className="text-xs lg:text-sm text-muted-foreground font-medium">Margem: 75%</p>
                  </div>
                  <Badge className="bg-gradient-primary text-primary-foreground border-0 text-xs font-semibold">
                    #1
                  </Badge>
                </div>
                <div className="flex items-center justify-between p-3 lg:p-4 bg-accent/5 rounded-xl">
                  <div>
                    <h4 className="font-semibold text-sm lg:text-base">Bolo de Cenoura</h4>
                    <p className="text-xs lg:text-sm text-muted-foreground font-medium">Margem: 68%</p>
                  </div>
                  <Badge className="bg-gradient-accent text-accent-foreground border-0 text-xs font-semibold">
                    #2
                  </Badge>
                </div>
                <div className="flex items-center justify-between p-3 lg:p-4 bg-secondary/50 rounded-xl">
                  <div>
                    <h4 className="font-semibold text-sm lg:text-base">Torta de Limão</h4>
                    <p className="text-xs lg:text-sm text-muted-foreground font-medium">Margem: 62%</p>
                  </div>
                  <Badge variant="secondary" className="text-xs font-semibold">
                    #3
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;