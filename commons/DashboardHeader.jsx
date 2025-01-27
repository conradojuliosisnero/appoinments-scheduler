"use client"
import { User, Stethoscope, Menu,X } from "lucide-react";
import styles from "./home.module.css";
import { useSelector,useDispatch } from "react-redux";
import { useEffect } from "react";
import { setUserData } from "@/slices/dashboardSlice";
import Link from "next/link";

export default function DashboardHeader() {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.dashboard.userData);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const response = await fetch("/api/user");
        if (response.status !== 200) {
          throw new Error("Error al obtener los datos");
        }
        const data = await response.json();
        dispatch(setUserData(data));
      } catch (error) {
        console.error("Error:", error);
      }
    };
    getUserData();
  }, [dispatch]);

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Stethoscope size={24} />
        <Link href='/home'>MediCitas</Link>
      </div>
      {/* <button className={styles.menuButton} onClick={toggleMobileMenu}>
        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button> */}
      <div className={styles.userMenu}>
        <div className={styles.userInfo}>
          <div className={styles.userName}>{userData.name}</div>
          <div className={styles.userRole}>{userData.email}</div>
        </div>
        <div className={styles.avatar}>
          <User size={20} />
        </div>
      </div>
    </header>
  );
}
