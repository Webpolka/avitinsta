export type Comment = {
  id: string;

  lookId: string;
  userId: string;

  parentId?: string | null;

  text: string;
  likesCount: number;
  isLiked?: boolean;

  createdAt: string;
};


export const COMMENTS_DATA: Comment[] = [
  // ===== ROOT COMMENTS =====

  {
    id: "c1",
    lookId: "l1",
    userId: "1",
    text: "Очень стильный образ прямо в самое сердечко.",
    likesCount: 128,
    isLiked: false,
    createdAt: "2024-06-01",
  },

  {
    id: "c2",
    lookId: "l1",
    userId: "2",
    text: "Цвета идеально сочетаются, выглядит дорого.",
    likesCount: 76,
    isLiked: true,
    createdAt: "2024-06-01",
  },

  {
    id: "c3",
    lookId: "l1",
    userId: "3",
    text: "Где можно найти похожий пиджак?",
    likesCount: 34,
    createdAt: "2024-06-02",
  },

  {
    id: "c4",
    lookId: "l1",
    userId: "4",
    text: "Очень атмосферное фото",
    likesCount: 19,
    createdAt: "2024-06-02",
  },

  {
    id: "c5",
    lookId: "l1",
    userId: "5",
    text: "Такой стиль всегда актуален, класс!",
    likesCount: 52,
    createdAt: "2024-06-03",
  },

  // ===== REPLIES TO c1 (6 replies) =====

  {
    id: "r1",
    lookId: "l1",
    userId: "2",
    parentId: "c1",
    text: "Полностью согласен, образ очень сильный.",
    likesCount: 14,
    createdAt: "2024-06-01",
  },

  {
    id: "r2",
    lookId: "l1",
    userId: "3",
    parentId: "c1",
    text: "Особенно обувь решает весь образ.",
    likesCount: 9,
    createdAt: "2024-06-01",
  },

  {
    id: "r3",
    lookId: "l1",
    userId: "4",
    parentId: "c1",
    text: "Да, минимализм тут очень к месту.",
    likesCount: 6,
    createdAt: "2024-06-02",
  },

  {
    id: "r4",
    lookId: "l1",
    userId: "5",
    parentId: "c1",
    text: "Сохранила себе как реф",
    likesCount: 11,
    createdAt: "2024-06-02",
  },

  {
    id: "r5",
    lookId: "l1",
    userId: "6",
    parentId: "c1",
    text: "Хочется повторить такой же лук.",
    likesCount: 4,
    createdAt: "2024-06-03",
  },

  {
    id: "r6",
    lookId: "l1",
    userId: "1",
    parentId: "c1",
    text: "Спасибо всем за отклик",
    likesCount: 22,
    isLiked: true,
    createdAt: "2024-06-03",
  },
];
