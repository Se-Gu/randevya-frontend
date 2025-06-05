import { cookies } from "next/headers";
import { User } from "@/types";

export async function getServerAuthState() {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;
  const userStr = cookieStore.get("auth_user")?.value;
  const user = userStr ? (JSON.parse(userStr) as User) : null;

  return {
    isAuthenticated: !!token,
    user,
  };
}
