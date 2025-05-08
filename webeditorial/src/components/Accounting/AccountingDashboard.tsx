import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CalendarIcon, DollarSignIcon, TrendingUpIcon, TrendingDownIcon } from 'lucide-react';
import CategoryManager from './CategoryManager';
const AccountingDashboard: React.FC = () => {
  const navigate = useNavigate();
  const currentMonth = new Date().toLocaleString('default', {
    month: 'long'
  });
  const currentYear = new Date().getFullYear();
  const handleNewTransaction = () => {
    navigate('/accounting/transactions/new');
  };
  const handleGenerateReport = () => {
    alert('Generando informe...');
  };
  const handleExportData = () => {
    alert('Exportando datos...');
  };
  const handleViewAllTransactions = () => {
    navigate('/accounting/transactions');
  };
  return <div>
      <h2 className="text-2xl font-bold mb-6">Contabilidad</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="bg-green-500 rounded-full p-3 text-white mr-4">
              <DollarSignIcon className="w-8 h-8" />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Ingresos ({currentMonth})</p>
              <p className="text-2xl font-bold">$12,450</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="bg-red-500 rounded-full p-3 text-white mr-4">
              <TrendingDownIcon className="w-8 h-8" />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Gastos ({currentMonth})</p>
              <p className="text-2xl font-bold">$8,320</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="bg-blue-500 rounded-full p-3 text-white mr-4">
              <TrendingUpIcon className="w-8 h-8" />
            </div>
            <div>
              <p className="text-gray-500 text-sm">
                Beneficio ({currentMonth})
              </p>
              <p className="text-2xl font-bold">$4,130</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="bg-purple-500 rounded-full p-3 text-white mr-4">
              <CalendarIcon className="w-8 h-8" />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Proyección Anual</p>
              <p className="text-2xl font-bold">$49,560</p>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Transacciones Recientes</h3>
            <button onClick={handleViewAllTransactions} className="text-blue-600 hover:text-blue-800 text-sm font-medium">
              Ver todas las transacciones
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Fecha
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Concepto
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Categoría
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Importe
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    15 Jun {currentYear}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    Venta Librería Central
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    Ventas
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-green-600">
                    +$1,250.00
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    14 Jun {currentYear}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    Impresión 500 ejemplares
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    Producción
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-red-600">
                    -$2,500.00
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    12 Jun {currentYear}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    Venta Online
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    Ventas
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-green-600">
                    +$450.00
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    10 Jun {currentYear}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    Pago Derechos Autor
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    Royalties
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-red-600">
                    -$850.00
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    8 Jun {currentYear}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    Venta Feria del Libro
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    Ventas
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-green-600">
                    +$3,200.00
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mt-4 text-right">
            <button onClick={handleViewAllTransactions} className="text-blue-600 hover:text-blue-800 text-sm font-medium">
              Ver todas las transacciones
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6">
          <CategoryManager />
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-4">Acciones Rápidas</h3>
            <div className="grid grid-cols-2 gap-4">
              <button onClick={handleNewTransaction} className="bg-blue-50 hover:bg-blue-100 text-blue-700 py-3 px-4 rounded-lg text-sm font-medium">
                Nueva Transacción
              </button>
              <button onClick={handleGenerateReport} className="bg-green-50 hover:bg-green-100 text-green-700 py-3 px-4 rounded-lg text-sm font-medium">
                Generar Informe
              </button>
              <button onClick={handleExportData} className="bg-purple-50 hover:bg-purple-100 text-purple-700 py-3 px-4 rounded-lg text-sm font-medium">
                Exportar Datos
              </button>
              <Link to="/accounting/settings" className="bg-yellow-50 hover:bg-yellow-100 text-yellow-700 py-3 px-4 rounded-lg text-sm font-medium text-center">
                Configuración
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>;
};
export default AccountingDashboard;