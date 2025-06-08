import React, { useState } from 'react';
import { ArrowLeft, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { authUtils } from '../utils/auth';
import { User } from '../types';

interface LoginProps {
  onBack: () => void;
  onLogin: (user: User) => void;
  onSwitchToRegister: () => void;
}

export const Login: React.FC<LoginProps> = ({
  onBack,
  onLogin,
  onSwitchToRegister
}) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const result = authUtils.login(formData.email, formData.password);
      
      if (result.success && result.user) {
        authUtils.setCurrentUser(result.user);
        onLogin(result.user);
      } else {
        setError(result.message);
      }
    } catch {
      setError('Произошла ошибка при входе');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (error) setError('');
  };

  return (
    <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <button
        onClick={onBack}
        className="flex items-center text-gray-600 hover:text-blue-600 mb-8 transition-colors"
      >
        <ArrowLeft className="h-5 w-5 mr-2" />
        Назад
      </button>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-2xl">БТ</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Вход в аккаунт</h1>
          <p className="text-gray-600">Войдите, чтобы получить доступ к истории заказов</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="your@email.com"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Пароль
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Введите пароль"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-3 px-6 rounded-lg font-semibold transition-colors"
          >
            {isLoading ? 'Вход...' : 'Войти'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Нет аккаунта?{' '}
            <button
              onClick={onSwitchToRegister}
              className="text-blue-600 hover:text-blue-700 font-semibold"
            >
              Зарегистрироваться
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};
