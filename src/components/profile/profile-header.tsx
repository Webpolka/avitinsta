import { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import Button from "@/ui/button";
import StarRating from "@/ui/star-rating";
import { type UserProfileDataType } from "@/mocks/profile-user.mock";
import styles from "@/styles/utilities.module.scss";

type PhotoItem = {
  id: string;
  src: string; // url или preview
  isNew: boolean; // новая фотография или из моков
};

type ProfileHeaderProps = {
  user: UserProfileDataType;
  mode: "private" | "public-with-media" | "public-no-media";
  photos: PhotoItem[];
  setPhotos: React.Dispatch<React.SetStateAction<PhotoItem[]>>;
  activeTab: string;
};

export function ProfileHeader({
  user,
  mode,
  activeTab,
  photos,
  setPhotos,
}: ProfileHeaderProps) {
  const [isFollowing, setIsFollowing] = useState(user.isFollowing ?? false);

  const handleFollowClick = () => {
    setIsFollowing(!isFollowing);
    console.log(`Подписка/отписка на пользователя ${user.id}`);
  };

  // Инициализация массива фото из моков только один раз
  useEffect(() => {
    if (mode === "private" && activeTab === "profile" && user.photos?.length) {
      const initialPhotos: PhotoItem[] = user.photos.map((url) => ({
        id: crypto.randomUUID(),
        src: url,
        isNew: false,
      }));
      setPhotos(initialPhotos);
    }
  }, [mode, activeTab, user.photos, setPhotos]);

  // Dropzone
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "image/*": [] },
    onDrop: (files) => {
      const newPhotos: PhotoItem[] = files.map((file) => ({
        id: crypto.randomUUID(),
        src: URL.createObjectURL(file),
        isNew: true,
      }));
      setPhotos((prev) => [...prev, ...newPhotos]);
    },
  });

  // Удаление фото по id
  const removePhoto = (id: string) => {
    setPhotos((prev) => prev.filter((photo) => photo.id !== id));
  };

  return (
    <div className="flex flex-col gap-5 mb-14">
      {/* шапка профиля */}
      <div className="flex flex-col sm:flex-row gap-6 sm:gap-9 sm:items-start">
        <div className="flex gap-8">
          <div className="flex-shrink-0 relative">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-25 h-25 rounded-full object-cover border-2 border-gray-200"
            />
          </div>
          <div className="flex flex-col gap-1">
            <h1 className="ag-h1 font-semibold text-secondary flex flex-nowrap gap-4">
              <span className="whitespace-nowrap">{user.name}</span>
              {mode !== "private" && (
                <svg className="w-8 h-8 aspect-square inline-block">
                  <use href="/icons/symbol/sprite.svg#done" />
                </svg>
              )}
            </h1>
            <p className="text-grayscale-700 ag-h3 mb-1">{user.handleName}</p>
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

        {mode !== "private" && (
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
        )}
      </div>

      {/* статистика */}
      <div className="flex gap-5">
        <div className={`${styles.justifyBetween440} flex sm:gap-10 mt-2`}>
          <span className="flex flex-col gap-1 items-start">
            <span className="font-semibold text-secondary ag-h1">
              {user.productsCount}
            </span>
            <span className="ag-h4 text-grayscale-700 font-medium">товара</span>
          </span>
          <button className="flex flex-col gap-1 cursor-pointer items-start">
            <span className="font-semibold text-secondary ag-h1">
              {user.followersCount}
            </span>
            <span className="ag-h4 text-grayscale-700 font-medium">
              подписчиков
            </span>
          </button>
          <button className="flex flex-col gap-1 cursor-pointer items-start">
            <span className="font-semibold text-secondary ag-h1">
              {user.followingCount}
            </span>
            <span className="ag-h4 text-grayscale-700 font-medium">
              подписки
            </span>
          </button>
        </div>
      </div>

      {/* Dropzone + галерея */}
      {((mode === "private" && activeTab === "profile") ||
        mode === "public-with-media") && (
        <div className="flex flex-row flex-wrap gap-4 sm:gap-7.5 mt-2">
          {photos.map((p) => (
            <div
              key={p.id}
              className="relative w-20 sm:w-25 aspect-square rounded-xl overflow-hidden bg-grayscale-100"
            >
              <img
                src={p.src}
                alt="photo"
                className="w-full h-full object-cover"
              />
              {mode === "private" && (
                <button
                  type="button"
                  onClick={() => removePhoto(p.id)}
                  className="absolute top-1 right-1 text-white rounded-full w-5 h-5 flex items-center justify-center cursor-pointer hover:opacity-80"
                >
                  <svg className="h-4 w-4 shrink-0">
                    <use href="/icons/symbol/sprite.svg#close_red" />
                  </svg>
                </button>
              )}
            </div>
          ))}

          {/* DropZone кнопка */}
          {mode === "private" && activeTab === "profile" && (
            <div
              {...getRootProps()}
              className={`w-20 sm:w-25 aspect-square rounded-xl border border-solid flex items-center justify-center cursor-pointer transition ${
                isDragActive
                  ? "border-secondary bg-secondary/10"
                  : "border-grayscale-300 bg-grayscale-100"
              }`}
            >
              <input {...getInputProps()} />
              <div className="flex flex-col items-center gap-2">
                <svg className="h-7.5 w-7.5 shrink-0 opacity-40">
                  <use href="/icons/symbol/sprite.svg#img_l" />
                </svg>
                <span className="text-[9px] text-secondary font-medium">
                  Загрузить
                </span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* описание */}
      <div className="ag-h6 font-medium text-grayscale-700 pt-2">
        <p>{user.description}</p>
      </div>
    </div>
  );
}
