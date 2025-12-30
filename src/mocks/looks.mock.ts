import { type User } from "./users.mocks";
import { USERS_DATA } from "./users.mocks";

export interface Look {
  id: string;
  user: User;
  image?: string;

  description?: string;
  hashtags?: string[];

  viewsCount?: number;
  likesCount?: number;
  commentsCount?: number;

  isLiked?: boolean;
  isSaved?: boolean;

  createdAt?: string;
}

export const LOOKS_DATA: Look[] = [
  {
    id: "l1",
    user: USERS_DATA[0],
    image: "/images/kukai.webp",
    description: "Мой повседневный образ на осень 🍂",
    hashtags: ["осень", "streetstyle", "casual"],

    viewsCount: 3000,
    likesCount: 124,
    commentsCount: 18,

    isLiked: true,
    isSaved: true,
  },
   {
    id: "l1",
    user: USERS_DATA[0],
    image: "/images/kukai.webp",
    description: "Мой повседневный образ на осень 🍂",
    hashtags: ["осень", "streetstyle", "casual"],

    viewsCount: 3000,
    likesCount: 124,
    commentsCount: 18,

    isLiked: true,
    isSaved: true,
  },
   {
    id: "l1",
    user: USERS_DATA[0],
    image: "/images/kukai.webp",
    description: "Мой повседневный образ на осень 🍂",
    hashtags: ["осень", "streetstyle", "casual"],

    viewsCount: 3000,
    likesCount: 124,
    commentsCount: 18,

    isLiked: true,
    isSaved: true,
  },
   {
    id: "l1",
    user: USERS_DATA[0],
    image: "/images/kukai.webp",
    description: "Мой повседневный образ на осень 🍂",
    hashtags: ["осень", "streetstyle", "casual"],

    viewsCount: 3000,
    likesCount: 124,
    commentsCount: 18,

    isLiked: true,
    isSaved: true,
  },
    
  {
    id: "l2",
    user: USERS_DATA[1],
     image: "/images/kukai.webp",
    description: "Минимализм и комфорт",
    hashtags: ["minimal", "black", "style"],

    viewsCount: 870,
    likesCount: 312,
    commentsCount: 45,

    isLiked: false,
    isSaved: false,
  },
];
