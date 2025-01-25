// import { env } from "@/config/env";

export async function getQuotes() {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  };

  try {
    const response = await fetch(`${process.env.GET_QUOTES}`, options);
    if (response.status !== 200) {
      throw new Error("Error al obtener los datos");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
}
