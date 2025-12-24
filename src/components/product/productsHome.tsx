import ProductCard, { type ProductCardData } from "./productCard";

interface ProductsHomeProps {
  items: ProductCardData[];
}

export default function ProductsHome({ items }: ProductsHomeProps) {
  return (
     <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-y-16 gap-x-4 sm:gap-x-5 md:gap-x-[6.5%] mb-[150px]">   
      {items.map((product, index) => (
        <ProductCard
          key={product.id}
          data={product}
          className={index >= 4 ? "hidden sm:flex" : ""}
        />
      ))}
    </div>
  );
}
