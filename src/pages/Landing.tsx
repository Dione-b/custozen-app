import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Calculator, 
  Sparkles, 
  Smartphone, 
  TrendingUp,
  CheckCircle,
  ArrowRight,
  Leaf,
  Instagram,
  MessageCircle
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/app");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-hero text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(255,255,255,0.1),transparent_50%)]" />
        <div className="absolute top-4 right-4 opacity-20">
          <Sparkles className="h-16 w-16 md:h-20 md:w-20" />
        </div>
        
        <div className="relative px-4 py-12 md:py-20 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="p-3 md:p-4 bg-white/10 rounded-full backdrop-blur-sm">
                <Leaf className="h-8 w-8 md:h-10 md:w-10" />
              </div>
              <h1 className="text-3xl md:text-5xl font-bold tracking-tight">CustoZen</h1>
            </div>
            
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 leading-tight max-w-3xl mx-auto">
              A paz de saber seu lucro em cada venda.
            </h2>
            
            <p className="text-lg md:text-xl opacity-95 leading-relaxed mb-8 md:mb-10 max-w-2xl mx-auto">
              CustoZen é o aplicativo que organiza seus custos e calcula seu preço de venda. 
              Comece gratuitamente e organize seus principais produtos agora mesmo.
            </p>
            
              <Button 
              size="lg"
              className="bg-white text-primary hover:bg-white/90 text-lg md:text-xl px-8 md:px-12 py-6 md:py-8 h-auto font-semibold shadow-lg"
              onClick={handleGetStarted}
            >
              Encontrar minha tranquilidade
              <ArrowRight className="h-5 w-5 md:h-6 md:w-6 ml-2" />
            </Button>
            
            <div className="mt-4 md:mt-6 space-y-2">
              <p className="text-sm md:text-base opacity-80">
                Não precisa de cartão de crédito. Cadastro em 30 segundos.
              </p>
              <div className="flex items-center justify-center gap-2 text-white/90">
                <Sparkles className="h-4 w-4" />
                <span className="text-sm md:text-base font-medium">
                  Comece com 50 Créditos Zen de presente para experimentar todas as funcionalidades
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="px-4 py-12 md:py-20 bg-muted/30">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-2xl md:text-4xl font-bold mb-6 md:mb-12 text-foreground">
            O estresse da incerteza
          </h3>
          
          <div className="text-left md:text-center space-y-4 md:space-y-6 text-muted-foreground leading-relaxed text-base md:text-lg max-w-3xl mx-auto">
            <p>
              Você dedica amor e tempo criando produtos únicos, mas quando chega a hora de precificar, 
              o coração acelera. <span className="font-semibold text-foreground">"Será que está certo? Vou conseguir vender? Estou lucrando de verdade?"</span>
            </p>
            
            <p>
              Essa ansiedade na precificação rouba sua paz, afeta sua confiança 
              e impede que você valorize adequadamente seu trabalho artesanal.
            </p>
            
            <p className="font-semibold text-destructive text-center mt-6 md:mt-8 text-lg md:text-xl">
              Respire fundo. Existe um caminho mais tranquilo.
            </p>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="px-4 py-12 md:py-20">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-2xl md:text-4xl font-bold text-center mb-8 md:mb-16 text-foreground">
            Encontre seu ponto de equilíbrio
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <Card className="shadow-[var(--shadow-card)] border-2 hover:shadow-[var(--shadow-mobile)] transition-all duration-200">
              <CardContent className="p-6 md:p-8">
                <div className="flex md:flex-col items-start md:items-center gap-4 md:gap-6 md:text-center">
                  <div className="p-3 md:p-4 bg-primary/10 rounded-full shrink-0">
                    <Calculator className="h-6 w-6 md:h-8 md:w-8 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg md:text-xl mb-2 md:mb-4">
                      Organize seus custos sem estresse
                    </h4>
                    <p className="text-muted-foreground leading-relaxed md:text-base">
                      Um lugar calmo para cadastrar seus ingredientes e custos fixos. 
                      Faça uma vez e relaxe: cada produto terá seu custo calculado automaticamente, 
                      com precisão e simplicidade.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-[var(--shadow-card)] border-2 hover:shadow-[var(--shadow-mobile)] transition-all duration-200">
              <CardContent className="p-6 md:p-8">
                <div className="flex md:flex-col items-start md:items-center gap-4 md:gap-6 md:text-center">
                  <div className="p-3 md:p-4 bg-accent/10 rounded-full shrink-0">
                    <Sparkles className="h-6 w-6 md:h-8 md:w-8 text-accent" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-2 md:mb-4">
                      <h4 className="font-semibold text-lg md:text-xl">
                        Precifique com serenidade
                      </h4>
                      <Badge className="bg-primary/10 text-primary border-primary/20 text-xs font-semibold">
                        1 Crédito
                      </Badge>
                    </div>
                    <p className="text-muted-foreground leading-relaxed md:text-base">
                      Nossa IA sugere preços justos baseados nos seus custos reais e ainda cria 
                      descrições envolventes para seus produtos. Venda com confiança, 
                      sabendo que cada centavo está calculado.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-[var(--shadow-card)] border-2 hover:shadow-[var(--shadow-mobile)] transition-all duration-200">
              <CardContent className="p-6 md:p-8">
                <div className="flex md:flex-col items-start md:items-center gap-4 md:gap-6 md:text-center">
                  <div className="p-3 md:p-4 bg-secondary/60 rounded-full shrink-0">
                    <Smartphone className="h-6 w-6 md:h-8 md:w-8 text-secondary-foreground" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg md:text-xl mb-2 md:mb-4">
                      Sempre ao seu alcance, sem complicação
                    </h4>
                    <p className="text-muted-foreground leading-relaxed md:text-base">
                      Interface pensada para ser usada no dia a dia: cadastre ingredientes pela câmera, 
                      crie fichas enquanto seus produtos estão no forno. Tudo de forma intuitiva 
                      e no seu ritmo.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="px-4 py-12 md:py-20 bg-muted/20">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl md:text-4xl font-bold text-center mb-8 md:mb-16 text-foreground">
            Histórias de quem encontrou a paz financeira
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6 max-w-2xl mx-auto">
            <Card className="shadow-[var(--shadow-card)] border-2">
              <CardContent className="p-6 md:p-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-hero rounded-full flex items-center justify-center shrink-0">
                    <span className="text-white font-bold text-lg md:text-xl">AC</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2 md:mb-3">
                      <span className="font-semibold text-base md:text-lg">Ana Clara</span>
                      <span className="text-primary text-sm md:text-base font-medium">@deliciasdaana</span>
                    </div>
                    <p className="text-muted-foreground leading-relaxed italic text-base md:text-lg">
                      "Antes eu ficava ansiosa toda vez que tinha que colocar preço nos meus doces. 
                      Com o CustoZen, finalmente durmo tranquila sabendo que meus preços estão certos. 
                      É como ter um amigo contador sempre comigo!"
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="px-4 py-12 md:py-20 bg-muted/20">
        <div className="max-w-6xl mx-auto text-center">
          <h3 className="text-2xl md:text-4xl font-bold mb-6 md:mb-12 text-foreground">
            Um Plano para Cada Momento do seu Negócio
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
            {/* Plano Gratuito */}
            <Card className="shadow-[var(--shadow-card)] border-2 relative">
              <CardContent className="p-6 md:p-8">
                <div className="text-center mb-6">
                  <div className="p-3 bg-primary/10 rounded-full w-fit mx-auto mb-4">
                    <Calculator className="h-8 w-8 text-primary" />
                  </div>
                  <h4 className="font-bold text-xl md:text-2xl mb-2 text-foreground">
                    Plano Gratuito - O Começo Zen
                  </h4>
                  <p className="text-muted-foreground mb-4 text-base md:text-lg">
                    Para quem está começando a organizar a casa.
                  </p>
                  <div className="text-3xl md:text-4xl font-bold text-primary mb-4">
                    Grátis
                  </div>
                </div>

                <div className="space-y-3 text-left">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                    <span className="text-foreground">Até 3 Fichas de Produto ativas</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                    <span className="text-foreground">Cadastro de Insumos ilimitado</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                    <span className="text-foreground">Cálculo de Custo Fixo e Mão de Obra</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                    <span className="text-foreground">50 Créditos Zen de boas-vindas</span>
                  </div>
                </div>

                <Button 
                  className="w-full mt-6 bg-primary/10 text-primary hover:bg-primary/20 border border-primary/30"
                  onClick={handleGetStarted}
                >
                  Começar Gratuitamente
                </Button>
              </CardContent>
            </Card>

            {/* Plano Pro */}
            <Card className="shadow-[var(--shadow-card)] border-2 relative bg-gradient-to-br from-primary/5 to-accent/5">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-gradient-primary text-primary-foreground px-4 py-1 font-semibold">
                  Mais Popular
                </Badge>
              </div>
              
              <CardContent className="p-6 md:p-8">
                <div className="text-center mb-6">
                  <div className="p-3 bg-gradient-primary rounded-full w-fit mx-auto mb-4">
                    <Sparkles className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <h4 className="font-bold text-xl md:text-2xl mb-2 text-foreground">
                    Plano Pro - Crescimento sem Limites
                  </h4>
                  <p className="text-muted-foreground mb-4 text-base md:text-lg">
                    Para quem leva o negócio a sério e quer crescer.
                  </p>
                  <div className="text-3xl md:text-4xl font-bold text-primary mb-1">
                    R$ 29,90
                  </div>
                  <p className="text-muted-foreground text-sm">/mês</p>
                </div>

                <div className="space-y-3 text-left">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                    <span className="text-foreground font-medium">Fichas de Produto ilimitadas</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                    <span className="text-foreground">Créditos Zen ilimitados</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                    <span className="text-foreground">Relatórios avançados de lucratividade</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                    <span className="text-foreground">Exportação de dados em PDF e Planilha</span>
                  </div>
                </div>

                <Button 
                  className="w-full mt-6 bg-gradient-primary text-primary-foreground hover:opacity-90"
                  onClick={() => navigate("/subscription?upgrade=true")}
                >
                  Assinar Plano Pro
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="px-4 py-12 md:py-20">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl md:text-4xl font-bold text-center mb-8 md:mb-16 text-foreground">
            Começar é mais fácil que receita de brigadeiro.
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <div className="flex md:flex-col items-start md:items-center gap-4 md:gap-6 md:text-center">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-lg md:text-xl shrink-0">
                1
              </div>
              <div>
                <h4 className="font-semibold text-lg md:text-xl mb-2 md:mb-4">Cadastre seus insumos</h4>
                <p className="text-muted-foreground md:text-base leading-relaxed">
                  Informe suas matérias-primas e custos fixos (você só faz isso uma vez!).
                </p>
              </div>
            </div>

            <div className="flex md:flex-col items-start md:items-center gap-4 md:gap-6 md:text-center">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-accent text-accent-foreground rounded-full flex items-center justify-center font-bold text-lg md:text-xl shrink-0">
                2
              </div>
              <div>
                <h4 className="font-semibold text-lg md:text-xl mb-2 md:mb-4">Monte seu produto</h4>
                <p className="text-muted-foreground md:text-base leading-relaxed">
                  Crie a "receita" do seu produto, adicionando os insumos da sua lista.
                </p>
              </div>
            </div>

            <div className="flex md:flex-col items-start md:items-center gap-4 md:gap-6 md:text-center">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-secondary text-secondary-foreground rounded-full flex items-center justify-center font-bold text-lg md:text-xl shrink-0">
                3
              </div>
              <div>
                <h4 className="font-semibold text-lg md:text-xl mb-2 md:mb-4">Veja a mágica acontecer</h4>
                <p className="text-muted-foreground md:text-base leading-relaxed">
                  Defina sua margem de lucro e veja o preço de venda ideal ser calculado na hora, 
                  com todos os custos incluídos.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="px-4 py-12 md:py-20 bg-gradient-hero text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(255,255,255,0.1),transparent_50%)]" />
        
        <div className="relative max-w-4xl mx-auto text-center">
          <h3 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 leading-tight max-w-3xl mx-auto">
            Do caos à clareza, sem estresse.
          </h3>
          
          <p className="text-lg md:text-xl opacity-95 mb-8 md:mb-12 leading-relaxed max-w-2xl mx-auto">
            Deixe a matemática conosco e dedique-se ao que realmente importa: 
            criar com amor e vender com tranquilidade.
          </p>
          
          <Button 
            size="lg"
            className="bg-white text-primary hover:bg-white/90 text-lg md:text-xl px-8 md:px-12 py-6 md:py-8 h-auto font-semibold shadow-lg"
            onClick={handleGetStarted}
          >
            Quero ter o controle (e a calma)
            <TrendingUp className="h-5 w-5 md:h-6 md:w-6 ml-2" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-4 py-8 md:py-12 bg-card border-t border-border">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8">
            <div className="flex items-center justify-center gap-6">
              <button className="p-2 hover:bg-muted rounded-full transition-colors">
                <Instagram className="h-5 w-5 text-muted-foreground" />
              </button>
              <button className="p-2 hover:bg-muted rounded-full transition-colors">
                <MessageCircle className="h-5 w-5 text-muted-foreground" />
              </button>
            </div>
            
            <div className="flex items-center justify-center gap-4 md:gap-6 text-sm text-muted-foreground">
              <button className="hover:text-foreground transition-colors">Contato</button>
              <button className="hover:text-foreground transition-colors">Política de Privacidade</button>
              <button className="hover:text-foreground transition-colors">Termos de Uso</button>
            </div>
          </div>
          
          <div className="text-center mt-6 md:mt-8">
            <p className="text-xs md:text-sm text-muted-foreground">
              © 2025 CustoZen - Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;