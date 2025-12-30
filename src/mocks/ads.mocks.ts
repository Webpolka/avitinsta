export type Ad = {
  id: string | number;
  image: string;
  title: string;
  price?: number;
  buyerName?: string;
  status?: string;
  plannedDate?: string;
  views?: number;
  likes?: number;
};

export const ADS_DATA: Ad[] = [
  {
    id: "1",
    title: "Игровой ноутбук Lenovo",
    price: 90000,
    status: "active",
    views: 123,
    likes: 45,
    image: "/images/laptop.jpg",
  },
  {
    id: "2",
    title: "Кресло для геймеров",
    price: 15000,
    status: "sold",
    views: 210,
    likes: 30,
    image: "/images/chair.jpg",
  },
  {
    id: "3",
    title: "Смартфон iPhone 13",
    price: 75000,
    status: "draft",
    views: 80,
    likes: 10,
    image: "/images/iphone.jpg",
  },
  {
    id: "4",
    title: "Планшет Samsung Galaxy Tab",
    price: 45000,
    status: "active",
    views: 95,
    likes: 22,
    image: "/images/galaxy-tab.jpg",
  },
  {
    id: "5",
    title: "Наушники Sony WH-1000XM4",
    price: 25000,
    status: "active",
    views: 130,
    likes: 35,
    image: "/images/sony-headphones.jpg",
  },
];
