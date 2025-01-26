"use client";
import Link from "next/link";
import { BookAIcon, Calendar as CalendarIcon, LogOut } from "lucide-react";
import styles from "./home.module.css";
import { useRouter } from "next/navigation";

export default function DashboardNav() {
  const router = useRouter();

  const closeSession = async (e) => {
    e.preventDefault();
    console.log("Cerrando sesión...");
    try {
      const response = await fetch("/api/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  const navOptions = [
    {
      title: "Calendario",
      icon: CalendarIcon,
      href: "/home",
    },
    // {
    //   title: "Citas",
    //   icon: BookAIcon,
    //   href: "/appoinments",
    // },
  ];

  return (
    <aside className={styles.sidebar}>
      <nav className={styles.nav}>
        {navOptions.map((option, index) => (
          <Link href={option.href} key={index}>
            <span className={styles.navItem}>
              <option.icon size={20} />
              {option.title}
            </span>
          </Link>
        ))}
        <Link href="/" onClick={closeSession}>
          <span
            className={styles.navItem}
            style={{ backgroundColor: "#f44336", color: "#fff" }}
          >
            <LogOut size={20} />
            Cerrar Sesión
          </span>
        </Link>
      </nav>
    </aside>
  );
}
