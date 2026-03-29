import { useState, useRef } from 'react';
import { usePageConfig, PageConfig } from '../../contexts/PageConfigContext';
import { resolveImageUrl } from '../../utils/image';

const IMGBB_API_KEY = 'bcfd40d0312af92c9abc93c02e2a0d82';

async function uploadToImgBB(file: File): Promise<string> {
  const formData = new FormData();
  formData.append('image', file);
  formData.append('key', IMGBB_API_KEY);
  const res = await fetch('https://api.imgbb.com/1/upload', { method: 'POST', body: formData });
  const data = await res.json();
  if (!data.success) throw new Error('Error al subir imagen');
  return data.data.url;
}

export const PageEditor = () => {
  const { config, saveConfig } = usePageConfig();
  const [form, setForm] = useState<PageConfig>({ ...config });
  const [uploading, setUploading] = useState(false);
  const [saved, setSaved] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleSave = async () => {
    await saveConfig(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleMsgChange = (i: number, val: string) => {
    const msgs = [...form.tickerMessages];
    msgs[i] = val;
    setForm((prev) => ({ ...prev, tickerMessages: msgs }));
  };

  const addMsg = () =>
    setForm((prev) => ({ ...prev, tickerMessages: [...prev.tickerMessages, ''] }));

  const removeMsg = (i: number) =>
    setForm((prev) => ({
      ...prev,
      tickerMessages: prev.tickerMessages.filter((_, idx) => idx !== i),
    }));

  const handlePromoUpload = async (file: File) => {
    setUploading(true);
    try {
      const url = await uploadToImgBB(file);
      setForm((prev) => ({ ...prev, promoImage: url }));
    } catch {
      alert('Error al subir imagen');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-[#7B1F0F]">Edición de Página</h1>

      {/* TICKER */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-[#7B1F0F]">📢 Carrusel de avisos</h2>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={form.tickerEnabled}
              onChange={(e) => setForm((prev) => ({ ...prev, tickerEnabled: e.target.checked }))}
              className="w-4 h-4 accent-[#7B1F0F]"
            />
            <span className="text-sm font-medium text-gray-600">Activado</span>
          </label>
        </div>

        <div className="space-y-2">
          {form.tickerMessages.map((msg, i) => (
            <div key={i} className="flex gap-2">
              <input
                value={msg}
                onChange={(e) => handleMsgChange(i, e.target.value)}
                placeholder="Ej: 🎁 OFERTA DÍA DE LA MADRE"
                className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-800 focus:outline-none focus:border-[#C4351A]"
              />
              <button
                onClick={() => removeMsg(i)}
                className="text-red-400 hover:text-red-600 text-xl font-bold px-2"
              >
                ×
              </button>
            </div>
          ))}
          <button onClick={addMsg} className="text-sm text-[#C4351A] hover:underline mt-1">
            + Agregar mensaje
          </button>
        </div>
      </div>

      {/* ENVÍO */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <h2 className="text-xl font-semibold text-[#7B1F0F] mb-4">🚚 Texto de envío</h2>
        <p className="text-sm text-gray-400 mb-3">Aparece debajo del precio en las tarjetas y detalle de producto. Dejalo vacío para no mostrar nada.</p>
        <input
          type="text"
          value={form.shippingText}
          onChange={(e) => setForm((prev) => ({ ...prev, shippingText: e.target.value }))}
          placeholder="Ej: Envío gratis a todo el país"
          className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-800 focus:outline-none focus:border-[#C4351A]"
        />
      </div>

      {/* PUBLICIDAD MODAL */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-[#7B1F0F]">🖼️ Publicidad al ingresar</h2>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={form.promoEnabled}
              onChange={(e) => setForm((prev) => ({ ...prev, promoEnabled: e.target.checked }))}
              className="w-4 h-4 accent-[#7B1F0F]"
            />
            <span className="text-sm font-medium text-gray-600">Activada</span>
          </label>
        </div>

        <p className="text-sm text-gray-400 mb-4">
          Aparece 3 segundos al ingresar a la página. Se puede cerrar antes.
        </p>

        <div className="flex gap-4 items-start">
          <div className="flex-1 space-y-2">
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => { const f = e.target.files?.[0]; if (f) handlePromoUpload(f); }}
            />
            <button
              onClick={() => fileRef.current?.click()}
              disabled={uploading}
              className="w-full bg-[#7B1F0F] hover:bg-[#C4351A] disabled:opacity-50 text-white py-2 rounded-lg font-medium transition-colors"
            >
              {uploading ? '⏳ Subiendo...' : '📁 Subir imagen de publicidad'}
            </button>
            <input
              type="url"
              value={form.promoImage}
              onChange={(e) => setForm((prev) => ({ ...prev, promoImage: e.target.value }))}
              placeholder="O pegá una URL..."
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-800 focus:outline-none focus:border-[#C4351A]"
            />
          </div>

          {form.promoImage && (
            <img
              src={resolveImageUrl(form.promoImage)}
              alt="Preview"
              className="w-32 h-32 object-cover rounded-xl border border-gray-200 flex-shrink-0"
            />
          )}
        </div>
      </div>

      {/* GUARDAR */}
      <button
        onClick={handleSave}
        className="w-full bg-[#7B1F0F] hover:bg-[#C4351A] text-white py-3 rounded-xl font-bold text-lg transition-colors"
      >
        {saved ? '✅ Guardado' : 'Guardar cambios'}
      </button>
    </div>
  );
};
