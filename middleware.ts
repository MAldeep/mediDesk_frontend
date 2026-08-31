import { jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";

const ADMIN_ROUTES = ["/admin"];
const DOCTOR_ROUTES = ["/doctor"];
const STAFF_ROUTES = ["/staff"];
const AUTH_ROUTES = ["/login", "/register"];

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

async function refreshAccessToken(refreshToken: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refreshToken }),
      },
    );

    if (!response.ok) return null;
    const data = await response.json();
    return data.accessToken as string;
  } catch (error) {
    return null;
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  let accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("RefreshToken")?.value;

  let payload = accessToken ? await getJwtPayload(accessToken) : null;
  let response = NextResponse.next();
  let isTokenRefreshed = false;

  if (!payload && refreshToken) {
    const newAccessToken = await refreshAccessToken(refreshToken);

    if (newAccessToken) {
      accessToken = newAccessToken;
      payload = await getJwtPayload(newAccessToken);
      isTokenRefreshed = true;
    }
  }

  const isAuthenticated = Boolean(payload);
  const userRole = payload?.role;
  const isAuthRoute = AUTH_ROUTES.some((route) => pathname.startsWith(route));

  if (isAuthenticated && isAuthRoute) {
    const targetPath = userRole ? `/dashboard/${userRole}` : "/dashboard";
    const redirectResponse = NextResponse.redirect(
      new URL(targetPath, request.url),
    );
    if (isTokenRefreshed && accessToken) {
      redirectResponse.cookies.set("accessToken", accessToken, {
        httpOnly: true,
      });
    }
    return redirectResponse;
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
    const redirectResponse = NextResponse.redirect(loginUrl);
    redirectResponse.cookies.delete("accessToken");
    redirectResponse.cookies.delete("RefreshToken");
    return redirectResponse;
  }

  if (isProtectedRoute && userRole) {
    if (isAdminRoute && userRole !== "admin") {
      response = NextResponse.redirect(
        new URL(`/dashboard/${userRole}`, request.url),
      );
    } else if (isDoctorRoute && userRole !== "doctor" && userRole !== "admin") {
      response = NextResponse.redirect(
        new URL(`/dashboard/${userRole}`, request.url),
      );
    } else if (isStaffRoute && userRole !== "staff" && userRole !== "admin") {
      response = NextResponse.redirect(
        new URL(`/dashboard/${userRole}`, request.url),
      );
    }
  }

  if (isTokenRefreshed && accessToken) {
    response.cookies.set("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    });
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
