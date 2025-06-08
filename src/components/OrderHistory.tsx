import React from 'react';
import { ArrowLeft, Package, Truck, CheckCircle, XCircle, Calendar, CreditCard } from 'lucide-react';
import { Order } from '../types';

interface OrderHistoryProps {
  orders: Order[];
  onBack: () => void;
}

export const OrderHistory: React.FC<OrderHistoryProps> = ({
  orders,
  onBack
}) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      minimumFractionDigits: 0
    }).format(price);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ru-RU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusIcon = (status: Order['status']) => {
    switch (status) {
      case 'processing':
        return <Package className="h-5 w-5 text-blue-600" />;
      case 'shipped':
        return <Truck className="h-5 w-5 text-yellow-600" />;
      case 'delivered':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'cancelled':
        return <XCircle className="h-5 w-5 text-red-600" />;
    }
  };

  const getStatusText = (status: Order['status']) => {
    switch (status) {
      case 'processing':
        return 'Обрабатывается';
      case 'shipped':
        return 'Отправлен';
      case 'delivered':
        return 'Доставлен';
      case 'cancelled':
        return 'Отменен';
    }
  };

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'processing':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'shipped':
        return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'delivered':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'cancelled':
        return 'bg-red-50 text-red-700 border-red-200';
    }
  };

  if (orders.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={onBack}
          className="flex items-center text-gray-600 hover:text-blue-600 mb-8 transition-colors"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Назад к профилю
        </button>

        <div className="text-center py-16">
          <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Заказов пока нет</h2>
          <p className="text-gray-600 mb-8">Сделайте первый заказ, чтобы увидеть его здесь</p>
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
        Назад к профилю
      </button>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">История заказов</h1>
        <p className="text-gray-600">Всего заказов: {orders.length}</p>
      </div>

      <div className="space-y-6">
        {orders.map((order) => (
          <div key={order.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            {/* Order Header */}
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center space-x-4 mb-2 sm:mb-0">
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(order.status)}
                    <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(order.status)}`}>
                      {getStatusText(order.status)}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Заказ #{order.orderNumber}</p>
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="h-4 w-4 mr-1" />
                      {formatDate(order.createdAt)}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-gray-900">{formatPrice(order.finalAmount)}</p>
                  <div className="flex items-center text-sm text-gray-600">
                    <CreditCard className="h-4 w-4 mr-1" />
                    {order.orderData.paymentMethod === 'card' ? 'Карта' : 'Наличные'}
                  </div>
                </div>
              </div>
            </div>

            {/* Order Items */}
            <div className="p-6">
              <div className="space-y-4">
                {order.items.map((item) => (
                  <div key={item.product.id} className="flex items-center space-x-4">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{item.product.name}</h3>
                      <p className="text-sm text-gray-600">{item.product.category}</p>
                      <p className="text-sm text-gray-600">{item.quantity} шт.</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">
                        {formatPrice(item.product.price * item.quantity)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Summary */}
              <div className="border-t border-gray-200 mt-6 pt-4">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Товары:</span>
                  <span>{formatPrice(order.totalAmount)}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Доставка:</span>
                  <span>{order.deliveryFee === 0 ? 'Бесплатно' : formatPrice(order.deliveryFee)}</span>
                </div>
                <div className="flex justify-between font-semibold text-gray-900">
                  <span>Итого:</span>
                  <span>{formatPrice(order.finalAmount)}</span>
                </div>
              </div>

              {/* Delivery Address */}
              <div className="border-t border-gray-200 mt-4 pt-4">
                <p className="text-sm text-gray-600">
                  <strong>Адрес доставки:</strong> {order.orderData.city}, {order.orderData.address}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};