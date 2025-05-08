import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { SearchIcon, FilterIcon, ArrowUpDownIcon } from 'lucide-react';
interface Transaction {
  id: number;
  date: string;
  concept: string;
  category: string;
  amount: number;
  type: 'income' | 'expense';
}
const TransactionsList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [transactions] = useState<Transaction[]>([{
    id: 1,
    date: '2023-06-15',
    concept: 'Venta Librería Central',
    category: 'Ventas',
    amount: 1250.0,
    type: 'income'
  }, {
    id: 2,
    date: '2023-06-14',
    concept: 'Impresión 500 ejemplares',
    category: 'Producción',
    amount: 2500.0,
    type: 'expense'
  }
  // ... más transacciones
  ]);
  const filteredTransactions = transactions.filter(transaction => transaction.concept.toLowerCase().includes(searchTerm.toLowerCase()) || transaction.category.toLowerCase().includes(searchTerm.toLowerCase()));
  return <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Transacciones</h2>
        <Link to="/accounting/new-transaction" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
          Nueva Transacción
        </Link>
      </div>
      <div className="bg-white rounded-lg shadow mb-6">
        <div className="p-4 flex flex-col md:flex-row justify-between gap-4">
          <div className="relative w-full md:w-96">
            <input type="text" placeholder="Buscar transacciones..." className="pl-10 pr-4 py-2 border rounded-lg w-full" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
            <SearchIcon className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
          </div>
          <div className="flex gap-2">
            <select className="border rounded-lg px-4 py-2">
              <option value="all">Todas las categorías</option>
              <option value="sales">Ventas</option>
              <option value="production">Producción</option>
              <option value="marketing">Marketing</option>
              <option value="royalties">Royalties</option>
            </select>
            <select className="border rounded-lg px-4 py-2">
              <option value="all">Todos los tipos</option>
              <option value="income">Ingresos</option>
              <option value="expense">Gastos</option>
            </select>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center">
                    Fecha
                    <ArrowUpDownIcon className="w-4 h-4 ml-1" />
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Concepto
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Categoría
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center justify-end">
                    Importe
                    <ArrowUpDownIcon className="w-4 h-4 ml-1" />
                  </div>
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredTransactions.map(transaction => <tr key={transaction.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(transaction.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {transaction.concept}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {transaction.category}
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm text-right ${transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                    {transaction.type === 'income' ? '+' : '-'}$
                    {transaction.amount.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Link to={`/accounting/transactions/${transaction.id}`} className="text-blue-600 hover:text-blue-900">
                      Ver detalles
                    </Link>
                  </td>
                </tr>)}
            </tbody>
          </table>
        </div>
      </div>
    </div>;
};
export default TransactionsList;