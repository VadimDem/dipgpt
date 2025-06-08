import React from 'react';
import { ShoppingCart, Star, Zap } from 'lucide-react';
import { Product } from '../types';

interface ProductGridProps {
  products: Product[];
  onProductClick: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  onProductClick,
  onAddToCart
}) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      minimumFractionDigits: 0
    }).format(price);
  };

  if (products.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-gray-400 mb-4">
          <Zap className="h-16 w-16 mx-auto" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          Товары не найдены
        </h3>
        <p className="text-gray-600">
          Попробуйте изменить параметры поиска или выбрать другую категорию
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <div
          key={product.id}
          className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group cursor-pointer border border-gray-100"
        >
          <div 
            className="relative overflow-hidden"
            onClick={() => onProductClick(product)}
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
            />
            {product.originalPrice && (
              <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                -{Math.round((1 - product.price / product.originalPrice) * 100)}%
              </div>
            )}
            {!product.inStock && (
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <span className="bg-white text-gray-900 px-3 py-1 rounded-full text-sm font-semibold">
                  Нет в наличии
                </span>
              </div>
            )}
          </div>
          
          <div className="p-4">
            <div className="mb-2">
              <span className="text-xs text-blue-600 font-medium bg-blue-50 px-2 py-1 rounded-full">
                {product.category}
              </span>
            </div>
            
            <h3 
              className="font-semibold text-gray-900 mb-2 line-clamp-2 hover:text-blue-600 transition-colors cursor-pointer"
              onClick={() => onProductClick(product)}
            >
              {product.name}
            </h3>
            
            <div className="flex items-center mb-3">
              <div className="flex items-center">
                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                <span className="text-sm text-gray-600 ml-1">
                  {product.rating} ({product.reviews})
                </span>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="text-lg font-bold text-gray-900">
                    {formatPrice(product.price)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm text-gray-500 line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                  )}
                </div>
              </div>
              
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onAddToCart(product);
                }}
                disabled={!product.inStock}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white p-2 rounded-lg transition-colors group"
              >
                <ShoppingCart className="h-4 w-4 group-hover:scale-110 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};