import { useState } from 'react';
import { ArrowLeft, UserPlus, CheckCircle2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AVATARS = [
  'https://api.dicebear.com/7.x/micah/svg?seed=Dad&mouth=smile,laughing&hair=mrClean&backgroundColor=ffdfbf',
  'https://api.dicebear.com/7.x/micah/svg?seed=Mom&mouth=smile,laughing&hair=full&backgroundColor=ffd1d1',
  'https://api.dicebear.com/7.x/micah/svg?seed=Boy&mouth=smile,laughing&hair=fonze&backgroundColor=c0aede',
  'https://api.dicebear.com/7.x/micah/svg?seed=Girl&mouth=smile,laughing&hair=pixie&backgroundColor=b6e3f4',
  'https://api.dicebear.com/7.x/micah/svg?seed=Grandma&mouth=smile,laughing&hair=dannyPhantom&backgroundColor=d1d4f9',
  'https://api.dicebear.com/7.x/micah/svg?seed=Grandpa&mouth=smile,laughing&hair=dougFunny&backgroundColor=bbf7d0',
  'https://api.dicebear.com/7.x/micah/svg?seed=Uncle&mouth=smile,laughing&hair=full&backgroundColor=fef08a',
  'https://api.dicebear.com/7.x/micah/svg?seed=Aunt&mouth=smile,laughing&hair=full&backgroundColor=fbcfe8',
  'https://api.dicebear.com/7.x/micah/svg?seed=Cousin&mouth=smile,laughing&hair=fonze&backgroundColor=99f6e4',
  'https://api.dicebear.com/7.x/micah/svg?seed=Friend&mouth=smile,laughing&hair=pixie&backgroundColor=fed7aa',
  'https://api.dicebear.com/7.x/micah/svg?seed=Neighbor&mouth=smile,laughing&hair=dannyPhantom&backgroundColor=e2e8f0',
  'https://api.dicebear.com/7.x/micah/svg?seed=Colleague&mouth=smile,laughing&hair=dougFunny&backgroundColor=a7f3d0',
];

export default function AddMember() {
  const { registerMember } = useAuth();
  const navigate = useNavigate();
  
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState(AVATARS[0]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAddMember = async () => {
    if (!name.trim()) {
      setError('请输入成员称呼');
      return;
    }
    if (password !== '202603') {
      setError('家庭密码错误');
      return;
    }

    try {
      setLoading(true);
      setError('');
      await registerMember(name.trim(), selectedAvatar, password);
      navigate('/');
    } catch (err: any) {
      setError(err.message || '添加失败');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto min-h-screen flex flex-col bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100">
      <nav className="flex items-center justify-between p-4 sticky top-0 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md z-10">
        <Link to="/" className="w-10 h-10 flex items-center justify-center rounded-full bg-white dark:bg-slate-800 shadow-sm border border-primary/10 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
          <ArrowLeft className="text-primary" size={20} />
        </Link>
        <h1 className="text-lg font-bold">添加新成员</h1>
        <div className="w-10" />
      </nav>

      <main className="flex-1 px-6 py-4 flex flex-col gap-8">
        <div className="flex flex-col items-center gap-4">
          <div className="text-center mb-2">
            <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">选择头像</h2>
            <p className="text-sm text-primary/70">精选了12个可爱的形象</p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4">
            {AVATARS.map((avatar, idx) => (
              <div 
                key={idx}
                onClick={() => setSelectedAvatar(avatar)}
                className={`relative w-16 h-16 md:w-18 md:h-18 rounded-full border-4 shadow-md cursor-pointer transition-all ${selectedAvatar === avatar ? 'border-primary ring-2 ring-primary/30 scale-105' : 'border-white dark:border-slate-800 opacity-70 hover:opacity-100 bg-primary/5'}`}
              >
                <img src={avatar} alt={`Avatar ${idx}`} className="w-full h-full rounded-full object-cover" />
                {selectedAvatar === avatar && (
                  <div className="absolute -bottom-1 -right-1 bg-white rounded-full">
                    <CheckCircle2 className="text-primary" size={20} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-6">
          {error && <p className="text-red-500 text-sm font-bold text-center bg-red-50 p-2 rounded-lg">{error}</p>}
          
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">成员称呼</label>
            <input 
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full h-14 bg-white dark:bg-slate-800 border-none rounded-xl px-5 text-base shadow-sm ring-1 ring-primary/10 focus:ring-2 focus:ring-primary transition-all duration-200 outline-none" 
              placeholder="例如：爸爸、妈妈、小明" 
              type="text" 
            />
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center px-1">
              <label className="text-sm font-bold text-slate-700 dark:text-slate-300">家庭密码</label>
              <span className="text-xs text-primary/60 font-medium">必填</span>
            </div>
            <div className="relative flex items-center">
              <input 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-14 bg-white dark:bg-slate-800 border-none rounded-xl px-5 pr-12 text-base shadow-sm ring-1 ring-primary/10 focus:ring-2 focus:ring-primary transition-all duration-200 outline-none" 
                placeholder="请输入6位密码" 
                type="password" 
              />
            </div>
            <p className="text-[12px] text-slate-500 dark:text-slate-400 mt-1 px-1 leading-relaxed">
              输入正确的家庭密码方可加入家庭。
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">快捷预设名字</label>
          <div className="flex flex-wrap gap-2">
            {['爸爸', '妈妈', '爷爷', '奶奶', '宝贝'].map(tag => (
              <span key={tag} onClick={() => setName(tag)} className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium border border-primary/20 cursor-pointer hover:bg-primary hover:text-white transition-all">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </main>

      <footer className="p-6 pb-10">
        <button 
          onClick={handleAddMember}
          disabled={loading}
          className="w-full h-14 bg-primary text-white font-bold text-lg rounded-xl shadow-lg shadow-primary/30 hover:shadow-primary/40 active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
        >
          <UserPlus size={20} />
          {loading ? '正在添加...' : '确认添加'}
        </button>
      </footer>
    </div>
  );
}
