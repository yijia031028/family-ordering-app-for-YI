import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

const API_BASE = window.location.hostname === 'localhost' 
  ? 'http://localhost:8000/api' 
  : '/api';

export interface Order {
  id: string;
  dish_id: string;
  dish_name: string;
  dish_image: string;
  ordered_by: string;
  tags: string[];
  notes: string;
  time: string;
  status: '待制作' | '制作中' | '已完成';
}

interface AppContextType {
  orders: Order[];
  addOrder: (order: Omit<Order, 'id' | 'time' | 'status'>) => void;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  favorites: string[];
  toggleFavorite: (dishId: string) => void;
  loading: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { userProfile } = useAuth();

  useEffect(() => {
    fetchOrders();
    if (userProfile?.uid) {
      fetchFavorites(userProfile.uid);
    }
  }, [userProfile]);

  const fetchOrders = async () => {
    try {
      const response = await axios.get(`${API_BASE}/orders`);
      setOrders(response.data);
    } catch (error) {
      console.error('Failed to fetch orders', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchFavorites = async (uid: string) => {
    try {
      const response = await axios.get(`${API_BASE}/favorites/${uid}`);
      setFavorites(response.data.map((fav: any) => fav.dish_id));
    } catch (error) {
      console.error('Failed to fetch favorites', error);
    }
  };

  const addOrder = async (order: Omit<Order, 'id' | 'time' | 'status'>) => {
    try {
      const response = await axios.post(`${API_BASE}/orders/`, order);
      setOrders(prev => [response.data, ...prev]);
    } catch (error) {
      console.error('Failed to create order', error);
    }
  };

  const updateOrderStatus = async (orderId: string, status: Order['status']) => {
    try {
      await axios.patch(`${API_BASE}/orders/${orderId}/status`, { status });
      setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status } : o));
    } catch (error) {
      console.error('Failed to update order status', error);
    }
  };

  const toggleFavorite = async (dishId: string) => {
    if (!userProfile?.uid) return;

    try {
      const isFavorite = favorites.includes(dishId);
      if (isFavorite) {
        await axios.delete(`${API_BASE}/favorites/${userProfile.uid}/${dishId}`);
        setFavorites(prev => prev.filter(id => id !== dishId));
      } else {
        await axios.post(`${API_BASE}/favorites/`, {
          user_id: userProfile.uid,
          dish_id: dishId
        });
        setFavorites(prev => [...prev, dishId]);
      }
    } catch (error) {
      console.error('Failed to toggle favorite', error);
    }
  };

  return (
    <AppContext.Provider value={{ orders, addOrder, updateOrderStatus, favorites, toggleFavorite, loading }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppContext must be used within AppProvider');
  return context;
};
