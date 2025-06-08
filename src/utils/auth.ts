import { User, Order } from '../types';

const USERS_KEY = 'byttekhnika_users';
const CURRENT_USER_KEY = 'byttekhnika_current_user';
const ORDERS_KEY = 'byttekhnika_orders';

export const authUtils = {
  // Пользователи
  getUsers(): User[] {
    const users = localStorage.getItem(USERS_KEY);
    return users ? JSON.parse(users) : [];
  },

  saveUsers(users: User[]): void {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  },

  // Текущий пользователь
  getCurrentUser(): User | null {
    const user = localStorage.getItem(CURRENT_USER_KEY);
    return user ? JSON.parse(user) : null;
  },

  setCurrentUser(user: User | null): void {
    if (user) {
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(CURRENT_USER_KEY);
    }
  },

  // Регистрация
  register(name: string, email: string, password: string): { success: boolean; message: string; user?: User } {
    const users = this.getUsers();
    
    if (users.find(u => u.email === email)) {
      return { success: false, message: 'Пользователь с таким email уже существует' };
    }

    const newUser: User = {
      id: Date.now().toString(),
      name,
      email,
      registeredAt: new Date().toISOString()
    };

    users.push(newUser);
    this.saveUsers(users);
    
    // Сохраняем пароль отдельно (в реальном приложении пароли должны быть захешированы)
    const passwords = JSON.parse(localStorage.getItem('byttekhnika_passwords') || '{}');
    passwords[email] = password;
    localStorage.setItem('byttekhnika_passwords', JSON.stringify(passwords));

    return { success: true, message: 'Регистрация успешна', user: newUser };
  },

  // Вход
  login(email: string, password: string): { success: boolean; message: string; user?: User } {
    const users = this.getUsers();
    const passwords = JSON.parse(localStorage.getItem('byttekhnika_passwords') || '{}');
    
    const user = users.find(u => u.email === email);
    if (!user) {
      return { success: false, message: 'Пользователь не найден' };
    }

    if (passwords[email] !== password) {
      return { success: false, message: 'Неверный пароль' };
    }

    return { success: true, message: 'Вход выполнен успешно', user };
  },

  // Выход
  logout(): void {
    this.setCurrentUser(null);
  },

  // Заказы
  getOrders(): Order[] {
    const orders = localStorage.getItem(ORDERS_KEY);
    return orders ? JSON.parse(orders) : [];
  },

  saveOrder(order: Order): void {
    const orders = this.getOrders();
    orders.push(order);
    localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
  },

  getUserOrders(userId: string): Order[] {
    return this.getOrders().filter(order => order.userId === userId);
  },

  updateUser(updatedUser: User): void {
    const users = this.getUsers();
    const index = users.findIndex(u => u.id === updatedUser.id);
    if (index !== -1) {
      users[index] = updatedUser;
      this.saveUsers(users);
      this.setCurrentUser(updatedUser);
    }
  }
};