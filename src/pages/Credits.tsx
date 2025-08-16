import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Leaf, 
  Zap, 
  Crown, 
  Check, 
  TrendingUp,
  Clock,
  ShoppingCart,
  History
} from "lucide-react";
import { cn } from "@/lib/utils";

const creditPackages = [
  {
    id: "starter",
    fichas: 50,
    price: "9,90",
    popular: false,
    description: "Ideal para testar",
    savings: null
  },
  {
    id: "standard",
    fichas: 150,
    price: "19,90",
    popular: true,
    description: "Mais usado",
    savings: "33% OFF"
  },
  {
    id: "premium",
    fichas: 350,
    price: "39,90",
    popular: false,
    description: "Melhor custo-benefício",
    savings: "65% OFF"
  }
];

const recentActivity = [
  { 
    action: "Descrição de produto gerada", 
    product: "Bolo de Chocolate",
    cost: 1, 
    time: "2 horas atrás",
    type: "spent"
  },
  { 
    action: "Análise de margem otimizada", 
    product: "Brigadeiro Gourmet",
    cost: 3, 
    time: "1 dia atrás",
    type: "spent"
  },
  { 
    action: "Sugestão de preços sazonais", 
    product: "Ovos de Páscoa",
    cost: 5, 
    time: "2 dias atrás",
    type: "spent"
  },
  { 
    action: "Pacote de 50 Créditos Zen comprado", 
    product: null,
    cost: 50, 
    time: "3 dias atrás",
    type: "gained"
  }
];

const proCoupons = [
  { title: "Análises avançadas de mercado", description: "Insights sobre concorrência e tendências" },
  { title: "Sugestões automáticas de preços", description: "IA monitora custos e sugere ajustes" },
  { title: "Geração ilimitada de descrições", description: "Textos para redes sociais sem limite" },
  { title: "Relatórios de lucratividade", description: "Dashboards completos do seu negócio" },
  { title: "Suporte prioritário", description: "Atendimento preferencial via WhatsApp" }
];

const Credits = () => {
  const [activeTab, setActiveTab] = useState("buy");
  const currentCredits = 42;

  return (
    <div className="space-y-6 pb-6">
      {/* Header com Saldo */}
      <div className="text-center">
        <div className="inline-flex items-center gap-4 bg-gradient-card p-8 rounded-3xl shadow-[var(--shadow-elevated)] border-2 border-primary/10">
          <div className="p-4 bg-gradient-primary rounded-2xl">
            <Leaf className="h-10 w-10 text-primary-foreground" />
          </div>
          <div>
            <p className="text-4xl font-bold text-primary mb-1">{currentCredits}</p>
            <p className="text-lg text-muted-foreground font-medium">Créditos Zen disponíveis</p>
          </div>
        </div>
      </div>

      {/* Tabs de Navegação */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="buy" className="flex items-center gap-2">
            <ShoppingCart className="h-4 w-4" />
            Comprar
          </TabsTrigger>
          <TabsTrigger value="history" className="flex items-center gap-2">
            <History className="h-4 w-4" />
            Histórico
          </TabsTrigger>
          <TabsTrigger value="pro" className="flex items-center gap-2">
            <Crown className="h-4 w-4" />
            Pro
          </TabsTrigger>
        </TabsList>

        {/* Tab de Comprar Fichas */}
        <TabsContent value="buy" className="space-y-6">
          <div>
            <h3 className="font-bold text-xl mb-2 flex items-center gap-2">
              <Zap className="h-6 w-6 text-accent" />
              Pacotes de Créditos Zen
            </h3>
            <p className="text-muted-foreground mb-6">
              Recarregue sua tranquilidade conforme a necessidade
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {creditPackages.map((pack) => (
                <Card key={pack.id} className={cn(
                  "relative overflow-hidden transition-all duration-200",
                  "hover:shadow-[var(--shadow-mobile)] cursor-pointer",
                  "border-2",
                  pack.popular ? "border-primary bg-primary/5 scale-105" : "border-border"
                )}>
                  {pack.popular && (
                    <Badge className="absolute top-4 right-4 bg-gradient-primary text-primary-foreground border-0 text-xs z-10">
                      Mais Popular
                    </Badge>
                  )}
                  {pack.savings && (
                    <Badge className="absolute top-4 left-4 bg-primary/10 text-primary border-primary/20 text-xs">
                      {pack.savings}
                    </Badge>
                  )}
                  <CardContent className="p-6 text-center">
                    <div className="p-4 bg-gradient-warm rounded-2xl w-fit mx-auto mb-4">
                      <Leaf className="h-8 w-8 text-accent" />
                    </div>
                    <h4 className="font-bold text-2xl mb-1">{pack.fichas} Créditos Zen</h4>
                    <p className="text-sm text-muted-foreground mb-4">{pack.description}</p>
                    <div className="mb-6">
                      <p className="text-3xl font-bold text-primary">R$ {pack.price}</p>
                      <p className="text-xs text-muted-foreground">
                        R$ {(parseFloat(pack.price.replace(',', '.')) / pack.fichas).toFixed(2).replace('.', ',')} por crédito
                      </p>
                    </div>
                    <Button 
                      className="w-full bg-gradient-primary text-primary-foreground border-0 hover:bg-gradient-primary/90"
                      size="lg"
                    >
                      Comprar Agora
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        {/* Tab de Histórico */}
        <TabsContent value="history" className="space-y-6">
          <div>
            <h3 className="font-bold text-xl mb-2 flex items-center gap-2">
              <Clock className="h-6 w-6 text-muted-foreground" />
              Atividade Recente
            </h3>
            <p className="text-muted-foreground mb-6">
              Como você tem usado seus Créditos Zen
            </p>
            
            <div className="space-y-3">
              {recentActivity.map((activity, index) => (
                <Card key={index} className="hover:shadow-[var(--shadow-card)] transition-all duration-200">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <div className={cn(
                          "p-2 rounded-lg mt-1",
                          activity.type === "gained" 
                            ? "bg-primary/10 text-primary" 
                            : "bg-primary/10 text-primary"
                        )}>
                          {activity.type === "gained" ? (
                            <TrendingUp className="h-4 w-4" />
                          ) : (
                            <Leaf className="h-4 w-4" />
                          )}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-sm">{activity.action}</p>
                          {activity.product && (
                            <p className="text-xs text-muted-foreground">
                              Produto: {activity.product}
                            </p>
                          )}
                          <p className="text-xs text-muted-foreground mt-1">
                            {activity.time}
                          </p>
                        </div>
                      </div>
                       <Badge 
                        variant={activity.type === "gained" ? "default" : "outline"}
                        className={cn(
                          "text-xs font-semibold",
                          activity.type === "gained" 
                            ? "bg-primary/10 text-primary border-primary/20"
                            : "text-primary border-primary/20"
                        )}
                      >
                        {activity.type === "gained" ? '+' : '-'}{activity.cost} Crédito{activity.cost > 1 ? 's' : ''} Zen
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        {/* Tab do Plano Pro */}
        <TabsContent value="pro" className="space-y-6">
          <Card className="border-2 border-accent bg-gradient-to-br from-accent/5 to-accent/10 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-accent opacity-10 rounded-full -translate-y-16 translate-x-16"></div>
            <CardHeader className="text-center pb-6">
              <div className="p-4 bg-gradient-accent rounded-2xl w-fit mx-auto mb-4">
                <Crown className="h-10 w-10 text-accent-foreground" />
              </div>
              <CardTitle className="text-3xl font-bold text-accent">
                Plano Pro
              </CardTitle>
              <p className="text-muted-foreground">
                Uso ilimitado de todas as funcionalidades de IA
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Preço */}
              <div className="text-center py-6 bg-white/50 rounded-2xl">
                <p className="text-4xl font-bold text-accent mb-1">R$ 29,90</p>
                <p className="text-muted-foreground">por mês</p>
                <Badge className="mt-2 bg-accent/10 text-accent border-accent/20">
                  Créditos Zen Ilimitados
                </Badge>
              </div>

              {/* Benefícios */}
              <div className="space-y-4">
                <h4 className="font-bold text-lg">O que está incluso:</h4>
                <div className="space-y-3">
                  {proCoupons.map((benefit, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 bg-white/30 rounded-lg">
                      <div className="p-1 bg-accent/10 rounded-full mt-0.5">
                        <Check className="h-3 w-3 text-accent" />
                      </div>
                      <div>
                        <p className="font-semibold text-sm">{benefit.title}</p>
                        <p className="text-xs text-muted-foreground">{benefit.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <Button 
                size="lg" 
                className="w-full bg-gradient-accent text-accent-foreground border-0 hover:bg-gradient-accent/90"
              >
                Assinar Plano Pro
              </Button>
              
              <p className="text-center text-xs text-muted-foreground">
                Cancele quando quiser. Sem compromisso.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Credits;