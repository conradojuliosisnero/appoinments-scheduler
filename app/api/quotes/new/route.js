import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createQuote } from "@/services/quotes";
import { verify } from "jsonwebtoken";

export async function POST(req) {
  try {
    const body = await req.json();
    const cookieStore = await cookies();
    const token = await cookieStore.get("auth-token");
    if (!token) {
      return NextResponse.json({ message: "No autorizado" }, { status: 401 });
    }

    const jwtValit = verify(token.value, process.env.AUTH_SECRET_TOKEN);
    if (!jwtValit) {
      return NextResponse.json({ message: "No autorizado" }, { status: 401 });
    }
    const data = await createQuote(body, jwtValit?.id);
    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error del servidor" },
      { status: 500 }
    );
  }
}
