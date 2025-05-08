import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { BookOpenIcon } from 'lucide-react';
const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const {
    login
  } = useAuth();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await login(email, password);
    } catch (err) {
      setError('Credenciales inválidas');
    }
  };
  return <div className="min-h-screen bg-gray-100 flex flex-col justify-center">
      <div className="max-w-md w-full mx-auto">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="text-center mb-6">
            <div className="mx-auto h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
              <BookOpenIcon className="h-8 w-8 text-blue-600" />
            </div>
            <h2 className="mt-4 text-3xl font-extrabold text-gray-900">
              Editorial Siriza Agaria
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Sistema de Gestión Editorial
            </p>
          </div>
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Correo electrónico
              </label>
              <div className="mt-1">
                <input id="email" name="email" type="email" autoComplete="email" required value={email} onChange={e => setEmail(e.target.value)} className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
              </div>
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Contraseña
              </label>
              <div className="mt-1">
                <input id="password" name="password" type="password" autoComplete="current-password" required value={password} onChange={e => setPassword(e.target.value)} className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
              </div>
            </div>
            <div>
              <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                Iniciar sesión
              </button>
            </div>
            <div className="text-sm text-center text-gray-500">
              Credenciales de prueba:
              <br />
              Email: admin@editorial.com
              <br />
              Contraseña: admin123
            </div>
          </form>
        </div>
      </div>
    </div>;
};
export default LoginPage;