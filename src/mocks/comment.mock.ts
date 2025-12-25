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
  {
    id: "c1",
    lookId: "l1",
    userId: "1",
    text: "Очень стильный образ 🔥",
    likesCount: 12,
    isLiked: false,
    createdAt: "2024-06-02",
  },
  {
    id: "c2",
    lookId: "l1",
    userId: "1",
    parentId: "c1",
    text: "Согласен, выглядит круто",
    likesCount: 3,
    createdAt: "2024-06-02",
  },
  {
    id: "c3",
    lookId: "l1",
    userId: "2",
    text: "Спасибо ❤️",
    likesCount: 5,
    createdAt: "2024-06-03",
  },
];
