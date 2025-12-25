import { useState } from "react";

// 🔥 Моки
const LOOKS_DATA = [
  {
    id: "1",
    user: {
      avatar: "/avatars/avatar1.jpg",
      name: "Иван Иванов",
      handle: "@ivan",
    },
    image: "/images/look1.jpg",
    likesCount: 12,
    commentsCount: 3,
    description: "Красивый образ для вечеринки",
    hashtags: ["вечер", "стиль", "look"],
  },
  {
    id: "2",
    user: {
      avatar: "/avatars/avatar2.jpg",
      name: "Мария Петрова",
      handle: "@maria",
    },
    image: "/images/look2.jpg",
    likesCount: 8,
    commentsCount: 1,
    description: "Повседневный стиль",
    hashtags: ["casual", "повседневка"],
  },
];

// 🔥 Комментарии (моки)
const COMMENTS_DATA = [
  {
    id: "c1",
    user: {
      avatar: "/avatars/avatar3.jpg",
      name: "Сергей",
    },
    text: "Очень круто!",
    likes: 2,
    date: "2d",
  },
  {
    id: "c2",
    user: {
      avatar: "/avatars/avatar4.jpg",
      name: "Алена",
    },
    text: "Мне нравится этот look",
    likes: 1,
    date: "1d",
  },
];

// 🔥 Компонент модалки
type CommentsModalProps = {
  look: typeof LOOKS_DATA[0];
  onClose: () => void;
};

function CommentsModal({ look, onClose }: CommentsModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white w-full max-w-[900px] h-[90vh] rounded-xl overflow-hidden flex flex-col">
        {/* Header + look preview */}
        <LookPreview look={look} />

        {/* Comments */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {COMMENTS_DATA.map((comment) => (
            <CommentItem key={comment.id} comment={comment} />
          ))}
        </div>

        {/* Add comment */}
        <div className="border-t p-4 flex items-center gap-3">
          <input
            type="text"
            placeholder="Добавить комментарий"
            className="flex-1 border rounded-full px-4 py-2 outline-none"
          />
          <button className="bg-black text-white px-4 py-2 rounded-full">
            ➤
          </button>
        </div>
      </div>

      {/* Закрыть модалку */}
      <button
        onClick={onClose}
        className="absolute top-5 right-5 text-white text-2xl"
      >
        ×
      </button>
    </div>
  );
}

// 🔥 LookPreview
type LookPreviewProps = {
  look: typeof LOOKS_DATA[0];
};

function LookPreview({ look }: LookPreviewProps) {
  return (
    <div className="rounded-xl overflow-hidden bg-white border-b-2 border-grayscale-100">
      {/* Header */}
      <div className="flex items-center justify-between p-5">
        <div className="flex items-center gap-3">
          <img
            src={look.user.avatar}
            className="w-10 h-10 md:w-15 md:h-15 rounded-full object-cover"
          />
          <div className="flex flex-col">
            <span className="font-medium text-secondary">{look.user.name}</span>
            <span className="text-gray-400">{look.user.handle}</span>
          </div>
        </div>
        <button className="font-medium text-secondary hover:opacity-80">
          Подписаться
        </button>
      </div>

      {/* Image */}
      <div className="bg-gray-100 w-full aspect-[886/500]">
        {look.image && (
          <img
            src={look.image}
            className="w-full h-full object-cover"
            alt="look"
          />
        )}
      </div>

      {/* Footer */}
      <div className="px-6 py-5 flex flex-col gap-3">
        <div className="flex items-center gap-6">
          {look.likesCount && (
            <div className="flex items-center gap-2">
              ❤️
              <span>{look.likesCount}</span>
            </div>
          )}
          {look.commentsCount && (
            <div className="flex items-center gap-2">
              💬
              <span>{look.commentsCount}</span>
            </div>
          )}
        </div>
        {look.description && (
          <div>
            <span className="font-medium">{look.user.name}</span>{" "}
            <span className="text-gray-700">{look.description}</span>
          </div>
        )}
        {look.hashtags && (
          <div className="flex flex-wrap gap-2">
            {look.hashtags.map((tag) => (
              <span key={tag} className="text-blue-500 cursor-pointer">
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// 🔥 Комментарий
function CommentItem({ comment }: { comment: typeof COMMENTS_DATA[0] }) {
  return (
    <div className="flex gap-3 py-2 border-b border-gray-200">
      <img
        src={comment.user.avatar}
        className="w-8 h-8 rounded-full object-cover"
      />
      <div className="flex-1 flex flex-col">
        <div className="flex items-center gap-2">
          <span className="font-medium">{comment.user.name}</span>
          <span className="text-xs text-gray-400">{comment.date}</span>
        </div>
        <p className="text-sm">{comment.text}</p>
        <div className="flex gap-4 mt-2 text-xs">
          <button>❤️ {comment.likes}</button>
          <button>Ответить</button>
        </div>
      </div>
    </div>
  );
}

// 🔥 LookCard с модалкой
function LookCard({ look }: { look: typeof LOOKS_DATA[0] }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="rounded-xl overflow-hidden bg-white">
      <LookPreview look={look} />
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 text-sm text-blue-500"
      >
        Комментарии
      </button>
      {isOpen && <CommentsModal look={look} onClose={() => setIsOpen(false)} />}
    </div>
  );
}

// 🔥 Страница
export default function LooksPage() {
  return (
    <div className="p-6 flex flex-col gap-6">
      {LOOKS_DATA.map((look) => (
        <LookCard key={look.id} look={look} />
      ))}
    </div>
  );
}
