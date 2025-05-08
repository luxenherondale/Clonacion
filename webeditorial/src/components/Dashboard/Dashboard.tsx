import React from 'react';
import { BarChart3Icon, BookOpenIcon, ShoppingCartIcon, TrendingUpIcon } from 'lucide-react';
const Dashboard: React.FC = () => {
  const statCards = [{
    title: 'Total Libros',
    value: '1,254',
    icon: <BookOpenIcon className="w-8 h-8" />,
    color: 'bg-blue-500'
  }, {
    title: 'Ventas Mensuales',
    value: '$8,254',
    icon: <TrendingUpIcon className="w-8 h-8" />,
    color: 'bg-green-500'
  }, {
    title: 'Pedidos Pendientes',
    value: '12',
    icon: <ShoppingCartIcon className="w-8 h-8" />,
    color: 'bg-yellow-500'
  }, {
    title: 'Títulos Agotados',
    value: '3',
    icon: <BarChart3Icon className="w-8 h-8" />,
    color: 'bg-red-500'
  }];
  return <div>
      <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((card, index) => <div key={index} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className={`${card.color} rounded-full p-3 text-white mr-4`}>
                {card.icon}
              </div>
              <div>
                <p className="text-gray-500 text-sm">{card.title}</p>
                <p className="text-2xl font-bold">{card.value}</p>
              </div>
            </div>
          </div>)}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Ventas Recientes</h3>
          <div className="space-y-4">
            {[1, 2, 3].map(item => <div key={item} className="border-b pb-3">
                <div className="flex justify-between">
                  <span className="font-medium">Orden #{1000 + item}</span>
                  <span className="text-green-500 font-medium">
                    ${(Math.random() * 100).toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Cliente #{item}</span>
                  <span>{new Date().toLocaleDateString()}</span>
                </div>
              </div>)}
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Inventario Bajo</h3>
          <div className="space-y-4">
            {[1, 2, 3].map(item => <div key={item} className="border-b pb-3">
                <div className="flex justify-between">
                  <span className="font-medium">Título #{item}</span>
                  <span className="text-red-500 font-medium">
                    {Math.floor(Math.random() * 10)} unidades
                  </span>
                </div>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>ISBN: 978-3-16-148410-{item}</span>
                  <span>Reordenar: 20 unidades</span>
                </div>
              </div>)}
          </div>
        </div>
      </div>
    </div>;
};
export default Dashboard;