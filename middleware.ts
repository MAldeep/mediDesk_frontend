import { jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";

const ADMIN_ROUTES = ["/admin"];
const DOCTOR_ROUTES = ["/doctor"];
const STAFF_ROUTES = ["/staff"];
const AUTH_ROUTES = ["/login"];

const JWT_SECRET_ACCESS = new TextEncoder().encode(
  process.env.JWT_ACCESS_SECRET,
);

async function getJwtPayload(token: string) {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET_ACCESS);
    return payload as { role?: string; id?: string };
  } catch (error) {
    return null;
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("RefreshToken")?.value;

  const isAuthenticated = Boolean(refreshToken || accessToken);
  const isAuthRoute = AUTH_ROUTES.some((route) => pathname.startsWith(route));

  // in case of authenticated and trying to open auth route
  if (isAuthenticated && isAuthRoute) {
    return NextResponse.redirect(new URL("/appointments", request.url));
  }

  const isAdminRoute = ADMIN_ROUTES.some((route) => pathname.startsWith(route));
  const isDoctorRoute = DOCTOR_ROUTES.some((route) =>
    pathname.startsWith(route),
  );
  const isStaffRoute = STAFF_ROUTES.some((route) => pathname.startsWith(route));

  const isProtectedRoute =
    isAdminRoute ||
    isDoctorRoute ||
    isStaffRoute ||
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/appointments");

  // protected url and not authenticated
  if (isProtectedRoute && !isAuthenticated) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (isProtectedRoute && accessToken) {
    const payload = await getJwtPayload(accessToken);
    const userRole = payload?.role;

    if (isAdminRoute && userRole !== "admin") {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    if (isDoctorRoute && userRole !== "doctor" && userRole !== "admin") {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    if (isStaffRoute && userRole !== "staff" && userRole !== "admin") {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
