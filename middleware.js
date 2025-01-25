import { NextResponse } from "next/server";

export async function middleware(request) {
  const token = request.cookies.get("auth-token");
  const { pathname } = request.nextUrl;

  const publicRoutes = ["/", "/register", "/reset-password"];

  // Si no está en ruta pública y no tiene token, redirigir a login
  if (!publicRoutes.includes(pathname) && !token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Si está en ruta pública y tiene token, redirigir a home
  if (publicRoutes.includes(pathname) && token) {
    return NextResponse.redirect(new URL("/home", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/register", "/reset-password", "/home"],
};
