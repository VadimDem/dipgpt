import React, { useState } from 'react';
import { ArrowLeft, User as UserIcon, Mail, Phone, MapPin, Edit2, Save, X } from 'lucide-react';
import { User } from '../types';
import { authUtils } from '../utils/auth';

interface ProfileProps {
  user: User;
  onBack: () => void;
  onUserUpdate: (user: User) => void;
  onViewOrders: () => void;
  onLogout: () => void;
}

export const Profile: React.FC<ProfileProps> = ({
  user,
  onBack,
  onUserUpdate,
  onViewOrders,
  onLogout
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user.name,
    phone: user.phone || '',
    address: user.address || '',
    city: user.city || ''
  });

  const handleSave = () => {
    const updatedUser: User = {
      ...user,
      ...formData
    };
    
    authUtils.updateUser(updatedUser);
    onUserUpdate(updatedUser);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      name: user.name,
      phone: user.phone || '',
      address: user.address || '',
      city: user.city || ''
    });
    setIsEditing(false);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ru-RU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <button
        onClick={onBack}
        className="flex items-center text-gray-600 hover:text-blue-600 mb-8 transition-colors"
      >
        <ArrowLeft className="h-5 w-5 mr-2" />
        Назад
      </button>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 px-6 py-8 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <UserIcon className="h-8 w-8" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">{user.name}</h1>
                <p className="text-blue-100">Клиент с {formatDate(user.registeredAt)}</p>
              </div>
            </div>
            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="bg-white bg-opacity-20 hover:bg-opacity-30 p-2 rounded-lg transition-colors"
              >
                <Edit2 className="h-5 w-5" />
              </button>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Имя
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <div className="flex items-center space-x-2 text-gray-900">
                  <UserIcon className="h-4 w-4 text-gray-400" />
                  <span>{user.name}</span>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <div className="flex items-center space-x-2 text-gray-900">
                <Mail className="h-4 w-4 text-gray-400" />
                <span>{user.email}</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Телефон
              </label>
              {isEditing ? (
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="+7 (999) 123-45-67"
                />
              ) : (
                <div className="flex items-center space-x-2 text-gray-900">
                  <Phone className="h-4 w-4 text-gray-400" />
                  <span>{user.phone || 'Не указан'}</span>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Город
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Москва"
                />
              ) : (
                <div className="flex items-center space-x-2 text-gray-900">
                  <MapPin className="h-4 w-4 text-gray-400" />
                  <span>{user.city || 'Не указан'}</span>
                </div>
              )}
            </div>
          </div>

          {isEditing && (
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Адрес
              </label>
              <textarea
                value={formData.address}
                onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Улица, дом, квартира"
              />
            </div>
          )}

          {!isEditing && user.address && (
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Адрес
              </label>
              <div className="flex items-start space-x-2 text-gray-900">
                <MapPin className="h-4 w-4 text-gray-400 mt-1" />
                <span>{user.address}</span>
              </div>
            </div>
          )}

          {/* Actions */}
          {isEditing ? (
            <div className="flex space-x-4">
              <button
                onClick={handleSave}
                className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                <Save className="h-4 w-4" />
                <span>Сохранить</span>
              </button>
              <button
                onClick={handleCancel}
                className="flex items-center space-x-2 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                <X className="h-4 w-4" />
                <span>Отмена</span>
              </button>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
              <button
                onClick={onViewOrders}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                История заказов
              </button>
              <button
                onClick={onLogout}
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                Выйти из аккаунта
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};