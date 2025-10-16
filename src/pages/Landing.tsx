import React, { useRef } from "react";
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
  MessageCircle,
  Heart,
  Target,
  Zap,
  ChevronDown,
  Instagram,
} from "lucide-react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useNavigate } from "react-router-dom";

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

interface NavigateProps {
  onNavigate: () => void;
}

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  badge?: string;
  iconBg: string;
}

interface StepCardProps {
  number: number;
  title: string;
  description: string;
  color: string;
  delay: number;
}

interface PricingCardProps {
  title: string;
  subtitle: string;
  price: string;
  period?: string;
  features: string[];
  isPopular?: boolean;
  buttonText: string;
  onNavigate: () => void;
  isPro?: boolean;
}

// ============================================================================
// ANIMATION CONFIGURATIONS
// ============================================================================

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as any }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const scaleIn = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as any }
};

// ============================================================================
// UTILITY COMPONENTS
// ============================================================================

const AnimatedSection: React.FC<AnimatedSectionProps> = ({ 
  children, 
  className = "", 
  delay = 0 
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.section
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 50 }}
      animate={{ 
        opacity: isInView ? 1 : 0, 
        y: isInView ? 0 : 50 
      }}
      transition={{ 
        duration: 0.7, 
        delay,
        ease: [0.22, 1, 0.36, 1] as any
      }}
    >
      {children}
    </motion.section>
  );
};

const FloatingIcon: React.FC<{
  icon: React.ReactNode;
  className?: string;
  delay?: number;
}> = ({ icon, className = "", delay = 0 }) => (
  <motion.div
    className={`absolute ${className}`}
    initial={{ opacity: 0, scale: 0 }}
    animate={{ opacity: 0.15, scale: 1 }}
    transition={{ duration: 1, delay }}
  >
    <motion.div
      animate={{ 
        y: [0, -20, 0],
        rotate: [0, 5, -5, 0]
      }}
      transition={{ 
        duration: 6, 
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      {icon}
    </motion.div>
  </motion.div>
);

// ============================================================================
// FEATURE COMPONENTS
// ============================================================================

const FeatureCard: React.FC<FeatureCardProps> = ({ 
  icon, 
  title, 
  description, 
  badge,
  iconBg 
}) => (
  <motion.div
    variants={scaleIn}
    whileHover={{ 
      y: -8,
      transition: { duration: 0.3 }
    }}
  >
    <Card className="h-full border-2 border-border/50 hover:border-primary/30 transition-all duration-300 bg-card/50 backdrop-blur-sm shadow-lg hover:shadow-xl">
      <CardContent className="p-8 h-full flex flex-col">
        <div className="flex flex-col items-center text-center gap-6">
          <motion.div 
            className={`p-4 ${iconBg} rounded-2xl`}
            whileHover={{ rotate: [0, -10, 10, 0] }}
            transition={{ duration: 0.5 }}
          >
            {icon}
          </motion.div>
          <div className="flex-1 space-y-4">
            <div className="flex items-center justify-center gap-2">
              <h4 className="font-bold text-xl">{title}</h4>
              {badge && (
                <Badge className="bg-gradient-to-r from-[#E87A5D] to-[#D2691E] text-white border-0 text-xs font-semibold">
                  {badge}
                </Badge>
              )}
            </div>
            <p className="text-muted-foreground leading-relaxed">
              {description}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  </motion.div>
);

const StepCard: React.FC<StepCardProps> = ({ 
  number, 
  title, 
  description, 
  color,
  delay 
}) => (
  <motion.div
    initial={{ opacity: 0, x: -50 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay }}
    className="flex items-start gap-6"
  >
    <motion.div
      className={`w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center font-bold text-2xl shrink-0 ${color} shadow-lg`}
      whileHover={{ scale: 1.1, rotate: 5 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      {number}
    </motion.div>
    <div className="flex-1 pt-2">
      <h4 className="font-bold text-xl md:text-2xl mb-3">{title}</h4>
      <p className="text-muted-foreground text-lg leading-relaxed">
        {description}
      </p>
    </div>
  </motion.div>
);

const PricingCard: React.FC<PricingCardProps> = ({
  title,
  subtitle,
  price,
  period,
  features,
  isPopular,
  buttonText,
  onNavigate,
  isPro
}) => (
  <motion.div
    variants={scaleIn}
    whileHover={{ y: -12 }}
    transition={{ duration: 0.3 }}
    className="relative h-full"
  >
    {isPopular && (
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Badge className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-primary to-accent text-white border-0 px-6 py-2 text-sm font-bold shadow-lg z-10">
          ⭐ Mais Popular
        </Badge>
      </motion.div>
    )}
    <Card className={`h-full border-2 ${isPopular ? 'border-primary/50 bg-gradient-to-br from-primary/5 to-accent/5' : 'border-border/50'} shadow-xl hover:shadow-2xl transition-all duration-300`}>
      <CardContent className="p-8 h-full flex flex-col">
        <div className="text-center mb-8">
          <h4 className="font-bold text-2xl mb-3">{title}</h4>
          <p className="text-muted-foreground text-lg mb-6">{subtitle}</p>
          <motion.div 
            className="mb-2"
            initial={{ scale: 0.5 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <span className="text-5xl font-bold text-primary">{price}</span>
          </motion.div>
          {period && <p className="text-muted-foreground">{period}</p>}
        </div>
        
        <div className="space-y-4 flex-1 mb-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex items-start gap-3"
            >
              <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
              <span className="text-foreground leading-relaxed">{feature}</span>
            </motion.div>
          ))}
        </div>
        
        <Button
          className={`w-full text-lg font-semibold py-6 ${
            isPro 
              ? 'bg-gradient-to-r from-primary to-accent text-white hover:opacity-90 shadow-lg hover:shadow-xl' 
              : 'bg-primary/10 text-primary hover:bg-primary/20 border-2 border-primary/30'
          }`}
          onClick={onNavigate}
        >
          {buttonText}
        </Button>
      </CardContent>
    </Card>
  </motion.div>
);

// ============================================================================
// MAIN SECTIONS
// ============================================================================

const HeroSection: React.FC<NavigateProps> = ({ }) => {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const scale = useTransform(scrollY, [0, 300], [1, 0.95]);

  const navigate = useNavigate();

  const handleNavigateToApp = () => {
    navigate('/app');
  };

  return (
    <section className="relative overflow-hidden min-h-screen flex items-center bg-gradient-to-br from-[#81C784] via-[#66BB6A] to-[#4CAF50]">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(255,255,255,0.15),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,rgba(255,255,255,0.1),transparent_60%)]" />
      
      {/* Floating Icons */}
      <FloatingIcon 
        icon={<Sparkles className="h-20 w-20 text-white" />} 
        className="top-10 right-10"
        delay={0.2}
      />
      <FloatingIcon 
        icon={<Heart className="h-16 w-16 text-white" />} 
        className="top-1/4 left-10"
        delay={0.4}
      />
      <FloatingIcon 
        icon={<Target className="h-14 w-14 text-white" />} 
        className="bottom-1/4 right-20"
        delay={0.6}
      />

      <motion.div 
        className="relative z-10 px-4 py-20 text-center w-full"
        style={{ opacity, scale }}
      >
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="flex items-center justify-center gap-4 mb-8"
            {...fadeInUp}
          >
            <motion.div 
              className="p-4 bg-white/20 rounded-full backdrop-blur-md shadow-2xl"
              whileHover={{ scale: 1.1, rotate: 180 }}
              transition={{ duration: 0.6 }}
            >
              <Leaf className="h-12 w-12 text-white" />
            </motion.div>
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-white">
              CustoZen
            </h1>
          </motion.div>
          
          <motion.h2
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight text-white"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            A paz de saber seu lucro<br />em cada venda.
          </motion.h2>
          
          <motion.p
            className="text-xl md:text-2xl text-white/95 leading-relaxed mb-10 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            O aplicativo que organiza seus custos e calcula seu preço de venda. 
            Comece gratuitamente e organize seus principais produtos agora mesmo.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Button
        size="lg"
        className="bg-white text-primary hover:bg-white/90 text-xl px-12 py-8 h-auto font-bold shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300"
        // 3. Use a função no evento onClick
        onClick={handleNavigateToApp}
      >
        Encontrar minha tranquilidade
        <ArrowRight className="h-6 w-6 ml-3" />
      </Button>
          </motion.div>
          
          <motion.p
            className="mt-6 text-white/90 text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            ✨ Não precisa de cartão de crédito • Cadastro em 30 segundos
          </motion.p>
          
          <motion.div
            className="mt-12"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ChevronDown className="h-8 w-8 text-white mx-auto" />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

const ProblemSection: React.FC = () => (
  <div className="max-w-7xl mx-auto">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
      <motion.div 
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="space-y-6 order-2 lg:order-1"
      >
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
          O estresse da<br />incerteza
        </h2>
        <div className="space-y-6 text-muted-foreground text-lg leading-relaxed">
          <p>
            Você dedica amor e tempo criando produtos únicos, mas quando chega 
            a hora de precificar, o coração acelera.
          </p>
          <motion.p 
            className="font-bold text-foreground text-2xl py-4 px-6 bg-gradient-to-r from-red-50 to-orange-50 rounded-2xl border-l-4 border-red-400"
            initial={{ scale: 0.95, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            "Será que está certo? Vou conseguir vender?<br />Estou lucrando de verdade?"
          </motion.p>
          <p>
            Essa ansiedade na precificação rouba sua paz, afeta sua confiança 
            e impede que você valorize adequadamente seu trabalho artesanal.
          </p>
        </div>
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative flex justify-center lg:justify-end order-1 lg:order-2"
      >
        <motion.div 
          className="w-full max-w-md aspect-square bg-gradient-to-br from-red-100 via-orange-100 to-red-50 rounded-[3rem] flex items-center justify-center shadow-2xl relative"
          whileHover={{ scale: 1.05, rotate: 2 }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          <div className="text-center space-y-6 p-8">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Heart className="h-20 w-20 text-red-400 mx-auto" />
            </motion.div>
            <div className="space-y-3">
              {[32, 24, 28].map((width, i) => (
                <motion.div
                  key={i}
                  className="h-3 bg-red-300 rounded-full mx-auto"
                  style={{ width: `${width}%` }}
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, delay: i * 0.3, repeat: Infinity }}
                />
              ))}
            </div>
          </div>
        </motion.div>
        <motion.div
          className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-yellow-200 to-yellow-300 rounded-full flex items-center justify-center shadow-xl"
          animate={{ 
            rotate: 360,
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            rotate: { duration: 20, repeat: Infinity, ease: "linear" },
            scale: { duration: 3, repeat: Infinity }
          }}
        >
          <Target className="h-10 w-10 text-yellow-700" />
        </motion.div>
      </motion.div>
    </div>
  </div>
);

const SolutionSection: React.FC = () => {
  const features: FeatureCardProps[] = [
    {
      icon: <Calculator className="h-10 w-10 text-primary" />,
      title: "Organize seus custos sem estresse",
      description: "Um lugar calmo para cadastrar seus ingredientes e custos fixos. Faça uma vez e relaxe: cada produto terá seu custo calculado automaticamente, com precisão e simplicidade.",
      iconBg: "bg-primary/10"
    },
    {
      icon: <Sparkles className="h-10 w-10 text-accent" />,
      title: "Precifique com serenidade",
      description: "Nossa IA analisa seus custos e sugere preços de venda justos, além de criar descrições de produtos envolventes. Venda com confiança, sabendo que sua margem está otimizada.",
      badge: "Pro",
      iconBg: "bg-accent/10"
    },
    {
      icon: <Smartphone className="h-10 w-10 text-secondary-foreground" />,
      title: "Sempre ao seu alcance",
      description: "Interface pensada para ser usada no dia a dia: cadastre ingredientes pela câmera, crie fichas enquanto seus produtos estão no forno. Tudo de forma intuitiva e no seu ritmo.",
      iconBg: "bg-secondary/30"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto">
      <motion.div 
        className="text-center mb-16"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <p className="text-xl text-muted-foreground mb-4">
          Respire fundo. Existe um caminho mais tranquilo.
        </p>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground">
          Encontre seu ponto de equilíbrio
        </h2>
      </motion.div>
      
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-3 gap-8"
        variants={staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
      >
        {features.map((feature, index) => (
          <FeatureCard key={index} {...feature} iconBg={feature.iconBg} />
        ))}
      </motion.div>
    </div>
  );
};

const SocialProofSection: React.FC = () => (
  <div className="max-w-5xl mx-auto">
    <motion.h2 
      className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-16"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      Histórias de quem encontrou<br />a paz financeira
    </motion.h2>
    
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      whileHover={{ y: -8 }}
    >
      <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 via-accent/5 to-background shadow-2xl">
        <CardContent className="p-10 md:p-14">
          <div className="flex flex-col md:flex-row items-start gap-8">
            <motion.div
              className="w-24 h-24 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center shrink-0 shadow-xl"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <span className="text-white font-bold text-3xl">AC</span>
            </motion.div>
            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-center gap-3 mb-6">
                <span className="font-bold text-2xl">Ana Clara</span>
                <span className="text-primary text-lg font-semibold">@deliciasdaana</span>
              </div>
              <blockquote className="text-muted-foreground leading-relaxed text-xl md:text-2xl italic">
                "Antes eu ficava ansiosa toda vez que tinha que colocar preço nos meus doces. 
                Com o CustoZen, finalmente durmo tranquila sabendo que meus preços estão certos. 
                É como ter um amigo contador sempre comigo!"
              </blockquote>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  </div>
);

const PricingSection: React.FC<NavigateProps> = ({ onNavigate }) => {
  const plans: Omit<PricingCardProps, 'onNavigate'>[] = [
    {
      title: "Plano Gratuito",
      subtitle: "Para quem está começando a organizar a casa.",
      price: "Grátis",
      features: [
        "Até 3 Fichas de Produto ativas",
        "Cadastro de Insumos ilimitado",
        "Cálculo de Custo Fixo e Mão de Obra"
      ],
      buttonText: "Começar Gratuitamente",
      isPopular: false,
      isPro: false
    },
    {
      title: "Plano Pro",
      subtitle: "Para quem leva o negócio a sério e quer crescer.",
      price: "R$ 29,90",
      period: "/mês",
      features: [
        "Fichas de Produto ilimitadas",
        "Sugestões de preço com IA",
        "Gerador de descrições de produtos",
        "Relatórios avançados de lucratividade",
        "Exportação em PDF e Planilha"
      ],
      buttonText: "Assinar Plano Pro",
      isPopular: true,
      isPro: true
    }
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <motion.h2 
        className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-16"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        Um Plano para Cada Momento<br />do seu Negócio
      </motion.h2>
      
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto"
        variants={staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
      >
        {plans.map((plan, index) => (
          <PricingCard key={index} {...plan} onNavigate={onNavigate} />
        ))}
      </motion.div>
    </div>
  );
};

const HowItWorksSection: React.FC = () => {
  const steps = [
    {
      number: 1,
      title: "Cadastre seus insumos",
      description: "Informe suas matérias-primas e custos fixos (você só faz isso uma vez!).",
      color: "bg-gradient-to-br from-primary to-primary/80 text-white"
    },
    {
      number: 2,
      title: "Monte seu produto",
      description: "Crie a 'receita' do seu produto, adicionando os insumos da sua lista.",
      color: "bg-gradient-to-br from-accent to-accent/80 text-white"
    },
    {
      number: 3,
      title: "Veja a mágica acontecer",
      description: "Defina sua margem de lucro e veja o preço de venda ideal ser calculado na hora, com todos os custos incluídos.",
      color: "bg-gradient-to-br from-secondary to-secondary/80 text-white"
    }
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <motion.h2 
        className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-16"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        Começar é mais fácil que<br />receita de brigadeiro
      </motion.h2>
      
      <div className="space-y-12">
        {steps.map((step, index) => (
          <StepCard 
            key={step.number} 
            {...step} 
            delay={index * 0.2}
          />
        ))}
      </div>
    </div>
  );
};

const FinalPitchSection: React.FC<NavigateProps> = ({ onNavigate }) => {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 200], [0, 1]);

  const navigate = useNavigate();

  const handleNavigateToApp = () => {
    navigate('/app');
  };

  return (
    <motion.section 
      className="relative overflow-hidden min-h-screen flex items-center bg-gradient-to-br from-[#81C784] via-[#66BB6A] to-[#4CAF50]"
      style={{ opacity }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(255,255,255,0.15),transparent_50%)]" />
      
      <FloatingIcon 
        icon={<Zap className="h-24 w-24 text-white" />} 
        className="top-10 left-10"
      />
      <FloatingIcon 
        icon={<TrendingUp className="h-20 w-20 text-white" />} 
        className="bottom-20 right-20"
      />

      <div className="relative z-10 max-w-5xl mx-auto text-center px-4">
        <motion.h2 
          className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 leading-tight text-white"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          Do caos à clareza,<br />sem estresse.
        </motion.h2>
        
        <motion.p 
          className="text-xl md:text-2xl text-white/95 mb-12 leading-relaxed max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Deixe a matemática conosco e dedique-se ao que realmente importa: 
          criar com amor e vender com tranquilidade.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Button
        size="lg"
        className="bg-white text-primary hover:bg-white/90 text-xl px-12 py-8 h-auto font-bold shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300"
        // 3. Use a mesma função aqui
        onClick={handleNavigateToApp}
      >
        Quero ter o controle (e a calma)
        <TrendingUp className="h-6 w-6 ml-3" />
      </Button>
        </motion.div>
      </div>
    </motion.section>
  );
};

const Footer: React.FC = () => (
  <footer className="px-4 py-16 bg-gradient-to-b from-card to-muted/30 border-t border-border/50">
    <div className="max-w-6xl mx-auto">
      <motion.div 
        className="flex flex-col md:flex-row items-center justify-between gap-8 mb-10"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <div className="flex items-center gap-3">
          <div className="p-3 bg-primary/10 rounded-full">
            <Leaf className="h-8 w-8 text-primary" />
          </div>
          <span className="text-2xl font-bold">CustoZen</span>
        </div>
        
        <div className="flex items-center gap-6">
          <motion.button 
            className="p-3 hover:bg-primary/10 rounded-full transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
          <Instagram className="h-6 w-6 text-muted-foreground hover:text-primary transition-colors" />
          </motion.button>
          <motion.button 
            className="p-3 hover:bg-primary/10 rounded-full transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <MessageCircle className="h-6 w-6 text-muted-foreground hover:text-primary transition-colors" />
          </motion.button>
        </div>
      </motion.div>
      
      <motion.div 
        className="flex flex-wrap items-center justify-center gap-6 mb-8"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
      >
        <button className="text-muted-foreground hover:text-primary transition-colors font-medium">
          Contato
        </button>
        <span className="text-muted-foreground">•</span>
        <button className="text-muted-foreground hover:text-primary transition-colors font-medium">
          Política de Privacidade
        </button>
        <span className="text-muted-foreground">•</span>
        <button className="text-muted-foreground hover:text-primary transition-colors font-medium">
          Termos de Uso
        </button>
      </motion.div>
      
      <motion.div 
        className="text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
      >
        <p className="text-sm text-muted-foreground">
          © 2025 CustoZen - Todos os direitos reservados.
        </p>
      </motion.div>
    </div>
  </footer>
);

// ============================================================================
// MAIN COMPONENT
// ============================================================================

const LandingPage: React.FC = () => {
  const handleGetStarted = () => {
    console.log("Navegando para /app");
    // Em produção: navigate("/app");
  };

  return (
    <div className="min-h-screen bg-background">
      <HeroSection onNavigate={handleGetStarted} />
      
      <AnimatedSection className="px-4 py-24 md:py-32 bg-gradient-to-b from-muted/30 to-background">
        <ProblemSection />
      </AnimatedSection>
      
      <AnimatedSection className="px-4 py-24 md:py-32">
        <SolutionSection />
      </AnimatedSection>
      
      <AnimatedSection className="px-4 py-24 md:py-32 bg-gradient-to-b from-background to-muted/20">
        <SocialProofSection />
      </AnimatedSection>
      
      <AnimatedSection className="px-4 py-24 md:py-32 bg-muted/20">
        <PricingSection onNavigate={handleGetStarted} />
      </AnimatedSection>
      
      <AnimatedSection className="px-4 py-24 md:py-32 bg-gradient-to-b from-muted/20 to-background">
        <HowItWorksSection />
      </AnimatedSection>
      
      <FinalPitchSection onNavigate={handleGetStarted} />
      
      <Footer />
    </div>
  );
};

export default LandingPage