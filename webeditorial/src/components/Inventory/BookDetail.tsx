import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeftIcon, SaveIcon } from 'lucide-react';

interface LocationStock {
  location: string;
  quantity: number;
}

interface BookStock {
  total: number;
  sold: number;
  gifts: number;
  invested: number;
  current: number;
  locations: LocationStock[];
}

interface Book {
  id: number;
  title: string;
  isbn: string;
  author: string;
  publisher: string;
  publicationYear: number;
  price: number;
  cost: number;
  description: string;
  stock: BookStock;
}

const BookDetail: React.FC = () => {
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
  const [isEditMode, setIsEditMode] = useState(false);
  const [book, setBook] = useState<Book>({
    id: 0,
    title: '',
    isbn: '',
    author: '',
    publisher: '',
    publicationYear: new Date().getFullYear(),
    price: 0,
    cost: 0,
    description: '',
    stock: {
      total: 0,
      sold: 0,
      gifts: 0,
      invested: 0,
      current: 0,
      locations: []
    }
  });
  const [newLocation, setNewLocation] = useState<LocationStock>({
    location: '',
    quantity: 0
  });

  useEffect(() => {
    const pathParts = window.location.pathname.split('/');
    const isEditing = pathParts.includes('edit');
    setIsEditMode(isEditing || id === 'new');
    
    const storedBooks = JSON.parse(localStorage.getItem('inventoryBooks') || '[]');
    
    if (id === 'new') {
      return;
    }
    
    const bookId = parseInt(id || '0');
    const foundBook = storedBooks.find((b: Book) => b.id === bookId);
    
    if (foundBook) {
      setBook(foundBook);
    } else {
      if (storedBooks.length > 0) {
        setMessage({
          type: 'error',
          text: 'Libro no encontrado'
        });
      } else if (isEditing) {
        navigate('/inventory');
      }
    }
  }, [id, navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {
      name,
      value
    } = e.target;
    setBook(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleStockChange = (field: keyof BookStock, value: number) => {
    setBook(prev => ({
      ...prev,
      stock: {
        ...prev.stock,
        [field]: value,
        current: calculateCurrentStock({
          ...prev.stock,
          [field]: value
        })
      }
    }));
  };

  const calculateCurrentStock = (stock: BookStock) => {
    const locationsTotal = stock.locations.reduce((sum, loc) => sum + loc.quantity, 0);
    return stock.total - stock.sold - stock.gifts - stock.invested + locationsTotal;
  };

  const handleLocationChange = (index: number, field: keyof LocationStock, value: string) => {
    const updatedLocations = [...book.stock.locations];
    if (field === 'quantity') {
      updatedLocations[index].quantity = parseInt(value) || 0;
    } else {
      updatedLocations[index][field] = value;
    }
    setBook(prev => ({
      ...prev,
      stock: {
        ...prev.stock,
        locations: updatedLocations,
        current: calculateCurrentStock({
          ...prev.stock,
          locations: updatedLocations
        })
      }
    }));
  };

  const addNewLocation = () => {
    if (newLocation.location && newLocation.quantity > 0) {
      const updatedLocations = [...book.stock.locations, newLocation];
      setBook(prev => ({
        ...prev,
        stock: {
          ...prev.stock,
          locations: updatedLocations,
          current: calculateCurrentStock({
            ...prev.stock,
            locations: updatedLocations
          })
        }
      }));
      setNewLocation({
        location: '',
        quantity: 0
      });
    }
  };

  const removeLocation = (index: number) => {
    const updatedLocations = book.stock.locations.filter((_, i) => i !== index);
    setBook(prev => ({
      ...prev,
      stock: {
        ...prev.stock,
        locations: updatedLocations,
        current: calculateCurrentStock({
          ...prev.stock,
          locations: updatedLocations
        })
      }
    }));
  };

  const handleSave = async () => {
    try {
      const storedBooks = JSON.parse(localStorage.getItem('inventoryBooks') || '[]');
      
      const bookToSave = { ...book };
      
      if (id === 'new' || bookToSave.id === 0) {
        const maxId = storedBooks.length > 0 
          ? Math.max(...storedBooks.map((b: Book) => b.id)) 
          : 0;
        bookToSave.id = maxId + 1;
      }
      
      const existingBookIndex = storedBooks.findIndex((b: Book) => b.id === bookToSave.id);
      
      if (existingBookIndex >= 0) {
        storedBooks[existingBookIndex] = bookToSave;
      } else {
        storedBooks.push(bookToSave);
      }
      
      localStorage.setItem('inventoryBooks', JSON.stringify(storedBooks));
      
      setBook(bookToSave);
      
      setMessage({
        type: 'success',
        text: 'Libro guardado correctamente'
      });
      
      setTimeout(() => {
        setMessage(null);
        navigate('/inventory');
      }, 2000);
    } catch (error) {
      console.error('Error saving book:', error);
      setMessage({
        type: 'error',
        text: 'Error al guardar el libro'
      });
    }
  };

  return <div>
      <div className="flex items-center mb-6">
        <Link to="/inventory" className="mr-4 text-blue-600 hover:text-blue-800">
          <ArrowLeftIcon className="w-5 h-5" />
        </Link>
        <h2 className="text-2xl font-bold">
          {isEditMode ? (id === 'new' ? 'Crear Nuevo Libro' : 'Editar Libro') : 'Detalles del Libro'}
        </h2>
        <div className="ml-auto">
          {isEditMode && (
            <button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center">
              <SaveIcon className="w-5 h-5 mr-1" />
              <span>Guardar Cambios</span>
            </button>
          )}
        </div>
      </div>
      {message && <div className={`mb-4 p-4 rounded-lg ${message.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
          {message.text}
        </div>}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium">Información General</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Título
                </label>
                <input 
                  type="text" 
                  name="title" 
                  value={book.title} 
                  onChange={handleInputChange} 
                  className="w-full border border-gray-300 rounded-lg px-3 py-2" 
                  readOnly={!isEditMode}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  ISBN
                </label>
                <input 
                  type="text" 
                  name="isbn" 
                  value={book.isbn} 
                  onChange={handleInputChange} 
                  className="w-full border border-gray-300 rounded-lg px-3 py-2" 
                  readOnly={!isEditMode}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Autor
                </label>
                <input type="text" name="author" value={book.author} onChange={handleInputChange} className="w-full border border-gray-300 rounded-lg px-3 py-2" readOnly={!isEditMode} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Editorial
                </label>
                <input type="text" name="publisher" value={book.publisher} onChange={handleInputChange} className="w-full border border-gray-300 rounded-lg px-3 py-2" readOnly={!isEditMode} />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Año de publicación
                </label>
                <input type="number" name="publicationYear" value={book.publicationYear} onChange={handleInputChange} className="w-full border border-gray-300 rounded-lg px-3 py-2" readOnly={!isEditMode} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Precio de venta ($)
                </label>
                <input type="number" step="0.01" name="price" value={book.price} onChange={handleInputChange} className="w-full border border-gray-300 rounded-lg px-3 py-2" readOnly={!isEditMode} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Costo ($)
                </label>
                <input type="number" step="0.01" name="cost" value={book.cost} onChange={handleInputChange} className="w-full border border-gray-300 rounded-lg px-3 py-2" readOnly={!isEditMode} />
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Descripción
              </label>
              <textarea name="description" value={book.description} onChange={handleInputChange} rows={4} className="w-full border border-gray-300 rounded-lg px-3 py-2" readOnly={!isEditMode} />
            </div>
          </div>
        </div>
        <div>
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Control de Stock</h3>
              <span className="text-2xl font-bold">{book.stock.current}</span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Stock Total
                </label>
                <input type="number" value={book.stock.total} onChange={e => handleStockChange('total', parseInt(e.target.value))} className="w-full border border-gray-300 rounded-lg px-3 py-2" readOnly={!isEditMode} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Vendidos
                </label>
                <input type="number" value={book.stock.sold} onChange={e => handleStockChange('sold', parseInt(e.target.value))} className="w-full border border-gray-300 rounded-lg px-3 py-2" readOnly={!isEditMode} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Regalos
                </label>
                <input type="number" value={book.stock.gifts} onChange={e => handleStockChange('gifts', parseInt(e.target.value))} className="w-full border border-gray-300 rounded-lg px-3 py-2" readOnly={!isEditMode} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Invertidos
                </label>
                <input type="number" value={book.stock.invested} onChange={e => handleStockChange('invested', parseInt(e.target.value))} className="w-full border border-gray-300 rounded-lg px-3 py-2" readOnly={!isEditMode} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Stock Actual
                </label>
                <input type="number" value={book.stock.current} readOnly className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-gray-50" />
              </div>
            </div>
            <div className="flex justify-between text-sm text-gray-500 mb-2">
              <span>Stock total</span>
              <span>{book.stock.total} unidades</span>
            </div>
            <div className="flex justify-between text-sm text-gray-500 mb-2">
              <span>Valor del inventario</span>
              <span>${(book.stock.total * book.cost).toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-500">
              <span>Ubicaciones</span>
              <span>{book.stock.locations.length}</span>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium mb-4">Ubicaciones</h3>
            {book.stock.locations.map((loc, index) => <div key={index} className="flex items-center mb-3 border-b pb-3">
                <div className="flex-1">
                  <input type="text" value={loc.location} onChange={e => handleLocationChange(index, 'location', e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-1" placeholder="Ubicación" readOnly={!isEditMode} />
                </div>
                <div className="w-24 ml-2">
                  <input type="number" value={loc.quantity} onChange={e => handleLocationChange(index, 'quantity', e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-1" placeholder="Cantidad" readOnly={!isEditMode} />
                </div>
                <button onClick={() => removeLocation(index)} className="ml-2 text-red-500 hover:text-red-700" disabled={!isEditMode}>
                  ×
                </button>
              </div>)}
            <div className="flex items-center mt-4">
              <div className="flex-1">
                <input type="text" value={newLocation.location} onChange={e => setNewLocation({
                ...newLocation,
                location: e.target.value
              })} className="w-full border border-gray-300 rounded-lg px-3 py-2" placeholder="Nueva ubicación" readOnly={!isEditMode} />
              </div>
              <div className="w-24 ml-2">
                <input type="number" value={newLocation.quantity || ''} onChange={e => setNewLocation({
                ...newLocation,
                quantity: parseInt(e.target.value) || 0
              })} className="w-full border border-gray-300 rounded-lg px-3 py-2" placeholder="Cantidad" readOnly={!isEditMode} />
              </div>
              <button onClick={addNewLocation} className="ml-2 bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700" disabled={!isEditMode}>
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>;
};

export default BookDetail;