import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { serialize } from "cookie";

if (!process.env.AUTH_SECRET_TOKEN) {
  throw new Error("AUTH_SECRET_TOKEN no está definido");
}

export async function POST(req) {
  try {
    const { name, email } = await req.json();

    const token = jwt.sign(
      {
        id: new Date(),
        email: email,
        name: name,
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30,
      },
      process.env.AUTH_SECRET_TOKEN
    );

    const serializedToken = serialize("auth-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 30,
      path: "/",
    });

    const response = NextResponse.json(
      { message: "Registro exitoso" },
      { status: 201 }
    );

    response.headers.set("Set-Cookie", serializedToken);

    return response;
  } catch (error) {
    return NextResponse.json({ message: "Error en registro" }, { status: 500 });
  }
}
