import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Leaf, Zap, Crown, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface CreditsModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentCredits: number;
}

const creditPackages = [
  {
    id: "starter",
    fichas: 50,
    price: "9,90",
    popular: false,
    description: "Ideal para testar"
  },
  {
    id: "standard",
    fichas: 150,
    price: "19,90",
    popular: true,
    description: "Mais usado"
  },
  {
    id: "premium",
    fichas: 350,
    price: "39,90",
    popular: false,
    description: "Melhor custo-benefício"
  }
];

const recentActivity = [
  { action: "Descrição de produto gerada", cost: 1, time: "2 horas atrás" },
  { action: "Análise de margem otimizada", cost: 3, time: "1 dia atrás" },
  { action: "Sugestão de preços sazonais", cost: 5, time: "2 dias atrás" }
];

export const CreditsModal = ({ isOpen, onClose, currentCredits }: CreditsModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md mx-auto max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <div className="p-2 bg-gradient-primary rounded-xl">
              <Leaf className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Meus Créditos Zen</h2>
              <p className="text-sm text-muted-foreground font-normal">
                Recarregue sua tranquilidade
              </p>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 mt-6">
          {/* Saldo Atual */}
          <div className="text-center">
            <div className="inline-flex items-center gap-3 bg-gradient-card p-6 rounded-2xl shadow-[var(--shadow-card)]">
              <Leaf className="h-8 w-8 text-primary" />
              <div>
                <p className="text-3xl font-bold text-primary">{currentCredits}</p>
                <p className="text-sm text-muted-foreground">Créditos Zen disponíveis</p>
              </div>
            </div>
          </div>

          {/* Pacotes de Fichas */}
          <div>
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <Zap className="h-5 w-5 text-accent" />
              Recarregar Créditos Zen
            </h3>
            <div className="space-y-3">
              {creditPackages.map((pack) => (
                <Card key={pack.id} className={cn(
                  "relative overflow-hidden transition-all duration-200",
                  "hover:shadow-[var(--shadow-mobile)] cursor-pointer",
                  "border-2",
                  pack.popular ? "border-primary bg-primary/5" : "border-border"
                )}>
                  {pack.popular && (
                    <Badge className="absolute top-3 right-3 bg-gradient-primary text-primary-foreground border-0 text-xs">
                      Mais Popular
                    </Badge>
                  )}
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-gradient-warm rounded-lg">
                          <Leaf className="h-5 w-5 text-accent" />
                        </div>
                        <div>
                          <p className="font-bold text-lg">{pack.fichas} Créditos Zen</p>
                          <p className="text-xs text-muted-foreground">{pack.description}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-bold text-primary">R$ {pack.price}</p>
                        <Button 
                          size="sm" 
                          className="mt-2 bg-gradient-primary text-primary-foreground border-0 hover:bg-gradient-primary/90"
                        >
                          Comprar
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Plano Pro */}
          <Card className="border-2 border-accent bg-accent/5">
            <CardContent className="p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-gradient-accent rounded-lg">
                  <Crown className="h-5 w-5 text-accent-foreground" />
                </div>
                <div>
                  <h4 className="font-bold text-lg">Plano Pro</h4>
                  <p className="text-sm text-muted-foreground">Créditos Zen ilimitados</p>
                </div>
              </div>
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm">
                  <Check className="h-4 w-4 text-accent" />
                  <span>Uso ilimitado de todas as IAs</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Check className="h-4 w-4 text-accent" />
                  <span>Análises avançadas de mercado</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Check className="h-4 w-4 text-accent" />
                  <span>Suporte prioritário</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-accent">R$ 29,90</p>
                  <p className="text-xs text-muted-foreground">por mês</p>
                </div>
                <Button className="bg-gradient-accent text-accent-foreground border-0 hover:bg-gradient-accent/90">
                  Assinar Pro
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Histórico Recente */}
          <div>
            <h3 className="font-semibold mb-3">Atividade Recente</h3>
            <div className="space-y-2">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                  <div>
                    <p className="text-sm font-medium">{activity.action}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    -{activity.cost} Crédito{activity.cost > 1 ? 's' : ''} Zen
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};