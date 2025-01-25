import { NextResponse } from "next/server";
import crypto from 'crypto';

export async function POST(req) {
  try {
    const { user_name, email, password } = await req.json();
    
    // Generar token simple
    const token = crypto.randomBytes(32).toString('hex');
    
    const response = NextResponse.json(
      { message: "Registro exitoso", auth: true },
      { status: 201 }
    );

    response.cookies.set("auth-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24
    });

    response.cookies.set(
      "user",
      JSON.stringify({ user_name, email }),
      {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 60 * 24
      }
    );

    return response;
  } catch (error) {
    return NextResponse.json(
      { message: "Error en registro" },
      { status: 500 }
    );
  }
}
