import React, { useState } from 'react';
import { PlusIcon, TrashIcon, SaveIcon } from 'lucide-react';
interface Category {
  id: number;
  name: string;
  type: 'income' | 'expense';
  budget?: number;
}
const CategoryManager: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([{
    id: 1,
    name: 'Ventas',
    type: 'income',
    budget: 10000
  }, {
    id: 2,
    name: 'Producción',
    type: 'expense',
    budget: 5000
  }, {
    id: 3,
    name: 'Marketing',
    type: 'expense',
    budget: 2000
  }, {
    id: 4,
    name: 'Royalties',
    type: 'expense',
    budget: 3000
  }]);
  const [newCategory, setNewCategory] = useState<Omit<Category, 'id'>>({
    name: '',
    type: 'expense',
    budget: 0
  });
  const handleAddCategory = () => {
    if (newCategory.name) {
      setCategories(prev => [...prev, {
        ...newCategory,
        id: Math.max(...categories.map(c => c.id)) + 1
      }]);
      setNewCategory({
        name: '',
        type: 'expense',
        budget: 0
      });
    }
  };
  const handleDeleteCategory = (id: number) => {
    if (window.confirm('¿Está seguro de que desea eliminar esta categoría?')) {
      setCategories(prev => prev.filter(category => category.id !== id));
    }
  };
  const handleUpdateCategory = (id: number, field: keyof Category, value: string | number) => {
    setCategories(prev => prev.map(category => {
      if (category.id === id) {
        return {
          ...category,
          [field]: value
        };
      }
      return category;
    }));
  };
  return <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold">Gestión de Categorías</h3>
        <button onClick={handleAddCategory} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center">
          <SaveIcon className="w-5 h-5 mr-2" />
          Guardar Cambios
        </button>
      </div>
      <div className="space-y-4">
        {categories.map(category => <div key={category.id} className="flex items-center gap-4 p-4 border rounded-lg">
            <input type="text" value={category.name} onChange={e => handleUpdateCategory(category.id, 'name', e.target.value)} className="flex-1 border rounded-lg px-3 py-2" />
            <select value={category.type} onChange={e => handleUpdateCategory(category.id, 'type', e.target.value as 'income' | 'expense')} className="border rounded-lg px-3 py-2">
              <option value="income">Ingreso</option>
              <option value="expense">Gasto</option>
            </select>
            <input type="number" value={category.budget} onChange={e => handleUpdateCategory(category.id, 'budget', parseFloat(e.target.value))} className="w-32 border rounded-lg px-3 py-2" placeholder="Presupuesto" />
            <button onClick={() => handleDeleteCategory(category.id)} className="text-red-600 hover:text-red-800">
              <TrashIcon className="w-5 h-5" />
            </button>
          </div>)}
        <div className="flex items-center gap-4 p-4 border rounded-lg border-dashed">
          <input type="text" value={newCategory.name} onChange={e => setNewCategory(prev => ({
          ...prev,
          name: e.target.value
        }))} className="flex-1 border rounded-lg px-3 py-2" placeholder="Nueva categoría" />
          <select value={newCategory.type} onChange={e => setNewCategory(prev => ({
          ...prev,
          type: e.target.value as 'income' | 'expense'
        }))} className="border rounded-lg px-3 py-2">
            <option value="income">Ingreso</option>
            <option value="expense">Gasto</option>
          </select>
          <input type="number" value={newCategory.budget || ''} onChange={e => setNewCategory(prev => ({
          ...prev,
          budget: parseFloat(e.target.value)
        }))} className="w-32 border rounded-lg px-3 py-2" placeholder="Presupuesto" />
          <button onClick={handleAddCategory} className="text-blue-600 hover:text-blue-800">
            <PlusIcon className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>;
};
export default CategoryManager;