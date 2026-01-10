export interface CategoryData {
  id: string;
  title: string;
  image?: string;
  link?: string;
}

export const CATEGORIES_DATA: CategoryData[] = [
  {
    id:"1",
    title: 'Мужская обувь',
    image: '/images/categories-webp/cat-1.webp',
    link: '/category/men-shoes',
  },
  {
    id:"2",
    title: 'Мужская одежда',
    image: '/images/categories-webp/cat-2.webp',
    link: '/category/men-clothes',
  },
  {
    id:"3",
    title: 'Аксессуары',
    image: '/images/categories-webp/cat-3.webp',
    link: '/category/accessories',
  },
  {
    id:"4",
    title: 'Женская обувь',
    image: '/images/categories-webp/cat-4.webp',
    link: '/category/woman-shoes',
  },
  {
    id:"5",
    title: 'Женская одежда',
    image: '/images/categories-webp/cat-5.webp',
    link: '/category/woman-clothes',
  },
  {
    id:"6",
    title: 'Сумки',
    image: '/images/categories-webp/cat-6.webp',
    link: '/category/bags',
  },
  {
    id:"7",
    title: 'Опубликуй свой стиль',
    image: '/images/categories-webp/cat-7.webp',
    link: '/category/add',
  },
];