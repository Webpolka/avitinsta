import { useState } from "react";
import StarRating from "@/ui/star-rating";
import Button from "@/ui/button";
import styles from "@/styles/utilities.module.scss";

import { type UserProfileDataType } from "@/mocks/profile-user.mock";

type UserProfileHeaderProps = {
  user: UserProfileDataType;
  onFollowToggle?: (id: string) => void; // для кнопки подписки
};

export function UserProfileHeaderHistory({
  user,
  onFollowToggle,
}: UserProfileHeaderProps) {
  const [isFollowing, setIsFollowing] = useState(user.isFollowing ?? false);

  const handleFollowClick = () => {
    setIsFollowing(!isFollowing);
    if (onFollowToggle) onFollowToggle(user.id);
  };

  return (
    <div className="flex flex-col gap-5 mb-7">
      <div className="flex flex-col flex-wrap sm:flex-row gap-6 sm:gap-9 sm:items-start">
        <div className="flex gap-8">
          {/* Аватар */}
          <div className="flex-shrink-0 relative">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-25 h-25 rounded-full object-cover border-2 border-gray-200"
            />
          </div>

          {/* Основная информация */}
          <div className="flex flex-col gap-1">
            {/* Имя и кнопка подписки */}
            <h1 className="ag-h1 font-semibold text-secondary flex flex-nowrap gap-4">
              <span className="whitespace-nowrap">{user.name}</span>
              <svg className="w-8 h-8 aspect-square inline-block">
                <use href="/icons/symbol/sprite.svg#done" />
              </svg>
            </h1>

            {/* Handle */}
            <p className="text-grayscale-700 ag-h3 mb-1">{user.handleName}</p>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <span className="ag-h8 text-secondary font-medium">
                {user.rating.toFixed(1)}
              </span>
              <StarRating rating={user.rating} size={16} gap={1} />
              <span className="ag-h8 text-secondary font-medium">
                — {user.reviewsCount} отзыва
              </span>
            </div>
          </div>
        </div>

        <Button
          onClick={handleFollowClick}
          className={`self-start px-4 cursor-pointer ag-h8 min-h-11 font-medium min-w-[150px] ${
            isFollowing
              ? "bg-grayscale-300 text-secondary"
              : "bg-secondary text-grayscale-white hover:opacity-90"
          }`}
        >
          {isFollowing ? "Отписаться" : "Подписаться"}
        </Button>
      </div>

      {/* Статистика */}
      <div className="flex gap-5">
        <div className={`${styles.justifyBetween440} flex sm:gap-10 mt-2`}>
          <span className="flex flex-col gap-1">
            <span className="font-semibold text-secondary ag-h1">
              {user.productsCount}
            </span>{" "}
            <span className="ag-h4 text-grayscale-700 font-medium">товара</span>
          </span>
          {/* Кнопка показать подписчиков */}
          <button className="flex flex-col gap-1 cursor-pointer">
            <span className="font-semibold text-secondary ag-h1">
              {user.followersCount}
            </span>{" "}
            <span className="ag-h4 text-grayscale-700 font-medium">
              подписчиков
            </span>
          </button>
          {/* Кнопка показать на кого вы подписаны */}
          <button className="flex flex-col gap-1 cursor-pointer">
            <span className="font-semibold text-secondary  ag-h1">
              {user.followingCount}
            </span>{" "}
            <span className="ag-h4 text-grayscale-700 font-medium">
              подписки
            </span>
          </button>
        </div>
      </div>
      {/* Краткое описание профиля */}
      <div className="ag-h6 font-medium text-grayscale-700 pt-2">
        <p>{user.description}</p>
      </div>
    </div>
  );
}
