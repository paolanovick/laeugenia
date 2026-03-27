import { useState, useEffect, useRef } from 'react';
import { Product } from '../../data/products';
import { resolveImageUrl } from '../../utils/image';

const IMGBB_API_KEY = 'bcfd40d0312af92c9abc93c02e2a0d82';

async function uploadToImgBB(file: File): Promise<string> {
  const formData = new FormData();
  formData.append('image', file);
  formData.append('key', IMGBB_API_KEY);
  const res = await fetch('https://api.imgbb.com/1/upload', {
    method: 'POST',
    body: formData,
  });
  const data = await res.json();
  if (!data.success) throw new Error('Error al subir imagen');
  return data.data.url;
}

const CATEGORIAS = [
  { id: 'mates', label: '🧉 Mates' },
  { id: 'yerba', label: '🌿 Yerba & Blends' },
  { id: 'bombillas', label: '✨ Bombillas' },
];

type ProductFormData = Omit<Product, 'id'>;

interface Props {
  onSubmit: (data: ProductFormData) => void;
  onCancel: () => void;
  editing: Product | null;
}

const emptyForm: ProductFormData = {
  name: '',
  category: 'mates',
  price: 0,
  images: [''],
  description: '',
  featured: false,
  specs: [],
};

export const ProductForm = ({ onSubmit, onCancel, editing }: Props) => {
  const [form, setForm] = useState<ProductFormData>(emptyForm);
  const [imageInputs, setImageInputs] = useState<string[]>(['']);
  const [uploading, setUploading] = useState<boolean[]>([false]);
  const [specInputs, setSpecInputs] = useState<{ label: string; value: string }[]>([
    { label: '', value: '' },
  ]);
  const fileRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (editing) {
      setForm({
        name: editing.name,
        category: editing.category,
        price: editing.price,
        images: editing.images,
        description: editing.description,
        featured: editing.featured,
        specs: editing.specs,
      });
      const imgs = editing.images.length > 0 ? editing.images : [''];
      setImageInputs(imgs);
      setUploading(imgs.map(() => false));
      setSpecInputs(editing.specs.length > 0 ? editing.specs : [{ label: '', value: '' }]);
    } else {
      setForm(emptyForm);
      setImageInputs(['']);
      setUploading([false]);
      setSpecInputs([{ label: '', value: '' }]);
    }
  }, [editing]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleImageChange = (index: number, value: string) => {
    const updated = [...imageInputs];
    updated[index] = value;
    setImageInputs(updated);
  };

  const handleFileUpload = async (index: number, file: File) => {
    const updatedUploading = [...uploading];
    updatedUploading[index] = true;
    setUploading(updatedUploading);
    try {
      const url = await uploadToImgBB(file);
      handleImageChange(index, url);
    } catch {
      alert('Error al subir la imagen. Verificá tu API key de ImgBB.');
    } finally {
      updatedUploading[index] = false;
      setUploading([...updatedUploading]);
    }
  };

  const addImageInput = () => {
    setImageInputs((prev) => [...prev, '']);
    setUploading((prev) => [...prev, false]);
  };

  const removeImageInput = (index: number) => {
    setImageInputs((prev) => prev.filter((_, i) => i !== index));
    setUploading((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSpecChange = (index: number, field: 'label' | 'value', value: string) => {
    const updated = [...specInputs];
    updated[index][field] = value;
    setSpecInputs(updated);
  };

  const addSpec = () => setSpecInputs((prev) => [...prev, { label: '', value: '' }]);
  const removeSpec = (index: number) =>
    setSpecInputs((prev) => prev.filter((_, i) => i !== index));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const images = imageInputs.filter((url) => url.trim() !== '');
    const specs = specInputs.filter((s) => s.label.trim() !== '');
    onSubmit({ ...form, price: Number(form.price), images, specs });
    setForm(emptyForm);
    setImageInputs(['']);
    setUploading([false]);
    setSpecInputs([{ label: '', value: '' }]);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-[#f5f0e8] rounded-xl p-6 space-y-5">
      <h2 className="text-xl font-bold text-[#7B1F0F]">
        {editing ? '✏️ Editar producto' : '🆕 Nuevo producto'}
      </h2>

      {/* Nombre */}
      <div>
        <label className="block text-sm font-semibold text-[#C4351A] mb-1">Nombre</label>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          required
          placeholder="Ej: Mate Imperial de Calabaza"
          className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-white text-gray-800 focus:outline-none focus:border-[#C4351A]"
        />
      </div>

      {/* Descripción */}
      <div>
        <label className="block text-sm font-semibold text-[#C4351A] mb-1">Descripción</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          rows={3}
          placeholder="Descripción del producto..."
          className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-white text-gray-800 focus:outline-none focus:border-[#C4351A] resize-none"
        />
      </div>

      {/* Precio */}
      <div>
        <label className="block text-sm font-semibold text-[#C4351A] mb-1">Precio ($)</label>
        <input
          name="price"
          type="number"
          min="0"
          value={form.price}
          onChange={handleChange}
          required
          placeholder="0"
          className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-white text-gray-800 focus:outline-none focus:border-[#C4351A]"
        />
      </div>

      {/* Categoría */}
      <div>
        <label className="block text-sm font-semibold text-[#C4351A] mb-2">Categoría</label>
        <div className="flex gap-2 flex-wrap">
          {CATEGORIAS.map((cat) => (
            <button
              type="button"
              key={cat.id}
              onClick={() => setForm((prev) => ({ ...prev, category: cat.id as Product['category'] }))}
              className={`px-4 py-2 rounded-lg border text-sm font-medium transition ${
                form.category === cat.id
                  ? 'bg-[#7B1F0F] text-white border-[#7B1F0F]'
                  : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Imágenes */}
      <div>
        <label className="block text-sm font-semibold text-[#C4351A] mb-1">Imágenes</label>
        <div className="space-y-2">
          {imageInputs.map((url, i) => (
            <div key={i} className="flex gap-2 items-center">
              {/* Input oculto para archivo */}
              <input
                type="file"
                accept="image/*"
                ref={(el) => { fileRefs.current[i] = el; }}
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleFileUpload(i, file);
                }}
              />

              {/* Botón subir archivo */}
              <button
                type="button"
                onClick={() => fileRefs.current[i]?.click()}
                disabled={uploading[i]}
                className="flex-shrink-0 bg-[#7B1F0F] hover:bg-[#C4351A] disabled:opacity-50 text-white text-xs px-3 py-2 rounded-lg transition-colors font-medium whitespace-nowrap"
              >
                {uploading[i] ? '⏳ Subiendo...' : '📁 Subir'}
              </button>

              {/* Input URL */}
              <input
                type="url"
                value={url}
                onChange={(e) => handleImageChange(i, e.target.value)}
                placeholder="O pegá una URL..."
                className="flex-1 px-3 py-2 border border-gray-200 rounded-lg bg-white text-gray-800 text-sm focus:outline-none focus:border-[#C4351A]"
              />

              {/* Preview */}
              {url && (
                <img
                  src={resolveImageUrl(url)}
                  alt=""
                  className="w-10 h-10 object-cover rounded-lg border border-gray-200 flex-shrink-0"
                  onError={(e) => (e.currentTarget.style.display = 'none')}
                  onLoad={(e) => (e.currentTarget.style.display = 'block')}
                />
              )}

              {/* Eliminar */}
              {imageInputs.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeImageInput(i)}
                  className="text-red-400 hover:text-red-600 text-lg font-bold px-1 flex-shrink-0"
                >
                  ×
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={addImageInput}
            className="text-sm text-[#C4351A] hover:underline"
          >
            + Agregar otra imagen
          </button>
        </div>
      </div>

      {/* Especificaciones */}
      <div>
        <label className="block text-sm font-semibold text-[#C4351A] mb-1">Especificaciones</label>
        <div className="space-y-2">
          {specInputs.map((spec, i) => (
            <div key={i} className="flex gap-2">
              <input
                value={spec.label}
                onChange={(e) => handleSpecChange(i, 'label', e.target.value)}
                placeholder="Ej: Material"
                className="flex-1 px-3 py-2 border border-gray-200 rounded-lg bg-white text-gray-800 text-sm focus:outline-none focus:border-[#C4351A]"
              />
              <input
                value={spec.value}
                onChange={(e) => handleSpecChange(i, 'value', e.target.value)}
                placeholder="Ej: Calabaza curada"
                className="flex-1 px-3 py-2 border border-gray-200 rounded-lg bg-white text-gray-800 text-sm focus:outline-none focus:border-[#C4351A]"
              />
              {specInputs.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeSpec(i)}
                  className="text-red-400 hover:text-red-600 text-lg font-bold px-1"
                >
                  ×
                </button>
              )}
            </div>
          ))}
          <button type="button" onClick={addSpec} className="text-sm text-[#C4351A] hover:underline">
            + Agregar especificación
          </button>
        </div>
      </div>

      {/* Destacado */}
      <div className="flex items-center gap-3 bg-white p-3 rounded-lg border border-gray-200">
        <input
          type="checkbox"
          id="featured"
          name="featured"
          checked={form.featured}
          onChange={handleChange}
          className="w-4 h-4 cursor-pointer accent-[#7B1F0F]"
        />
        <label htmlFor="featured" className="font-semibold text-[#7B1F0F] cursor-pointer">
          Producto destacado ⭐{' '}
          <span className="text-xs font-normal text-gray-400">(aparece en el carrusel principal)</span>
        </label>
      </div>

      {/* Botones */}
      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          className="bg-[#7B1F0F] hover:bg-[#C4351A] text-white px-6 py-2 rounded-lg font-semibold transition-colors"
        >
          Guardar
        </button>
        {editing && (
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-2 rounded-lg font-semibold transition-colors"
          >
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
};
