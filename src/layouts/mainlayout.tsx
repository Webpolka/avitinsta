import { Outlet } from "react-router-dom";

import Header from "@/components/header/header";
import Footer from "@/components/footer/footer";

export function MainLayout() {
  return (
    <div className="wrapper bg-fon">
      <Header />
      <main className="main">
        <div className="site-container">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
}
