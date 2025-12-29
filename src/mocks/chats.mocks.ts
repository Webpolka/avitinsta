import { type ProductCardData } from "./products.mock";
import { type User } from "./users.mocks";

export type Message = {
  id: string;
  senderId: string; // кто отправил
  text: string;
  time: string; // ISO string
};

export type Chat = {
  id: string;
  participant: User; // другой пользователь
  product: ProductCardData; // обсуждаемый товар
  messages: Message[];
  unreadCount: number; // количество непрочитанных сообщений
  pinned?: boolean;
};

export const CHATS_DATA: Chat[] = [
  {
    id: "1",
    participant: {
      id: "2",
      name: "Служба поддержки",
      handle: "@alex",
      avatar: "/images/avatar.png",
      online: true,
    },
    product: {
      id: "1",
      title: "Кросы",
      brand: "Nike Jordan",
      images: ["/images/products/product.png"],
      price: 350,
    },
    messages: [
      {
        id: "1",
        senderId: "2",
        text: "Привет! Товар еще актуален?",
        time: "2025-11-29T12:30:00Z",
      },
      {
        id: "2",
        senderId: "1",
        text: "Да, есть в наличии.",
        time: "2025-11-29T12:32:00Z",
      },
    ],
    pinned: true,
    unreadCount: 1,
  },
  {
    id: "2",
    participant: {
      id: "2",
      name: "Алексей",
      handle: "@alex",
      avatar: "/images/avatar.png",
      online: true,
    },
    product: {
      id: "2",
      title: "Куртка спортивная",
      brand: "Adidas",
      images: ["/images/product.png"],
      price: 350,
    },
    messages: [
      {
        id: "1",
        senderId: "2",
        text: "Хочу эту куртку !",
        time: "2025-12-29T12:30:00Z",
      },
      {
        id: "2",
        senderId: "1",
        text: "Считай она уже твоя !",
        time: "2025-12-29T12:32:00Z",
      },
    ],
    unreadCount: 0,
  },
  {
    id: "3",
    participant: {
      id: "2",
      name: "Алексей",
      handle: "@alex",
      avatar: "/images/avatar.png",
      online: true,
    },
    product: {
      id: "3",
      title: "Джинсы",
      brand: "Levi's",
      images: ["/images/product.png"],
      price: 350,
    },
    messages: [
      {
        id: "1",
        senderId: "2",
        text: "Хочу эту куртку !",
        time: "2025-10-29T12:30:00Z",
      },
      {
        id: "2",
        senderId: "1",
        text: "Считай она уже твоя !",
        time: "2025-10-29T12:32:00Z",
      },
    ],
    unreadCount: 0,
  },
  {
    id: "4",
    participant: {
      id: "1",
      name: "Мария",
      handle: "@maria",
      avatar: "/images/avatar.png",
      online: false,
    },
    product: {
      id: "2",
      title: "Куртка спортивная",
      brand: "Adidas",
      images: ["/images/product.png"],
      price: 1200,
    },
    messages: [
      {
        id: "3",
        senderId: "3",
        text: "Спасибо за быструю отправку!",
        time: "2025-12-31T16:00:00Z",
      },
    ],
    unreadCount: 0,
  },
];
