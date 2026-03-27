import { Product } from '../../data/products';
import { resolveImageUrl } from '../../utils/image';

const CATEGORY_LABELS: Record<string, string> = {
  mates: '🧉 Mates',
  yerba: '🌿 Yerba & Blends',
  bombillas: '✨ Bombillas',
};

interface Props {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
}

export const ProductList = ({ products, onEdit, onDelete }: Props) => {
  if (products.length === 0) {
    return (
      <div className="bg-[#f5f0e8] rounded-xl p-8 text-center text-gray-400">
        No hay productos cargados todavía.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {products.map((product) => (
        <div
          key={product.id}
          className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex gap-4 items-center"
        >
          {/* Imagen */}
          <div className="flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden bg-gray-100">
            {product.images[0] ? (
              <img
                src={resolveImageUrl(product.images[0])}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-2xl">
                🧉
              </div>
            )}
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-semibold text-gray-800 truncate">{product.name}</h3>
              {product.featured && (
                <span className="text-xs bg-[#F5C080]/20 text-[#8B6914] px-2 py-0.5 rounded-full font-medium flex-shrink-0">
                  ⭐ Destacado
                </span>
              )}
            </div>
            <p className="text-xs text-gray-400 mb-1">
              {CATEGORY_LABELS[product.category]}
            </p>
            <p className="text-lg font-bold text-[#7B1F0F]">
              ${product.price.toLocaleString()}
            </p>
          </div>

          {/* Acciones */}
          <div className="flex flex-col gap-2 flex-shrink-0">
            <button
              onClick={() => onEdit(product)}
              className="bg-[#C4351A] hover:bg-[#7B1F0F] text-white text-sm px-4 py-1.5 rounded-lg transition-colors font-medium"
            >
              Editar
            </button>
            <button
              onClick={() => {
                if (confirm(`¿Eliminar "${product.name}"?`)) {
                  onDelete(product.id);
                }
              }}
              className="bg-red-50 hover:bg-red-100 text-red-500 text-sm px-4 py-1.5 rounded-lg transition-colors font-medium border border-red-100"
            >
              Eliminar
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
