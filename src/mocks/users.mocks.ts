// types/userProfile.ts
export type User = {
  id: string; // уникальный ID пользователя
  name: string; // Имя пользователя
  avatar?: string; // URL аватара
  isMe?: boolean; // это мой профиль или чужой
  background?: string; // фон
  description?: string;
  photos?: string[]; // личные фотографии (только для своего профиля)
  handle?: string; // @handle
  email?: string;
  verified?: boolean; // статус "зелёная галочка" для чужого
  rating?: number; // рейтинг пользователя
  reviewsCount?: number; // количество отзывов
  productsCount?: number; // количество товаров на площадке
  followersCount?: number; // подписчики
  followingCount?: number; // подписки
  isFollowing?: boolean; // подписка на чужого пользователя
  favouriteProducts?: string[];
  createdAt?: string; // ISO дата
  online?: boolean;
  token?:string;
  phone?:string;
  isHonest?: boolean;
  mailingAgree?:boolean;
  policyAgree?:boolean;
};

export const USERS_DATA: User[] = [
  {
    id: "1",
    isMe: true,
    avatar: "/images/avatar.png",
    name: "Myauchelo7",
    description:
      "Здесь продается оригинальная продукция: кроссовки и стритвир. Все вещи с чеками и гарантией подлинности. Быстрая доставка по всей России",
    handle: "@Myauchelo7",
    email: "petr.petrov@example.com",
    verified: true,
    rating: 1,
    reviewsCount: 22,
    productsCount: 4,
    followersCount: 620,
    followingCount: 20,
    isFollowing: false,
    favouriteProducts: ["1", "3", "5", "6", "8", "9"],
    photos: ["/images/product.png", "/images/product.png"],
    createdAt: "2023-09-15T10:23:00.000Z",
    online: false,
    isHonest: true,
    token: "jwt-12yguyg12w32hj12o32",
  },
  {
    id: "2",
    isMe: false,
    avatar: "/images/avatar.png",
    name: "Иван Иванов",
    description:
      "Здесь продается оригинальная продукция: кроссовки и стритвир. Все вещи с чеками и гарантией подлинности. Быстрая доставка по всей России",
    handle: "@ivan_ivanov",
    email: "ivanivanov@example.com",
    verified: false,
    rating: 4.8,
    reviewsCount: 12,
    productsCount: 24,
    followersCount: 180,
    followingCount: 50,
    favouriteProducts: [],
    photos: ["/images/product.png", "/images/product.png"],
    createdAt: "2023-08-15T10:23:00.000Z",
    isHonest: true,
    online: true,
  },
  {
    id: "3",
    isMe: false,
    avatar: "/images/avatar.png",
    name: "Мария Смирнова",
    description:
      "Здесь продается оригинальная продукция: кроссовки и стритвир. Все вещи с чеками и гарантией подлинности. Быстрая доставка по всей России",
    handle: "@maria_smirnova",
    verified: true,
    rating: 4.9,
    reviewsCount: 56,
    productsCount: 40,
    followersCount: 300,
    followingCount: 120,
    favouriteProducts: ["1", "2", "4", "5", "10", "9"],
    isFollowing: true,
    createdAt: "2023-07-15T10:23:00.000Z",
    isHonest: true,
    online: false,
  },
];
