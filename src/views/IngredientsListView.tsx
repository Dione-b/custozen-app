import React, { useMemo, useState } from 'react';
import { Plus, Search, Package } from 'lucide-react';
import IngredientCard from '@/components/ingredients/IngredientCard';

interface Props {
  ingredients: Array<{ name: string; costLabel: string }>;
  onAddNew: () => void;
  onDelete: (index: number) => void;
}

const IngredientsListView: React.FC<Props> = ({ ingredients, onAddNew, onDelete }) => {
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    if (!query.trim()) return ingredients;
    return ingredients.filter((i) => i.name.toLowerCase().includes(query.toLowerCase()));
  }, [ingredients, query]);

  return (
    <div className="space-y-6 mx-4 lg:mx-0 mt-4 lg:mt-0">
      {/* Cabeçalho Refatorado */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-800">Meus Ingredientes</h2>
          <p className="text-gray-500 mt-1 text-sm lg:text-base">Gerencie os ingredientes coletados pelo assistente</p>
        </div>

        {/* Controles de busca e adição com melhor responsividade */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar..."
              className="border border-gray-200 rounded-lg pl-10 pr-4 py-2 w-full sm:w-48 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              aria-label="Buscar ingredientes"
            />
          </div>
          <button 
            onClick={onAddNew} 
            className="bg-primary text-white p-2 sm:px-4 sm:py-2 rounded-lg hover:opacity-95 transition-all flex items-center gap-2 shadow-sm shrink-0" 
            aria-label="Adicionar novo ingrediente"
          >
            <Plus className="w-4 h-4" />
            {/* O texto do botão agora fica oculto em telas pequenas */}
            <span className="hidden sm:inline text-sm font-medium">Adicionar</span>
          </button>
        </div>
      </div>

      {/* Estatísticas */}
      <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
        <div className="flex items-center gap-2 text-gray-600">
          <Package className="w-5 h-5" />
          <span className="font-medium">
            {filtered.length} {filtered.length === 1 ? 'ingrediente' : 'ingredientes'} 
            {query && ` encontrado${filtered.length === 1 ? '' : 's'}`}
          </span>
        </div>
      </div>

      {/* Grade de Ingredientes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 lg:gap-4" role="list">
        {filtered.length === 0 ? (
          <div className="col-span-full text-center text-gray-500 py-16 bg-white rounded-xl border border-dashed border-gray-200" role="listitem">
            <Package className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-700 mb-2">
              {query ? 'Nenhum ingrediente encontrado' : 'Nenhum ingrediente ainda'}
            </h3>
            <p className="text-gray-500 mb-4 px-2">
              {query 
                ? `Não encontramos ingredientes com "${query}". Tente outro termo.`
                : 'Adicione seu primeiro ingrediente através do chat.'
              }
            </p>
            {!query && (
              <button 
                onClick={onAddNew}
                className="bg-primary text-white px-6 py-2 rounded-lg hover:opacity-95 transition-all flex items-center gap-2 mx-auto"
              >
                <Plus className="w-4 h-4" />
                Adicionar Primeiro Ingrediente
              </button>
            )}
          </div>
        ) : (
          filtered.map((ing, idx) => (
            <div role="listitem" key={`${ing.name}-${idx}`}>
              <IngredientCard
                name={ing.name}
                costLabel={ing.costLabel}
                onDelete={() => onDelete(idx)}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default IngredientsListView;
