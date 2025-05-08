import React, { useState } from 'react';
import { SaveIcon } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
const ProfileSettings: React.FC = () => {
  const {
    user,
    updateProfile
  } = useAuth();
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [message, setMessage] = useState<{
    type: 'success' | 'error';
    text: string;
  } | null>(null);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      name,
      value
    } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    if (formData.newPassword && formData.newPassword !== formData.confirmPassword) {
      setMessage({
        type: 'error',
        text: 'Las contraseñas no coinciden'
      });
      return;
    }
    try {
      // Aquí iría la llamada a la API real para actualizar el perfil
      // Por ahora solo simulamos el éxito
      setMessage({
        type: 'success',
        text: 'Perfil actualizado correctamente'
      });
    } catch (error) {
      setMessage({
        type: 'error',
        text: 'Error al actualizar el perfil'
      });
    }
  };
  return <div className="max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Configuración del Perfil</h2>
        <button onClick={handleSubmit} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center">
          <SaveIcon className="w-5 h-5 mr-1" />
          <span>Guardar Cambios</span>
        </button>
      </div>
      {message && <div className={`mb-4 p-4 rounded-lg ${message.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
          {message.text}
        </div>}
      <div className="bg-white rounded-lg shadow p-6">
        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nombre
              </label>
              <input type="text" name="name" value={formData.name} onChange={handleInputChange} className="w-full border border-gray-300 rounded-lg px-3 py-2" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Correo electrónico
              </label>
              <input type="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full border border-gray-300 rounded-lg px-3 py-2" required />
            </div>
            <div className="border-t pt-6">
              <h3 className="text-lg font-medium mb-4">Cambiar Contraseña</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Contraseña actual
                  </label>
                  <input type="password" name="currentPassword" value={formData.currentPassword} onChange={handleInputChange} className="w-full border border-gray-300 rounded-lg px-3 py-2" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nueva contraseña
                  </label>
                  <input type="password" name="newPassword" value={formData.newPassword} onChange={handleInputChange} className="w-full border border-gray-300 rounded-lg px-3 py-2" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Confirmar nueva contraseña
                  </label>
                  <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleInputChange} className="w-full border border-gray-300 rounded-lg px-3 py-2" />
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>;
};
export default ProfileSettings;