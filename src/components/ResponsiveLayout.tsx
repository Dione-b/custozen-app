import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { 
  Leaf, 
  TrendingUp, 
  Package, 
  Calculator, 
  Plus, 
  Menu,
  X
} from "lucide-react";
import { TabBar, TabBarItem } from "@/components/ui/tab-bar";
import { MobileHeader } from "@/components/mobile/MobileHeader";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { CreditsIndicator } from "@/components/CreditsIndicator";
import { cn } from "@/lib/utils";

interface ResponsiveLayoutProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  children: React.ReactNode;
}

export const ResponsiveLayout = ({ 
  activeTab, 
  setActiveTab, 
  children 
}: ResponsiveLayoutProps) => {
  const isMobile = useIsMobile();
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const getHeaderProps = () => {
    switch (activeTab) {
      case "inicio":
        return { 
          showBranding: true,
          subtitle: "Do caos à clareza, sem estresse. Encontre a tranquilidade financeira do seu negócio."
        };
      case "insumos":
        return { 
          showBranding: false,
          title: "Insumos",
          subtitle: "Controle suas matérias-primas e custos"
        };
      case "produtos":
        return { 
          showBranding: false,
          title: "Produtos",
          subtitle: "Suas fichas técnicas e precificação"
        };
      case "creditos":
        return { 
          showBranding: false,
          title: "Créditos Zen",
          subtitle: "Recarregue sua tranquilidade"
        };
      default:
        return { showBranding: true };
    }
  };

  const navigationItems = [
    { id: "inicio", label: "Início", icon: TrendingUp },
    { id: "insumos", label: "Insumos", icon: Package },
    { id: "produtos", label: "Produtos", icon: Calculator },
    { id: "creditos", label: "Créditos", icon: Leaf },
  ];

  if (isMobile) {
    return (
      <div className="min-h-screen bg-background pb-tab-bar">
        <MobileHeader {...getHeaderProps()} />
        
        {/* Credits Indicator - Mobile */}
        <div className="fixed top-4 right-4 z-40">
          <CreditsIndicator credits={42} />
        </div>
        
        <main className="min-h-[calc(100vh-200px)] pb-safe-area">
          {children}
        </main>

        {/* Mobile Tab Bar */}
        <TabBar>
          <TabBarItem
            icon={<TrendingUp />}
            label="Início"
            isActive={activeTab === "inicio"}
            onClick={() => setActiveTab("inicio")}
          />
          <TabBarItem
            icon={<Package />}
            label="Insumos"
            isActive={activeTab === "insumos"}
            onClick={() => setActiveTab("insumos")}
          />
          <TabBarItem
            icon={<Plus />}
            label=""
            isMainAction
            onClick={() => setShowAddDialog(true)}
          />
          <TabBarItem
            icon={<Calculator />}
            label="Produtos"
            isActive={activeTab === "produtos"}
            onClick={() => setActiveTab("produtos")}
          />
          <TabBarItem
            icon={<Leaf />}
            label="Créditos"
            isActive={activeTab === "creditos"}
            onClick={() => setActiveTab("creditos")}
          />
        </TabBar>

        {/* Mobile Add Dialog */}
        <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
          <DialogContent className="max-w-sm mx-auto rounded-2xl border-0 shadow-[var(--shadow-elevated)]">
            <DialogHeader>
              <DialogTitle className="text-center text-lg font-bold">O que deseja adicionar?</DialogTitle>
            </DialogHeader>
            <div className="space-y-3 pt-4">
              <Button 
                variant="outline" 
                className="w-full justify-start h-16"
                onClick={() => {
                  setActiveTab("insumos");
                  setShowAddDialog(false);
                }}
              >
                <div className="p-2 bg-primary/10 rounded-lg mr-3">
                  <Package className="h-5 w-5 text-primary" />
                </div>
                <div className="text-left">
                  <div className="font-semibold">Novo Insumo</div>
                  <div className="text-xs text-muted-foreground">Adicionar matéria-prima</div>
                </div>
              </Button>
              <Button 
                variant="accent" 
                className="w-full justify-start h-16"
                onClick={() => {
                  setActiveTab("produtos");
                  setShowAddDialog(false);
                }}
              >
                <div className="p-2 bg-accent-foreground/20 rounded-lg mr-3">
                  <Calculator className="h-5 w-5 text-accent-foreground" />
                </div>
                <div className="text-left">
                  <div className="font-semibold text-accent-foreground">Novo Produto</div>
                  <div className="text-xs text-accent-foreground/80">Criar ficha técnica</div>
                </div>
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    );
  }

  // Desktop Layout
  return (
    <div className="min-h-screen bg-background flex">
      {/* Desktop Sidebar */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 bg-card border-r border-border transition-transform lg:translate-x-0 lg:static lg:inset-0",
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex h-full flex-col">
          {/* Sidebar Header */}
          <div className="bg-gradient-hero p-6 text-primary-foreground">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/10 rounded-full">
                <Leaf className="h-6 w-6" />
              </div>
              <div>
                <h1 className="text-xl font-bold">CustoZen</h1>
                <Badge variant="secondary" className="bg-white/20 text-white border-white/30 text-xs">
                  Beta
                </Badge>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4">
            <div className="space-y-2">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={cn(
                      "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors",
                      activeTab === item.id
                        ? "bg-primary text-primary-foreground"
                        : "hover:bg-muted text-muted-foreground hover:text-foreground"
                    )}
                  >
                    <Icon className="h-5 w-5" />
                    {item.label}
                  </button>
                );
              })}
            </div>

            {/* Add Button */}
            <div className="mt-6">
              <Button
                onClick={() => setShowAddDialog(true)}
                className="w-full"
                size="lg"
              >
                <Plus className="h-5 w-5 mr-2" />
                Adicionar
              </Button>
            </div>
          </nav>
        </div>
      </aside>

      {/* Desktop Main Content */}
      <div className="flex-1 flex flex-col lg:ml-0">
        {/* Desktop Header */}
        <header className="sticky top-0 z-40 bg-card/95 backdrop-blur-sm border-b border-border px-6 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 hover:bg-muted rounded-lg"
            >
              {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
            
            <div className="flex-1 lg:flex-none">
              {!getHeaderProps().showBranding && (
                <div>
                  <h2 className="text-xl font-semibold tracking-tight">
                    {getHeaderProps().title}
                  </h2>
                  <p className="text-sm text-muted-foreground mt-1">
                    {getHeaderProps().subtitle}
                  </p>
                </div>
              )}
            </div>

            {/* Credits Indicator - Desktop */}
            <div className="flex items-center">
              <CreditsIndicator credits={42} />
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>

      {/* Desktop Add Dialog */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center">O que deseja adicionar?</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Button 
              variant="outline" 
              className="justify-start h-auto p-4"
              onClick={() => {
                setActiveTab("insumos");
                setShowAddDialog(false);
              }}
            >
              <div className="p-2 bg-primary/10 rounded-lg mr-3">
                <Package className="h-5 w-5 text-primary" />
              </div>
              <div className="text-left">
                <div className="font-semibold">Novo Insumo</div>
                <div className="text-sm text-muted-foreground">Adicionar matéria-prima</div>
              </div>
            </Button>
            <Button 
              variant="accent" 
              className="justify-start h-auto p-4"
              onClick={() => {
                setActiveTab("produtos");
                setShowAddDialog(false);
              }}
            >
              <div className="p-2 bg-accent-foreground/20 rounded-lg mr-3">
                <Calculator className="h-5 w-5 text-accent-foreground" />
              </div>
              <div className="text-left">
                <div className="font-semibold text-accent-foreground">Novo Produto</div>
                <div className="text-sm text-accent-foreground/80">Criar ficha técnica</div>
              </div>
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Sidebar Overlay for mobile */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};