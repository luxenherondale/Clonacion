import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PlusIcon, SearchIcon, FilterIcon } from 'lucide-react';
const OrdersList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  // Mock data for orders
  const orders = [{
    id: 1,
    orderNumber: 'ORD-2023-001',
    customer: 'Librería Central',
    date: '2023-06-15',
    total: 1250.0,
    status: 'completed',
    items: 5
  }, {
    id: 2,
    orderNumber: 'ORD-2023-002',
    customer: 'Distribuidora Norte',
    date: '2023-06-14',
    total: 3450.0,
    status: 'processing',
    items: 12
  }, {
    id: 3,
    orderNumber: 'ORD-2023-003',
    customer: 'Tienda Online',
    date: '2023-06-12',
    total: 450.0,
    status: 'completed',
    items: 2
  }, {
    id: 4,
    orderNumber: 'ORD-2023-004',
    customer: 'Feria del Libro',
    date: '2023-06-10',
    total: 2800.0,
    status: 'pending',
    items: 8
  }, {
    id: 5,
    orderNumber: 'ORD-2023-005',
    customer: 'Librería Sur',
    date: '2023-06-08',
    total: 1650.0,
    status: 'processing',
    items: 6
  }];
  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) || order.customer.toLowerCase().includes(searchTerm.toLowerCase());
    if (statusFilter === 'all') return matchesSearch;
    return matchesSearch && order.status === statusFilter;
  });
  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  return <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Pedidos</h2>
        <Link to="/orders/new" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center">
          <PlusIcon className="w-5 h-5 mr-1" />
          <span>Nuevo Pedido</span>
        </Link>
      </div>
      <div className="bg-white rounded-lg shadow mb-6">
        <div className="p-4 flex flex-col md:flex-row justify-between gap-4">
          <div className="relative w-full md:w-96">
            <input type="text" placeholder="Buscar por número o cliente..." className="pl-10 pr-4 py-2 border rounded-lg w-full" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
            <SearchIcon className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
          </div>
          <div className="flex gap-2">
            <div className="relative">
              <select className="border rounded-lg pl-10 pr-4 py-2 appearance-none" value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
                <option value="all">Todos los estados</option>
                <option value="pending">Pendiente</option>
                <option value="processing">En proceso</option>
                <option value="completed">Completado</option>
              </select>
              <FilterIcon className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
            </div>
            <button className="bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg text-sm font-medium">
              Exportar
            </button>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Número de Pedido
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cliente
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fecha
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Artículos
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estado
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredOrders.map(order => <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Link to={`/orders/${order.id}`} className="text-blue-600 hover:text-blue-800 font-medium">
                      {order.orderNumber}
                    </Link>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {order.customer}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(order.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {order.items} productos
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    ${order.total.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeClass(order.status)}`}>
                      {order.status === 'completed' && 'Completado'}
                      {order.status === 'processing' && 'En proceso'}
                      {order.status === 'pending' && 'Pendiente'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Link to={`/orders/${order.id}`} className="text-blue-600 hover:text-blue-900 mr-4">
                      Ver
                    </Link>
                  </td>
                </tr>)}
            </tbody>
          </table>
        </div>
        <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
          <div className="flex-1 flex justify-between sm:hidden">
            <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
              Anterior
            </button>
            <button className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
              Siguiente
            </button>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Mostrando <span className="font-medium">1</span> a{' '}
                <span className="font-medium">{filteredOrders.length}</span> de{' '}
                <span className="font-medium">{filteredOrders.length}</span>{' '}
                resultados
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                  Anterior
                </button>
                <button className="bg-blue-50 border-blue-500 text-blue-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium">
                  1
                </button>
                <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                  Siguiente
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>;
};
export default OrdersList;