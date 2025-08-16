import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Camera, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ExtractedData {
  nome?: string;
  preco?: number;
  quantidade?: number;
  unidade?: string;
}

interface CameraCaptureProps {
  onDataExtracted: (data: ExtractedData) => void;
  className?: string;
}

export const CameraCapture = ({ onDataExtracted, className }: CameraCaptureProps) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [extractedData, setExtractedData] = useState<ExtractedData | null>(null);

  const simulateOCR = async () => {
    setIsProcessing(true);
    
    // Simula o processamento da IA/OCR
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Dados simulados extraídos da "imagem"
    const mockData: ExtractedData = {
      nome: "Farinha de Trigo Especial",
      preco: 8.50,
      quantidade: 1,
      unidade: "kg"
    };
    
    setExtractedData(mockData);
    setIsProcessing(false);
  };

  const handleConfirm = () => {
    if (extractedData) {
      onDataExtracted(extractedData);
      setExtractedData(null);
    }
  };

  const handleRetry = () => {
    setExtractedData(null);
    simulateOCR();
  };

  return (
    <div className={className}>
      {!extractedData && !isProcessing && (
        <Card className="border-dashed border-2 border-muted-foreground/25">
          <CardContent className="p-6 text-center">
            <div className="flex flex-col items-center gap-4">
              <div className="p-4 bg-primary/10 rounded-full">
                <Camera className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold mb-2">Escanear com Câmera</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Fotografe a nota fiscal ou embalagem do produto para extrair automaticamente nome e preço
                </p>
              </div>
              <Button onClick={simulateOCR} className="w-full">
                <Camera className="h-4 w-4 mr-2" />
                Abrir Câmera
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {isProcessing && (
        <Card>
          <CardContent className="p-6 text-center">
            <div className="flex flex-col items-center gap-4">
              <div className="p-4 bg-primary/10 rounded-full animate-pulse">
                <Loader2 className="h-8 w-8 text-primary animate-spin" />
              </div>
              <div>
                <h3 className="font-semibold mb-2">Processando Imagem</h3>
                <p className="text-sm text-muted-foreground">
                  A IA está extraindo informações da imagem...
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {extractedData && (
        <Card className="border-accent">
          <CardContent className="p-4">
            <div className="flex items-start gap-3 mb-4">
              <div className="p-2 bg-accent/10 rounded-lg">
                <CheckCircle className="h-5 w-5 text-accent" />
              </div>
              <div>
                <h3 className="font-semibold text-sm">Dados Extraídos</h3>
                <p className="text-xs text-muted-foreground">
                  Verifique se as informações estão corretas
                </p>
              </div>
            </div>
            
            <div className="space-y-2 mb-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Produto:</span>
                <Badge variant="outline">{extractedData.nome}</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Preço:</span>
                <Badge variant="outline">R$ {extractedData.preco?.toFixed(2)}</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Quantidade:</span>
                <Badge variant="outline">
                  {extractedData.quantidade} {extractedData.unidade}
                </Badge>
              </div>
            </div>
            
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={handleRetry} className="flex-1">
                <AlertCircle className="h-3 w-3 mr-1" />
                Reescanear
              </Button>
              <Button size="sm" onClick={handleConfirm} className="flex-1">
                <CheckCircle className="h-3 w-3 mr-1" />
                Confirmar
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};