import { jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";

const ADMIN_ROUTES = ["/dashboard/admin"];
const DOCTOR_ROUTES = ["/dashboard/doctor"];
const STAFF_ROUTES = ["/dashboard/staff"];
const AUTH_ROUTES = ["/login", "/register"];

const JWT_SECRET_ACCESS = new TextEncoder().encode(
  process.env.JWT_ACCESS_SECRET || "",
);

async function verifyAccessToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET_ACCESS);
    return payload as { id?: string; role?: string };
  } catch {
    return null;
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const accessToken = request.cookies.get("accessToken")?.value;
  const accessPayload = accessToken
    ? await verifyAccessToken(accessToken)
    : null;

  const isAuthenticated = Boolean(accessPayload);
  const userRole = accessPayload?.role;

  const isAuthRoute = AUTH_ROUTES.some((route) => pathname.startsWith(route));

  if (isAuthenticated && isAuthRoute) {
    const targetPath = userRole ? `/dashboard/${userRole}` : "/dashboard";
    return NextResponse.redirect(new URL(targetPath, request.url));
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

  if (isProtectedRoute && !isAuthenticated) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (isProtectedRoute && userRole) {
    if (isAdminRoute && userRole !== "admin") {
      return NextResponse.redirect(
        new URL(`/dashboard/${userRole}`, request.url),
      );
    }
    if (isDoctorRoute && userRole !== "doctor" && userRole !== "admin") {
      return NextResponse.redirect(
        new URL(`/dashboard/${userRole}`, request.url),
      );
    }
    if (isStaffRoute && userRole !== "staff" && userRole !== "admin") {
      return NextResponse.redirect(
        new URL(`/dashboard/${userRole}`, request.url),
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
