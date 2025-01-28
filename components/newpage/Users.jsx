"use client";
import DashboardNav from "@/commons/DashboardNav";
import styles from "@/components/Home/styles/home.module.css";
import Image from "next/image";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import svgUser from "@/public/user.svg";
import { Button } from "antd";

export default function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      toast.loading("Cargando usuarios...", {
        duration: 500,
      });
      const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      };
      try {
        const response = await fetch("/api/clients", options);
        if (!response.ok) {
          throw new Error("Error fetching users");
        }
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        toast.error("Error fetching users");
      }
    };
    getUsers();
  }, []);

  const createUser = async (user) => {};
  const updateUser = async (user) => {};
  const deleteUser = async (id) => {};

  return (
    <>
      <main className={styles.main}>
        <DashboardNav />
        <h1>Usuarios</h1>
        <div className={styles.headerContend}>
          <div className={styles.btnCreate}>
            <Button
              type="primary"
              htmlType="submit"
              style={{ width: "48%" }}
              onClick={createUser}
            >
              crear
            </Button>
          </div>
        </div>

        <div className={styles.userCard}>
          {users.map((user) => (
            <div key={user.id}>
              <Image src={svgUser} alt={user.id} width={100} height={100} />
              <div className={styles.userEmailCard}>{user.email}</div>
              <div className={styles.userRoleCard}>{user.name}</div>
              <button className={styles.btnCardUpdate} onChange={updateUser}>
                editar
              </button>
              <button className={styles.btnCardDelete} onChange={deleteUser}>
                eliminar
              </button>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
