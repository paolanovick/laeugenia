import { useState } from 'react';
import { Product, getCategories } from '../../data/products';
import { resolveImageUrl } from '../../utils/image';

const TABS = [
  { id: 'todos', label: '📋 Todos' },
  { id: 'mates', label: '🧉 Mates' },
  { id: 'yerba', label: '🌿 Yerba & Blends' },
  { id: 'bombillas', label: '✨ Bombillas' },
  { id: 'articulos', label: '🪔 Artículos Materos' },
  { id: 'combos', label: '🎁 Combos y Regalos' },
  { id: 'publicidad', label: '📢 Publicidad' },
];

const CATEGORY_LABELS: Record<string, string> = {
  mates: '🧉 Mates',
  yerba: '🌿 Yerba & Blends',
  bombillas: '✨ Bombillas',
  articulos: '🪔 Artículos Materos',
  combos: '🎁 Combos y Regalos',
  publicidad: '📢 Publicidad',
};

interface Props {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
}

export const ProductList = ({ products, onEdit, onDelete }: Props) => {
  const [activeTab, setActiveTab] = useState('todos');

  const filtered = activeTab === 'todos'
    ? products
    : products.filter((p) => getCategories(p).includes(activeTab));

  return (
    <div>
      {/* Tabs */}
      <div className="flex gap-2 flex-wrap mb-4">
        {TABS.map((tab) => {
          const count = tab.id === 'todos'
            ? products.length
            : products.filter((p) => getCategories(p).includes(tab.id)).length;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition flex items-center gap-1 ${
                activeTab === tab.id
                  ? 'bg-[#7B1F0F] text-white'
                  : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
              }`}
            >
              {tab.label}
              <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                activeTab === tab.id ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-500'
              }`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Lista */}
      {filtered.length === 0 ? (
        <div className="bg-[#f5f0e8] rounded-xl p-8 text-center text-gray-400">
          No hay productos en esta categoría.
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex gap-4 items-center"
            >
              <div className="flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden bg-gray-100">
                {product.images[0] ? (
                  <img
                    src={resolveImageUrl(product.images[0])}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-2xl">🧉</div>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold text-gray-800 truncate">{product.name}</h3>
                  {product.featured && (
                    <span className="text-xs bg-[#F5C080]/20 text-[#8B6914] px-2 py-0.5 rounded-full font-medium flex-shrink-0">
                      ⭐ Destacado
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-400 mb-1">{getCategories(product).map((c) => CATEGORY_LABELS[c]).filter(Boolean).join(' · ')}</p>
                <p className="text-lg font-bold text-[#7B1F0F]">${product.price.toLocaleString()}</p>
              </div>

              <div className="flex flex-col gap-2 flex-shrink-0">
                <button
                  onClick={() => onEdit(product)}
                  className="bg-[#C4351A] hover:bg-[#7B1F0F] text-white text-sm px-4 py-1.5 rounded-lg transition-colors font-medium"
                >
                  Editar
                </button>
                <button
                  onClick={() => { if (confirm(`¿Eliminar "${product.name}"?`)) onDelete(product.id); }}
                  className="bg-red-50 hover:bg-red-100 text-red-500 text-sm px-4 py-1.5 rounded-lg transition-colors font-medium border border-red-100"
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
