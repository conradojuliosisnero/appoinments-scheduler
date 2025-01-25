"use client";
import { useState } from "react";
import {
  UserRound,
  Mail,
  Lock,
  Phone,
  Calendar,
  UserCircle2,
} from "lucide-react";
import styles from "./styles/register.module.css";
import Link from "next/link";
import toast from "react-hot-toast";

export default function Register() {
  const [formData, setFormData] = useState({
    user_name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    toast.loading("Registrando...");
    try {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_name, email, password }),
      };
      const response = await fetch("/api/register", options);
      if (!response.ok) {
        throw new Error("Error al registrar usuario");
      }
      const data = await response.json();
      toast.success("usuario registrado correctamente ✅");
    } catch (error) {
      toast.error("Ah ocurrio un error al intentar registar 🫤");
    } finally {
      toast.dismiss();
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formCard}>
        <div className={styles.header}>
          <div className={styles.iconContainer}>
            <UserCircle2 className={styles.icon} />
          </div>
          <h1 className={styles.title}>Crear Cuenta</h1>
          <p className={styles.subtitle}>
            Complete el formulario para registrarse en el sistema de citas
            médicas
          </p>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.row}>
            <div className={styles.formGroup}>
              <label htmlFor="user_name" className={styles.label}>
                Nombre
              </label>
              <div className={styles.inputWrapper}>
                <UserRound className={styles.inputIcon} />
                <input
                  id="user_name"
                  name="user_name"
                  type="text"
                  value={formData.user_name}
                  onChange={handleChange}
                  className={styles.input}
                  placeholder="Juan"
                  required
                />
              </div>
            </div>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.label}>
              Correo Electrónico
            </label>
            <div className={styles.inputWrapper}>
              <Mail className={styles.inputIcon} />
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className={styles.input}
                placeholder="ejemplo@correo.com"
                required
              />
            </div>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="password" className={styles.label}>
              Contraseña
            </label>
            <div className={styles.inputWrapper}>
              <Lock className={styles.inputIcon} />
              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                className={styles.input}
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <button type="submit" className={styles.submitButton}>
            Registrarse
          </button>
        </form>

        <p className={styles.login}>
          ¿Ya tiene una cuenta?{" "}
          <Link href="/" className={styles.loginLink}>
            Inicie sesión aquí
          </Link>
        </p>
      </div>
    </div>
  );
}
