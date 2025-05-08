import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeftIcon, SaveIcon } from 'lucide-react';
interface Transaction {
  id: number;
  date: string;
  concept: string;
  category: string;
  amount: number;
  type: 'income' | 'expense';
  description?: string;
  reference?: string;
  attachments?: string[];
}
const TransactionDetail: React.FC = () => {
  const {
    id
  } = useParams<{
    id: string;
  }>();
  const navigate = useNavigate();
  const [message, setMessage] = useState<{
    type: 'success' | 'error';
    text: string;
  } | null>(null);
  const [transaction, setTransaction] = useState<Transaction>({
    id: parseInt(id || '0'),
    date: id === 'new' ? new Date().toISOString().split('T')[0] : '2023-06-15',
    concept: id === 'new' ? '' : 'Venta Librería Central',
    category: id === 'new' ? 'Ventas' : 'Ventas',
    amount: id === 'new' ? 0 : 1250.0,
    type: id === 'new' ? 'income' : 'income',
    description: id === 'new' ? '' : 'Venta de libros a Librería Central',
    reference: id === 'new' ? '' : 'FAC-2023-001'
  });
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const {
      name,
      value
    } = e.target;
    setTransaction(prev => ({
      ...prev,
      [name]: value
    }));
  };
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Aquí iría la llamada a la API
      setMessage({
        type: 'success',
        text: 'Transacción guardada correctamente'
      });
      setTimeout(() => {
        setMessage(null);
        navigate('/accounting/transactions');
      }, 2000);
    } catch (error) {
      setMessage({
        type: 'error',
        text: 'Error al guardar la transacción'
      });
    }
  };
  return <div>
      <div className="flex items-center mb-6">
        <Link to="/accounting/transactions" className="mr-4 text-blue-600 hover:text-blue-800">
          <ArrowLeftIcon className="w-5 h-5" />
        </Link>
        <h2 className="text-2xl font-bold">
          {id === 'new' ? 'Nueva Transacción' : 'Detalles de la Transacción'}
        </h2>
        <div className="ml-auto">
          <button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center">
            <SaveIcon className="w-5 h-5 mr-1" />
            <span>Guardar Cambios</span>
          </button>
        </div>
      </div>
      {message && <div className={`mb-4 p-4 rounded-lg ${message.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
          {message.text}
        </div>}
      <div className="bg-white rounded-lg shadow p-6">
        <form onSubmit={handleSave}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Fecha
              </label>
              <input type="date" name="date" value={transaction.date} onChange={handleInputChange} className="w-full border border-gray-300 rounded-lg px-3 py-2" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tipo
              </label>
              <select name="type" value={transaction.type} onChange={handleInputChange} className="w-full border border-gray-300 rounded-lg px-3 py-2" required>
                <option value="income">Ingreso</option>
                <option value="expense">Gasto</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Concepto
              </label>
              <input type="text" name="concept" value={transaction.concept} onChange={handleInputChange} className="w-full border border-gray-300 rounded-lg px-3 py-2" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Categoría
              </label>
              <select name="category" value={transaction.category} onChange={handleInputChange} className="w-full border border-gray-300 rounded-lg px-3 py-2" required>
                <option value="Ventas">Ventas</option>
                <option value="Producción">Producción</option>
                <option value="Marketing">Marketing</option>
                <option value="Royalties">Royalties</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Importe
              </label>
              <input type="number" name="amount" value={transaction.amount} onChange={handleInputChange} step="0.01" min="0" className="w-full border border-gray-300 rounded-lg px-3 py-2" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Referencia
              </label>
              <input type="text" name="reference" value={transaction.reference} onChange={handleInputChange} className="w-full border border-gray-300 rounded-lg px-3 py-2" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Descripción
              </label>
              <textarea name="description" value={transaction.description} onChange={handleInputChange} rows={4} className="w-full border border-gray-300 rounded-lg px-3 py-2" />
            </div>
          </div>
        </form>
      </div>
    </div>;
};
export default TransactionDetail;