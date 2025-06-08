import React, { useState } from 'react';
import { ArrowLeft, CreditCard, Banknote } from 'lucide-react';
import { CartItem, OrderData } from '../types';

interface CheckoutProps {
  items: CartItem[];
  onBack: () => void;
  onOrderComplete: (orderData: OrderData) => void;
}

export const Checkout: React.FC<CheckoutProps> = ({
  items,
  onBack,
  onOrderComplete
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    paymentMethod: 'card' as 'card' | 'cash'
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      minimumFractionDigits: 0
    }).format(price);
  };

  const totalAmount = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const deliveryFee = totalAmount > 50000 ? 0 : 1000;
  const finalAmount = totalAmount + deliveryFee;

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = 'Введите ваше имя';
    if (!formData.email.trim()) newErrors.email = 'Введите email';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Некорректный email';
    if (!formData.phone.trim()) newErrors.phone = 'Введите номер телефона';
    if (!formData.address.trim()) newErrors.address = 'Введите адрес доставки';
    if (!formData.city.trim()) newErrors.city = 'Введите город';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onOrderComplete(formData);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <button
        onClick={onBack}
        className="flex items-center text-gray-600 hover:text-blue-600 mb-8 transition-colors"
      >
        <ArrowLeft className="h-5 w-5 mr-2" />
        Назад к корзине
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Order Form */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Оформление заказа</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Контактная информация</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Имя *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.name ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Ваше имя"
                  />
                  {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.email ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="your@email.com"
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>
              </div>
              
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Телефон *
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.phone ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="+7 (999) 123-45-67"
                />
                {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Адрес доставки</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Город *
                  </label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.city ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Москва"
                  />
                  {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Адрес *
                  </label>
                  <textarea
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    rows={3}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.address ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Улица, дом, квартира"
                  />
                  {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Способ оплаты</h3>
              <div className="space-y-3">
                <label className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="card"
                    checked={formData.paymentMethod === 'card'}
                    onChange={(e) => setFormData(prev => ({ ...prev, paymentMethod: e.target.value as 'card' | 'cash' }))}
                    className="mr-3"
                  />
                  <CreditCard className="h-5 w-5 mr-3 text-blue-600" />
                  <span>Банковская карта</span>
                </label>
                
                <label className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cash"
                    checked={formData.paymentMethod === 'cash'}
                    onChange={(e) => setFormData(prev => ({ ...prev, paymentMethod: e.target.value as 'card' | 'cash' }))}
                    className="mr-3"
                  />
                  <Banknote className="h-5 w-5 mr-3 text-green-600" />
                  <span>Наличными при получении</span>
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors"
            >
              Оформить заказ на {formatPrice(finalAmount)}
            </button>
          </form>
        </div>

        {/* Order Summary */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 h-fit">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Ваш заказ</h3>
          
          <div className="space-y-4 mb-6">
            {items.map((item) => (
              <div key={item.product.id} className="flex items-center space-x-3">
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-12 h-12 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <p className="font-medium text-gray-900 text-sm">{item.product.name}</p>
                  <p className="text-gray-600 text-sm">{item.quantity} шт.</p>
                </div>
                <p className="font-semibold text-gray-900">
                  {formatPrice(item.product.price * item.quantity)}
                </p>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-200 pt-4 space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Товары:</span>
              <span className="font-semibold">{formatPrice(totalAmount)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Доставка:</span>
              <span className="font-semibold">
                {deliveryFee === 0 ? 'Бесплатно' : formatPrice(deliveryFee)}
              </span>
            </div>
            {deliveryFee === 0 && (
              <p className="text-sm text-green-600">Бесплатная доставка при заказе от 50 000 ₽</p>
            )}
            <div className="flex justify-between text-lg font-bold border-t border-gray-200 pt-2">
              <span>Итого:</span>
              <span>{formatPrice(finalAmount)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};