import { Link } from "react-router";
import FooterMenu from "./footerMenu";

export default function Footer() {
  return (
    <footer className="bg-grayscale-100">
      {/* container */}
      <div className="site-container">
        {/* row */}
        <div className="flex justify-between py-[60px] max-[860px]:flex-wrap min-[860px]:gap-[7%]">
          {/* left side  */}
          <div className="flex flex-col flex-shrink-0 max-[860px]:w-full max-[860px]:items-center max-[860px]:mb-12 gap-10 min-[860px]:gap-22">
            {/* footer-logo */}
            <Link to="/" className="lg:w-[228px] lg:h-[100px] lg:max-w-[228px] overflow-hidden max-w-[180px]">
              <img src="/images/logo-foot-placeholder.png" alt="logo" loading="lazy" ></img>
            </Link>
            {/* footer-social */} 
            <div className="footer-social flex items-center gap-[20px]">
              {footerSocial.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  aria-label={item.label}
                  className="block w-7.5 h-7.5"
                >
                  <svg className="w-7.5 h-7.5 hover:opacity-80">
                    <use href={`/icons/symbol/sprite.svg#${item.icon}`} />
                  </svg>
                </Link>
              ))}
            </div>
          </div>
          {/* right side  */}
          <div className="grid items-start max-[440px]:grid-cols-[10fr] max-[768px]:grid-cols-[10fr_10fr] min-[768px]:grid-cols-[10fr_15fr_15fr_15fr] gap-[30px] w-full">
            <FooterMenu heading="Меню" items={footerMenu1} />
            <FooterMenu heading="Покупателям" items={footerMenu2} />
            <FooterMenu heading="Продавцам" items={footerMenu3} />
            <FooterMenu heading="Помощь и поддержка" items={footerMenu4} />
          </div>
        </div>
      </div>
    </footer>
  );
}


/**
 * =====================================================================
 * ВРЕМЕННЫЕ ДАННЫЕ (будут заменены на API response)
 * =====================================================================
 */

 /**
   * ВАЖНО
   * Сейчас массив продуктов захардкожен в компоненте.
   * В будущем он будет приходить от API.
   */
// передаем социальные сети
const footerSocial = [
  { to: "vkontakte", icon: "vk", label: "Вконтакте" },
  { to: "telegram", icon: "tg", label: "Телеграм" },
  { to: "instagram", icon: "insta", label: "Инстаграм" },
];

// Footer widgets data
const footerMenu1 = [
  { title: "Продавать", to: "/sell" },
  { title: "Профиль", to: "/profile" },
  { title: "Корзина", to: "/cart" },
  { title: "Образы", to: "/gallery" },
];

const footerMenu2 = [
  { title: "Как покупать ?", to: "/" },
  { title: "Гарантия подлинности", to: "/" },
  { title: "Доставка и возврат", to: "/" },
  { title: "Полезные советы", to: "/" },
];

const footerMenu3 = [
  { title: "Как продавать", to: "/" },
  { title: "Комиссия", to: "/" },
  { title: "Полезные советы", to: "/" },
];

const footerMenu4 = [
  { title: "Контакты", to: "/" },
  { title: "FAQ", to: "/" },
  { title: "Договор оферты", to: "/" },
  { title: "Политика конфиденциальности", to: "/" },
  { title: "Условия пользования", to: "/" },
];
