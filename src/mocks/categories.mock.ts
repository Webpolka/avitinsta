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
    image: '/images/categories/cat-1.png',
    link: '/category/men-shoes',
  },
  {
    id:"2",
    title: 'Мужская одежда',
    image: '/images/categories/cat-2.png',
    link: '/category/men-clothes',
  },
  {
    id:"3",
    title: 'Аксессуары',
    image: '/images/categories/cat-3.png',
    link: '/category/accessories',
  },
  {
    id:"4",
    title: 'Женская обувь',
    image: '/images/categories/cat-4.png',
    link: '/category/woman-shoes',
  },
  {
    id:"5",
    title: 'Женская одежда',
    image: '/images/categories/cat-5.png',
    link: '/category/woman-clothes',
  },
  {
    id:"6",
    title: 'Сумки',
    image: '/images/categories/cat-6.png',
    link: '/category/bags',
  },
  {
    id:"7",
    title: 'Опубликуй свой стиль',
    image: '/images/categories/cat-7.png',
    link: '/category/add',
  },
];