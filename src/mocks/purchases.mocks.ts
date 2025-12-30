
export type PurchaseData = {
  id: string;
  productName: string;
  productImage: string;
  price: number;
  trackNumber: string;
  status: "В пути" | "Доставлен" | "Отменено";
  plannedDate: string; // пример: "25.11.2025"
};


export const PURCHASES_DATA: PurchaseData[] = [
  {
    id: "1",
    productName: "Игровая мышь Logitech G502",
    price: 3500,
    status: "В пути",
    trackNumber: "TRK123456",
    plannedDate: "2025-12-31",
    productImage: "/images/mouse.jpg",
  },
  {
    id: "2",
    productName: "Монитор Dell 27\"",
    price: 22000,
    status: "Доставлен",
    trackNumber: "TRK987654",
    plannedDate: "2025-12-25",
    productImage: "/images/monitor.jpg",
  },
  {
    id: "3",
    productName: "Клавиатура Razer BlackWidow",
    price: 12000,
    status: "Отменено",
    trackNumber: "TRK456789",
    plannedDate: "2025-12-28",
    productImage: "/images/keyboard.jpg",
  },
  {
    id: "4",
    productName: "Внешний SSD Samsung T7",
    price: 9000,
    status: "Доставлен",
    trackNumber: "TRK654321",
    plannedDate: "2025-12-20",
    productImage: "/images/ssd.jpg",
  },
  {
    id: "5",
    productName: "Геймпад Xbox Series X",
    price: 6500,
    status: "В пути",
    trackNumber: "TRK321654",
    plannedDate: "2025-12-30",
    productImage: "/images/gamepad.jpg",
  },
];
