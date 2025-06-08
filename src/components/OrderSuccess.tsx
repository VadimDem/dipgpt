import React from 'react';
import { CheckCircle, Package, Truck, CreditCard } from 'lucide-react';
import { OrderData } from '../types';

interface OrderSuccessProps {
  orderData: OrderData;
  onNewOrder: () => void;
}

export const OrderSuccess: React.FC<OrderSuccessProps> = ({
  orderData,
  onNewOrder
}) => {
  const orderNumber = Math.random().toString(36).substr(2, 9).toUpperCase();

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
        <div className="mb-6">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Заказ успешно оформлен!
          </h1>
          <p className="text-gray-600">
            Спасибо за покупку! Мы свяжемся с вами в ближайшее время.
          </p>
        </div>

        <div className="bg-gray-50 rounded-lg p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Детали заказа #{orderNumber}
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
            <div>
              <p className="text-sm text-gray-600">Имя:</p>
              <p className="font-semibold">{orderData.name}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Email:</p>
              <p className="font-semibold">{orderData.email}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Телефон:</p>
              <p className="font-semibold">{orderData.phone}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Способ оплаты:</p>
              <p className="font-semibold">
                {orderData.paymentMethod === 'card' ? 'Банковская карта' : 'Наличными при получении'}
              </p>
            </div>
            <div className="sm:col-span-2">
              <p className="text-sm text-gray-600">Адрес доставки:</p>
              <p className="font-semibold">{orderData.city}, {orderData.address}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="flex flex-col items-center p-4 bg-blue-50 rounded-lg">
            <Package className="h-8 w-8 text-blue-600 mb-2" />
            <p className="font-semibold text-gray-900">Обработка</p>
            <p className="text-sm text-gray-600">1-2 часа</p>
          </div>
          <div className="flex flex-col items-center p-4 bg-yellow-50 rounded-lg">
            <Truck className="h-8 w-8 text-yellow-600 mb-2" />
            <p className="font-semibold text-gray-900">Доставка</p>
            <p className="text-sm text-gray-600">1-3 дня</p>
          </div>
          <div className="flex flex-col items-center p-4 bg-green-50 rounded-lg">
            <CreditCard className="h-8 w-8 text-green-600 mb-2" />
            <p className="font-semibold text-gray-900">Оплата</p>
            <p className="text-sm text-gray-600">
              {orderData.paymentMethod === 'card' ? 'Онлайн' : 'При получении'}
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <p className="text-gray-600">
            Мы отправили подтверждение заказа на ваш email: <strong>{orderData.email}</strong>
          </p>
          
          <button
            onClick={onNewOrder}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
          >
            Продолжить покупки
          </button>
        </div>
      </div>
    </div>
  );
};