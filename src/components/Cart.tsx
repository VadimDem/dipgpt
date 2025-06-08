import React from 'react';
import { ArrowLeft, Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { CartItem } from '../types';

interface CartProps {
  items: CartItem[];
  onUpdateQuantity: (productId: number, quantity: number) => void;
  onRemoveItem: (productId: number) => void;
  onBack: () => void;
  onCheckout: () => void;
}

export const Cart: React.FC<CartProps> = ({
  items,
  onUpdateQuantity,
  onRemoveItem,
  onBack,
  onCheckout
}) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      minimumFractionDigits: 0
    }).format(price);
  };

  const totalAmount = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={onBack}
          className="flex items-center text-gray-600 hover:text-blue-600 mb-8 transition-colors"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Назад к каталогу
        </button>

        <div className="text-center py-16">
          <ShoppingBag className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Корзина пуста</h2>
          <p className="text-gray-600 mb-8">Добавьте товары в корзину, чтобы продолжить покупки</p>
          <button
            onClick={onBack}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            Перейти к покупкам
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <button
        onClick={onBack}
        className="flex items-center text-gray-600 hover:text-blue-600 mb-8 transition-colors"
      >
        <ArrowLeft className="h-5 w-5 mr-2" />
        Продолжить покупки
      </button>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-900">
            Корзина ({totalItems} {totalItems === 1 ? 'товар' : totalItems < 5 ? 'товара' : 'товаров'})
          </h1>
        </div>

        <div className="divide-y divide-gray-200">
          {items.map((item) => (
            <div key={item.product.id} className="p-6 flex items-center space-x-4">
              <img
                src={item.product.image}
                alt={item.product.name}
                className="w-20 h-20 object-cover rounded-lg"
              />
              
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-1">{item.product.name}</h3>
                <p className="text-sm text-gray-600">{item.product.category}</p>
                <p className="text-lg font-bold text-gray-900 mt-2">
                  {formatPrice(item.product.price)}
                </p>
              </div>

              <div className="flex items-center space-x-3">
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                    className="p-2 text-gray-600 hover:text-gray-800 transition-colors"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="px-4 py-2 border-l border-r border-gray-300 min-w-[3rem] text-center">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                    className="p-2 text-gray-600 hover:text-gray-800 transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>

                <button
                  onClick={() => onRemoveItem(item.product.id)}
                  className="p-2 text-red-600 hover:text-red-800 transition-colors"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>

              <div className="text-right">
                <p className="text-lg font-bold text-gray-900">
                  {formatPrice(item.product.price * item.quantity)}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="p-6 border-t border-gray-200 bg-gray-50">
          <div className="flex justify-between items-center mb-4">
            <span className="text-xl font-semibold text-gray-900">Итого:</span>
            <span className="text-2xl font-bold text-gray-900">
              {formatPrice(totalAmount)}
            </span>
          </div>
          
          <button
            onClick={onCheckout}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors"
          >
            Оформить заказ
          </button>
        </div>
      </div>
    </div>
  );
};