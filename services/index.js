import { env } from "@/config/env";

export const getUsers = async () => {
  try {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    };
    const response = await fetch(`${process.env.GET_USERS}`, options);
    if (!response.ok) {
      throw new Error("Error fetching users");
    }
      const data = await response.json();
      console.log("SERVICE",data);
    return data;
  } catch (error) {
    return error;
  }
};

export const createUser = async (user) => {
  try {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
      body: JSON.stringify(user),
    };
    const response = await fetch("", options);
    if (repsonse.ok) {
      throw new Error("Error creating user");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};

export const updateUser = async (user) => {
  try {
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
      body: JSON.stringify(user),
    };
    const response = await fetch("", options);
    if (repsonse.ok) {
      throw new Error("Error updating user");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};

export const deleteUser = async (id) => {
  try {
    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    };
    const response = await fetch("", options);
    if (repsonse.ok) {
      throw new Error("Error deleting user");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};
