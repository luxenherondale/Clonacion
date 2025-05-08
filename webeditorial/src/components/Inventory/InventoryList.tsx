import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PlusIcon, SearchIcon, ArrowUpDownIcon, TrashIcon, EditIcon } from 'lucide-react';

interface InventoryItem {
  id: number;
  title: string;
  isbn: string;
  stock: number;
  location: string;
  publisher: string;
}

const InventoryList: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [inventoryItems, setInventoryItems] = useState<InventoryItem[]>([]);

  useEffect(() => {
    const storedBooks = JSON.parse(localStorage.getItem('inventoryBooks') || '[]');
    
    const mappedItems = storedBooks.map((book: any) => ({
      id: book.id,
      title: book.title,
      isbn: book.isbn,
      stock: book.stock.current,
      location: book.stock.locations.length > 0 ? book.stock.locations[0].location : 'No ubicación',
      publisher: book.publisher
    }));
    
    setInventoryItems(mappedItems);
  }, []);

  const handleDeleteBook = (id: number) => {
    if (window.confirm('¿Está seguro de que desea eliminar este libro?')) {
      setInventoryItems(items => items.filter(item => item.id !== id));
      
      const storedBooks = JSON.parse(localStorage.getItem('inventoryBooks') || '[]');
      const updatedBooks = storedBooks.filter((book: any) => book.id !== id);
      localStorage.setItem('inventoryBooks', JSON.stringify(updatedBooks));
    }
  };

  const handleNewBook = () => {
    navigate(`/inventory/new`, { replace: true });
  };

  const handleEditBook = (id: number) => {
    navigate(`/inventory/edit/${id}`);
  };

  const filteredItems = inventoryItems.filter(item => item.title.toLowerCase().includes(searchTerm.toLowerCase()) || item.isbn.includes(searchTerm));

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Inventario de Libros</h2>
        <button onClick={handleNewBook} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center">
          <PlusIcon className="w-5 h-5 mr-1" />
          <span>Nuevo Libro</span>
        </button>
      </div>
      <div className="bg-white rounded-lg shadow mb-6">
        <div className="p-4 flex flex-col md:flex-row justify-between gap-4">
          <div className="relative w-full md:w-96">
            <input type="text" placeholder="Buscar por título o ISBN..." className="pl-10 pr-4 py-2 border rounded-lg w-full" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
            <SearchIcon className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
          </div>
          <div className="flex gap-2">
            <select className="border rounded-lg px-4 py-2">
              <option>Todos los almacenes</option>
              <option>Almacén A</option>
              <option>Almacén B</option>
              <option>Almacén C</option>
            </select>
            <select className="border rounded-lg px-4 py-2">
              <option>Todas las editoriales</option>
              <option>Editorial Principal</option>
              <option>Editorial Secundaria</option>
              <option>Editorial Terciaria</option>
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
                    Título
                    <ArrowUpDownIcon className="w-4 h-4 ml-1" />
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ISBN
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center">
                    Stock
                    <ArrowUpDownIcon className="w-4 h-4 ml-1" />
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ubicación
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Editorial
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredItems.map(item => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Link to={`/inventory/${item.id}`} className="text-blue-600 hover:text-blue-800 font-medium">
                      {item.title}
                    </Link>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.isbn}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${item.stock > 10 ? 'bg-green-100 text-green-800' : item.stock > 5 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                      {item.stock} unidades
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.location}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.publisher}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-3">
                      <Link to={`/inventory/${item.id}`} className="text-blue-600 hover:text-blue-900">
                        Detalles
                      </Link>
                      <button 
                        onClick={() => handleEditBook(item.id)} 
                        className="text-green-600 hover:text-green-900 flex items-center"
                      >
                        <EditIcon className="w-5 h-5 mr-1" />
                        Editar
                      </button>
                      <button onClick={() => handleDeleteBook(item.id)} className="text-red-600 hover:text-red-900">
                        <TrashIcon className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
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
                <span className="font-medium">{filteredItems.length}</span> de{' '}
                <span className="font-medium">{filteredItems.length}</span>{' '}
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
    </div>
  );
};

export default InventoryList;