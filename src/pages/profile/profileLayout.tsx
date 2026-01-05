import { Outlet } from "react-router-dom";
import { useState } from "react";

import Header from "@/components/header/header";
import { Footer } from "@/components/footer/footer";
import { ProfileHeader } from "@/components/profile/profile-header";
import { ProfileTabs } from "@/components/profile/profile-tabs";

import { type User } from "@/mocks/users.mocks";
import { type ProfileFormState, type PhotoItem } from "./tab/info";
import { USERS_DATA } from "@/mocks/users.mocks";

import { useUser } from "@/context/use.all";
import { useParams } from "react-router-dom";

/* =========================
   Context type
========================= */
export type ProfileContext = {
  user: User;
  mode: "private" | "public";
  form: ProfileFormState;
  setForm: React.Dispatch<React.SetStateAction<ProfileFormState>>;
  photos: File[];
  setPhotos: React.Dispatch<React.SetStateAction<File[]>>;
};

type ModeProps = {
  mode: "private" | "public";
};

/* =========================
   component
========================= */

export function ProfileLayout({ mode }: ModeProps) {
  const [activeTab, setActiveTab] = useState<string>("profile"); // добавили state

  /* =========================
     user from global context
  ========================= */
  const { user } = useUser();
  const { id } = useParams();

  let uuser;
  if (mode === "private") {
    uuser = user;
  } else {
    uuser = USERS_DATA.find((user) => user.id === id);
  }

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
    house: "",
  });

  /* =========================
     photos (CENTRAL)
  ========================= */

  const [photos, setPhotos] = useState<PhotoItem[]>([]);

  /* =========================
     guards
  ========================= */

  if (!uuser) {
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
          <div className="pt-7.5 sm:pl-0 sm:pr-0 sm:pt-11 max-w-[1163px] mx-auto xl:pt-26 xl:mb-55 mb-45 w-full">
            {/* profile header */}
            <ProfileHeader
              user={uuser}
              mode={mode}
              activeTab={activeTab}
              photos={photos}
              setPhotos={setPhotos}
            />

            {/* tabs */}
            <ProfileTabs
              userId={uuser.id}
              mode={mode}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />

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

      {/* {mode === "private" && <Footer />} */}
      <Footer />
    </div>
  );
}
