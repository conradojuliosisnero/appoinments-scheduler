import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const response = NextResponse.json(
      { message: "Sesión cerrada correctamente" },
      { status: 200 }
    );

    // Eliminar cookies
    response.cookies.set("auth-token", "", {
      expires: new Date(0),
      path: "/"
    });

    response.cookies.set("user", "", {
      expires: new Date(0),
      path: "/"
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      { message: "Error al cerrar sesión" },
      { status: 500 }
    );
  }
}