import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeftIcon, SaveIcon, PlusIcon, TrashIcon } from 'lucide-react';
interface OrderItem {
  id: number;
  title: string;
  isbn: string;
  quantity: number;
  price: number;
  total: number;
}
const OrderDetail: React.FC = () => {
  const {
    id
  } = useParams<{
    id: string;
  }>();
  // Mock data for an order
  const [order, setOrder] = useState({
    id: parseInt(id || '0'),
    orderNumber: 'ORD-2023-001',
    customer: 'Librería Central',
    date: '2023-06-15',
    status: 'completed',
    shippingAddress: 'Calle Principal 123, Ciudad',
    notes: 'Entregar en horario comercial',
    paymentMethod: 'Transferencia bancaria',
    subtotal: 1190.0,
    tax: 60.0,
    total: 1250.0,
    items: [{
      id: 1,
      title: 'El Gran Gatsby',
      isbn: '978-3-16-148410-0',
      quantity: 3,
      price: 24.99,
      total: 74.97
    }, {
      id: 2,
      title: 'Cien Años de Soledad',
      isbn: '978-3-16-148410-1',
      quantity: 5,
      price: 29.99,
      total: 149.95
    }, {
      id: 3,
      title: 'Don Quijote',
      isbn: '978-3-16-148410-2',
      quantity: 2,
      price: 19.99,
      total: 39.98
    }] as OrderItem[]
  });
  const [newItem, setNewItem] = useState<Partial<OrderItem>>({
    title: '',
    isbn: '',
    quantity: 1,
    price: 0
  });
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const {
      name,
      value
    } = e.target;
    setOrder(prev => ({
      ...prev,
      [name]: value
    }));
  };
  const handleItemChange = (index: number, field: keyof OrderItem, value: string | number) => {
    const updatedItems = [...order.items];
    if (field === 'quantity' || field === 'price') {
      const numValue = typeof value === 'string' ? parseFloat(value) : value;
      updatedItems[index][field] = numValue;
      updatedItems[index].total = updatedItems[index].quantity * updatedItems[index].price;
    } else {
      updatedItems[index][field] = value as string;
    }
    // Recalculate totals
    const subtotal = updatedItems.reduce((sum, item) => sum + item.total, 0);
    const tax = subtotal * 0.05; // Assuming 5% tax
    setOrder(prev => ({
      ...prev,
      items: updatedItems,
      subtotal,
      tax,
      total: subtotal + tax
    }));
  };
  const addNewItem = () => {
    if (newItem.title && newItem.isbn && newItem.quantity && newItem.price) {
      const itemToAdd: OrderItem = {
        id: Math.max(0, ...order.items.map(i => i.id)) + 1,
        title: newItem.title || '',
        isbn: newItem.isbn || '',
        quantity: newItem.quantity || 0,
        price: newItem.price || 0,
        total: (newItem.quantity || 0) * (newItem.price || 0)
      };
      const updatedItems = [...order.items, itemToAdd];
      const subtotal = updatedItems.reduce((sum, item) => sum + item.total, 0);
      const tax = subtotal * 0.05;
      setOrder(prev => ({
        ...prev,
        items: updatedItems,
        subtotal,
        tax,
        total: subtotal + tax
      }));
      setNewItem({
        title: '',
        isbn: '',
        quantity: 1,
        price: 0
      });
    }
  };
  const removeItem = (index: number) => {
    const updatedItems = order.items.filter((_, i) => i !== index);
    const subtotal = updatedItems.reduce((sum, item) => sum + item.total, 0);
    const tax = subtotal * 0.05;
    setOrder(prev => ({
      ...prev,
      items: updatedItems,
      subtotal,
      tax,
      total: subtotal + tax
    }));
  };
  return <div>
      <div className="flex items-center mb-6">
        <Link to="/orders" className="mr-4 text-blue-600 hover:text-blue-800">
          <ArrowLeftIcon className="w-5 h-5" />
        </Link>
        <h2 className="text-2xl font-bold">Detalle del Pedido</h2>
        <div className="ml-auto">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center">
            <SaveIcon className="w-5 h-5 mr-1" />
            <span>Guardar Cambios</span>
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium">Información del Pedido</h3>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${order.status === 'completed' ? 'bg-green-100 text-green-800' : order.status === 'processing' ? 'bg-blue-100 text-blue-800' : 'bg-yellow-100 text-yellow-800'}`}>
                {order.status === 'completed' && 'Completado'}
                {order.status === 'processing' && 'En proceso'}
                {order.status === 'pending' && 'Pendiente'}
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Número de Pedido
                </label>
                <input type="text" name="orderNumber" value={order.orderNumber} onChange={handleInputChange} className="w-full border border-gray-300 rounded-lg px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Cliente
                </label>
                <input type="text" name="customer" value={order.customer} onChange={handleInputChange} className="w-full border border-gray-300 rounded-lg px-3 py-2" />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Fecha
                </label>
                <input type="date" name="date" value={order.date} onChange={handleInputChange} className="w-full border border-gray-300 rounded-lg px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Estado
                </label>
                <select name="status" value={order.status} onChange={handleInputChange} className="w-full border border-gray-300 rounded-lg px-3 py-2">
                  <option value="pending">Pendiente</option>
                  <option value="processing">En proceso</option>
                  <option value="completed">Completado</option>
                </select>
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Dirección de Envío
              </label>
              <textarea name="shippingAddress" value={order.shippingAddress} onChange={handleInputChange} rows={2} className="w-full border border-gray-300 rounded-lg px-3 py-2" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Método de Pago
                </label>
                <select name="paymentMethod" value={order.paymentMethod} onChange={handleInputChange} className="w-full border border-gray-300 rounded-lg px-3 py-2">
                  <option value="Transferencia bancaria">
                    Transferencia bancaria
                  </option>
                  <option value="Tarjeta de crédito">Tarjeta de crédito</option>
                  <option value="Efectivo">Efectivo</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Notas
                </label>
                <input type="text" name="notes" value={order.notes} onChange={handleInputChange} className="w-full border border-gray-300 rounded-lg px-3 py-2" />
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium mb-4">Resumen</h3>
            <div className="flex justify-between py-2 border-b">
              <span>Subtotal</span>
              <span>${order.subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between py-2 border-b">
              <span>Impuestos (5%)</span>
              <span>${order.tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between py-3 font-bold text-lg">
              <span>Total</span>
              <span>${order.total.toFixed(2)}</span>
            </div>
            <div className="mt-4">
              <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg">
                Procesar Pedido
              </button>
            </div>
            <div className="mt-2">
              <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 rounded-lg">
                Generar PDF
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-medium mb-4">Productos</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 mb-4">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Título
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ISBN
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cantidad
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Precio
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {order.items.map((item, index) => <tr key={item.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input type="text" value={item.title} onChange={e => handleItemChange(index, 'title', e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-1" />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input type="text" value={item.isbn} onChange={e => handleItemChange(index, 'isbn', e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-1" />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input type="number" value={item.quantity} onChange={e => handleItemChange(index, 'quantity', e.target.value)} min="1" className="w-20 border border-gray-300 rounded-lg px-3 py-1" />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input type="number" value={item.price} onChange={e => handleItemChange(index, 'price', e.target.value)} step="0.01" min="0" className="w-24 border border-gray-300 rounded-lg px-3 py-1" />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap font-medium">
                    ${item.total.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <button onClick={() => removeItem(index)} className="text-red-500 hover:text-red-700">
                      <TrashIcon className="w-5 h-5" />
                    </button>
                  </td>
                </tr>)}
            </tbody>
          </table>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-2 mt-4 items-end">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Título
            </label>
            <input type="text" value={newItem.title} onChange={e => setNewItem({
            ...newItem,
            title: e.target.value
          })} className="w-full border border-gray-300 rounded-lg px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              ISBN
            </label>
            <input type="text" value={newItem.isbn} onChange={e => setNewItem({
            ...newItem,
            isbn: e.target.value
          })} className="w-full border border-gray-300 rounded-lg px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Cantidad
            </label>
            <input type="number" value={newItem.quantity} onChange={e => setNewItem({
            ...newItem,
            quantity: parseInt(e.target.value) || 0
          })} min="1" className="w-full border border-gray-300 rounded-lg px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Precio
            </label>
            <div className="flex">
              <input type="number" value={newItem.price} onChange={e => setNewItem({
              ...newItem,
              price: parseFloat(e.target.value) || 0
            })} step="0.01" min="0" className="w-full border border-gray-300 rounded-l-lg px-3 py-2" />
              <button onClick={addNewItem} className="bg-blue-600 text-white p-2 rounded-r-lg hover:bg-blue-700">
                <PlusIcon className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>;
};
export default OrderDetail;