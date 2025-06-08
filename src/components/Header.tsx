import React from 'react';
import { ShoppingCart, Search, User, Menu, LogOut } from 'lucide-react';
import { CartItem, User as UserType } from '../types';

interface HeaderProps {
  cartItems: CartItem[];
  searchTerm: string;
  onSearchChange: (term: string) => void;
  onCartClick: () => void;
  onLogoClick: () => void;
  onMenuClick: () => void;
  user: UserType | null;
  onUserClick: () => void;
  onLogout: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartItems,
  searchTerm,
  onSearchChange,
  onCartClick,
  onLogoClick,
  onMenuClick,
  user,
  onUserClick,
  onLogout
}) => {
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left Menu and Logo */}
          <div className="flex items-center">
            <button
              onClick={onMenuClick}
              className="p-2 mr-2 text-gray-600 hover:text-blue-600 transition-colors"
            >
              <Menu className="h-6 w-6" />
            </button>
            <div
              className="flex items-center cursor-pointer group"
              onClick={onLogoClick}
            >
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform">
                <span className="text-white font-bold text-lg">БТ</span>
              </div>
              <div className="ml-3">
                <h1 className="text-xl font-bold text-gray-900">БытТехника</h1>
                <p className="text-xs text-gray-500">Магазин бытовых товаров</p>
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl mx-8">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Поиск товаров..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center space-x-4">
            {user ? (
              <div className="relative group">
                <button 
                  onClick={onUserClick}
                  className="flex items-center space-x-2 p-2 text-gray-600 hover:text-blue-600 transition-colors"
                >
                  <User className="h-6 w-6" />
                  <span className="hidden sm:block font-medium">{user.name}</span>
                </button>
                
                {/* Dropdown menu */}
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <div className="py-2">
                    <button
                      onClick={onUserClick}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2"
                    >
                      <User className="h-4 w-4" />
                      <span>Профиль</span>
                    </button>
                    <button
                      onClick={onLogout}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center space-x-2"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Выйти</span>
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <button 
                onClick={onUserClick}
                className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
              >
                <User className="h-6 w-6" />
              </button>
            )}
            
            <button 
              onClick={onCartClick}
              className="relative p-2 text-gray-600 hover:text-blue-600 transition-colors group"
            >
              <ShoppingCart className="h-6 w-6 group-hover:scale-110 transition-transform" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                  {totalItems}
                </span>
              )}
            </button>

          </div>
        </div>
      </div>
    </header>
  );
};
