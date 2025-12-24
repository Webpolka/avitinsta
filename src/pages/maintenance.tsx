import Button from "@/ui/button";

export function Maintenance() {
  return (
    <div className="w-full flex justify-center items-center min-h-[100vh] sm:min-h-[81vh] pb-5">
      <div className="flex flex-col gap-5 max-w-[707px] text-center">
        <h2 className="px-0 sm:px-10 ag-w3 sm:ag-w1 font-semibold text-black">
          технические работы на сайте...
        </h2>
        <p className="ag-h3 font-normal text-grayscale-700 mb-11 tracking-wide">
          приносим извинения за временные неудобства
        </p>
        <Button to="/" className="hover:opacity-90 px-4 min-h-[52px] py-2 bg-black text-grayscale-white">
          <span>Перейти на главную страницу</span>
        </Button>
      </div>
    </div>
  );
}
