import { format } from "date-fns";
import { ru } from "date-fns/locale";

export const getMessageTime = (dateString: string) => {
  const msgDate = new Date(dateString);
  const now = new Date();

  // Для сравнения дней используем локальные методы
  const msgDay = msgDate.getDate();
  const msgMonth = msgDate.getMonth();
  const msgYear = msgDate.getFullYear();

  const nowDay = now.getDate();
  const nowMonth = now.getMonth();
  const nowYear = now.getFullYear();

  // Сегодня
  if (msgDay === nowDay && msgMonth === nowMonth && msgYear === nowYear) {
    return format(msgDate, "HH:mm", { locale: ru });
  }

  // Вчера
  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);
  if (msgDay === yesterday.getDate() && msgMonth === yesterday.getMonth() && msgYear === yesterday.getFullYear()) {
    return `Вчера ${format(msgDate, "HH:mm", { locale: ru })}`;
  }

  // В этом году
  if (msgYear === nowYear) {
    return format(msgDate, "d MMMM HH:mm", { locale: ru });
  }

  // Прошлые годы
  return format(msgDate, "d MMMM yyyy HH:mm", { locale: ru });
};
