"use client";
import { useState } from "react";
import { UserRound, Lock, Stethoscope } from "lucide-react";
import styles from "./styles/login.module.css";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { setUserData } from "@/slices/dashboardSlice";
import { useDispatch } from "react-redux";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  const router = useRouter();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    toast.loading("Iniciando sesión...");
    try {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      };
      const options2 = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      };
      const [response, response2] = await Promise.all([
        fetch("/api/login", options),
        fetch("/api/user", options2),
      ]);
      if (response.status !== 200 || response2.status !== 200) {
        throw new Error("Error al iniciar sesión");
      }

      const data = await response.json();
      const data2 = await response2.json();
      dispatch(setUserData(data2));
      toast.success("Sesión iniciada correctamente ✅");
      router.push("/home");
    } catch (error) {
      toast.error("Ah ocurrio un error al intentar iniciar 🫤");
    } finally {
      toast.dismiss();
    }
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
                onChange={(e) => setEmail(e.target.value)}
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
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={styles.input}
                placeholder="••••••••"
                required
              />
            </div>
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
