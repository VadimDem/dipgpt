import React, { useState } from 'react';
import { ArrowLeft, ShoppingCart, Star, Check, Truck, Shield, RotateCcw } from 'lucide-react';
import { Product } from '../types';

interface ProductDetailProps {
  product: Product;
  onBack: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
}

export const ProductDetail: React.FC<ProductDetailProps> = ({
  product,
  onBack,
  onAddToCart
}) => {
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      minimumFractionDigits: 0
    }).format(price);
  };

  const handleAddToCart = () => {
    onAddToCart(product, quantity);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <button
        onClick={onBack}
        className="flex items-center text-gray-600 hover:text-blue-600 mb-8 transition-colors"
      >
        <ArrowLeft className="h-5 w-5 mr-2" />
        Назад к каталогу
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Image */}
        <div className="relative">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-96 lg:h-[500px] object-cover rounded-2xl shadow-lg"
          />
          {product.originalPrice && (
            <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-2 rounded-full font-semibold">
              -{Math.round((1 - product.price / product.originalPrice) * 100)}%
            </div>
          )}
          {!product.inStock && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-2xl">
              <span className="bg-white text-gray-900 px-4 py-2 rounded-full font-semibold">
                Нет в наличии
              </span>
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <span className="text-sm text-blue-600 font-medium bg-blue-50 px-3 py-1 rounded-full">
              {product.category}
            </span>
            <h1 className="text-3xl font-bold text-gray-900 mt-4 mb-4">
              {product.name}
            </h1>
            
            <div className="flex items-center mb-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(product.rating)
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
                <span className="ml-2 text-gray-600">
                  {product.rating} ({product.reviews} отзывов)
                </span>
              </div>
            </div>
          </div>

          <div className="border-t border-b border-gray-200 py-6">
            <div className="flex items-center space-x-4">
              <span className="text-3xl font-bold text-gray-900">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-xl text-gray-500 line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Описание</h3>
            <p className="text-gray-600 leading-relaxed">{product.description}</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Особенности</h3>
            <ul className="space-y-2">
              {product.features.map((feature, index) => (
                <li key={index} className="flex items-center text-gray-600">
                  <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          {product.inStock && (
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <label className="text-sm font-medium text-gray-700">Количество:</label>
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 text-gray-600 hover:text-gray-800"
                  >
                    -
                  </button>
                  <span className="px-4 py-2 border-l border-r border-gray-300">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-2 text-gray-600 hover:text-gray-800"
                  >
                    +
                  </button>
                </div>
              </div>

              <button
                onClick={handleAddToCart}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2"
              >
                <ShoppingCart className="h-5 w-5" />
                <span>
                  {addedToCart ? 'Добавлено в корзину!' : 'Добавить в корзину'}
                </span>
              </button>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6">
            <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
              <Truck className="h-6 w-6 text-blue-600" />
              <div>
                <p className="font-medium text-gray-900">Быстрая доставка</p>
                <p className="text-sm text-gray-600">1-3 дня</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
              <Shield className="h-6 w-6 text-green-600" />
              <div>
                <p className="font-medium text-gray-900">Гарантия</p>
                <p className="text-sm text-gray-600">2 года</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
              <RotateCcw className="h-6 w-6 text-orange-600" />
              <div>
                <p className="font-medium text-gray-900">Возврат</p>
                <p className="text-sm text-gray-600">14 дней</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};