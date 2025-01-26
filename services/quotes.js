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

export const quoteService = {
  initializeData: (userId) => {
    const existingData = localStorage.getItem("citas");
    if (!existingData) {
      const initialData = [
        {
          id: userId,
          name: "Usuario",
          appointments: [],
        },
      ];
      localStorage.setItem("citas", JSON.stringify(initialData));
      return initialData;
    }
    return JSON.parse(existingData);
  },

  createCita: (userId, cita) => {
    try {
      const citas = JSON.parse(localStorage.getItem("citas")) || [];
      const user = citas.find((u) => u.id === Number(userId));

      if (!user) {
        throw new Error("Usuario no encontrado");
      }

      const newCita = {
        id: Date.now(),
        ...cita,
      };

      user.appointments.push(newCita);
      localStorage.setItem("citas", JSON.stringify(citas));

      console.log("Cita guardada:", newCita); // Debug
      return newCita;
    } catch (error) {
      console.error("Error al crear cita:", error);
      throw error;
    }
  },

  getCitas: (userId) => {
    const citas = JSON.parse(localStorage.getItem("citas")) || [];
    const user = citas.find((u) => u.id === Number(userId));

    if (!user) {
      // Si no existe el usuario, lo creamos
      const newUser = {
        id: Number(userId),
        name: "Usuario",
        appointments: [],
      };
      citas.push(newUser);
      localStorage.setItem("citas", JSON.stringify(citas));
      return [];
    }

    return user.appointments || [];
  },

  updateCita: (userId, citaId, updates) => {
    const citas = JSON.parse(localStorage.getItem("citas")) || [];
    const user = citas.find(u => u.id === Number(userId));

    if (!user) throw new Error("Usuario no encontrado");

    const citaIndex = user.appointments.findIndex(c => c.id === citaId);
    if (citaIndex === -1) throw new Error("Cita no encontrada");

    user.appointments[citaIndex] = {
      ...user.appointments[citaIndex],
      ...updates
    };

    localStorage.setItem("citas", JSON.stringify(citas));
    return user.appointments[citaIndex];
  },

  deleteCita: (userId, citaId) => {
    try {
      const citas = JSON.parse(localStorage.getItem("citas")) || [];
      const user = citas.find((u) => u.id === Number(userId));

      if (!user) {
        throw new Error("Usuario no encontrado");
      }

      user.appointments = user.appointments.filter(
        (cita) => cita.id !== citaId
      );
      localStorage.setItem("citas", JSON.stringify(citas));

      return true;
    } catch (error) {
      console.error("Error al eliminar cita:", error);
      throw error;
    }
  },
};

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

