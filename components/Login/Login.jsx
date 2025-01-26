"use client";
import { useEffect, useState } from "react";
import { UserRound, Lock, Stethoscope } from "lucide-react";
import styles from "./styles/login.module.css";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { emailRegex } from "@/utils/expressions";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [validateEmail, setValidateEmail] = useState(true);
  const [validatePassword, setValidatePassword] = useState(true);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    toast.loading("Iniciando sesión...", {
      duration: 300,
    });
    try {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      };
      const response = await fetch("/api/login", options);
      const data = await response.json();
      if (response.status !== 200) {
        throw new Error(data.error || "Error al iniciar sesión");
      }
      toast.success(data.message);
      await router.push("/home");
    } catch (error) {
      toast.error(error.message,);
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
            <Stethoscope className={styles.icon} />
          </div>
          <h1 className={styles.title}>Bienvenido</h1>
          <p className={styles.subtitle}>Sistema de Citas Médicas</p>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.label}>
              Correo Electrónico
            </label>
            <div className={styles.inputWrapper}>
              <UserRound className={styles.inputIcon} />
              <input
                id="email"
                type="email"
                value={email}
                onChange={handleEmailChange}
                className={`${styles.input} ${
                  !validateEmail && email ? styles.inputError : ""
                }`}
                placeholder="ejemplo@correo.com"
                required
              />
              {!validateEmail && email && (
                <p className={styles.error}>Correo electrónico inválido</p>
              )}
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

          <div className={styles.rememberForgot}>
            <div className={styles.remember}>
              <input
                id="remember"
                type="checkbox"
                className={styles.checkbox}
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
              />
              <label htmlFor="remember" className={styles.rememberLabel}>
                Recordarme
              </label>
            </div>
            <Link href="/reset-password" className={styles.forgotPassword}>
              ¿Olvidó su contraseña?
            </Link>
          </div>

          <button type="submit" className={styles.submitButton}>
            Iniciar Sesión
          </button>
        </form>

        <p className={styles.register}>
          ¿No tiene una cuenta?{" "}
          <Link href="/register" className={styles.registerLink}>
            Regístrese aquí
          </Link>
        </p>
      </div>
    </div>
  );
}
