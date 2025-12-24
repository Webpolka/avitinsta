import { Link } from 'react-router';
import styles from '@/components/categories/categories.module.scss';
import { type CategoryData } from '@/mocks/categories.mock';

type CardProps = CategoryData;
interface CategoriesProps {
  items: CategoryData[];
}

function Card({id, title, image, link }: CardProps) {
  return (    
    <div className={styles.categoriesCol}>
      <Link id={`category-${id}`} to={link}  className={`group ${styles.categoriesCard}`}>
        <img
          loading="lazy"   // lazy-loading
          src={image}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover object-center "
        />
        <h2 className="relative z-10 ag-h1 text-white group-hover:text-grayscale-300 text-center">{title}</h2>
      </Link>
    </div>
  );
}

function CardTall({id, title, image, link }: CardProps) {
  return (
    <div className={styles.categoriesColfull}>
    <Link id={`category-${id}`} to={link}  className={`group ${styles.categoriesCardfull}`}>
        <img
          loading="lazy"   // lazy-loading
          src={image}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
         <h2 className="relative z-10 ag-h1 text-white group-hover:text-grayscale-300 text-center">{title}</h2>
      </Link>
    </div>
  );
}


export default function Categories({ items }: CategoriesProps) {
  return (
    <div className={styles.categories}>
      <div className={styles.categoriesLeft}>
        {items.slice(0, 6).map((item, index) => (
          <Card
            key={index}
            id={item.id}
            title={item.title}
            image={item.image}
            link={item.link}
          />
        ))}
      </div>

      <div className={styles.categoriesRight}>
        {items[6] && (
          <CardTall
            id={items[6].id}
            title={items[6].title}
            image={items[6].image}
            link={items[6].link}
          />
        )}
      </div>
    </div>
  );
}

