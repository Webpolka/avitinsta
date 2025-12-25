import { Outlet } from "react-router-dom";
import  Header  from "@/components/header/header";
import { FooterEmpty } from "@/components/footer/footer";

export function NoFooterLayout() {
  return (
    <div className="wrapper bg-fon">
      <Header />
      <main className="main">
        <Outlet />
      </main>     
      <FooterEmpty/>
    </div>
  );
}
