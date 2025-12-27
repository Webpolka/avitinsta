import { useRef, useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import Button from "@/ui/button";
import styles from "@/styles/utilities.module.scss";
import { useLockBodyScroll } from "@/hooks/lockBodyScroll";

type AddLookModalProps = {
  onClose: () => void;
  onSubmit: (data: {
    file: File | null;
    description: string;
    hashtags: string[];
  }) => void;
};

export function AddLookModal({ onClose, onSubmit }: AddLookModalProps) {
  // Загруженный файл (один файл за раз)
  const [file, setFile] = useState<File | null>(null);

  // Локальный URL для превью файла
  const [preview, setPreview] = useState<string | null>(null);

  // Описание образа
  const [description, setDescription] = useState("");

  // Хештеги образа
  const [hashtags, setHashtags] = useState<string[]>([]);

  // Настройка dropzone (один файл, клик вручную)
  const { getRootProps, getInputProps, open } = useDropzone({
    accept: { "image/*": [], "video/*": [] },
    multiple: false,
    noClick: true,
    onDrop: (acceptedFiles) => {
      if (!acceptedFiles.length) return;

      const f = acceptedFiles[0];
      setFile(f);
      setPreview(URL.createObjectURL(f)); // создаём превью
    },
  });

  // Отправка данных формы
  const handleSubmit = () => {
    if (!file) return; // защита от пустой отправки
    onSubmit({ file, description, hashtags });
    onClose();
  };

  // Очищаем ObjectURL при смене файла или размонтировании
  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  // Ref overlay для закрытия по клику вне модалки
  const overlayRef = useRef<HTMLDivElement>(null);

  // Закрываем модалку только при клике по overlay
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === overlayRef.current) onClose();
  };

  useLockBodyScroll();

  return (
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
    >
      <div
        className={`${styles.hiddenScroll} ${styles.hFullHeaderMinus} absolute bottom-0 sm:static bg-white sm:rounded-xl w-full max-w-full sm:max-w-[634px] xl:max-w-[707px] sm:max-h-[95vh] overflow-y-auto`}
      >
        <div className="flex flex-col gap-6 px-5 pt-5 pb-6 sm:pb-2">
          {/* Dropzone */}
          <div
            {...getRootProps()}
            className="bg-grayscale-100 border-2 border-solid border-grayscale-700 rounded-xl min-h-[304px] aspect-[659/320] overflow-hidden flex items-center justify-center cursor-pointer"
          >
            <input {...getInputProps()} />

            {preview ? (
              // Превью загруженного файла
              <img
                src={preview}
                alt="Превью"
                className="h-full w-full object-cover"
              />
            ) : (
              // Заглушка до загрузки файла
              <div className="flex flex-col items-center gap-5">
                <svg className="h-[92px] w-[92px] shrink-0 opacity-40 mb-3">
                  <use href="/icons/symbol/sprite.svg#img_l" />
                </svg>
                <span className="ag-h8 text-grayscale-700">
                  Перетащите сюда фото или видео
                </span>
                <Button
                  onClick={open}
                  className="px-7.5 py-2 bg-secondary text-white min-h-11 hover:opacity-90 cursor-pointer"
                >
                  <span>Выбрать файл</span>
                </Button>
              </div>
            )}
          </div>

          {/* Описание */}
          <label className="ag-h6 text-grayscale-500 font-medium">
            <span className="block mb-3">
              Напишите что нибудь для поста ...
            </span>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Описание"
              className="h-22 sm:h-18 ag-h6 placeholder:text-grayscale-700 text-secondary font-medium w-full resize-none outline-none"
            />
          </label>

          {/* Хештеги */}
          <label className="ag-h6 text-grayscale-500 font-medium -mt-6">
            <span className="block mb-3">
              Напишите что нибудь для поста ...
            </span>
            <input
              type="text"
              value={hashtags.join(", ")}
              onChange={(e) =>
                setHashtags(
                  e.target.value
                    .split(",")
                    .map((h) => h.trim())
                    .filter(Boolean)
                )
              }
              placeholder="Хештеги через запятую"
              className="ag-h6 placeholder:text-grayscale-700 text-secondary font-medium w-full outline-none"
            />
          </label>
        </div>

        {/* Кнопка отправки */}
        <div className="flex justify-center gap-3 mt-2 border-t border-grayscale-300 pt-6 pb-17.5 sm:pb-7.5 sm:pt-7.5 px-4">
          <Button
            onClick={handleSubmit}
            className="max-w-[328px] w-full px-4 py-2 bg-secondary text-white min-h-11 hover:opacity-90 cursor-pointer"
          >
            <span>Добавить</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
