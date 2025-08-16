import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  CheckCircle, 
  Package, 
  Sparkles, 
  CreditCard,
  ArrowLeft,
  Crown
} from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";

const Subscription = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const showUpgrade = searchParams.get("upgrade") === "true";

  const handleSubscribe = () => {
    // Aqui seria integrada a API de pagamento
    console.log("Iniciando processo de assinatura...");
  };

  const handleBuyCredits = () => {
    // Aqui seria integrada a compra de créditos avulsos
    console.log("Comprando créditos...");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="flex items-center gap-4 p-4 border-b border-border">
        <Button 
          variant="ghost" 
          size="sm"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar
        </Button>
        <h1 className="text-xl font-bold">
          {showUpgrade ? "Upgrade para Pro" : "Planos e Créditos"}
        </h1>
      </div>

      <div className="p-4 space-y-6">
        {/* Plano Atual */}
        <Card className="shadow-[var(--shadow-card)] border-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5 text-primary" />
              Seu Plano Atual
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-lg">Plano Gratuito</h3>
                <p className="text-muted-foreground text-sm">
                  3/3 produtos criados
                </p>
              </div>
              <Badge className="bg-primary/10 text-primary border-primary/20">
                Grátis
              </Badge>
            </div>
            
            <div className="mt-4 space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle className="h-4 w-4 text-primary" />
                <span>Até 3 produtos</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle className="h-4 w-4 text-primary" />
                <span>Insumos ilimitados</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle className="h-4 w-4 text-primary" />
                <span>25 Créditos Zen restantes</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Plano Pro */}
        <Card className="shadow-[var(--shadow-card)] border-2 bg-gradient-to-br from-primary/5 to-accent/5 relative">
          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
            <Badge className="bg-gradient-primary text-primary-foreground px-4 py-1 font-semibold">
              <Crown className="h-3 w-3 mr-1" />
              Recomendado
            </Badge>
          </div>

          <CardHeader className="pt-8">
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              Plano Pro
            </CardTitle>
          </CardHeader>
          
          <CardContent>
            <div className="mb-6">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-primary">R$ 29,90</span>
                <span className="text-muted-foreground">/mês</span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                Cancele quando quiser
              </p>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle className="h-4 w-4 text-primary" />
                <span className="font-medium">Produtos ilimitados</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle className="h-4 w-4 text-primary" />
                <span>Créditos Zen ilimitados</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle className="h-4 w-4 text-primary" />
                <span>Relatórios avançados de lucratividade</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle className="h-4 w-4 text-primary" />
                <span>Exportação em PDF e Excel</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle className="h-4 w-4 text-primary" />
                <span>Suporte prioritário</span>
              </div>
            </div>

            <Button 
              onClick={handleSubscribe}
              className="w-full h-12 bg-gradient-primary text-primary-foreground hover:opacity-90"
            >
              <CreditCard className="h-4 w-4 mr-2" />
              Assinar Plano Pro
            </Button>
          </CardContent>
        </Card>

        {/* Comprar Créditos Avulsos */}
        <Card className="shadow-[var(--shadow-card)] border-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-accent" />
              Créditos Zen Avulsos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-sm mb-4">
              Compre créditos apenas quando precisar usar recursos de IA, 
              sem compromisso mensal.
            </p>

            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="p-4 border rounded-lg text-center">
                <h4 className="font-bold text-lg">100 Créditos</h4>
                <p className="text-2xl font-bold text-accent">R$ 9,90</p>
                <p className="text-xs text-muted-foreground">R$ 0,099 por crédito</p>
              </div>
              <div className="p-4 border rounded-lg text-center bg-accent/5">
                <Badge className="mb-2 bg-accent/20 text-accent">Popular</Badge>
                <h4 className="font-bold text-lg">500 Créditos</h4>
                <p className="text-2xl font-bold text-accent">R$ 39,90</p>
                <p className="text-xs text-muted-foreground">R$ 0,079 por crédito</p>
              </div>
            </div>

            <Button 
              variant="outline"
              onClick={handleBuyCredits}
              className="w-full h-12"
            >
              <Sparkles className="h-4 w-4 mr-2" />
              Comprar Créditos
            </Button>
          </CardContent>
        </Card>

        {/* FAQ Rápido */}
        <Card className="shadow-[var(--shadow-card)]">
          <CardContent className="p-4">
            <h4 className="font-semibold mb-3">💡 Dúvidas Frequentes</h4>
            
            <div className="space-y-3 text-sm">
              <div>
                <p className="font-medium text-foreground">O que são Créditos Zen?</p>
                <p className="text-muted-foreground">
                  Créditos usados para recursos de IA como descrições automáticas e insights personalizados.
                </p>
              </div>
              
              <div>
                <p className="font-medium text-foreground">Posso cancelar a qualquer momento?</p>
                <p className="text-muted-foreground">
                  Sim, você pode cancelar sua assinatura Pro a qualquer momento sem multa.
                </p>
              </div>
              
              <div>
                <p className="font-medium text-foreground">O que acontece se eu cancelar?</p>
                <p className="text-muted-foreground">
                  Você volta para o plano gratuito, mantendo seus 3 produtos principais.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Subscription;