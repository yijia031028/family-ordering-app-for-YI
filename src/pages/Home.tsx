import { Home as HomeIcon, BookOpen, ChevronRight, Heart, Image as ImageIcon, User, Edit2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth, UserProfile } from '../context/AuthContext';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { API_BASE } from '../config';

export default function Home() {
  const { userProfile, switchMember } = useAuth();
  const [familyMembers, setFamilyMembers] = useState<UserProfile[]>([]);

  useEffect(() => {
    if (!userProfile?.familyName) return;

    const fetchFamily = async () => {
      try {
        const response = await axios.get(`${API_BASE}/users/family/${userProfile.familyName}`);
        const members = response.data.map((m: any) => ({
          ...m,
          familyName: m.family_name
        }));
        
        // Sort so current user is first
        members.sort((a: UserProfile, b: UserProfile) => {
          if (a.uid === userProfile.uid) return -1;
          if (b.uid === userProfile.uid) return 1;
          return 0;
        });
        setFamilyMembers(members);
      } catch (error) {
        console.error("Failed to fetch family members", error);
      }
    };

    fetchFamily();
  }, [userProfile?.familyName, userProfile?.uid]);



  return (
    <div className="relative flex min-h-screen w-full max-w-md mx-auto flex-col bg-background-light dark:bg-background-dark overflow-x-hidden cream-texture shadow-2xl pb-24">
      {/* Top Nav */}
      <div className="flex items-center bg-transparent p-4 pb-2 justify-between">
        <Link to="/add-member" className="text-white flex size-10 items-center justify-center rounded-xl bg-primary hover:bg-primary/90 transition-colors shadow-sm">
          <User size={20} />
        </Link>
        <h2 className="text-slate-900 dark:text-slate-100 text-lg font-bold leading-tight tracking-tight flex-1 text-center pr-10">相聚此刻</h2>
      </div>

      {/* Hero */}
      <div className="px-4 py-4">
        <div 
          className="w-full bg-center bg-no-repeat bg-cover flex flex-col justify-end overflow-hidden rounded-xl aspect-[4/3] shadow-lg border-4 border-white dark:border-slate-800"
          style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAE3estRAGT85tKv4ksFcoC9fNS5u_4BJ6DK6B4hpKZBn4ptPp2ag2oiasAdlTM7dBdrXtSJkzL3vxa0DLxIfHC0UVPFJ3pK_GeORjdrJhytdzGFNfPkeUgAe11f2W05dVBwf1oMrWAeGkRCfPevmv1BC5kKWozmiofDVFR4yc3ks8zI4ipSqFhGimWPXy5EYhuwpeXlxqN8I9Rdn440CVQ-0ty_rdWxR5UTHBJphqAzf8QSw-s3T5VUjOnYm4vpkwZz2Xze2-I9xO9")' }}
        />
      </div>

      {/* Greeting */}
      <div className="px-6 py-4 text-center">
        <h1 className="text-slate-900 dark:text-slate-100 text-3xl font-bold leading-tight mb-2">欢迎回家</h1>
        <div className="w-12 h-1 bg-primary mx-auto mb-3 rounded-full" />
        <p className="text-slate-600 dark:text-slate-400 text-base font-medium">人间烟火气，最抚凡人心</p>
      </div>

      {/* Family Members */}
      <div className="px-6 py-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-slate-900 dark:text-slate-100 font-bold text-lg">{userProfile?.familyName} 的家庭成员</h3>
          <Link to="/add-member" className="text-primary text-sm font-medium hover:underline">共 {familyMembers.length} 位</Link>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {familyMembers.map((member, idx) => {
            const isMe = member.uid === userProfile?.uid;
            return (
              <div 
                key={idx} 
                className="flex flex-col items-center gap-2 group cursor-pointer relative"
                onClick={() => {
                  if (!isMe && switchMember) switchMember(member.uid);
                }}
              >
                <div className="relative">
                  <div className={`size-16 rounded-full border-2 p-1 transition-all ${isMe ? 'border-4 border-primary shadow-md' : 'border-primary/30 group-hover:border-primary'}`}>
                    <img className="size-full rounded-full object-cover" src={member.avatar} alt={member.name} />
                  </div>
                </div>
                <div className={`flex items-center gap-1 ${isMe ? 'text-primary font-bold' : 'text-slate-800 dark:text-slate-200 font-semibold'} text-sm`}>
                  <p>{member.name}</p>
                  {isMe && (
                    <Link to="/edit-member" className="p-1 rounded-full hover:bg-primary/10 text-primary transition-colors" onClick={(e) => e.stopPropagation()}>
                      <Edit2 size={14} />
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="px-6 py-4 mb-6 flex flex-col gap-3">
        <Link to="/orders" className="bg-primary/10 rounded-xl p-4 flex items-center justify-between border border-primary/20 hover:bg-primary/20 transition-colors">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-lg bg-primary flex items-center justify-center text-white">
              <BookOpen size={20} />
            </div>
            <div>
              <p className="text-slate-900 dark:text-slate-100 font-bold text-sm">今日已点菜品</p>
              <p className="text-slate-500 dark:text-slate-400 text-xs">查看所有已点的菜记录</p>
            </div>
          </div>
          <ChevronRight className="text-primary" size={24} />
        </Link>
        <Link to="/library" className="bg-emerald-500/10 rounded-xl p-4 flex items-center justify-between border border-emerald-500/20 hover:bg-emerald-500/20 transition-colors">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-lg bg-emerald-500 flex items-center justify-center text-white">
              <ImageIcon size={20} />
            </div>
            <div>
              <p className="text-slate-900 dark:text-slate-100 font-bold text-sm">家庭美馔库</p>
              <p className="text-slate-500 dark:text-slate-400 text-xs">查看所有可点的菜记录</p>
            </div>
          </div>
          <ChevronRight className="text-emerald-500" size={24} />
        </Link>
      </div>

      {/* Bottom Nav */}
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto z-50">
        <div className="flex gap-2 border-t border-primary/10 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md px-4 pb-6 pt-3">
          <Link to="/" className="flex flex-1 flex-col items-center justify-center gap-1 text-primary">
            <div className="flex h-8 items-center justify-center"><HomeIcon size={24} /></div>
            <p className="text-xs font-bold leading-normal tracking-[0.015em]">首页</p>
          </Link>
          <Link to="/orders" className="flex flex-1 flex-col items-center justify-center gap-1 text-slate-500 dark:text-slate-400 hover:text-primary transition-colors">
            <div className="flex h-8 items-center justify-center"><Heart size={24} /></div>
            <p className="text-xs font-medium leading-normal tracking-[0.015em]">时光</p>
          </Link>
          <Link to="/library" className="flex flex-1 flex-col items-center justify-center gap-1 text-slate-500 dark:text-slate-400 hover:text-primary transition-colors">
            <div className="flex h-8 items-center justify-center"><ImageIcon size={24} /></div>
            <p className="text-xs font-medium leading-normal tracking-[0.015em]">相册</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
