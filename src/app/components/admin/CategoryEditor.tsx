import { useState } from 'react';
import { useCategories, Category } from '../../contexts/CategoriesContext';

export const CategoryEditor = () => {
  const { categories, saveCategory } = useCategories();
  const [saving, setSaving] = useState<string | null>(null);
  const [mensaje, setMensaje] = useState('');

  const showMensaje = (text: string) => {
    setMensaje(text);
    setTimeout(() => setMensaje(''), 3000);
  };

  const handleToggle = async (cat: Category) => {
    setSaving(cat.id);
    try {
      await saveCategory({ ...cat, hidden: !cat.hidden });
      showMensaje(`✅ "${cat.name}" ${cat.hidden ? 'activada' : 'ocultada'}`);
    } catch {
      showMensaje('❌ Error al guardar');
    } finally {
      setSaving(null);
    }
  };

  const handleIconChange = async (cat: Category, icon: string) => {
    setSaving(cat.id);
    try {
      await saveCategory({ ...cat, icon });
    } catch {
      showMensaje('❌ Error al guardar');
    } finally {
      setSaving(null);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-[#7B1F0F] mb-2">Categorías</h1>
      <p className="text-sm text-gray-500 mb-6">Activá o desactivá categorías. Las ocultas no aparecen en el menú ni en la tienda.</p>

      {mensaje && (
        <div className="mb-4 bg-white border-2 border-[#C4351A] text-gray-800 px-4 py-2 rounded-xl text-sm font-medium">
          {mensaje}
        </div>
      )}

      <div className="space-y-3">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className={`bg-white rounded-xl border p-4 flex items-center gap-4 transition ${
              cat.hidden ? 'opacity-50 border-gray-100' : 'border-gray-200 shadow-sm'
            }`}
          >
            {/* Icono editable */}
            <input
              type="text"
              value={cat.icon}
              onChange={(e) => handleIconChange(cat, e.target.value)}
              className="w-12 text-2xl text-center border border-gray-200 rounded-lg p-1 focus:outline-none focus:border-[#C4351A]"
              maxLength={4}
            />

            {/* Nombre */}
            <div className="flex-1">
              <p className="font-semibold text-gray-800">{cat.name}</p>
              <p className="text-xs text-gray-400">ID: {cat.id}</p>
            </div>

            {/* Toggle visible/oculta */}
            <button
              onClick={() => handleToggle(cat)}
              disabled={saving === cat.id}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition disabled:opacity-50 ${
                cat.hidden
                  ? 'bg-green-50 hover:bg-green-100 text-green-700 border border-green-200'
                  : 'bg-red-50 hover:bg-red-100 text-red-600 border border-red-200'
              }`}
            >
              {saving === cat.id ? '...' : cat.hidden ? '👁️ Mostrar' : '🚫 Ocultar'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
