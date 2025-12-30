
export type PurchaseData = {
  id: string;
  productName: string;
  productImage: string;
  price: number;
  trackNumber: string;
  status: "В пути" | "Доставлен" | "Отменен";
  plannedDate?: string; // пример: "25.11.2025"
};


export const PURCHASES_DATA: PurchaseData[] = [
  {
    id: "1",
    productName: "The row",
    price: 76000,
    status: "В пути",
    trackNumber: "TRK123456",
    plannedDate: "2025.12.31",
    productImage: "/images/mouse.jpg",
  },
  {
    id: "2",
    productName: "The row",
    price: 76000,
    status: "Доставлен",
    trackNumber: "TRK987654",    
    productImage: "/images/monitor.jpg",
  },
  {
    id: "3",
    productName: "The row",
    price: 76000,
    status: "Отменен",
    trackNumber: "TRK456789",    
    productImage: "/images/keyboard.jpg",
  },
  {
    id: "4",
    productName: "The row",
    price: 76000,
    status: "Доставлен",
    trackNumber: "TRK654321",    
    productImage: "/images/ssd.jpg",
  },
  {
    id: "5",
    productName: "The row",
    price: 76000,
    status: "В пути",
    trackNumber: "TRK321654",
    plannedDate: "2025.12.30",
    productImage: "/images/gamepad.jpg",
  },
];
