import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { 
  Sparkles, 
  CheckCircle, 
  ArrowRight, 
  Package,
  BarChart3,
  Download
} from "lucide-react";
import { useNavigate } from "react-router-dom";

interface UpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onManageProducts: () => void;
}

const UpgradeModal = ({ isOpen, onClose, onManageProducts }: UpgradeModalProps) => {
  const navigate = useNavigate();

  const handleUpgrade = () => {
    onClose();
    navigate("/subscription?upgrade=true");
  };

  const handleManageProducts = () => {
    onClose();
    onManageProducts();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center">
            <Sparkles className="h-8 w-8 text-primary-foreground" />
          </div>
          
          <DialogTitle className="text-xl font-bold">
            Uau, seu negócio está crescendo! 🎉
          </DialogTitle>
          
          <DialogDescription className="text-base leading-relaxed">
            Que incrível ver você diversificando seus produtos! O plano Gratuito foi pensado 
            para te ajudar a dar os primeiros passos com seus 3 principais itens. 
            Para cadastrar produtos ilimitados e continuar crescendo com total controle 
            e clareza, o Plano Pro é o seu próximo passo natural.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-6">
          {/* Pro Benefits */}
          <div className="bg-muted/30 rounded-lg p-4 space-y-3">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-semibold text-foreground">Plano Pro</h4>
              <Badge className="bg-gradient-primary text-primary-foreground">
                R$ 29,90/mês
              </Badge>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle className="h-4 w-4 text-primary" />
                <span>Produtos ilimitados</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle className="h-4 w-4 text-primary" />
                <span>Créditos Zen ilimitados</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle className="h-4 w-4 text-primary" />
                <span>Relatórios avançados</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle className="h-4 w-4 text-primary" />
                <span>Exportação em PDF e Excel</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <Button 
              onClick={handleUpgrade}
              className="bg-gradient-primary text-primary-foreground hover:opacity-90"
            >
              Conhecer o Plano Pro
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
            
            <Button 
              variant="outline" 
              onClick={handleManageProducts}
              className="text-muted-foreground"
            >
              <Package className="h-4 w-4 mr-2" />
              Gerenciar meus 3 produtos
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UpgradeModal;