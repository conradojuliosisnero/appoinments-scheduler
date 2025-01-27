import { NextResponse } from "next/server";
import { usuarios } from "@/data/data";
import jwt from "jsonwebtoken";
import { serialize } from "cookie";

if (!process.env.AUTH_SECRET_TOKEN) {
  throw new Error("AUTH_SECRET_TOKEN no está definido");
}

export async function POST(req) {
  const login = await req.json();
  const user = usuarios.find(
    (user) => user.email === login.email && user.password === login.password
  );

  if (!user) {
    return NextResponse.json(
      { error: "Usuario o contraseña incorrectos" },
      { status: 401 }
    );
  }

  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      name: user.nombre,
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30,
    },
    process.env.AUTH_SECRET_TOKEN
  );

  const cookieUser = {
    name: name,
    email: email,
  }

  const serializedToken = serialize("auth-token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 24 * 30,
    path: "/"
  });

  const serializedUser = serialize("user-data", cookieUser, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 24 * 30,
  });

  const response = NextResponse.json(
    { message: "Login exitoso" },
    { status: 200 }
  );

  response.headers.append("Set-Cookie", serializedToken);
  response.headers.append("Set-Cookie", serializedUser);

  return response;
}
