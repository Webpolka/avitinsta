import Button from "@/ui/button";

export function CartEmpty() {
  return (
    <div className="w-full flex justify-center items-center min-h-[100vh] sm:min-h-[85vh] pb-5">
      <div className="flex flex-col items-center gap-3 max-w-[430px] text-center">
        <h2 className="ag-h1 font-semibold text-secondary">Корзина</h2>
        <p className="ag-h6 font-medium text-[#21212d] mb-6">
          В вашей корзине пока ничего нет, но у нас огромный{" "}
          <br className="hidden sm:inline-block" />
          выбор
        </p>
        <Button
          to="/"
          className="m-auto self-start text-secondary border border-black border-solid min-h-11 min-w-75"
        >
          <span>На главную</span>
        </Button>
      </div>
    </div>
  );
}
