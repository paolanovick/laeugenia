import { useState } from 'react';
import { useNavigate } from 'react-router';

const ADMIN_EMAIL = 'admin@laeugeniamates.com';
const ADMIN_PASSWORD = 'eugenia2026';
const AUTH_KEY = 'eugenia_admin_auth';

export function isAdminAuthenticated(): boolean {
  return localStorage.getItem(AUTH_KEY) === 'true';
}

export function adminLogout() {
  localStorage.removeItem(AUTH_KEY);
}

export const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      localStorage.setItem(AUTH_KEY, 'true');
      navigate('/admin/dashboard');
    } else {
      setError('Email o contraseña incorrectos');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#120505] to-[#7B1F0F] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <span className="text-5xl">🧉</span>
          <h1 className="text-3xl font-bold text-white mt-3">La Eugenia</h1>
          <p className="text-white/50 mt-1 text-sm">Panel Administrativo</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-2xl p-8"
        >
          <h2 className="text-2xl font-bold text-[#7B1F0F] text-center mb-6">
            Iniciar Sesión
          </h2>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4 text-sm">
              {error}
            </div>
          )}

          <div className="mb-4">
            <label className="block text-sm font-semibold text-[#C4351A] mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="admin@laeugeniamates.com"
              className="w-full px-4 py-3 rounded-lg border border-gray-200 text-gray-800 focus:outline-none focus:border-[#C4351A] focus:ring-1 focus:ring-[#C4351A]"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-semibold text-[#C4351A] mb-2">
              Contraseña
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-lg border border-gray-200 text-gray-800 focus:outline-none focus:border-[#C4351A] focus:ring-1 focus:ring-[#C4351A]"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#7B1F0F] hover:bg-[#C4351A] text-white font-bold py-3 rounded-lg transition-colors"
          >
            Ingresar
          </button>
        </form>
      </div>
    </div>
  );
};
