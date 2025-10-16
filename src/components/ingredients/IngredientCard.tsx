import React from 'react';
import { Edit3, Trash2, Package } from 'lucide-react';

interface Props {
  name: string;
  costLabel: string;
  onEdit?: () => void;
  onDelete?: () => void;
}

const IngredientCard: React.FC<Props> = ({ name, costLabel, onEdit, onDelete }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 lg:p-5 hover:shadow-md transition-all duration-200 group" role="article" aria-label={`Ingrediente ${name}`}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-[#4A934A] to-[#2F6F2F] rounded-lg flex items-center justify-center flex-shrink-0">
            <Package className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 text-base lg:text-lg leading-tight">{name}</h3>
            <p className="text-xs lg:text-sm text-gray-500 mt-1">{costLabel}</p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <button 
          onClick={onEdit} 
          className="p-2 rounded-lg hover:bg-gray-50 transition-colors" 
          aria-label={`Editar ${name}`}
          title="Editar ingrediente"
        >
          <Edit3 className="w-4 h-4 text-gray-600" />
        </button>
        <button 
          onClick={onDelete} 
          className="p-2 rounded-lg hover:bg-red-50 transition-colors" 
          aria-label={`Excluir ${name}`}
          title="Excluir ingrediente"
        >
          <Trash2 className="w-4 h-4 text-red-500" />
        </button>
      </div>
    </div>
  );
};

export default IngredientCard;
