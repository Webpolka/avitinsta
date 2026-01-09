import { type Look } from "@/mocks/looks.mock";
import { USERS_DATA } from "@/mocks/users.mocks";
import { COMMENTS_DATA, type Comment } from "@/mocks/comment.mock";
import { useRef, useState } from "react";

import { CommentItem } from "./commentItem";
import { AddCommentInput } from "./addCommentInput";
import { DesktopHeader } from "./desktopHeader";
import { DesktopFooter } from "./desktopFooter";

import { useLockBodyScroll } from "@/hooks/lockScroll";
import { formatCountRu } from "@/hooks/formatCount";
import styles from "@/styles/utilities.module.scss";

type CommentsModalProps = {
  look: Look;
  onClose: () => void;
  lookLiked: boolean; // состояние лайка образа
  lookLikesCount: number; // количество лайков образа
  toggleLookLike: () => void; // переключение лайка образа
  subscribed: boolean; // подписка на автора образа
  onToggleSubscribe: () => void; // переключение подписки
};

export function CommentsModal({
  look,
  onClose,
  lookLiked,
  lookLikesCount,
  toggleLookLike,
  subscribed,
  onToggleSubscribe,
}: CommentsModalProps) {
  // Состояние закладки образа
  const [bookmarked, setBookmarked] = useState(false);
  const toggleBookmark = () => setBookmarked((prev) => !prev);

  // Ссылка на overlay для закрытия по клику вне модалки
  const overlayRef = useRef<HTMLDivElement>(null);

  const commentRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // Лайки комментариев: хранение количества и состояния лайка
  const [likesState, setLikesState] = useState<
    Record<string, { count: number; liked: boolean }>
  >(() => {
    const initial: Record<string, { count: number; liked: boolean }> = {};
    COMMENTS_DATA.filter((c) => c.lookId === look.id).forEach((c) => {
      initial[c.id] = { count: c.likesCount, liked: c.isLiked || false };
    });
    return initial;
  });

  // Состояние комментариев (новые добавляются сюда)
  const [commentsState, setCommentsState] = useState<Comment[]>(() =>
    COMMENTS_DATA.filter((c) => c.lookId === look.id)
  );

  // Добавление комментария
  const handleSendComment = (text: string) => {
    if (!text.trim()) return;

    let parentId: string | null = null;

    if (replyTo?.commentId) {
      // Если отвечаем на дочерний комментарий, берём родителя
      const replyParent = commentsState.find((c) => c.id === replyTo.commentId);
      parentId = replyParent?.parentId
        ? replyParent.parentId
        : replyTo.commentId;
    }

    const newComment: Comment = {
      id: `tmp-${new Date().toISOString()}`,
      lookId: look.id,
      userId: USERS_DATA[0].id,
      parentId,
      text,
      likesCount: 0,
      isLiked: false,
      createdAt: new Date().toISOString(),
    };

    setCommentsState((prev) => [...prev, newComment]);

    // Если это ответ на комментарий — раскрываем все ответы родителя
    if (parentId) {
      setVisibleRepliesCount((prev) => ({
        ...prev,
        [parentId]: (repliesByParent[parentId]?.length || 0) + 1,
      }));

      // скроллим к родителю
      setTimeout(() => {
        commentRefs.current[parentId]?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 100);
    } else {
      // новый корневой комментарий — скроллим к низу
      setTimeout(() => {
        let container;
        if (window.innerWidth < 640) {
          container = document.getElementById("comments-list-mobile");
        } else {
          container = document.getElementById("comments-list-desktop");
        }
        container?.scrollTo({
          top: container.scrollHeight,
          behavior: "smooth",
        });
      }, 100);
    }

    setReplyTo(null);
  };

  // Состояние для ответа на комментарий
  const [replyTo, setReplyTo] = useState<{
    commentId: string;
    username: string;
  } | null>(null);

  // Сколько дочерних ответов показывать для каждого комментария
  const [visibleRepliesCount, setVisibleRepliesCount] = useState<
    Record<string, number>
  >({});

  // Закрытие модалки по клику на overlay
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === overlayRef.current) onClose();
  };

  // Показать ещё ответы на комментарий
  const handleShowMoreReplies = (commentId: string) => {
    setVisibleRepliesCount((prev) => ({
      ...prev,
      [commentId]: (prev[commentId] || 0) + 3,
    }));
  };

  // Берём комментарии только для текущего образа
  const comments = commentsState;

  // Корневые комментарии (без parentId)
  const rootComments = comments.filter((c) => !c.parentId);

  // Дочерние ответы сгруппированы по parentId
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

  useLockBodyScroll();

  return (
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
    >
      <div className="sm:relative w-full sm:max-w-[707px]">
        {/* Основной контейнер модалки */}
        <div
          id="comments-list-desktop"
          className={`${styles.hiddenScroll} ${styles.hFullHeaderMinus} px-4 pb-0 pt-7.5 sm:px-0 sm:py-0 bottom-0 fixed sm:static sm:rounded-xl bg-white w-full sm:max-w-[707px] h-[95vh] overflow-hidden flex flex-col sm:overflow-y-auto`}
        >
          {/* Верхний мобильный header */}
          <div className="relative sm:hidden flex flex-col gap-2 items-center pb-4">
            <h2 className="ag-h2 font-medium text-secondary">Комментарии</h2>

            <p className="ag-h7 font-medium text-grayscale-500 text-center">
              Оценили {formatCountRu(Number(look.likesCount))} человек ·{" "}
              {formatCountRu(Number(look.viewsCount))} просмотров
            </p>

            {/* Кнопка закрытия */}
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

          {/* Десктопный header и футер */}
          <div className="hidden sm:block shrink-0">
            <DesktopHeader
              look={look}
              user={USERS_DATA.find((u) => u.id === look.user.id)}
              subscribed={subscribed} // прокинутая подписка
              onToggleSubscribe={onToggleSubscribe} // переключение подписки
            />
            {look?.image && (
              <div className="bg-grayscale-100 w-full aspect-[886/500] hidden sm:block">
                <img
                  src={look.image}
                  className="w-full object-cover aspect-[886/500] overflow-hidden"
                />
              </div>
            )}
            <DesktopFooter
              lookLikesCount={lookLikesCount} // лайки образа
              lookLiked={lookLiked} // состояние лайка образа
              toggleLookLike={toggleLookLike} // переключение лайка образа
              bookmarked={bookmarked} // закладка
              toggleBookmark={toggleBookmark} // переключение закладки
              commentsCount={comments.length} // кол-во комментариев
            />
          </div>

          {/* Список комментариев */}
          <div
            id="comments-list-mobile"
            className={`${styles.hiddenScroll} relative flex-1 sm:flex-[initial] overflow-y-auto sm:overflow-y-hidden sm:shrink-0 pt-5`}
          >
            {rootComments.length ? (
              rootComments.map((comment) => {
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
                    {/* Корневой комментарий */}
                    <CommentItem
                      comment={comment}
                      user={commentUser}
                      onReply={setReplyTo}
                      likesState={likesState}
                      setLikesState={setLikesState}
                      isRoot
                    />

                    {/* Дочерние ответы */}
                    {replies.slice(0, shownReplies).map((reply) => {
                      const replyUser = USERS_DATA.find(
                        (u) => u.id === reply.userId
                      );

                      return (
                        <div
                          key={reply.id}
                          ref={(el) =>
                            void (commentRefs.current[comment.id] = el)
                          }
                        >
                          <CommentItem
                            comment={reply}
                            user={replyUser}
                            onReply={setReplyTo}
                            likesState={likesState}
                            setLikesState={setLikesState}
                          />
                        </div>
                      );
                    })}

                    {/* Кнопка "Смотреть ещё ответы" */}
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
              })
            ) : (
              <div className="flex h-full items-center justify-center px-10 text-center text-grayscale-300">
                <span>Нет ни одного комментария. Станьте первым!</span>
              </div>
            )}
          </div>

          {/* Input для нового комментария */}
          <AddCommentInput
            placeholder="Добавить комментарий..."
            onSend={handleSendComment}
          />
        </div>

        {/* Input для ответа на комментарий (отдельно при replyTo) */}
        {replyTo && (
          <AddCommentInput
            placeholder={`Ответьте пользователю ${replyTo.username}...`}
            absolute
            onSend={handleSendComment}
          />
        )}
      </div>
    </div>
  );
}
