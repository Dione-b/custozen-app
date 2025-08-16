import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { NumericInput, ButtonGroup } from "@/components/ui/form-inputs";
import { FormSection, FormRow, FormHint } from "@/components/ui/form-layout";
import { Plus, Package, Edit, Trash2, Camera } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface Insumo {
  id: string;
  nome: string;
  quantidade: number;
  unidade: string;
  precoUnitario: number;
  fornecedor?: string;
  dataUltimaCompra: string;
}

const unidadesComuns = [
  { value: "kg", label: "kg" },
  { value: "g", label: "g" },
  { value: "litro", label: "litro" },
  { value: "ml", label: "ml" },
  { value: "unidade", label: "unidade" }
];

export const MobileInsumos = () => {
  const [insumos, setInsumos] = useState<Insumo[]>([
    { id: "1", nome: "Farinha de Trigo", quantidade: 5, unidade: "kg", precoUnitario: 5.00, fornecedor: "Padaria Central", dataUltimaCompra: "2024-01-15" },
    { id: "2", nome: "Açúcar Cristal", quantidade: 2, unidade: "kg", precoUnitario: 4.50, dataUltimaCompra: "2024-01-15" },
    { id: "3", nome: "Ovos", quantidade: 30, unidade: "unidade", precoUnitario: 0.60, dataUltimaCompra: "2024-01-14" },
    { id: "4", nome: "Leite Integral", quantidade: 3, unidade: "litro", precoUnitario: 6.00, dataUltimaCompra: "2024-01-14" }
  ]);

  const [showAddDialog, setShowAddDialog] = useState(false);
  const [novoInsumo, setNovoInsumo] = useState({
    nome: "",
    quantidade: 1,
    unidade: "kg",
    precoUnitario: 0
  });

  const handleCameraData = (data: any) => {
    setNovoInsumo(prev => ({
      ...prev,
      nome: data.nome || "",
      precoUnitario: data.preco || 0,
      quantidade: data.quantidade || 1,
      unidade: data.unidade || "kg"
    }));
  };

  const adjustQuantity = (delta: number) => {
    setNovoInsumo(prev => ({
      ...prev,
      quantidade: Math.max(0.1, prev.quantidade + delta)
    }));
  };

  const addInsumo = () => {
    const newInsumo: Insumo = {
      id: Date.now().toString(),
      ...novoInsumo,
      dataUltimaCompra: new Date().toISOString().split('T')[0]
    };
    
    setInsumos([...insumos, newInsumo]);
    setNovoInsumo({ nome: "", quantidade: 1, unidade: "kg", precoUnitario: 0 });
    setShowAddDialog(false);
  };

  return (
    <div className="pb-6">
      {/* Botão de Adicionar */}
      <div className="p-4">
        <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
          <DialogTrigger asChild>
            <Button className="w-full h-14 text-base bg-gradient-hero hover:scale-105 transition-all duration-200 shadow-[var(--shadow-fab)]">
              <Plus className="h-5 w-5 mr-2" />
              Adicionar Insumo
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-sm mx-auto max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Package className="h-5 w-5 text-primary" />
                Novo Insumo
              </DialogTitle>
            </DialogHeader>
            
            <div className="space-y-6 pt-4">
              {/* Captura por Câmera */}
              <FormSection 
                title="Captura Rápida"
                description="Escaneie a embalagem do produto para preencher automaticamente"
                icon={<Camera className="h-4 w-4 text-accent" />}
              >
                <Button 
                  type="button"
                  variant="outline" 
                  className="w-full h-12 border-2 border-dashed border-accent/30 hover:border-accent/50"
                  onClick={() => {
                    // Aqui integraria com a câmera
                    handleCameraData({
                      nome: "Exemplo Detectado",
                      preco: 5.99,
                      quantidade: 1,
                      unidade: "kg"
                    });
                  }}
                >
                  <Camera className="h-4 w-4 mr-2" />
                  Escanear com Câmera
                </Button>
                <FormHint type="info">
                  📱 Use a câmera para detectar automaticamente nome e preço do produto
                </FormHint>
              </FormSection>
              
              {/* Formulário Manual */}
              <FormSection 
                title="Informações do Produto"
                description="Preencha os dados manualmente"
              >
                <FormRow columns={1}>
                  <div>
                    <Label htmlFor="nome" className="text-sm font-medium">Nome do Produto</Label>
                    <Input
                      id="nome"
                      value={novoInsumo.nome}
                      onChange={(e) => setNovoInsumo(prev => ({ ...prev, nome: e.target.value }))}
                      placeholder="Ex: Farinha de Trigo Especial"
                      className="mt-1 border-2 focus:border-primary/50"
                    />
                  </div>
                  
                  <div>
                    <Label className="text-sm font-medium">Quantidade</Label>
                    <NumericInput
                      value={novoInsumo.quantidade}
                      onChange={(value) => setNovoInsumo(prev => ({ ...prev, quantidade: value }))}
                      min={0.1}
                      step={0.5}
                      showControls
                      className="mt-1"
                      placeholder="1.0"
                    />
                  </div>
                  
                  <div>
                    <Label className="text-sm font-medium">Unidade de Medida</Label>
                    <ButtonGroup
                      value={novoInsumo.unidade}
                      onValueChange={(value) => setNovoInsumo(prev => ({ ...prev, unidade: value }))}
                      options={unidadesComuns}
                      className="grid-cols-3 mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="preco" className="text-sm font-medium">Preço Pago</Label>
                    <NumericInput
                      value={novoInsumo.precoUnitario}
                      onChange={(value) => setNovoInsumo(prev => ({ ...prev, precoUnitario: value }))}
                      min={0}
                      prefix="R$"
                      placeholder="0,00"
                      className="mt-1"
                    />
                  </div>
                </FormRow>
                
                <FormHint type="success">
                  💡 <strong>Dica:</strong> Mantenha seus preços sempre atualizados para cálculos precisos!
                </FormHint>
              </FormSection>
              
              <Button 
                onClick={addInsumo} 
                className="w-full h-12 text-base bg-gradient-to-r from-primary to-accent hover:scale-[1.02] transition-all duration-200"
                disabled={!novoInsumo.nome || novoInsumo.precoUnitario <= 0}
              >
                <Package className="h-4 w-4 mr-2" />
                Salvar Insumo
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Lista de Insumos */}
      <div className="px-4 space-y-3">
        {insumos.map((insumo) => (
          <Card key={insumo.id} className="shadow-[var(--shadow-elevated)] card-hover border-0 bg-gradient-card">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className="p-2.5 bg-gradient-primary rounded-xl shrink-0 shadow-sm">
                  <Package className="h-5 w-5 text-primary-foreground" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-sm mb-1">{insumo.nome}</h3>
                  <div className="flex flex-wrap gap-1 mb-2">
                    <Badge variant="outline" className="text-xs">
                      {insumo.quantidade} {insumo.unidade}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      R$ {insumo.precoUnitario.toFixed(2)}/un
                    </Badge>
                  </div>
                  {insumo.fornecedor && (
                    <p className="text-xs text-muted-foreground mb-1">
                      {insumo.fornecedor}
                    </p>
                  )}
                  <p className="text-xs text-muted-foreground">
                    Comprado em {new Date(insumo.dataUltimaCompra).toLocaleDateString('pt-BR')}
                  </p>
                </div>
                
                <div className="flex flex-col items-end gap-1">
                  <div className="text-right">
                    <p className="font-bold text-sm">
                      R$ {(insumo.quantidade * insumo.precoUnitario).toFixed(2)}
                    </p>
                    <p className="text-xs text-muted-foreground">Total</p>
                  </div>
                  <div className="flex gap-1 mt-1">
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Edit className="h-3 w-3" />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Resumo Fixo na Base */}
      <div className="fixed bottom-[calc(var(--tab-bar-height)+env(safe-area-inset-bottom,0px))] left-0 right-0 bg-gradient-card backdrop-blur-md border-t border-border/50 p-4 shadow-[var(--shadow-elevated)]">
        <div className="max-w-md mx-auto">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-xs text-muted-foreground font-medium">Total em Estoque</p>
              <p className="text-xl font-bold text-primary">
                R$ {insumos.reduce((acc, item) => acc + (item.quantidade * item.precoUnitario), 0).toFixed(2)}
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs text-muted-foreground font-medium">{insumos.length} itens</p>
              <p className="text-sm font-semibold text-accent">
                Média: R$ {(insumos.reduce((acc, item) => acc + item.precoUnitario, 0) / insumos.length).toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};