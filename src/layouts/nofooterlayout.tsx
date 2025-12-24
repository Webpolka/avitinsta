import { Outlet } from "react-router-dom";
import  Header  from "@/components/header/header";

export function NoFooterLayout() {
  return (
    <div className="wrapper bg-fon">
      <Header />
      <main className="flex-1 container mx-auto p-4">
        <Outlet />
      </main>     
    </div>
  );
}
