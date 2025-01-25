"use client";
import Link from "next/link";
import {
  LayoutDashboard,
  Calendar as CalendarIcon,
  Users,
  FileText,
  Settings,
} from "lucide-react";
import styles from "./home.module.css";

export default function DashboardNav() {
  const navOptions = [
    {
      title: "Dashboard",
      icon: LayoutDashboard,
      href: "/home",
    },
    {
      title: "Citas",
      icon: CalendarIcon,
      href: "/quotes",
    },
    {
      title: "Pacientes",
      icon: Users,
      href: "/patients",
    },
    {
      title: "Historias Clínicas",
      icon: FileText,
      href: "/clinic-history",
    },
    {
      title: "Configuración",
      icon: Settings,
      href: "/settings",
    },
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
      </nav>
    </aside>
  );
}
