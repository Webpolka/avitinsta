import { Outlet, useParams } from "react-router-dom";
import { useMemo, useState } from "react";

import Header from "@/components/header/header";
import { Footer } from "@/components/footer/footer";
import { ProfileHeader } from "@/components/profile/profile-header";
import { ProfileTabs } from "@/components/profile/profile-tabs";

import { USERS_DATA } from "@/mocks/users.mocks";

/* =========================
   types
========================= */

export type ProfileFormState = {
  firstName: string;
  birthDate: string;
  gender: "male" | "female";
  phone: string;
  email: string;

  // address
  addressFirstName: string;
  lastName: string;
  middleName: string;
  region: string;
  city: string;
  street: string;
  house: string; 
};

type ProfileLayoutProps = {
  mode: "private" | "public-with-media" | "public-no-media";
};

/* =========================
   component
========================= */

export function ProfileLayout({ mode }: ProfileLayoutProps) {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState<string>("profile"); // добавили state

  /* =========================
     user
  ========================= */

  const user = useMemo(() => {
    if (mode === "private") return USERS_DATA[0];
    if (!id) return undefined;
    return USERS_DATA.find((u) => u.id === id);
  }, [id, mode]);

  /* =========================
     form state (CENTRAL)
  ========================= */

  const [form, setForm] = useState<ProfileFormState>({
    firstName: "",
    birthDate: "",
    gender: "male",
    phone: "",
    email: "",

    addressFirstName: "",
    lastName: "",
    middleName: "",
    region: "",
    city: "",
    street: "",
    house: ""
       });

  /* =========================
     photos (CENTRAL)
  ========================= */

  const [photos, setPhotos] = useState<File[]>([]);

  /* =========================
     guards
  ========================= */

  if (!user) {
    return (
      <div className="p-5 max-w-5xl mx-auto">
        <p className="text-red-500">Пользователь не найден</p>
      </div>
    );
  }

  /* =========================
     render
  ========================= */

  return (
    <div className="wrapper bg-fon">
      <Header />

      <main className="main">
        <div className="site-container">
          <div className="pt-7.5 sm:pl-0 sm:pr-0 sm:pt-11 xl:pl-15 xl:pr-15 xl:pt-26 xl:mb-55 mb-37.5 w-full">
            {/* profile header */}
            <ProfileHeader
              user={user}
              mode={mode}
              activeTab={activeTab} 
              photos={photos}
              setPhotos={setPhotos}
            />

            {/* tabs */}
            <ProfileTabs userId={user.id} mode={mode}  activeTab={activeTab}  setActiveTab={setActiveTab} />

            {/* pages */}
            <Outlet
              context={{
                user,
                mode,
                

                form,
                setForm,

                photos,
                setPhotos,
              }}
            />
          </div>
        </div>
      </main>

      {mode === "private" && <Footer />}
    </div>
  );
}
