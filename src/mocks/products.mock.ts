export interface ProductCardData {
  id: string;
  images: string[];
  brand: string;
  title: string;
  description: string;
  category: string[];
  price: number;
  size: Array<
    | { system: "EU"; value: number | string }
    | { system: "ONE_SIZE" }
    | { system: "LETTER"; value: string }
  >;
  condition: "new" | "used";
  delivery: { method: string; id: string }[];
  seller: {
    id: string;
    name: string;
    avatar: string;
    link: string;
  };
  favoriteCount: number;
  isFavorite: boolean;
  createdAt: string;
  views: number;
}

export const PRODUCTS_DATA: ProductCardData[] = [
  {
    id: "1",
    images: [
      "/images/products/product.png",
      "/images/product.png",
      "/images/products/product.png",
      "/images/product.png",
      "/images/products/product.png",
      "/images/product.png",
      "/images/products/product.png",
    ],
    brand: "Nike Jordan",
    title: "Кросы",
    category: ["Обувь", "Кроссовки", "Nike", "Air Jordan"],
    description: "Яркий пример современных тенденций...",
    price: 13000,
    size: [
      { system: "LETTER", value: "S" },
      { system: "LETTER", value: "M" },
      { system: "LETTER", value: "XL" },
    ],
    condition: "new",
    delivery: [
      { method: "CDEK", id: "33" },
      { method: "Самовывоз", id: "22" },
      { method: "Курьерская", id: "44" },
    ],
    seller: {
      id: "2",
      name: "Иван Иванов",
      avatar: "/images/avatar.png",
      link: "/profile/1",
    },
    favoriteCount: 25,
    isFavorite: true,
    createdAt: new Date().toISOString(),
    views: 120,
  },
  {
    id: "2",
    images: [
      "/images/product.png",
      "/images/products/product.png",
      "/images/products/product.png",
    ],
    brand: "Adidas",
    title: "Куртка спортивная",
    category: ["Одежда", "Верхняя одежда", "Adidas"],
    description: "Комфортная и стильная спортивная куртка.",
    price: 8500,
    size: [
      { system: "EU", value: 42 },
      { system: "EU", value: 44 },
      { system: "EU", value: 46 },
    ],
    condition: "new",
    delivery: [
      { method: "CDEK", id: "33" },
      { method: "Самовывоз", id: "22" },
      { method: "Курьерская", id: "44" },
    ],
    seller: {
      id: "1",
      name: "Пётр Петров",
      avatar: "/images/avatar.png",
      link: "/profile/2",
    },
    favoriteCount: 12,
    isFavorite: false,
    createdAt: new Date().toISOString(),
    views: 98,
  },
  {
    id: "3",
    images: [
      "/images/product.png",
      "/images/products/product.png",
      "/images/products/product.png",
    ],
    brand: "Levi's",
    title: "Джинсы",
    category: ["Одежда", "Джинсы", "Levi's"],
    description: "Классические прямые джинсы для повседневной носки.",
    price: 10200,
    size: [
      { system: "EU", value: 30 },
      { system: "EU", value: 32 },
    ],
    condition: "new",
    delivery: [
      { method: "CDEK", id: "33" },
      { method: "Самовывоз", id: "22" },
      { method: "Курьерская", id: "44" },
    ],
    seller: {
      id: "1",
      name: "Пётр Петров",
      avatar: "/images/avatar.png",
      link: "/profile/3",
    },
    favoriteCount: 7,
    isFavorite: false,
    createdAt: new Date().toISOString(),
    views: 67,
  },
  {
    id: "4",
    images: [
      "/images/product.png",
      "/images/products/product.png",
      "/images/products/product.png",
    ],
    brand: "Rolex",
    title: "Часы",
    category: ["Аксессуары", "Часы", "Rolex"],
    description: "Элитные наручные часы с автоматическим механизмом.",
    price: 95000,
    size: [{ system: "ONE_SIZE" }],
    condition: "new",
    delivery: [
      { method: "CDEK", id: "33" },
      { method: "Самовывоз", id: "22" },
      { method: "Курьерская", id: "44" },
    ],
    seller: {
      id: "1",
      name: "Пётр Петров",
      avatar: "/images/avatar.png",
      link: "/profile/4",
    },
    favoriteCount: 40,
    isFavorite: true,
    createdAt: new Date().toISOString(),
    views: 300,
  },
  {
    id: "5",
    images: [
      "/images/product.png",
      "/images/products/product.png",
      "/images/products/product.png",
    ],
    brand: "Zara",
    title: "Футболка",
    category: ["Одежда", "Футболки", "Zara"],
    description: "Лёгкая хлопковая футболка для лета.",
    price: 2500,
    size: [
      { system: "LETTER", value: "S" },
      { system: "LETTER", value: "M" },
      { system: "LETTER", value: "L" },
    ],
    condition: "new",
    delivery: [
      { method: "CDEK", id: "33" },
      { method: "Самовывоз", id: "22" },
      { method: "Курьерская", id: "44" },
    ],
    seller: {
      id: "1",
      name: "Пётр Петров",
      avatar: "/images/avatar.png",
      link: "/profile/5",
    },
    favoriteCount: 15,
    isFavorite: false,
    createdAt: new Date().toISOString(),
    views: 80,
  },
  {
    id: "6",
    images: [
      "/images/product.png",
      "/images/products/product.png",
      "/images/products/product.png",
    ],
    brand: "Gucci",
    title: "Сумка",
    category: ["Аксессуары", "Сумки", "Gucci"],
    description: "Стильная сумка из натуральной кожи.",
    price: 78000,
    size: [{ system: "ONE_SIZE" }],
    condition: "new",
    delivery: [
      { method: "CDEK", id: "33" },
      { method: "Самовывоз", id: "22" },
      { method: "Курьерская", id: "44" },
    ],
    seller: {
      id: "2",
      name: "Иван Иванов",
      avatar: "/images/avatar.png",
      link: "/profile/6",
    },
    favoriteCount: 22,
    isFavorite: true,
    createdAt: new Date().toISOString(),
    views: 200,
  },
  {
    id: "7",
    images: [
      "/images/product.png",
      "/images/products/product.png",
      "/images/products/product.png",
    ],
    brand: "Puma",
    title: "Кроссовки",
    category: ["Обувь", "Кроссовки", "Puma"],
    description: "Удобные кроссовки для повседневной носки и спорта.",
    price: 6700,
    size: [
      { system: "EU", value: 41 },
      { system: "EU", value: 42 },
      { system: "EU", value: 43 },
    ],
    condition: "new",
    delivery: [
      { method: "CDEK", id: "33" },
      { method: "Самовывоз", id: "22" },
      { method: "Курьерская", id: "44" },
    ],
    seller: {
      id: "2",
      name: "Иван Иванов",
      avatar: "/images/avatar.png",
      link: "/profile/7",
    },
    favoriteCount: 10,
    isFavorite: false,
    createdAt: new Date().toISOString(),
    views: 54,
  },
  {
    id: "8",
    images: [
      "/images/product.png",
      "/images/products/product.png",
      "/images/products/product.png",
    ],
    brand: "Samsung",
    title: "Смартфон",
    category: ["Электроника", "Смартфоны", "Samsung"],
    description: "Новый смартфон с большим экраном и мощным процессором.",
    price: 52000,
    size: [{ system: "ONE_SIZE" }],
    condition: "new",
    delivery: [
      { method: "CDEK", id: "33" },
      { method: "Самовывоз", id: "22" },
      { method: "Курьерская", id: "44" },
    ],
    seller: {
      id: "2",
      name: "Иван Иванов",
      avatar: "/images/avatar.png",
      link: "/profile/8",
    },
    favoriteCount: 30,
    isFavorite: true,
    createdAt: new Date().toISOString(),
    views: 180,
  },
  {
    id: "9",
    images: [
      "/images/product.png",
      "/images/products/product.png",
      "/images/products/product.png",
    ],
    brand: "H&M",
    title: "Джинсовая куртка",
    category: ["Одежда", "Верхняя одежда", "H&M"],
    description: "Модная джинсовая куртка для весны и осени.",
    price: 4200,
    size: [
      { system: "LETTER", value: "M" },
      { system: "LETTER", value: "L" },
    ],
    condition: "new",
    delivery: [
      { method: "CDEK", id: "33" },
      { method: "Самовывоз", id: "22" },
      { method: "Курьерская", id: "44" },
    ],
    seller: {
      id: "2",
      name: "Иван Иванов",
      avatar: "/images/avatar.png",
      link: "/profile/9",
    },
    favoriteCount: 8,
    isFavorite: false,
    createdAt: new Date().toISOString(),
    views: 65,
  },
  {
    id: "10",
    images: [
      "/images/product.png",
      "/images/products/product.png",
      "/images/products/product.png",
    ],
    brand: "Reebok",
    title: "Спортивные штаны",
    category: ["Одежда", "Спортивные", "Reebok"],
    description: "Удобные спортивные штаны для тренировок и дома.",
    price: 3100,
    size: [
      { system: "LETTER", value: "S" },
      { system: "LETTER", value: "M" },
      { system: "LETTER", value: "L" },
    ],
    condition: "new",
    delivery: [
      { method: "CDEK", id: "33" },
      { method: "Самовывоз", id: "22" },
      { method: "Курьерская", id: "44" },
    ],
    seller: {
      id: "2",
      name: "Иван Иванов",
      avatar: "/images/avatar.png",
      link: "/profile/10",
    },
    favoriteCount: 18,
    isFavorite: true,
    createdAt: new Date().toISOString(),
    views: 92,
  },
];
