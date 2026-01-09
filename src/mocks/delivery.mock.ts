
export interface DeliveryOption {
  id: string;
  method: string;
  description: string;
  enabled: boolean;
  image?: string;
}

export const DELIVERY_DATA: DeliveryOption[] = [
  // {
  //   id: "22",
  //   method: "Самовывоз",
  //   description: "Вы можете забрать товар самостоятельно",
  //   enabled: true,
  //   image: "",
  // },
  {
    id: "33",
    method: "CDEK",
    description: "Доставка службой CDEK",
    enabled: true,
    image: "/images/delivery/cdek.png",
  },
  {
    id: "44",
    method: "Boxberry",
    description: "Доставка службой Boxberry",
    enabled: true,
    image: "/images/delivery/boxberry.png",
  },
  {
    id: "55",
    method: "Яндекс доставка",
    description: "Яндекс пункт выдачи службой",
    enabled: true,
    image: "/images/delivery/yandex_dostavka.png",
  },
  {
    id: "66",
    method: "Почта России",
    description: "Доставка почтой России",
    enabled: true,
    image: "/images/delivery/russian_post.png",
  },
];
