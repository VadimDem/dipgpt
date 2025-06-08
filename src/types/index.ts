export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  description: string;
  features: string[];
  inStock: boolean;
  rating: number;
  reviews: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface OrderData {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  paymentMethod: 'card' | 'cash';
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  city?: string;
  registeredAt: string;
}

export interface Order {
  id: string;
  userId: string;
  orderNumber: string;
  items: CartItem[];
  totalAmount: number;
  deliveryFee: number;
  finalAmount: number;
  orderData: OrderData;
  status: 'processing' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: string;
  deliveredAt?: string;
}

export type ViewType = 'home' | 'product' | 'cart' | 'checkout' | 'success' | 'login' | 'register' | 'profile' | 'orders';