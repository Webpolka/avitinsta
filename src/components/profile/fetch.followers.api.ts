import { FOLLOWERS_DATA, type FollowerData } from "@/mocks/followers.mocks";

// Здесь потом можно будет получить всех подписчиков по UserId 
export function fetchFollowers(userId: string): Promise<FollowerData[]> {
  console.log(
    "Здесь потом можно будет получить всех подписчиков по UserId :",
    userId
  );

  //   Пока что просто возвращаем всех из мокоданных
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(FOLLOWERS_DATA);
    }, 800); // имитация задержки сервера
  });
}
