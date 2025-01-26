import { NextResponse } from "next/server";
import { verify } from "jsonwebtoken";
import { cookies } from "next/headers";

export async function GET(request) {
  try {
    const cookieStore = await cookies();
    const token = await cookieStore.get("auth-token");
    if (!token) {
      return NextResponse.json(
        { message: "No autorizado" },
        { status: 401 }
      );
    }

    const user = verify(token.value, process.env.AUTH_SECRET_TOKEN);
    
    return NextResponse.json(user, { status: 200 });
    
  } catch (error) {
    return NextResponse.json(
      { message: "Error al obtener los datos" },
      { status: 500 }
    );
  }
}
