import React, { useState, useMemo, useEffect } from 'react';
import { Header } from './components/Header';
import { ProductGrid } from './components/ProductGrid';
import { ProductDetail } from './components/ProductDetail';
import { Cart } from './components/Cart';
import { Checkout } from './components/Checkout';
import { OrderSuccess } from './components/OrderSuccess';
import { Login } from './components/Login';
import { Register } from './components/Register';
import { Profile } from './components/Profile';
import { OrderHistory } from './components/OrderHistory';
import { CategoryFilter } from './components/CategoryFilter';
import { products, categories } from './data/products';
import { Product, CartItem, OrderData, ViewType, User, Order } from './types';
import { authUtils } from './utils/auth';

function App() {
  const [currentView, setCurrentView] = useState<ViewType>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Все товары');
  const [orderData, setOrderData] = useState<OrderData | null>(null);
  const [user, setUser] = useState<User | null>(null);

  // Load user on app start
  useEffect(() => {
    const currentUser = authUtils.getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
    }
  }, []);

  // Filter products based on search and category
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'Все товары' || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  const addToCart = (product: Product, quantity: number = 1) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.product.id === product.id);
      if (existingItem) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
  };

  const updateCartQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      setCartItems(prev => prev.filter(item => item.product.id !== productId));
    } else {
      setCartItems(prev =>
        prev.map(item =>
          item.product.id === productId
            ? { ...item, quantity }
            : item
        )
      );
    }
  };

  const removeFromCart = (productId: number) => {
    setCartItems(prev => prev.filter(item => item.product.id !== productId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setCurrentView('product');
  };

  const handleBackToHome = () => {
    setCurrentView('home');
    setSelectedProduct(null);
  };

  const handleCartClick = () => {
    setCurrentView('cart');
  };

  const handleCheckout = () => {
    if (!user) {
      setCurrentView('login');
      return;
    }
    setCurrentView('checkout');
  };

  const handleOrderComplete = (data: OrderData) => {
    if (user) {
      // Create order object
      const totalAmount = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
      const deliveryFee = totalAmount > 50000 ? 0 : 1000;
      const finalAmount = totalAmount + deliveryFee;

      const order: Order = {
        id: Date.now().toString(),
        userId: user.id,
        orderNumber: Math.random().toString(36).substr(2, 9).toUpperCase(),
        items: [...cartItems],
        totalAmount,
        deliveryFee,
        finalAmount,
        orderData: data,
        status: 'processing',
        createdAt: new Date().toISOString()
      };

      // Save order
      authUtils.saveOrder(order);
    }

    setOrderData(data);
    setCurrentView('success');
    clearCart();
  };

  const handleNewOrder = () => {
    setCurrentView('home');
    setOrderData(null);
  };

  const handleUserClick = () => {
    if (user) {
      setCurrentView('profile');
    } else {
      setCurrentView('login');
    }
  };

  const handleLogin = (loggedInUser: User) => {
    setUser(loggedInUser);
    setCurrentView('home');
  };

  const handleRegister = (registeredUser: User) => {
    setUser(registeredUser);
    setCurrentView('home');
  };

  const handleLogout = () => {
    authUtils.logout();
    setUser(null);
    setCurrentView('home');
    clearCart();
  };

  const handleUserUpdate = (updatedUser: User) => {
    setUser(updatedUser);
  };

  const handleViewOrders = () => {
    setCurrentView('orders');
  };

  const getUserOrders = (): Order[] => {
    if (!user) return [];
    return authUtils.getUserOrders(user.id).sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'product':
        return selectedProduct ? (
          <ProductDetail
            product={selectedProduct}
            onBack={handleBackToHome}
            onAddToCart={addToCart}
          />
        ) : null;
      
      case 'cart':
        return (
          <Cart
            items={cartItems}
            onUpdateQuantity={updateCartQuantity}
            onRemoveItem={removeFromCart}
            onBack={handleBackToHome}
            onCheckout={handleCheckout}
          />
        );
      
      case 'checkout':
        return (
          <Checkout
            items={cartItems}
            onBack={() => setCurrentView('cart')}
            onOrderComplete={handleOrderComplete}
          />
        );
      
      case 'success':
        return orderData ? (
          <OrderSuccess
            orderData={orderData}
            onNewOrder={handleNewOrder}
          />
        ) : null;

      case 'login':
        return (
          <Login
            onBack={handleBackToHome}
            onLogin={handleLogin}
            onSwitchToRegister={() => setCurrentView('register')}
          />
        );

      case 'register':
        return (
          <Register
            onBack={handleBackToHome}
            onRegister={handleRegister}
            onSwitchToLogin={() => setCurrentView('login')}
          />
        );

      case 'profile':
        return user ? (
          <Profile
            user={user}
            onBack={handleBackToHome}
            onUserUpdate={handleUserUpdate}
            onViewOrders={handleViewOrders}
            onLogout={handleLogout}
          />
        ) : null;

      case 'orders':
        return (
          <OrderHistory
            orders={getUserOrders()}
            onBack={() => setCurrentView('profile')}
          />
        );
      
      default:
        return (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Каталог товаров
              </h2>
              <p className="text-gray-600">
                Найдите идеальную бытовую технику для вашего дома
              </p>
            </div>
            
            <CategoryFilter
              categories={categories}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
            />
            
            <ProductGrid
              products={filteredProducts}
              onProductClick={handleProductClick}
              onAddToCart={addToCart}
            />
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        cartItems={cartItems}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onCartClick={handleCartClick}
        onLogoClick={handleBackToHome}
        user={user}
        onUserClick={handleUserClick}
        onLogout={handleLogout}
      />
      
      <main>
        {renderCurrentView()}
      </main>
      
      <footer className="bg-gray-900 text-white py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">БытТехника</h3>
              <p className="text-gray-400">
                Ваш надежный партнер в выборе качественной бытовой техники
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Категории</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Кухонная техника</li>
                <li>Уборка</li>
                <li>Крупная техника</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Поддержка</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Доставка</li>
                <li>Гарантия</li>
                <li>Возврат товара</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Контакты</h4>
              <ul className="space-y-2 text-gray-400">
                <li>+7 (800) 123-45-67</li>
                <li>info@byttekhnika.ru</li>
                <li>Москва, ул. Примерная, 123</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 БытТехника. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;