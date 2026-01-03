import { useUser } from "@/context/use.all";
import { type ReactElement } from "react";
import { Navigate } from "react-router-dom";
import { Loader } from "@/ui/loader";

export function ProtectedRoute({ children }: { children: ReactElement }) {
  const { user, isUserLoading } = useUser();

  if (isUserLoading) {
    return <Loader />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
