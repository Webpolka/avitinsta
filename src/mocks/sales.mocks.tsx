export type SaleStatus =
  | "Оплачен"
  | "Готовится к отправке"
  | "Едет к получателю"
  | "Отменен"
  | "Завершен";


export type SaleData = {
  id: string;
  productName: string;
  productImage: string;
  price: number;
  buyerName: string;
  status: SaleStatus;
};

export const SALES_DATA: SaleData[] = [
  {
    id: "1",
    productName: "Ноутбук Lenovo Legion 5",
    price: 75000,
    buyerName: "Иван Петров",
    status: "Готовится к отправке",
    productImage: "/images/lenovo.jpg",
  },
  {
    id: "2",
    productName: "Смартфон Samsung Galaxy S21",
    price: 45000,
    buyerName: "Мария Иванова",
    status: "Едет к получателю",
    productImage: "/images/samsung.jpg",
  },
  {
    id: "3",
    productName: "Игровая приставка PlayStation 5",
    price: 55000,
    buyerName: "Алексей Смирнов",
    status: "Завершен",
    productImage: "/images/ps5.jpg",
  },
  {
    id: "4",
    productName: "Наушники Bose QuietComfort",
    price: 18000,
    buyerName: "Ольга Кузнецова",
    status: "Отменен",
    productImage: "/images/bose.jpg",
  },
  {
    id: "5",
    productName: "Планшет iPad Air",
    price: 60000,
    buyerName: "Дмитрий Соколов",
    status: "Отменен",
    productImage: "/images/ipad.jpg",
  },
];
