import { NextResponse } from "next/server";


export default function middleware(req, res, next) {
    console.log('Middleware executed');
    NextResponse.next();
}