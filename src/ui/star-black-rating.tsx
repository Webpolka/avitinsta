import clsx from "clsx";

interface StarBlackRatingProps {
  rating: number; // 0 - 5
  size?: number; // в px, по умолчанию 16
  gap?: number; // в px, по умолчанию 2
  className?: string;
}

export default function StarBlackRating({
  rating,
  size = 16,
  gap = 2,
  className,
}: StarBlackRatingProps) {
  // Округляем rating и ограничиваем 0-5
  const starsToShow = Math.min(Math.max(Math.floor(rating), 0), 5);

  return (
    <div className={clsx("flex", className)} style={{ gap: gap + "px" }}>
      {Array.from({ length: 5 }, (_, index) => {
        const isFilled = index < starsToShow;

        return (
          <svg
            key={index}
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <use
              href={
                isFilled
                  ? "/icons/symbol/sprite.svg#star_b"
                  : "/icons/symbol/sprite.svg#star_be"
              }
            />
          </svg>
        );
      })}
    </div>
  );
}
