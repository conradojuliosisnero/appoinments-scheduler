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
import { useRouter } from "next/navigation";
import { emailRegex } from "@/utils/expressions";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validateEmail, setValidateEmail] = useState(true);
  const [validatePassword, setValidatePassword] = useState(true);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    toast.loading("Registrando...", {
      duration: 300,
    });
    try {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      };
      const response = await fetch("/api/register", options);
      if (response.status !== 201) {
        throw new Error("Error al registrar usuario");
      }
      const data = await response.json();
      toast.success("usuario registrado correctamente ✅");
      await router.push("/");
    } catch (error) {
      toast.error("Ah ocurrio un error al intentar registar 🫤");
    }
  };

  const handleEmailChange = (e) => {
    const emailValue = e.target.value;
    setEmail(emailValue);

    setValidateEmail(emailRegex.test(emailValue));
  };

  const handlePasswordChange = (e) => {
    const passwordValue = e.target.value;
    setPassword(passwordValue);

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    setValidatePassword(passwordRegex.test(passwordValue));
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
                  value={name}
                  onChange={(e) => setName(e.target.value)}
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
                value={email}
                onChange={handleEmailChange}
                className={`${styles.input} ${
                  !validateEmail && email ? styles.inputError : ""
                }`}
                placeholder="ejemplo@correo.com"
                required
              />
            </div>
            {!validateEmail && email && (
              <p className={styles.error}>Correo electrónico inválido</p>
            )}
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
                value={password}
                onChange={handlePasswordChange}
                className={`${styles.input} ${
                  !validatePassword && password ? styles.inputError : ""
                }`}
                placeholder="••••••••"
                required
              />
            </div>
            {!validatePassword && password && (
              <p className={styles.error}>
                La contraseña debe tener al menos 8 caracteres, una letra y un
                número
              </p>
            )}
          </div>

          <button
            type="submit"
            className={styles.submitButton}
            disabled={!validateEmail || !validatePassword}
            style={{ cursor: !validateEmail || !validatePassword ? "not-allowed" : "pointer" }}
          >
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
