import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE = window.location.hostname === 'localhost' 
  ? 'http://localhost:8000/api' 
  : '/api';

export interface UserProfile {
  uid: string;
  name: string;
  avatar: string;
  family_name: string;
  role?: string;
  familyName?: string; // keeping both for compatibility
}

interface AuthContextType {
  currentUser: any | null;
  userProfile: UserProfile | null;
  loading: boolean;
  refreshProfile: () => Promise<void>;
  registerMember: (name: string, avatar: string, password?: string) => Promise<void>;
  switchMember: (uid: string) => Promise<void>;
  updateMember: (name: string, avatar: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  userProfile: null,
  loading: false,
  refreshProfile: async () => {},
  registerMember: async () => {},
  switchMember: async () => {},
  updateMember: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<any | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const initUser = async (forcedUid?: string) => {
    const savedUid = localStorage.getItem('currentUserUid');
    const mockUid = forcedUid || savedUid || 'guest-public_family';
    
    try {
      // 尝试获取名为访客的公共用户
      const response = await axios.get(`${API_BASE}/users/${mockUid}`);
      const profile = response.data;
      profile.familyName = profile.family_name; // alias
      setUserProfile(profile);
      setCurrentUser({ uid: mockUid });
      localStorage.setItem('currentUserUid', mockUid);
    } catch (error: any) {
      if (error.response?.status === 404) {
        // 如果不存在则自动创建
        try {
          const newProfile = {
            uid: mockUid,
            name: '访客',
            avatar: 'https://api.dicebear.com/7.x/micah/svg?seed=Guest&backgroundColor=ffdfbf&mouth=smile',
            family_name: '公共家庭',
            role: 'member'
          };
          const createResp = await axios.post(`${API_BASE}/users/`, newProfile);
          const profile = createResp.data;
          profile.familyName = profile.family_name;
          setUserProfile(profile);
          setCurrentUser({ uid: mockUid });
          localStorage.setItem('currentUserUid', mockUid);
        } catch (createErr) {
          console.error("Failed to create default user profile", createErr);
        }
      } else {
        console.error("Error fetching user profile", error);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    initUser();
  }, []);

  const refreshProfile = async () => {
    setLoading(true);
    await initUser();
  };

  const registerMember = async (name: string, avatar: string, password?: string) => {
    if (password && password !== '202603') {
      throw new Error("密码错误，无法添加家庭成员");
    }
    const uid = `${name}-public_family`;
    const newProfile = {
      uid: uid,
      name: name,
      avatar: avatar,
      family_name: '公共家庭',
      role: 'member'
    };
    try {
      await axios.post(`${API_BASE}/users/`, newProfile);
      // Wait for it to succeed and switch to new profile implicitly or just trigger refresh
      // If we want the app to switch user as current logged in user:
      const resp = await axios.get(`${API_BASE}/users/${uid}`);
      const profile = resp.data;
      profile.familyName = profile.family_name;
      setUserProfile(profile);
      setCurrentUser({ uid });
      localStorage.setItem('currentUserUid', uid);
    } catch (e) {
      throw new Error("添加失败，请重试");
    }
  };

  const switchMember = async (uid: string) => {
    setLoading(true);
    try {
      await initUser(uid);
    } finally {
      setLoading(false);
    }
  };

  const updateMember = async (name: string, avatar: string) => {
    if (!currentUser?.uid || !userProfile) return;
    
    // update the current user profile (keep same UID so we don't lose order history)
    const updatedProfile = {
      ...userProfile,
      name: name,
      avatar: avatar,
      family_name: userProfile.familyName || '公共家庭'
    };
    
    try {
      const resp = await axios.post(`${API_BASE}/users/`, updatedProfile);
      const profile = resp.data;
      profile.familyName = profile.family_name;
      setUserProfile(profile);
    } catch (e) {
      throw new Error("更新失败，请重试");
    }
  };

  return (
    <AuthContext.Provider value={{ currentUser, userProfile, loading, refreshProfile, registerMember, switchMember, updateMember }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
