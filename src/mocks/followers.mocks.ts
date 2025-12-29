export type FollowerData = {
  id: string;
  name: string;
  handle: string;
  avatar: string;
  isFollowing: boolean;
};

export const FOLLOWERS_DATA: FollowerData[] = [
  {
    id: "1",
    name: "Иван Иванов",
    handle: "@ivan",
    avatar: "/images/avatar.png",
    isFollowing: true,
  },
  {
    id: "2",
    name: "Мария Петрова",
    handle: "@maria",
    avatar: "/images/avatar.png",
    isFollowing: false,
  },
  {
    id: "3",
    name: "Алексей Сидоров",
    handle: "@alex",
    avatar: "/images/avatar.png",
    isFollowing: true,
  },
  {
    id: "4",
    name: "Ольга Кузнецова",
    handle: "@olga",
    avatar: "/images/avatar.png",
    isFollowing: false,
  },
   {
    id: "5",
    name: "Ольга Молодцова",
    handle: "@olya",
    avatar: "/images/avatar.png",
    isFollowing: false,
  },
   {
    id: "6",
    name: "Нина Харламова",
    handle: "@nina",
    avatar: "/images/avatar.png",
    isFollowing: false,
  },
];
