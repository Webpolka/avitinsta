

export interface CategoryData {
  id: string;
  title: string;
  image?: string;
  link?: string;
}

export const CATEGORIES_DATA: CategoryData[] = [
  {
    id:"1",
    title: 'Мужская одежда',
    image: '/images/categories/cat-1.png',
    link: '/category/men',
  },
  {
    id:"2",
    title: 'Женская одежда',
    image: '/images/categories/cat-2.png',
    link: '/category/women',
  },
  {
    id:"3",
    title: 'Обувь',
    image: '/images/categories/cat-3.png',
    link: '/category/shoes',
  },
  {
    id:"4",
    title: 'Аксессуары',
    image: '/images/categories/cat-4.png',
    link: '/category/accessories',
  },
  {
    id:"5",
    title: 'Спорт',
    image: '/images/categories/cat-5.png',
    link: '/category/sport',
  },
  {
    id:"6",
    title: 'Детям',
    image: '/images/categories/cat-6.png',
    link: '/category/kids',
  },
  {
    id:"7",
    title: 'Опубликуй свой стиль',
    image: '/images/categories/cat-7.png',
    link: '/upload',
  },
];