import { env } from "@/config/env";
import { citas } from "@/data/data";

export async function getQuotes() {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  };

  try {
    const response = await fetch(`${env.quotes}`, options);
    if (response.status !== 200) {
      throw new Error("Error al obtener los datos");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
}

export async function getQuote(id) {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  };

  try {
    const response = await fetch(`${env.quote}?id=${id}`, options);
    if (!response.ok) {
      throw new Error("Error al obtener los datos");
    }

    const data = await response.json();
    // Convertir id a número para comparación
    const numId = Number(id);
    const findData = data.find((quote) => quote.id === numId);
    if (!findData) {
      throw new Error("Cita no encontrada");
    }
    return findData;
  } catch (error) {
    throw error;
  }
}

export async function createQuote(quote, userId) {
  try {
    // Obtener citas del localStorage
    const citasStorage = JSON.parse(localStorage.getItem("citas")) || [];

    // Encontrar usuario
    const user = citasStorage.find((user) => user.id === Number(userId));

    if (!user) {
      throw new Error("Usuario no encontrado");
    }

    // Crear nueva cita
    const newAppointment = {
      id: user.appointments.length + 1,
      title: quote.title,
      description: quote.description,
      startDate: quote.startDate,
      endDate: quote.endDate,
      status: "Pending",
    };

    // Añadir cita al usuario
    user.appointments.push(newAppointment);

    // Actualizar usuario en el array
    const updatedCitas = citasStorage.map((u) => (u.id === user.id ? user : u));

    // Guardar en localStorage
    localStorage.setItem("citas", JSON.stringify(updatedCitas));

    return Promise.resolve({
      success: true,
      data: user,
    });
  } catch (error) {
    return Promise.reject(error);
  }
}

// export async function createQuote(quote) {
//   console.log(quote, "quote");
//   const options = {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(quote),
//   };

//   try {
//     const response = await fetch(env.quotes, options);
//     if (!response.ok) {
//       throw new Error("Error al crear la cita");
//     }
//     const data = await response.json();
//     return data;
//   } catch (error) {
//     throw error;
//   }
// }

export async function updateQuote(quote) {
  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(quote),
  };

  try {
    const response = await fetch(env.quotes, options);
    if (!response.ok) {
      throw new Error("Error al actualizar la cita");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

export async function deleteQuote(id) {
  const options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const response = await fetch(`${env.quote}?id=${id}`, options);
    if (!response.ok) {
      throw new Error("Error al eliminar la cita");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

