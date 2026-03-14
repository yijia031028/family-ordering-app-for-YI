import { Utensils, Search, User, ChevronDown, LayoutGrid, Home as HomeIcon, Plus, Heart, Settings, Image as ImageIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { dishes } from '../data/dishes';
import { useAppContext } from '../context/AppContext';
import { OptimizedBgImage } from '../components/OptimizedImage';

export default function RecipeLibrary() {
  const { favorites, toggleFavorite } = useAppContext();
  const [selectedCategory, setSelectedCategory] = useState(`全部 (${dishes.length})`);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFavorites, setShowFavorites] = useState(false);

  const categories = [`全部 (${dishes.length})`, '臻选肉食', '深海珍馐', '时令蔬鲜', '浓郁汤煲', '精选主食'];

  const displayCategories = selectedCategory === `全部 (${dishes.length})` 
    ? ['臻选肉食', '深海珍馐', '时令蔬鲜', '浓郁汤煲', '精选主食'] 
    : [selectedCategory];

  // Filter dishes based on search query and favorites toggle
  const getFilteredDishes = (category: string) => {
    let filtered = dishes.filter(d => d.category === category);
    
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(d => 
        d.name.toLowerCase().includes(query) || 
        d.tags.some(t => t.toLowerCase().includes(query))
      );
    }

    if (showFavorites) {
      filtered = filtered.filter(d => favorites.includes(d.id));
    }

    return filtered;
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 overflow-x-hidden">
      <header className="flex items-center justify-between whitespace-nowrap border-b border-primary/20 px-6 py-4 lg:px-20 bg-background-light/90 dark:bg-background-dark/90 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-4 text-primary">
            <Utensils size={28} />
            <h2 className="text-xl font-bold leading-tight tracking-[-0.015em]">家庭美馔库</h2>
          </div>

        </div>
        <div className="flex flex-1 justify-end gap-4 lg:gap-8 items-center">
          <div className="hidden sm:flex items-center bg-primary/10 rounded-xl h-10 px-4 w-64">
            <Search className="text-primary" size={20} />
            <input 
              className="bg-transparent border-none outline-none ml-2 w-full text-sm placeholder:text-primary/50" 
              placeholder="搜索菜谱..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Link to="/add-member" className="flex items-center justify-center rounded-xl h-10 w-10 bg-primary text-white hover:bg-primary/90 transition-colors">
            <User size={20} />
          </Link>
        </div>
      </header>

      {/* Mobile Search Bar */}
      <div className="sm:hidden px-4 pt-4">
        <div className="flex items-center bg-primary/10 rounded-xl h-10 px-4 w-full">
          <Search className="text-primary" size={20} />
          <input 
            className="bg-transparent border-none outline-none ml-2 w-full text-sm placeholder:text-primary/50" 
            placeholder="搜索菜谱..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <main className="flex flex-col flex-1 px-4 lg:px-20 py-8">
        <div className="flex flex-col gap-2 mb-8">
          <h1 className="text-3xl font-bold leading-tight">{showFavorites ? '我的收藏' : '尊享美馔'}</h1>
          <p className="text-primary font-medium text-lg">{showFavorites ? `共 ${favorites.length} 道收藏菜品` : `${dishes.length}道传世家常菜 · 典藏版`}</p>
        </div>

        <div className="flex gap-3 pb-6 overflow-x-auto custom-scrollbar whitespace-nowrap">
          {categories.map((cat, idx) => (
            <button 
              key={cat} 
              onClick={() => {
                setSelectedCategory(cat);
                setShowFavorites(false); // Reset favorites filter when changing category
              }}
              className={`flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-full px-6 transition-all ${selectedCategory === cat && !showFavorites ? 'bg-primary text-white font-bold' : 'bg-primary/10 border border-primary/20 hover:bg-primary/20 text-slate-900 dark:text-slate-100 font-medium'}`}
            >
              <span className="text-sm">{cat}</span>
              {idx !== 0 && <ChevronDown size={16} className="text-primary" />}
            </button>
          ))}
        </div>

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold tracking-tight">Gourmet Collection</h2>
          <div className="flex items-center gap-2 text-slate-500 text-sm">
            <LayoutGrid size={16} />
            <span>网格视图</span>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-4 lg:gap-6 pb-24">
          {displayCategories.map(category => {
            const categoryDishes = getFilteredDishes(category);
            if (categoryDishes.length === 0) return null;
            
            return (
              <div key={category} className="col-span-full contents">
                <div className="col-span-full border-l-4 border-primary pl-4 my-4">
                  <h3 className="font-bold text-lg">{category}</h3>
                </div>
                {categoryDishes.map((dish, idx) => (
                  <div key={idx} className="relative group rounded-xl overflow-hidden aspect-[3/4] shadow-lg">
                    <Link to={`/dish/${dish.id}`} className="block w-full h-full cursor-pointer">
                      <OptimizedBgImage
                        src={dish.image}
                        className="w-full h-full bg-cover bg-center"
                        overlayGradient="linear-gradient(to bottom, rgba(0,0,0,0) 60%, rgba(0,0,0,0.8) 100%)"
                      >
                        <div className="absolute bottom-4 left-4 right-4">
                          <p className="text-white text-base font-bold leading-tight group-hover:text-primary transition-colors">{dish.name}</p>
                        </div>
                      </OptimizedBgImage>
                    </Link>
                    <button 
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        toggleFavorite(dish.id);
                      }}
                      className="absolute top-3 right-3 p-2 rounded-full bg-black/20 backdrop-blur-sm hover:bg-black/40 transition-colors z-10"
                    >
                      <Heart size={18} className={favorites.includes(dish.id) ? "fill-red-500 text-red-500" : "text-white"} />
                    </button>
                  </div>
                ))}
              </div>
            );
          })}
          
          {/* Empty State */}
          {displayCategories.every(cat => getFilteredDishes(cat).length === 0) && (
            <div className="col-span-full py-12 flex flex-col items-center justify-center text-slate-500">
              <Search size={48} className="mb-4 opacity-20" />
              <p className="text-lg">没有找到符合条件的菜品</p>
            </div>
          )}
        </div>
      </main>

      {/* Bottom Nav */}
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto z-50">
        <div className="flex gap-2 border-t border-primary/10 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md px-4 pb-6 pt-3">
          <Link to="/" className="flex flex-1 flex-col items-center justify-center gap-1 text-slate-500 dark:text-slate-400 hover:text-primary transition-colors">
            <div className="flex h-8 items-center justify-center"><HomeIcon size={24} /></div>
            <p className="text-xs font-medium leading-normal tracking-[0.015em]">首页</p>
          </Link>
          <Link to="/orders" className="flex flex-1 flex-col items-center justify-center gap-1 text-slate-500 dark:text-slate-400 hover:text-primary transition-colors">
            <div className="flex h-8 items-center justify-center"><Heart size={24} /></div>
            <p className="text-xs font-medium leading-normal tracking-[0.015em]">时光</p>
          </Link>
          <Link to="/library" className="flex flex-1 flex-col items-center justify-center gap-1 text-primary">
            <div className="flex h-8 items-center justify-center"><ImageIcon size={24} /></div>
            <p className="text-xs font-bold leading-normal tracking-[0.015em]">相册</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
