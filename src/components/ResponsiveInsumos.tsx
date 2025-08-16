import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Plus, Package, Edit, Trash2, Minus } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { CameraCapture } from "./mobile/CameraCapture";

interface Insumo {
  id: string;
  nome: string;
  quantidade: number;
  unidade: string;
  precoUnitario: number;
  fornecedor?: string;
  dataUltimaCompra: string;
}

const unidadesComuns = ["kg", "g", "litro", "ml", "unidade"];

export const ResponsiveInsumos = () => {
  const isMobile = useIsMobile();
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

  const totalEstoque = insumos.reduce((acc, item) => acc + (item.quantidade * item.precoUnitario), 0);
  const mediaPreco = insumos.reduce((acc, item) => acc + item.precoUnitario, 0) / insumos.length;

  return (
    <div className="pb-6">
      {/* Header com Botão de Adicionar e Resumo */}
      <div className="mb-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
          <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
            <DialogTrigger asChild>
              <Button className="w-full lg:w-auto h-14 lg:h-auto text-base bg-gradient-hero hover:scale-105 transition-all duration-200 shadow-[var(--shadow-fab)]">
                <Plus className="h-5 w-5 mr-2" />
                Adicionar Insumo
              </Button>
            </DialogTrigger>
            <DialogContent className={`${isMobile ? 'max-w-sm mx-auto' : 'sm:max-w-md'} max-h-[90vh] overflow-y-auto`}>
              <DialogHeader>
                <DialogTitle>Novo Insumo</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 pt-4">
                {/* Captura por Câmera - apenas no mobile */}
                {isMobile && <CameraCapture onDataExtracted={handleCameraData} />}
                
                {/* Formulário */}
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="nome">Nome do Produto</Label>
                    <Input
                      id="nome"
                      value={novoInsumo.nome}
                      onChange={(e) => setNovoInsumo(prev => ({ ...prev, nome: e.target.value }))}
                      placeholder="Ex: Farinha de Trigo"
                    />
                  </div>
                  
                  <div>
                    <Label>Quantidade</Label>
                    <div className="flex items-center gap-2 mt-1">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => adjustQuantity(-0.5)}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <Input
                        type="number"
                        value={novoInsumo.quantidade}
                        onChange={(e) => setNovoInsumo(prev => ({ 
                          ...prev, 
                          quantidade: parseFloat(e.target.value) || 0 
                        }))}
                        className="text-center flex-1"
                        step="0.1"
                      />
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => adjustQuantity(0.5)}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  
                  <div>
                    <Label>Unidade</Label>
                    <div className="grid grid-cols-3 gap-2 mt-1">
                      {unidadesComuns.map(unidade => (
                        <Button
                          key={unidade}
                          variant={novoInsumo.unidade === unidade ? "default" : "outline"}
                          size="sm"
                          onClick={() => setNovoInsumo(prev => ({ ...prev, unidade }))}
                          className="text-xs"
                        >
                          {unidade}
                        </Button>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="preco">Preço Pago (R$)</Label>
                    <Input
                      id="preco"
                      type="number"
                      inputMode="decimal"
                      value={novoInsumo.precoUnitario}
                      onChange={(e) => setNovoInsumo(prev => ({ 
                        ...prev, 
                        precoUnitario: parseFloat(e.target.value) || 0 
                      }))}
                      placeholder="0,00"
                      step="0.01"
                    />
                  </div>
                  
                  <Button 
                    onClick={addInsumo} 
                    className="w-full mt-6"
                    disabled={!novoInsumo.nome || novoInsumo.precoUnitario <= 0}
                  >
                    Salvar Insumo
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          {/* Resumo do Estoque - visível no desktop */}
          {!isMobile && (
            <div className="grid grid-cols-2 gap-4">
              <Card className="shadow-[var(--shadow-card)]">
                <CardContent className="p-4">
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground font-medium">Total em Estoque</p>
                    <p className="text-2xl font-bold text-primary">R$ {totalEstoque.toFixed(2)}</p>
                  </div>
                </CardContent>
              </Card>
              <Card className="shadow-[var(--shadow-card)]">
                <CardContent className="p-4">
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground font-medium">{insumos.length} itens</p>
                    <p className="text-2xl font-bold text-accent">R$ {mediaPreco.toFixed(2)}</p>
                    <p className="text-xs text-muted-foreground">Média</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>

      {/* Lista de Insumos */}
      <div className={`grid gap-4 ${isMobile ? 'grid-cols-1' : 'grid-cols-1 lg:grid-cols-2 xl:grid-cols-3'}`}>
        {insumos.map((insumo) => (
          <Card key={insumo.id} className="shadow-[var(--shadow-elevated)] card-hover border-0 bg-gradient-card">
            <CardContent className="p-4 lg:p-6">
              <div className="flex items-start gap-3">
                <div className="p-2.5 bg-gradient-primary rounded-xl shrink-0 shadow-sm">
                  <Package className="h-5 w-5 text-primary-foreground" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-sm lg:text-base mb-1">{insumo.nome}</h3>
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
                    <p className="font-bold text-sm lg:text-base">
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

      {/* Resumo Fixo na Base - apenas mobile */}
      {isMobile && (
        <div className="fixed bottom-[calc(var(--tab-bar-height)+env(safe-area-inset-bottom,0px))] left-0 right-0 bg-gradient-card backdrop-blur-md border-t border-border/50 p-4 shadow-[var(--shadow-elevated)]">
          <div className="max-w-md mx-auto">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-xs text-muted-foreground font-medium">Total em Estoque</p>
                <p className="text-xl font-bold text-primary">R$ {totalEstoque.toFixed(2)}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-muted-foreground font-medium">{insumos.length} itens</p>
                <p className="text-sm font-semibold text-accent">
                  Média: R$ {mediaPreco.toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};