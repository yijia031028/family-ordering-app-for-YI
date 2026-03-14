import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  PlusCircle, 
  Utensils, 
  ChevronRight,
  LogOut
} from 'lucide-react';
import DishEntry from './pages/DishEntry';
import MemberManagement from './pages/MemberManagement';
import DishLibrary from './pages/DishLibrary';

const SidebarItem = ({ to, icon: Icon, label }: { to: string, icon: any, label: string }) => {
  const location = useLocation();
  const isActive = location.pathname === to || (to !== '/admin' && location.pathname.startsWith(to));
  
  return (
    <Link 
      to={to} 
      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
        isActive 
          ? 'bg-orange-500 text-white shadow-lg shadow-orange-200' 
          : 'text-slate-600 hover:bg-orange-50 hover:text-orange-600'
      }`}
    >
      <Icon size={20} />
      <span className="font-semibold">{label}</span>
      {isActive && <ChevronRight size={16} className="ml-auto" />}
    </Link>
  );
};

const Dashboard = () => (
  <div className="flex flex-col gap-6">
    <h1 className="text-3xl font-bold text-slate-800">欢迎回来，管理员</h1>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="card flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">
          <Utensils size={24} />
        </div>
        <div>
          <p className="text-sm text-slate-500 font-medium">总菜品数</p>
          <p className="text-2xl font-bold text-slate-800">--</p>
        </div>
      </div>
      <div className="card flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
          <Users size={24} />
        </div>
        <div>
          <p className="text-sm text-slate-500 font-medium">家庭成员</p>
          <p className="text-2xl font-bold text-slate-800">--</p>
        </div>
      </div>
    </div>
  </div>
);

function App() {
  return (
    <Router basename="/admin">
      <div className="flex min-h-screen bg-slate-50">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-slate-200 flex flex-col p-6 sticky top-0 h-screen">
          <div className="flex items-center gap-3 mb-10 px-2">
            <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center text-white">
              <Utensils size={24} />
            </div>
            <span className="text-xl font-bold text-slate-800 tracking-tight">后台管理</span>
          </div>
          
          <nav className="flex flex-col gap-2 flex-1">
            <SidebarItem to="/" icon={LayoutDashboard} label="仪表盘" />
            <SidebarItem to="/members" icon={Users} label="成员管理" />
            <SidebarItem to="/add-dish" icon={PlusCircle} label="录入新菜" />
            <SidebarItem to="/dishes" icon={Utensils} label="菜品库" />
          </nav>
          
          <button className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all mt-auto">
            <LogOut size={20} />
            <span className="font-semibold">退出登录</span>
          </button>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-10 overflow-auto">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/members" element={<MemberManagement />} />
            <Route path="/add-dish" element={<DishEntry />} />
            <Route path="/dishes" element={<DishLibrary />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
