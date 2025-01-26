import { NextResponse } from "next/server";
import { getQuote } from "@/services/quotes";
import { citas } from "@/data/data";

export async function GET(req, { params }) {
  try {
    const { id } = await params;  
    const quote = citas.find((quote) => quote.id === parseInt(id));
    return NextResponse.json([quote], { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error al obtener la cita" },
      { status: 500 }
    );
  }
}
