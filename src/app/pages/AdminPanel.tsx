import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Menu, X, LogOut, Package, LayoutDashboard } from 'lucide-react';
import { Product } from '../data/products';
import { useProducts } from '../contexts/ProductsContext';
import { ProductForm } from '../components/admin/ProductForm';
import { ProductList } from '../components/admin/ProductList';
import { PageEditor } from '../components/admin/PageEditor';
import { adminLogout, isAdminAuthenticated } from './AdminLogin';

type Seccion = 'productos' | 'pagina';

export const AdminPanel = () => {
  const navigate = useNavigate();
  const { products, addProduct, editProduct, deleteProduct } = useProducts();
  const [seccion, setSeccion] = useState<Seccion>('productos');
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [editing, setEditing] = useState<Product | null>(null);
  const [mensaje, setMensaje] = useState('');

  // Proteger ruta
  useEffect(() => {
    if (!isAdminAuthenticated()) {
      navigate('/admin');
    }
  }, [navigate]);

  if (!isAdminAuthenticated()) return null;

  const handleLogout = () => {
    adminLogout();
    navigate('/admin');
  };

  const showMensaje = (text: string) => {
    setMensaje(text);
    setTimeout(() => setMensaje(''), 3000);
  };

  const handleAdd = async (data: Omit<Product, 'id'>) => {
    try {
      await addProduct(data);
      showMensaje(`✅ "${data.name}" agregado correctamente`);
    } catch {
      showMensaje('❌ Error al guardar. Revisá la conexión.');
    }
  };

  const handleEdit = async (data: Omit<Product, 'id'>) => {
    if (!editing) return;
    try {
      await editProduct(editing.id, data);
      setEditing(null);
      showMensaje(`✅ "${data.name}" editado correctamente`);
    } catch {
      showMensaje('❌ Error al editar. Revisá la conexión.');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteProduct(id);
      showMensaje('🗑️ Producto eliminado');
    } catch {
      showMensaje('❌ Error al eliminar. Revisá la conexión.');
    }
  };

  const cambiarSeccion = (s: Seccion) => {
    setSeccion(s);
    setMenuAbierto(false);
  };

  const navItems: { id: Seccion; label: string; icon: React.ReactNode }[] = [
    { id: 'productos', label: 'Productos', icon: <Package className="w-5 h-5" /> },
    { id: 'pagina', label: 'Edición de Página', icon: <LayoutDashboard className="w-5 h-5" /> },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Toast de confirmación */}
      {mensaje && (
        <div className="fixed top-6 right-6 z-50 bg-white border-2 border-[#C4351A] text-gray-800 px-6 py-3 rounded-xl shadow-2xl font-medium">
          {mensaje}
        </div>
      )}

      {/* SIDEBAR DESKTOP */}
      <aside className="hidden md:flex md:flex-col w-64 bg-[#7B1F0F] text-white py-6 px-4 shadow-xl min-h-screen">
        <div className="text-center border-b border-white/10 pb-6 mb-6">
          <span className="text-4xl">🧉</span>
          <h2 className="text-xl font-bold mt-2">La Eugenia & Flia.</h2>
          <p className="text-white/50 text-xs mt-1">Admin Panel</p>
        </div>

        <nav className="flex flex-col gap-2 flex-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => cambiarSeccion(item.id)}
              className={`flex items-center gap-3 text-left px-4 py-3 rounded-xl transition-all ${
                seccion === item.id
                  ? 'bg-[#F5C080] text-[#7B1F0F] font-bold'
                  : 'hover:bg-white/10'
              }`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </nav>

        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10 transition-colors text-white/70 hover:text-white mt-4"
        >
          <LogOut className="w-5 h-5" />
          Cerrar sesión
        </button>
      </aside>

      {/* SIDEBAR MOBILE */}
      <div
        className={`fixed inset-y-0 left-0 bg-[#7B1F0F] text-white w-64 transform ${
          menuAbierto ? 'translate-x-0' : '-translate-x-full'
        } transition-all duration-300 z-40 flex flex-col py-6 px-4 md:hidden shadow-2xl`}
      >
        <div className="text-center border-b border-white/10 pb-6 mb-6">
          <span className="text-4xl">🧉</span>
          <h2 className="text-xl font-bold mt-2">La Eugenia & Flia.</h2>
          <p className="text-white/50 text-xs mt-1">Admin Panel</p>
        </div>

        <nav className="flex flex-col gap-2 flex-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => cambiarSeccion(item.id)}
              className={`flex items-center gap-3 text-left px-4 py-3 rounded-xl transition-all ${
                seccion === item.id
                  ? 'bg-[#F5C080] text-[#7B1F0F] font-bold'
                  : 'hover:bg-white/10'
              }`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </nav>

        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10 transition-colors text-white/70 mt-4"
        >
          <LogOut className="w-5 h-5" />
          Cerrar sesión
        </button>
      </div>

      {/* Botón hamburguesa mobile */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setMenuAbierto(!menuAbierto)}
          className="bg-[#7B1F0F] text-white p-2 rounded-xl shadow-lg hover:bg-[#C4351A]"
        >
          {menuAbierto ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Overlay mobile */}
      {menuAbierto && (
        <div
          className="fixed inset-0 bg-black/40 z-30 md:hidden"
          onClick={() => setMenuAbierto(false)}
        />
      )}

      {/* CONTENIDO PRINCIPAL */}
      <main className="flex-1 p-6 md:p-8 mt-14 md:mt-0 overflow-auto">
        {seccion === 'productos' && (
          <div>
            <h1 className="text-3xl font-bold text-[#7B1F0F] mb-6">Gestión de Productos</h1>
            <div className="grid md:grid-cols-2 gap-6 items-start">
              <div>
                <ProductForm
                  onSubmit={editing ? handleEdit : handleAdd}
                  onCancel={() => setEditing(null)}
                  editing={editing}
                />
              </div>
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-lg font-semibold text-gray-700">
                    Productos ({products.length})
                  </h2>
                </div>
                <ProductList products={products} onEdit={setEditing} onDelete={handleDelete} />
              </div>
            </div>
          </div>
        )}

        {seccion === 'pagina' && <PageEditor />}
      </main>
    </div>
  );
};
