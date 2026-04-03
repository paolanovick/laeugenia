import { useState } from 'react';
import { useCategories, Category } from '../../contexts/CategoriesContext';

export const CategoryEditor = () => {
  const { categories, saveCategory } = useCategories();
  const [saving, setSaving] = useState<string | null>(null);
  const [mensaje, setMensaje] = useState('');
  const [newCat, setNewCat] = useState({ name: '', icon: '🆕', id: '' });
  const [creando, setCreando] = useState(false);
  const [showForm, setShowForm] = useState(false);

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
      showMensaje('❌ Error al guardar ícono');
    } finally {
      setSaving(null);
    }
  };

  const handleMoveUp = async (cat: Category) => {
    const sorted = [...categories].sort((a, b) => a.order - b.order);
    const idx = sorted.findIndex((c) => c.id === cat.id);
    if (idx === 0) return;
    const prev = sorted[idx - 1];
    setSaving(cat.id);
    try {
      await saveCategory({ ...cat, order: prev.order });
      await saveCategory({ ...prev, order: cat.order });
    } catch {
      showMensaje('❌ Error al reordenar');
    } finally {
      setSaving(null);
    }
  };

  const handleMoveDown = async (cat: Category) => {
    const sorted = [...categories].sort((a, b) => a.order - b.order);
    const idx = sorted.findIndex((c) => c.id === cat.id);
    if (idx === sorted.length - 1) return;
    const next = sorted[idx + 1];
    setSaving(cat.id);
    try {
      await saveCategory({ ...cat, order: next.order });
      await saveCategory({ ...next, order: cat.order });
    } catch {
      showMensaje('❌ Error al reordenar');
    } finally {
      setSaving(null);
    }
  };

  const handleCreate = async () => {
    if (!newCat.name.trim() || !newCat.id.trim()) {
      showMensaje('❌ Completá el nombre y el ID');
      return;
    }
    if (categories.some((c) => c.id === newCat.id)) {
      showMensaje('❌ Ya existe una categoría con ese ID');
      return;
    }
    setCreando(true);
    try {
      await saveCategory({
        id: newCat.id.toLowerCase().replace(/\s+/g, '-'),
        name: newCat.name.trim(),
        icon: newCat.icon || '🆕',
        hidden: false,
        order: categories.length,
      });
      setNewCat({ name: '', icon: '🆕', id: '' });
      setShowForm(false);
      showMensaje(`✅ Categoría "${newCat.name}" creada`);
    } catch {
      showMensaje('❌ Error al crear categoría');
    } finally {
      setCreando(false);
    }
  };

  const sorted = [...categories].sort((a, b) => a.order - b.order);

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-3xl font-bold text-[#7B1F0F]">Categorías</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-[#7B1F0F] hover:bg-[#C4351A] text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
        >
          {showForm ? '✕ Cancelar' : '+ Nueva categoría'}
        </button>
      </div>
      <p className="text-sm text-gray-500 mb-6">Activá, ocultá, reordenás o creá categorías. Las ocultas no aparecen en la página principal de la tienda.</p>

      {mensaje && (
        <div className="mb-4 bg-white border-2 border-[#C4351A] text-gray-800 px-4 py-2 rounded-xl text-sm font-medium">
          {mensaje}
        </div>
      )}

      {/* Formulario nueva categoría */}
      {showForm && (
        <div className="bg-[#f5f0e8] rounded-xl p-5 mb-6 border border-[#C4351A]/20 space-y-3">
          <h2 className="font-semibold text-[#7B1F0F]">Nueva categoría</h2>
          <div className="flex gap-3">
            <input
              type="text"
              value={newCat.icon}
              onChange={(e) => setNewCat((p) => ({ ...p, icon: e.target.value }))}
              className="w-14 text-2xl text-center border border-gray-200 rounded-lg p-2 focus:outline-none focus:border-[#C4351A] bg-white"
              maxLength={4}
              placeholder="🆕"
            />
            <input
              type="text"
              value={newCat.name}
              onChange={(e) => setNewCat((p) => ({ ...p, name: e.target.value }))}
              placeholder="Nombre (ej: Termos)"
              className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-800 focus:outline-none focus:border-[#C4351A] bg-white"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">ID único (sin espacios, en minúsculas)</label>
            <input
              type="text"
              value={newCat.id}
              onChange={(e) => setNewCat((p) => ({ ...p, id: e.target.value.toLowerCase().replace(/\s+/g, '-') }))}
              placeholder="ej: termos"
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-800 focus:outline-none focus:border-[#C4351A] bg-white"
            />
          </div>
          <button
            onClick={handleCreate}
            disabled={creando}
            className="bg-[#7B1F0F] hover:bg-[#C4351A] disabled:opacity-50 text-white px-5 py-2 rounded-lg text-sm font-semibold transition-colors"
          >
            {creando ? '⏳ Creando...' : 'Crear categoría'}
          </button>
        </div>
      )}

      {/* Lista de categorías */}
      <div className="space-y-3">
        {sorted.map((cat, idx) => (
          <div
            key={cat.id}
            className={`bg-white rounded-xl border p-4 flex items-center gap-3 transition ${
              cat.hidden ? 'opacity-50 border-gray-100' : 'border-gray-200 shadow-sm'
            }`}
          >
            {/* Flechas de orden */}
            <div className="flex flex-col gap-0.5">
              <button
                onClick={() => handleMoveUp(cat)}
                disabled={idx === 0 || saving === cat.id}
                className="text-gray-400 hover:text-[#7B1F0F] disabled:opacity-20 text-xs leading-none px-1"
              >
                ▲
              </button>
              <button
                onClick={() => handleMoveDown(cat)}
                disabled={idx === sorted.length - 1 || saving === cat.id}
                className="text-gray-400 hover:text-[#7B1F0F] disabled:opacity-20 text-xs leading-none px-1"
              >
                ▼
              </button>
            </div>

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
