import React, { useState, useEffect, ReactNode } from 'react';
import { MessageSquare, Package, List, BarChart2, Settings, SunMedium, X, Menu } from 'lucide-react';
import Sidebar from '@/components/navigation/Sidebar';
import ChatView from '@/views/ChatView';
import IngredientsListView from '@/views/IngredientsListView';

export type AppView =
  | "chat"
  | "ingredients"
  | "products"
  | "reports"
  | "settings";

// --- Componentes Auxiliares Reutilizáveis ---

/**
 * Um componente para exibir telas de placeholder para funcionalidades em desenvolvimento.
 */
const PlaceholderView: React.FC<{ icon: React.ElementType; title: string; children: ReactNode }> = ({ icon: Icon, title, children }) => (
  <div className="flex items-center justify-center min-h-[calc(100vh-140px)] lg:min-h-[60vh] px-4">
    <div className="bg-white rounded-2xl p-8 lg:p-12 shadow-lg border border-gray-100 w-full max-w-lg mx-auto text-center">
      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
        <Icon className="w-8 h-8 text-primary" />
      </div>
      <h2 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-3">{title}</h2>
      <div className="text-gray-600 space-y-1">{children}</div>
    </div>
  </div>
);

/**
 * Barra de navegação inferior para a visualização mobile.
 */
const BottomMobileNav: React.FC<{ activeView: AppView; onNavigate: (view: AppView) => void }> = ({ activeView, onNavigate }) => {
  const navItems = [
    { id: 'chat', icon: MessageSquare, label: 'Chat' },
    { id: 'ingredients', icon: Package, label: 'Insumos' },
    { id: 'products', icon: List, label: 'Produtos' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 pb-safe-area z-40">
      <div className="flex items-center justify-around">
        {navItems.map(({ id, icon: Icon, label }) => (
          <button
            key={id}
            onClick={() => onNavigate(id as AppView)}
            className={`flex flex-col items-center gap-1 py-2 px-3 rounded-lg transition-colors ${
              activeView === id ? 'text-primary' : 'text-gray-500 hover:text-primary'
            }`}
          >
            <Icon className="w-5 h-5" />
            <span className="text-xs font-medium">{label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};

// --- Componente Principal ---

const AppLayout: React.FC = () => {
  const [activeView, setActiveView] = useState<AppView>("chat");
  const [ingredients, setIngredients] = useState<Array<any>>([]);
  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(() => {
    try {
      return localStorage.getItem("cz_sidebar_collapsed") === "1";
    } catch {
      return false;
    }
  });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Efeito para persistir o estado do sidebar no localStorage
  useEffect(() => {
    try {
      localStorage.setItem("cz_sidebar_collapsed", sidebarCollapsed ? "1" : "0");
    } catch (error) {
      console.error("Failed to access localStorage:", error);
    }
  }, [sidebarCollapsed]);

  const handleNavigate = (view: AppView) => {
    setActiveView(view);
  };

  const handleAddIngredient = (ingredient: { name: string; costLabel: string; costValue?: number }) => {
    setIngredients((current) => [ingredient, ...current]);
  };

  const handleDeleteIngredient = (index: number) => {
    setIngredients((current) => current.filter((_, i) => i !== index));
  };

  /**
   * Renderiza o componente da view ativa. Centraliza a lógica de roteamento.
   */
  const renderActiveView = () => {
    switch (activeView) {
      case "chat":
        return <ChatView ingredients={ingredients} onAddIngredient={handleAddIngredient} onNavigate={handleNavigate} />;
      case "ingredients":
        return <IngredientsListView ingredients={ingredients} onAddNew={() => handleNavigate("chat")} onDelete={handleDeleteIngredient} />;
      case "products":
        return <PlaceholderView icon={Package} title="Meus Produtos">
            <p>Em breve você poderá gerenciar seus produtos e receitas aqui.</p>
        </PlaceholderView>;
      case "reports":
        return <PlaceholderView icon={BarChart2} title="Relatórios">
            <p>Análises de lucratividade e relatórios em breve.</p>
        </PlaceholderView>;
      case "settings":
        return <PlaceholderView icon={Settings} title="Configurações">
            <p>Personalize sua experiência e gerencie sua conta em breve.</p>
        </PlaceholderView>;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#F9F9F9] text-[#333333] font-sans">
      {/* --- Layout Mobile --- */}
      <div className="lg:hidden">
        <header className="bg-white border-b border-gray-200 px-4 py-3 sticky top-0 z-30">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-primary text-white rounded-lg p-2">
                <SunMedium className="w-5 h-5" />
              </div>
              <h1 className="text-lg font-semibold">CustoZen</h1>
            </div>
            <button onClick={() => setMobileMenuOpen(true)} className="p-2 rounded-lg hover:bg-gray-100" aria-label="Abrir menu">
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </header>

        {/* Drawer do Menu Mobile */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 bg-black/60" onClick={() => setMobileMenuOpen(false)}>
            <aside className="absolute right-0 top-0 h-full w-80 bg-white shadow-xl" onClick={(e) => e.stopPropagation()}>
              <div className="p-4">
                <div className="flex items-center justify-between mb-6 pb-4 border-b">
                  <h2 className="text-lg font-semibold">Menu</h2>
                  <button onClick={() => setMobileMenuOpen(false)} className="p-2 hover:bg-gray-100 rounded-lg" aria-label="Fechar menu">
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <Sidebar
                  active={activeView}
                  onNavigate={(view) => {
                    handleNavigate(view);
                    setMobileMenuOpen(false);
                  }}
                  collapsed={false}
                />
              </div>
            </aside>
          </div>
        )}

        <main className="pb-20 px-4" role="main">{renderActiveView()}</main>
        <BottomMobileNav activeView={activeView} onNavigate={handleNavigate} />
      </div>

      {/* --- Layout Desktop --- */}
      <div className="hidden lg:flex max-w-[1400px] mx-auto min-h-screen">
        <Sidebar active={activeView} onNavigate={handleNavigate} collapsed={sidebarCollapsed} onToggle={setSidebarCollapsed} />
        <main className="flex-1 p-8 sm:p-12 lg:p-16" role="main">
          {renderActiveView()}
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
