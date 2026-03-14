import { useState, useMemo, useEffect } from 'react';
import { Calendar, Bell, Lightbulb, Clock, Play, CheckCircle, UtensilsCrossed, Home as HomeIcon, List as ListIcon, Plus, Book, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useAppContext, Order } from '../context/AppContext';
import { getOptimizedImageUrl } from '../utils/imageUtils';

export default function OrderSummary() {
  const { userProfile } = useAuth();
  const { orders, updateOrderStatus } = useAppContext();
  const [activeTab, setActiveTab] = useState<'待制作' | '制作中' | '已完成'>('待制作');
  const [currentDateString, setCurrentDateString] = useState(new Date().toDateString());

  useEffect(() => {
    const timer = setInterval(() => {
      const newDateString = new Date().toDateString();
      if (newDateString !== currentDateString) {
        setCurrentDateString(newDateString);
      }
    }, 60000); // Check every minute
    return () => clearInterval(timer);
  }, [currentDateString]);

  // Format date helper
  const formatDate = (dateString?: string) => {
    if (!dateString) return '今天';
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return '今天';
    if (date.toDateString() === currentDateString) return '今天';
    return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
  };

  const familyOrders = orders || [];
  const toMakeOrders = familyOrders.filter(o => o.status === '待制作');
  const makingOrders = familyOrders.filter(o => o.status === '制作中');
  const completedOrders = familyOrders.filter(o => o.status === '已完成');

  const displayedOrders = activeTab === '待制作' ? toMakeOrders 
                        : activeTab === '制作中' ? makingOrders 
                        : completedOrders;

  // Group by date
  const groupedOrders = useMemo(() => {
    const groups: { [key: string]: Order[] } = {};
    displayedOrders.forEach(order => {
      // @ts-ignore - assuming created_at comes from backend, fallback to today
      const dateKey = formatDate(order.created_at);
      if (!groups[dateKey]) groups[dateKey] = [];
      groups[dateKey].push(order);
    });
    return groups;
  }, [displayedOrders, currentDateString]);

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 overflow-x-hidden pb-24">
      <header className="flex items-center justify-between border-b border-cream-soft dark:border-slate-800 px-6 py-4 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="text-primary">
            <UtensilsCrossed size={28} />
          </div>
          <div>
            <h2 className="text-lg font-bold leading-tight tracking-tight">点单汇总</h2>
            <p className="text-warm-gray dark:text-slate-400 text-xs">温馨厨房 · 厨神模式</p>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-6">
        <section className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm border border-cream-soft dark:border-slate-700 flex flex-col items-center">
            <span className="text-warm-gray dark:text-slate-400 text-xs mb-1">待制作</span>
            <span className="text-2xl font-bold">{toMakeOrders.length}</span>
          </div>
          <div className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm border border-cream-soft dark:border-slate-700 flex flex-col items-center">
            <span className="text-warm-gray dark:text-slate-400 text-xs mb-1">制作中</span>
            <span className="text-2xl font-bold text-primary">{makingOrders.length}</span>
          </div>
          <div className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm border border-cream-soft dark:border-slate-700 flex flex-col items-center">
            <span className="text-warm-gray dark:text-slate-400 text-xs mb-1">已完成</span>
            <span className="text-2xl font-bold text-slate-400">{completedOrders.length}</span>
          </div>
        </section>

        <div className="flex border-b border-cream-soft dark:border-slate-700 mb-6 sticky top-[73px] bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-sm z-40">
          <button 
            onClick={() => setActiveTab('待制作')}
            className={`flex-1 py-3 text-sm transition-all ${activeTab === '待制作' ? 'font-bold border-b-2 border-primary text-primary' : 'font-medium text-warm-gray dark:text-slate-400 hover:text-primary'}`}
          >待制作</button>
          <button 
            onClick={() => setActiveTab('制作中')}
            className={`flex-1 py-3 text-sm transition-all ${activeTab === '制作中' ? 'font-bold border-b-2 border-primary text-primary' : 'font-medium text-warm-gray dark:text-slate-400 hover:text-primary'}`}
          >制作中</button>
          <button 
            onClick={() => setActiveTab('已完成')}
            className={`flex-1 py-3 text-sm transition-all ${activeTab === '已完成' ? 'font-bold border-b-2 border-primary text-primary' : 'font-medium text-warm-gray dark:text-slate-400 hover:text-primary'}`}
          >已完成</button>
        </div>

        {activeTab === '待制作' && toMakeOrders.length > 0 && (
          <div className="mb-8 p-5 rounded-2xl bg-primary/5 border border-primary/10">
            <div className="flex items-center gap-2 mb-3">
              <Lightbulb className="text-primary" size={20} />
              <h3 className="font-bold text-primary">备菜建议</h3>
            </div>
            <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              <li className="flex items-start gap-2">
                <span className="size-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                <span>建议优先处理具有相同食材的菜品，提高效率。</span>
              </li>
            </ul>
          </div>
        )}

        <div className="space-y-8">
          {Object.entries(groupedOrders).map(([date, _dateOrders]) => {
            const dateOrders = _dateOrders as Order[];
            return (
            <div key={date} className="space-y-4">
              <h4 className="font-bold px-1 mb-2 text-primary border-b border-primary/20 pb-2">{date}点单 ({dateOrders.length})</h4>
              
              {dateOrders.map((order) => (
                <div key={order.id} className="group flex flex-col md:flex-row gap-4 p-4 rounded-2xl bg-white dark:bg-slate-800 shadow-sm border border-cream-soft dark:border-slate-700 hover:shadow-md transition-shadow">
                  <div className="relative h-40 md:h-32 md:w-44 shrink-0 overflow-hidden rounded-xl bg-cream-soft/50 dark:bg-slate-700/50 flex items-center justify-center">
                    {order.dish_image ? (
                      <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src={getOptimizedImageUrl(order.dish_image)} alt={order.dish_name} />
                    ) : (
                      <UtensilsCrossed size={48} className="text-warm-gray/30 dark:text-slate-500/30" />
                    )}
                    <div className="absolute top-2 left-2 px-2 py-1 bg-black/50 backdrop-blur-md rounded text-[10px] text-white uppercase tracking-wider">{order.ordered_by}的点单</div>
                  </div>
                  <div className="flex flex-col flex-1 justify-between py-1">
                    <div>
                      <div className="flex justify-between items-start">
                        <h5 className="text-lg font-bold">{order.dish_name}</h5>
                        {order.tags && order.tags.length > 0 && (
                          <span className="px-2 py-0.5 rounded text-xs font-bold bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400">{order.tags[0]}</span>
                        )}
                      </div>
                      {order.notes && (
                        <p className="text-warm-gray dark:text-slate-400 text-sm mt-1 leading-relaxed italic">“{order.notes}”</p>
                      )}
                    </div>
                    <div className="flex items-center justify-between mt-4">
                      <div className="text-xs text-warm-gray dark:text-slate-400 flex items-center gap-1">
                        <Clock size={12} /> {order.time}下单
                      </div>
                      <div className="flex gap-2">
                        {order.status === '待制作' && (
                          <button 
                            onClick={() => updateOrderStatus(order.id, '制作中')}
                            className="flex items-center gap-1 px-4 py-1.5 bg-primary text-white text-sm font-bold rounded-full hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
                          >
                            <Play size={14} fill="currentColor" /> 开始制作
                          </button>
                        )}
                        {order.status === '制作中' && (
                          <button 
                            onClick={() => updateOrderStatus(order.id, '已完成')}
                            className="flex items-center gap-1 px-4 py-1.5 bg-emerald-500 text-white text-sm font-bold rounded-full hover:bg-emerald-600 transition-colors shadow-lg shadow-emerald-500/20"
                          >
                            <CheckCircle size={14} /> 制作完成
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            );
          })}

          {displayedOrders.length === 0 && (
            <div className="text-center py-10 text-slate-500">
              <p>这里空空如也~</p>
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
          <Link to="/orders" className="flex flex-1 flex-col items-center justify-center gap-1 text-primary">
            <div className="flex h-8 items-center justify-center"><ListIcon size={24} /></div>
            <p className="text-xs font-bold leading-normal tracking-[0.015em]">汇总</p>
          </Link>
          <Link to="/library" className="flex flex-1 flex-col items-center justify-center gap-1 text-slate-500 dark:text-slate-400 hover:text-primary transition-colors">
            <div className="flex h-8 items-center justify-center"><Book size={24} /></div>
            <p className="text-xs font-medium leading-normal tracking-[0.015em]">食谱</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
