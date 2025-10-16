import React from 'react';
import { MessageSquare, Package, List, BarChart2, Settings, ChevronLeft, ChevronRight, SunMedium } from 'lucide-react';
import { AppView } from '@/components/layout/AppLayout'; // Certifique-se de que o caminho do import está correto

interface Props {
  active: AppView;
  onNavigate: (view: AppView) => void;
  collapsed?: boolean;
  onToggle?: (next: boolean) => void;
}

const Sidebar: React.FC<Props> = ({ active, onNavigate, collapsed = false, onToggle }) => {
  const items: { id: AppView; label: string; Icon: any }[] = [
    { id: 'chat', label: 'Assistente Zen', Icon: MessageSquare },
    { id: 'ingredients', label: 'Meus Insumos', Icon: Package },
    { id: 'products', label: 'Meus Produtos', Icon: List },
    { id: 'reports', label: 'Relatórios', Icon: BarChart2 },
    { id: 'settings', label: 'Configurações', Icon: Settings }
  ];

  return (
    <aside
      className={`bg-white border-r border-gray-100 p-3 transition-all duration-300 ease-in-out flex flex-col ${
        collapsed ? 'w-20' : 'w-64'
      }`}
      aria-label="Sidebar Navigation"
      role="navigation"
    >
      {/* Cabeçalho com Logo e Título */}
      <div className="flex items-center gap-3 p-2 mb-4 border-b border-gray-100 pb-4 overflow-hidden">
        <div className="bg-primary text-white rounded-lg p-2 flex-shrink-0">
          <SunMedium className="w-5 h-5" />
        </div>
        <span className={`font-bold text-lg whitespace-nowrap transition-opacity duration-200 ${collapsed ? 'opacity-0' : 'opacity-100'}`}>
          CustoZen
        </span>
      </div>

      {/* flex-grow empurra a seção inferior para o fundo */}
      <div className="flex-grow">
        <nav className="space-y-1" aria-label="Primary Navigation">
          {items.map((it) => {
            const isActive = it.id === active;
            return (
              <button
                key={it.id}
                onClick={() => onNavigate(it.id)}
                className={`w-full flex items-center gap-3 rounded-lg p-2 hover:bg-gray-50 transition-colors text-sm ${
                  collapsed ? 'justify-center' : ''
                } ${
                  isActive ? 'bg-primary/10 text-primary font-semibold' : 'text-gray-700'
                }`}
                aria-current={isActive ? 'page' : undefined}
                aria-label={it.label}
              >
                <it.Icon className="w-5 h-5 flex-shrink-0" />
                {/* O texto agora transiciona a largura e opacidade para desaparecer completamente do layout */}
                <span className={`whitespace-nowrap transition-all duration-200 ${collapsed ? 'w-0 opacity-0' : 'w-auto opacity-100'}`}>
                  {it.label}
                </span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Seção inferior com toggle e copyright - Renderizada apenas se onToggle for fornecido */}
      {onToggle && (
        <>
          <div className="pt-2 border-t border-gray-100">
            <button
                onClick={() => onToggle && onToggle(!collapsed)}
                className={`w-full flex items-center gap-3 rounded-lg p-2 hover:bg-gray-50 transition-colors text-sm text-gray-600 ${ collapsed ? 'justify-center' : '' }`}
                aria-label={collapsed ? 'Expandir menu' : 'Recolher menu'}
            >
                {/* O ícone muda dependendo do estado do menu */}
                {collapsed ? 
                  <ChevronRight className="w-5 h-5 flex-shrink-0" /> : 
                  <ChevronLeft className="w-5 h-5 flex-shrink-0" />
                }
                {/* O texto do botão também desaparece suavemente */}
                <span className={`whitespace-nowrap transition-all duration-200 ${collapsed ? 'w-0 opacity-0' : 'w-auto opacity-100'}`}>
                  Recolher
                </span>
            </button>
          </div>
          
          {/* O copyright agora some suavemente com a transição de opacidade */}
          <div className={`text-center transition-opacity duration-200 ${collapsed ? 'opacity-0 h-0 invisible' : 'opacity-100 mt-4'}`}>
              <p className="text-xs text-gray-400 whitespace-nowrap">© CustoZen</p>
          </div>
        </>
      )}
    </aside>
  );
};

export default Sidebar;

