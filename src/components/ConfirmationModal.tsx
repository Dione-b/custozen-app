import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Leaf, AlertCircle } from "lucide-react";

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  cost: number;
  currentCredits: number;
}

export const ConfirmationModal = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title, 
  description, 
  cost, 
  currentCredits 
}: ConfirmationModalProps) => {
  const remainingCredits = currentCredits - cost;
  const hasEnoughCredits = remainingCredits >= 0;

  const handleConfirm = () => {
    if (hasEnoughCredits) {
      onConfirm();
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-sm mx-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            {hasEnoughCredits ? (
              <div className="p-2 bg-gradient-primary rounded-xl">
                <Leaf className="h-6 w-6 text-primary-foreground" />
              </div>
            ) : (
              <div className="p-2 bg-destructive/20 rounded-xl">
                <AlertCircle className="h-6 w-6 text-destructive" />
              </div>
            )}
            <div>
              <h2 className="text-lg font-bold">{title}</h2>
            </div>
          </DialogTitle>
          <DialogDescription className="text-left">
            {description}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          <div className="bg-muted/30 p-4 rounded-lg space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Custo da ação:</span>
              <span className="font-semibold text-primary">{cost} Crédito{cost > 1 ? 's' : ''} Zen</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Saldo atual:</span>
              <span className="font-semibold">{currentCredits} Créditos Zen</span>
            </div>
            <hr className="border-border" />
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Saldo após ação:</span>
              <span className={`font-bold ${hasEnoughCredits ? 'text-foreground' : 'text-destructive'}`}>
                {remainingCredits} Créditos Zen
              </span>
            </div>
          </div>

          {!hasEnoughCredits && (
            <div className="bg-destructive/10 border border-destructive/20 p-3 rounded-lg">
              <p className="text-sm text-destructive font-medium">
                Créditos insuficientes. Você precisa de mais {Math.abs(remainingCredits)} Crédito{Math.abs(remainingCredits) > 1 ? 's' : ''} Zen.
              </p>
            </div>
          )}

          <div className="flex gap-3">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cancelar
            </Button>
            <Button 
              onClick={handleConfirm}
              disabled={!hasEnoughCredits}
              className="flex-1 bg-gradient-primary text-primary-foreground border-0 hover:bg-gradient-primary/90"
            >
              {hasEnoughCredits ? 'Confirmar' : 'Recarregar Créditos'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};