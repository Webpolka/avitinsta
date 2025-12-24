import ProductCard from "./productCard";
import type { ProductCardData } from "./productCard";

interface ProductsCatalogProps {
  items: ProductCardData[];
}

export default function ProductsCatalog({ items }: ProductsCatalogProps) {
  return (
    <div className="h-full lg:border-l lg:border-grayscale-100">
      <div className="pl-0 lg:pl-7.5 pt-7.5 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4 gap-y-16 gap-x-4 lg:gap-x-5 lg:gap-x-5 mb-[150px]">
        {items.map((product, index) => (
          <ProductCard
            key={product.id + index}
            data={product}
            className="hiddenMobileUser"
          />
        ))}
      </div>
    </div>
  );
}



