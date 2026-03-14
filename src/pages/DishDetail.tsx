import { ArrowLeft, Share2, Utensils, SlidersHorizontal, FileEdit, List, ListPlus, Check } from 'lucide-react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { dishes } from '../data/dishes';
import { useAuth } from '../context/AuthContext';
import { useAppContext } from '../context/AppContext';

export default function DishDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { userProfile } = useAuth();
  const { addOrder } = useAppContext();
  const [isAdded, setIsAdded] = useState(false);
  const [notes, setNotes] = useState('');

  const dish = dishes.find(d => d.id === id) || dishes.find(d => d.id === 'gongbaojiding') || dishes[0];

  const handleAddToMenu = async () => {
    if (!userProfile) return;
    
    setIsAdded(true);
    
    try {
      await addOrder({
        dish_id: dish.id,
        dish_name: dish.name,
        dish_image: dish.image,
        ordered_by: userProfile.name,
        tags: dish.tags,
        notes: notes
      });
      
      setTimeout(() => {
        setIsAdded(false);
        navigate('/orders');
      }, 1000);
    } catch (error) {
      console.error("Error adding order: ", error);
      setIsAdded(false);
    }
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-background-light dark:bg-background-dark overflow-x-hidden pb-24 text-slate-900 dark:text-slate-100">
      <div className="flex items-center bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md sticky top-0 z-50 p-4 pb-2 justify-between border-b border-primary/10">
        <Link to="/library" className="flex size-12 shrink-0 items-center justify-center cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors">
          <ArrowLeft size={24} />
        </Link>
        <h2 className="text-lg font-bold leading-tight tracking-tight flex-1 text-center">菜品详情</h2>
        <button className="flex size-12 items-center justify-center rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
          <Share2 size={24} />
        </button>
      </div>

      <div className="px-4 py-3 max-w-3xl mx-auto w-full">
        <div 
          className="w-full bg-center bg-no-repeat bg-cover flex flex-col justify-end overflow-hidden rounded-xl min-h-80 shadow-lg"
          style={{ backgroundImage: `url("${dish.image}")` }}
        />
      </div>

      <div className="px-4 pt-5 pb-3 max-w-3xl mx-auto w-full">
        <h1 className="text-[32px] font-bold leading-tight">{dish.name}</h1>
        <div className="flex items-center gap-2 mt-2">
          <span className="bg-primary/10 text-primary px-2 py-1 rounded text-sm font-medium">{dish.category}</span>
          {dish.tags.map(tag => (
            <span key={tag} className="bg-primary/10 text-primary px-2 py-1 rounded text-sm font-medium">{tag}</span>
          ))}
        </div>
      </div>

      <div className="px-4 py-4 mt-2 bg-white dark:bg-slate-800/50 rounded-xl mx-4 border border-primary/5 max-w-3xl md:mx-auto w-[calc(100%-2rem)]">
        <div className="flex items-center gap-2 mb-2">
          <Utensils className="text-primary" size={20} />
          <h3 className="text-lg font-bold">厨师笔记</h3>
        </div>
        <p className="text-slate-600 dark:text-slate-300 text-base font-normal leading-relaxed">
          {dish.chefNote}
        </p>
      </div>

      <div className="px-4 py-6 max-w-3xl mx-auto w-full">
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
          <SlidersHorizontal className="text-primary" size={20} /> 口味定制
        </h3>
        <div className="grid grid-cols-2 gap-3">
          {['不吃葱', '不吃姜', '不吃蒜', '少盐'].map(opt => (
            <label key={opt} className="flex items-center p-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg cursor-pointer hover:border-primary/50 transition-colors">
              <input type="checkbox" className="w-5 h-5 text-primary border-slate-300 rounded focus:ring-primary accent-primary" />
              <span className="ml-3 text-slate-700 dark:text-slate-200">{opt}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="px-4 pb-6 max-w-3xl mx-auto w-full">
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
          <FileEdit className="text-primary" size={20} /> 家庭备注
        </h3>
        <textarea 
          className="w-full p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:border-primary focus:ring-1 focus:ring-primary min-h-[100px] text-slate-700 dark:text-slate-200 outline-none resize-y" 
          placeholder="例如：孩子吃不放辣椒，鸡丁切小块一点..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
      </div>

      <div className="px-4 pb-6 max-w-3xl mx-auto w-full">
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
          <List className="text-primary" size={20} /> 清单
        </h3>
        <div className="bg-white dark:bg-slate-800 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700">
          <div className="p-4 border-b border-slate-100 dark:border-slate-700">
            <p className="text-sm font-bold text-primary uppercase tracking-wider mb-2">主料</p>
            <div className="flex justify-between items-center py-1">
              <span className="text-slate-700 dark:text-slate-200">{dish.ingredients[0]?.name}</span>
              <span className="text-slate-500 dark:text-slate-400">{dish.ingredients[0]?.amount}</span>
            </div>
          </div>
          <div className="p-4">
            <p className="text-sm font-bold text-primary uppercase tracking-wider mb-2">配料</p>
            <div className="space-y-2">
              {dish.ingredients.slice(1).map(item => (
                <div key={item.name} className="flex justify-between items-center">
                  <span className="text-slate-700 dark:text-slate-200">{item.name}</span>
                  <span className="text-slate-500 dark:text-slate-400">{item.amount}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background-light/90 dark:bg-background-dark/90 backdrop-blur-lg border-t border-slate-200 dark:border-slate-800 z-50">
        <div className="max-w-3xl mx-auto">
          <button 
            onClick={handleAddToMenu}
            disabled={isAdded}
            className={`w-full font-bold py-4 rounded-xl shadow-lg flex items-center justify-center gap-2 transition-colors ${isAdded ? 'bg-green-500 text-white shadow-green-500/20' : 'bg-primary hover:bg-primary/90 text-white shadow-primary/20'}`}
          >
            {isAdded ? (
              <>
                <Check size={20} />
                已添加
              </>
            ) : (
              <>
                <ListPlus size={20} />
                保存并添加到菜单
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
