import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AddMember from './pages/AddMember';
import EditMember from './pages/EditMember';
import DishDetail from './pages/DishDetail';
import OrderSummary from './pages/OrderSummary';
import RecipeLibrary from './pages/RecipeLibrary';
import { AppProvider } from './context/AppContext';
import { AuthProvider } from './context/AuthContext';

export default function App() {
  return (
    <AuthProvider>
      <AppProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add-member" element={<AddMember />} />
            <Route path="/edit-member" element={<EditMember />} />
            <Route path="/dish/:id" element={<DishDetail />} />
            <Route path="/orders" element={<OrderSummary />} />
            <Route path="/library" element={<RecipeLibrary />} />
          </Routes>
        </BrowserRouter>
      </AppProvider>
    </AuthProvider>
  );
}
