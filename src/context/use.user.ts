import { useContext } from "react";
import { UserContext } from "./user.context";

export function useUser() {
  return useContext(UserContext);
}
