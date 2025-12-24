import Button from "@/ui/button";

export function NotFound() {
  return (
    <div className="w-full flex justify-center items-center min-h-[100vh] sm:min-h-[81vh] pb-5">
      <div className="flex flex-col gap-5 max-w-[707px] text-center">
        <h2 className="px-0 sm:px-10 ag-w3 sm:ag-w1 font-semibold text-black">
          error 404
        </h2>
        <p className=" ag-h3 font-normal text-grayscale-700 mb-11 tracking-wide">
          Кажется что-то пошло не так! Страница, которую вы запрашиваете, не
          существует. Возможно, она устарела, была удалена или был введен
          неверный адрес в адресной строке
        </p>
        <Button to="/" className="min-h-[52px] px-60 py-2 bg-black text-grayscale-white">
          <span>Перейти на главную страницу</span>
        </Button>
      </div>
    </div>
  );
}
