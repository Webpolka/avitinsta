export interface User {
  id: string;

  // базовые данные
  name: string;
  avatar?: string;
  handle?: string;
  background?: string;

  // контакты
  email?: string;

  // метрики продавца
  rating?: number;        // средний рейтинг
  reviews?: number;  // кол-во отзывов

  // системные поля
  createdAt: string;      // ISO дата
}


export const USERS_DATA: User[] = [
  {
    id: "1",
    name: "Пётр Петров",
    avatar: "/images/avatar.png",
    handle: "@petrstyle",
    background: "/images/bg.jpg",
    email: "petr.petrov@example.com",

    rating: 3,
    reviews: 22,

    createdAt: "2023-08-15T10:23:00.000Z",
  },

  {
    id: "2",
    name: "Иван Иванов",
    avatar: "/images/avatar.png",
    handle: "@ivanstyle",
    email: "ivanivanov@example.com",

    rating: 3.4,
    reviews: 134,

    createdAt: "2022-04-02T18:40:00.000Z",
  },
];
