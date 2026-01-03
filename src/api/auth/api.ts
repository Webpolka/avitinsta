import axios from "axios";

// базовый instance
export const api = axios.create({
  baseURL: "/api", // твой бэкенд
  withCredentials: true, // чтобы httpOnly cookie автоматически уходили на сервер
});

// глобальная обработка 401 и refresh token
api.interceptors.response.use(
  (res) => res,
  async (error) => {
    if (error.response?.status === 401) {
      try {
        // пробуем обновить токен
        await api.post("/refresh-token");
        return api.request(error.config); // повторяем исходный запрос
      } catch {
        // если не удалось обновить токен, пользователь не авторизован
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);
