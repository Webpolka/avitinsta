// Отзыв
export type SellerReview = {
  id: string;
  type: "seller" | "product";

  rating: number; // 1–5
  text: string;

  author: string;
  date: string; // ISO

  // только для product-отзывов
  productId?: string;
  productTitle?: string;
  photos?: string[];
};


// Статистика рейтинга (считается из отзывов)
export type RatingDistributionRow = {
  stars: number;
  count: number;
  percentage: number;
};

export type SellerRatingStats = {
  averageRating: number;
  totalReviews: number;
  distribution: RatingDistributionRow[];
};

// Продавец
export type SellerData = {
  id: string;
  name: string;
  avatarUrl: string;

  sellerRating: SellerRatingStats;   // рейтинг продавца
  productRating: SellerRatingStats;  // рейтинг по сделкам

  reviews: SellerReview[];
};



export const SELLER_DATA: SellerData = {
  id: "2",
  name: "Иван Иванов",
  avatarUrl: "/images/avatar.png",

  // ----------------------------
  // РЕЙТИНГ ПРОДАВЦА
  // ----------------------------
  sellerRating: {
    averageRating: 1.0,
    totalReviews: 22,
    distribution: [
      { stars: 5, count: 0, percentage: 0 },
      { stars: 4, count: 0, percentage: 0 },
      { stars: 3, count: 0, percentage: 0 },
      { stars: 2, count: 0, percentage: 0 },
      { stars: 1, count: 22, percentage: 100 },
    ],
  },

  // ----------------------------
  // РЕЙТИНГ ПО СДЕЛКАМ / ТОВАРАМ
  // ----------------------------
  productRating: {
    averageRating: 4.5,
    totalReviews: 2,
    distribution: [
      { stars: 5, count: 1, percentage: 50 },
      { stars: 4, count: 1, percentage: 50 },
      { stars: 3, count: 0, percentage: 0 },
      { stars: 2, count: 0, percentage: 0 },
      { stars: 1, count: 0, percentage: 0 },
    ],
  },

  // ----------------------------
  // ОТЗЫВЫ
  // ----------------------------
  reviews: [
    // --- отзывы о продавце ---
    {
      id: "seller-review-1",
      type: "seller",
      rating: 1,
      text: "Продавец долго отвечал и не выходил на связь.",
      author: "Алексей Петров",
      date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    },

    {
      id: "seller-review-2",
      type: "seller",
      rating: 1,
      text: "Очень плохая коммуникация.",
      author: "Мария Иванова",
      date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    },

    // --- отзывы по сделкам / товарам ---
    {
      id: "product-review-1",
      type: "product",
      productId: "product-1",
      productTitle: "Nike Air Force 1",
      rating: 5,
      text: "Кроссовки в идеальном состоянии, всё супер!",
      photos: [
        "/images/product.png",
        "/images/product.png",
        "/images/product.png",
        "/images/product.png",
        "/images/product.png",
        "/images/product.png",
      ],
      author: "Сергей Кузнецов",
      date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    },

    {
      id: "product-review-2",
      type: "product",
      productId: "product-2",
      productTitle: "Adidas Yeezy Boost",
      rating: 4,
      text: "Товар хороший, но коробка была помята.",
      photos: ["/images/reviews/yeezy-1.jpg"],
      author: "Екатерина Смирнова",
      date: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    },
  ],
};
