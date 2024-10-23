import { useContext } from "react";
import { UserContext } from "@/contexts";

export default function useUser() {
  return useContext(UserContext);
}