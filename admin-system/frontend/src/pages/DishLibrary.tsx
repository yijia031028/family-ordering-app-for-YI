import React, { useEffect, useState } from 'react';
import { Utensils, Search, Filter, Edit2, Trash2, Tag } from 'lucide-react';
import axios from 'axios';

const ADMIN_API = '/admin-api';

interface Dish {
  id: string;
  name: string;
  category: string;
  image: string;
  tags: string[];
  chefNote: string;
  created_at: string;
}

export default function DishLibrary() {
  const [dishes, setDishes] = useState<Dish[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchDishes();
  }, []);

  const fetchDishes = async () => {
    try {
      const resp = await axios.get(`${ADMIN_API}/dishes`);
      setDishes(resp.data);
    } catch (err) {
      console.error("Failed to fetch dishes", err);
    } finally {
      setLoading(false);
    }
  };

  const filteredDishes = dishes.filter(dish => 
    dish.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dish.category.includes(searchTerm)
  );

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">菜品库管理</h1>
          <p className="text-slate-500 mt-1">管理应用中显示的所有菜品信息</p>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="搜索菜名或分类..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 w-64 rounded-xl border border-slate-200 focus:ring-2 focus:ring-orange-500 outline-none transition-all"
          />
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map(i => (
            <div key={i} className="card h-64 animate-pulse bg-slate-100"></div>
          ))}
        </div>
      ) : filteredDishes.length === 0 ? (
        <div className="card text-center py-20">
          <Utensils size={48} className="text-slate-200 mx-auto mb-4" />
          <p className="text-slate-400">没有找到匹配的菜品</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDishes.map(dish => (
            <div key={dish.id} className="card group hover:shadow-xl hover:shadow-orange-100/50 transition-all overflow-hidden !p-0">
              <div className="aspect-video relative overflow-hidden">
                <img src={dish.image} alt={dish.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute top-2 right-2 flex gap-1">
                  <span className="px-2 py-1 bg-black/50 backdrop-blur-md text-white rounded-lg text-[10px] font-bold">
                    {dish.category}
                  </span>
                </div>
              </div>
              <div className="p-5">
                <h3 className="text-lg font-bold text-slate-800 mb-2">{dish.name}</h3>
                <div className="flex flex-wrap gap-1 mb-4">
                  {dish.tags.map(tag => (
                    <span key={tag} className="flex items-center gap-1 px-2 py-0.5 bg-slate-100 text-slate-500 rounded text-[10px] font-medium">
                      <Tag size={10} />
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                  <span className="text-xs text-slate-400">
                    录入于 {new Date(dish.created_at).toLocaleDateString()}
                  </span>
                  <div className="flex gap-3">
                    <button className="p-2 text-slate-400 hover:text-orange-500 transition-colors">
                      <Edit2 size={16} />
                    </button>
                    <button className="p-2 text-slate-400 hover:text-red-500 transition-colors">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
