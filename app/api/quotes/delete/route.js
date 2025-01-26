import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getQuotes } from "@/services/quotes";

export async function GET(req) {
  try {
    const cookieStore = await cookies();
    const token = await cookieStore.get("auth-token");
    if (!token) {
      return NextResponse.json(
        { message: "No autorizado" },
        { status: 401 }
      );
    }
    const data = await getQuotes();
    const quotes = Array.isArray(data) ? data : [];
    return NextResponse.json(quotes, { status: 200 });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { message: "Error del servidor" },
      { status: 500 }
    );
  }
}
