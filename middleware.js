import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request) {
  const token = request.cookies.get("auth-token");
  const { pathname } = request.nextUrl;
  
  const publicRoutes = ["/", "/register", "/reset-password"];
  const isPublicRoute = publicRoutes.includes(pathname);

  // Si está en ruta pública y tiene token -> redirigir a home
  if (isPublicRoute && token) {
    return NextResponse.redirect(new URL("/home", request.url));
  }

  // Si va a ruta privada y no tiene token -> redirigir a login
  if (!isPublicRoute && !token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Si tiene token, verificarlo
  if (token) {
    try {
      // Obtener valor del token
      const tokenValue = token.value;
      const { payload } = await jwtVerify(
        tokenValue,
        new TextEncoder().encode(process.env.AUTH_SECRET_TOKEN)
      );
      return NextResponse.next();
    } catch (error) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/register", "/reset-password", "/home"]
};
