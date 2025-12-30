export type SaleStatus =
  | "Оплачен - готов к отправке"  
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
    productName: "The row",
    price: 76000,
    buyerName: "Smakerlover",
    status: "Оплачен - готов к отправке",
    productImage: "/images/lenovo.jpg",
  },
  {
    id: "2",
    productName: "The row",
    price: 76000,
    buyerName: "Smakerlover",
    status: "Едет к получателю",
    productImage: "/images/samsung.jpg",
  },
  {
    id: "3",
    productName: "The row",
    price: 76000,
    buyerName: "Smakerlover",
    status: "Завершен",
    productImage: "/images/ps5.jpg",
  },
  {
    id: "4",
    productName: "The row",
    price: 76000,
    buyerName: "Smakerlover",
    status: "Отменен",
    productImage: "/images/bose.jpg",
  },
  {
    id: "5",
    productName: "The row",
    price: 76000,
    buyerName: "Smakerlover",
    status: "Отменен",
    productImage: "/images/ipad.jpg",
  },
];
