import React, { useEffect, useState } from 'react';
import { Users, Mail, Clock, ShieldCheck } from 'lucide-react';
import axios from 'axios';

const ADMIN_API = '/admin-api';

interface User {
  uid: string;
  name: string;
  avatar: string;
  familyName: string;
  role: string;
  created_at: string;
}

export default function MemberManagement() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const resp = await axios.get(`${ADMIN_API}/users`);
      setUsers(resp.data);
    } catch (err) {
      console.error("Failed to fetch users", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">家庭成员管理</h1>
          <p className="text-slate-500 mt-1">查看所有已注册的家庭成员及其活跃状态</p>
        </div>
      </div>

      <div className="card overflow-hidden !p-0">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-bottom border-slate-100">
              <th className="px-6 py-4 text-sm font-bold text-slate-600">成员信息</th>
              <th className="px-6 py-4 text-sm font-bold text-slate-600">所属家庭</th>
              <th className="px-6 py-4 text-sm font-bold text-slate-600">角色</th>
              <th className="px-6 py-4 text-sm font-bold text-slate-600">注册时间</th>
              <th className="px-6 py-4 text-sm font-bold text-slate-600">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {loading ? (
              [1, 2, 3].map(i => (
                <tr key={i} className="animate-pulse">
                  <td colSpan={5} className="px-6 py-8 h-10 bg-slate-50/50"></td>
                </tr>
              ))
            ) : users.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-10 text-center text-slate-400">暂无成员数据</td>
              </tr>
            ) : (
              users.map(user => (
                <tr key={user.uid} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden ring-2 ring-white">
                        <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <p className="font-bold text-slate-800">{user.name}</p>
                        <p className="text-xs text-slate-400 font-mono">{user.uid}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-xs font-bold">
                      {user.familyName}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1 text-sm text-slate-600">
                      <ShieldCheck size={14} className="text-green-500" />
                      {user.role === 'admin' ? '管理员' : '家庭成员'}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1 text-sm text-slate-500">
                      <Clock size={14} />
                      {new Date(user.created_at).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <button className="text-orange-500 font-bold text-sm hover:underline">编辑</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
