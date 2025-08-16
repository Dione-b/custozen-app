import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp, AlertTriangle, Sparkles, ArrowRight, Leaf, ChefHat } from "lucide-react";
import { ConfirmationModal } from "@/components/ConfirmationModal";
import { cn } from "@/lib/utils";

interface Insight {
  id: string;
  type: "seasonal" | "price-alert" | "suggestion" | "optimization";
  title: string;
  description: string;
  actionText?: string;
  cost?: number;
  onAction?: () => void;
  priority: "high" | "medium" | "low";
  category: "alerts" | "opportunities" | "tips";
}

const insights: Insight[] = [
  {
    id: "1",
    type: "price-alert",
    title: "Que tal uma análise tranquila do seu 'Bolo de Chocolate'? 🍰",
    description: "Notamos que este produto pode ter uma oportunidade de melhoria na margem. Quer que nossa IA analise gentilmente e sugira 3 formas de otimizar seu lucro?",
    actionText: "Analisar com calma",
    cost: 3,
    priority: "high",
    category: "alerts",
    onAction: () => console.log("Análise zen solicitada")
  },
  {
    id: "2",
    type: "seasonal",
    title: "A Páscoa pode ser um momento especial para você! 🌸",
    description: "Que tal uma sugestão personalizada de preços para seus ovos de colher? Vamos calcular juntos com base nos seus custos e no mercado da sua região.",
    actionText: "Ver sugestão zen",
    cost: 5,
    priority: "medium",
    category: "opportunities",
    onAction: () => console.log("Sugestão sazonal zen solicitada")
  },
  {
    id: "3",
    type: "optimization",
    title: "Lembrete amigável sobre seus ingredientes 📅",
    description: "Seus 3 ingredientes estão próximos do vencimento. Quer que criemos receitas especiais para aproveitar tudo com lucro e sem desperdício?",
    actionText: "Criar receitas",
    cost: 3,
    priority: "medium",
    category: "tips",
    onAction: () => console.log("Receitas zen solicitadas")
  },
  {
    id: "4",
    type: "suggestion",
    title: "Produtos funcionais estão em alta por aí! 🌱",
    description: "Seus vizinhos estão procurando opções mais saudáveis. Quer que adaptemos seus produtos atuais para essa tendência, com preços justos já calculados?",
    actionText: "Explorar linha fit",
    cost: 7,
    priority: "low",
    category: "opportunities",
    onAction: () => console.log("Linha zen solicitada")
  }
];

const insightIcons = {
  seasonal: TrendingUp,
  "price-alert": AlertTriangle,
  suggestion: Leaf,
  optimization: ChefHat,
};

const insightColors = {
  seasonal: "text-accent",
  "price-alert": "text-destructive", 
  suggestion: "text-primary",
  optimization: "text-primary",
};

const priorityBadges = {
  high: { variant: "secondary" as const, text: "Importante" },
  medium: { variant: "secondary" as const, text: "Sugestão" },
  low: { variant: "outline" as const, text: "Dica zen" },
};

const InsightCard = ({ insight, onRequestAction }: { 
  insight: Insight; 
  onRequestAction: (insight: Insight) => void;
}) => {
  const Icon = insightIcons[insight.type];
  const iconColor = insightColors[insight.type];
  const badge = priorityBadges[insight.priority];

  return (
    <Card className="hover:shadow-[var(--shadow-mobile)] transition-all duration-200 border-l-4 border-l-primary">
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div className={cn(
            "p-2.5 rounded-xl shrink-0 mt-1",
            "bg-gradient-warm"
          )}>
            <Icon className={cn("h-5 w-5", iconColor)} />
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <Badge {...badge} className="text-xs font-semibold">
                {badge.text}
              </Badge>
              {insight.cost && (
                <Badge className="bg-primary/10 text-primary border-primary/20 text-xs font-semibold">
                  {insight.cost} Crédito{insight.cost > 1 ? 's' : ''} Zen
                </Badge>
              )}
            </div>
            
            <h3 className="font-bold text-base mb-2 leading-snug">
              {insight.title}
            </h3>
            
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              {insight.description}
            </p>
            
            {insight.actionText && insight.onAction && (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => onRequestAction(insight)}
                className="w-full"
              >
                {insight.actionText}
                <ArrowRight className="h-3 w-3 ml-1" />
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export const InsightsFeed = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [confirmationModal, setConfirmationModal] = useState<{
    isOpen: boolean;
    insight?: Insight;
  }>({ isOpen: false });

  const filteredInsights = activeTab === "all" 
    ? insights 
    : insights.filter(insight => insight.category === activeTab);

  const handleRequestAction = (insight: Insight) => {
    if (insight.cost) {
      setConfirmationModal({ isOpen: true, insight });
    } else if (insight.onAction) {
      insight.onAction();
    }
  };

  const handleConfirmAction = () => {
    if (confirmationModal.insight?.onAction) {
      confirmationModal.insight.onAction();
    }
    setConfirmationModal({ isOpen: false });
  };

  return (
    <Card className="shadow-[var(--shadow-elevated)] border-0 bg-gradient-card">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-3">
          <div className="p-2 bg-gradient-primary rounded-xl">
            <Leaf className="h-6 w-6 text-primary-foreground" />
          </div>
          <div>
            <h2 className="text-xl font-bold">Seu Momento Zen</h2>
            <p className="text-sm text-muted-foreground font-normal">
              Insights gentis para equilibrar seu negócio
            </p>
          </div>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="p-6 pt-0">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="all" className="text-xs">Todos</TabsTrigger>
            <TabsTrigger value="alerts" className="text-xs">Alertas</TabsTrigger>
            <TabsTrigger value="opportunities" className="text-xs">Oportunidades</TabsTrigger>
            <TabsTrigger value="tips" className="text-xs">Dicas</TabsTrigger>
          </TabsList>
          
          <TabsContent value={activeTab} className="space-y-4">
            {filteredInsights.length > 0 ? (
              filteredInsights.map((insight) => (
                <InsightCard 
                  key={insight.id} 
                  insight={insight} 
                  onRequestAction={handleRequestAction}
                />
              ))
            ) : (
              <div className="text-center py-8">
                <Leaf className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                <p className="text-muted-foreground">
                  Nenhum insight encontrado nesta categoria
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={confirmationModal.isOpen}
        onClose={() => setConfirmationModal({ isOpen: false })}
        onConfirm={handleConfirmAction}
        title="Usar Créditos Zen"
        description={confirmationModal.insight?.description || ""}
        cost={confirmationModal.insight?.cost || 0}
        currentCredits={42}
      />
    </Card>
  );
};