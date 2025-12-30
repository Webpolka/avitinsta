import { useParams } from "react-router-dom";
import { USERS_DATA } from "@/mocks/users.mocks";
import PurchasesHistory from "@/components/product/purchasesHistory";
import { PRODUCTS_DATA } from "@/mocks/products.mock";

export function PublicPurchaseHistory() {
  const { id } = useParams<{ id: string }>();

  const user = USERS_DATA.find((u) => u.id === id);

  if (!user) {
    return (
      <div className="p-5 max-w-5xl mx-auto">
        <p className="text-red-500">Пользователь не найден</p>
      </div>
    );
  }

  // фильтруем покупки по пользователю
  const userProducts = PRODUCTS_DATA.filter(
    (product) =>  product.seller &&  product.seller.id === id
  );

  return (
    <>
      {/* Контент таба */}
      {userProducts.length > 0 ? (
        <PurchasesHistory items={userProducts} />
      ) : (
        <h2 className="text-center font-medium text-grayscale-700">
          Пользователь не совершил ни одной покупки!
        </h2>
      )}
    </>
  );
}
