import { Product } from '../types';

export const products: Product[] = [
  {
    id: 1,
    name: "Кофемашина DeLonghi Dinamica",
    price: 45000,
    originalPrice: 52000,
    image: "https://images.pexels.com/photos/324028/pexels-photo-324028.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: "Кухонная техника",
    description: "Автоматическая кофемашина с встроенной кофемолкой и системой подачи молока. Идеально подходит для приготовления эспрессо, капучино и латте.",
    features: ["Встроенная кофемолка", "Автоматическое приготовление", "Система подачи молока", "ЖК-дисплей"],
    inStock: true,
    rating: 4.8,
    reviews: 124
  },
  {
    id: 2,
    name: "Пылесос Dyson V15 Detect",
    price: 38000,
    image: "https://images.pexels.com/photos/4107123/pexels-photo-4107123.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: "Уборка",
    description: "Беспроводной пылесос с лазерным обнаружением пыли и мощным всасыванием. Легкий и маневренный для уборки всего дома.",
    features: ["Лазерное обнаружение пыли", "60 минут работы", "Легкий вес", "Многоступенчатая фильтрация"],
    inStock: true,
    rating: 4.9,
    reviews: 89
  },
  {
    id: 3,
    name: "Стиральная машина Samsung EcoBubble",
    price: 32000,
    originalPrice: 38000,
    image: "https://images.pexels.com/photos/5591663/pexels-photo-5591663.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: "Крупная техника",
    description: "Стиральная машина с технологией EcoBubble для бережной стирки. Загрузка 8 кг, энергоэффективность класса A+++.",
    features: ["Технология EcoBubble", "Загрузка 8 кг", "Класс A+++", "Тихая работа"],
    inStock: true,
    rating: 4.7,
    reviews: 156
  },
  {
    id: 4,
    name: "Мультиварка Redmond RMC-M4502",
    price: 8500,
    image: "https://images.pexels.com/photos/6489082/pexels-photo-6489082.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: "Кухонная техника",
    description: "Умная мультиварка с возможностью управления через приложение. 45 автоматических программ приготовления.",
    features: ["45 программ", "Управление через приложение", "Таймер отсрочки", "Поддержание тепла"],
    inStock: true,
    rating: 4.6,
    reviews: 203
  },
  {
    id: 5,
    name: "Робот-пылесос Xiaomi Mi Robot",
    price: 25000,
    image: "https://images.pexels.com/photos/4099354/pexels-photo-4099354.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: "Уборка",
    description: "Умный робот-пылесос с картографированием и управлением через приложение. Автоматическая зарядка и возобновление уборки.",
    features: ["Картографирование", "Управление через app", "Автозарядка", "Влажная уборка"],
    inStock: false,
    rating: 4.5,
    reviews: 178
  },
  {
    id: 6,
    name: "Холодильник LG InstaView",
    price: 95000,
    originalPrice: 105000,
    image: "https://images.pexels.com/photos/2343466/pexels-photo-2343466.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: "Крупная техника",
    description: "Холодильник с прозрачной дверцей InstaView и технологией Door-in-Door. Объем 635 литров, NoFrost.",
    features: ["InstaView дверца", "Door-in-Door", "NoFrost", "635 л объем"],
    inStock: true,
    rating: 4.8,
    reviews: 67
  },
  {
    id: 7,
    name: "Микроволновая печь Panasonic",
    price: 12000,
    image: "https://images.pexels.com/photos/4686748/pexels-photo-4686748.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: "Кухонная техника",
    description: "Микроволновая печь с грилем и конвекцией. Объем 25 литров, сенсорное управление.",
    features: ["Гриль и конвекция", "25 л объем", "Сенсорное управление", "Быстрая разморозка"],
    inStock: true,
    rating: 4.4,
    reviews: 92
  },
  {
    id: 8,
    name: "Посудомоечная машина Bosch",
    price: 42000,
    image: "https://images.pexels.com/photos/4686801/pexels-photo-4686801.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: "Крупная техника",
    description: "Встраиваемая посудомоечная машина на 14 комплектов посуды. Класс энергопотребления A++.",
    features: ["14 комплектов", "Класс A++", "Тихая работа", "6 программ мойки"],
    inStock: true,
    rating: 4.7,
    reviews: 134
  }
];

export const categories = [
  "Все товары",
  "Кухонная техника",
  "Уборка",
  "Крупная техника"
];