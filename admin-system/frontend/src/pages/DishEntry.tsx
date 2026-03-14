import React, { useState, useRef } from 'react';
import { Upload, X, Save, ChefHat, Tag, Info } from 'lucide-react';
import axios from 'axios';

const ADMIN_API = '/admin-api';

export default function DishEntry() {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('家常菜');
  const [chefNote, setChefNote] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [ingredients, setIngredients] = useState<{name: string, amount: string}[]>([{name: '', amount: ''}]);
  
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const compressImage = (file: File): Promise<Blob> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target?.result as string;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;
          
          // Max dimensions
          const MAX_WIDTH = 1200;
          const MAX_HEIGHT = 1200;
          
          if (width > height) {
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width;
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height;
              height = MAX_HEIGHT;
            }
          }
          
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx?.drawImage(img, 0, 0, width, height);
          
          canvas.toBlob((blob) => {
            resolve(blob || file);
          }, 'image/jpeg', 0.8);
        };
      };
    });
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Show original for instant preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);

      // Compress
      const compressedBlob = await compressImage(file);
      const compressedFile = new File([compressedBlob], file.name, {
        type: 'image/jpeg',
        lastModified: Date.now(),
      });
      setImage(compressedFile);
    }
  };

  const addIngredient = () => {
    setIngredients([...ingredients, { name: '', amount: '' }]);
  };

  const removeIngredient = (index: number) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const handleIngredientChange = (index: number, field: 'name' | 'amount', value: string) => {
    const newIngs = [...ingredients];
    newIngs[index][field] = value;
    setIngredients(newIngs);
  };

  const handleAddTag = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      if (!tags.includes(tagInput.trim())) {
        setTags([...tags, tagInput.trim()]);
      }
      setTagInput('');
      e.preventDefault();
    }
  };

  const removeTag = (tag: string) => {
    setTags(tags.filter(t => t !== tag));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !image) {
      setMessage({ type: 'error', text: '请填写菜名并上传图片' });
      return;
    }

    try {
      setSaving(true);
      setMessage({ type: '', text: '' });

      // 1. Upload to Supabase Storage via backend
      setUploading(true);
      const formData = new FormData();
      formData.append('file', image);
      
      const uploadResp = await axios.post(`${ADMIN_API}/upload`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      const imageUrl = uploadResp.data.url;
      setUploading(false);

      // 2. Save dish data
      await axios.post(`${ADMIN_API}/dishes`, {
        name,
        category,
        image: imageUrl,
        tags,
        chefNote,
        ingredients: ingredients.filter(i => i.name && i.amount)
      });

      setMessage({ type: 'success', text: '菜品录入成功！' });
      // Reset form
      setName('');
      setChefNote('');
      setTags([]);
      setIngredients([{name: '', amount: ''}]);
      setImage(null);
      setImagePreview('');
    } catch (err: any) {
      setMessage({ type: 'error', text: err.response?.data?.detail || '保存失败，请重试' });
    } finally {
      setSaving(false);
      setUploading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">录入新菜品</h1>
          <p className="text-slate-500 mt-1">上传菜品图片并完善详细信息</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Image Upload */}
        <div className="lg:col-span-1">
          <div className="card sticky top-10">
            <label className="block text-sm font-bold text-slate-700 mb-4">菜品大图</label>
            <div 
              onClick={() => fileInputRef.current?.click()}
              className={`aspect-square rounded-2xl border-2 border-dashed flex flex-col items-center justify-center cursor-pointer overflow-hidden transition-all ${
                imagePreview ? 'border-orange-500' : 'border-slate-300 hover:border-orange-400 bg-slate-50'
              }`}
            >
              {imagePreview ? (
                <img src={imagePreview} className="w-full h-full object-cover" alt="Preview" />
              ) : (
                <>
                  <Upload className="text-slate-400 mb-2" size={32} />
                  <span className="text-sm text-slate-500">点击上传图片</span>
                </>
              )}
            </div>
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleImageChange} 
              className="hidden" 
              accept="image/*" 
            />
            <p className="text-xs text-slate-400 mt-4 text-center">建议尺寸: 800x800px, 小于 2MB</p>
          </div>
        </div>

        {/* Right Column: Details */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          {message.text && (
            <div className={`p-4 rounded-xl font-medium ${message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
              {message.text}
            </div>
          )}

          <div className="card space-y-6">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">菜品名称</label>
              <input 
                type="text" 
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all"
                placeholder="例如：红烧牛腩" 
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">所属分类</label>
                <select 
                  value={category}
                  onChange={e => setCategory(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-orange-500 outline-none"
                >
                  <option>家常菜</option>
                  <option>硬菜</option>
                  <option>面食/主食</option>
                  <option>汤/粥</option>
                  <option>甜品/点心</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-1">
                  标签 <Tag size={14} className="text-slate-400" />
                </label>
                <div className="relative">
                  <input 
                    type="text" 
                    value={tagInput}
                    onChange={e => setTagInput(e.target.value)}
                    onKeyDown={handleAddTag}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-orange-500 outline-none"
                    placeholder="按回车添加" 
                  />
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {tags.map(tag => (
                    <span key={tag} className="px-2 py-1 bg-orange-100 text-orange-600 rounded-lg text-xs font-bold flex items-center gap-1">
                      {tag}
                      <X size={12} className="cursor-pointer" onClick={() => removeTag(tag)} />
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-1">
                配料清单 <Info size={14} className="text-slate-400" />
              </label>
              <div className="space-y-3">
                {ingredients.map((ing, idx) => (
                  <div key={idx} className="flex gap-3">
                    <input 
                      type="text" 
                      placeholder="配料名" 
                      value={ing.name}
                      onChange={e => handleIngredientChange(idx, 'name', e.target.value)}
                      className="flex-1 px-4 py-2 rounded-lg border border-slate-200 outline-none focus:border-orange-500"
                    />
                    <input 
                      type="text" 
                      placeholder="用量" 
                      value={ing.amount}
                      onChange={e => handleIngredientChange(idx, 'amount', e.target.value)}
                      className="w-32 px-4 py-2 rounded-lg border border-slate-200 outline-none focus:border-orange-500"
                    />
                    <button 
                      type="button"
                      onClick={() => removeIngredient(idx)}
                      className="p-2 text-slate-400 hover:text-red-500"
                    >
                      <X size={20} />
                    </button>
                  </div>
                ))}
                <button 
                  type="button"
                  onClick={addIngredient}
                  className="text-sm font-bold text-orange-500 hover:text-orange-600 flex items-center gap-1"
                >
                  + 添加配料
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-1">
                厨师笔记 <ChefHat size={14} className="text-slate-400" />
              </label>
              <textarea 
                rows={4}
                value={chefNote}
                onChange={e => setChefNote(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-orange-500 outline-none"
                placeholder="分享一些烹饪小窍门或注意事项..."
              ></textarea>
            </div>

            <button 
              type="submit" 
              disabled={saving || uploading}
              className="w-full btn-primary flex items-center justify-center gap-2 py-4 text-lg disabled:opacity-50"
            >
              <Save size={20} />
              {saving ? (uploading ? '正在上传图片...' : '正在保存...') : '保存菜品信息'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
