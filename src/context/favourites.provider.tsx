import { useState, useEffect, type ReactNode } from "react";
import { FavouritesContext, type FavouriteItem } from "./favourites.context";
import { useUser } from "@/context/use.all";

type Props = {
  children: ReactNode;
};

export function FavouritesProvider({ children }: Props) {
  const { user } = useUser();

  const [items, setItems] = useState<FavouriteItem[]>(() => {
    const saved = localStorage.getItem("favourites");
    return saved ? JSON.parse(saved) : [];
  });

  /* ===============================
     LOCAL STORAGE
  =============================== */
  useEffect(() => {
    localStorage.setItem("favourites", JSON.stringify(items));
  }, [items]);

  /* ===============================
     SERVER SYNC (FAKE)
  =============================== */
  useEffect(() => {
    if (!user) return;

    async function syncWithServer() {
      console.log(" Sync favourites with server...");

      await new Promise((res) => setTimeout(res, 800));

      console.log(" Favourites Synced");
    }

    syncWithServer();
  }, [items, user]);

  /* ===============================
     ACTIONS
  =============================== */
  const addItem = (item: FavouriteItem) => {
    setItems((prev) => {
      const exists = prev.some((i) => i.productId === item.productId);
      if (exists) return prev;

      return [...prev, item];
    });
  };

  const removeItem = (productId: string) => {
    setItems((prev) => prev.filter((i) => i.productId !== productId));
  };

  const isInFavourites = (productId: string) => {
    return items.some((i) => i.productId === productId);
  };

  return (
    <FavouritesContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        isInFavourites,
      }}
    >
      {children}
    </FavouritesContext.Provider>
  );
}
