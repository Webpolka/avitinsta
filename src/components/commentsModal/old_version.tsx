import { type Look } from "@/mocks/looks.mock";
import { USERS_DATA } from "@/mocks/users.mocks";
import { useRef, useState } from "react";
import styles from "@/styles/utilities.module.scss";
import { COMMENTS_DATA, type Comment } from "@/mocks/comment.mock";

type CommentsModalProps = {
  look: Look;
  onClose: () => void;
};

export function CommentsModal({ look, onClose }: CommentsModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);

  // Состояние закладки
  const [bookmarked, setBookmarked] = useState(false);

  const toggleBookmark = () => {
    setBookmarked((prev) => !prev);

    // Здесь аналогично AJAX-запрос на сервер
    // fetch('/api/bookmark', { method: 'POST', body: { lookId: look.id, bookmarked: !bookmarked } })
  };

  // Состояние лайка к образу
  const [lookLiked, setLookLiked] = useState(false);

  // Состояние количества лайков к образу
  const [lookLikesCount, setLookLikesCount] = useState<number>(
    look.likesCount || 0
  );

  // ОБРАБОТКА "Лайк образа"
  const toggleLookLike = () => {
    setLookLiked((prev) => !prev);
    setLookLikesCount((prev) =>
      lookLiked ? (prev || 0) - 1 : (prev || 0) + 1
    );

    // Здесь можно добавить AJAX-запрос на сервер, чтобы сохранить лайк
    // fetch('/api/like', { method: 'POST', body: { lookId: look.id, like: !lookLiked } })
  };

  // Состоояние для всех лайков
  const [likesState, setLikesState] = useState<
    Record<string, { count: number; liked: boolean }>
  >(() => {
    const initial: Record<string, { count: number; liked: boolean }> = {};
    COMMENTS_DATA.filter((c) => c.lookId === look.id).forEach((c) => {
      initial[c.id] = { count: c.likesCount, liked: c.isLiked || false };
    });
    return initial;
  });

  // Состояние для комментариев, чтобы можно было добавлять новые ответы
  const [, setCommentsState] = useState<Comment[]>(() =>
    COMMENTS_DATA.filter((c) => c.lookId === look.id)
  );

  // Функция для имитации отправки комментария/ответа
  const handleSendComment = (text: string) => {
    if (!replyTo) return;

    const newComment: Comment = {
      id: `tmp-${new Date().toISOString()}`, // временный id
      lookId: look.id,
      userId: "currentUserId", // СЮДА ПОДСТАВИМ ID ТЕКУЩЕГО ПОЛЬЗОВАТЕЛЯ !!!
      parentId: replyTo.commentId,
      text,
      likesCount: 0,
      createdAt: new Date().toISOString(),
    };

    // Показываем имитацию "отправки на сервер"
    setTimeout(() => {
      // добавляем в состояние комментариев
      setCommentsState((prev) => [...prev, newComment]);
      // скрываем форму
      setReplyTo(null);
    }, 800); // эмулируем задержку 800мс
  };

  // Состояние для отслеживания, сколько ответов показано для каждого комментария
  const [visibleRepliesCount, setVisibleRepliesCount] = useState<
    Record<string, number>
  >({});

  // Состояние для ответа на конкретный комментарий
  const [replyTo, setReplyTo] = useState<{
    commentId: string;
    username: string;
  } | null>(null);

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === overlayRef.current) onClose();
  };

  // Добавление ещё 3-х видимых ответов для конкретного комментария
  const handleShowMoreReplies = (commentId: string) => {
    setVisibleRepliesCount((prev) => ({
      ...prev,
      [commentId]: (prev[commentId] || 0) + 3,
    }));
  };

  // Фильтруем комментарии для текущего лука
  const comments = COMMENTS_DATA.filter((c) => c.lookId === look.id);

  // Корневые комментарии (без parentId)
  const rootComments = comments.filter((c) => !c.parentId);

  // Вложенные ответы сгруппированы по parentId
  const repliesByParent = comments.reduce<Record<string, Comment[]>>(
    (acc, comment) => {
      if (comment.parentId) {
        acc[comment.parentId] = acc[comment.parentId] || [];
        acc[comment.parentId].push(comment);
      }
      return acc;
    },
    {}
  );

  return (
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
    >
      <div className="sm:relative w-full sm:max-w-[707px]">
        {/* Основной контейнер модалки */}
        <div
          className={`${styles.hiddenScroll} px-4 pb-0 pt-7.5 sm:px-0 sm:py-0
                      bottom-0 fixed sm:static sm:rounded-xl
                      bg-white w-full sm:max-w-[707px]
                      h-[90vh]
                      overflow-hidden
                      flex flex-col sm:overflow-y-auto `}
        >
          {/* --- MOBILE HEADER --- */}
          <div className="relative sm:hidden flex flex-col gap-2 items-center pb-4">
            <h2 className="ag-h2 font-medium text-secondary">Комментарии</h2>
            <p className="ag-h7 font-medium text-grayscale-500">
              Оценили {look.likesCount} человек · {look.viewsCount} просмотров
            </p>
            <div className="absolute top-1 right-1">
              <button
                onClick={onClose}
                className="cursor-pointer w-5 h-5 rounded-full bg-grayscale-100 flex items-center justify-center text-secondary hover:opacity-80"
              >
                <svg className="w-4 h-4">
                  <use href="/icons/symbol/sprite.svg#close" />
                </svg>
              </button>
            </div>
          </div>

          {/* --- DESKTOP HEADER + IMAGE + FOOTER --- */}
          <div className="hidden sm:block shrink-0">
            {/* Header: пользователь + подписка */}
            <DesktopHeader
              look={look}
              user={USERS_DATA.find((u) => u.id === look.user.id)}
            />

            {/* Content: изображение */}
            {look?.image && (
              <div className="bg-grayscale-100 w-full aspect-[886/500] hidden sm:block">
                <img
                  src={look.image}
                  className="w-full object-cover aspect-[886/500] overflow-hidden"
                />
              </div>
            )}

            {/* Footer: лайки и просмотры */}
            <DesktopFooter
              lookLikesCount={lookLikesCount}
              lookLiked={lookLiked}
              toggleLookLike={toggleLookLike}
              bookmarked={bookmarked}
              toggleBookmark={toggleBookmark}
              commentsCount={comments.length}
            />
          </div>

          {/* --- COMMENTS LIST --- */}
          <div
            className={`${styles.hiddenScroll} relative flex-1 sm:flex-[initial] overflow-y-auto sm:overflow-y-hidden sm:shrink-0 pt-5`}
          >
            {rootComments.map((comment) => {
              const commentUser = USERS_DATA.find(
                (u) => u.id === comment.userId
              );
              const replies = repliesByParent[comment.id] || [];
              const shownReplies = visibleRepliesCount[comment.id] || 0;
              const remainingReplies = replies.length - shownReplies;

              return (
                <div
                  key={comment.id}
                  className="px-0 sm:px-6 pt-0 flex flex-col gap-3 mb-4"
                >
                  {/* ROOT COMMENT */}
                  <CommentItem
                    comment={comment}
                    user={commentUser}
                    onReply={setReplyTo}
                    likesState={likesState}
                    setLikesState={setLikesState}
                    isRoot
                  />

                  {/* REPLIES */}
                  {replies.slice(0, shownReplies).map((reply) => {
                    const replyUser = USERS_DATA.find(
                      (u) => u.id === reply.userId
                    );
                    return (
                      <CommentItem
                        key={reply.id}
                        comment={reply}
                        user={replyUser}
                        onReply={setReplyTo}
                        likesState={likesState}
                        setLikesState={setLikesState}
                      />
                    );
                  })}

                  {/* SHOW MORE REPLIES BUTTON */}
                  {remainingReplies > 0 && (
                    <button
                      onClick={() => handleShowMoreReplies(comment.id)}
                      className="self-start flex items-center gap-3 text-grayscale-500 ag-h8 hover:text-secondary cursor-pointer mb-2"
                    >
                      <span className="ag-h9 font-medium block w-17.5 h-px bg-grayscale-500" />
                      {shownReplies === 0
                        ? `Смотреть ответы (${replies.length})`
                        : `Показать ещё ответы (${remainingReplies})`}
                    </button>
                  )}
                </div>
              );
            })}
          </div>

          {/* --- ADD NEW COMMENT INPUT --- */}
          <AddCommentInput
            placeholder="Добавить комментарий..."
            onSend={handleSendComment}
          />
        </div>

        {/* --- SEND RESPOND MESSAGE ABSOLUTE --- */}
        {replyTo && (
          <AddCommentInput
            placeholder={`Ответьте пользователю ${replyTo.username}...`}
            absolute
            onSend={handleSendComment} // добавляем пропс для отправки
          />
        )}
      </div>
    </div>
  );
}

/* ======= CHILD COMPONENTS ======= */
// Компонент для одного комментария (root или reply)
function CommentItem({
  comment,
  user,
  onReply,
  isRoot = false,
  likesState, // состояние лайков из родителя
  setLikesState, // функция для обновления лайков
}: {
  comment: Comment;
  user?: (typeof USERS_DATA)[number];
  onReply: (replyTo: { commentId: string; username: string }) => void;
  isRoot?: boolean;
  likesState: Record<string, { count: number; liked: boolean }>;
  setLikesState: React.Dispatch<
    React.SetStateAction<Record<string, { count: number; liked: boolean }>>
  >;
}) {
  // Функция переключения лайка
  const toggleLike = () => {
    setLikesState((prev) => ({
      ...prev,
      [comment.id]: {
        count: prev[comment.id].liked
          ? prev[comment.id].count - 1
          : prev[comment.id].count + 1,
        liked: !prev[comment.id].liked,
      },
    }));
  };

  return (
    <div className={`${isRoot ? "" : "ml-12"} flex flex-col gap-2`}>
      <div className="flex gap-5">
        <img
          src={user?.avatar || undefined} // если нет аватарки, src не будет
          className={`${
            isRoot ? "w-7.5 h-7.5" : "w-6 h-6"
          } rounded-full object-cover bg-gray-300 flex items-center justify-center`}
          alt={user?.name || "Без имени"}
        />

        <div className="flex flex-1 flex-col">
          {/* header */}
          <div className="ag-h6 font-medium text-grayscale-500 mb-1">
            {user?.name || "Без имени"} · {comment.createdAt}
          </div>

          {/* text */}
          <p
            className={`${
              isRoot ? "ag-h7" : "ag-h8"
            } text-secondary leading-5 mb-0.5 pr-5`}
          >
            {comment.text}
          </p>
          {/* footer */}
          <div className="flex justify-between items-end gap-3">
            <span className="ag-h9 font-medium text-grayscale-500">
              Отметки “Нравится”: {likesState[comment.id]?.count}
            </span>
            <div className="relative flex items-end gap-3">
              {/* like */}
              <button
                onClick={() => toggleLike()}
                className="absolute top-[2px] sm:-top-5 right-0 w-5.5 h-5.5 hover:opacity-80 cursor-pointer"
              >
                <svg
                  className={`w-5.5 aspect-square fill-none stroke-grayscale-300 ${
                    likesState[comment.id]?.liked
                      ? "fill-red-500 stroke-red-500"
                      : ""
                  }`}
                >
                  <use href="/icons/symbol/sprite.svg#like" />
                </svg>
              </button>

              {/* respond */}
              <button
                onClick={() =>
                  onReply({ commentId: comment.id, username: user?.name || "" })
                }
                className="cursor-pointer text-grayscale-500 hover:text-secondary"
              >
                <span className="ag-h10 font-medium pr-15 sm:pr-6">
                  Ответить
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Инпут для добавления нового комментария
function AddCommentInput({
  placeholder,
  absolute = false,
  onSend,
}: {
  placeholder: string;
  absolute?: boolean;
  onSend?: (text: string) => void;
}) {
  const [text, setText] = useState("");
  const [sendingStatus, setSendingStatus] = useState(false);

  const handleSend = () => {
    if (!text.trim() || sendingStatus) return;

    const sendingText = text;
    setSendingStatus(true);

    // Если форма абсолютная (ДЛЯ ОТВЕТОВ) — сразу скрываем ее через onSend
    if (absolute) {
      onSend?.(sendingText);
    } else {
      // Для обычной формы — просто имитируем отправку
      setTimeout(() => {
        onSend?.(sendingText);
        setSendingStatus(false); // сброс состояния, чтобы placeholder вернулся
      }, 800);
    }

    setText(""); // очищаем поле
  };

  return (
    <div
      className={`${
        absolute
          ? "absolute bottom-0 left-0 right-0 z-50 bg-white rounded-b-xl px-4 sm:px-6 pt-5 pb-5"
          : "px-0 sm:px-6 pt-4 pb-5 shrink-0"
      }`}
    >
      <div className="rounded-full px-4 min-h-[46px] border border-gray-300 flex items-center gap-3 focus-within:border-grayscale-500">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={sendingStatus ? "Отправление..." : placeholder}
          className="ag-h7 font-medium placeholder:text-grayscale-00 outline-none bg-transparent w-full"
          disabled={sendingStatus && absolute} // только для абсолютной блокируем поле
        />
        <button
          type="button"
          aria-label="Send"
          onClick={handleSend}
          className="w-9 h-9 aspect-square cursor-pointer rounded-full border border-grayscale-300 flex items-center justify-center hover:border-secondary"
        >
          <svg className="w-[8px] h-[14px] text-secondary ml-0.5">
            <use href="/icons/symbol/sprite.svg#chevron_r" />
          </svg>
        </button>
      </div>
    </div>
  );
}

// Desktop header компонент
function DesktopHeader({
  look,
  user,
}: {
  look: Look;
  user?: (typeof USERS_DATA)[number];
}) {
  void look;
  return (
    <div className="rounded-t-xl border-2 border-grayscale-100 flex items-center justify-between p-5">
      <div className="flex items-center gap-3">
        {user?.avatar && (
          <img
            src={user.avatar}
            className="w-10 h-10 sm:w-15 sm:h-15 rounded-full object-cover"
          />
        )}
        <div className="flex flex-col">
          <span className="ag-h6 sm:ag-h4 font-medium text-secondary">
            {user?.name}
          </span>
          {user?.handle && (
            <span className="ag-h9 text-grayscale-300 font-medium">
              {user.handle}
            </span>
          )}
        </div>
      </div>
      <button className="ag-h8 sm:ag-h7 text-secondary font-medium hover:opacity-80 cursor-pointer">
        Подписаться
      </button>
    </div>
  );
}

// Desktop footer компонент
function DesktopFooter({
  lookLikesCount,
  lookLiked,
  toggleLookLike,
  bookmarked,
  toggleBookmark,
  commentsCount,
}: {
  lookLikesCount: number;
  lookLiked: boolean;
  toggleLookLike: () => void;
  bookmarked: boolean;
  toggleBookmark: () => void;
  commentsCount: number;
}) {
  return (
    <div className="px-6 pt-5 flex flex-col gap-3">
      <div className="flex justify-between items-center border-b border-grayscale-300 pb-5">
        <div className="flex items-center gap-6">
          {/* Лайк к образу */}
          <button
            onClick={toggleLookLike}
            className="flex items-center gap-2 cursor-pointer"
          >
            <svg
              className={`w-7.5 h-7.5 ${
                lookLiked ? "fill-red-500 stroke-red-500" : "fill-none stroke-secondary"
              }`}
            >
              <use href="/icons/symbol/sprite.svg#heart" />
            </svg>
            <span className="ag-h7 text-secondary font-medium">
              {lookLikesCount}
            </span>
          </button>

          {/* Комментарии */}
          <div className="flex items-center gap-2">
            <svg className="w-7.5 h-7.5">
              <use href="/icons/symbol/sprite.svg#comment" />
            </svg>
            <span className="ag-h7 text-grayscale-700 font-medium">
              {commentsCount}
            </span>
          </div>
        </div>

        {/* Закладки */}
        <button
          onClick={toggleBookmark}
          className="w-7.5 h-7.5 text-secondary hover:opacity-80 cursor-pointer"
        >
          <svg
            className={`w-7.5 h-7.5 ${
              bookmarked
                ? "fill-blue-500 stroke-blue-500"
                : ""
            }
            `}
          >
            <use href="/icons/symbol/sprite.svg#bookmark" />
          </svg>
        </button>
      </div>
    </div>
  );
}
