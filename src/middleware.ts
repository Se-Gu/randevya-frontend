import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Routes that require authentication
const protectedRoutes = ["/dashboard"];
// Routes that should not be accessible when authenticated
const authRoutes = ["/login", "/register"];

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("auth_token")?.value;
  const userStr = request.cookies.get("auth_user")?.value;
  const user = userStr ? JSON.parse(userStr) : null;
  const role = request.cookies.get("auth_role")?.value || user?.role;
  const { pathname } = request.nextUrl;

  // Redirect authenticated users from home page to dashboard
  if (token && pathname === "/") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Protect dashboard routes
  if (pathname.startsWith("/dashboard") && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Role based access for staff routes
  if (pathname.startsWith("/dashboard/staff")) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    if (role !== "owner") {
      const userId = user?.id;
      if (userId && !pathname.startsWith(`/dashboard/staff/${userId}`)) {
        return NextResponse.redirect(
          new URL(`/dashboard/staff/${userId}`, request.url)
        );
      }
    }
  }

  // Prevent authenticated users from accessing auth pages
  if (token && (pathname === "/login" || pathname === "/register")) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

// Match all routes that start with /dashboard, /login, or /register
export const config = {
  matcher: ["/", "/dashboard/:path*", "/login", "/register"],
};
