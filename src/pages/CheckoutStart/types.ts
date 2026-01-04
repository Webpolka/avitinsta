import { type ProductCardData } from "@/mocks/products.mock";
import { type User } from "@/mocks/users.mocks";

// Товар в корзине — продукт + опциональный продавец
export type CartItemType = ProductCardData & {
  seller?: Pick<User, "id" | "name" | "avatar" | "isHonest">;
};
