import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Calculator, Share2, Edit, Trash2, ChevronRight, DollarSign, Clock, Package2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { FormSection, FormStep, FormRow, FormHint } from "@/components/ui/form-layout";
import { NumericInput } from "@/components/ui/form-inputs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import UpgradeModal from "@/components/UpgradeModal";

interface Produto {
  id: string;
  nome: string;
  rendimento: number;
  custoTotal: number;
  precoVenda: number;
  margem: number;
  categoria: string;
}

export const MobileProdutos = () => {
  const [produtos, setProdutos] = useState<Produto[]>([
    {
      id: "1",
      nome: "Brigadeiro Gourmet",
      rendimento: 50,
      custoTotal: 15.00,
      precoVenda: 52.50,
      margem: 75,
      categoria: "Doces"
    },
    {
      id: "2", 
      nome: "Bolo de Cenoura",
      rendimento: 12,
      custoTotal: 28.00,
      precoVenda: 48.00,
      margem: 68,
      categoria: "Bolos"
    },
    {
      id: "3",
      nome: "Torta de Limão",
      rendimento: 8,
      custoTotal: 22.00,
      precoVenda: 35.00,
      margem: 62,
      categoria: "Tortas"
    }
  ]);

  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  
  // Mock data para o plano
  const isPro = false;
  const maxProducts = 3;
  
  const [novoProduto, setNovoProduto] = useState({
    nome: "",
    rendimento: 1,
    custoIngredientes: 0,
    tempoPreparo: 0,
    custoEmbalagem: 0,
    margemDesejada: 60
  });

  const calcularPreco = () => {
    const custoTotal = novoProduto.custoIngredientes + novoProduto.custoEmbalagem;
    const custoPorUnidade = custoTotal / novoProduto.rendimento;
    const precoVenda = custoPorUnidade * (1 + novoProduto.margemDesejada / 100);
    return { custoTotal, custoPorUnidade, precoVenda };
  };

  const { custoTotal, custoPorUnidade, precoVenda } = calcularPreco();

  const shareProduct = (produto: Produto) => {
    // Simula a geração do card para redes sociais
    const cardContent = `🍰 ${produto.nome}\n💰 R$ ${(produto.precoVenda / produto.rendimento).toFixed(2)} cada\n📦 Rende ${produto.rendimento} unidades\n\n#precificaai #doces #negocio`;
    
    if (navigator.share) {
      navigator.share({
        title: produto.nome,
        text: cardContent,
      });
    } else {
      navigator.clipboard.writeText(cardContent);
      alert("Conteúdo copiado para área de transferência!");
    }
  };

  const handleAddProduct = () => {
    if (!isPro && produtos.length >= maxProducts) {
      setShowUpgradeModal(true);
      return;
    }
    setShowAddDialog(true);
  };

  const handleManageProducts = () => {
    // Navegar para gerenciar produtos (pode ser uma página separada)
    console.log("Gerenciar produtos");
  };

  return (
    <div className="pb-6">
      {/* Modal de Upgrade */}
      <UpgradeModal 
        isOpen={showUpgradeModal}
        onClose={() => setShowUpgradeModal(false)}
        onManageProducts={handleManageProducts}
      />

      {/* Botão de Adicionar */}
      <div className="p-4">
        <Button 
          variant="accent" 
          className="w-full h-12 text-base"
          onClick={handleAddProduct}
        >
          <Plus className="h-5 w-5 mr-2" />
          Criar Produto
        </Button>

        <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
          <DialogContent className="max-w-sm mx-auto max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Calculator className="h-5 w-5 text-primary" />
                Nova Ficha Técnica
              </DialogTitle>
            </DialogHeader>
            
            <div className="space-y-6 pt-4">
              {/* Passo 1: Informações Básicas */}
              <FormStep 
                step={1} 
                title="Informações Básicas"
                description="Nome e rendimento do produto"
                isActive={true}
                isCompleted={!!novoProduto.nome && novoProduto.rendimento > 0}
              >
                <FormRow columns={1}>
                  <div>
                    <Label htmlFor="nome-produto" className="text-sm font-medium">Nome do Produto</Label>
                    <Input
                      id="nome-produto"
                      value={novoProduto.nome}
                      onChange={(e) => setNovoProduto(prev => ({ ...prev, nome: e.target.value }))}
                      placeholder="Ex: Brigadeiro Gourmet"
                      className="mt-1 border-2 focus:border-primary/50"
                    />
                  </div>
                  <div>
                    <Label htmlFor="rendimento" className="text-sm font-medium">Quantas unidades faz?</Label>
                    <NumericInput
                      value={novoProduto.rendimento}
                      onChange={(value) => setNovoProduto(prev => ({ ...prev, rendimento: value }))}
                      min={1}
                      showControls
                      allowDecimal={false}
                      suffix="unidades"
                      className="mt-1"
                    />
                  </div>
                </FormRow>
              </FormStep>

              {/* Passo 2: Ingredientes */}
              <FormStep 
                step={2} 
                title="Custo dos Ingredientes"
                description="Total gasto em matéria-prima"
                isActive={!!novoProduto.nome}
                isCompleted={novoProduto.custoIngredientes > 0}
              >
                <FormRow columns={1}>
                  <div>
                    <Label htmlFor="custo-ingredientes" className="text-sm font-medium">Total gasto em ingredientes</Label>
                    <NumericInput
                      value={novoProduto.custoIngredientes}
                      onChange={(value) => setNovoProduto(prev => ({ ...prev, custoIngredientes: value }))}
                      min={0}
                      prefix="R$"
                      placeholder="0,00"
                      className="mt-1"
                    />
                  </div>
                </FormRow>
                <FormHint type="info">
                  💡 <strong>Dica:</strong> Some todos os ingredientes usados na receita. Use a aba Insumos para consultar preços atualizados.
                </FormHint>
              </FormStep>

              {/* Passo 3: Custos Extras */}
              <FormStep 
                step={3} 
                title="Custos Extras"
                description="Embalagem e tempo de preparo"
                isActive={novoProduto.custoIngredientes > 0}
                isCompleted={true}
              >
                <FormRow>
                  <div>
                    <Label htmlFor="tempo-preparo" className="text-sm font-medium">Tempo de preparo</Label>
                    <NumericInput
                      value={novoProduto.tempoPreparo}
                      onChange={(value) => setNovoProduto(prev => ({ ...prev, tempoPreparo: value }))}
                      min={0}
                      step={0.5}
                      suffix="horas"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="custo-embalagem" className="text-sm font-medium">Custo da embalagem</Label>
                    <NumericInput
                      value={novoProduto.custoEmbalagem}
                      onChange={(value) => setNovoProduto(prev => ({ ...prev, custoEmbalagem: value }))}
                      min={0}
                      prefix="R$"
                      placeholder="0,00"
                      className="mt-1"
                    />
                  </div>
                </FormRow>
              </FormStep>

              {/* Passo 4: Margem */}
              <FormStep 
                step={4} 
                title="Definir Lucro"
                description="Margem de lucro desejada"
                isActive={novoProduto.custoIngredientes > 0}
                isCompleted={novoProduto.margemDesejada > 0}
              >
                <FormRow columns={1}>
                  <div>
                    <Label htmlFor="margem-desejada" className="text-sm font-medium">Margem de lucro</Label>
                    <NumericInput
                      value={novoProduto.margemDesejada}
                      onChange={(value) => setNovoProduto(prev => ({ ...prev, margemDesejada: value }))}
                      min={1}
                      max={500}
                      suffix="%"
                      showControls
                      allowDecimal={false}
                      className="mt-1"
                    />
                  </div>
                </FormRow>
                <FormHint type="success">
                  🎯 <strong>Recomendação:</strong> Uma margem entre 60-80% é ideal para produtos artesanais
                </FormHint>
              </FormStep>

              {/* Resultado da Precificação */}
              <FormSection 
                title="Resultado da Precificação"
                description="Valores calculados automaticamente"
                icon={<DollarSign className="h-4 w-4 text-primary" />}
              >
                <div className="grid grid-cols-2 gap-4 p-4 bg-muted/30 rounded-lg border">
                  <div className="text-center">
                    <p className="text-xs text-muted-foreground">Custo por unidade</p>
                    <p className="font-bold text-sm">R$ {custoPorUnidade.toFixed(2)}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-muted-foreground">Preço de venda/un</p>
                    <p className="font-bold text-primary text-lg">R$ {(precoVenda / novoProduto.rendimento).toFixed(2)}</p>
                  </div>
                </div>
              </FormSection>
              
              <Button 
                onClick={() => {
                  const newProduct: Produto = {
                    id: Date.now().toString(),
                    nome: novoProduto.nome,
                    rendimento: novoProduto.rendimento,
                    custoTotal: custoTotal,
                    precoVenda: precoVenda,
                    margem: novoProduto.margemDesejada,
                    categoria: "Geral"
                  };
                  setProdutos([...produtos, newProduct]);
                  setNovoProduto({
                    nome: "",
                    rendimento: 1,
                    custoIngredientes: 0,
                    tempoPreparo: 0,
                    custoEmbalagem: 0,
                    margemDesejada: 60
                  });
                  setShowAddDialog(false);
                }}
                className="w-full h-12 text-base bg-gradient-to-r from-primary to-accent hover:scale-[1.02] transition-all duration-200"
                disabled={!novoProduto.nome || novoProduto.custoIngredientes <= 0}
              >
                <Package2 className="h-4 w-4 mr-2" />
                Salvar Produto
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Lista de Produtos */}
      <div className="px-4 space-y-3">
        {produtos.map((produto) => (
          <Card key={produto.id} className="shadow-[var(--shadow-card)]">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-primary/10 rounded-lg shrink-0">
                  <Calculator className="h-5 w-5 text-primary" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-semibold text-sm mb-1">{produto.nome}</h3>
                      <Badge variant="outline" className="text-xs">
                        {produto.categoria}
                      </Badge>
                    </div>
                    <div className="flex gap-1">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 w-8 p-0"
                        onClick={() => shareProduct(produto)}
                      >
                        <Share2 className="h-3 w-3" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div>
                      <p className="text-muted-foreground">Rende</p>
                      <p className="font-medium">{produto.rendimento} unidades</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Margem</p>
                      <p className="font-medium text-accent">{produto.margem}%</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Custo/un</p>
                      <p className="font-medium">R$ {(produto.custoTotal / produto.rendimento).toFixed(2)}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Venda/un</p>
                      <p className="font-bold text-primary">R$ {(produto.precoVenda / produto.rendimento).toFixed(2)}</p>
                    </div>
                  </div>
                  
                  <Button variant="outline" size="sm" className="w-full mt-3 text-xs h-8">
                    Ver Detalhes
                    <ChevronRight className="h-3 w-3 ml-1" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

    </div>
  );
};