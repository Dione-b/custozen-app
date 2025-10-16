import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { 
  Sparkles, 
  CheckCircle, 
  ArrowRight,
  Star
} from "lucide-react";
import { useNavigate } from "react-router-dom";

interface UpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const UpgradeModal = ({ isOpen, onClose }: UpgradeModalProps) => {
  const navigate = useNavigate();

  const handleUpgrade = () => {
    onClose();
    navigate("/subscription?upgrade=true");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-[#4A934A] to-[#2F6F2F] rounded-full flex items-center justify-center">
            <Star className="h-8 w-8 text-white" />
          </div>
          
          <DialogTitle className="text-2xl font-bold text-gray-800">
            Desbloqueie o poder da IA com o Plano Pro
          </DialogTitle>
          
          <DialogDescription className="text-base leading-relaxed text-gray-600">
            Para usar esta funcionalidade e ter acesso a sugestões de preço inteligentes e descrições automáticas, faça o upgrade para o Plano Pro.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 mt-6">
          {/* Pro Benefits */}
          <div className="bg-gray-50 rounded-xl p-6 space-y-4">
            <h4 className="font-semibold text-gray-800 text-center mb-4">Benefícios do Plano Pro</h4>
            
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <CheckCircle className="h-5 w-5 text-[#4A934A] flex-shrink-0" />
                <span className="text-gray-700">Sugestões de preço com IA</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <CheckCircle className="h-5 w-5 text-[#4A934A] flex-shrink-0" />
                <span className="text-gray-700">Descrições de produtos automáticas</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <CheckCircle className="h-5 w-5 text-[#4A934A] flex-shrink-0" />
                <span className="text-gray-700">Fichas de produto ilimitadas</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <CheckCircle className="h-5 w-5 text-[#4A934A] flex-shrink-0" />
                <span className="text-gray-700">Relatórios avançados</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <Button 
              onClick={handleUpgrade}
              className="bg-gradient-to-r from-[#4A934A] to-[#2F6F2F] text-white hover:opacity-90 text-lg py-6"
            >
              Fazer Upgrade Agora
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
            
            <Button 
              variant="ghost" 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              Agora não
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UpgradeModal;