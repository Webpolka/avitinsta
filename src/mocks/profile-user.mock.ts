// types/userProfile.ts
export type UserProfileDataType = {
  id: string; // уникальный ID пользователя
  isMe: boolean; // это мой профиль или чужой
  avatar?: string; // URL аватара
  name: string; // Имя пользователя
  description?: string;
  handleName?: string; // @handle
  verified: boolean; // статус "зелёная галочка" для чужого
  rating: number; // рейтинг пользователя
  reviewsCount: number; // количество отзывов
  productsCount: number; // количество товаров на площадке
  followersCount: number; // подписчики
  followingCount: number; // подписки
  isFollowing?: boolean; // подписка на чужого пользователя
  photos?: string[]; // личные фотографии (только для своего профиля)
};

export const USER_PROFILES: UserProfileDataType[] = [  
  {
    id: "1",
    isMe: true,
    avatar: "/images/avatar.png",
    name: "Петр Петров",
    description:
      "Здесь продается оригинальная продукция: кроссовки и стритвир. Все вещи с чеками и гарантией подлинности. Быстрая доставка по всей России",
    handleName: "@aleksei_petrov",
    verified: true,
    rating: 4.2,
    reviewsCount: 34,
    productsCount: 15,
    followersCount: 120,
    followingCount: 80,
    isFollowing: false,
     photos: ["/images/product.png", "/images/product.png"],
  },
  {
    id: "2",
    isMe: false,
    avatar: "/images/avatar.png",
    name: "Иван Иванов",
    description:
      "Здесь продается оригинальная продукция: кроссовки и стритвир. Все вещи с чеками и гарантией подлинности. Быстрая доставка по всей России",
    handleName: "@ivan_ivanov",
    verified: false,
    rating: 4.8,
    reviewsCount: 12,
    productsCount: 24,
    followersCount: 180,
    followingCount: 50,
    photos: ["/images/product.png", "/images/product.png"],
  },
  {
    id: "3",
    isMe: false,
    avatar: "/images/avatar.png",
    name: "Мария Смирнова",
    description:
      "Здесь продается оригинальная продукция: кроссовки и стритвир. Все вещи с чеками и гарантией подлинности. Быстрая доставка по всей России",
    handleName: "@maria_smirnova",
    verified: true,
    rating: 4.9,
    reviewsCount: 56,
    productsCount: 40,
    followersCount: 300,
    followingCount: 120,
    isFollowing: true,
  },
];
